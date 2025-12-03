# 🚀 GitHub Actions로 자동 APK 빌드 설정 가이드

GitHub에 코드를 올리면 자동으로 `cdsplc.apk` 파일을 빌드해 다운로드할 수 있습니다!

---

## 📋 단계별 설정 방법

### 1단계: GitHub 계정 만들기 (없는 경우)

1. https://github.com 접속
2. "Sign up" 클릭하여 계정 생성
3. 이메일 인증 완료

---

### 2단계: GitHub 저장소 만들기

1. GitHub에 로그인
2. 우측 상단 "+" 아이콘 클릭 → "New repository" 선택
3. 저장소 설정:
   - **Repository name**: `cdsplc` (또는 원하는 이름)
   - **Description**: "CDS Incinerator Controller"
   - **Public** 또는 **Private** 선택
   - **"Initialize this repository with a README"** 체크 해제
4. "Create repository" 클릭

---

### 3단계: 코드 업로드하기

#### 방법 A: GitHub Desktop 사용 (가장 쉬움) ⭐

1. **GitHub Desktop 설치**
   - https://desktop.github.com 에서 다운로드
   - 설치 후 GitHub 계정 로그인

2. **저장소 클론**
   - GitHub Desktop 실행
   - `File > Clone Repository` 선택
   - 방금 만든 저장소 선택 → "Clone" 클릭

3. **파일 복사**
   - `C:\Users\mahan\Desktop\incinerator_controller` 폴더의 **모든 파일**을
   - 클론된 폴더로 복사

4. **커밋 및 푸시**
   - GitHub Desktop에서 변경사항 확인
   - 하단에 커밋 메시지 입력: "Initial commit"
   - "Commit to main" 클릭
   - "Push origin" 클릭

#### 방법 B: 명령줄 사용 (Git 설치 필요)

```bash
cd C:\Users\mahan\Desktop\incinerator_controller

# Git 초기화
git init
git add .
git commit -m "Initial commit"

# GitHub 저장소 연결 (YOUR_USERNAME과 YOUR_REPO_NAME을 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

#### 방법 C: 웹에서 직접 업로드

1. GitHub 저장소 페이지에서 "uploading an existing file" 클릭
2. `incinerator_controller` 폴더의 모든 파일을 드래그 앤 드롭
3. 하단에 커밋 메시지 입력: "Initial commit"
4. "Commit changes" 클릭

---

### 4단계: APK 빌드 실행

1. GitHub 저장소 페이지로 이동
2. 상단 탭에서 **"Actions"** 클릭
3. 왼쪽 사이드바에서 **"Build APK"** 워크플로우 선택
4. 우측 상단 **"Run workflow"** 버튼 클릭
5. **"Run workflow"** 다시 클릭

---

### 5단계: APK 다운로드

1. Actions 탭에서 실행 중인 워크플로우 클릭
2. 빌드 완료까지 대기 (약 5-10분)
3. 빌드 완료 후:
   - **"cdsplc-apk"** 아티팩트 섹션 찾기
   - **"cdsplc.apk"** 파일 다운로드 클릭
4. 다운로드된 ZIP 파일 압축 해제
5. `cdsplc.apk` 파일 확인!

---

## ✅ 완료!

이제 `cdsplc.apk` 파일을 휴대폰으로 전송하여 설치할 수 있습니다!

---

## 🔄 다음 빌드부터는 더 간단합니다

코드를 수정하고 GitHub에 푸시하면 자동으로 빌드됩니다:
1. 코드 수정
2. GitHub에 푸시
3. Actions 탭에서 빌드 확인
4. APK 다운로드

---

## 💡 팁

- **빌드 상태 확인**: 저장소 메인 페이지에서 Actions 탭의 빌드 상태 확인 가능
- **이메일 알림**: GitHub 설정에서 빌드 완료 시 이메일 알림 받기 가능
- **빌드 히스토리**: Actions 탭에서 모든 빌드 기록 확인 가능

---

## 🆘 문제 해결

### "Actions 탭이 보이지 않아요"
→ 저장소가 Private인 경우, Settings > Actions에서 "Allow all actions" 활성화

### "워크플로우가 실행되지 않아요"
→ `.github/workflows/build-apk.yml` 파일이 올바르게 업로드되었는지 확인

### "빌드가 실패해요"
→ Actions 탭에서 빌드 로그 확인하여 오류 메시지 확인

---

## 📞 도움이 필요하신가요?

각 단계에서 막히는 부분이 있으면 알려주세요!

