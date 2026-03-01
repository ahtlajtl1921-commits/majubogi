import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircle, CreditCard, Settings, AlertCircle, Lightbulb } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  orderIndex: number;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    category: '참가신청',
    question: '신청은 어떻게 하나요?',
    answer: '홈페이지의 "신청하기" 버튼을 클릭하여 구글폼을 작성해주시면 됩니다. 매칭 매니저가 검토 후 2-3일 내에 개별 연락드립니다.',
    orderIndex: 1
  },
  {
    id: '2',
    category: '참가신청',
    question: '참가비는 얼마인가요?',
    answer: '남성: ₩55,000원, 여성: ₩33,000원입니다. 모든 참가자에게 동일한 혜택을 제공합니다.',
    orderIndex: 2
  },
  {
    id: '3',
    category: '참가신청',
    question: '어떤 서류가 필요한가요?',
    answer: '신분증 사진, 직업 인증서류(재직증명서, 사업자등록증, 명함 등), 본인 사진 2장이 필요합니다. 모든 서류는 신청서 작성 시 업로드해주시면 됩니다.',
    orderIndex: 3
  },
  {
    id: '4',
    category: '결제환불',
    question: '환불 규정이 어떻게 되나요?',
    answer: 'D-Day 8일전까지는 50% 환불, D-Day 7일전부터는 환불이 불가합니다. 환불 요청은 카카오톡 채널을 통해 접수해주세요.',
    orderIndex: 4
  },
  {
    id: '5',
    category: '결제환불',
    question: '결제 방법은 어떻게 되나요?',
    answer: '신용카드, 카카오페이, 토스페이, 계좌이체를 지원합니다. 결제 완료 후 참가가 확정됩니다.',
    orderIndex: 5
  },
  {
    id: '6',
    category: '모임진행',
    question: '모임은 어떻게 진행되나요?',
    answer: '8:8 로테이션 방식으로 1:1 대화를 13분씩 진행합니다. 모든 이성과 대화할 수 있는 기회가 주어지며, 편안한 분위기에서 자연스럽게 대화를 나누실 수 있습니다.',
    orderIndex: 6
  },
  {
    id: '7',
    category: '모임진행',
    question: '매칭 결과는 언제 알 수 있나요?',
    answer: '모임 종료후 1시간 내에 개별적으로 연락드립니다. 상호 매칭이 성사된 경우 연락처를 교환해드립니다.',
    orderIndex: 7
  },
  {
    id: '8',
    category: '모임진행',
    question: '모임 장소는 어디인가요?',
    answer: '천안, 아산, 평택의 프라이빗한 카페나 라운지에서 진행됩니다. 정확한 장소는 참가 확정 후 개별 안내드립니다.',
    orderIndex: 8
  },
  {
    id: '9',
    category: '기타',
    question: '결제는 어떻게 하나요?',
    answer: '온라인 결제(신용카드, 카카오페이, 토스페이) 또는 계좌이체로 결제 가능합니다. 결제 완료 후 매칭 매니저가 개별 연락드립니다.',
    orderIndex: 9
  },
  {
    id: '10',
    category: '기타',
    question: '친구와 함께 참여할 수 있나요?',
    answer: '네, 동반 참여가 가능합니다. 신청서 작성 시 동반 참여자 성함을 기재해주시면 됩니다.',
    orderIndex: 10
  },
  {
    id: '11',
    category: '모임진행',
    question: '진행시간은 얼마나 걸리나요?',
    answer: '5:5~8:8 상황에 따라 다르지만, 아무리 늦어져도 3시간을 넘지 않습니다.',
    orderIndex: 11
  },
  {
    id: '12',
    category: '참가신청',
    question: '계속해서 재방문 해도 될까요?',
    answer: '네 당연히 가능합니다.',
    orderIndex: 12
  },
  {
    id: '13',
    category: '모임진행',
    question: '남녀 성비가 맞지 않아도 진행되나요?',
    answer: '성비가 맞지 않는다면 진행되지 않습니다.\n예를 들어 남자가 8명이고 여자가 6명이라면 6:6으로 진행됩니다. 최소 5:5 매칭부터 진행됩니다. 4:4 이하는 매칭될 경우, 일정변경 또는 환불 처리됩니다.',
    orderIndex: 13
  },
  {
    id: '14',
    category: '참가신청',
    question: '직업이나 신분증 인증은 왜 하는 건가요?',
    answer: '마주보기전은 안전한 사람들끼리의 진지한 만남을 추구합니다.\n그렇기에 직업과 신분인증은 \'\ud544수\'입니다.\n인증이 어렵다면 참여가 어렵습니다.',
    orderIndex: 14
  },
  {
    id: '15',
    category: '모임진행',
    question: '해당 날짜(일정)에 인원이 미달 되면 어떻게 되나요?',
    answer: '최소 인원인 5:5에도 미치지 못한다면 관리자가 개별적으로 연락을 드리며, 참가비 100% 환불 또는 일정변경 중에 선택 하시면 됩니다.',
    orderIndex: 15
  },
  {
    id: '16',
    category: '참가신청',
    question: '갑자기 참석이 어려운 상황이 생기면, 예약을 취소하거나 일정을 변경할 수 있나요?',
    answer: '참가신청서 마지막에 \'소개팅 신청은 신중하게 부탁드려요\' 문구가 있습니다 여기에 동의 체크를 해주셔야 진행이 되는데요, 소개팅 신청 후에는 약관에 따라서 처리되며, 특별한 이유가 아니라면 일정 변경이 불가능(증빙필요) 합니다.',
    orderIndex: 16
  }
];

