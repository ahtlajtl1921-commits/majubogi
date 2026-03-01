# 구글 시트 실시간 참여자 연동 설정 가이드

이 가이드는 구글 폼 제출 시 실시간으로 참여자 수가 업데이트되고, 16명 마감 시 신청 버튼이 회색으로 변경되는 시스템을 구축하는 방법을 설명합니다.

## 📋 개요
이 가이드는 마주보기전 웹사이트와 구글 폼/시트를 자동 연동하는 방법을 설명합니다.

## 🔧 1단계: 구글 시트 준비

### 1.1 모임 정보 시트 생성
새로운 구글 시트를 생성하고 "Sessions" 시트에 다음 컬럼을 추가하세요:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| id | title | description | date | location | region | ageGroup | theme | price | maxParticipants | currentParticipants | maleCount | femaleCount | status | formUrl |

**예시 데이터:**
```
session-1 | 천안 [89~95년생] 프라이빗 8:8 미팅 | 천안의 분위기 좋은 카페에서... | 2026-03-07 | 천안 신부동 시크릿 라운지 | 천안 | 89~95년생 | 정기모임 | 55000 | 16 | 12 | 6 | 6 | recruiting | https://forms.gle/...
```

### 1.2 폼 응답 시트 연결
구글 폼의 응답을 별도 시트에 연결하고 "Form Responses" 시트에 다음 컬럼이 있는지 확인:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| timestamp | name | age | gender | phone | job | sessionId | status |

## 🔑 2단계: Google Sheets API 설정

### 2.1 Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" → "라이브러리" 이동
4. "Google Sheets API" 검색 후 활성화
5. "사용자 인증 정보" → "사용자 인증 정보 만들기" → "API 키" 선택
6. API 키 복사 (나중에 사용)

### 2.2 시트 공유 설정
1. 구글 시트 열기
2. 우상단 "공유" 버튼 클릭
3. "일반 액세스" → "링크가 있는 모든 사용자" → "뷰어" 설정
4. 시트 URL에서 시트 ID 복사
   - URL 형식: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

## ⚙️ 3단계: 환경변수 설정

프로젝트 루트에 `.env` 파일 생성:

```env
VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
VITE_SESSIONS_SHEET_ID=your_sessions_sheet_id
VITE_RESPONSES_SHEET_ID=your_responses_sheet_id
```

## 🔄 4단계: 자동 연동 확인

### 4.1 실시간 데이터 확인
- 웹사이트의 "모임찾기" 페이지 방문
- 상단에 "실시간 데이터 연동" 상태 확인
- "새로고침" 버튼으로 수동 동기화 가능

### 4.2 자동 업데이트 기능
- **5분마다 자동 새로고침**: 최신 데이터 자동 반영
- **실시간 신청 현황**: 구글 폼 응답 → 시트 → 웹사이트 자동 업데이트
- **모집 상태 자동 변경**: 신청자 수에 따라 상태 자동 변경

## 📊 5단계: 데이터 관리

### 5.1 새 모임 추가
구글 시트의 "Sessions" 탭에 새 행 추가:
1. 고유한 ID 입력 (예: session-4)
2. 모임 정보 입력
3. 저장 후 웹사이트에서 자동 반영 확인

### 5.2 신청 현황 관리
- 구글 폼 응답이 자동으로 "Form Responses" 시트에 저장
- `status` 컬럼에서 승인/거절 관리 (pending/approved/rejected)
- 승인된 신청자만 카운트에 반영

### 5.3 모집 상태 관리
시트의 `status` 컬럼 값:
- `recruiting`: 모집중
- `full`: 마감
- `waiting`: 대기
- `closed`: 종료

## 🚨 문제 해결

### API 연결 실패시
- API 키가 올바른지 확인
- 시트 ID가 정확한지 확인
- 시트 공유 설정이 "링크가 있는 모든 사용자"로 되어있는지 확인

### 데이터가 업데이트되지 않을 때
- 브라우저 새로고침
- 웹사이트의 "새로고침" 버튼 클릭
- 시트의 데이터 형식이 올바른지 확인

## 📞 지원

추가 도움이 필요하시면 개발팀에 문의해주세요.
- 이메일: support@majubogi.co.kr
- 카카오톡: @maju_bogi_