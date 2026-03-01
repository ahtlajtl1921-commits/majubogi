import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, User, Lock, Eye, FileText } from 'lucide-react';
import { Layout } from '@/components/Layout';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function Privacy() {
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
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">개인정보처리방침</h1>
              <p className="text-lg text-muted-foreground">
                마주보기 전(majubogi.co.kr)은 고객님의 개인정보를 소중히 여기며, 안전하게 보호하기 위해 최선을 다하고 있습니다.
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
                    개인정보의 처리목적
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <p className="mb-4">마주보기 전(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 연애모임 서비스 제공 및 참가자 관리</li>
                      <li>• 본인확인 및 신원인증</li>
                      <li>• 매칭 서비스 제공</li>
                      <li>• 고객상담 및 불만처리</li>
                      <li>• 서비스 개선 및 맞춤형 서비스 제공</li>
                      <li>• 마케팅 및 광고 활용 (동의 시에만)</li>
                    </ul>
                  </div>
                </div>

                {/* 제2조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    처리하는 개인정보의 항목
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          필수정보
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 성명, 생년월일, 성별</li>
                          <li>• 연락처 (휴대폰번호)</li>
                          <li>• 카카오톡 ID</li>
                          <li>• 직업 및 직장정보</li>
                          <li>• 신분증 사진</li>
                          <li>• 본인 사진</li>
                          <li>• 거주지역</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Eye className="w-4 h-4 text-primary" />
                          선택정보
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 종교, 키, 결혼여부</li>
                          <li>• 취미 및 관심사</li>
                          <li>• 이상형 정보</li>
                          <li>• 추가 사진</li>
                          <li>• 자기소개</li>
                        </ul>
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
                    개인정보의 처리 및 보유기간
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-2">보유기간</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• 서비스 이용기간 중 + 서비스 종료 후 1년</li>
                            <li>• 관련 법령에 따른 보존의무가 있는 경우 해당 기간</li>
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-2">법정 보존기간</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• 계약 또는 청약철회 등에 관한 기록: 5년</li>
                            <li>• 대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                            <li>• 소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                          </ul>
                        </div>
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
                    개인정보의 제3자 제공
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <p className="mb-4">회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 이용자가 사전에 동의한 경우</li>
                      <li>• 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                      <li>• 매칭 서비스 제공을 위해 상대방에게 필요 최소한의 정보를 제공하는 경우</li>
                    </ul>
                  </div>
                </div>

                {/* 제5조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">5</span>
                    </div>
                    개인정보처리의 위탁
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <p className="mb-4">회사는 서비스 향상을 위해 아래와 같이 개인정보 처리업무를 외부에 위탁하고 있습니다:</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 font-semibold">수탁업체</th>
                            <th className="text-left py-2 font-semibold">위탁업무</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/50">
                            <td className="py-2">토스페이먼츠</td>
                            <td className="py-2">결제처리 및 결제정보 관리</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">카카오</td>
                            <td className="py-2">카카오톡 상담 서비스</td>
                          </tr>
                          <tr>
                            <td className="py-2">구글</td>
                            <td className="py-2">신청서 접수 및 관리</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* 제6조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">6</span>
                    </div>
                    정보주체의 권리·의무 및 행사방법
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <p className="mb-4">이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다:</p>
                    <ul className="space-y-2 text-muted-foreground mb-4">
                      <li>• 개인정보 처리현황 통지요구</li>
                      <li>• 개인정보 열람요구</li>
                      <li>• 개인정보 정정·삭제요구</li>
                      <li>• 개인정보 처리정지요구</li>
                    </ul>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm">
                        <strong>권리 행사 방법:</strong> 카카오톡 채널 또는 인스타그램 DM을 통해 요청하실 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 제7조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">7</span>
                    </div>
                    개인정보의 안전성 확보조치
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Lock className="w-4 h-4 text-primary" />
                          기술적 조치
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 개인정보 암호화</li>
                          <li>• 해킹 등에 대비한 기술적 대책</li>
                          <li>• 개인정보처리시스템 접근권한 관리</li>
                          <li>• 접근통제시스템 설치 및 운영</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          관리적 조치
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 개인정보 취급직원의 최소화</li>
                          <li>• 정기적인 직원 교육</li>
                          <li>• 개인정보 보호책임자 지정</li>
                          <li>• 내부관리계획 수립 및 시행</li>
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
                    개인정보 보호책임자
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="text-center">
                      <h4 className="font-semibold mb-4">개인정보 보호책임자</h4>
                      <div className="space-y-2 text-muted-foreground">
                        <p><strong>성명:</strong> 이지우</p>
                        <p><strong>직책:</strong> 대표</p>
                        <p><strong>연락방법:</strong></p>
                        <div className="flex justify-center gap-4 mt-4">
                          <a 
                            href="https://pf.kakao.com/_QxjvzX" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500 transition-colors"
                          >
                            카카오톡 상담
                          </a>
                          <a 
                            href="https://www.instagram.com/maju_bogi_" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                          >
                            인스타그램 DM
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 제9조 */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">9</span>
                    </div>
                    개인정보처리방침의 변경
                  </h2>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <p className="text-muted-foreground">
                      이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 
                      변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
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