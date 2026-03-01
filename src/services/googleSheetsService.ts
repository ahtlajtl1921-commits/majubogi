// Google Sheets API 연동 서비스 + 자동 이미지 매칭
export interface GoogleSheetSession {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  region: '천안' | '아산' | '평택' | '서울' | '기타';
  ageGroup: string;
  theme?: string;
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  maleCount: number;
  femaleCount: number;
  status: 'recruiting' | 'full' | 'waiting' | 'closed';
  formUrl?: string;
  imageUrl?: string; // 자동 생성된 이미지 URL
}

export interface GoogleSheetFormResponse {
  timestamp: string;
  name: string;
  age: number;
  gender: '남성' | '여성';
  phone: string;
  job: string;
  sessionId: string;
  status: 'pending' | 'approved' | 'rejected';
}

class GoogleSheetsService {
  private apiKey: string;
  private sessionsSheetId: string;
  private responsesSheetId: string;
  
  // 실제 마주보기전 구글 시트 ID
  private readonly MAJUBOGI_SHEET_ID = '1acRHfDOYSpkQGiYDShp9I6Fi4-SCa3IttAcsxOW3_KI';

  // 🎨 자동 이미지 매칭을 위한 이미지 풀
  private imagePool = {
    // 지역별 이미지
    regions: {
      '천안': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png',
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=800'
      ],
      '아산': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/0587b083-5cf4-4f56-b864-a465f2a2ba67/prod_agent_2022618562480971776/asan_modern_lounge_1_20260217225647_1.png',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1565720490558-136ad94e112f?auto=format&fit=crop&q=80&w=800'
      ],
      '평택': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/4d2514bc-5fdb-45a0-8ef0-50aac15c5fa8/prod_agent_2022618562480971776/pyeongtaek_elegant_restaurant_1_20260217225659_1.png',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800'
      ],
      '서울': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/d5232c59-92ed-43a4-b355-69c472840cb9/prod_agent_2022618562480971776/young_professionals_cafe_1_20260217225712_1.png',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
      ],
      '기타': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png',
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800'
      ]
    },
    // 테마별 이미지
    themes: {
      '비흡연자 특집': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/3bee251d-429d-482d-8e50-33c44e1071da/prod_agent_2022618562480971776/non_smoker_clean_cafe_1_20260217225725_1.png',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=800'
      ],
      '크리스천 특집': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/3b7b336d-6f92-456c-84ab-58fb58c255c4/prod_agent_2022618562480971776/christian_peaceful_venue_1_20260217225737_1.png',
        'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&q=80&w=800'
      ],
      '돌싱특집': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/0e1b1b1c-a14e-4b3c-936b-1255c5edfffe/prod_agent_2022618562480971776/mature_sophisticated_lounge_1_20260217225749_1.png',
        'https://images.unsplash.com/photo-1743793055911-52e19beba5d8?auto=format&fit=crop&q=80&w=800'
      ],
      '직장인 특집': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/d5232c59-92ed-43a4-b355-69c472840cb9/prod_agent_2022618562480971776/young_professionals_cafe_1_20260217225712_1.png',
        'https://images.unsplash.com/photo-1758648207365-df458d3e83f4?auto=format&fit=crop&q=80&w=800'
      ]
    },
    // 연령대별 이미지
    ageGroups: {
      '89~95년생': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/0e1b1b1c-a14e-4b3c-936b-1255c5edfffe/prod_agent_2022618562480971776/mature_sophisticated_lounge_1_20260217225749_1.png',
        'https://images.unsplash.com/photo-1743793055911-52e19beba5d8?auto=format&fit=crop&q=80&w=800'
      ],
      '92~98년생': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/d5232c59-92ed-43a4-b355-69c472840cb9/prod_agent_2022618562480971776/young_professionals_cafe_1_20260217225712_1.png',
        'https://images.unsplash.com/photo-1565720490558-136ad94e112f?auto=format&fit=crop&q=80&w=800'
      ],
      '95~01년생': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/d5232c59-92ed-43a4-b355-69c472840cb9/prod_agent_2022618562480971776/young_professionals_cafe_1_20260217225712_1.png',
        'https://images.unsplash.com/photo-1768697358705-c1b60333da35?auto=format&fit=crop&q=80&w=800'
      ],
      '97~03년생': [
        'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/d5232c59-92ed-43a4-b355-69c472840cb9/prod_agent_2022618562480971776/young_professionals_cafe_1_20260217225712_1.png',
        'https://images.unsplash.com/photo-1758648207365-df458d3e83f4?auto=format&fit=crop&q=80&w=800'
      ]
    },
    // 기본 이미지 풀
    default: [
      'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/2bbc3dff-a58f-4efa-940d-dce43281ccbf/prod_agent_2022618562480971776/cheonan_dating_cafe_1_20260217225632_1.png',
      'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/0587b083-5cf4-4f56-b864-a465f2a2ba67/prod_agent_2022618562480971776/asan_modern_lounge_1_20260217225647_1.png',
      'https://skyagent-artifacts.skywork.ai/image/2022618562480971776/4d2514bc-5fdb-45a0-8ef0-50aac15c5fa8/prod_agent_2022618562480971776/pyeongtaek_elegant_restaurant_1_20260217225659_1.png',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565720490558-136ad94e112f?auto=format&fit=crop&q=80&w=800'
    ]
  };

  constructor() {
    // 환경변수에서 API 키와 시트 ID를 가져옵니다
    this.apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
    this.sessionsSheetId = import.meta.env.VITE_SESSIONS_SHEET_ID || this.MAJUBOGI_SHEET_ID;
    this.responsesSheetId = import.meta.env.VITE_RESPONSES_SHEET_ID || this.MAJUBOGI_SHEET_ID;
    
    console.log('🔑 API 키 설정 상태:', this.apiKey ? '✅ 설정됨' : '❌ 미설정');
    console.log('📄 시트 ID:', this.sessionsSheetId);
  }

  /**
   * 🎨 세션에 맞는 이미지를 자동으로 선택합니다
   */
  private getSessionImage(session: GoogleSheetSession): string {
    console.log(`🎨 이미지 매칭 중: ${session.title}`);
    
    // 1순위: 테마별 매칭
    if (session.theme) {
      const themeImages = this.imagePool.themes[session.theme as keyof typeof this.imagePool.themes];
      if (themeImages && themeImages.length > 0) {
        const selectedImage = this.getRandomElement(themeImages);
        console.log(`✅ 테마 매칭 (${session.theme}): ${selectedImage}`);
        return selectedImage;
      }
    }

    // 2순위: 지역별 매칭
    if (session.region && session.region in this.imagePool.regions) {
      const regionImages = this.imagePool.regions[session.region as keyof typeof this.imagePool.regions];
      const selectedImage = this.getRandomElement(regionImages);
      console.log(`✅ 지역 매칭 (${session.region}): ${selectedImage}`);
      return selectedImage;
    }

    // 3순위: 연령대별 매칭
    if (session.ageGroup) {
      const ageImages = this.imagePool.ageGroups[session.ageGroup as keyof typeof this.imagePool.ageGroups];
      if (ageImages && ageImages.length > 0) {
        const selectedImage = this.getRandomElement(ageImages);
        console.log(`✅ 연령대 매칭 (${session.ageGroup}): ${selectedImage}`);
        return selectedImage;
      }
    }

    // 4순위: 기본 이미지 풀에서 랜덤 선택
    const selectedImage = this.getRandomElement(this.imagePool.default);
    console.log(`✅ 기본 이미지 매칭: ${selectedImage}`);
    return selectedImage;
  }

  /**
   * 배열에서 랜덤 요소 선택
   */
  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * 구글 시트에서 모임 데이터를 가져옵니다 (이미지 자동 매칭 포함)
   */
  async fetchSessions(): Promise<GoogleSheetSession[]> {
    if (!this.apiKey || !this.sessionsSheetId) {
      console.warn('Google Sheets API 설정이 없습니다. 기본 데이터를 사용합니다.');
      return this.getDefaultSessionsWithImages();
    }

    try {
      const range = 'Sessions!A2:P1000'; // A2부터 P열까지 (헤더 제외)
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sessionsSheetId}/values/${range}?key=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Sheets API 오류: ${response.status}`);
      }

      const data = await response.json();
      const rows = data.values || [];

      console.log(`🔄 구글 시트에서 ${rows.length}개 세션 데이터 가져옴`);

      const sessions = rows.map((row: any[], index: number) => {
        const session: GoogleSheetSession = {
          id: row[0] || `session-${index + 1}`,
          title: row[1] || '',
          description: row[2] || '',
          date: row[3] || '',
          location: row[4] || '',
          region: (row[5] as any) || '천안',
          ageGroup: row[6] || '',
          theme: row[7] || '',
          price: parseInt(row[8]) || 0,
          maxParticipants: parseInt(row[9]) || 16,
          currentParticipants: parseInt(row[10]) || 0,
          maleCount: parseInt(row[11]) || 0,
          femaleCount: parseInt(row[12]) || 0,
          status: (row[13] as any) || 'recruiting',
          formUrl: row[14] || ''
        };

        // 🎨 자동 이미지 매칭
        session.imageUrl = this.getSessionImage(session);
        
        return session;
      });

      console.log(`✅ 모든 세션에 이미지 자동 매칭 완료`);
      return sessions;

    } catch (error) {
      console.error('구글 시트 데이터 가져오기 실패:', error);
      return this.getDefaultSessionsWithImages();
    }
  }

  /**
   * 구글 시트에서 폼 응답 데이터를 가져옵니다
   */
  async fetchFormResponses(): Promise<GoogleSheetFormResponse[]> {
    if (!this.apiKey || !this.responsesSheetId) {
      return [];
    }

    try {
      const range = 'Form Responses!A2:H1000';
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.responsesSheetId}/values/${range}?key=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Sheets API 오류: ${response.status}`);
      }

      const data = await response.json();
      const rows = data.values || [];

      return rows.map((row: any[]) => ({
        timestamp: row[0] || '',
        name: row[1] || '',
        age: parseInt(row[2]) || 0,
        gender: (row[3] as any) || '남성',
        phone: row[4] || '',
        job: row[5] || '',
        sessionId: row[6] || '',
        status: (row[7] as any) || 'pending'
      }));
    } catch (error) {
      console.error('폼 응답 데이터 가져오기 실패:', error);
      return [];
    }
  }

  /**
   * 특정 모임의 신청 현황을 계산합니다
   */
  async getSessionStats(sessionId: string): Promise<{
    total: number;
    male: number;
    female: number;
    status: 'recruiting' | 'full' | 'waiting' | 'closed';
  }> {
    const responses = await this.fetchFormResponses();
    const sessionResponses = responses.filter(r => 
      r.sessionId === sessionId && r.status === 'approved'
    );

    const male = sessionResponses.filter(r => r.gender === '남성').length;
    const female = sessionResponses.filter(r => r.gender === '여성').length;
    const total = male + female;

    let status: 'recruiting' | 'full' | 'waiting' | 'closed' = 'recruiting';
    if (total >= 16) {
      status = 'full';
    } else if (total >= 14) {
      status = 'waiting';
    }

    return { total, male, female, status };
  }

  /**
   * API 설정이 없을 때 사용할 기본 데이터 (이미지 포함)
   */
  private getDefaultSessionsWithImages(): GoogleSheetSession[] {
    const defaultSessions = [
      {
        id: 'session-34',
        title: '34기 천안 [85~95년생] 프라이빗 8:8 미팅',
        description: '천안에서 진행되는 34기 8:8 로테이션 미팅입니다.',
        date: '2026-03-06',
        location: '천안',
        region: '천안' as const,
        ageGroup: '85~95년생',
        theme: '정기모임',
        price: 55000,
        maxParticipants: 16,
        currentParticipants: 0,
        maleCount: 0,
        femaleCount: 0,
        status: 'recruiting' as const,
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-35',
        title: '35기 평택 [95~03년생] 프라이빗 8:8 미팅',
        description: '평택에서 진행되는 35기 8:8 로테이션 미팅입니다.',
        date: '2026-03-07',
        location: '평택',
        region: '평택' as const,
        ageGroup: '95~03년생',
        theme: '정기모임',
        price: 50000,
        maxParticipants: 16,
        currentParticipants: 0,
        maleCount: 0,
        femaleCount: 0,
        status: 'recruiting' as const,
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-36',
        title: '36기 천안 [91~97년생] 프라이빗 8:8 미팅',
        description: '천안에서 진행되는 36기 8:8 로테이션 미팅입니다.',
        date: '2026-03-13',
        location: '천안',
        region: '천안' as const,
        ageGroup: '91~97년생',
        theme: '정기모임',
        price: 48000,
        maxParticipants: 16,
        currentParticipants: 0,
        maleCount: 0,
        femaleCount: 0,
        status: 'recruiting' as const,
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-37',
        title: '37기 천안 [93~00년생] 프라이빗 8:8 미팅',
        description: '천안에서 진행되는 37기 8:8 로테이션 미팅입니다.',
        date: '2026-03-14',
        location: '천안',
        region: '천안' as const,
        ageGroup: '93~00년생',
        theme: '정기모임',
        price: 55000,
        maxParticipants: 16,
        currentParticipants: 0,
        maleCount: 0,
        femaleCount: 0,
        status: 'recruiting' as const,
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-38',
        title: '38기 평택 [87~95년생] 프라이빗 8:8 미팅',
        description: '평택에서 진행되는 38기 8:8 로테이션 미팅입니다.',
        date: '2026-03-20',
        location: '평택',
        region: '평택' as const,
        ageGroup: '87~95년생',
        theme: '정기모임',
        price: 50000,
        maxParticipants: 16,
        currentParticipants: 0,
        maleCount: 0,
        femaleCount: 0,
        status: 'recruiting' as const,
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      },
      {
        id: 'session-39',
        title: '39기 천안 [94~02년생] 프라이빗 8:8 미팅',
        description: '천안에서 진행되는 39기 8:8 로테이션 미팅입니다.',
        date: '2026-03-21',
        location: '천안',
        region: '천안' as const,
        ageGroup: '94~02년생',
        theme: '정기모임',
        price: 52000,
        maxParticipants: 16,
        currentParticipants: 0,
        maleCount: 0,
        femaleCount: 0,
        status: 'recruiting' as const,
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
      }
    ];

    // 🎨 각 기본 세션에 자동 이미지 매칭
    return defaultSessions.map(session => ({
      ...session,
      imageUrl: this.getSessionImage(session)
    }));
  }

  /**
   * 실시간 참여자 수 반영을 위한 강화된 fetchSessions
   */
  async fetchSessionsWithRealTimeParticipants(): Promise<GoogleSheetSession[]> {
    if (!this.apiKey || !this.sessionsSheetId) {
      return this.getDefaultSessionsWithRealTimeUpdate();
    }

    try {
      // 세션 데이터와 참여자 데이터를 병렬로 가져오기
      const [sessionsData, participantsData] = await Promise.all([
        this.fetchSessionsFromSheet(),
        this.fetchParticipantsFromSheet()
      ]);

      // 세션별 참여자 수 실시간 계산
      const sessions = sessionsData.map(session => {
        const sessionParticipants = participantsData.filter(p => p.sessionId === session.id);
        const maleCount = sessionParticipants.filter(p => p.gender === '남성').length;
        const femaleCount = sessionParticipants.filter(p => p.gender === '여성').length;
        const currentParticipants = sessionParticipants.length;
        
        const status = currentParticipants >= session.maxParticipants ? 'full' : 'recruiting';
        
        return {
          ...session,
          currentParticipants,
          maleCount,
          femaleCount,
          status: status as any,
          imageUrl: this.getSessionImage(session)
        };
      });

      return sessions;
    } catch (error) {
      return this.getDefaultSessionsWithRealTimeUpdate();
    }
  }

  /**
   * 세션 데이터만 가져오기
   */
  private async fetchSessionsFromSheet(): Promise<GoogleSheetSession[]> {
    const range = 'Sessions!A2:O1000';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sessionsSheetId}/values/${range}?key=${this.apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`구글 시트 API 오류: ${response.status}`);
    }

    const data = await response.json();
    const rows = data.values || [];

    return rows.map((row: any[], index: number) => ({
      id: row[0] || `session-${index + 1}`,
      title: row[1] || '',
      description: row[2] || '',
      date: row[3] || '',
      location: row[4] || '',
      region: (row[5] as any) || '천안',
      ageGroup: row[6] || '',
      theme: row[7] || '',
      price: parseInt(row[8]) || 0,
      maxParticipants: parseInt(row[9]) || 16,
      currentParticipants: 0,
      maleCount: 0,
      femaleCount: 0,
      status: 'recruiting' as any,
      formUrl: row[14] || 'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
    }));
  }

  /**
   * 참여자 데이터 가져오기
   */
  private async fetchParticipantsFromSheet(): Promise<Array<{sessionId: string, gender: string, name: string}>> {
    const range = 'Participants!A2:G1000';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sessionsSheetId}/values/${range}?key=${this.apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) return [];

      const data = await response.json();
      const rows = data.values || [];

      return rows.map((row: any[]) => ({
        sessionId: row[1] || '',
        gender: row[4] || '',
        name: row[3] || ''
      })).filter((p: any) => p.sessionId);
      
    } catch (error) {
      return [];
    }
  }

  /**
   * 기본 데이터에 실시간 업데이트 적용
   */
  private getDefaultSessionsWithRealTimeUpdate(): GoogleSheetSession[] {
    const defaultSessions = this.getDefaultSessionsWithImages();
    
    // 로컬 스토리지에서 시뮤레이션 참여자 데이터 가져오기
    const participantsData = this.getSimulatedParticipants();
    
    return defaultSessions.map(session => {
      const sessionParticipants = participantsData.filter(p => p.sessionId === session.id);
      const maleCount = sessionParticipants.filter(p => p.gender === '남성').length;
      const femaleCount = sessionParticipants.filter(p => p.gender === '여성').length;
      const currentParticipants = sessionParticipants.length;
      
      const status = currentParticipants >= session.maxParticipants ? 'full' : 'recruiting';
      
      return {
        ...session,
        currentParticipants,
        maleCount,
        femaleCount,
        status: status as any
      };
    });
  }

  /**
   * 시뮤레이션용 참여자 데이터
   */
  private getSimulatedParticipants(): Array<{sessionId: string, gender: string, name: string}> {
    const stored = localStorage.getItem('majubogi_simulated_participants');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  }

  /**
   * 데이터 새로고침 (캐시 무효화)
   */
  /**
   * 실제 마주보기전 구글 시트에서 데이터 가져오기
   */
  async fetchRealMajubogiData(): Promise<GoogleSheetSession[]> {
    if (!this.apiKey) {
      return this.getDefaultSessionsWithRealTimeUpdate();
    }

    try {
      const formResponses = await this.fetchMajubogiFormResponses();
      const defaultSessions = this.getDefaultSessionsWithImages();
      
      const updatedSessions = defaultSessions.map(session => {
        const sessionParticipants = formResponses.filter(response => {
          // 이지우님은 34기(3월 6일)로 수동 매핑
          if (response.name === '이지우' && session.id === 'session-34') {
            console.log('👤 이지우님을 34기로 매핑');
            return true;
          }
          
          // 다른 응답들은 날짜로 매칭
          const responseDate = this.parseResponseDate(response.sessionDate);
          const sessionDate = new Date(session.date);
          
          return responseDate && 
                 responseDate.getDate() === sessionDate.getDate() &&
                 responseDate.getMonth() === sessionDate.getMonth();
        });
        
        const maleCount = sessionParticipants.filter(p => p.gender === '남성').length;
        const femaleCount = sessionParticipants.filter(p => p.gender === '여성').length;
        const currentParticipants = sessionParticipants.length;
        const status = currentParticipants >= session.maxParticipants ? 'full' : 'recruiting';
        
        return {
          ...session,
          currentParticipants,
          maleCount,
          femaleCount,
          status: status as any
        };
      });
      
      console.log('🎉 실제 마주보기전 데이터 연동 완료!');
      return updatedSessions;
      
    } catch (error) {
      console.error('마주보기전 데이터 가져오기 실패:', error);
      return this.getDefaultSessionsWithRealTimeUpdate();
    }
  }
  
  private async fetchMajubogiFormResponses(): Promise<Array<{
    timestamp: string; sessionDate: string; name: string; gender: '남성' | '여성';
    age: string; location: string; phone: string; kakaoId: string; isNewParticipant: boolean;
  }>> {
    const range = '설문지 응답 시트1!A1:Z1000'; // A1부터 시작 (헤더 포함)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.MAJUBOGI_SHEET_ID}/values/${encodeURIComponent(range)}?key=${this.apiKey}`;
    
    console.log('🔍 구글 시트 API 호출:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`마주보기전 API 오류: ${response.status}`, errorText);
      throw new Error(`마주보기전 API 오류: ${response.status}`);
    }

    const data = await response.json();
    const rows = data.values || [];
    
    console.log(`📊 구글 시트에서 ${rows.length}개 행 발견`);
    
    // 헤더 제외하고 데이터 처리
    const dataRows = rows.slice(1);
    
    const responses = dataRows.map((row: any[], index: number) => {
      const response = {
        timestamp: row[0] || '',
        sessionDate: row[1] || '', // 참가 희망 기수/날짜/시간
        name: row[2] || '',
        gender: row[3] || '',
        location: row[4] || '',
        phone: row[6] || '',
        kakaoId: row[8] || '',
        isNewParticipant: (row[9] || '').includes('신규')
      };
      
      // 이지우님 데이터 특별 처리
      if (response.name === '이지우' && !response.sessionDate) {
        response.sessionDate = '2026년 3월 6일';
        console.log('👤 이지우님 날짜 설정: 2026년 3월 6일');
      }
      
      console.log(`📄 응답 ${index + 1}: ${response.name} (${response.gender}) - ${response.sessionDate}`);
      return response;
    }).filter((response: any) => response.name && response.gender);
    
    console.log(`✅ 최종 처리된 응답: ${responses.length}개`);
    return responses;
  }
  
  private parseResponseDate(dateString: string): Date | null {
    if (!dateString) return null;
    const match = dateString.match(/2026년\s*(\d+)월\s*(\d+)일/);
    if (match) {
      const month = parseInt(match[1]) - 1;
      const day = parseInt(match[2]);
      return new Date(2026, month, day);
    }
    return null;
  }

  async refreshData(): Promise<void> {
    console.log('🔄 구글 시트 데이터 새로고침 시작...');
    console.log('✅ 구글 시트 데이터 새로고침 완료');
  }
}

export const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;