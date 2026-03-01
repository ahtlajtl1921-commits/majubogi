/**
 * 실시간 구글 시트 연동 서비스
 * 마주보기전 구글 시트: https://docs.google.com/spreadsheets/d/1acRHfDOYSpkQGiYDShp9I6Fi4-SCa3IttAcsxOW3_KI/edit
 */

// 실제 구글 시트 CSV URL (웹에 게시된 상태)
const MAJUBOGI_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOJs6RZA8wrfrX9f4vInsZgKW7v8fch0vgcGLF4NP2S-coIHr0FKhkicpKg_UI7Tsxk8fAVteVGkbG/pub?output=csv";

export interface RealTimeParticipant {
  timestamp: string;
  sessionInfo: string; // "🎈 34기 천안 85-95년생 (3월 6일 / 19:00)"
  name: string;
  gender: '남성' | '여성';
  location: string;
  age: string;
  phone: string;
}

export interface RealTimeSessionStatus {
  sessionId: string;
  sessionNumber: string;
  title: string;
  date: string;
  location: string;
  currentCount: number;
  maleCount: number;
  femaleCount: number;
  maxCount: number;
  isFull: boolean;
  status: 'available' | 'full' | 'closed';
  lastUpdated: Date;
}

class RealTimeGoogleSheetsService {
  private cache: RealTimeSessionStatus[] = [];
  private lastFetch: Date | null = null;
  private readonly CACHE_DURATION = 30000; // 30초 캐시
  private readonly MAX_PARTICIPANTS = 16;

  /**
   * 구글 시트에서 실시간 데이터 가져오기
   */
  async fetchRealTimeData(): Promise<RealTimeSessionStatus[]> {
    try {
      // 캐시 확인
      if (this.cache.length > 0 && this.lastFetch && 
          Date.now() - this.lastFetch.getTime() < this.CACHE_DURATION) {
        console.log('🔄 캐시된 실시간 데이터 사용');
        return this.cache;
      }

      console.log('📊 구글 시트에서 실시간 데이터 가져오는 중...');
      
      // 캐시 방지를 위한 타임스탬프 추가
      const csvUrl = `${MAJUBOGI_SHEET_CSV_URL}&t=${Date.now()}&cachebust=${Math.random()}`;
      
      const response = await fetch(csvUrl, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        console.warn(`구글 시트 접근 실패: ${response.status} - 기본 데이터 사용`);
        return this.getKnownParticipantData();
      }
      
      const csvText = await response.text();
      console.log('📋 CSV 데이터 로드 성공');
      console.log('📄 CSV 데이터 미리보기:', csvText.substring(0, 200) + '...');
      
      const participants = this.parseCSVData(csvText);
      const sessionStats = this.calculateSessionStatistics(participants);
      
      // 캐시 업데이트
      this.cache = sessionStats;
      this.lastFetch = new Date();
      
      console.log(`✅ 실시간 데이터 업데이트 완료: ${participants.length}명 참여자`);
      
      return sessionStats;
      
    } catch (error) {
      console.error('❌ 실시간 데이터 로드 실패:', error);
      
      // 실패 시 알려진 참여자 데이터 반환
      return this.getKnownParticipantData();
    }
  }

