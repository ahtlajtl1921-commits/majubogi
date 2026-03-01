import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MapPin, Calendar, Clock, RefreshCw } from 'lucide-react';
import { realTimeGoogleSheetsService, RealTimeSessionStatus } from '@/services/realTimeGoogleSheets';

interface RealTimeSessionCardProps {
  sessionId: string;
  refreshInterval?: number; // 새로고침 간격 (밀리초)
  className?: string;
}

export const RealTimeSessionCard: React.FC<RealTimeSessionCardProps> = ({ 
  sessionId, 
  refreshInterval = 10000, // 기본 10초
  className = ""
}) => {
  const [sessionStatus, setSessionStatus] = useState<RealTimeSessionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // 실시간 데이터 로드
  const loadSessionData = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true);
      
      const status = await realTimeGoogleSheetsService.getSessionStatus(sessionId);
      setSessionStatus(status);
      setLastUpdate(new Date());
      
      console.log(`🔄 ${sessionId} 데이터 업데이트:`, status);
    } catch (error) {
      console.error('세션 데이터 로드 실패:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 초기 로드 및 주기적 업데이트
  useEffect(() => {
    loadSessionData();
    
    const interval = setInterval(() => {
      loadSessionData();
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [sessionId, refreshInterval]);

  // 수동 새로고침
  const handleRefresh = async () => {
    await realTimeGoogleSheetsService.refreshCache();
    await loadSessionData(true);
  };

  if (loading && !sessionStatus) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!sessionStatus) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">세션 정보를 찾을 수 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  const { 
    title, 
    date, 
    location, 
    currentCount, 
    maleCount, 
    femaleCount, 
    maxCount, 
    isFull, 
    status,
    sessionNumber 
  } = sessionStatus;
  
  const remainingSlots = maxCount - currentCount;
  const progressPercentage = (currentCount / maxCount) * 100;

  // 장소별 이미지 매핑
  const getLocationImage = (location: string, sessionNumber: string) => {
    const locationImages = {
      '천안': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png',
        '/images/스크린샷3355.png',
        '/images/스크린샷6688.png'
      ],
      '평택': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/4d2514bc-5fdb-45a0-8ef0-50aac15c5fa8/prod_agent_2022618562480971776/pyeongtaek_elegant_restaurant_1_20260217225659_1.png',
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=800'
      ],
      '아산': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/0587b083-5cf4-4f56-b864-a465f2a2ba67/prod_agent_2022618562480971776/asan_modern_lounge_1_20260217225647_1.png',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
      ]
    };
    
    const images = locationImages[location as keyof typeof locationImages] || locationImages['천안'];
    const imageIndex = parseInt(sessionNumber) % images.length;
    return images[imageIndex];
  };
  
  const locationImage = getLocationImage(location, sessionNumber);

  // 날짜 포맷팅
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { 
      month: 'long', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <Card className={`w-full max-w-md transition-all duration-300 ${
      isFull ? 'opacity-75 border-red-200' : 'hover:shadow-lg border-blue-200'
    } ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-gray-800">
            {sessionNumber}기 {location}
          </CardTitle>
          <Badge variant={isFull ? "destructive" : "default"} className="text-xs">
            {isFull ? "🚫 마감" : "✅ 모집중"}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{title}</p>
      </CardHeader>

      {/* 장소 이미지 */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={locationImage} 
          alt={`${location} 장소 이미지`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // 이미지 로드 실패 시 기본 이미지
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800';
          }}
        />
        {/* 이미지 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* 장소 정보 오버레이 */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2 text-white text-sm">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{location} 프리미엄 장소</span>
          </div>
        </div>
      </div>
      <CardContent className="space-y-4">
        {/* 날짜 정보 */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">{formatDate(date)} 오후 7시</span>
          <Clock className="w-4 h-4 ml-2" />
          <span>약 3시간 진행</span>
        </div>

        {/* 실시간 참여자 수 */}
        <div className={`p-4 rounded-lg ${
          isFull ? 'bg-red-50 border border-red-200' : 'bg-gradient-to-r from-blue-50 to-purple-50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className={`w-5 h-5 ${isFull ? 'text-red-600' : 'text-blue-600'}`} />
              <span className="font-semibold">실시간 참여자</span>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${isFull ? 'text-red-600' : 'text-blue-600'}`}>
                {currentCount}명 / {maxCount}명
              </div>
            </div>
          </div>
          
          {/* 진행률 바 */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                isFull ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>남성 {maleCount}명 · 여성 {femaleCount}명</span>
            <span>{progressPercentage.toFixed(0)}% 달성</span>
          </div>
        </div>

        {/* 남은 자리 표시 */}
        {!isFull && (
          <div className="text-center">
            <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">
              🎯 남은 자리 {remainingSlots}석
            </Badge>
          </div>
        )}

        {/* 마지막 업데이트 시간 */}
        {lastUpdate && (
          <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t">
            <span>업데이트: {lastUpdate.toLocaleTimeString()}</span>
            <button 
              onClick={handleRefresh}
              className={`flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-colors ${
                refreshing ? 'animate-pulse' : ''
              }`}
              disabled={refreshing}
            >
              <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? '새로고침 중...' : '새로고침'}
            </button>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3">
        {isFull ? (
          <Button 
            disabled 
            className="w-full bg-gray-400 text-gray-600 cursor-not-allowed"
          >
            🚫 마감되었습니다 (대기 접수 불가)
          </Button>
        ) : (
          <Button 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              // 구글 폼으로 이동 (새 탭)
              window.open('https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header', '_blank');
            }}
          >
            ✨ 지금 신청하기 ({remainingSlots}석 남음)
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RealTimeSessionCard;