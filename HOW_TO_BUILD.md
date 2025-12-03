# 📱 cdsplc.apk 파일 생성 방법

## ⚠️ 중요: APK 파일은 빌드해야 생성됩니다!

`cdsplc.apk` 파일은 **아직 생성되지 않았습니다**. 
이 파일을 만들려면 Android 프로젝트를 빌드해야 합니다.

---

## 🎯 빌드 방법 (3가지 중 선택)

### 방법 1: Android Studio 사용 (가장 쉬움) ⭐

1. **Android Studio 설치**
   - https://developer.android.com/studio 에서 다운로드
   - 설치 완료 후 실행

2. **프로젝트 열기**
   - Android Studio 실행
   - `File > Open` 선택
   - `C:\Users\mahan\Desktop\incinerator_controller\android` 폴더 선택
   - "Trust Project" 클릭

3. **Gradle 동기화 대기**
   - 하단에 "Gradle sync" 진행 중 표시
   - 완료될 때까지 대기 (5-10분 소요)

4. **APK 빌드**
   - 상단 메뉴: `Build > Build Bundle(s) / APK(s) > Build APK(s)`
   - 빌드 완료 알림에서 "locate" 클릭
   - 또는 파일 탐색기에서:
     `android\app\build\outputs\apk\debug\app-debug.apk` 찾기

5. **파일 이름 변경**
   - `app-debug.apk` 파일을 `cdsplc.apk`로 이름 변경
   - 또는 빌드 스크립트가 자동으로 변경해줍니다

**생성 위치:**
```
C:\Users\mahan\Desktop\incinerator_controller\android\cdsplc.apk
```

---

### 방법 2: 자동 빌드 스크립트 사용

**Windows:**
```bash
# 명령 프롬프트 또는 PowerShell에서
cd C:\Users\mahan\Desktop\incinerator_controller\android
build_apk.bat
```

**주의:** Gradle 래퍼가 없으면 Android Studio에서 프로젝트를 한 번 열어야 합니다.

---

### 방법 3: 명령줄 사용 (고급)

```bash
cd C:\Users\mahan\Desktop\incinerator_controller\android

# Gradle 래퍼가 없으면 Android Studio에서 프로젝트를 먼저 열어야 함
gradlew.bat assembleDebug

# 빌드 완료 후 파일 이름 변경
copy app\build\outputs\apk\debug\app-debug.apk cdsplc.apk
```

---

## 📍 파일 위치

빌드가 완료되면 다음 위치에 파일이 생성됩니다:

```
C:\Users\mahan\Desktop\incinerator_controller\android\cdsplc.apk
```

또는

```
C:\Users\mahan\Desktop\incinerator_controller\android\app\build\outputs\apk\debug\app-debug.apk
(이 파일을 cdsplc.apk로 이름 변경)
```

---

## ✅ 빌드 확인 방법

빌드가 완료되었는지 확인:

```bash
cd C:\Users\mahan\Desktop\incinerator_controller\android
dir cdsplc.apk
```

파일이 있으면 빌드 성공!

---

## 🚨 문제 해결

### "Gradle 래퍼를 찾을 수 없습니다"
→ Android Studio에서 프로젝트를 한 번 열어 Gradle을 동기화하세요.

### "빌드 오류가 발생합니다"
→ Android Studio에서 프로젝트를 열고 `File > Invalidate Caches / Restart` 실행

### "JDK를 찾을 수 없습니다"
→ Android Studio를 설치하면 자동으로 포함됩니다.

---

## 💡 추천 방법

**처음 빌드하는 경우:**
1. Android Studio 설치 및 실행
2. 프로젝트 열기 (Gradle 자동 동기화)
3. `Build > Build APK(s)` 클릭
4. 완료!

**이후 빌드:**
- `build_apk.bat` 스크립트 사용 (더 빠름)

---

## 📞 도움이 필요하신가요?

빌드 중 문제가 발생하면:
1. Android Studio 로그 확인
2. Gradle 동기화 상태 확인
3. 프로젝트를 다시 열어보기

