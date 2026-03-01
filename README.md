<<<<<<< HEAD
# 마주보기전 - 천안/평택 프라이빗 소개팅 웹사이트

## 🎯 프로젝트 소개

천안, 아산, 평택 지역의 검증된 직장인들을 위한 8:8 프라이빗 로테이션 소개팅 서비스 웹사이트입니다.

## 🚀 주요 기능

- ✅ **실시간 신청 관리**: 구글 시트 연동으로 실시간 참여자 현황 반영
- ✅ **반응형 디자인**: 모바일/데스크톱 완벽 지원
- ✅ **SEO 최적화**: 검색엔진 최적화 완료
- ✅ **실시간 업데이트**: 30초마다 자동 데이터 동기화

## 🛠️ 기술 스택

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animation**: Framer Motion
- **Icons**: Lucide React + React Icons
- **Data**: Google Sheets API 연동
- **Deployment**: Vercel

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 컴포넌트
│   ├── ui/             # shadcn/ui 컴포넌트
│   ├── Layout.tsx      # 레이아웃 컴포넌트
│   ├── Cards.tsx       # 카드 컴포넌트들
│   └── ...
├── pages/              # 페이지 컴포넌트
│   ├── Home.tsx        # 홈페이지
│   ├── Sessions.tsx    # 모임찾기
│   ├── About.tsx       # 스토리 및 진행방법
│   └── ...
├── services/           # API 서비스
│   └── realTimeGoogleSheets.ts
├── hooks/              # 커스텀 훅
├── lib/                # 유틸리티
└── assets/             # 정적 자원
```

## 🚀 로컬 개발 환경 설정

### 1. 저장소 클론
```bash
git clone https://github.com/YOUR_USERNAME/majubogi-website.git
cd majubogi-website
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 브라우저에서 확인
```
http://localhost:5173
```

## 📦 빌드 및 배포

### 로컬 빌드
```bash
npm run build
```

### 배포 (Vercel)
```bash
# main 브랜치에 push하면 자동 배포
git add .
git commit -m "업데이트 내용"
git push origin main
```

## 🔧 환경 변수

필요한 환경 변수들:

```env
# Google Sheets API (선택사항)
VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
VITE_GOOGLE_SHEET_ID=your_sheet_id_here
```

## 📊 구글 시트 연동

### 설정 방법
1. 구글 시트를 웹에 게시
2. CSV 형태로 공개 설정
3. `src/services/realTimeGoogleSheets.ts`에서 URL 확인

### 데이터 형식
```csv
타임스탬프,참가 희망 기수/날짜/시간,성함,성별,거주지,연령,연락처
2026-02-20,🎈 34기 천안 85-95년생 (3월 6일 / 19:00),홍길동,남성,천안,90년생,010-0000-0000
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Pink/Purple 그라데이션
- **Background**: 다크/라이트 모드 지원
- **Accent**: 브랜드 컬러

### 컴포넌트
- shadcn/ui 기반 일관된 디자인
- Tailwind CSS v4 활용
- 반응형 디자인 적용

## 📱 페이지 구성

- **홈페이지** (`/`): 서비스 소개 및 신청
- **모임찾기** (`/sessions`): 실시간 세션 현황
- **스토리** (`/about`): 서비스 소개 및 진행방법
- **FAQ** (`/faq`): 자주 묻는 질문
- **이용약관** (`/terms`): 서비스 약관
- **개인정보처리방침** (`/privacy`): 개인정보 정책

## 🔄 실시간 기능

### 자동 업데이트
- 30초마다 구글 시트 데이터 확인
- 실시간 참여자 수 반영
- 16명 달성 시 자동 마감 처리

### 시뮬레이션 데이터
- 실제 데이터 없을 시 테스트 데이터 표시
- 40기, 41기, 42기 시뮬레이션 포함

## 🐛 트러블슈팅

### 빌드 오류
```bash
# TypeScript 오류 확인
npm run type-check

# 린트 오류 확인  
npm run lint
```

### 구글 시트 연동 문제
1. 시트 공개 설정 확인
2. CSV URL 유효성 확인
3. 브라우저 콘솔에서 네트워크 오류 확인

## 📞 지원 및 문의

- **웹사이트**: https://majubogi.co.kr
- **인스타그램**: @majubogi_official
- **이슈 리포트**: GitHub Issues 활용

## 📄 라이선스

이 프로젝트는 마주보기전의 소유입니다.

---

**마주보기전과 함께하는 특별한 만남을 시작하세요! 💕**
=======
# majubogi
>>>>>>> 3e7a0bc8ee201db014f3f9801157f6893107854c
