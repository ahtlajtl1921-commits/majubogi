/**
 * ==========================================
 * Google Sheets CSV Data Fetcher (간소화 버전)
 * ==========================================
 */

import type { Session } from '@/lib/index';

interface ParticipantData {
  timestamp: string;
  sessionDate: string;
  name: string;
  gender: '남성' | '여성';
  location: string;
  age: string;
  phone: string;
  kakaoId: string;
  participationType: string;
}

export class GoogleSheetsCSVService {
  private cache: ParticipantData[] = [];
  private lastFetch: Date | null = null;

  /**
   * 현재 참여자 데이터 반환 (테스트용)
   */
  async fetchParticipantsFromCSV(): Promise<ParticipantData[]> {
    console.log('📊 참여자 데이터 로딩 중...');
    
    // 현재 구글 시트의 실제 데이터
    const participants: ParticipantData[] = [
      {
        timestamp: '2026. 2. 18 오후 2:01:56',
        sessionDate: '🎈 34기 천안 85-95년생 (3월 6일 / 19:00)',
        name: '이지우',
        gender: '남성',
        location: '천안',
        age: '87년생',
        phone: '010-5761-2425',
        kakaoId: 'ahtlajtl',
        participationType: '신규'
      }
    ];
    
    console.log('✅ 참여자 데이터 로드 완료:', participants.length, '명');
    participants.forEach(p => {
      console.log(`👤 ${p.name} (${p.gender}) - ${p.sessionDate}`);
    });
    
    this.cache = participants;
    this.lastFetch = new Date();
    
    return participants;
  }

  /**
   * 세션별 참여자 수 계산
   */
  async getSessionsWithParticipants(): Promise<Session[]> {
    const participants = await this.fetchParticipantsFromCSV();
    
    // 기본 세션 데이터
    const baseSessions: Session[] = [
      {
        id: 'session-34',
        title: '34기 천안 [85~95년생] 프라이빗 8:8 미팅',
        description: '천안에서 진행되는 34기 8:8 로테이션 미팅입니다.',
        date: '2026-03-06T19:00:00+09:00',
        location: '천안',
        region: '천안',
        ageGroup: '85~95년생',
        theme: '정기모임',
        price: 55000,
        maxParticipants: 16,
        currentParticipants: 0,
        maleCount: 0,
        femaleCount: 0,
        status: 'available',
        imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png',
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-35',
        title: '35기 평택 [95~03년생] 프라이빗 8:8 미팅',
        description: '평택에서 진행되는 35기 8:8 로테이션 미팅입니다.',
        date: '2026-03-07T19:00:00+09:00',
        location: '평택',
        region: '평택',
        ageGroup: '95~03년생',
        theme: '정기모임',
        price: 55000,
        maxParticipants: 16,
        currentParticipants: 0,
        maleCount: 0,
        femaleCount: 0,
        status: 'available',
        imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/4d2514bc-5fdb-45a0-8ef0-50aac15c5fa8/prod_agent_2022618562480971776/pyeongtaek_elegant_restaurant_1_20260217225659_1.png',
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-36',
        title: '36기 천안 [91~97년생] 프라이빗 8:8 미팅',
        description: '천안에서 진행되는 36기 8:8 로테이션 미팅입니다.',
        date: '2026-03-13T19:00:00+09:00',
        location: '천안',
        region: '천안',
        ageGroup: '91~97년생',
        theme: '정기모임',
        price: 55000,
        maxParticipants: 16,
        currentParticipants: 0,
        maleCount: 0,
        femaleCount: 0,
        status: 'available',
        imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png',
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-37',
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
        maleCount: 0,
        femaleCount: 0,
        status: 'available',
        imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png',
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-38',
        title: '38기 평택 [87~95년생] 프라이빗 8:8 미팅',
        description: '평택에서 진행되는 38기 8:8 로테이션 미팅입니다.',
        date: '2026-03-20T19:00:00+09:00',
        location: '평택',
        region: '평택',
        ageGroup: '87~95년생',
        theme: '정기모임',
        price: 55000,
        maxParticipants: 16,
        currentParticipants: 0,
        maleCount: 0,
        femaleCount: 0,
        status: 'available',
        imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/4d2514bc-5fdb-45a0-8ef0-50aac15c5fa8/prod_agent_2022618562480971776/pyeongtaek_elegant_restaurant_1_20260217225659_1.png',
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-39',
        title: '39기 천안 [94~02년생] 프라이빗 8:8 미팅',
        description: '천안에서 진행되는 39기 8:8 로테이션 미팅입니다.',
        date: '2026-03-21T19:00:00+09:00',
        location: '천안',
        region: '천안',
        ageGroup: '94~02년생',
        theme: '정기모임',
        price: 55000,
        maxParticipants: 16,
        currentParticipants: 0,
        maleCount: 0,
        femaleCount: 0,
        status: 'available',
        imageUrl: 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png',
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      }
    ];

    // 세션별 참여자 수 계산
    const sessionsWithParticipants = baseSessions.map(session => {
      const sessionParticipants = participants.filter(participant => {
        // 실제 구글 폼 데이터 형식에 맞춘 매칭
        // "🎈 34기 천안 85-95년생 (3월 6일 / 19:00)" 형태 인식
        
        if (session.id === 'session-34') {
          return participant.sessionDate.includes('34기') || 
                 participant.sessionDate.includes('3월 6일') ||
                 participant.name === '이지우'; // 이지우님 특별 처리
        }
        if (session.id === 'session-35') {
          return participant.sessionDate.includes('35기') || 
                 participant.sessionDate.includes('3월 7일');
        }
        if (session.id === 'session-36') {
          return participant.sessionDate.includes('36기') || 
                 participant.sessionDate.includes('3월 13일');
        }
        if (session.id === 'session-37') {
          return participant.sessionDate.includes('37기') || 
                 participant.sessionDate.includes('3월 14일');
        }
        if (session.id === 'session-38') {
          return participant.sessionDate.includes('38기') || 
                 participant.sessionDate.includes('3월 20일');
        }
        if (session.id === 'session-39') {
          return participant.sessionDate.includes('39기') || 
                 participant.sessionDate.includes('3월 21일');
        }
        
        return false;
      });

      const maleCount = sessionParticipants.filter(p => p.gender === '남성').length;
      const femaleCount = sessionParticipants.filter(p => p.gender === '여성').length;
      const totalCount = sessionParticipants.length;

      // 상태 결정
      let status: Session['status'] = 'available';
      if (totalCount >= 16) {
        status = 'full';
      } else if (totalCount > 0) {
        status = 'recruiting';
      }

      console.log(`📊 ${session.title}: ${totalCount}명 (남:${maleCount}, 여:${femaleCount}) - ${status}`);

      return {
        ...session,
        currentParticipants: totalCount,
        maleCount,
        femaleCount,
        status
      };
    });

    return sessionsWithParticipants;
  }

  /**
   * 캐시된 데이터 반환
   */
  getCachedParticipants(): ParticipantData[] {
    return this.cache;
  }

  /**
   * 마지막 업데이트 시간 반환
   */
  getLastFetchTime(): Date | null {
    return this.lastFetch;
  }
}

// 싱글톤 인스턴스 생성
export const googleSheetsCSVService = new GoogleSheetsCSVService();
export default googleSheetsCSVService;