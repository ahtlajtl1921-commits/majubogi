import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  MapPin, 
  Eye, 
  EyeOff,
  Save,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useSessionsManager } from '@/hooks/useSessionsManager';
import { Session } from '@/lib/index';

interface SessionFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  region: '천안' | '아산' | '평택' | '서울' | '기타';
  ageGroup: string;
  theme: string;
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  status: 'available' | 'closed' | 'sold_out' | 'recruiting' | 'full';
  imageUrl: string;
}

const initialFormData: SessionFormData = {
  title: '',
  description: '',
  date: '',
  location: '',
  region: '천안',
  ageGroup: '',
  theme: '',
  price: 55000,
  maxParticipants: 16,
  currentParticipants: 0,
  status: 'available',
  imageUrl: 'https://images.unsplash.com/photo-1565720490558-136ad94e112f?auto=format&fit=crop&q=80&w=800'
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function AdminLogin() {
  const { login, isLoading } = useAdminAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(formData.username, formData.password);
    if (!success) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col w-full">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="bg-card rounded-2xl border border-border p-8 shadow-lg"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2">운영자 로그인</h1>
                  <p className="text-muted-foreground">마주보기 전 관리자 페이지</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">아이디</label>
                    <Input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="관리자 아이디를 입력하세요"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">비밀번호</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="비밀번호를 입력하세요"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !formData.username || !formData.password}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        로그인 중...
                      </>
                    ) : (
                      '로그인'
                    )}
                  </Button>
                </form>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2 text-sm">테스트 계정</h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>관리자: admin / majubogi2026!</p>
                    <p>매니저: manager / manager2026!</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function SessionForm({ 
  session, 
  onSave, 
  onCancel, 
  isLoading 
}: { 
  session?: Session; 
  onSave: (data: SessionFormData) => void; 
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<SessionFormData>(
    session ? {
      title: session.title,
      description: session.description,
      date: new Date(session.date).toISOString().slice(0, 16),
      location: session.location,
      region: session.region,
      ageGroup: session.ageGroup,
      theme: session.theme || '',
      price: session.price,
      maxParticipants: session.maxParticipants,
      currentParticipants: session.currentParticipants,
      status: session.status,
      imageUrl: session.imageUrl || initialFormData.imageUrl
    } : initialFormData
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {session ? '모임 수정' : '새 모임 추가'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">모임 제목</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="예: 천안 [89~95년생] 프라이빗 8:8 미팅"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">모임 설명</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="모임에 대한 자세한 설명을 입력하세요"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">날짜 및 시간</label>
                <Input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">지역</label>
                <Select
                  value={formData.region}
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, region: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="천안">천안</SelectItem>
                    <SelectItem value="아산">아산</SelectItem>
                    <SelectItem value="평택">평택</SelectItem>
                    <SelectItem value="서울">서울</SelectItem>
                    <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">장소</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="예: 천안 신부동 시크릿 라운지"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">연령대</label>
                <Input
                  value={formData.ageGroup}
                  onChange={(e) => setFormData(prev => ({ ...prev, ageGroup: e.target.value }))}
                  placeholder="예: 89~95년생"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">테마</label>
                <Input
                  value={formData.theme}
                  onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
                  placeholder="예: 정기모임, 돌싱특집, 크리스천 특집"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">참가비 (원)</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                  min="0"
                  step="1000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">최대 참가자 수</label>
                <Input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 0 }))}
                  min="1"
                  max="50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">현재 참가자 수</label>
                <Input
                  type="number"
                  value={formData.currentParticipants}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentParticipants: parseInt(e.target.value) || 0 }))}
                  min="0"
                  max={formData.maxParticipants}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">상태</label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">신청 가능</SelectItem>
                    <SelectItem value="sold_out">마감</SelectItem>
                    <SelectItem value="closed">종료</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">이미지 URL</label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-border flex gap-4">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            취소
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading || !formData.title || !formData.description}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                저장 중...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                저장
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AdminDashboard() {
  const { admin, logout } = useAdminAuth();
  const { sessions, isLoading, addSession, updateSession, deleteSession, updateParticipantCount } = useSessionsManager();
  const [showForm, setShowForm] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSaveSession = async (formData: SessionFormData) => {
    try {
      if (editingSession) {
        await updateSession(editingSession.id, {
          ...formData,
          date: new Date(formData.date).toISOString()
        });
        showSuccess('모임이 성공적으로 수정되었습니다.');
      } else {
        await addSession({
          ...formData,
          date: new Date(formData.date).toISOString()
        });
        showSuccess('새 모임이 성공적으로 추가되었습니다.');
      }
      setShowForm(false);
      setEditingSession(null);
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await deleteSession(sessionId);
      showSuccess('모임이 성공적으로 삭제되었습니다.');
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  const handleParticipantChange = async (sessionId: string, newCount: number) => {
    try {
      await updateParticipantCount(sessionId, newCount);
    } catch (error) {
      console.error('Failed to update participant count:', error);
    }
  };

  const getStatusBadge = (status: Session['status']) => {
    const statusConfig = {
      available: { label: '신청 가능', color: 'bg-green-500' },
      recruiting: { label: '모집중', color: 'bg-blue-500' },
      full: { label: '마감', color: 'bg-red-500' },
      sold_out: { label: '마감', color: 'bg-red-500' },
      closed: { label: '종료', color: 'bg-gray-500' }
    };
    const config = statusConfig[status];
    return (
      <Badge className={`${config.color} text-white`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="flex flex-col w-full">
        {/* Header */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  운영자 대시보드
                </h1>
                <p className="text-muted-foreground mt-1">
                  {admin?.username} ({admin?.role}) • 모임 관리
                </p>
              </div>
              <Button variant="outline" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </div>
        </section>

        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{successMessage}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">전체 모임</p>
                      <p className="text-2xl font-bold">{sessions.length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">신청 가능</p>
                      <p className="text-2xl font-bold text-green-600">
                        {sessions.filter(s => s.status === 'available').length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">마감</p>
                      <p className="text-2xl font-bold text-red-600">
                        {sessions.filter(s => s.status === 'sold_out').length}
                      </p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">총 참가자</p>
                      <p className="text-2xl font-bold">
                        {sessions.reduce((sum, s) => sum + s.currentParticipants, 0)}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">모임 관리</h2>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                새 모임 추가
              </Button>
            </div>

            {/* Sessions List */}
            <div className="space-y-4">
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  layout
                  className="bg-card border border-border rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{session.title}</h3>
                        {getStatusBadge(session.status)}
                      </div>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {session.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{new Date(session.date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{session.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{session.currentParticipants}/{session.maxParticipants}명</span>
                          <Input
                            type="number"
                            value={session.currentParticipants}
                            onChange={(e) => handleParticipantChange(session.id, parseInt(e.target.value) || 0)}
                            className="w-16 h-6 text-xs ml-2"
                            min="0"
                            max={session.maxParticipants}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingSession(session);
                          setShowForm(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteConfirm(session.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Session Form Modal */}
        <AnimatePresence>
          {showForm && (
            <SessionForm
              session={editingSession || undefined}
              onSave={handleSaveSession}
              onCancel={() => {
                setShowForm(false);
                setEditingSession(null);
              }}
              isLoading={isLoading}
            />
          )}
        </AnimatePresence>

        {/* Delete Confirmation */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setDeleteConfirm(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card rounded-xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold mb-4">모임 삭제</h3>
                <p className="text-muted-foreground mb-6">
                  정말로 이 모임을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1"
                  >
                    취소
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteSession(deleteConfirm)}
                    className="flex-1"
                  >
                    삭제
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

export default function Admin() {
  const { admin, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  return admin?.isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
}