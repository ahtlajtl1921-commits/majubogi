/**
 * 구글 폼 응답 시 자동으로 실행되는 스크립트
 * 참여자 수를 실시간으로 업데이트하고 웹사이트에 반영
 */

// 설정값들
const CONFIG = {
  // 구글 시트 ID (실제 시트 ID로 변경 필요)
  SHEET_ID: 'YOUR_GOOGLE_SHEET_ID',
  
  // 웹훅 URL (실제 웹사이트 API 엔드포인트로 변경 필요)
  WEBHOOK_URL: 'https://majubogi.skywork.website/api/update-participants',
  
  // 시트 이름들
  SHEETS: {
    FORM_RESPONSES: 'Form Responses 1', // 구글 폼 응답 시트
    SESSIONS: 'Sessions',               // 모임 정보 시트
    PARTICIPANTS: 'Participants'       // 참여자 현황 시트
  }
};

/**
 * 구글 폼 제출 시 자동 실행되는 트리거 함수
 */
function onFormSubmit(e) {
  try {
    console.log('폼 제출 감지됨');
    
    // 제출된 응답 데이터 가져오기
    const formResponse = e.response;
    const itemResponses = formResponse.getItemResponses();
    
    // 응답 데이터 파싱
    const responseData = parseFormResponse(itemResponses);
    console.log('파싱된 응답 데이터:', responseData);
    
    // 참여자 수 업데이트
    updateParticipantCount(responseData);
    
    // 웹사이트에 실시간 업데이트 알림
    notifyWebsite(responseData);
    
    console.log('폼 제출 처리 완료');
    
  } catch (error) {
    console.error('폼 제출 처리 중 오류:', error);
  }
}

/**
 * 구글 폼 응답 데이터 파싱
 */
function parseFormResponse(itemResponses) {
  const data = {};
  
  itemResponses.forEach(itemResponse => {
    const question = itemResponse.getItem().getTitle();
    const answer = itemResponse.getResponse();
    
    // 질문에 따라 데이터 매핑
    if (question.includes('희망하는 일정')) {
      // "34기 천안 (3월 6일 19:00) [85-95년생]" 형태에서 기수 추출
      const match = answer.match(/(\d+)기/);
      if (match) {
        data.sessionId = `session-${match[1]}`;
        data.sessionNumber = match[1];
      }
    } else if (question.includes('이름')) {
      data.name = answer;
    } else if (question.includes('성별')) {
      data.gender = answer;
    } else if (question.includes('연령') || question.includes('년생')) {
      data.age = answer;
    } else if (question.includes('연락처') || question.includes('전화번호')) {
      data.phone = answer;
    }
  });
  
  return data;
}

/**
 * 참여자 수 업데이트
 */
function updateParticipantCount(responseData) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  
  // 1. 참여자 시트에 데이터 추가
  addParticipantRecord(spreadsheet, responseData);
  
  // 2. 세션 시트의 참여자 수 업데이트
  updateSessionCount(spreadsheet, responseData);
}

/**
 * 참여자 기록 추가
 */
function addParticipantRecord(spreadsheet, responseData) {
  const participantsSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.PARTICIPANTS);
  
  // 헤더가 없으면 생성
  if (participantsSheet.getLastRow() === 0) {
    participantsSheet.getRange(1, 1, 1, 7).setValues([[
      '타임스탬프', '세션ID', '기수', '이름', '성별', '연령', '연락처'
    ]]);
  }
  
  // 새 참여자 데이터 추가
  const newRow = [
    new Date(),
    responseData.sessionId || '',
    responseData.sessionNumber || '',
    responseData.name || '',
    responseData.gender || '',
    responseData.age || '',
    responseData.phone || ''
  ];
  
  participantsSheet.appendRow(newRow);
  console.log('참여자 기록 추가됨:', newRow);
}

/**
 * 세션별 참여자 수 업데이트
 */