const CATEGORIES = [
  { key: 'all', name: '전체', icon: Search, color: 'bg-primary' },
  { key: '참가신청', name: '참가신청', icon: MessageCircle, color: 'bg-blue-500' },
  { key: '결제환불', name: '결제환불', icon: CreditCard, color: 'bg-green-500' },
  { key: '모임진행', name: '모임진행', icon: Settings, color: 'bg-purple-500' },
  { key: '기타', name: '기타', icon: Lightbulb, color: 'bg-orange-500' }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
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
                <AlertCircle className="w-4 h-4" />
                자주 묻는 질문
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                궁금한 것이 있으신가요?
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                마주보기 전에 대해 자주 묻는 질문들을 모았습니다. <br />
                원하는 답변을 찾지 못하셨다면 언제든 문의해주세요.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="질문을 검색해보세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.key;
                return (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${isActive 
                        ? `${category.color} text-white shadow-lg` 
                        : 'bg-secondary text-secondary-foreground hover:bg-accent'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                {filteredFAQs.length > 0 ? (
                  <motion.div
                    key={selectedCategory + searchQuery}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={fadeInUp}
                    className="space-y-4"
                  >
                    {filteredFAQs.map((faq, index) => {
                      const isExpanded = expandedItems.has(faq.id);
                      const categoryInfo = CATEGORIES.find(cat => cat.key === faq.category);
                      
                      return (
                        <motion.div
                          key={faq.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                          <button
                            onClick={() => toggleExpanded(faq.id)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-start gap-4 flex-1">
                              {categoryInfo && (
                                <Badge variant="secondary" className="shrink-0">
                                  {categoryInfo.name}
                                </Badge>
                              )}
                              <h3 className="font-semibold text-foreground leading-relaxed">
                                {faq.question}
                              </h3>
                            </div>
                            <ChevronDown 
                              className={`w-5 h-5 text-muted-foreground transition-transform shrink-0 ml-4 ${
                                isExpanded ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-6 pt-0">
                                  <div className="pl-4 border-l-2 border-primary/20">
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-results"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={fadeInUp}
                    className="text-center py-16"
                  >
                    <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
                    <p className="text-muted-foreground mb-6">
                      다른 키워드로 검색하거나 카테고리를 변경해보세요.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                      전체 FAQ 보기
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4">
                원하는 답변을 찾지 못하셨나요?
              </h2>
              <p className="text-muted-foreground mb-8">
                언제든 카카오톡 채널로 문의해주세요. 빠르고 친절하게 답변드리겠습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://pf.kakao.com/_QxjvzX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  카카오톡 상담하기
                </a>
                <a
                  href="https://www.instagram.com/maju_bogi_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-accent transition-colors"
                >
                  인스타그램 DM
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}