# 🚀 깃허브 실시간 코드 적용 가이드

## 📁 **1단계: 프로젝트 구조 생성**

```bash
# 새 리포지토리 생성 또는 기존 리포지토리 클론
git clone [your-repo-url]
cd [your-repo-name]

# 기본 폴더 구조 생성
mkdir -p src/{components,hooks,services,pages,lib,assets}
mkdir -p public/images
mkdir -p supabase/{migrations,edge_function}
```

## 📦 **2단계: 패키지 설치**

```bash
# package.json 복사 후
npm install
# 또는
yarn install
```

## 🔧 **3단계: 핵심 파일 복사**

### **React 컴포넌트 및 서비스**
1. `src/hooks/useSessionsManager.ts` - 실시간 세션 관리
2. `src/services/googleSheetsSessionsService.ts` - 구글 시트 연동
3. `src/components/Cards.tsx` - 세션 카드 (마감 처리)

### **설정 파일**
1. `vite.config.ts` - Vite 설정
2. `tsconfig.app.json` - TypeScript 설정
3. `index.html` - SEO 최적화
4. `.env` - 환경 변수

## 🎯 **4단계: 구글 스크립트 설정**

### **Apps Script 설정**
1. **구글 시트 접속**: https://docs.google.com/spreadsheets/d/1acRHfDOYSpkQGiYDShp9I6Fi4-SCa3IttAcsxOW3_KI/edit
2. **[확장 프로그램]** → **[Apps Script]**
3. **`GOOGLE_APPS_SCRIPT_COMPLETE.js` 코드 전체 복사**
4. **[저장]** 및 **권한 승인**

### **트리거 설정**
```javascript
// 함수 실행: setupTriggersManually
// 또는 수동 트리거: onFormSubmit → 양식 제출 시
```

### **테스트 실행**
```javascript
// 함수 실행: testWithJiwooData
// 결과: Sessions, Participants 시트 자동 생성
```

## 🚀 **5단계: 빌드 및 배포**

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📊 **6단계: 실시간 연동 확인**

### **시스템 작동 플로우**
```
구글 폼 제출 → 구글 스크립트 실행 → Sessions 시트 업데이트 → 웹사이트 3분마다 자동 새로고침 → 실시간 참여자 수 반영
```

### **테스트 시나리오**
1. **구글 폼**에서 "🎈 35기 평택..." 선택
2. **신청서 작성 및 제출**
3. **즉시**: Sessions 시트에 35기 참여자 수 +1
4. **3분 후**: 웹사이트에서 "현재 1명"으로 변경 ✅

## 🔍 **7단계: 문제 해결**

### **일반적인 문제**
1. **"빌드 실패"**: TypeScript 오류 확인 및 수정
2. **"참여자 수 반영 안됨"**: Apps Script 실행 로그 확인
3. **"구글 시트 연결 실패"**: API 키 및 시트 ID 확인

### **디버깅 방법**
```javascript
// 브라우저 콘솔에서 확인
console.log('구글 시트 연동 상태');
localStorage.getItem('majubogi_sessions');
```

## ✅ **완료 체크리스트**

- [ ] 프로젝트 구조 생성 완료
- [ ] package.json 및 의존성 설치 완료
- [ ] 핵심 React 파일들 복사 완료
- [ ] 설정 파일들 복사 완료
- [ ] .env 환경 변수 설정 완료
- [ ] Apps Script 코드 복사 및 저장 완료
- [ ] 트리거 설정 완료
- [ ] testWithJiwooData 실행 완료
- [ ] Sessions, Participants 시트 생성 확인
- [ ] 빌드 및 배포 성공 확인
- [ ] 실시간 참여자 수 반영 확인

## 🎉 **최종 결과**

**완료 후 시스템 작동**:
- ✅ **34기**: 현재 1명 (이지우님) 
- ✅ **35기~39기**: 신청 시 즉시 "현재 X명"으로 변경
- ✅ **16명 달성**: 자동으로 "마감" 버튼으로 변경
- ✅ **실시간 업데이트**: 3분마다 자동 새로고침

**이제 구글 폼의 모든 신청이 실시간으로 웹사이트에 반영됩니다!** 🚀