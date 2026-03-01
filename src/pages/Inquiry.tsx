import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, CreditCard, Settings, AlertCircle, Lightbulb, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

interface InquiryFormData {
  title: string;
  content: string;
  inquiryType: 'general' | 'payment' | 'technical' | 'complaint' | 'suggestion';
}

interface Inquiry {
  id: string;
  title: string;
  content: string;
  inquiryType: 'general' | 'payment' | 'technical' | 'complaint' | 'suggestion';
  status: 'pending' | 'in_progress' | 'completed' | 'closed';
  adminReply?: string;
  repliedAt?: string;
  createdAt: string;
}

const INQUIRY_TYPES = {
  general: { name: '일반 문의', icon: MessageCircle, color: 'bg-blue-500' },
  payment: { name: '결제/환불', icon: CreditCard, color: 'bg-green-500' },
  technical: { name: '기술 문의', icon: Settings, color: 'bg-purple-500' },
  complaint: { name: '불만/신고', icon: AlertCircle, color: 'bg-red-500' },
  suggestion: { name: '제안/개선', icon: Lightbulb, color: 'bg-yellow-500' }
};

const STATUS_INFO = {
  pending: { name: '접수됨', icon: Clock, color: 'bg-gray-500' },
  in_progress: { name: '처리중', icon: MessageSquare, color: 'bg-blue-500' },
  completed: { name: '완료', icon: CheckCircle, color: 'bg-green-500' },
  closed: { name: '종료', icon: CheckCircle, color: 'bg-gray-400' }
};

