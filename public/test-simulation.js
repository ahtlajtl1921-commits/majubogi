/**
 * 구글 폼 제출 시뮬레이션 및 테스트 도구
 * 개발자 콘솔에서 사용 가능
 */

// 전역 함수로 등록하여 브라우저 콘솔에서 사용 가능하게 함
declare global {
  interface Window {
    simulateFormSubmission: (sessionId: string, gender: '남성' | '여성', name?: string) => void;
    addMultipleParticipants: (sessionId: string, maleCount: number, femaleCount: number) => void;
    clearAllParticipants: () => void;
    showCurrentParticipants: () => void;
    testFullSession: (sessionId: string) => void;
  }
}

/**
 * 구글 폼 제출 시뮬레이션
 */
window.simulateFormSubmission = (sessionId: string, gender: '남성' | '여성', name?: string) => {
  const participants = JSON.parse(localStorage.getItem('majubogi_simulated_participants') || '[]');
  
  const newParticipant = {
    sessionId,
    gender,
    name: name || `테스트${gender}${Date.now()}`,
    timestamp: new Date().toISOString()
  };
  
  participants.push(newParticipant);
  localStorage.setItem('majubogi_simulated_participants', JSON.stringify(participants));
  
  console.log(`✅ 참여자 추가됨:`, newParticipant);
  console.log(`📊 ${sessionId} 현재 참여자 수:`, participants.filter(p => p.sessionId === sessionId).length);
  
  // 페이지 새로고침하여 변경사항 반영
  window.location.reload();
};

/**
 * 여러 참여자 한번에 추가
 */
window.addMultipleParticipants = (sessionId: string, maleCount: number, femaleCount: number) => {
  const participants = JSON.parse(localStorage.getItem('majubogi_simulated_participants') || '[]');
  
  // 남성 참여자 추가
  for (let i = 0; i < maleCount; i++) {
    participants.push({
      sessionId,
      gender: '남성',
      name: `테스트남성${i + 1}`,
      timestamp: new Date().toISOString()
    });
  }
  
  // 여성 참여자 추가
  for (let i = 0; i < femaleCount; i++) {
    participants.push({
      sessionId,
      gender: '여성',
      name: `테스트여성${i + 1}`,
      timestamp: new Date().toISOString()
    });
  }
  
  localStorage.setItem('majubogi_simulated_participants', JSON.stringify(participants));
  
  console.log(`✅ ${sessionId}에 남성 ${maleCount}명, 여성 ${femaleCount}명 추가됨`);
  console.log(`📊 ${sessionId} 총 참여자 수:`, participants.filter(p => p.sessionId === sessionId).length);
  
  // 페이지 새로고침하여 변경사항 반영
  window.location.reload();
};

/**
 * 모든 참여자 데이터 삭제
 */
window.clearAllParticipants = () => {
  localStorage.removeItem('majubogi_simulated_participants');
  console.log('🗑️ 모든 참여자 데이터가 삭제되었습니다.');
  window.location.reload();
};

/**
 * 현재 참여자 현황 조회
 */
window.showCurrentParticipants = () => {
  const participants = JSON.parse(localStorage.getItem('majubogi_simulated_participants') || '[]');
  
  if (participants.length === 0) {
    console.log('📭 현재 참여자가 없습니다.');
    return;
  }
  
  const sessionStats = participants.reduce((acc: any, p: any) => {
    if (!acc[p.sessionId]) {
      acc[p.sessionId] = { 남성: 0, 여성: 0, total: 0 };
    }
    acc[p.sessionId][p.gender]++;
    acc[p.sessionId].total++;
    return acc;
  }, {});
  
  console.log('📊 현재 참여자 현황:');
  Object.entries(sessionStats).forEach(([sessionId, stats]: [string, any]) => {
    console.log(`  ${sessionId}: 총 ${stats.total}명 (남성: ${stats.남성}명, 여성: ${stats.여성}명)`);
  });
};

/**
 * 특정 세션을 마감 상태로 만들기 (16명 채우기)
 */
window.testFullSession = (sessionId: string) => {
  const participants = JSON.parse(localStorage.getItem('majubogi_simulated_participants') || '[]');
  
  // 해당 세션의 기존 참여자 수 확인
  const existingCount = participants.filter((p: any) => p.sessionId === sessionId).length;
  const needed = 16 - existingCount;
  
  if (needed <= 0) {
    console.log(`⚠️ ${sessionId}는 이미 ${existingCount}명으로 마감 상태입니다.`);
    return;
  }
  
  // 8명씩 남녀 균등하게 추가
  const maleNeeded = Math.ceil(needed / 2);
  const femaleNeeded = needed - maleNeeded;
  
  window.addMultipleParticipants(sessionId, maleNeeded, femaleNeeded);
};

// 사용법 안내
console.log(`
🎯 구글 폼 연동 테스트 도구가 로드되었습니다!

📝 사용 가능한 명령어:
1. simulateFormSubmission('session-34', '남성', '홍길동') - 개별 참여자 추가
2. addMultipleParticipants('session-34', 3, 5) - 여러 참여자 한번에 추가 (남성 3명, 여성 5명)
3. testFullSession('session-34') - 특정 세션을 마감 상태로 만들기 (16명 채우기)
4. showCurrentParticipants() - 현재 참여자 현황 조회
5. clearAllParticipants() - 모든 참여자 데이터 삭제

💡 예시:
- testFullSession('session-34') // 34기를 마감 상태로 만들기
- addMultipleParticipants('session-35', 2, 3) // 35기에 남성 2명, 여성 3명 추가
- showCurrentParticipants() // 현재 상황 확인

🔄 명령어 실행 후 페이지가 자동으로 새로고침되어 변경사항이 반영됩니다.
`);