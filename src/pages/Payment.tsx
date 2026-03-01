import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building, Check, AlertCircle, ArrowLeft, Gift } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { SESSIONS_DATA } from '@/data/index';

interface PaymentInfo {
  sessionId: string;
  participantType: 'male_new' | 'male_returning' | 'female';
  amount: number;
  originalAmount: number;
  couponCode?: string;
  couponDiscount?: number;
}

const PAYMENT_METHODS = [
  { id: 'card', name: '신용카드', icon: CreditCard, description: '모든 카드사 지원' },
  { id: 'kakaopay', name: '카카오페이', icon: Smartphone, description: '간편결제' },
  { id: 'tosspay', name: '토스페이', icon: Smartphone, description: '간편결제' },
  { id: 'bank_transfer', name: '계좌이체', icon: Building, description: '실시간 이체' }
];

const PRICING = {
  male_new: { label: '남성 신규', price: 55000, description: '첫 방문 고객님을 위한 기본 참가권' },
  male_returning: { label: '남성 재참여', price: 55000, description: '기존 가입 이력이 있는 재참여 고객님을 위한 할인권' },
  female: { label: '여성', price: 33000, description: '여성 고객님을 위한 특별 가격' }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function Payment() {
  const { user } = useAuth();
  const [step, setStep] = useState<'info' | 'payment' | 'complete'>('info');
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    sessionId: '',
    participantType: 'male_new',
    amount: 69000,
    originalAmount: 69000
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    refund: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Get session info
  const selectedSession = SESSIONS_DATA.find(session => session.id === paymentInfo.sessionId);

  // Update amount when participant type changes
  useEffect(() => {
    const pricing = PRICING[paymentInfo.participantType];
    setPaymentInfo(prev => ({
      ...prev,
      amount: pricing.price,
      originalAmount: pricing.price,
      couponDiscount: 0
    }));
  }, [paymentInfo.participantType]);

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock coupon validation
    const mockCoupons: Record<string, { discount: number; type: 'percentage' | 'fixed' }> = {
      'WELCOME2026': { discount: 10000, type: 'fixed' },
      'FRIEND2026': { discount: 15, type: 'percentage' }
    };
    
    const coupon = mockCoupons[couponCode.toUpperCase()];
    if (coupon) {
      let discount = 0;
      if (coupon.type === 'percentage') {
        discount = Math.floor(paymentInfo.originalAmount * coupon.discount / 100);
      } else {
        discount = coupon.discount;
      }
      
      setPaymentInfo(prev => ({
        ...prev,
        amount: Math.max(0, prev.originalAmount - discount),
        couponCode: couponCode.toUpperCase(),
        couponDiscount: discount
      }));
    }
    
    setIsApplyingCoupon(false);
  };

  const removeCoupon = () => {
    setPaymentInfo(prev => ({
      ...prev,
      amount: prev.originalAmount,
      couponCode: undefined,
      couponDiscount: 0
    }));
    setCouponCode('');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setStep('complete');
  };

  const canProceedToPayment = () => {
    return paymentInfo.sessionId && 
           Object.values(agreements).every(agreed => agreed);
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col w-full">
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">로그인이 필요합니다</h2>
              <p className="text-muted-foreground mb-8">
                결제를 진행하려면 먼저 로그인해주세요.
              </p>
              <Button>로그인하기</Button>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col w-full">
        {/* Header */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              {step !== 'info' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep(step === 'complete' ? 'payment' : 'info')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  이전
                </Button>
              )}
              <div>
                <h1 className="text-2xl font-bold">
                  {step === 'info' && '참가 정보 확인'}
                  {step === 'payment' && '결제하기'}
                  {step === 'complete' && '결제 완료'}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${step === 'info' ? 'bg-primary' : 'bg-muted'}`} />
                  <div className={`w-2 h-2 rounded-full ${step === 'payment' ? 'bg-primary' : 'bg-muted'}`} />
                  <div className={`w-2 h-2 rounded-full ${step === 'complete' ? 'bg-primary' : 'bg-muted'}`} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              {step === 'info' && (
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={fadeInUp}
                  className="space-y-8"
                >
                  {/* Session Selection */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">참가할 모임 선택</h3>
                    <Select
                      value={paymentInfo.sessionId}
                      onValueChange={(value) => setPaymentInfo(prev => ({ ...prev, sessionId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="참가할 모임을 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {SESSIONS_DATA.filter(session => session.status === 'available').map(session => (
                          <SelectItem key={session.id} value={session.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{session.title}</span>
                              <span className="text-sm text-muted-foreground">
                                {new Date(session.date).toLocaleDateString('ko-KR')} • {session.location}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {selectedSession && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">{selectedSession.title}</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>📅 {new Date(selectedSession.date).toLocaleDateString('ko-KR', { 
                            year: 'numeric', month: 'long', day: 'numeric', 
                            hour: '2-digit', minute: '2-digit' 
                          })}</p>
                          <p>📍 {selectedSession.location}</p>
                          <p>👥 {selectedSession.currentParticipants}/{selectedSession.maxParticipants}명 참여</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Participant Type */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">참가 유형 선택</h3>
                    <div className="space-y-3">
                      {Object.entries(PRICING).map(([key, pricing]) => (
                        <label
                          key={key}
                          className={`
                            flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors
                            ${paymentInfo.participantType === key 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:bg-muted/50'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="participantType"
                              value={key}
                              checked={paymentInfo.participantType === key}
                              onChange={(e) => setPaymentInfo(prev => ({ 
                                ...prev, 
                                participantType: e.target.value as any 
                              }))}
                              className="sr-only"
                            />
                            <div className={`
                              w-4 h-4 rounded-full border-2 flex items-center justify-center
                              ${paymentInfo.participantType === key 
                                ? 'border-primary' 
                                : 'border-muted-foreground'
                              }
                            `}>
                              {paymentInfo.participantType === key && (
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{pricing.label}</div>
                              <div className="text-sm text-muted-foreground">{pricing.description}</div>
                            </div>
                          </div>
                          <div className="text-lg font-bold text-primary">
                            {pricing.price.toLocaleString()}원
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Coupon */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">할인 쿠폰</h3>
                    {paymentInfo.couponCode ? (
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Gift className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">
                            {paymentInfo.couponCode} 쿠폰 적용됨
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-bold">
                            -{paymentInfo.couponDiscount?.toLocaleString()}원
                          </span>
                          <Button variant="ghost" size="sm" onClick={removeCoupon}>
                            제거
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="쿠폰 코드를 입력하세요"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          onClick={applyCoupon}
                          disabled={!couponCode.trim() || isApplyingCoupon}
                        >
                          {isApplyingCoupon ? '확인 중...' : '적용'}
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Agreements */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">약관 동의</h3>
                    <div className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={agreements.terms}
                          onCheckedChange={(checked) => 
                            setAgreements(prev => ({ ...prev, terms: !!checked }))
                          }
                        />
                        <div className="text-sm">
                          <span className="font-medium">
                            <a href="/terms" target="_blank" className="text-primary hover:underline">이용약관</a>에 동의합니다
                          </span>
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={agreements.privacy}
                          onCheckedChange={(checked) => 
                            setAgreements(prev => ({ ...prev, privacy: !!checked }))
                          }
                        />
                        <div className="text-sm">
                          <span className="font-medium">
                            <a href="/privacy" target="_blank" className="text-primary hover:underline">개인정보처리방침</a>에 동의합니다
                          </span>
                          <span className="text-red-500 ml-1">*</span>
                        </div>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={agreements.refund}
                          onCheckedChange={(checked) => 
                            setAgreements(prev => ({ ...prev, refund: !!checked }))
                          }
                        />
                        <div className="text-sm">
                          <span className="font-medium">환불규정을 확인했습니다</span>
                          <span className="text-red-500 ml-1">*</span>
                          <p className="text-muted-foreground mt-1">
                            D-Day 8일전 50% 환불, D-Day 7일전부터 환불 불가
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Total & Next */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">총 결제 금액</span>
                      <div className="text-right">
                        {paymentInfo.couponDiscount && paymentInfo.couponDiscount > 0 && (
                          <div className="text-sm text-muted-foreground line-through">
                            {paymentInfo.originalAmount.toLocaleString()}원
                          </div>
                        )}
                        <div className="text-2xl font-bold text-primary">
                          {paymentInfo.amount.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => setStep('payment')}
                      disabled={!canProceedToPayment()}
                      className="w-full"
                      size="lg"
                    >
                      결제하기
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={fadeInUp}
                  className="space-y-8"
                >
                  {/* Order Summary */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">주문 정보</h3>
                    {selectedSession && (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>모임</span>
                          <span className="font-medium">{selectedSession.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>참가 유형</span>
                          <span className="font-medium">{PRICING[paymentInfo.participantType].label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>기본 금액</span>
                          <span>{paymentInfo.originalAmount.toLocaleString()}원</span>
                        </div>
                        {paymentInfo.couponDiscount && paymentInfo.couponDiscount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>쿠폰 할인</span>
                            <span>-{paymentInfo.couponDiscount.toLocaleString()}원</span>
                          </div>
                        )}
                        <div className="border-t pt-3 flex justify-between text-lg font-bold">
                          <span>총 결제 금액</span>
                          <span className="text-primary">{paymentInfo.amount.toLocaleString()}원</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">결제 방법</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PAYMENT_METHODS.map((method) => {
                        const Icon = method.icon;
                        return (
                          <label
                            key={method.id}
                            className={`
                              flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors
                              ${selectedPaymentMethod === method.id 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border hover:bg-muted/50'
                              }
                            `}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={selectedPaymentMethod === method.id}
                              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                              className="sr-only"
                            />
                            <Icon className="w-5 h-5" />
                            <div>
                              <div className="font-medium">{method.name}</div>
                              <div className="text-sm text-muted-foreground">{method.description}</div>
                            </div>
                            {selectedPaymentMethod === method.id && (
                              <Check className="w-5 h-5 text-primary ml-auto" />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payment Button */}
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        결제 처리 중...
                      </>
                    ) : (
                      `${paymentInfo.amount.toLocaleString()}원 결제하기`
                    )}
                  </Button>
                </motion.div>
              )}

              {step === 'complete' && (
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={fadeInUp}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">결제가 완료되었습니다!</h2>
                  <p className="text-muted-foreground mb-8">
                    참가 신청이 정상적으로 접수되었습니다. <br />
                    매칭 매니저가 검토 후 2-3일 내에 개별 연락드리겠습니다.
                  </p>
                  
                  <div className="bg-card rounded-xl border border-border p-6 mb-8 text-left">
                    <h3 className="font-semibold mb-4">결제 정보</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>주문번호</span>
                        <span className="font-mono">ORDER_2026021412345</span>
                      </div>
                      <div className="flex justify-between">
                        <span>결제 금액</span>
                        <span className="font-bold">{paymentInfo.amount.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>결제 방법</span>
                        <span>{PAYMENT_METHODS.find(m => m.id === selectedPaymentMethod)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>결제 일시</span>
                        <span>{new Date().toLocaleString('ko-KR')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="flex-1">
                      영수증 다운로드
                    </Button>
                    <Button className="flex-1">
                      홈으로 돌아가기
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}