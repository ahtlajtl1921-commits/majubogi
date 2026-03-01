import { useState, useEffect, useCallback } from 'react';
import { Session } from '@/lib/index';
import googleSheetsService, { GoogleSheetSession } from '@/services/googleSheetsService';
import { googleSheetsCSVService } from '@/services/googleSheetsCSVService';
import { googleSheetsSessionsService } from '@/services/googleSheetsSessionsService';

// 구글 시트 세션을 기존 Session 타입으로 변환
const convertGoogleSheetSession = (gsSession: GoogleSheetSession): Session => {
  return {
    id: gsSession.id,
    title: gsSession.title,
    description: gsSession.description,
    date: gsSession.date,
    location: gsSession.location,
    region: gsSession.region,
    ageGroup: gsSession.ageGroup,
    theme: gsSession.theme,
    price: gsSession.price,
    maxParticipants: gsSession.maxParticipants,
    currentParticipants: gsSession.currentParticipants,
    status: gsSession.status === 'recruiting' ? 'available' : 
            gsSession.status === 'full' ? 'sold_out' : 
            gsSession.status === 'closed' ? 'sold_out' : 'available',
    imageUrl: gsSession.imageUrl || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?auto=format&fit=crop&q=80&w=800`
  };
};

// 로컬 스토리지 키
const SESSIONS_STORAGE_KEY = 'majubogi_sessions';
const LAST_SYNC_KEY = 'majubogi_last_sync';

// 기본 세션 데이터 (구글 시트 연결 실패시 사용)
const getDefaultSessions = (): Session[] => {
  return [
    {
      id: 'sess_034',
      title: '34기 천안 [85~95년생] 프라이빗 8:8 미팅',
      description: '천안에서 진행되는 34기 8:8 로테이션 미팅입니다.',
      date: '2026-03-06T19:00:00+09:00',
      location: '천안',
      region: '천안',
      ageGroup: '85~95년생',
      theme: '정기모임',
      price: 55000,
      maxParticipants: 16,
      currentParticipants: 2, // 이지우(남성), 김태욱(남성) 참가 확인
      maleCount: 2,
      femaleCount: 0,
      status: 'available',
      imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png'
    },
    {
      id: 'sess_035',
      title: '35기 평택 [95~03년생] 프라이빗 8:8 미팅',
      description: '평택에서 진행되는 35기 8:8 로테이션 미팅입니다.',
      date: '2026-03-07T19:00:00+09:00',
      location: '평택',
      region: '평택',
      ageGroup: '95~03년생',
      theme: '정기모임',
      price: 50000,
      maxParticipants: 16,
      currentParticipants: 1, // 김혜수(여성) 참가 확인
      maleCount: 0,
      femaleCount: 1,
      status: 'available',
      imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/4d2514bc-5fdb-45a0-8ef0-50aac15c5fa8/prod_agent_2022618562480971776/pyeongtaek_elegant_restaurant_1_20260217225659_1.png'
    },
    {
      id: 'sess_036',
      title: '36기 천안 [91~97년생] 프라이빗 8:8 미팅',
      description: '천안에서 진행되는 36기 8:8 로테이션 미팅입니다.',
      date: '2026-03-13T19:00:00+09:00',
      location: '천안',
      region: '천안',
      ageGroup: '91~97년생',
      theme: '정기모임',
      price: 48000,
      maxParticipants: 16,
      currentParticipants: 0,
      status: 'available',
      imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png'
    },
    {
      id: 'sess_037',
      title: '37기 천안 [93~00년생] 프라이빗 8:8 미팅',
      description: '천안에서 진행되는 37기 8:8 로테이션 미팅입니다.',
      date: '2026-03-14T19:00:00+09:00',
      location: '천안',
      region: '천안',
      ageGroup: '93~00년생',
      theme: '정기모임',
      price: 55000,
      maxParticipants: 16,
      currentParticipants: 0,
      status: 'available',
      imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png'
    },
    {
      id: 'sess_038',
      title: '38기 평택 [87~95년생] 프라이빗 8:8 미팅',
      description: '평택에서 진행되는 38기 8:8 로테이션 미팅입니다.',
      date: '2026-03-20T19:00:00+09:00',
      location: '평택',
      region: '평택',
      ageGroup: '87~95년생',
      theme: '정기모임',
      price: 50000,
      maxParticipants: 16,
      currentParticipants: 0,
      status: 'available',
      imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/4d2514bc-5fdb-45a0-8ef0-50aac15c5fa8/prod_agent_2022618562480971776/pyeongtaek_elegant_restaurant_1_20260217225659_1.png'
    },
    {
      id: 'sess_039',
      title: '39기 천안 [94~02년생] 프라이빗 8:8 미팅',
      description: '천안에서 진행되는 39기 8:8 로테이션 미팅입니다.',
      date: '2026-03-21T19:00:00+09:00',
      location: '천안',
      region: '천안',
      ageGroup: '94~02년생',
      theme: '정기모임',
      price: 52000,
      maxParticipants: 16,
      currentParticipants: 0,
      status: 'available',
      imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png'
    }
  ];
};

export function useSessionsManager() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  // 구글 시트에서 데이터 가져오기
  const fetchFromGoogleSheets = useCallback(async () => {
    try {
      setIsLoading(true);
      setSyncError(null);
      
      console.log('🔄 구글 시트 CSV 데이터 가져오기 시작...');
      
      // 구글 스크립트가 생성한 Sessions 시트에서 실시간 데이터 가져오기
      const realTimeSessions = await googleSheetsSessionsService.getSessionsWithRealTimeData();
      
      console.log('✅ 구글 시트 Sessions 데이터 로딩 완료:', realTimeSessions.length);
      
      // 로컬 스토리지에 저장
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(realTimeSessions));
      localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
      
      setSessions(realTimeSessions);
      setLastSync(new Date());
      
      console.log('✅ 구글 시트 Sessions 동기화 완룈:', realTimeSessions.length, '개 모임');
    } catch (error) {
      console.error('❌ 구글 시트 동기화 실패:', error);
      setSyncError(error instanceof Error ? error.message : '알 수 없는 오류');
      
      // 실패시 로컬 저장된 데이터 또는 기본 데이터 사용
      const savedData = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (savedData) {
        try {
          setSessions(JSON.parse(savedData));
        } catch {
          setSessions(getDefaultSessions());
        }
      } else {
        setSessions(getDefaultSessions());
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 컴포넌트 마운트시 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      // 먼저 로컬 저장된 데이터 로드 (빠른 초기 렌더링)
      const savedData = localStorage.getItem(SESSIONS_STORAGE_KEY);
      const savedSync = localStorage.getItem(LAST_SYNC_KEY);
      
      if (savedData) {
        try {
          setSessions(JSON.parse(savedData));
          if (savedSync) {
            setLastSync(new Date(savedSync));
          }
        } catch {
          setSessions(getDefaultSessions());
        }
      } else {
        setSessions(getDefaultSessions());
      }
      
      // 그 다음 구글 시트에서 최신 데이터 가져오기
      await fetchFromGoogleSheets();
    };

    loadInitialData();
  }, [fetchFromGoogleSheets]);

  // 자동 새로고침 (5분마다)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchFromGoogleSheets();
    }, 5 * 60 * 1000); // 5분

    return () => clearInterval(interval);
  }, [fetchFromGoogleSheets]);

  // 수동 새로고침
  const refreshSessions = useCallback(async () => {
    await fetchFromGoogleSheets();
  }, [fetchFromGoogleSheets]);

  // 특정 세션의 실시간 통계 가져오기
  const getSessionStats = useCallback(async (sessionId: string) => {
    try {
      return await googleSheetsService.getSessionStats(sessionId);
    } catch (error) {
      console.error('세션 통계 가져오기 실패:', error);
      return null;
    }
  }, []);

  // 레거시 함수들 (기존 코드 호환성을 위해 유지)
  const addSession = async (sessionData: Omit<Session, 'id'>): Promise<Session> => {
    console.warn('addSession: 구글 시트 연동 모드에서는 구글 시트에서 직접 추가해주세요.');
    const newSession: Session = {
      ...sessionData,
      id: `sess_${Date.now()}`
    };
    return newSession;
  };

  const updateSession = async (sessionId: string, updates: Partial<Session>): Promise<Session | null> => {
    console.warn('updateSession: 구글 시트 연동 모드에서는 구글 시트에서 직접 수정해주세요.');
    const session = sessions.find(s => s.id === sessionId);
    return session || null;
  };

  const deleteSession = async (sessionId: string): Promise<boolean> => {
    console.warn('deleteSession: 구글 시트 연동 모드에서는 구글 시트에서 직접 삭제해주세요.');
    return false;
  };

  const updateParticipantCount = async (sessionId: string, count: number): Promise<boolean> => {
    console.warn('updateParticipantCount: 구글 시트 연동 모드에서는 자동으로 계산됩니다.');
    return false;
  };

  const updateSessionStatus = async (sessionId: string, status: Session['status']): Promise<boolean> => {
    console.warn('updateSessionStatus: 구글 시트 연동 모드에서는 자동으로 계산됩니다.');
    return false;
  };

  return {
    sessions,
    isLoading,
    lastSync,
    syncError,
    refreshSessions,
    getSessionStats,
    // 레거시 함수들
    addSession,
    updateSession,
    deleteSession,
    updateParticipantCount,
    updateSessionStatus
  };
}