function updateSessionCount(spreadsheet, responseData) {
  const sessionsSheet = getOrCreateSheet(spreadsheet, CONFIG.SHEETS.SESSIONS);
  
  // 헤더가 없으면 생성
  if (sessionsSheet.getLastRow() === 0) {
    sessionsSheet.getRange(1, 1, 1, 15).setValues([[
      'ID', '제목', '설명', '날짜', '장소', '지역', '연령대', '테마', 
      '가격', '최대인원', '현재인원', '남성수', '여성수', '상태', '폼URL'
    ]]);
  }
  
  if (!responseData.sessionId) return;
  
  // 해당 세션 찾기
  const data = sessionsSheet.getDataRange().getValues();
  let sessionRowIndex = -1;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === responseData.sessionId) {
      sessionRowIndex = i + 1; // 1-based index
      break;
    }
  }
  
  // 세션이 없으면 새로 생성
  if (sessionRowIndex === -1) {
    sessionRowIndex = sessionsSheet.getLastRow() + 1;
    const newSessionData = [
      responseData.sessionId,
      `${responseData.sessionNumber}기 모임`,
      `${responseData.sessionNumber}기 8:8 로테이션 미팅`,
      '2026-03-06',
      '천안',
      '천안',
      '85~95년생',
      '정기모임',
      55000,
      16,
      0, // 현재인원
      0, // 남성수
      0, // 여성수
      'recruiting',
      'https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/viewform?usp=header'
    ];
    sessionsSheet.getRange(sessionRowIndex, 1, 1, 15).setValues([newSessionData]);
  }
  
  // 현재 참여자 수 계산
  const participantCount = countParticipants(spreadsheet, responseData.sessionId);
  const maleCount = countParticipants(spreadsheet, responseData.sessionId, '남성');
  const femaleCount = countParticipants(spreadsheet, responseData.sessionId, '여성');
  
  // 상태 결정
  const maxParticipants = 16;
  const status = participantCount >= maxParticipants ? 'full' : 'recruiting';
  
  // 업데이트
  sessionsSheet.getRange(sessionRowIndex, 11).setValue(participantCount); // 현재인원
  sessionsSheet.getRange(sessionRowIndex, 12).setValue(maleCount);        // 남성수
  sessionsSheet.getRange(sessionRowIndex, 13).setValue(femaleCount);      // 여성수
  sessionsSheet.getRange(sessionRowIndex, 14).setValue(status);           // 상태
  
  console.log(`세션 ${responseData.sessionId} 업데이트: ${participantCount}명 (남:${maleCount}, 여:${femaleCount}) - ${status}`);
}

/**
 * 특정 세션의 참여자 수 계산
 */
function countParticipants(spreadsheet, sessionId, gender = null) {
  const participantsSheet = spreadsheet.getSheetByName(CONFIG.SHEETS.PARTICIPANTS);
  if (!participantsSheet) return 0;
  
  const data = participantsSheet.getDataRange().getValues();
  let count = 0;
  
  for (let i = 1; i < data.length; i++) {
    const rowSessionId = data[i][1]; // 세션ID 컬럼
    const rowGender = data[i][4];    // 성별 컬럼
    
    if (rowSessionId === sessionId) {
      if (gender === null || rowGender === gender) {
        count++;
      }
    }
  }
  
  return count;
}

/**
 * 웹사이트에 실시간 업데이트 알림
 */
function notifyWebsite(responseData) {
  try {
    const payload = {
      sessionId: responseData.sessionId,
      sessionNumber: responseData.sessionNumber,
      participantCount: countParticipants(SpreadsheetApp.openById(CONFIG.SHEET_ID), responseData.sessionId),
      timestamp: new Date().toISOString()
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify(payload)
    };
    
    const response = UrlFetchApp.fetch(CONFIG.WEBHOOK_URL, options);
    console.log('웹사이트 알림 전송 완료:', response.getContentText());
    
  } catch (error) {
    console.log('웹사이트 알림 전송 실패 (정상적임):', error.message);
    // 웹훅 실패는 정상적인 상황 (웹사이트가 폴링으로 데이터를 가져감)
  }
}

/**
 * 시트가 없으면 생성하는 헬퍼 함수
 */
function getOrCreateSheet(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

/**
 * 수동으로 모든 세션의 참여자 수를 다시 계산하는 함수
 */
function recalculateAllParticipants() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const sessionsSheet = spreadsheet.getSheetByName(CONFIG.SHEETS.SESSIONS);
  
  if (!sessionsSheet) {
    console.log('Sessions 시트가 없습니다.');
    return;
  }
  
  const data = sessionsSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    const sessionId = data[i][0];
    if (sessionId) {
      const participantCount = countParticipants(spreadsheet, sessionId);
      const maleCount = countParticipants(spreadsheet, sessionId, '남성');
      const femaleCount = countParticipants(spreadsheet, sessionId, '여성');
      const status = participantCount >= 16 ? 'full' : 'recruiting';
      
      sessionsSheet.getRange(i + 1, 11).setValue(participantCount);
      sessionsSheet.getRange(i + 1, 12).setValue(maleCount);
      sessionsSheet.getRange(i + 1, 13).setValue(femaleCount);
      sessionsSheet.getRange(i + 1, 14).setValue(status);
    }
  }
  
  console.log('모든 세션의 참여자 수 재계산 완료');
}

/**
 * 트리거 설정 함수 (최초 1회 실행)
 */
function setupTriggers() {
  // 기존 트리거 삭제
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // 구글 폼 제출 트리거 생성
  const form = FormApp.openByUrl('https://docs.google.com/forms/d/e/1FAIpQLSfWit0Zujsvc8HtfYzjfUpI75AY5D2XxryBnzMidRzKdFmWOQ/edit');
  ScriptApp.newTrigger('onFormSubmit')
    .onFormSubmit()
    .create();
  
  console.log('트리거 설정 완료');
}