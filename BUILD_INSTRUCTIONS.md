# Android 앱 빌드 가이드

## 안드로이드 앱으로 변환 완료!

이제 웹 기반 소각로 제어 시스템을 안드로이드 앱으로 설치할 수 있습니다.

## 주요 기능

✅ **모바일 최적화**
- 세로 모드 고정
- 터치 제스처 지원 (확대/축소)
- 반응형 레이아웃

✅ **불길 애니메이션**
- 카메라 뷰에 반시계 방향 회전하는 불길 효과
- 화염 감지 시 자동 표시
- 소각 단계에서 지속 표시

✅ **전체 기능 지원**
- 모든 웹 기능이 모바일에서 작동
- 오프라인 작동 (로컬 파일 사용)

## 빌드 방법

### 방법 1: Android Studio 사용 (권장)

1. **Android Studio 설치**
   - [Android Studio 다운로드](https://developer.android.com/studio)
   - 설치 후 최신 SDK 업데이트

2. **프로젝트 열기**
   - Android Studio 실행
   - `File > Open` 선택
   - `incinerator_controller/android` 폴더 선택

3. **의존성 동기화**
   - Android Studio가 자동으로 Gradle 동기화
   - 완료될 때까지 대기

4. **APK 빌드**
   - `Build > Build Bundle(s) / APK(s) > Build APK(s)` 선택
   - 빌드 완료 후 `locate` 클릭
   - APK 파일 위치: `android/app/build/outputs/apk/debug/app-debug.apk`

### 방법 2: 명령줄 사용 (Gradle)

1. **JDK 설치 확인**
   ```bash
   java -version
   ```

2. **프로젝트 디렉토리로 이동**
   ```bash
   cd incinerator_controller/android
   ```

3. **APK 빌드**
   ```bash
   # Windows
   gradlew.bat assembleDebug
   
   # Linux/Mac
   ./gradlew assembleDebug
   ```

4. **APK 파일 위치**
   - `android/app/build/outputs/apk/debug/app-debug.apk`

## 설치 방법

1. **APK 파일을 안드로이드 기기로 전송**
   - USB 케이블 사용
   - 이메일 첨부
   - 클라우드 저장소 (Google Drive, Dropbox 등)
   - 파일 공유 앱 사용

2. **앱 설치**
   - 파일 관리자에서 APK 파일 찾기
   - APK 파일 탭하여 설치 시작
   - "알 수 없는 소스" 설치 허용 필요 시:
     - 설정 > 보안 > 알 수 없는 소스 허용
     - 또는 설치 시 나타나는 경고에서 허용

3. **앱 실행**
   - 설치 완료 후 앱 아이콘 탭
   - 또는 설치 완료 알림에서 "열기" 탭

## 문제 해결

### 앱이 열리지 않으면
- WebView가 활성화되어 있는지 확인
- Android 버전이 5.0 (API 21) 이상인지 확인

### 줌이 작동하지 않으면
- 두 손가락으로 핀치 제스처 사용
- WebView 설정에서 줌이 활성화되어 있는지 확인

### 화면이 깨지면
- CSS의 모바일 반응형 스타일 확인
- 브라우저 개발자 도구로 모바일 뷰 확인

### 빌드 오류가 발생하면
- Android Studio와 Gradle 버전 확인
- `File > Invalidate Caches / Restart` 실행
- 프로젝트 다시 동기화

## 파일 구조

```
incinerator_controller/
├── index.html          # 웹 UI
├── style.css          # 스타일시트
├── controller.js      # 제어 로직
└── android/           # Android 앱 프로젝트
    ├── app/
    │   ├── src/main/
    │   │   ├── assets/        # 웹 파일들 (복사됨)
    │   │   ├── java/          # Java 소스 코드
    │   │   └── res/           # 리소스 파일
    │   └── build.gradle       # 앱 빌드 설정
    └── build.gradle           # 프로젝트 빌드 설정
```

## 추가 정보

- **최소 Android 버전**: 5.0 (API 21)
- **권장 Android 버전**: 8.0 이상
- **앱 크기**: 약 5-10MB (APK 파일)
- **인터넷 연결**: 불필요 (오프라인 작동)

## 릴리스 빌드 (배포용)

배포용 APK를 만들려면:

1. **서명 키 생성** (최초 1회)
   ```bash
   keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
   ```

2. **서명 설정**
   - `android/app/build.gradle`에 서명 설정 추가

3. **릴리스 APK 빌드**
   ```bash
   ./gradlew assembleRelease
   ```

4. **APK 서명**
   ```bash
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks app-release-unsigned.apk my-key-alias
   ```

## 지원

문제가 발생하면 다음을 확인하세요:
- Android Studio 로그
- Gradle 빌드 로그
- WebView 콘솔 (Chrome DevTools 사용)

