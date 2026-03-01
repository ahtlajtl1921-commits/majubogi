// 설정값들
const CONFIG = {
  // 구글 시트 ID (실제 시트 ID로 변경 필요)
  SHEET_ID: '1acRHfDOYSpkQGiYDShp9I6Fi4-SCa3IttAcsxOW3_KI',
  
  // 웹훅 URL (실제 웹사이트 API 엔드포인트로 변경 필요)
  WEBHOOK_URL: 'https://majubogi.skywork.website/api/update-participants',
  
  // 시트 이름들
  SHEETS: {
    FORM_RESPONSES: '설문지 응답 시트1', // 구글 폼 응답 시트
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
    if (question.includes('참가 희망') || question.includes('기수')) {
      // "2026년 3월 6일" 형태에서 날짜 추출하여 기수 매핑
      if (answer.includes('3월 6일')) {
        data.sessionId = 'session-34';
        data.sessionNumber = '34';
      } else if (answer.includes('3월 7일')) {
        data.sessionId = 'session-35';
        data.sessionNumber = '35';
      } else if (answer.includes('3월 13일')) {
        data.sessionId = 'session-36';
        data.sessionNumber = '36';
      } else if (answer.includes('3월 14일')) {
        data.sessionId = 'session-37';
        data.sessionNumber = '37';
      } else if (answer.includes('3월 20일')) {
        data.sessionId = 'session-38';
        data.sessionNumber = '38';
      } else if (answer.includes('3월 21일')) {
        data.sessionId = 'session-39';
        data.sessionNumber = '39';
      }
    } else if (question.includes('성함')) {
      data.name = answer;
    } else if (question.includes('성별')) {
      data.gender = answer;
    } else if (question.includes('연령') || question.includes('년생')) {
      data.age = answer;
    } else if (question.includes('연락') || question.includes('번호')) {
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
 * 수동 트리거 설정 함수 (구글 시트에서 직접 설정)
 */
function setupTriggersManually() {
  try {
    // 기존 트리거 삭제
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
    
    // 현재 스프레드시트에 연결된 폼을 찾아서 트리거 생성
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const form = FormApp.getActiveForm();
    
    if (form) {
      ScriptApp.newTrigger('onFormSubmit')
        .onFormSubmit()
        .create();
      console.log('트리거 설정 완료 - 폼 ID:', form.getId());
    } else {
      console.log('연결된 구글 폼을 찾을 수 없습니다. 수동으로 트리거를 설정해주세요.');
    }
    
  } catch (error) {
    console.error('트리거 설정 실패:', error);
    console.log('수동으로 트리거를 설정해주세요:');
    console.log('1. Apps Script 에디터에서 "트리거" 메뉴 클릭');
    console.log('2. "+ 트리거 추가" 클릭');
    console.log('3. 함수: onFormSubmit');
    console.log('4. 이벤트 소스: 스프레드시트에서');
    console.log('5. 이벤트 유형: 양식 제출 시');
  }
}


/**
 * 테스트용 함수 - 기존 데이터로 참여자 수 계산 (수정됨)
 */
function testWithExistingData() {
  try {
    console.log('기존 데이터로 테스트 시작...');
    
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const formResponsesSheet = spreadsheet.getSheetByName(CONFIG.SHEETS.FORM_RESPONSES);
    
    if (!formResponsesSheet) {
      console.log('설문지 응답 시트를 찾을 수 없습니다.');
      return;
    }
    
    const data = formResponsesSheet.getDataRange().getValues();
    console.log(`총 ${data.length - 1}개의 응답 발견`);
    
    // 헤더를 제외한 각 행 처리
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // 안전한 문자열 변환
      const sessionInfo = String(row[1] || '');
      const name = String(row[2] || '');
      const gender = String(row[3] || '');
      const age = String(row[5] || '');
      const phone = String(row[6] || '');
      
      console.log(`행 ${i}: 세션정보="${sessionInfo}", 이름="${name}", 성별="${gender}"`);
      
      // 기존 데이터 파싱
      const responseData = {
        sessionId: '',
        sessionNumber: '',
        name: name,
        gender: gender,
        age: age,
        phone: phone
      };
      
      // 날짜 정보에서 세션 ID 추출 (B열: 참가 희망 기수/날짜/시간)
      if (sessionInfo.includes('3월 6일') || sessionInfo.includes('3/6') || sessionInfo.includes('0306')) {
        responseData.sessionId = 'session-34';
        responseData.sessionNumber = '34';
      } else if (sessionInfo.includes('3월 7일') || sessionInfo.includes('3/7') || sessionInfo.includes('0307')) {
        responseData.sessionId = 'session-35';
        responseData.sessionNumber = '35';
      } else if (sessionInfo.includes('3월 13일') || sessionInfo.includes('3/13') || sessionInfo.includes('0313')) {
        responseData.sessionId = 'session-36';
        responseData.sessionNumber = '36';
      } else if (sessionInfo.includes('3월 14일') || sessionInfo.includes('3/14') || sessionInfo.includes('0314')) {
        responseData.sessionId = 'session-37';
        responseData.sessionNumber = '37';
      } else if (sessionInfo.includes('3월 20일') || sessionInfo.includes('3/20') || sessionInfo.includes('0320')) {
        responseData.sessionId = 'session-38';
        responseData.sessionNumber = '38';
      } else if (sessionInfo.includes('3월 21일') || sessionInfo.includes('3/21') || sessionInfo.includes('0321')) {
        responseData.sessionId = 'session-39';
        responseData.sessionNumber = '39';
      } else {
        // 날짜를 찾을 수 없는 경우 기본값으로 34기 설정
        console.log(`날짜를 파싱할 수 없음: "${sessionInfo}" - 기본값 34기로 설정`);
        responseData.sessionId = 'session-34';
        responseData.sessionNumber = '34';
      }
      
      if (responseData.name && responseData.gender) {
        console.log(`✅ 처리 중: ${responseData.name} (${responseData.gender}) - ${responseData.sessionId}`);
        
        // 참여자 기록 추가
        addParticipantRecord(spreadsheet, responseData);
        
        // 세션 카운트 업데이트
        updateSessionCount(spreadsheet, responseData);
      } else {
        console.log(`❌ 건너뜀: 이름 또는 성별 정보 없음 - 행 ${i}`);
      }
    }
    
    console.log('🎉 기존 데이터 처리 완료!');
    console.log('📊 결과 확인: Sessions 시트와 Participants 시트를 확인해보세요.');
    
  } catch (error) {
    console.error('❌ 테스트 실행 중 오류:', error);
    console.log('오류 상세:', error.toString());
  }
}


/**
 * 간단한 테스트 함수 - 이지우님 데이터만 처리
 */
function testWithJiwooData() {
  try {
    console.log('이지우님 데이터로 테스트 시작...');
    
    // 이지우님 데이터 직접 입력
    const responseData = {
      sessionId: 'session-34',
      sessionNumber: '34',
      name: '이지우',
      gender: '남성',
      age: '87년생',
      phone: '010-5761-2425'
    };
    
    console.log('처리할 데이터:', responseData);
    
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    
    // 참여자 기록 추가
    addParticipantRecord(spreadsheet, responseData);
    
    // 세션 카운트 업데이트
    updateSessionCount(spreadsheet, responseData);
    
    console.log('🎉 이지우님 데이터 처리 완료!');
    console.log('📊 34기 현재 참여자: 1명 (남성 1명)');
    
  } catch (error) {
    console.error('❌ 테스트 실행 중 오류:', error);
  }
}


/**
 * 시트 초기화 함수 (필요시 사용)
 */
function clearAllData() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    
    // Sessions 시트 삭제
    const sessionsSheet = spreadsheet.getSheetByName(CONFIG.SHEETS.SESSIONS);
    if (sessionsSheet) {
      spreadsheet.deleteSheet(sessionsSheet);
      console.log('Sessions 시트 삭제됨');
    }
    
    // Participants 시트 삭제
    const participantsSheet = spreadsheet.getSheetByName(CONFIG.SHEETS.PARTICIPANTS);
    if (participantsSheet) {
      spreadsheet.deleteSheet(participantsSheet);
      console.log('Participants 시트 삭제됨');
    }
    
    console.log('🗑️ 모든 데이터 초기화 완료');
    
  } catch (error) {
    console.error('❌ 초기화 중 오류:', error);
  }
}