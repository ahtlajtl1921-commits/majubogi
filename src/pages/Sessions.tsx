import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Filter, Search, ChevronRight, AlertCircle, Coffee, Sparkles, Users, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { SessionCard } from '@/components/Cards';
import RealTimeSessionCard from '@/components/RealTimeSessionCard';

import { FORM_OPTIONS } from '@/data/index';
import { Session, ROUTE_PATHS } from '@/lib/index';
import { useSessionsManager } from '@/hooks/useSessionsManager';
import { realTimeGoogleSheetsService, RealTimeSessionStatus } from '@/services/realTimeGoogleSheets';
import { IMAGES } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
export default function Sessions() {
  const navigate = useNavigate();
  const {
    sessions,
    isLoading,
    lastSync,
    syncError,
    refreshSessions
  } = useSessionsManager(); // 기본 세션 데이터
  
  // 실시간 구글 시트 데이터
  const [realTimeSessions, setRealTimeSessions] = useState<RealTimeSessionStatus[]>([]);
  const [realTimeLoading, setRealTimeLoading] = useState(true);
  const [lastRealTimeUpdate, setLastRealTimeUpdate] = useState<Date | null>(null);
  
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [ageFilter, setAgeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // 실시간 데이터 로드
  const loadRealTimeData = async () => {
    try {
      const realTimeData = await realTimeGoogleSheetsService.getAllSessionsStatus();
      setRealTimeSessions(realTimeData);
      setLastRealTimeUpdate(new Date());
      console.log('🔄 실시간 데이터 업데이트 완료:', realTimeData);
      console.log('📊 Sessions 페이지 - 로드된 세션 수:', realTimeData.length);
      realTimeData.forEach((session, index) => {
        console.log(`${index + 1}. ${session.sessionNumber}기 ${session.location} - 참여자: ${session.currentCount}명`);
      });
    } catch (error) {
      console.error('❌ 실시간 데이터 로드 실패:', error);
    } finally {
      setRealTimeLoading(false);
    }
  };
  
  // 초기 로드 및 주기적 업데이트 (30초마다)
  useEffect(() => {
    loadRealTimeData();
    
    const interval = setInterval(loadRealTimeData, 30000); // 30초마다
    
    return () => clearInterval(interval);
  }, []);
  // 실시간 세션 필터링
  const filteredRealTimeSessions = useMemo(() => {
    return realTimeSessions.filter(session => {
      const matchRegion = regionFilter === 'all' || session.location === regionFilter;
      const matchAge = ageFilter === 'all' || (
        ageFilter === '85-95' && session.title.includes('85~95') ||
        ageFilter === '88-96' && session.title.includes('88~96') ||
        ageFilter === '89-97' && session.title.includes('89~97') || // 41기 추가
        ageFilter === '91-97' && session.title.includes('91~97') ||
        ageFilter === '93-00' && session.title.includes('93~00') ||
        ageFilter === '94-02' && session.title.includes('94~02') ||
        ageFilter === '95-03' && session.title.includes('95~03')
      );
      const matchStatus = statusFilter === 'all' || 
        (statusFilter === 'available' && session.status === 'available') ||
        (statusFilter === 'closed' && (session.status === 'full' || session.isFull));
      return matchRegion && matchAge && matchStatus;
    });
  }, [realTimeSessions, regionFilter, ageFilter, statusFilter]);
  
  // 폴백 세션 필터링 (기존 데이터)
  const filteredSessions = useMemo(() => {
    return sessions.filter(session => {
      const matchRegion = regionFilter === 'all' || session.region === regionFilter;
      const matchAge = ageFilter === 'all' || session.ageGroup === ageFilter;
      const matchStatus = statusFilter === 'all' || statusFilter === 'available' && session.status === 'available' || statusFilter === 'closed' && (session.status === 'closed' || session.status === 'sold_out');
      return matchRegion && matchAge && matchStatus;
    });
  }, [sessions, regionFilter, ageFilter, statusFilter]);

  // 디버깅 로그
  useEffect(() => {
    console.log('🎯 렌더링 시점 - 실시간 세션 수:', realTimeSessions.length);
    console.log('🎯 렌더링 시점 - 필터링된 세션 수:', filteredRealTimeSessions.length);
    console.log('🎯 현재 필터:', { regionFilter, ageFilter, statusFilter });
    filteredRealTimeSessions.forEach((session, index) => {
      console.log(`🎨 렌더링 ${index + 1}: ${session.sessionNumber}기 ${session.location}`);
    });
  }, [realTimeSessions, filteredRealTimeSessions, regionFilter, ageFilter, statusFilter]);

  const handleSelectSession = (session: Session) => {
    if (session.status === 'available') {
      navigate(`${ROUTE_PATHS.APPLICATION}?sessionId=${session.id}`);
    }
  };
  return <Layout>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={IMAGES.VENUE_INTERIOR_2} alt="Venue Interior" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5">
                마주보기전 모임리스트
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
                당신을 위한 <span className="text-primary">특별한 만남</span>이<br />
                여기서 시작됩니다.
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                천안, 아산, 평택, 가장 엄선된 장소에서 진행되는 프라이빗 로테이션 미팅입니다.
                검증된 직장인들과의 진정성 있는 대화를 경험해보세요.
              </p>
              
              {/* HTML 임베드(Embed) 블록 */}
              <motion.div variants={fadeInUp} className="mt-8">
                <div className="max-w-md">
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

        {/* Google Sheets Sync Status */}
        <section className="py-4 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {syncError ? (
                  <div className="flex items-center gap-2 text-destructive">
                    <WifiOff className="w-4 h-4" />
                    <span className="text-sm font-medium">구글 시트 연결 실패</span>
                    <span className="text-xs opacity-70">(로컬 데이터 사용 중)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">실시간 데이터 연동</span>
                    {lastSync && (
                      <span className="text-xs opacity-70">
                        마지막 업데이트: {lastSync.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshSessions}
                disabled={isLoading}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? '업데이트 중...' : '새로고침'}
              </Button>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="sticky top-[var(--header-height)] z-30 bg-background/80 backdrop-blur-md border-y border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-2">
                  <Filter className="w-4 h-4" />
                  필터:
                </div>
                
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="w-[130px] bg-card">
                    <MapPin className="w-3.5 h-3.5 mr-2 opacity-70" />
                    <SelectValue placeholder="지역 전체" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">지역 전체</SelectItem>
                    <SelectItem value="천안">천안</SelectItem>
                    <SelectItem value="아산">아산</SelectItem>
                    <SelectItem value="평택">평택</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={ageFilter} onValueChange={setAgeFilter}>
                  <SelectTrigger className="w-[150px] bg-card">
                    <Calendar className="w-3.5 h-3.5 mr-2 opacity-70" />
                    <SelectValue placeholder="연령대 전체" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">연령대 전체</SelectItem>
                    {FORM_OPTIONS.ageGroups.map(age => <SelectItem key={age} value={age}>{age}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] bg-card">
                    <Sparkles className="w-3.5 h-3.5 mr-2 opacity-70" />
                    <SelectValue placeholder="상태 전체" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">상태 전체</SelectItem>
                    <SelectItem value="available">신청 가능</SelectItem>
                    <SelectItem value="closed">마감됨</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm text-muted-foreground w-full md:w-auto text-right">
                총 <span className="text-primary font-semibold">{realTimeSessions.length > 0 ? filteredRealTimeSessions.length : filteredSessions.length}</span>개의 세션
              </div>
            </div>
          </div>
        </section>

        {/* 실시간 세션 그리드 */}
        <section className="py-12 bg-muted/30 flex-grow">
          <div className="container mx-auto px-4">
            {/* 실시간 업데이트 상태 */}
            <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${realTimeLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <span className="font-semibold text-gray-700">
                    {realTimeLoading ? '실시간 데이터 로드 중...' : '실시간 연동 활성화'}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    구글 시트 연동
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">
                    {lastRealTimeUpdate && `마지막 업데이트: ${lastRealTimeUpdate.toLocaleTimeString()}`}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={loadRealTimeData}
                    disabled={realTimeLoading}
                    className="text-xs"
                  >
                    <RefreshCw className={`w-3 h-3 mr-1 ${realTimeLoading ? 'animate-spin' : ''}`} />
                    새로고침
                  </Button>
                </div>
              </div>
            </div>
            
            <AnimatePresence mode="wait">

              {realTimeSessions.length > 0 ? (
                <motion.div 
                  key="realtime-grid" 
                  variants={staggerContainer} 
                  initial="hidden" 
                  animate="visible" 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredRealTimeSessions.map(session => (
                    <motion.div key={session.sessionId} variants={staggerItem}>
                      <RealTimeSessionCard 
                        sessionId={session.sessionId} 
                        refreshInterval={15000} 
                        className="mx-auto"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : filteredSessions.length > 0 ? (
                <motion.div 
                  key="fallback-grid" 
                  variants={staggerContainer} 
                  initial="hidden" 
                  animate="visible" 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredSessions.map(session => (
                    <motion.div key={session.id} variants={staggerItem}>
                      <SessionCard session={session} onSelect={handleSelectSession} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }} 
                  className="flex flex-col items-center justify-center py-24 text-center bg-card rounded-2xl border border-dashed border-border"
                >
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">조건에 맞는 모임이 없습니다</h3>
                  <p className="text-muted-foreground mb-8 max-w-sm">
                    필터를 조정하여 다른 지역이나 연령대의 모임을 확인해보세요.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setRegionFilter('all');
                    setAgeFilter('all');
                    setStatusFilter('all');
                  }}>
                    필터 초기화
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

        {/* Info Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-8 tracking-tight">마주보기 전의 만남은 무엇이 다른가요?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">프라이빗 8:8 로테이션</h4>
                      <p className="text-sm text-muted-foreground xl:text-sm">너무 많지도 적지도 않은 인원으로, 모든 참가자와 충분한 대화 시간을 보장합니다. (1:1  대화)</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">검증된 회원 시스템</h4>
                      <p className="text-sm text-muted-foreground">
                        첫 가입 시 본인 인증과 사진 인증을 통해 신뢰할 수 있는 분들만 모임에 참여하실 수 있습니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Coffee className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">엄선된 프리미엄 장소</h4>
                      <p className="text-sm text-muted-foreground">
                        분위기 좋은 라운지와 부티크 카페를 대관하여, 오직 참가자들만을 위한 프라이빗한 환경을 제공합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src={IMAGES.VENUE_INTERIOR_5} alt="Premium Venue" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-4 h-4 text-primary fill-primary" />)}
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wider opacity-80">Premium Experience</span>
                    </div>
                    <p className="text-lg font-medium italic">
                      "단순한 소개팅이 아닌, 새로운 인연을 만나는 가장 품격 있는 방법"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notice Section */}
        <section className="py-12 bg-muted/50 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="bg-card p-6 rounded-2xl border border-border flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-2">신청 전 꼭 확인해주세요!</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>본인 사진 및 직장 인증이 완료되지 않은 경우 매칭에서 제외될 수 있습니다.</li>
                  <li>모임 7일 전부터는 환불이 불가능하오니 신중하게 신청해주시기 바랍니다.</li>
                  <li>연령대 그룹에 맞지 않는 세션은 신청이 제한될 수 있습니다.</li>
                  <li>남녀 성비를 맞추기 위해 신청 후 최종 승인까지 시간이 소요될 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>;
}