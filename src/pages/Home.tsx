import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Calendar, Users, MessageCircle, ArrowRight, Coffee, Sparkles, Award } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import { ROUTE_PATHS } from '@/lib/index';
import { Layout } from '@/components/Layout';
import { FeatureCard, TestimonialCard } from '@/components/Cards';
import { IMAGES } from '@/assets/images';
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1]
  }
};
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
export default function Home() {
  return <Layout>
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://static-us-img.skywork.ai/prod/user/head_picture/2022768559196127232_Generated Image February 15, 2026 - 5_15AM.jpeg?image_process=quality,q_90/resize,w_1280/format,webp" alt="Our Wedding day - Romantic couple" className="w-full h-[1114.828125px] object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex justify-center md:justify-start items-center min-h-[90vh]">
          <motion.div className="max-w-3xl backdrop-blur-sm bg-black/30 p-6 md:p-8 rounded-3xl border border-white/20 shadow-2xl ml-0 md:ml-8 w-full md:w-auto" initial="initial" animate="animate" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-pink-500/20 text-white border border-pink-300/30 text-xs md:text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-pink-300" />
              <span className="text-white font-semibold text-center">천안, 아산, 평택 8:8 프라이빗 로테이션 소개팅</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 text-white drop-shadow-2xl text-center md:text-left xl:text-6xl">
              당신의 설레는 <br />
              <span className="text-pink-300 drop-shadow-2xl">마주보기 전</span>을 시작하세요
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl mb-6 max-w-xl leading-relaxed text-white/90 drop-shadow-lg text-center md:text-left">
              검증된 직장인들과의 깊이 있는 대화. <br />
              단순한 만남을 넘어 진심이 닿는 시간을 디자인합니다.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg min-w-[120px] md:min-w-[140px]">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-xs md:text-sm text-white/80 mb-2 font-medium">남성</div>
                  <div className="text-xl md:text-2xl font-bold text-pink-300 drop-shadow-lg">₩55,000</div>
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg min-w-[120px] md:min-w-[140px]">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-xs md:text-sm text-white/80 mb-2 font-medium">여성</div>
                  <div className="text-xl md:text-2xl font-bold text-pink-300 drop-shadow-lg">₩33,000</div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex justify-center">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/20 text-white font-semibold text-base md:text-lg hover:bg-white/30 transition-colors border border-white/30 backdrop-blur-sm w-full sm:w-auto max-w-xs">
                소개팅 참가하기
              </a>
            </motion.div>
            
            {/* HTML 임베드(Embed) 블록 */}
            <motion.div variants={fadeInUp} className="mt-6 flex justify-center">
              <div className="w-full max-w-md">
                <iframe 
                  src="https://script.google.com/macros/s/AKfycbwP3EerNwcyqLMBc9492hr_OhiF1V7tqe8Suu7jvX9epVv1KdC6hrpd5tDN9Tew4Ihm/exec" 
                  width="100%" 
                  height="70px" 
                  frameBorder="0" 
                  scrolling="no" 
                  style={{overflow: 'hidden'}}
                  title="예약 상황"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Buttons - Fixed Right Side */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 space-y-0">
        {/* 1. 신청하기 */}
        

        {/* 2. 모집현황 */}
        

        {/* 3. 카카오톡 상담 - 강조색 */}
        

        {/* 4. 인스타그램 */}
        
      </div>

      {/* About Section */}
      <section id="about" className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }}>
              <img src={IMAGES.ROMANTIC_COUPLE_GARDEN} alt="Romantic couple in garden" className="rounded-3xl shadow-2xl border border-border object-cover aspect-[4/5]" />
            </motion.div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">철저한 검증을 통한 <br />신뢰할 수 있는 만남</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  '마주보기 전'은 누구나 가입할 수 있지만, 아무나 참여할 수 없습니다. 
                  직장 인증과 본인 사진 확인을 통해 서로가 안심하고 대화에 집중할 수 있는 환경을 만듭니다.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-background border border-border shadow-sm">
                  <ShieldCheck className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">100% 신원 인증</h3>
                  <p className="text-sm text-muted-foreground">직장 및 본인 사진 인증을 거친 검증된 멤버들만 참여 가능합니다.</p>
                </div>
                <div className="p-6 rounded-2xl bg-background border border-border shadow-sm">
                  <Users className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">8:8 프라이빗 매칭</h3>
                  <p className="text-sm text-muted-foreground">너무 많지도 적지도 않은, 대화에 딱 집중하기 좋은 인원으로 진행됩니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">참여 방법</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            복잡한 과정 없이 간편하게 신청하고, 설레는 만남을 준비하세요.
          </p>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard title="날짜 및 지역 선택" description="쇼핑몰처럼 원하는 날짜와 지역 옵션을 장바구니에 담아 결제하세요." icon={<Calendar className="w-6 h-6 text-primary" />} />
            <FeatureCard title="신청서 작성" description="첫 가입 시에만 사진과 정보를 등록하면, 다음엔 클릭 한 번으로 신청 끝!" icon={<Heart className="w-6 h-6 text-primary" />} />
            <FeatureCard title="참여 확정 안내" description="매칭 매니저가 엄격한 심사를 거쳐 최종 참여 인원에게 개별 연락을 드립니다." icon={<MessageCircle className="w-6 h-6 text-primary" />} />
            <FeatureCard title="설레는 만남" description="고급스러운 라운지에서 13분씩 8명과 깊이 있는 로테이션 대화를 즐기세요." icon={<Coffee className="w-6 h-6 text-primary" />} />
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <h2 className="text-4xl font-bold">당신을 돋보이게 하는 <br />세심한 공간 선정</h2>
              <p className="text-lg text-muted-foreground">
                만남의 온도가 올라갈 수 있도록 조도, 음악, 좌석 배치까지 
                모든 요소를 세심하게 고려한 엄선된 공간에서 진행됩니다.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">프라이빗 대관</h4>
                    <p className="text-sm text-muted-foreground">외부인과 섞이지 않는 독립된 공간에서 우리만의 대화를 나눕니다.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img src="https://static-us-img.skywork.ai/prod/user/head_picture/2022730222548602880_3da3e81b-a661-4ddb-9287-6fa2c30e8cf9.png?image_process=quality,q_90/resize,w_1280/format,webp" alt="Couple enjoying cherry blossoms" className="rounded-3xl shadow-xl border border-border aspect-video h-[332.9861145019531px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">함께한 분들의 이야기</h2>
          <p className="text-muted-foreground xl:text-lg">실제 참여자들의 생생한 후기를 확인해보세요.</p>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard name="김OO (31세, 천안)" content="처음엔 어색할까 봐 걱정했는데, 진행 방식이 너무 자연스러워서 8명과 금방 친해졌어요. 공간 분위기도 너무 좋았습니다." rating={5} />
            <TestimonialCard name="이OO (29세, 평택)" content="사진 인증을 미리 하니까 상대방에 대한 신뢰도가 확실히 높았어요. 덕분에 편안하게 대화할 수 있었습니다. 강추합니다!" rating={5} />
            <TestimonialCard name="박OO (34세, 천안)" content="재참여할 때는 따로 정보를 안 써도 돼서 너무 편해요. 결제만 하면 바로 신청되니까 자주 애용하게 될 것 같네요." rating={5} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[3rem] overflow-hidden bg-primary p-12 md:p-24 text-center text-primary-foreground shadow-2xl">
            <div className="absolute inset-0 z-0 opacity-20">
              <img src="https://static-us-img.skywork.ai/prod/user/head_picture/2022729905828446208_cc47837e-f7aa-4048-a468-8a178798d040.png?image_process=quality,q_90/resize,w_1280/format,webp" alt="Happy couple background" className="w-full h-[491.9270935058594px] object-cover" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">지금 바로 <br />새로운 인연을 만나보세요</h2>
              <p className="text-lg mb-12 opacity-90">
                당신의 설레는 한 편이 시작되는 곳, <br />
                검증된 멤버들과의 프리미엄 소개팅에 초대합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-white text-primary font-bold text-xl hover:scale-105 transition-transform shadow-xl">
                  지금 바로 신청하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding Area */}
      <footer className="py-12 border-t border-border bg-card">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="text-2xl font-bold tracking-tight">마주보기 전</span>
          </div>
          <div className="space-y-6">
            <div className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              <p className="mb-4">
                누군가의 인연을 만들어 준다는 뜻 깊은 일을 하고 있음에 매번 고민을 통해 응원하고 있습니다.
              </p>
              <p className="mb-4">
                운명같은 만남? 자연스러운 만남도 너무 좋지만 여기서의 만남 또한 그저 우연이 아닌, 
                만날 수밖에 없었던 인연이 아닐까요?
              </p>
              <p className="mb-4">
                노력한 만큼, 행동하는 만큼, 
                새로운 인연과의 만남도 빠르게 다가올 거라고 믿습니다.
              </p>
              <p className="font-medium text-foreground mb-4">
                여러분들의 인생의 반쪽을 찾을 수 있도록 노력하겠습니다.
              </p>
              <p className="text-sm font-medium text-right text-foreground">
                마주보기전 대표 올림
              </p>
            </div>
            <div className="flex justify-center gap-4 mb-6">
              <a href="https://www.instagram.com/maju_bogi_" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <SiInstagram className="w-8 h-8" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2026 마주보기 전. All rights reserved. <br />
              충청남도 천안시 | 충청남도 아산시 | 경기도 평택시
            </p>
          </div>
        </div>
      </footer>
    </Layout>;
}