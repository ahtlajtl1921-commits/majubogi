# 🚀 마주보기전 GitHub 연동 가이드

## 1단계: GitHub 저장소 생성

### GitHub 웹사이트에서:
1. https://github.com 접속 후 로그인
2. 우상단 "+" 버튼 → "New repository" 클릭
3. Repository name: `majubogi-website` (또는 원하는 이름)
4. Description: `마주보기전 - 천안/평택 프라이빗 소개팅 웹사이트`
5. Public 선택 (무료 배포를 위해)
6. "Create repository" 클릭

## 2단계: 로컬에서 Git 초기화 및 업로드

### 터미널/명령 프롬프트에서 실행:

```bash
# 1. 프로젝트 폴더로 이동
cd /path/to/seolrem_dating_platform

# 2. Git 초기화
git init

# 3. 모든 파일 추가
git add .

# 4. 첫 번째 커밋
git commit -m "Initial commit: 마주보기전 웹사이트 초기 버전"

# 5. GitHub 저장소 연결 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/majubogi-website.git

# 6. 메인 브랜치로 설정
git branch -M main

# 7. GitHub에 업로드
git push -u origin main
```

## 3단계: Vercel 자동 배포 설정

### Vercel 연동:
1. https://vercel.com 접속
2. "Continue with GitHub" 클릭하여 GitHub 계정으로 로그인
3. "Import Project" 클릭
4. GitHub에서 `majubogi-website` 저장소 선택
5. "Import" 클릭
6. 프로젝트 설정:
   - Framework Preset: `Vite`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. "Deploy" 클릭

## 4단계: 커스텀 도메인 연결

### Vercel에서 도메인 설정:
1. Vercel 대시보드에서 프로젝트 선택
2. "Settings" → "Domains" 클릭
3. `majubogi.co.kr` 입력 후 "Add" 클릭
4. DNS 설정 안내에 따라 도메인 제공업체에서 설정

### 가비아에서 DNS 설정:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.19
```

## 5단계: 실시간 코드 수정 워크플로우

### 코드 수정 → 자동 배포 과정:

```bash
# 1. 코드 수정 후
git add .
git commit -m "기능 추가: 새로운 기능 설명"
git push origin main

# 2. Vercel이 자동으로:
# - GitHub 변경사항 감지
# - 자동 빌드 시작
# - 자동 배포 완료
# - 웹사이트 즉시 반영 (1-2분 내)
```

## 6단계: 협업 설정 (선택사항)

### 팀원 추가:
1. GitHub 저장소 → "Settings" → "Manage access"
2. "Invite a collaborator" 클릭
3. 팀원 GitHub 사용자명 입력

### 브랜치 보호 설정:
1. GitHub 저장소 → "Settings" → "Branches"
2. "Add rule" 클릭
3. Branch name pattern: `main`
4. "Require pull request reviews before merging" 체크

## 🎯 완료 후 워크플로우

### 일상적인 코드 수정:
```
1. 로컬에서 코드 수정
2. git add . && git commit -m "수정 내용"
3. git push origin main
4. 1-2분 후 웹사이트 자동 반영 ✅
```

### 긴급 수정:
```
1. GitHub 웹에서 직접 파일 수정
2. "Commit changes" 클릭
3. 즉시 자동 배포 시작 ✅
```

## 🔧 트러블슈팅

### 빌드 실패 시:
1. Vercel 대시보드에서 "Functions" → "View Logs" 확인
2. 오류 메시지 확인 후 코드 수정
3. 다시 push하면 자동 재배포

### 도메인 연결 문제:
1. DNS 전파 시간: 최대 24-48시간 소요
2. `dig majubogi.co.kr` 명령어로 DNS 확인
3. Vercel 대시보드에서 도메인 상태 확인

## 📞 지원

문제 발생 시:
- GitHub Issues: 저장소에서 이슈 생성
- Vercel Support: https://vercel.com/support
- 개발자 문의: 프로젝트 관리자에게 연락