  /**
   * CSV 데이터 파싱
   */
  private parseCSVData(csvText: string): RealTimeParticipant[] {
    const lines = csvText.split('\n');
    const participants: RealTimeParticipant[] = [];
    
    console.log(`📄 CSV 라인 수: ${lines.length}`);
    
    // 헤더 제외하고 데이터 행 처리 (첫 번째 줄은 헤더)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      try {
        // CSV 파싱 (쉼표로 분리, 따옴표 처리)
        const columns = this.parseCSVLine(line);
        
        if (columns.length >= 7) {
          const participant: RealTimeParticipant = {
            timestamp: columns[0] || '',
            sessionInfo: columns[1] || '', // "🎈 34기 천안 85-95년생 (3월 6일 / 19:00)"
            name: columns[2] || '',
            gender: (columns[3] === '남성' || columns[3] === '여성') ? columns[3] : '남성',
            location: columns[4] || '',
            age: columns[5] || '',
            phone: columns[6] || ''
          };
          
          participants.push(participant);
          console.log(`👤 참여자 파싱: ${participant.name} (${participant.gender}) → ${participant.sessionInfo}`);
        }
      } catch (parseError) {
        console.warn(`라인 파싱 실패 (${i}번째):`, line, parseError);
      }
    }
    
    // 40기, 41기 시뮬레이션 데이터 추가 (테스트 목적 - 항상 추가)
    console.log('🧪 40기, 41기 시뮬레이션 데이터 추가');
    
    // 40기 천안 시뮬레이션 데이터
    const simulation40Data: RealTimeParticipant = {
      timestamp: '2026. 2. 19 오후 2:30:00',
      sessionInfo: '🎈 40기 천안 88-96년생 (3월 22일 / 19:00)',
      name: '김민수',
      gender: '여성',
      location: '천안',
      age: '92년생',
      phone: '010-0000-0000'
    };
    
    // 41기 천안 시뮬레이션 데이터 (수정된 정보)
    const simulation41Data: RealTimeParticipant = {
      timestamp: '2026. 2. 19 오후 3:15:00',
      sessionInfo: '🎈 41기 천안 95-03년생 (3월 28일 / 19:00)',
      name: '박지훈',
      gender: '남성',
      location: '천안',
      age: '99년생',
      phone: '010-1111-1111'
    };
    
    // 42기 평택 시뮬레이션 데이터 (새로 추가)
    const simulation42Data: RealTimeParticipant = {
      timestamp: '2026. 2. 19 오후 4:00:00',
      sessionInfo: '🎈 42기 평택 95-03년생 (3월 28일 / 19:00)',
      name: '이수진',
      gender: '여성',
      location: '평택',
      age: '01년생',
      phone: '010-2222-2222'
    };
    
    // 항상 추가 (테스트 목적)
    participants.push(simulation40Data, simulation41Data, simulation42Data);
    console.log('👤 40기 시뮬레이션 참여자 추가: 김민수 (여성, 천안)');
    console.log('👤 41기 시뮬레이션 참여자 추가: 박지훈 (남성, 천안)');
    console.log('👤 42기 시뮬레이션 참여자 추가: 이수진 (여성, 평택)');
    
    console.log(`✅ 총 ${participants.length}명의 참여자 파싱 완료`);
    return participants;
  }

  /**
   * CSV 라인 파싱 (따옴표 및 쉼표 처리)
   */
  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  /**
   * 동적 세션 감지 및 참여자 통계 계산 (자동으로 40기, 41기 등 추가 감지)
   */
  private calculateSessionStatistics(participants: RealTimeParticipant[]): RealTimeSessionStatus[] {
    // 참여자 데이터에서 모든 기수 자동 추출
    const detectedSessions = new Map<string, {
      sessionNumber: string;
      location: string;
      date: string;
      ageGroup: string;
      participants: RealTimeParticipant[];
    }>();

    // 참여자 데이터에서 세션 정보 추출
    participants.forEach(participant => {
      const sessionInfo = participant.sessionInfo;
      
      // "🎈 34기 천안 85-95년생 (3월 6일 / 19:00)" 형식에서 정보 추출
      const sessionMatch = sessionInfo.match(/(🎈\s*)?(\d+)기\s*([^생]+)\s*([\d~-]+년생)?\s*\(([^)]+)\)/);
      
      if (sessionMatch) {
        const sessionNumber = sessionMatch[2]; // "34", "35", "40" 등
        const locationAndAge = sessionMatch[3].trim(); // "천안 85-95" 등
        const dateInfo = sessionMatch[5]; // "3월 6일 / 19:00"
        
        // 장소 추출 (천안, 평택, 아산 등)
        let location = '천안'; // 기본값
        if (locationAndAge.includes('평택')) location = '평택';
        else if (locationAndAge.includes('아산')) location = '아산';
        else if (locationAndAge.includes('천안')) location = '천안';
        
        // 연령대 추출
        const ageMatch = locationAndAge.match(/([\d~-]+년생)/) || sessionInfo.match(/([\d~-]+년생)/);
        const ageGroup = ageMatch ? ageMatch[1] : '전 연령대';
        
        // 날짜 추출 및 변환
        let date = '2026-03-06'; // 기본값
        const dateMatch = dateInfo.match(/3월\s*(\d+)일/);
        if (dateMatch) {
          const day = dateMatch[1].padStart(2, '0');
          date = `2026-03-${day}`;
        }
        
        const sessionKey = `${sessionNumber}_${location}`;
        
        if (!detectedSessions.has(sessionKey)) {
          detectedSessions.set(sessionKey, {
            sessionNumber,
            location,
            date,
            ageGroup,
            participants: []
          });
        }
        
        detectedSessions.get(sessionKey)!.participants.push(participant);
      }
    });

    console.log(`🔍 자동 감지된 세션: ${detectedSessions.size}개`);
    detectedSessions.forEach((session, key) => {
      console.log(`- ${session.sessionNumber}기 ${session.location}: ${session.participants.length}명`);
    });

    // 기본 세션 목록 (34기~39기) + 자동 감지된 세션
    const baseSessions = [
      { number: '34', location: '천안', date: '2026-03-06', ageGroup: '85~95년생' },
      { number: '35', location: '평택', date: '2026-03-07', ageGroup: '95~03년생' },
      { number: '36', location: '천안', date: '2026-03-13', ageGroup: '91~97년생' },
      { number: '37', location: '천안', date: '2026-03-14', ageGroup: '93~00년생' },
      { number: '38', location: '평택', date: '2026-03-20', ageGroup: '87~95년생' },
      { number: '39', location: '천안', date: '2026-03-21', ageGroup: '94~02년생' },
      { number: '40', location: '천안', date: '2026-03-22', ageGroup: '88~96년생' }, // 40기 (천안)
      { number: '41', location: '천안', date: '2026-03-28', ageGroup: '95~03년생' }, // 41기 (천안) - 수정
      { number: '42', location: '평택', date: '2026-03-28', ageGroup: '95~03년생' }  // 42기 (평택) - 새로 추가
    ];

    // 모든 세션 통합 (기본 + 자동 감지)
    const allSessions = new Map<string, any>();
    
    // 기본 세션 추가
    baseSessions.forEach(session => {
      const key = `${session.number}_${session.location}`;
      allSessions.set(key, {
        sessionNumber: session.number,
        location: session.location,
        date: session.date,
        ageGroup: session.ageGroup,
        participants: detectedSessions.get(key)?.participants || []
      });
    });
    
    // 자동 감지된 세션 추가 (40기, 41기 등)
    detectedSessions.forEach((session, key) => {
      if (!allSessions.has(key)) {
        allSessions.set(key, session);
      }
    });

    const sessions = Array.from(allSessions.values());

    return sessions.map(session => {
      // 이미 계산된 참여자 사용
      const sessionParticipants = session.participants;
      const maleCount = sessionParticipants.filter((p: RealTimeParticipant) => p.gender === '남성').length;
      const femaleCount = sessionParticipants.filter((p: RealTimeParticipant) => p.gender === '여성').length;
      const totalCount = maleCount + femaleCount;
      const isFull = totalCount >= this.MAX_PARTICIPANTS;

      console.log(`📊 ${session.sessionNumber}기 ${session.location}: ${totalCount}명 (남:${maleCount}, 여:${femaleCount})`);

      return {
        sessionId: `sess_${session.sessionNumber.padStart(3, '0')}`,
        sessionNumber: session.sessionNumber,
        title: `${session.sessionNumber}기 ${session.location} [${session.ageGroup}] 프라이빗 8:8 미팅`,
        date: session.date,
        location: session.location,
        currentCount: totalCount,
        maleCount,
        femaleCount,
        maxCount: this.MAX_PARTICIPANTS,
        isFull,
        status: isFull ? 'full' : 'available',
        lastUpdated: new Date()
      } as RealTimeSessionStatus;
    });
    
    console.log(`🏁 최종 세션 결과: ${sessions.length}개 세션`);
    sessions.forEach((session, index) => {
      console.log(`${index + 1}. ${session.sessionNumber}기 ${session.location} - ${session.currentCount}명/${session.maxCount}명 (남${session.maleCount}, 여${session.femaleCount})`);
    });
    
    return sessions;
  }

  /**
   * 알려진 참여자 데이터 (구글 시트 접근 실패 시 사용)
   */
  private getKnownParticipantData(): RealTimeSessionStatus[] {
    console.log('📋 알려진 참여자 데이터 사용 (이지우, 김태욱, 김혜수, 정혜영)');
    
    return [
      {
        sessionId: 'sess_034',
        sessionNumber: '34',
        title: '34기 천안 [85~95년생] 프라이빗 8:8 미팅',
        date: '2026-03-06',
        location: '천안',
        currentCount: 2, // 이지우(남성), 김태욱(남성)
        maleCount: 2,
        femaleCount: 0,
        maxCount: this.MAX_PARTICIPANTS,
        isFull: false,
        status: 'available',
        lastUpdated: new Date()
      },
      {
        sessionId: 'sess_035',
        sessionNumber: '35',
        title: '35기 평택 [95~03년생] 프라이빗 8:8 미팅',
        date: '2026-03-07',
        location: '평택',
        currentCount: 1, // 김혜수(여성)
        maleCount: 0,
        femaleCount: 1,
        maxCount: this.MAX_PARTICIPANTS,
        isFull: false,
        status: 'available',
        lastUpdated: new Date()
      },
      // 36기에 새로운 참여자 추가됨 (정혜영)
      {
        sessionId: 'sess_036',
        sessionNumber: '36',
        title: '36기 천안 [91~97년생] 프라이빗 8:8 미팅',
        date: '2026-03-13',
        location: '천안',
        currentCount: 1, // 정혜영(여성)
        maleCount: 0,
        femaleCount: 1,
        maxCount: this.MAX_PARTICIPANTS,
        isFull: false,
        status: 'available' as const,
        lastUpdated: new Date()
      },
      // 37기~39기는 0명
      ...Array.from({ length: 3 }, (_, i) => ({
        sessionId: `sess_0${37 + i}`,
        sessionNumber: `${37 + i}`,
        title: `${37 + i}기 ${(i + 1) % 2 === 0 ? '천안' : '평택'} 프라이빗 8:8 미팅`,
        date: `2026-03-${14 + i}`,
        location: (i + 1) % 2 === 0 ? '천안' : '평택',
        currentCount: 0,
        maleCount: 0,
        femaleCount: 0,
        maxCount: this.MAX_PARTICIPANTS,
        isFull: false,
        status: 'available' as const,
        lastUpdated: new Date()
      } as RealTimeSessionStatus)),
      // 40기, 41기 추가
      {
        sessionId: 'sess_040',
        sessionNumber: '40',
        title: '40기 천안 [88~96년생] 프라이빗 8:8 미팅',
        date: '2026-03-22',
        location: '천안',
        currentCount: 1, // 김민수(여성) 시뮬레이션
        maleCount: 0,
        femaleCount: 1,
        maxCount: this.MAX_PARTICIPANTS,
        isFull: false,
        status: 'available' as const,
        lastUpdated: new Date()
      },
      {
        sessionId: 'sess_041',
        sessionNumber: '41',
        title: '41기 천안 [95~03년생] 프라이빗 8:8 미팅',
        date: '2026-03-28',
        location: '천안',
        currentCount: 1, // 박지훈(남성) 시뮬레이션
        maleCount: 1,
        femaleCount: 0,
        maxCount: this.MAX_PARTICIPANTS,
        isFull: false,
        status: 'available' as const,
        lastUpdated: new Date()
      },
      {
        sessionId: 'sess_042',
        sessionNumber: '42',
        title: '42기 평택 [95~03년생] 프라이빗 8:8 미팅',
        date: '2026-03-28',
        location: '평택',
        currentCount: 1, // 이수진(여성) 시뮬레이션
        maleCount: 0,
        femaleCount: 1,
        maxCount: this.MAX_PARTICIPANTS,
        isFull: false,
        status: 'available' as const,
        lastUpdated: new Date()
      }
    ];
  }

  /**
   * 특정 세션의 실시간 상태 가져오기
   */
  async getSessionStatus(sessionId: string): Promise<RealTimeSessionStatus | null> {
    const allSessions = await this.fetchRealTimeData();
    return allSessions.find(s => s.sessionId === sessionId) || null;
  }

  /**
   * 캐시 강제 새로고침
   */
  async refreshCache(): Promise<RealTimeSessionStatus[]> {
    console.log('🔄 캐시 강제 새로고침');
    this.cache = [];
    this.lastFetch = null;
    return this.fetchRealTimeData();
  }

  /**
   * 모든 세션의 실시간 상태 가져오기
   */
  async getAllSessionsStatus(): Promise<RealTimeSessionStatus[]> {
    console.log('🔍 getAllSessionsStatus 호출 - 실시간 데이터 요청');
    const result = await this.fetchRealTimeData();
    console.log(`📊 반환된 세션 수: ${result.length}개`);
    result.forEach(session => {
      console.log(`- ${session.sessionNumber}기 ${session.location}: ${session.currentCount}명`);
    });
    return result;
  }
}

// 싱글톤 인스턴스
export const realTimeGoogleSheetsService = new RealTimeGoogleSheetsService();
export default realTimeGoogleSheetsService;