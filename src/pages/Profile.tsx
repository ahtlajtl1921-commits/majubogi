import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  UserCheck, 
  Calendar, 
  History, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  ShieldAlert,
  Camera,
  MapPin,
  Briefcase,
  Baby
} from 'lucide-react';
import { ROUTE_PATHS, formatDate, formatCurrency, Session } from '@/lib/index';
import { Layout } from '@/components/Layout';
import { SessionCard } from '@/components/Cards';
import { useAuth } from '@/hooks/useAuth';
import { IMAGES } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data for user's session history
const MOCK_HISTORY: Session[] = [
  {
    id: 'session_prev_1',
    title: '천안 8:8 프라이빗 로테이션 소개팅',
    description: '1:1로 13분씩 깊이 있는 대화를 나누는 설렘의 시간',
    date: '2026-01-20T19:00:00Z',
    location: '천안 신부동 카페 루미에르',
    region: '천안',
    ageGroup: '89~95년생',
    price: 69000,
    maxParticipants: 16,
    currentParticipants: 16,
    status: 'closed',
    imageUrl: IMAGES.VENUE_INTERIOR_4
  }
];

const MOCK_UPCOMING: Session[] = [
  {
    id: 'session_next_1',
    title: '천안 8:8 밸런타인 특집 소개팅',
    description: '특별한 날, 특별한 인연을 만나는 로맨틱한 저녁',
    date: '2026-02-14T19:00:00Z',
    location: '천안 불당동 플로라',
    region: '천안',
    ageGroup: '92~98년생',
    theme: '밸런타인 특집',
    price: 69000,
    maxParticipants: 16,
    currentParticipants: 12,
    status: 'available',
    imageUrl: IMAGES.VENUE_INTERIOR_1
  }
];

export default function Profile() {
  const { user, logout, isVerified, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="bg-muted p-6 rounded-full mb-6">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">로그인이 필요합니다</h2>
          <p className="text-muted-foreground mb-8">회원님의 프로필과 신청 내역을 확인하려면 로그인해주세요.</p>
          <Button onClick={() => navigate('/')} size="lg">
            홈으로 이동하기
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Profile Header Section */}
        <div className="relative mb-12">
          <div className="h-48 w-full bg-gradient-to-r from-primary/20 via-accent/30 to-primary/10 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
          </div>
          
          <div className="absolute -bottom-6 left-8 flex items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl border-4 border-background overflow-hidden shadow-xl bg-muted">
                <img 
                  src={user.profileImageUrls[0] || IMAGES.PROFESSIONAL_PEOPLE_2}
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
                {!isVerified && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Camera className="text-white w-8 h-8 opacity-70" />
                  </div>
                )}
              </div>
              <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full shadow-lg border border-border">
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            <div className="pb-2">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                {isVerified ? (
                  <Badge className="bg-green-500/10 text-green-600 border-green-200 gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    인증 완료
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    미인증
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="font-medium text-foreground">{user.job}</span>
                <span className="opacity-40">|</span>
                <span>{user.birthYear}년생</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Left Column: Stats & Profile Details */}
          <div className="space-y-6">
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-primary" />
                  내 정보 요약
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isVerified && (
                  <Alert variant="destructive" className="bg-destructive/5 border-destructive/20">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>신원 인증이 필요합니다</AlertTitle>
                    <AlertDescription className="text-xs">
                      첫 참여를 위해 본인 사진 2장과 신분증 인증이 필요합니다.
                    </AlertDescription>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 w-full text-xs h-8"
                      onClick={() => navigate(ROUTE_PATHS.APPLICATION)}
                    >
                      인증하러 가기
                    </Button>
                  </Alert>
                )}

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> 직업
                    </span>
                    <span className="font-medium">{user.job}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Baby className="w-4 h-4" /> 출생연도
                    </span>
                    <span className="font-medium">{user.birthYear}년</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> 연락처
                    </span>
                    <span className="font-medium font-mono">{user.phone}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Settings className="w-4 h-4" /> 프로필 정보 수정
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/5"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" /> 로그아웃
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">재참여 혜택</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  설렘한편은 기존 참여자분들의 번거로움을 줄여드리기 위해 기존 정보를 안전하게 보관합니다.
                </p>
                <div className="text-xs font-medium text-primary bg-primary/10 p-2 rounded-lg text-center">
                  재참여 시 9,000원 할인 적용 (남성 기준)
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Sessions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  참여 예정 모임
                </h3>
                <Badge variant="secondary">{MOCK_UPCOMING.length}개</Badge>
              </div>
              
              {MOCK_UPCOMING.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_UPCOMING.map(session => (
                    <SessionCard 
                      key={session.id} 
                      session={session} 
                      onSelect={(s) => navigate(`${ROUTE_PATHS.APPLICATION}?session=${s.id}`)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-muted/30 border-2 border-dashed border-border rounded-2xl p-12 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground">현재 신청한 모임이 없습니다.</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => navigate(ROUTE_PATHS.SESSIONS)}
                  >
                    새로운 모임 둘러보기
                  </Button>
                </div>
              )}
            </section>

            {/* Past History */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <History className="w-5 h-5 text-muted-foreground" />
                  과거 참여 내역
                </h3>
              </div>
              
              <div className="space-y-4">
                {MOCK_HISTORY.map(session => (
                  <motion.div 
                    key={session.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl group hover:shadow-md transition-all"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={session.imageUrl || IMAGES.VENUE_INTERIOR_4}
                        alt={session.title} 
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{session.title}</h4>
                      <p className="text-xs text-muted-foreground">{formatDate(session.date)}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge variant="outline" className="bg-muted/50">참여 완료</Badge>
                      <p className="text-[10px] text-muted-foreground mt-1">{formatCurrency(session.price)} 결제</p>
                    </div>
                  </motion.div>
                ))}
                
                {MOCK_HISTORY.length === 0 && (
                  <p className="text-sm text-center text-muted-foreground py-8 bg-muted/20 rounded-xl">
                    아직 참여하신 내역이 없습니다.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
