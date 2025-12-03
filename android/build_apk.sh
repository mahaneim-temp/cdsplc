#!/bin/bash

echo "========================================"
echo "CDS PLC Android APK 빌드 스크립트"
echo "========================================"
echo ""

cd "$(dirname "$0")"

echo "[1/3] Gradle 래퍼 확인 중..."
if [ ! -f "gradlew" ]; then
    echo "오류: gradlew 파일을 찾을 수 없습니다."
    echo "Android Studio에서 프로젝트를 한 번 열어 Gradle을 동기화해주세요."
    exit 1
fi

chmod +x gradlew

echo "[2/3] APK 빌드 중... (시간이 걸릴 수 있습니다)"
./gradlew assembleDebug

if [ $? -ne 0 ]; then
    echo ""
    echo "오류: 빌드 실패"
    echo "Android Studio를 설치하고 프로젝트를 열어 Gradle을 동기화해주세요."
    exit 1
fi

echo "[3/3] APK 파일 복사 중..."
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    cp "app/build/outputs/apk/debug/app-debug.apk" "cdsplc.apk"
    echo ""
    echo "========================================"
    echo "빌드 완료!"
    echo "========================================"
    echo ""
    echo "생성된 파일: cdsplc.apk"
    echo "위치: $(pwd)/cdsplc.apk"
    echo ""
    echo "이 파일을 휴대폰으로 전송하여 설치하세요."
    echo ""
else
    echo "오류: APK 파일을 찾을 수 없습니다."
    exit 1
fi

