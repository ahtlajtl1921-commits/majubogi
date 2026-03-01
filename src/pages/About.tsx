import React from 'react';
import { Layout } from '@/components/Layout';
import { IMAGES } from '@/assets/images';
import { ROUTE_PATHS } from '@/lib/index';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Coffee, Users, Zap, Star, ArrowRight, Instagram, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 30
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
      staggerChildren: 0.15
    }
  }
};
export default function About() {
  return <Layout>
      <div className="flex flex-col w-full">
        {/* Hero Section - MZ Style */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <div className="absolute inset-0 z-0">
            <img src="https://static-us-img.skywork.ai/prod/user/head_picture/2022925863354810368_3da3e81b-a661-4ddb-9287-6fa2c30e8cf9.png?image_process=quality,q_90/resize,w_1280/format,webp" alt="Couple holding hands" className="w-full opacity-20 h-[1111.25px] object-cover" />
            
          </div>
          
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium shadow-lg">
                <Sparkles className="w-4 h-4" />
                Real Connection, Real Vibes ✨
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black tracking-tight mb-8 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              마주보기 전
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
              진짜 연결, 진짜 감정 💕<br />
              <span className="text-lg">천안, 아산, 평택에서 가장 핫한 8:8 프라이빗 데이팅</span>
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-medium">2,500+ 커플 매칭</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">4.9/5 만족도</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">13분 완벽 시스템</span>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Link to={ROUTE_PATHS.SESSIONS} className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                지금 바로 시작하기
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            {/* HTML 임베드(Embed) 블록 */}
            <motion.div variants={fadeInUp} className="mt-8 flex justify-center">
              <div className="max-w-md w-full">
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
        </section>

        {/* Why We're Different - MZ Style */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                왜 우리가 다를까? 🤔
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                기존 데이팅 앱은 너무 가볍고, 소개팅은 너무 부담스러워서...<br />
                그래서 우리가 만들었어요. <strong>딱 적당한 그 지점을</strong> ✨
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.1
            }} className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">진짜 검증된 사람들</h3>
                <p className="text-gray-700 leading-relaxed">
                  직장 인증 + 본인 사진 확인까지! 가짜 프로필은 안녕~ 👋<br />
                  <span className="text-sm text-pink-600 font-medium mt-2 block">100% 신원 확인된 멤버들만</span>
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.2
            }} className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">8:8 골든 밸런스</h3>
                <p className="text-gray-700 leading-relaxed">
                  너무 많으면 피곤하고, 너무 적으면 아쉽잖아요?<br />
                  <span className="text-sm text-purple-600 font-medium mt-2 block">딱 좋은 8명과의 완벽한 만남</span>
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.3
            }} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">프라이빗 분위기</h3>
                <p className="text-gray-700 leading-relaxed">
                  남 눈치 볼 필요 없는 우리만의 공간에서 편하게!<br />
                  <span className="text-sm text-blue-600 font-medium mt-2 block">완전 프라이빗한 대관 공간</span>
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder Story - MZ Style */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <motion.div initial={{
              opacity: 0,
              x: -50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img src={IMAGES.MODERN_CAFE_1} alt="Modern cafe interior" className="w-full h-[500px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl">
                      <p className="text-sm font-medium text-gray-900">우리가 선택하는 공간들</p>
                      <p className="text-xs text-gray-600 mt-1">감성 충만한 프라이빗 카페 & 라운지</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                    대표의 진짜 이야기 💭
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-8"></div>
                </div>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-pink-500">
                    <p className="text-lg">
                      <strong>"솔직히 말할게요."</strong><br />
                      저도 수많은 소개팅 앱 써봤고, 미팅도 나가봤어요. 근데 뭔가 항상 아쉬웠거든요? 🤷‍♂️
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-500">
                    <p className="text-lg">
                      앱은 너무 가볍고, 소개팅은 너무 부담스럽고... 그 중간 어디쯤 있는 <strong>'딱 좋은 만남'</strong>을 만들고 싶었어요.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
                    <p className="text-lg">
                      그래서 만들었어요. 13분이라는 시간, 8:8이라는 인원, 프라이빗한 공간까지. 
                      <strong>모든 게 계산된 완벽한 만남의 공식</strong>을요! ✨
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 rounded-2xl text-white">
                  <p className="text-xl font-bold mb-2">
                    "여러분의 인생에서 가장 소중한 만남이 되고 싶어요 💕"
                  </p>
                  <p className="text-sm opacity-90">- 마주보기전 대표</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works - MZ Style */}
        <section className="py-24 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 text-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                어떻게 진행되나요? 🎯
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                복잡한 건 싫어하니까, 심플하게 4단계로 정리했어요!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[{
              step: "01",
              icon: <Coffee className="w-8 h-8" />,
              title: "입장 & 웰컴",
              desc: "선택된 프라이빗 공간에 도착! 간단한 안내와 함께 편안하게 시작해요 ☕",
              color: "from-yellow-400 to-orange-400"
            }, {
              step: "02",
              icon: <MessageCircle className="w-8 h-8" />,
              title: "13분의 마법",
              desc: "8명의 이성과 각각 13분씩! 딱 좋은 시간 동안 진짜 대화를 나눠요 💬",
              color: "from-green-400 to-blue-400"
            }, {
              step: "03",
              icon: <Heart className="w-8 h-8" />,
              title: "호감 선택",
              desc: "마음에 드는 3명을 선택! 부담 없이 솔직하게 골라보세요 💕",
              color: "from-pink-400 to-red-400"
            }, {
              step: "04",
              icon: <Sparkles className="w-8 h-8" />,
              title: "매칭 완료",
              desc: "서로 선택한 분들끼리 연결! 새로운 인연의 시작이에요 ✨",
              color: "from-purple-400 to-pink-400"
            }].map((item, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className="relative group">
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="text-4xl font-black opacity-30 mb-4">{item.step}</div>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-sm opacity-90 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Target Audience Section - 스크린샷5186 */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                마주보기전 이런 분께 추천드립니다 💝
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                이런 고민이 있으시다면, 마주보기전이 답입니다!
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {["막상 매칭이 돼도 대화 몇 번 하다 연락이 끔기는 데이팅앱 만남에 지친 분", "좋은 인연을 만나고 싶은 마음은 간절한데, 결혼정보회사는 부담스러웠던 분", "안전하고 검증된 사람을 만나고 싶은 분", "가벼운 만남이 아닌, 진지한 만남을 원하거나 진짜 인연을 찾고 싶은 분", "회사–집–회사 반복하다보니 주변에 소개받을 사람도 없고, 이성과의 접점이 거의 없는 분"].map((text, index) => <motion.div key={index} initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <p className="text-gray-800 leading-relaxed text-lg">
                    <span className="text-pink-500 font-bold text-2xl mr-2">"</span>
                    {text}
                    <span className="text-pink-500 font-bold text-2xl ml-2">"</span>
                  </p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Application Process Section - 스크린샷8688 */}
        <section className="py-24 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                소개팅 신청 프로세스 📋
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                간단한 4단계로 완성되는 신청 과정을 확인해보세요!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[{
              step: "01",
              title: "소개팅 일정 확인",
              desc: "모집현황 페이지에서 원하는 기수 확인",
              color: "from-pink-400 to-red-400"
            }, {
              step: "02",
              title: "소개팅 예약신청",
              desc: "사이트 예약페이지에서 신청하기",
              color: "from-purple-400 to-pink-400"
            }, {
              step: "03",
              title: "관리자 확인",
              desc: "관리자 확인 후 진행톡을 보내드립니다",
              color: "from-blue-400 to-purple-400"
            }, {
              step: "04",
              title: "예약 확정",
              desc: "모든 절차가 끝나면 신청완료 톡을 보내드립니다",
              color: "from-green-400 to-blue-400"
            }].map((item, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <span className="text-white font-black text-xl">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Social Proof - MZ Style */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                실제 후기가 증명해요 📸
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                가짜 리뷰는 NO! 진짜 참여자들의 솔직한 이야기들
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} className="relative">
                <img src={IMAGES.DATING_CAFE_1} alt="Dating at cafe" className="w-full h-80 object-cover rounded-3xl shadow-xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-lg font-bold mb-2">"진짜 자연스러웠어요!"</p>
                  <p className="text-sm opacity-90">김○○, 28세 | 천안</p>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} className="relative">
                <img src={IMAGES.MODERN_CAFE_4} alt="Modern cafe with plants" className="w-full h-80 object-cover rounded-3xl shadow-xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-lg font-bold mb-2">"분위기가 완전 좋았어요!"</p>
                  <p className="text-sm opacity-90">이○○, 26세 | 평택</p>
                </div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[{
              text: "13분이 딱 좋더라구요! 너무 길지도 짧지도 않고 🕐",
              author: "박○○, 29세"
            }, {
              text: "직장 인증이라 그런지 다들 진짜 괜찮은 분들이었어요 ✨",
              author: "최○○, 27세"
            }, {
              text: "재참여 할 때 클릭 한 번이면 끝이라 너무 편해요!",
              author: "정○○, 31세"
            }].map((review, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <p className="text-gray-800 mb-4 leading-relaxed">"{review.text}"</p>
                  <p className="text-sm text-gray-500 font-medium">- {review.author}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* CTA Section - MZ Style */}
        <section className="py-24 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{
            scale: 0.95,
            opacity: 0
          }} whileInView={{
            scale: 1,
            opacity: 1
          }} viewport={{
            once: true
          }} className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
                <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  이제 당신 차례예요! 🚀
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  더 이상 혼자 고민하지 마세요.<br />
                  <strong>진짜 인연</strong>이 기다리고 있어요 💕
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link to={ROUTE_PATHS.SESSIONS} className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <Calendar className="mr-2 w-5 h-5" />
                    모집 현황
                  </Link>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-800 rounded-full font-bold text-lg border-2 border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all duration-300">
                    <Heart className="mr-2 w-5 h-5 text-pink-500" />
                    바로 신청하기
                  </a>
                </div>

                <div className="flex justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    <span>@maju_bogi_</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>카톡 상담 가능</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>;
}