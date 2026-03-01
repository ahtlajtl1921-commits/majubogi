import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowLeft, Heart, ShieldCheck, CreditCard } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { ApplicationForm, LoginForm } from '@/components/Forms';
import { useAuth } from '@/hooks/useAuth';
import { ROUTE_PATHS, Session, ApplicationForm as ApplicationFormType } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Application Page
 * 
 * Handles the application flow for dating sessions.
 * Implements logic to distinguish between new and returning users:
 * - New users: Required to fill full form and upload verification photos.
 * - Returning users: Pre-fills data and skips photo verification.
 */
export default function Application() {
  const { user, isAuthenticated, login, isLoading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get selected session from navigation state or local storage
  const [selectedSession, setSelectedSession] = useState<Session | undefined>(() => {
    return (location.state as { session?: Session })?.session;
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to sessions if no session is selected and we're not in a success state
  useEffect(() => {
    if (!selectedSession && !isSubmitted) {
      // In a real app, we might fetch session by ID from URL params
      // For now, redirect to sessions list to pick one
      const timer = setTimeout(() => {
        if (!selectedSession) navigate(ROUTE_PATHS.SESSIONS);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedSession, navigate, isSubmitted]);

  const handleLogin = async (email: string) => {
    try {
      await login(email);
    } catch (error) {
      console.error('Login failed during application flow', error);
    }
  };

  const handleFormSubmit = async (data: ApplicationFormType) => {
    setIsSubmitting(true);
    try {
      // Simulated API call for application submission
      console.log('Submitting application:', data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center space-y-6"
          >
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">신청이 완료되었습니다!</h1>
              <p className="text-muted-foreground">
                {selectedSession?.title} 참가가 예약되었습니다. <br />
                매니저가 확인 후 24시간 이내에 안내 문자를 발송해 드립니다.
              </p>
            </div>
            <div className="pt-4 flex flex-col gap-3">
              <Button onClick={() => navigate(ROUTE_PATHS.PROFILE)} className="w-full">
                내 신청 내역 확인하기
              </Button>
              <Button variant="outline" onClick={() => navigate(ROUTE_PATHS.HOME)} className="w-full">
                홈으로 돌아가기
              </Button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        {/* Header Section */}
        <div className="mb-10 space-y-4">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            뒤로가기
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                연애모임 신청서
              </h1>
              <p className="text-lg text-muted-foreground">
                당신의 새로운 설렘, 정성을 담아 신청해 주세요.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-accent/50 px-4 py-2 rounded-full border border-accent">
              <div className="flex items-center text-xs font-medium text-accent-foreground">
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                안전한 신원 인증
              </div>
              <div className="flex items-center text-xs font-medium text-accent-foreground">
                <CreditCard className="w-4 h-4 mr-1.5" />
                간편한 예약 결제
              </div>
            </div>
          </div>
        </div>

        {!selectedSession ? (
          <Card className="border-dashed">
            <CardContent className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-muted-foreground" />
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">선택된 세션이 없습니다</h3>
                <p className="text-muted-foreground">
                  먼저 참여하고 싶은 모임을 선택해 주세요.
                </p>
              </div>
              <Button onClick={() => navigate(ROUTE_PATHS.SESSIONS)}>모임 보러가기</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Application Flow Content */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {!isAuthenticated ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="bg-card p-6 rounded-2xl border shadow-sm">
                      <div className="mb-6 space-y-2">
                        <h2 className="text-xl font-semibold">본인 인증 및 로그인</h2>
                        <p className="text-sm text-muted-foreground">
                          재참여 시 번거로운 정보 입력 없이 기존 정보를 활용할 수 있습니다.
                        </p>
                      </div>
                      <LoginForm onSubmit={handleLogin} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Heart className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {user?.hasAppliedBefore 
                            ? `${user.name}님, 다시 찾아주셔서 감사합니다. 기존 정보를 불러왔습니다.`
                            : `${user?.name}님, 반갑습니다! 첫 신청을 위한 정보를 입력해 주세요.`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {user?.hasAppliedBefore 
                            ? "변경된 정보가 있다면 수정해 주세요."
                            : "첫 가입 시에만 본인 사진 인증이 필요합니다."}
                        </p>
                      </div>
                    </div>
                    
                    <ApplicationForm 
                      selectedSession={selectedSession} 
                      onSubmit={handleFormSubmit} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Side Info / Summary */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="overflow-hidden border-primary/20">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={selectedSession.imageUrl || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80"}
                    alt={selectedSession.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
                      Selected Session
                    </div>
                    <h3 className="text-xl font-bold leading-tight">{selectedSession.title}</h3>
                  </div>
                  
                  <div className="space-y-3 pt-2 border-t border-border/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">일시</span>
                      <span className="font-medium">{selectedSession.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">장소</span>
                      <span className="font-medium">{selectedSession.region} {selectedSession.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">대상</span>
                      <span className="font-medium">{selectedSession.ageGroup}</span>
                    </div>
                    {selectedSession.theme && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">테마</span>
                        <span className="font-medium text-primary">{selectedSession.theme}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-medium">총 결제 금액</span>
                      <span className="text-2xl font-bold text-primary">
                        {selectedSession.price.toLocaleString()}원
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 text-right">
                      * 남/여 성비 및 노쇼 방지를 위한 참가비입니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-muted/50 p-6 rounded-2xl border space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  유의사항
                </h4>
                <ul className="text-xs space-y-2 text-muted-foreground list-disc pl-4">
                  <li>신청 후 매니저의 최종 승인이 있어야 참가가 확정됩니다.</li>
                  <li>D-7일 전까지는 100% 환불이 가능하나, 이후에는 환불이 불가합니다.</li>
                  <li>타인에게 양도는 불가하며 본인 확인이 되지 않을 시 참가가 제한됩니다.</li>
                  <li>상대방에 대한 배려와 매너를 지켜주세요.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
