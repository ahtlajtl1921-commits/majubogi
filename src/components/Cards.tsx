import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Star, ArrowRight, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { Session, formatCurrency, formatDate } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

// Google Analytics gtag 타입 선언
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface SessionCardProps {
  session: Session;
  onSelect: (session: Session) => void;
}

export function SessionCard({ session, onSelect }: SessionCardProps) {
  const isAvailable = session.status === 'available' || session.status === 'recruiting';
  const isFull = session.status === 'full';
  const isSoldOut = session.status === 'sold_out';
  const isClosed = session.status === 'closed';
  
  // 마감 상태 판단: 16명 이상 또는 full 상태
  const isFullyBooked = isFull || session.currentParticipants >= session.maxParticipants;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={session.imageUrl || IMAGES.HERO_COUPLE_1}
            alt={session.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge className="bg-primary/90 text-primary-foreground border-none backdrop-blur-sm">
              {session.ageGroup}
            </Badge>
            {session.theme && (
              <Badge variant="secondary" className="bg-white/90 text-foreground border-none backdrop-blur-sm">
                {session.theme}
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <Badge
              className={`border-none backdrop-blur-sm ${
                isAvailable ? 'bg-emerald-500/90 text-white' : 'bg-destructive/90 text-white'
              }`}
            >
              {isAvailable ? '신청 가능' : isSoldOut ? '매진' : '마감'}
            </Badge>
          </div>
        </div>

        <CardHeader className="p-5 pb-2 space-y-1">
          <div className="flex items-center gap-1 text-xs font-medium text-primary mb-1">
            <Sparkles className="w-3 h-3" />
            <span>{session.region} 프리미엄 매칭</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">{session.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{session.description}</p>
        </CardHeader>

        <CardContent className="p-5 pt-2 flex-grow space-y-3">
          <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary/70" />
              <span>{formatDate(session.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary/70" />
              <span>{session.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary/70" />
              <span>
                현재 {session.currentParticipants}명 / 정원 {session.maxParticipants}명
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 mt-auto border-t border-border/40 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">참가비</span>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center text-center min-w-[60px]">
                <div className="text-xs text-muted-foreground mb-1">남성</div>
                <div className="text-sm font-bold text-primary">₩55,000</div>
              </div>
              <div className="flex flex-col items-center justify-center text-center min-w-[60px]">
                <div className="text-xs text-muted-foreground mb-1">여성</div>
                <div className="text-sm font-bold text-primary">₩33,000</div>
              </div>
            </div>
          </div>
          {isAvailable && !isFullyBooked ? (
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md transition-all active:scale-95"
              onClick={() => {
                // Google Analytics 이벤트 추적
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'session_apply_click', {
                    session_id: session.id,
                    session_title: session.title
                  });
                }
              }}
            >
              신청하기
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          ) : (
            <Button
              disabled
              className="rounded-full px-6 py-2 bg-gray-400 text-gray-600 cursor-not-allowed opacity-60"
            >
              {isFullyBooked ? '마감' : '마감됨'}
              <CheckCircle2 className="ml-2 w-4 h-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group"
    >
      <div className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all h-full flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

interface TestimonialCardProps {
  name: string;
  content: string;
  rating: number;
}

export function TestimonialCard({ name, content, rating }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="p-8 rounded-[1.5rem] bg-white border border-border/30 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Heart className="w-24 h-24 text-primary" fill="currentColor" />
      </div>
      
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`}
          />
        ))}
      </div>

      <blockquote className="text-foreground/80 leading-relaxed mb-6 italic">
        "{content}"
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <span className="text-accent-foreground font-bold text-sm">{name.charAt(0)}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{name}</span>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            <span>인증된 회원</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
