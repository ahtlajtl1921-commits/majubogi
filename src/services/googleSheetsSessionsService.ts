/**
 * ==========================================
 * Google Sheets Sessions Data Reader
 * ==========================================
 * 구글 스크립트가 생성한 Sessions 시트에서 실시간 데이터 읽기
 */

import type { Session } from '@/lib/index';

// 설정
const CONFIG = {
  // Sessions 시트 CSV URL (웹에 게시 필요)
  SESSIONS_CSV_URL: "https://docs.google.com/spreadsheets/d/1acRHfDOYSpkQGiYDShp9I6Fi4-SCa3IttAcsxOW3_KI/pub?gid=SESSIONS_SHEET_GID&single=true&output=csv",
  
  // 데이터 갱신 주기 (3분 = 180000ms)
  REFRESH_RATE: 180000
};

interface GoogleSheetSessionData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  region: string;
  ageGroup: string;
  theme: string;
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  maleCount: number;
  femaleCount: number;
  status: string;
  formUrl: string;
}

export class GoogleSheetsSessionsService {
  private cache: GoogleSheetSessionData[] = [];
  private lastFetch: Date | null = null;

  /**
   * Sessions 시트에서 실시간 데이터 가져오기
   */
  async fetchSessionsFromGoogleSheets(): Promise<GoogleSheetSessionData[]> {
    console.log('📊 구글 시트 Sessions 데이터 가져오는 중...');
    
    // 임시로 테스트 데이터 사용 (구글 스크립트 실행 후 실제 데이터로 교체)
    const testSessions: GoogleSheetSessionData[] = [
      {
        id: 'session-34',
        title: '34기 천안 [85~95년생] 프라이빗 8:8 미팅',
        description: '천안에서 진행되는 34기 8:8 로테이션 미팅입니다.',
        date: '2026-03-06',
        location: '천안',
        region: '천안',
        ageGroup: '85~95년생',
        theme: '정기모임',
        price: 55000,
        maxParticipants: 16,
        currentParticipants: 1, // 이지우님 1명
        maleCount: 1,
        femaleCount: 0,
        status: 'recruiting',
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-35',
        title: '35기 평택 [95~03년생] 프라이빗 8:8 미팅',
        description: '평택에서 진행되는 35기 8:8 로테이션 미팅입니다.',
        date: '2026-03-07',
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
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-36',
        title: '36기 천안 [91~97년생] 프라이빗 8:8 미팅',
        description: '천안에서 진행되는 36기 8:8 로테이션 미팅입니다.',
        date: '2026-03-13',
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
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-37',
        title: '37기 천안 [93~00년생] 프라이빗 8:8 미팅',
        description: '천안에서 진행되는 37기 8:8 로테이션 미팅입니다.',
        date: '2026-03-14',
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
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-38',
        title: '38기 평택 [87~95년생] 프라이빗 8:8 미팅',
        description: '평택에서 진행되는 38기 8:8 로테이션 미팅입니다.',
        date: '2026-03-20',
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
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-39',
        title: '39기 천안 [94~02년생] 프라이빗 8:8 미팅',
        description: '천안에서 진행되는 39기 8:8 로테이션 미팅입니다.',
        date: '2026-03-21',
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
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      }
    ];
    
    console.log('✅ Sessions 데이터 로드 완료:', testSessions.length, '개 세션');
    testSessions.forEach(session => {
      console.log(`📊 ${session.title}: ${session.currentParticipants}명 (남:${session.maleCount}, 여:${session.femaleCount}) - ${session.status}`);
    });
    
    this.cache = testSessions;
    this.lastFetch = new Date();
    
    return testSessions;
    
    /* 실제 CSV 연동 코드 (구글 스크립트 설정 후 사용)
    try {
      const freshUrl = `${CONFIG.SESSIONS_CSV_URL}&t=${new Date().getTime()}`;
      const response = await fetch(freshUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const csvText = await response.text();
      const rows = this.parseCSV(csvText);
      
      const sessions: GoogleSheetSessionData[] = [];
      
      // 헤더 제외하고 데이터 처리
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length < 15) continue;
        
        const session: GoogleSheetSessionData = {
          id: row[0] || '',
          title: row[1] || '',
          description: row[2] || '',
          date: row[3] || '',
          location: row[4] || '',
          region: row[5] || '',
          ageGroup: row[6] || '',
          theme: row[7] || '',
          price: parseInt(row[8]) || 55000,
          maxParticipants: parseInt(row[9]) || 16,
          currentParticipants: parseInt(row[10]) || 0,
          maleCount: parseInt(row[11]) || 0,
          femaleCount: parseInt(row[12]) || 0,
          status: row[13] || 'available',
          formUrl: row[14] || ''
        };
        
        sessions.push(session);
      }
      
      this.cache = sessions;
      this.lastFetch = new Date();
      
      return sessions;
      
    } catch (error) {
      console.error('❌ Sessions CSV 로드 실패:', error);
      return this.cache;
    }
    */
  }

  /**
   * Session 타입으로 변환
   */
  async getSessionsWithRealTimeData(): Promise<Session[]> {
    const googleSheetSessions = await this.fetchSessionsFromGoogleSheets();
    
    return googleSheetSessions.map(gsSession => ({
      id: gsSession.id,
      title: gsSession.title,
      description: gsSession.description,
      date: `${gsSession.date}T19:00:00+09:00`, // 시간 추가
      location: gsSession.location,
      region: gsSession.region as Session['region'], // 타입 캐스팅
      ageGroup: gsSession.ageGroup,
      theme: gsSession.theme,
      price: gsSession.price,
      maxParticipants: gsSession.maxParticipants,
      currentParticipants: gsSession.currentParticipants,
      maleCount: gsSession.maleCount,
      femaleCount: gsSession.femaleCount,
      status: gsSession.status as Session['status'],
      imageUrl: this.getSessionImage(gsSession),
      formUrl: gsSession.formUrl
    }));
  }

  /**
   * 세션별 이미지 매핑
   */
  private getSessionImage(session: GoogleSheetSessionData): string {
    const imageMap: Record<string, string> = {
      'session-34': 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png',
      'session-35': 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/4d2514bc-5fdb-45a0-8ef0-50aac15c5fa8/prod_agent_2022618562480971776/pyeongtaek_elegant_restaurant_1_20260217225659_1.png',
      'session-36': 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png',
      'session-37': 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png',
      'session-38': 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/4d2514bc-5fdb-45a0-8ef0-50aac15c5fa8/prod_agent_2022618562480971776/pyeongtaek_elegant_restaurant_1_20260217225659_1.png',
      'session-39': 'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png'
    };
    
    return imageMap[session.id] || imageMap['session-34'];
  }

  /**
   * CSV 파서
   */
  private parseCSV(text: string): string[][] {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentVal = '';
    let insideQuote = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (insideQuote && nextChar === '"') {
          currentVal += '"';
          i++;
        } else {
          insideQuote = !insideQuote;
        }
      } else if (char === ',' && !insideQuote) {
        currentRow.push(currentVal);
        currentVal = '';
      } else if ((char === '\r' || char === '\n') && !insideQuote) {
        if (char === '\r' && nextChar === '\n') i++;
        currentRow.push(currentVal);
        rows.push(currentRow);
        currentRow = [];
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    
    if (currentVal) currentRow.push(currentVal);
    if (currentRow.length) rows.push(currentRow);

    return rows;
  }

  /**
   * 캐시된 데이터 반환
   */
  getCachedSessions(): GoogleSheetSessionData[] {
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
export const googleSheetsSessionsService = new GoogleSheetsSessionsService();
export default googleSheetsSessionsService;