# CDS Incinerator Controller

소각로 제어 시스템 - 웹 기반 UI 및 Android 앱

## 📱 Android APK 빌드

이 프로젝트는 GitHub Actions를 사용하여 자동으로 APK를 빌드합니다.

### 빠른 시작

1. **GitHub에 코드 업로드** (자세한 방법은 `GITHUB_SETUP.md` 참고)
2. **Actions 탭에서 빌드 실행**
3. **빌드 완료 후 APK 다운로드**

### 수동 빌드 (로컬)

```bash
cd android
./gradlew assembleDebug
```

생성된 파일: `app/build/outputs/apk/debug/cdsplc.apk`

## 📂 프로젝트 구조

```
incinerator_controller/
├── index.html          # 웹 UI
├── style.css          # 스타일시트
├── controller.js      # 제어 로직
├── android/           # Android 앱 프로젝트
│   ├── app/
│   │   └── src/main/
│   │       ├── assets/    # 웹 파일들
│   │       └── java/      # Java 소스 코드
│   └── build.gradle
└── .github/
    └── workflows/
        └── build-apk.yml  # GitHub Actions 빌드 설정
```

## 🚀 기능

- 웹 기반 제어 UI
- Android 앱 지원
- 실시간 온도 모니터링
- 자동 시퀀스 제어
- 다국어 지원 (한국어, 영어, 중국어, 일본어)

## 📖 문서

- `GITHUB_SETUP.md` - GitHub Actions 설정 가이드
- `HOW_TO_BUILD.md` - 로컬 빌드 가이드
- `INSTALL_GUIDE.md` - 앱 설치 가이드

## 📄 라이선스

이 프로젝트는 개인 사용 목적으로 제작되었습니다.

