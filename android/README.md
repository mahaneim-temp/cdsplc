# CDS Incinerator Controller - Android App

## 빌드 방법

### 필수 요구사항
- Android Studio (최신 버전)
- JDK 8 이상
- Android SDK (API 21 이상)

### 빌드 단계

1. **프로젝트 열기**
   - Android Studio에서 `android` 폴더를 프로젝트로 엽니다.

2. **의존성 동기화**
   - Android Studio가 자동으로 Gradle을 동기화합니다.
   - 수동으로 동기화하려면: File > Sync Project with Gradle Files

3. **APK 빌드**
   - Build > Build Bundle(s) / APK(s) > Build APK(s)
   - 또는 터미널에서:
     ```bash
     cd android
     ./gradlew assembleRelease
     ```
   - APK 파일은 `android/app/build/outputs/apk/release/app-release.apk`에 생성됩니다.

4. **디버그 APK 빌드 (테스트용)**
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
   - APK 파일은 `android/app/build/outputs/apk/debug/app-debug.apk`에 생성됩니다.

## 설치 방법

1. **APK 파일을 안드로이드 기기로 전송**
   - USB 케이블 사용
   - 이메일 첨부
   - 클라우드 저장소 (Google Drive, Dropbox 등)

2. **앱 설치**
   - 파일 관리자에서 APK 파일을 찾아 탭합니다.
   - "알 수 없는 소스" 설치 허용이 필요할 수 있습니다.
   - 설정 > 보안 > 알 수 없는 소스 허용

3. **앱 실행**
   - 설치 후 앱 아이콘을 탭하여 실행합니다.

## 기능

- 전체 웹 기반 UI 지원
- 터치 제스처 지원 (확대/축소)
- 세로 모드 고정
- 오프라인 작동 (로컬 파일 사용)

## 문제 해결

- **앱이 열리지 않으면**: WebView가 활성화되어 있는지 확인하세요.
- **줌이 작동하지 않으면**: WebView 설정에서 줌이 활성화되어 있는지 확인하세요.
- **화면이 깨지면**: CSS의 모바일 반응형 스타일을 확인하세요.

