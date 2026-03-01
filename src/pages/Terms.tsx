import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, CreditCard, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function Terms() {
  return (
    <Layout>
      <div className="flex flex-col w-full">
        {/* Header */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">이용약관</h1>
              <p className="text-lg text-muted-foreground">
                마주보기 전(majubogi.co.kr) 서비스 이용에 관한 제반 사항과 기타 필요한 사항을 규정합니다.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="prose prose-lg max-w-none"
              >
                {/* 제1조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    목적
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <p className="text-muted-foreground">
                      이 약관은 마주보기 전(이하 "회사")이 제공하는 연애모임 매칭 서비스(이하 "서비스")의 이용조건 및 절차, 
                      회사와 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
                    </p>
                  </div>
                </div>

                {/* 제2조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    정의
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">"서비스"</h4>
                        <p className="text-sm text-muted-foreground">
                          회사가 제공하는 연애모임, 소개팅, 매칭 서비스 및 관련 부가서비스를 의미합니다.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">"이용자"</h4>
                        <p className="text-sm text-muted-foreground">
                          본 약관에 따라 회사가 제공하는 서비스를 받는 자를 의미합니다.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">"매칭"</h4>
                        <p className="text-sm text-muted-foreground">
                          회사가 이용자의 조건과 선호도를 바탕으로 적합한 상대방을 소개하는 서비스를 의미합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 제3조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    서비스의 제공 및 변경
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          제공 서비스
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 연애모임 기획 및 진행</li>
                          <li>• 1:1 매칭 서비스</li>
                          <li>• 프로필 관리 및 상담</li>
                          <li>• 모임 후 피드백 서비스</li>
                          <li>• 기타 부가 서비스</li>
                        </ul>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm">
                          회사는 서비스의 품질 향상을 위해 서비스 내용을 변경할 수 있으며, 
                          중요한 변경사항은 사전에 공지합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 제4조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">4</span>
                    </div>
                    서비스 이용신청 및 승낙
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">신청 절차</h4>
                        <ol className="space-y-1 text-sm text-muted-foreground">
                          <li>1. 온라인 신청서 작성 및 제출</li>
                          <li>2. 필수 서류 업로드 (신분증, 직업증명서, 본인사진)</li>
                          <li>3. 참가비 결제</li>
                          <li>4. 회사의 심사 및 승인</li>
                          <li>5. 개별 연락 및 모임 안내</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">승낙 거부 사유</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 허위 정보 제공 시</li>
                          <li>• 필수 서류 미제출 시</li>
                          <li>• 서비스 이용에 부적합하다고 판단되는 경우</li>
                          <li>• 기타 회사의 정책에 위배되는 경우</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 제5조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">5</span>
                    </div>
                    이용료 및 결제
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-primary" />
                          이용료
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted/50 rounded-lg p-4">
                            <h5 className="font-medium mb-2">남성</h5>
                            <p className="text-2xl font-bold text-primary">₩55,000</p>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-4">
                            <h5 className="font-medium mb-2">여성</h5>
                            <p className="text-2xl font-bold text-primary">₩33,000</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">결제 방법</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 신용카드, 체크카드</li>
                          <li>• 카카오페이, 토스페이</li>
                          <li>• 실시간 계좌이체</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 제6조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">6</span>
                    </div>
                    취소 및 환불
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-800">
                            <CheckCircle className="w-4 h-4" />
                            환불 가능
                          </h4>
                          <ul className="space-y-1 text-sm text-green-700">
                            <li>• 모임 8일 전까지: 50% 환불</li>
                            <li>• 회사 사유로 인한 취소: 100% 환불</li>
                            <li>• 천재지변 등 불가항력: 100% 환불</li>
                          </ul>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-800">
                            <XCircle className="w-4 h-4" />
                            환불 불가
                          </h4>
                          <ul className="space-y-1 text-sm text-red-700">
                            <li>• 모임 7일 전부터</li>
                            <li>• 이용자의 개인 사정</li>
                            <li>• 허위 정보 제공으로 인한 취소</li>
                            <li>• 모임 참석 후</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm">
                          <strong>환불 처리:</strong> 환불 요청 후 3-5 영업일 내 처리됩니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 제7조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">7</span>
                    </div>
                    이용자의 의무
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          준수사항
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 진실하고 정확한 정보 제공</li>
                          <li>• 모임 규칙 및 매너 준수</li>
                          <li>• 다른 참가자에 대한 존중과 예의</li>
                          <li>• 개인정보 보호 및 비밀 유지</li>
                          <li>• 모임 시간 준수</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          금지사항
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 허위 정보 제공</li>
                          <li>• 타인에게 불쾌감을 주는 행위</li>
                          <li>• 상업적 목적의 이용</li>
                          <li>• 개인정보 무단 수집 및 이용</li>
                          <li>• 기타 법령에 위배되는 행위</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 제8조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">8</span>
                    </div>
                    회사의 의무
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 안전하고 질 높은 서비스 제공</li>
                      <li>• 이용자 개인정보 보호</li>
                      <li>• 서비스 이용에 관한 정확한 정보 제공</li>
                      <li>• 이용자의 정당한 의견이나 불만 처리</li>
                      <li>• 관련 법령 및 약관 준수</li>
                    </ul>
                  </div>
                </div>

                {/* 제9조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">9</span>
                    </div>
                    서비스 이용제한
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <p className="mb-4">회사는 다음의 경우 서비스 이용을 제한할 수 있습니다:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 본 약관을 위반한 경우</li>
                      <li>• 허위 정보를 제공한 경우</li>
                      <li>• 다른 이용자에게 피해를 준 경우</li>
                      <li>• 서비스의 정상적인 운영을 방해한 경우</li>
                      <li>• 기타 회사가 부적절하다고 판단하는 경우</li>
                    </ul>
                  </div>
                </div>

                {/* 제10조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">10</span>
                    </div>
                    손해배상 및 면책
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">회사의 면책사항</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 천재지변 또는 이에 준하는 불가항력으로 인한 서비스 중단</li>
                          <li>• 이용자의 귀책사유로 인한 서비스 이용 장애</li>
                          <li>• 이용자 간의 개인적인 분쟁</li>
                          <li>• 매칭 결과에 대한 보장</li>
                        </ul>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm">
                          회사는 서비스 제공에 최선을 다하나, 매칭의 성공을 보장하지는 않습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 제11조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">11</span>
                    </div>
                    분쟁해결
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        서비스 이용과 관련하여 회사와 이용자 간에 분쟁이 발생한 경우, 
                        쌍방간의 합의에 의해 해결하는 것을 원칙으로 합니다.
                      </p>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm">
                          <strong>관할법원:</strong> 충청남도 천안시 소재 법원을 관할법원으로 합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 제12조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">12</span>
                    </div>
                    약관의 효력 및 변경
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <p className="text-muted-foreground">
                      본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다. 
                      회사는 필요한 경우 관련 법령에 위배되지 않는 범위에서 본 약관을 개정할 수 있으며, 
                      개정된 약관은 시행일 7일 전부터 공지합니다.
                    </p>
                  </div>
                </div>

                {/* 시행일 */}
                <div className="text-center py-8 border-t border-border">
                  <p className="text-muted-foreground">
                    <strong>시행일:</strong> 2026년 2월 14일
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}