// Mock data for demonstration
const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: '1',
    title: '결제 후 확인 메일이 오지 않아요',
    content: '어제 신청서를 작성하고 결제를 완료했는데, 확인 메일이 오지 않았습니다. 결제는 정상적으로 처리된 것 같은데 언제쯤 연락을 받을 수 있을까요?',
    inquiryType: 'payment',
    status: 'completed',
    adminReply: '안녕하세요! 결제 확인되었습니다. 매칭 매니저가 검토 후 2-3일 내에 개별 연락드리고 있습니다. 카카오톡으로도 안내 메시지를 보내드렸으니 확인 부탁드립니다. 추가 문의사항이 있으시면 언제든 연락주세요!',
    repliedAt: '2026-02-13T14:30:00Z',
    createdAt: '2026-02-12T16:20:00Z'
  },
  {
    id: '2',
    title: '모임 장소 변경 가능한가요?',
    content: '3월 16일 모임에 신청했는데, 개인 사정으로 천안보다는 평택 쪽이 더 편할 것 같습니다. 장소 변경이 가능한지 문의드립니다.',
    inquiryType: 'general',
    status: 'in_progress',
    createdAt: '2026-02-13T10:15:00Z'
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function Inquiry() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [formData, setFormData] = useState<InquiryFormData>({
    title: '',
    content: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ title: '', content: '', inquiryType: 'general' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MessageCircle className="w-4 h-4" />
                1:1 문의
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                궁금한 점이 있으신가요?
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                마주보기 전 이용 중 궁금한 점이나 불편한 점이 있으시면 <br />
                언제든 문의해주세요. 빠르게 답변드리겠습니다.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-6 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="flex bg-secondary rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('new')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'new'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  새 문의 작성
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'history'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  문의 내역
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {activeTab === 'new' ? (
                <motion.div
                  key="new-inquiry"
                  initial="initial"
                  animate="animate"
                  variants={fadeInUp}
                >
                  {!user ? (
                    <div className="text-center py-16">
                      <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">로그인이 필요합니다</h3>
                      <p className="text-muted-foreground mb-6">
                        문의를 작성하려면 먼저 로그인해주세요.
                      </p>
                      <Button>로그인하기</Button>
                    </div>
                  ) : (
                    <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">새 문의 작성</h2>
                        <p className="text-muted-foreground">
                          문의 내용을 자세히 작성해주시면 더 정확한 답변을 드릴 수 있습니다.
                        </p>
                      </div>

                      {submitSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                        >
                          <div className="flex items-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">문의가 성공적으로 접수되었습니다!</span>
                          </div>
                          <p className="text-green-700 text-sm mt-1">
                            2-3일 내에 답변드리겠습니다.
                          </p>
                        </motion.div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">문의 유형</label>
                          <Select
                            value={formData.inquiryType}
                            onValueChange={(value: any) => setFormData(prev => ({ ...prev, inquiryType: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="문의 유형을 선택해주세요" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(INQUIRY_TYPES).map(([key, type]) => {
                                const Icon = type.icon;
                                return (
                                  <SelectItem key={key} value={key}>
                                    <div className="flex items-center gap-2">
                                      <Icon className="w-4 h-4" />
                                      {type.name}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">제목</label>
                          <Input
                            type="text"
                            placeholder="문의 제목을 입력해주세요"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">문의 내용</label>
                          <Textarea
                            placeholder="문의 내용을 자세히 작성해주세요"
                            value={formData.content}
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            rows={8}
                            required
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            구체적인 상황과 문제점을 작성해주시면 더 정확한 답변을 드릴 수 있습니다.
                          </p>
                        </div>

                        <div className="flex gap-4">
                          <Button
                            type="submit"
                            disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
                            className="flex-1"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                접수 중...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                문의 접수
                              </>
                            )}
                          </Button>
                        </div>
                      </form>

                      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">💡 빠른 답변을 위한 팁</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 결제 관련 문의 시 주문번호나 결제일시를 함께 알려주세요</li>
                          <li>• 기술적 문제 시 사용 중인 브라우저와 기기 정보를 포함해주세요</li>
                          <li>• 급한 문의는 카카오톡 채널을 이용해주세요</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="inquiry-history"
                  initial="initial"
                  animate="animate"
                  variants={fadeInUp}
                >
                  {!user ? (
                    <div className="text-center py-16">
                      <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">로그인이 필요합니다</h3>
                      <p className="text-muted-foreground mb-6">
                        문의 내역을 확인하려면 먼저 로그인해주세요.
                      </p>
                      <Button>로그인하기</Button>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">문의 내역</h2>
                        <p className="text-muted-foreground">
                          지금까지 작성한 문의와 답변을 확인할 수 있습니다.
                        </p>
                      </div>

                      {MOCK_INQUIRIES.length > 0 ? (
                        <div className="space-y-4">
                          {MOCK_INQUIRIES.map((inquiry) => {
                            const inquiryType = INQUIRY_TYPES[inquiry.inquiryType];
                            const status = STATUS_INFO[inquiry.status];
                            const TypeIcon = inquiryType.icon;
                            const StatusIcon = status.icon;

                            return (
                              <div
                                key={inquiry.id}
                                className="bg-card border border-border rounded-xl p-6 shadow-sm"
                              >
                                <div className="flex items-start justify-between gap-4 mb-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <Badge variant="secondary" className={`${inquiryType.color} text-white`}>
                                        <TypeIcon className="w-3 h-3 mr-1" />
                                        {inquiryType.name}
                                      </Badge>
                                      <Badge variant="outline" className={`${status.color} text-white border-0`}>
                                        <StatusIcon className="w-3 h-3 mr-1" />
                                        {status.name}
                                      </Badge>
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">
                                      {inquiry.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                      {inquiry.content}
                                    </p>
                                  </div>
                                </div>

                                {inquiry.adminReply && (
                                  <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <MessageSquare className="w-4 h-4 text-primary" />
                                      <span className="text-sm font-medium text-primary">관리자 답변</span>
                                      {inquiry.repliedAt && (
                                        <span className="text-xs text-muted-foreground">
                                          {formatDate(inquiry.repliedAt)}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-foreground leading-relaxed">
                                      {inquiry.adminReply}
                                    </p>
                                  </div>
                                )}

                                <div className="mt-4 pt-4 border-t border-border">
                                  <span className="text-xs text-muted-foreground">
                                    작성일: {formatDate(inquiry.createdAt)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-16">
                          <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">문의 내역이 없습니다</h3>
                          <p className="text-muted-foreground mb-6">
                            아직 작성한 문의가 없습니다. 궁금한 점이 있으시면 언제든 문의해주세요.
                          </p>
                          <Button onClick={() => setActiveTab('new')}>
                            새 문의 작성하기
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4">
                급한 문의가 있으신가요?
              </h2>
              <p className="text-muted-foreground mb-8">
                카카오톡 채널을 통해 실시간으로 상담받으실 수 있습니다.
              </p>
              <a
                href="https://pf.kakao.com/_QxjvzX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                카카오톡 상담하기
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}