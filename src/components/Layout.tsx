import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, User, LogOut, ChevronRight, MapPin, Calendar, Info, MessageCircle, FileText, Users, Camera } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import { ROUTE_PATHS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({
  children
}: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  const navItems = [{
    name: '모임 찾기',
    path: ROUTE_PATHS.SESSIONS
  }, {
    name: 'FAQ',
    path: ROUTE_PATHS.FAQ
  }, {
    name: '스토리 및 진행방법',
    path: ROUTE_PATHS.ABOUT
  }];
  return <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Header */}
      <header className={cn("fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 border-b", isScrolled ? "bg-background/80 backdrop-blur-md border-border shadow-sm" : "bg-transparent border-transparent")}>
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Heart className="text-primary-foreground w-6 h-6 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              마주보기 <span className="text-[rgb(0,0,0)]">전</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => <NavLink key={item.path} to={item.path} className={({
            isActive
          }) => cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground")}>
                {item.name}
              </NavLink>)}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? <div className="flex items-center gap-3">
                <Link to={ROUTE_PATHS.PROFILE} className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <User className="w-4 h-4" />
                  {user?.name}님
                </Link>
                <Button variant="ghost" size="icon" onClick={logout} className="text-muted-foreground hover:text-destructive">
                  <LogOut className="w-5 h-5" />
                </Button>
              </div> : <a href="https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="rounded-full px-6 shadow-md hover:shadow-lg transition-all">
                  소개팅 참가하기
                </Button>
              </a>}

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="메뉴 열기">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} className="fixed inset-0 z-40 bg-background pt-20 px-6 md:hidden">
            <nav className="flex flex-col gap-6">
              {navItems.map(item => <Link key={item.path} to={item.path} className="text-2xl font-bold flex items-center justify-between group border-b border-border pb-4">
                  <span className="group-hover:text-primary transition-colors">{item.name}</span>
                  <ChevronRight className="text-muted-foreground" />
                </Link>)}
              {isAuthenticated ? <Link to={ROUTE_PATHS.PROFILE} className="text-2xl font-bold flex items-center justify-between group border-b border-border pb-4">
                  <span className="group-hover:text-primary transition-colors">마이페이지</span>
                  <User className="text-muted-foreground" />
                </Link> : <a href="https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold flex items-center justify-between group border-b border-border pb-4">
                  <span className="group-hover:text-primary transition-colors">로그인 / 가입</span>
                  <ChevronRight className="text-muted-foreground" />
                </a>}
            </nav>
            
            <div className="mt-12 flex flex-col gap-4 text-center">
              <p className="text-muted-foreground text-sm">천안, 아산, 평택 지역 기반 프리미엄 매칭 서비스</p>
              <div className="flex justify-center gap-4">
                <a href="#" className="p-3 rounded-full bg-secondary text-primary">
                  <SiInstagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* Quick Menu - Floating Navigation */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
          
          <div className="h-px bg-white/20" />
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-20 h-20 bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
            <FileText className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">신청하기</span>
          </a>
          <div className="h-px bg-white/20" />
          <Link to={ROUTE_PATHS.SESSIONS} className="flex flex-col items-center justify-center w-20 h-20 bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
            <Users className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">모집현황</span>
          </Link>
          <div className="h-px bg-white/20" />
          <a href="https://www.instagram.com/maju_bogi_" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-20 h-20 bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
            <SiInstagram className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">인스타그램</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Heart className="text-primary-foreground w-5 h-5 fill-current" />
                </div>
                <span className="text-lg font-bold">마주보기 전</span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                단순한 만남을 넘어, 서로의 가치관과 온도가 맞는 소중한 인연을 연결합니다.
                천안, 아산, 평택에서 가장 신뢰받는 8:8 프리미엄 로테이션 소개팅 서비스입니다.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="https://www.instagram.com/maju_bogi_" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <SiInstagram className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Links Section */}
            <div>
              <h4 className="font-bold mb-6 text-foreground">서비스 메뉴</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to={ROUTE_PATHS.HOME} className="text-muted-foreground hover:text-primary transition-colors">홈</Link></li>
                <li><Link to={ROUTE_PATHS.SESSIONS} className="text-muted-foreground hover:text-primary transition-colors">모임 리스트</Link></li>
                <li><Link to={ROUTE_PATHS.FAQ} className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link to={ROUTE_PATHS.ABOUT} className="text-muted-foreground hover:text-primary transition-colors">스토리 및 진행방법</Link></li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h4 className="font-bold mb-6 text-foreground">고객 지원</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="https://pf.kakao.com/_QxjvzX" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">카카오톡 상담</a></li>
                <li><a href="https://www.instagram.com/maju_bogi_" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">인스타그램</a></li>
              </ul>
            </div>

            {/* Contact Section */}
            
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2026 마주보기 전. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to={ROUTE_PATHS.TERMS} className="hover:text-primary transition-colors">이용약관</Link>
              <Link to={ROUTE_PATHS.PRIVACY} className="hover:text-primary transition-colors">개인정보처리방침</Link>
              <a href="https://pf.kakao.com/_QxjvzX" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">고객센터</a>
            </div>
          </div>
        </div>
      </footer>
    </div>;
}