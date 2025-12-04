document.addEventListener("DOMContentLoaded", () => {

  // ========== 모바일 화면 크기 자동 조정 (완벽한 버전) ==========
  // 전역 함수로 만들어서 MainActivity에서도 호출 가능하도록
  window.adjustScreenSize = function() {
    const dashboard = document.querySelector('.dashboard');
    const appShell = document.querySelector('.app-shell');
    const html = document.documentElement;
    const body = document.body;
    
    if (!dashboard || !appShell) return;
    
    // 1. HTML/Body 스타일 강제 설정 (스크롤 완전 차단)
    html.style.width = '100%';
    html.style.height = '100%';
    html.style.overflow = 'hidden';
    html.style.margin = '0';
    html.style.padding = '0';
    html.style.position = 'fixed';
    html.style.top = '0';
    html.style.left = '0';
    html.style.right = '0';
    html.style.bottom = '0';
    
    body.style.width = '100%';
    body.style.height = '100%';
    body.style.overflow = 'hidden';
    body.style.margin = '0';
    body.style.padding = '0';
    body.style.position = 'fixed';
    body.style.top = '0';
    body.style.left = '0';
    body.style.right = '0';
    body.style.bottom = '0';
    
    // 2. App-shell 스타일 강제 설정
    appShell.style.width = '100%';
    appShell.style.height = '100%';
    appShell.style.padding = '0';
    appShell.style.margin = '0';
    appShell.style.position = 'fixed';
    appShell.style.top = '0';
    appShell.style.left = '0';
    appShell.style.right = '0';
    appShell.style.bottom = '0';
    appShell.style.overflow = 'hidden';
    
    // 3. 실제 화면 크기 측정 (여러 방법 시도)
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
    let screenHeight = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
    
    // WebView의 실제 크기를 정확히 측정하기 위해 여러 번 시도
    if (screenWidth === 0 || screenHeight === 0) {
      // 크기가 0이면 잠시 후 재시도
      setTimeout(window.adjustScreenSize, 50);
      return;
    }
    
    // 4. 원본 대시보드 크기 (1440x810)
    const originalWidth = 1440;
    const originalHeight = 810;
    
    // 5. 화면에 맞는 스케일 계산 (더 정확한 방법)
    // 가로/세로 비율을 모두 고려하여 더 작은 스케일 사용
    const scaleX = screenWidth / originalWidth;
    const scaleY = screenHeight / originalHeight;
    const scale = Math.min(scaleX, scaleY); // 1.0 제한 제거 - 필요시 확대도 허용
    
    // 6. 스케일 적용 (정확한 소수점 처리)
    const finalScale = Math.max(0.1, Math.min(scale, 2.0)); // 최소 0.1, 최대 2.0
    dashboard.style.transform = `scale(${finalScale})`;
    dashboard.style.transformOrigin = 'center center';
    dashboard.style.margin = '0';
    dashboard.style.padding = '16px'; // 내부 패딩은 유지
    
    // 7. 디버깅용 (필요시 주석 해제)
    // console.log('Screen:', screenWidth, 'x', screenHeight, 'Scale:', finalScale);
  };
  
  // 초기 조정 (여러 번 시도하여 정확도 향상)
  function initializeScreenSize() {
    window.adjustScreenSize();
    // DOM이 완전히 로드될 때까지 여러 번 재시도
    setTimeout(window.adjustScreenSize, 10);
    setTimeout(window.adjustScreenSize, 50);
    setTimeout(window.adjustScreenSize, 100);
    setTimeout(window.adjustScreenSize, 200);
    setTimeout(window.adjustScreenSize, 500);
  }
  
  initializeScreenSize();
  
  // 리사이즈 이벤트 (디바운싱 적용)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      window.adjustScreenSize();
      setTimeout(window.adjustScreenSize, 50); // 한 번 더 재시도
    }, 100);
  });
  
  // 화면 회전 이벤트
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      window.adjustScreenSize();
      setTimeout(window.adjustScreenSize, 100);
      setTimeout(window.adjustScreenSize, 300);
    }, 100);
  });
  
  // 페이지 로드 완료 후 한 번 더
  window.addEventListener('load', () => {
    setTimeout(window.adjustScreenSize, 100);
  });

  const logBody   = document.getElementById("log-body");
  const stepText  = document.getElementById("step-text");
  const modeText  = document.getElementById("mode-text");
  const elapsedEl = document.getElementById("elapsed-time");
  const emgBtn    = document.getElementById("btn-emg");
  const startBtn  = document.getElementById("btn-start");
  const stopBtn   = document.getElementById("btn-stop");
  const settingsBtn = document.getElementById("btn-settings");
  const settingsModal = document.getElementById("settings-modal");
  const closeSettingsBtn = document.getElementById("btn-close-settings");
  const cancelSettingsBtn = document.getElementById("btn-settings-cancel");
  const saveSettingsBtn = document.getElementById("btn-settings-save");
  const presetSelectBtn = document.getElementById("btn-preset-select");
  const presetDropdown = document.getElementById("preset-dropdown");
  const presetSelectValue = document.getElementById("preset-select-value");
  const languageSelect = document.getElementById("language-select");

  // 현재 언어 설정
  let currentLanguage = localStorage.getItem("language") || "ko";

  // ========== 다국어 번역 데이터 ==========
  const translations = {
    ko: {
      // 상단
      preset: "프리셋",
      preset1: "프리셋 1",
      preset2: "프리셋 2",
      preset3: "프리셋 3",
      elapsedTime: "경과시간",
      esg: "연료/배출 추정",
      settings: "설정",
      
      // 좌측
      operationControl: "운전 제어",
      autoStart: "AUTO START",
      stop: "STOP",
      fanSpeed: "FAN 속도",
      
      // 중앙
      combustionChamber: "연소실",
      tempGraph: "온도 그래프",
      
      // 우측
      camera: "카메라",
      wasteMovement: "폐기물통 이동",
      horizontal: "수평",
      vertical: "수직",
      logAlarm: "로그 / 알람",
      
      // 설정
      settingsTitle: "설정",
      language: "언어",
      languageSettings: "언어 설정",
      presetSettings: "프리셋 설정",
      systemSettings: "시스템 설정",
      remoteAccess: "원격 접속 설정",
      cancel: "취소",
      save: "저장",
      
      // 프리셋 단계
      s1Purge: "S1 PURGE 단계 (퍼지)",
      s2Ign: "S2 IGN 단계 (점화)",
      s3Main: "S3 MAIN 단계 (소각)",
      s4Cool: "S4 COOL 단계 (냉각)",
      
      // 설정 항목
      stepTime: "단계 시간",
      targetTempMain: "목표 온도 (연소실)",
      targetTempStack: "목표 온도 (STACK)",
      initialFanSpeed: "초기 팬 속도",
      fanSpeedIncrement: "100도마다 팬 속도 증가",
      ignOffDelay: "IGN 화염 감지 후 대기 시간",
      retryCount: "자동 재점화 최대 시도 횟수",
      p2p3Temp: "P2/P3 작동 임계 온도 (연소실)",
      p2p3TempDesc: "℃ (목표 온도보다 낮을 때 작동)",
      quenchTemp: "퀀처 펌프 작동 온도 (STACK)",
      fanSpeedFan1: "팬 속도 (FAN1)",
      fanSpeedFan2: "팬 속도 (FAN2)",
      extinguishTime: "소화 판단 시간",
      extinguishTimeDesc: "초 (목표 온도 이하 유지 시간)",
      fan2Increase: "팬2 속도 증가량",
      fan2IncreaseDesc: "% (소화 판단 후 증가)",
      fan2Duration: "팬2 작동 시간",
      fan2DurationDesc: "초 (5분 = 300초)",
      
      // 시스템 설정
      logSettings: "로그 설정",
      graphSettings: "그래프 설정",
      webServerSettings: "웹 서버 설정",
      adminAuthSettings: "관리자 인증 설정",
      ipAccessControl: "IP 접근 제어",
      dataTransferSettings: "데이터 전송 설정",
      logMaxCount: "로그 최대 개수",
      logInterval: "로그 기록 주기",
      logIntervalFixed: "초 (고정)",
      graphUpdateInterval: "온도 그래프 업데이트 주기",
      graphUpdateIntervalFixed: "초 (고정)",
      webServerPort: "웹 서버 포트",
      port: "포트",
      remoteAccessEnabled: "원격 접속 허용",
      authEnabled: "인증 사용",
      adminUsername: "관리자 아이디",
      adminPassword: "관리자 비밀번호",
      sessionTimeout: "세션 타임아웃",
      minutes: "분",
      ipWhitelistEnabled: "IP 화이트리스트 사용",
      allowedIPs: "허용 IP 주소 (줄바꿈으로 구분)",
      logDownloadEnabled: "로그 다운로드 허용",
      cameraStreamingEnabled: "카메라 스트리밍 허용",
      cameraStreamingPort: "카메라 스트리밍 포트",
      dataSendInterval: "데이터 전송 주기",
      seconds: "초",
      count: "개",
      times: "회",
      // 설명 텍스트
      p2p3TempDesc: "℃ (목표 온도보다 낮을 때 작동)",
      extinguishTimeDesc: "초 (목표 온도 이하 유지 시간)",
      fan2IncreaseDesc: "% (소화 판단 후 증가)",
      fan2DurationDesc: "초 (5분 = 300초)",
      logIntervalFixed: "초 (고정)",
      graphUpdateIntervalFixed: "초 (고정)",
      // 로그 메시지
      logAutoStart: "AUTO START – 폐기물통 위치 확인 중...",
      logWasteReady: "폐기물통 준비 완료 → 시퀀스 시작",
      logStop: "STOP – 시퀀스 중지 및 IDLE 복귀",
      logEmgOn: "⚠️ 비상정지: 모든 버너 OFF, 시퀀스 정지",
      logEmgOff: "EMG 해제 – 수동 대기",
      logEmgBlocked: "EMG 상태에서는 AUTO 시작 불가",
      logS1Purge: "S1 PURGE: 메인 팬 / 폐기물통 팬 저속 purge",
      logS2IgnStart: "S2 IGN: 점화 시작 - IGN, P1, P2, P3 가동",
      logS2IgnTarget: "목표 온도:",
      logS3MainStart: "S3 MAIN: 소각 단계 시작",
      logS3MainTarget: "목표 온도:",
      logS3MainP2P3: "P2/P3 작동 임계:",
      logS4CoolStart: "S4 COOL: 냉각 단계 시작",
      logS4CoolTarget: "목표 온도:",
      logS4CoolExtinguish: "소화 판단 시간:",
      logAutoComplete: "AUTO 시퀀스 완료",
      logSystemReset: "시스템 리셋",
      logSystemLoad: "시스템 로드 완료",
      logWastePosition: "폐기물통 위치:",
      logAutoStartGuide: "AUTO START 버튼을 눌러 운전을 시작하세요",
      logTempWarning: "연소실 온도 경고:",
      logWasteMoving: "폐기물통",
      logWasteMovingComplete: "이동 완료 (리밋센서 감지)",
      logWasteAlready: "이미",
      logWastePosition: "위치입니다",
      logWasteInterlockIgn: "⚠️ 점화/소각 중에는 폐기물통 OUT 금지",
      logWasteInterlockUp: "⚠️ UP 상태에서는 OUT 조작 금지. 먼저 DOWN을 실행하세요"
    },
    en: {
      preset: "Preset",
      preset1: "Preset 1",
      preset2: "Preset 2",
      preset3: "Preset 3",
      elapsedTime: "Elapsed Time",
      esg: "Fuel/Emission Estimate",
      settings: "Settings",
      operationControl: "Operation Control",
      autoStart: "AUTO START",
      stop: "STOP",
      fanSpeed: "FAN Speed",
      combustionChamber: "Combustion Chamber",
      tempGraph: "Temperature Graph",
      camera: "Camera",
      wasteMovement: "Waste Bin Movement",
      horizontal: "Horizontal",
      vertical: "Vertical",
      logAlarm: "Log / Alarm",
      settingsTitle: "Settings",
      language: "Language",
      languageSettings: "Language Settings",
      presetSettings: "Preset Settings",
      systemSettings: "System Settings",
      remoteAccess: "Remote Access Settings",
      cancel: "Cancel",
      save: "Save",
      s1Purge: "S1 PURGE Stage",
      s2Ign: "S2 IGN Stage (Ignition)",
      s3Main: "S3 MAIN Stage (Combustion)",
      s4Cool: "S4 COOL Stage (Cooling)",
      stepTime: "Stage Time",
      targetTempMain: "Target Temperature (Combustion Chamber)",
      targetTempStack: "Target Temperature (STACK)",
      initialFanSpeed: "Initial Fan Speed",
      fanSpeedIncrement: "Fan Speed Increase per 100℃",
      ignOffDelay: "IGN Off Delay After Flame Detection",
      retryCount: "Max Auto Re-ignition Attempts",
      p2p3Temp: "P2/P3 Activation Threshold (Combustion Chamber)",
      p2p3TempDesc: "℃ (Activate when below target)",
      quenchTemp: "Quench Pump Activation Temperature (STACK)",
      fanSpeedFan1: "Fan Speed (FAN1)",
      fanSpeedFan2: "Fan Speed (FAN2)",
      extinguishTime: "Extinguish Judgment Time",
      extinguishTimeDesc: "sec (Time below target temperature)",
      fan2Increase: "Fan2 Speed Increase",
      fan2IncreaseDesc: "% (Increase after extinguish judgment)",
      fan2Duration: "Fan2 Operation Time",
      fan2DurationDesc: "sec (5 min = 300 sec)",
      logSettings: "Log Settings",
      graphSettings: "Graph Settings",
      webServerSettings: "Web Server Settings",
      adminAuthSettings: "Admin Authentication Settings",
      ipAccessControl: "IP Access Control",
      dataTransferSettings: "Data Transfer Settings",
      logMaxCount: "Max Log Count",
      logInterval: "Log Recording Interval",
      logIntervalFixed: "sec (Fixed)",
      graphUpdateInterval: "Temperature Graph Update Interval",
      graphUpdateIntervalFixed: "sec (Fixed)",
      webServerPort: "Web Server Port",
      port: "Port",
      remoteAccessEnabled: "Remote Access Enabled",
      authEnabled: "Authentication Enabled",
      adminUsername: "Admin Username",
      adminPassword: "Admin Password",
      sessionTimeout: "Session Timeout",
      minutes: "min",
      ipWhitelistEnabled: "IP Whitelist Enabled",
      allowedIPs: "Allowed IP Addresses (separated by line break)",
      logDownloadEnabled: "Log Download Enabled",
      cameraStreamingEnabled: "Camera Streaming Enabled",
      cameraStreamingPort: "Camera Streaming Port",
      dataSendInterval: "Data Send Interval",
      seconds: "sec",
      count: "count",
      times: "times",
      p2p3TempDesc: "℃ (Activate when below target)",
      extinguishTimeDesc: "sec (Time below target temperature)",
      fan2IncreaseDesc: "% (Increase after extinguish judgment)",
      fan2DurationDesc: "sec (5 min = 300 sec)",
      logIntervalFixed: "sec (Fixed)",
      graphUpdateIntervalFixed: "sec (Fixed)"
    },
    zh: {
      preset: "预设",
      preset1: "预设 1",
      preset2: "预设 2",
      preset3: "预设 3",
      elapsedTime: "经过时间",
      esg: "燃料/排放估算",
      settings: "设置",
      operationControl: "运行控制",
      autoStart: "自动启动",
      stop: "停止",
      fanSpeed: "风扇速度",
      combustionChamber: "燃烧室",
      tempGraph: "温度图表",
      camera: "摄像头",
      wasteMovement: "废物箱移动",
      horizontal: "水平",
      vertical: "垂直",
      logAlarm: "日志 / 警报",
      settingsTitle: "设置",
      language: "语言",
      languageSettings: "语言设置",
      presetSettings: "预设设置",
      systemSettings: "系统设置",
      remoteAccess: "远程访问设置",
      cancel: "取消",
      save: "保存",
      s1Purge: "S1 PURGE 阶段（吹扫）",
      s2Ign: "S2 IGN 阶段（点火）",
      s3Main: "S3 MAIN 阶段（燃烧）",
      s4Cool: "S4 COOL 阶段（冷却）",
      stepTime: "阶段时间",
      targetTempMain: "目标温度（燃烧室）",
      targetTempStack: "目标温度（STACK）",
      initialFanSpeed: "初始风扇速度",
      fanSpeedIncrement: "每100度风扇速度增加",
      ignOffDelay: "IGN火焰检测后等待时间",
      retryCount: "自动重新点火最大尝试次数",
      p2p3Temp: "P2/P3工作阈值温度（燃烧室）",
      p2p3TempDesc: "℃（低于目标时工作）",
      quenchTemp: "急冷泵工作温度（STACK）",
      fanSpeedFan1: "风扇速度（FAN1）",
      fanSpeedFan2: "风扇速度（FAN2）",
      extinguishTime: "灭火判断时间",
      extinguishTimeDesc: "秒（低于目标温度保持时间）",
      fan2Increase: "风扇2速度增加量",
      fan2IncreaseDesc: "%（灭火判断后增加）",
      fan2Duration: "风扇2工作时间",
      fan2DurationDesc: "秒（5分钟 = 300秒）",
      logSettings: "日志设置",
      graphSettings: "图表设置",
      webServerSettings: "Web服务器设置",
      adminAuthSettings: "管理员认证设置",
      ipAccessControl: "IP访问控制",
      dataTransferSettings: "数据传输设置",
      logMaxCount: "最大日志数量",
      logInterval: "日志记录周期",
      logIntervalFixed: "秒（固定）",
      graphUpdateInterval: "温度图表更新周期",
      graphUpdateIntervalFixed: "秒（固定）",
      webServerPort: "Web服务器端口",
      port: "端口",
      remoteAccessEnabled: "允许远程访问",
      authEnabled: "启用认证",
      adminUsername: "管理员用户名",
      adminPassword: "管理员密码",
      sessionTimeout: "会话超时",
      minutes: "分钟",
      ipWhitelistEnabled: "启用IP白名单",
      allowedIPs: "允许的IP地址（换行分隔）",
      logDownloadEnabled: "允许日志下载",
      cameraStreamingEnabled: "允许摄像头流媒体",
      cameraStreamingPort: "摄像头流媒体端口",
      dataSendInterval: "数据传输周期",
      seconds: "秒",
      count: "个",
      times: "次",
      p2p3TempDesc: "℃（低于目标时工作）",
      extinguishTimeDesc: "秒（低于目标温度保持时间）",
      fan2IncreaseDesc: "%（灭火判断后增加）",
      fan2DurationDesc: "秒（5分钟 = 300秒）",
      logIntervalFixed: "秒（固定）",
      graphUpdateIntervalFixed: "秒（固定）"
    },
    ja: {
      preset: "プリセット",
      preset1: "プリセット 1",
      preset2: "プリセット 2",
      preset3: "プリセット 3",
      elapsedTime: "経過時間",
      esg: "燃料/排出推定",
      settings: "設定",
      operationControl: "運転制御",
      autoStart: "自動開始",
      stop: "停止",
      fanSpeed: "ファン速度",
      combustionChamber: "燃焼室",
      tempGraph: "温度グラフ",
      camera: "カメラ",
      wasteMovement: "廃棄物容器移動",
      horizontal: "水平",
      vertical: "垂直",
      logAlarm: "ログ / アラーム",
      settingsTitle: "設定",
      language: "言語",
      languageSettings: "言語設定",
      presetSettings: "プリセット設定",
      systemSettings: "システム設定",
      remoteAccess: "リモートアクセス設定",
      cancel: "キャンセル",
      save: "保存",
      s1Purge: "S1 PURGE段階（パージ）",
      s2Ign: "S2 IGN段階（点火）",
      s3Main: "S3 MAIN段階（燃焼）",
      s4Cool: "S4 COOL段階（冷却）",
      stepTime: "段階時間",
      targetTempMain: "目標温度（燃焼室）",
      targetTempStack: "目標温度（STACK）",
      initialFanSpeed: "初期ファン速度",
      fanSpeedIncrement: "100度ごとのファン速度増加",
      ignOffDelay: "IGN炎検出後待機時間",
      retryCount: "自動再点火最大試行回数",
      p2p3Temp: "P2/P3作動閾値温度（燃焼室）",
      p2p3TempDesc: "℃（目標より低い時作動）",
      quenchTemp: "クエンチポンプ作動温度（STACK）",
      fanSpeedFan1: "ファン速度（FAN1）",
      fanSpeedFan2: "ファン速度（FAN2）",
      extinguishTime: "消火判定時間",
      extinguishTimeDesc: "秒（目標温度以下維持時間）",
      fan2Increase: "ファン2速度増加量",
      fan2IncreaseDesc: "%（消火判定後増加）",
      fan2Duration: "ファン2作動時間",
      fan2DurationDesc: "秒（5分 = 300秒）",
      logSettings: "ログ設定",
      graphSettings: "グラフ設定",
      webServerSettings: "Webサーバー設定",
      adminAuthSettings: "管理者認証設定",
      ipAccessControl: "IPアクセス制御",
      dataTransferSettings: "データ転送設定",
      logMaxCount: "最大ログ数",
      logInterval: "ログ記録周期",
      logIntervalFixed: "秒（固定）",
      graphUpdateInterval: "温度グラフ更新周期",
      graphUpdateIntervalFixed: "秒（固定）",
      webServerPort: "Webサーバーポート",
      port: "ポート",
      remoteAccessEnabled: "リモートアクセス許可",
      authEnabled: "認証使用",
      adminUsername: "管理者ユーザー名",
      adminPassword: "管理者パスワード",
      sessionTimeout: "セッションタイムアウト",
      minutes: "分",
      ipWhitelistEnabled: "IPホワイトリスト使用",
      allowedIPs: "許可IPアドレス（改行で区切る）",
      logDownloadEnabled: "ログダウンロード許可",
      cameraStreamingEnabled: "カメラストリーミング許可",
      cameraStreamingPort: "カメラストリーミングポート",
      dataSendInterval: "データ送信周期",
      seconds: "秒",
      count: "個",
      times: "回",
      p2p3TempDesc: "℃（目標より低い時作動）",
      extinguishTimeDesc: "秒（目標温度以下維持時間）",
      fan2IncreaseDesc: "%（消火判定後増加）",
      fan2DurationDesc: "秒（5分 = 300秒）",
      logIntervalFixed: "秒（固定）",
      graphUpdateIntervalFixed: "秒（固定）"
    }
  };

  // 버튼 핸들러 함수들 (updateLanguage보다 먼저 정의)
  function handleStartClick() {
    console.log('handleStartClick 호출됨');
    if (emg) {
      log("EMG 상태에서는 AUTO 시작 불가", "danger");
      return;
    }
    
    mode = "AUTO";
    updateModeText();
    
    // 시뮬레이션 모드 활성화
    isSimulationMode = true;
    simulationStartTime = seconds;
    simulatedMainTemp = 30;
    simulatedStackTemp = 30;
    
    log("AUTO START – 폐기물통 위치 확인 중...", "success");
    startTimer();
    
    // 폐기물통 위치 확인 및 자동 이동
    prepareWastePosition(() => {
      log("폐기물통 준비 완료 → 시퀀스 시작", "success");
      detectCurrentStepAndResume();
    });
  }

  function handleStopClick() {
    log("STOP – 시퀀스 중지 및 IDLE 복귀", "warning");
    resetAll();
  }

  function handleEmgClick() {
    emg = !emg;
    if (emg) {
      mode = "EMG";
      updateModeText();
      emgBtn.classList.add("active");
      stepText.textContent = "EMG";
      log("⚠️ 비상정지: 모든 버너 OFF, 시퀀스 정지", "emergency");
      clearStepTimer();
      stopTimer();
      stopGraphRecording();
      setDevice("IGN",  false);
      setDevice("P1",   false);
      setDevice("P2",   false);
      setDevice("P3",   false);
      setDevice("PUMP", true);   // 필요 시 퀀처 펌프 ON
    } else {
      mode = "MAN";
      updateModeText();
      emgBtn.classList.remove("active");
      stepText.textContent = "IDLE";
      setDevice("PUMP", false);
      log("EMG 해제 – 수동 대기", "info");
    }
  }

  function openSettingsModal() {
    settingsModal.classList.add("active");
    loadSettingsToUI();
  }

  function closeSettingsModal() {
    settingsModal.classList.remove("active");
  }

  // 언어 업데이트 함수
  function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    
    const t = translations[lang] || translations.ko;
    
    // 상단
    const presetLabel = document.querySelector('[data-i18n="preset-label"]');
    if (presetLabel) presetLabel.textContent = t.preset;
    const elapsedLabel = document.querySelector('[data-i18n="elapsed-time-label"]');
    if (elapsedLabel) elapsedLabel.textContent = t.elapsedTime;
    const esgValue = document.querySelector('[data-i18n="esg-value"]');
    if (esgValue) esgValue.textContent = t.esg;
    
    // 프리셋 옵션
    document.querySelectorAll('[data-i18n="preset1"]').forEach(el => el.textContent = t.preset1);
    document.querySelectorAll('[data-i18n="preset2"]').forEach(el => el.textContent = t.preset2);
    document.querySelectorAll('[data-i18n="preset3"]').forEach(el => el.textContent = t.preset3);
    
    // 좌측
    const operationControlEl = document.querySelector('[data-i18n="operation-control"]');
    if (operationControlEl) operationControlEl.textContent = t.operationControl;
    const fanSpeedEl = document.querySelector('[data-i18n="fan-speed"]');
    if (fanSpeedEl) fanSpeedEl.textContent = t.fanSpeed;
    
    // 버튼 텍스트 변경 후 이벤트 리스너 재연결
    const startBtnEl = document.getElementById('btn-start');
    const stopBtnEl = document.getElementById('btn-stop');
    const settingsBtnEl = document.getElementById('btn-settings');
    
    // 버튼 텍스트 변경 후 이벤트 리스너 재연결
    if (startBtnEl) {
      startBtnEl.textContent = t.autoStart;
      // 기존 이벤트 리스너 제거 후 재연결
      startBtnEl.removeEventListener('click', handleStartClick);
      startBtnEl.addEventListener('click', handleStartClick);
    }
    if (stopBtnEl) {
      stopBtnEl.textContent = t.stop;
      stopBtnEl.removeEventListener('click', handleStopClick);
      stopBtnEl.addEventListener('click', handleStopClick);
    }
    if (settingsBtnEl) {
      settingsBtnEl.textContent = t.settings;
      settingsBtnEl.removeEventListener('click', openSettingsModal);
      settingsBtnEl.addEventListener('click', openSettingsModal);
    }
    
    // 중앙
    const combustionChamberEl = document.querySelector('[data-i18n="combustion-chamber"]');
    if (combustionChamberEl) combustionChamberEl.textContent = t.combustionChamber;
    const tempGraphEl = document.querySelector('[data-i18n="temp-graph"]');
    if (tempGraphEl) tempGraphEl.textContent = t.tempGraph;
    
    // 우측
    const cameraEl = document.querySelector('[data-i18n="camera"]');
    if (cameraEl) cameraEl.textContent = t.camera;
    const wasteMovementEl = document.querySelector('[data-i18n="waste-movement"]');
    if (wasteMovementEl) wasteMovementEl.textContent = t.wasteMovement;
    const horizontalEl = document.querySelector('[data-i18n="horizontal"]');
    if (horizontalEl) horizontalEl.textContent = t.horizontal;
    const verticalEl = document.querySelector('[data-i18n="vertical"]');
    if (verticalEl) verticalEl.textContent = t.vertical;
    const logAlarmEl = document.querySelector('[data-i18n="log-alarm"]');
    if (logAlarmEl) logAlarmEl.textContent = t.logAlarm;
    
    // 설정 모달
    const settingsTitleEl = document.querySelector('[data-i18n="settings-title"]');
    if (settingsTitleEl) settingsTitleEl.textContent = t.settingsTitle;
    const languageLabelEl = document.querySelector('[data-i18n="language-label"]');
    if (languageLabelEl) languageLabelEl.textContent = t.language;
    const languageSettingsEl = document.querySelector('[data-i18n="language-settings"]');
    if (languageSettingsEl) languageSettingsEl.textContent = t.languageSettings;
    const presetSettingsEl = document.querySelector('[data-i18n="preset-settings"]');
    if (presetSettingsEl) presetSettingsEl.textContent = t.presetSettings;
    const systemSettingsEl = document.querySelector('[data-i18n="system-settings"]');
    if (systemSettingsEl) systemSettingsEl.textContent = t.systemSettings;
    const remoteAccessEl = document.querySelector('[data-i18n="remote-access"]');
    if (remoteAccessEl) remoteAccessEl.textContent = t.remoteAccess;
    const cancelEl = document.querySelector('[data-i18n="cancel"]');
    if (cancelEl) cancelEl.textContent = t.cancel;
    const saveEl = document.querySelector('[data-i18n="save"]');
    if (saveEl) saveEl.textContent = t.save;
    
    // 설정 항목 라벨 업데이트 (동적 매핑)
    const labelMappings = {
      '단계 시간': 'stepTime',
      '목표 온도 (연소실)': 'targetTempMain',
      '목표 온도 (STACK)': 'targetTempStack',
      '초기 팬 속도 (FAN1)': 'initialFanSpeed',
      '초기 팬 속도 (FAN2)': 'initialFanSpeed',
      '100도마다 팬 속도 증가 (FAN1)': 'fanSpeedIncrement',
      '100도마다 팬 속도 증가 (FAN2)': 'fanSpeedIncrement',
      'IGN 화염 감지 후 대기 시간': 'ignOffDelay',
      '자동 재점화 최대 시도 횟수': 'retryCount',
      'P2/P3 작동 임계 온도 (연소실)': 'p2p3Temp',
      '팬 속도 (FAN1)': 'fanSpeedFan1',
      '팬 속도 (FAN2)': 'fanSpeedFan2',
      '퀀처 펌프 작동 온도 (STACK)': 'quenchTemp',
      '소화 판단 시간': 'extinguishTime',
      '팬2 속도 증가량': 'fan2Increase',
      '팬2 작동 시간': 'fan2Duration',
      'S1 PURGE 단계 (퍼지)': 's1Purge',
      'S2 IGN 단계 (점화)': 's2Ign',
      'S3 MAIN 단계 (소각)': 's3Main',
      'S4 COOL 단계 (냉각)': 's4Cool',
      '로그 설정': 'logSettings',
      '그래프 설정': 'graphSettings',
      '웹 서버 설정': 'webServerSettings',
      '관리자 인증 설정': 'adminAuthSettings',
      'IP 접근 제어': 'ipAccessControl',
      '데이터 전송 설정': 'dataTransferSettings',
      '로그 최대 개수': 'logMaxCount',
      '로그 기록 주기': 'logInterval',
      '온도 그래프 업데이트 주기': 'graphUpdateInterval',
      '웹 서버 포트': 'webServerPort',
      '원격 접속 허용': 'remoteAccessEnabled',
      '인증 사용': 'authEnabled',
      '관리자 아이디': 'adminUsername',
      '관리자 비밀번호': 'adminPassword',
      '세션 타임아웃': 'sessionTimeout',
      'IP 화이트리스트 사용': 'ipWhitelistEnabled',
      '허용 IP 주소 (줄바꿈으로 구분)': 'allowedIPs',
      '로그 다운로드 허용': 'logDownloadEnabled',
      '카메라 스트리밍 허용': 'cameraStreamingEnabled',
      '카메라 스트리밍 포트': 'cameraStreamingPort',
      '데이터 전송 주기': 'dataSendInterval'
    };
    
    // 모든 라벨 요소 업데이트
    document.querySelectorAll('.settings-label, .settings-subtitle, .settings-section-title').forEach(el => {
      const originalText = el.getAttribute('data-original-text') || el.textContent.trim();
      if (!el.getAttribute('data-original-text')) {
        el.setAttribute('data-original-text', originalText);
      }
      const key = labelMappings[originalText];
      if (key && t[key]) {
        el.textContent = t[key];
      }
    });
    
    // 단위 텍스트 업데이트
    const unitMappings = {
      '℃ (목표 온도보다 낮을 때 작동)': 'p2p3TempDesc',
      '초 (목표 온도 이하 유지 시간)': 'extinguishTimeDesc',
      '% (소화 판단 후 증가)': 'fan2IncreaseDesc',
      '초 (5분 = 300초)': 'fan2DurationDesc',
      '초 (고정)': 'logIntervalFixed',
      '초 (고정)': 'graphUpdateIntervalFixed'
    };
    
    document.querySelectorAll('.settings-unit').forEach(el => {
      const originalText = el.getAttribute('data-original-unit') || el.textContent.trim();
      if (!el.getAttribute('data-original-unit')) {
        el.setAttribute('data-original-unit', originalText);
      }
      
      // 특수 설명 텍스트 처리
      const unitKey = unitMappings[originalText];
      if (unitKey && t[unitKey]) {
        el.textContent = t[unitKey];
        return;
      }
      
      // 일반 단위 텍스트 처리
      const text = originalText;
      if (text.includes('초') && !text.includes('고정') && !text.includes('유지')) {
        el.textContent = text.replace(/초/g, t.seconds);
      } else if (text.includes('분')) {
        el.textContent = text.replace(/분/g, t.minutes);
      } else if (text.includes('개')) {
        el.textContent = text.replace(/개/g, t.count);
      } else if (text.includes('회')) {
        el.textContent = text.replace(/회/g, t.times);
      } else if (text.includes('포트')) {
        el.textContent = text.replace(/포트/g, t.port);
      }
    });
    
    // 현재 선택된 프리셋 이름 업데이트
    const preset = PRESETS[currentPreset];
    if (preset) {
      const presetNames = {
        ko: {1: "프리셋 1", 2: "프리셋 2", 3: "프리셋 3"},
        en: {1: "Preset 1", 2: "Preset 2", 3: "Preset 3"},
        zh: {1: "预设 1", 2: "预设 2", 3: "预设 3"},
        ja: {1: "プリセット 1", 2: "プリセット 2", 3: "プリセット 3"}
      };
      presetSelectValue.textContent = presetNames[lang]?.[currentPreset] || preset.name;
    }
  }

  let timer   = null;
  let seconds = 0;
  
  // ========== 시뮬레이션 변수 ==========
  const SIMULATION_RATIO = 20; // 실제 1시간을 3분으로 압축 (3600초 → 180초)
  let simulationStartTime = 0; // 시뮬레이션 시작 시간 (초)
  let stepStartTime = 0; // 각 단계 시작 시간
  let simulatedMainTemp = 30; // 시뮬레이션된 연소실 온도
  let simulatedStackTemp = 30; // 시뮬레이션된 STACK 온도
  let isSimulationMode = false; // 시뮬레이션 모드 활성화 여부
  
  // ========== 프리셋 설정값 ==========
  let currentPreset = 1; // 현재 선택된 프리셋 (1, 2, 3)
  
  const PRESETS = {
    1: {
      name: "프리셋 1",
      s1: { // PURGE
        time: 60,
        fan1: 30,
        fan2: 30
      },
      s2: { // IGN
        tempMain: 600,
        fan1Init: 30,
        fan2Init: 30,
        fan1Increment: 5,  // 100도마다 증가율
        fan2Increment: 5,
        ignOffDelay: 10,   // 화염 감지 후 IGN OFF까지 대기 시간 (초)
        retryCount: 3      // 자동 재점화 최대 시도 횟수
      },
      s3: { // MAIN
        tempMain: 1100,
        p2p3Temp: 950,  // P2/P3 작동 임계 온도
        fan1: 80,
        fan2: 80,
        quenchTemp: 850
      },
      s4: { // COOL
        tempMain: 400,
        extinguishTime: 300,  // 소화 판단 시간 (초)
        fan2Increase: 20,     // 팬2 속도 증가량 (%)
        fan2Duration: 300     // 팬2 작동 시간 (초, 5분)
      }
    },
    2: {
      name: "프리셋 2",
      s1: { // PURGE
        time: 60,
        fan1: 35,
        fan2: 35
      },
      s2: { // IGN
        tempMain: 700,
        fan1Init: 35,
        fan2Init: 35,
        fan1Increment: 6,
        fan2Increment: 6,
        ignOffDelay: 10,
        retryCount: 3
      },
      s3: { // MAIN
        tempMain: 1200,
        p2p3Temp: 1050,
        fan1: 80,
        fan2: 80,
        quenchTemp: 850
      },
      s4: { // COOL
        tempMain: 400,
        extinguishTime: 300,
        fan2Increase: 20,
        fan2Duration: 300
      }
    },
    3: {
      name: "프리셋 3",
      s1: { // PURGE
        time: 60,
        fan1: 25,
        fan2: 25
      },
      s2: { // IGN
        tempMain: 550,
        fan1Init: 25,
        fan2Init: 25,
        fan1Increment: 4,
        fan2Increment: 4,
        ignOffDelay: 10,
        retryCount: 3
      },
      s3: { // MAIN
        tempMain: 1000,
        p2p3Temp: 850,
        fan1: 80,
        fan2: 80,
        quenchTemp: 850
      },
      s4: { // COOL
        tempMain: 400,
        extinguishTime: 300,
        fan2Increase: 20,
        fan2Duration: 300
      }
    }
  };

  // 운전 모드: MAN(기본), AUTO, EMG
  let mode = "MAN";
  let emg  = false;

  // 퀀처(펌프) 온도 기준
  const QUENCH_ON_TEMP = 850;  // STACK 850℃ 이상이면 ON
  let quenchOn = false;

  // 그래프 기록 상태
  let isGraphRecording = false;
  let graphStartSeconds = 0;  // 그래프 기록 시작 시점의 경과시간

  // ========== 폐기물통 위치 상태 (리밋센서 시뮬레이션) ==========
  // 수평: OUT ↔ IN,  수직: DOWN ↔ UP
  let wastePosition = {
    horizontal: "OUT",  // "OUT" | "MOVING_IN" | "IN" | "MOVING_OUT"
    vertical: "DOWN"    // "DOWN" | "MOVING_UP" | "UP" | "MOVING_DOWN"
  };
  let wasteMovingTimer = null;
  const WASTE_MOVE_TIME = 3000; // 이동 시간 (ms)

  // ========== 팬 속도 값 ==========
  let fanValues = { fan1: 0, fan2: 0 };

  // ========== 점화 단계 상태 ==========
  let flameDetected = false;        // 화염 감지 상태
  let ignOffTimer = null;            // IGN OFF 타이머
  let retryCount = 0;                // 재점화 시도 횟수
  let flameLostDetected = false;     // 화염 소실 감지
  let ignitionStartTemp = 0;          // 점화 시작 온도

  // ========== 소각 단계 상태 ==========
  let targetTempReached = false;    // 목표 온도 도달 여부
  let p2p3Active = false;            // P2/P3 작동 상태

  // ========== 냉각 단계 상태 ==========
  let coolStartTime = 0;             // 냉각 단계 시작 시간
  let tempBelowTargetTime = 0;       // 목표 온도 이하 유지 시작 시간
  let extinguishDetected = false;    // 소화 판단 여부
  let fan2IncreaseTimer = null;      // 팬2 증가 타이머
  let fan2StopTimer = null;          // 팬2 정지 타이머

  // 100kg/hr 단속식 배치 시퀀스
  const STEP_FLOW = [
    { id: "S0_IDLE",  label: "S0 IDLE",  sec:   0 },
    { id: "S1_PURGE", label: "S1 PURGE", sec:   1 }, // 실제 20초 → 1초
    { id: "S2_IGN",   label: "S2 IGN",   sec:  12 }, // 실제 3-5분 → 12초
    { id: "S3_MAIN",  label: "S3 MAIN",  sec: 120 }, // 실제 40분 → 120초
    { id: "S4_COOL",  label: "S4 COOL",  sec:  30 }, // 실제 10분 → 30초
    { id: "S5_END",   label: "S5 END",   sec:   0 }
  ];

  let currentStepIndex = 0;
  let stepTimer        = null;

  // ---------- 공통 유틸 ----------

  /**
   * 로그 타입:
   * - info: 일반 정보 (기본)
   * - success: 시작/완료
   * - warning: 경고
   * - danger: 위험 (깜빡임)
   * - emergency: 비상정지 (강한 깜빡임)
   * - system: 시스템 메시지
   */
  function log(msg, type = "info") {
    const now = new Date().toLocaleTimeString();
    const div = document.createElement("div");
    div.className = `log-entry ${type}`;
    
    const timeSpan = document.createElement("span");
    timeSpan.className = "log-time";
    timeSpan.textContent = `[${now}]`;
    
    // 다국어 지원: 번역 키가 있으면 번역된 메시지 사용
    let displayMsg = msg;
    const t = translations[currentLanguage] || translations.ko;
    
    // 주요 로그 메시지 번역
    if (msg.includes("AUTO START – 폐기물통 위치 확인 중")) {
      displayMsg = t.logAutoStart;
    } else if (msg.includes("폐기물통 준비 완료 → 시퀀스 시작")) {
      displayMsg = t.logWasteReady;
    } else if (msg.includes("STOP – 시퀀스 중지 및 IDLE 복귀")) {
      displayMsg = t.logStop;
    } else if (msg.includes("⚠️ 비상정지: 모든 버너 OFF")) {
      displayMsg = t.logEmgOn;
    } else if (msg.includes("EMG 해제 – 수동 대기")) {
      displayMsg = t.logEmgOff;
    } else if (msg.includes("EMG 상태에서는 AUTO 시작 불가")) {
      displayMsg = t.logEmgBlocked;
    } else if (msg.includes("S1 PURGE: 메인 팬 / 폐기물통 팬 저속 purge")) {
      displayMsg = t.logS1Purge;
    } else if (msg.includes("S2 IGN: 점화 시작 - IGN, P1, P2, P3 가동")) {
      displayMsg = t.logS2IgnStart;
    } else if (msg.includes("S3 MAIN: 소각 단계 시작")) {
      displayMsg = t.logS3MainStart;
    } else if (msg.includes("S4 COOL: 냉각 단계 시작")) {
      displayMsg = t.logS4CoolStart;
    } else if (msg.includes("AUTO 시퀀스 완료")) {
      displayMsg = t.logAutoComplete;
    } else if (msg.includes("시스템 리셋")) {
      displayMsg = t.logSystemReset;
    } else if (msg.includes("시스템 로드 완료")) {
      displayMsg = t.logSystemLoad;
    } else if (msg.includes("AUTO START 버튼을 눌러 운전을 시작하세요")) {
      displayMsg = t.logAutoStartGuide;
    } else if (msg.includes("연소실 온도 경고:")) {
      const temp = msg.match(/:\s*(\d+)/)?.[1] || "";
      displayMsg = `${t.logTempWarning} ${temp}℃`;
    } else if (msg.includes("목표 온도:")) {
      const temp = msg.match(/:\s*(\d+)/)?.[1] || "";
      displayMsg = `${t.logS2IgnTarget} ${temp}℃`;
    } else if (msg.includes("폐기물통") && msg.includes("이동 완료")) {
      const direction = msg.match(/폐기물통\s*(\w+)/)?.[1] || "";
      displayMsg = `${t.logWasteMoving} ${direction} ${t.logWasteMovingComplete}`;
    } else if (msg.includes("이미") && msg.includes("위치입니다")) {
      const direction = msg.match(/이미\s*(\w+)/)?.[1] || "";
      displayMsg = `${t.logWasteAlready} ${direction} ${t.logWastePosition}`;
    }
    
    div.appendChild(timeSpan);
    div.appendChild(document.createTextNode(displayMsg));
    
    logBody.appendChild(div);
    logBody.scrollTop = logBody.scrollHeight;
    
    // 위험/비상 로그는 5초 후 깜빡임 중지 (단, 클래스는 유지)
    if (type === "danger" || type === "emergency") {
      setTimeout(() => {
        div.style.animation = "none";
      }, 5000);
    }
  }

  function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
      seconds++;
      const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      elapsedEl.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  function updateModeText() {
    modeText.textContent = mode;
  }

  function numericFromText(text) {
    // "1,100℃" → 1100
    const digits = text.replace(/[^\d]/g, "");
    return digits ? parseInt(digits, 10) : 0;
  }

  function getMainTempFromDom() {
    const el = document.getElementById("temp-main");
    return el ? numericFromText(el.textContent) : 0;
  }

  function getStackTempFromDom() {
    const el = document.getElementById("temp-stack");
    return el ? numericFromText(el.textContent) : 0;
  }

  // ---------- 디바이스/팬/온도 표시 ----------

  function setFan(id, value, isManual = false) {
    value = Math.max(0, Math.min(100, value)); // 0~100 범위 제한
    fanValues[id] = value;
    
    const fill    = document.getElementById(`${id}-fill`);
    const percent = document.getElementById(`${id}-percent`);
    const knob    = document.getElementById(`${id}-knob`);
    const slider  = document.getElementById(`${id}-slider`);
    
    if (!fill || !percent) return;
    
    fill.style.height = value + "%";
    percent.textContent = value + "%";
    
    // 노브 위치 업데이트
    if (knob && slider) {
      const sliderHeight = slider.clientHeight - 18; // 노브 높이 제외
      const knobPosition = (value / 100) * sliderHeight;
      knob.style.bottom = knobPosition + "px";
    }
    
    if (isManual) {
      log(`${id.toUpperCase()} 속도: ${value}% (수동)`, "info");
    }
  }

  function setDevice(dev, on) {
    const btn = document.querySelector(`.device-btn[data-device="${dev}"]`);
    if (!btn) return;
    const state = btn.querySelector(".device-state");
    btn.classList.toggle("on",  on);
    btn.classList.toggle("off", !on);
    state.textContent = on ? "ON" : "OFF";
  }

  function setTemps(main, stack) {
    const mainEl  = document.getElementById("temp-main");
    const stackEl = document.getElementById("temp-stack");
    if (mainEl)  mainEl.textContent  = `${main.toLocaleString()}℃`;
    if (stackEl) stackEl.textContent = `${stack.toLocaleString()}℃`;
  }

  function updateQuenchByStackTemp() {
    // 소각 단계에서는 processMainStep에서 처리하므로 여기서는 처리하지 않음
    if (currentStepIndex === 3) return;
    
    const stack = getStackTempFromDom();
    const shouldOn = stack >= QUENCH_ON_TEMP;

    if (shouldOn !== quenchOn) {
      quenchOn = shouldOn;
      setDevice("PUMP", shouldOn);
      if (shouldOn) {
        log(`퀀처 ON (STACK ${stack}℃ ≥ ${QUENCH_ON_TEMP}℃)`, "warning");
      } else {
        log(`퀀처 OFF (STACK ${stack}℃)`, "info");
      }
    }
  }

  // ---------- 폐기물통 위치 관리 ----------

  function updateWasteStatusUI() {
    const btnOut = document.getElementById("btn-waste-out");
    const btnIn = document.getElementById("btn-waste-in");
    const btnDown = document.getElementById("btn-waste-down");
    const btnUp = document.getElementById("btn-waste-up");
    
    // 모든 버튼 상태 초기화
    [btnOut, btnIn, btnDown, btnUp].forEach(btn => {
      if (btn) {
        btn.classList.remove("active", "moving");
      }
    });
    
    // 수평 위치 표시
    if (wastePosition.horizontal === "OUT" && btnOut) {
      btnOut.classList.add("active");
    } else if (wastePosition.horizontal === "IN" && btnIn) {
      btnIn.classList.add("active");
    } else if (wastePosition.horizontal === "MOVING_IN" && btnIn) {
      btnIn.classList.add("moving");
    } else if (wastePosition.horizontal === "MOVING_OUT" && btnOut) {
      btnOut.classList.add("moving");
    }
    
    // 수직 위치 표시
    if (wastePosition.vertical === "DOWN" && btnDown) {
      btnDown.classList.add("active");
    } else if (wastePosition.vertical === "UP" && btnUp) {
      btnUp.classList.add("active");
    } else if (wastePosition.vertical === "MOVING_UP" && btnUp) {
      btnUp.classList.add("moving");
    } else if (wastePosition.vertical === "MOVING_DOWN" && btnDown) {
      btnDown.classList.add("moving");
    }
  }

  function moveWaste(direction, callback = null) {
    // 이미 이동 중이면 무시
    if (wastePosition.horizontal.startsWith("MOVING") || 
        wastePosition.vertical.startsWith("MOVING")) {
      log("폐기물통 이동 중...", "warning");
      return false;
    }

    // 인터락: 점화나 소각 중에는 OUT 금지
    if (direction === "OUT") {
      if (currentStepIndex === 2 || currentStepIndex === 3) { // S2_IGN or S3_MAIN
        log("⚠️ 점화/소각 중에는 폐기물통 OUT 금지", "danger");
        return false;
      }
      
      // UP 상태인데 OUT 조작 금지
      if (wastePosition.vertical === "UP") {
        log("⚠️ UP 상태에서는 OUT 조작 금지. 먼저 DOWN을 실행하세요", "danger");
        return false;
      }
    }

    let targetH = wastePosition.horizontal;
    let targetV = wastePosition.vertical;

    switch (direction) {
      case "IN":
        if (wastePosition.horizontal === "IN") {
          log("이미 IN 위치입니다", "info");
          if (callback) callback();
          return true;
        }
        wastePosition.horizontal = "MOVING_IN";
        targetH = "IN";
        break;
      case "OUT":
        if (wastePosition.horizontal === "OUT") {
          log("이미 OUT 위치입니다", "info");
          if (callback) callback();
          return true;
        }
        wastePosition.horizontal = "MOVING_OUT";
        targetH = "OUT";
        break;
      case "UP":
        if (wastePosition.vertical === "UP") {
          log("이미 UP 위치입니다", "info");
          if (callback) callback();
          return true;
        }
        wastePosition.vertical = "MOVING_UP";
        targetV = "UP";
        break;
      case "DOWN":
        if (wastePosition.vertical === "DOWN") {
          log("이미 DOWN 위치입니다", "info");
          if (callback) callback();
          return true;
        }
        wastePosition.vertical = "MOVING_DOWN";
        targetV = "DOWN";
        break;
    }

    updateWasteStatusUI();
    log(`폐기물통 ${direction} 이동 중...`, "info");

    // 이동 완료 시뮬레이션
    wasteMovingTimer = setTimeout(() => {
      if (direction === "IN" || direction === "OUT") {
        wastePosition.horizontal = targetH;
      } else {
        wastePosition.vertical = targetV;
      }
      updateWasteStatusUI();
      log(`폐기물통 ${direction} 이동 완료 (리밋센서 감지)`, "success");
      
      if (callback) callback();
    }, WASTE_MOVE_TIME);

    return true;
  }

  function isWasteReady() {
    return wastePosition.horizontal === "IN" && wastePosition.vertical === "UP";
  }

  // ---------- 그래프 기록 제어 ----------

  function startGraphRecording() {
    if (isGraphRecording) return;
    isGraphRecording = true;
    graphStartSeconds = seconds;
    
    log("온도 그래프 기록 시작", "system");
  }

  function stopGraphRecording() {
    if (!isGraphRecording) return;
    isGraphRecording = false;
    
    log("온도 그래프 기록 중지", "system");
  }

  // ---------- STEP별 출력 프로파일 ----------

  function applyStepProfile(stepId) {
    switch (stepId) {
      case "S0_IDLE":
        stepText.textContent = "IDLE";
        setDevice("IGN",   false);
        setDevice("P1",    false);
        setDevice("P2",    false);
        setDevice("P3",    false);
        setDevice("PUMP",  false);
        setFan("fan1", 0);    // 2마력 메인팬
        setFan("fan2", 0);    // 1마력 폐기물통 팬
        setTemps(100, 80);
        quenchOn = false;
        break;

      case "S1_PURGE":
        stepText.textContent = "S1 PURGE";
        const presetPurge = PRESETS[currentPreset];
        const s1 = presetPurge.s1;
        setDevice("IGN",   false);
        setDevice("P1",    false);
        setDevice("P2",    false);
        setDevice("P3",    false);
        // purge: 메인/폐기물통 저속
        setFan("fan1", s1.fan1);
        setFan("fan2", s1.fan2);
        // 시뮬레이션 모드가 아니면 기본값, 시뮬레이션 모드는 simulateTemperature에서 처리
        if (!isSimulationMode) {
          setTemps(200, 150);
        } else {
          setTemps(30, 30);
        }
        log("S1 PURGE: 메인 팬 / 폐기물통 팬 저속 purge", "info");
        break;

      case "S2_IGN":
        stepText.textContent = "S2 IGN";
        const preset = PRESETS[currentPreset];
        const s2 = preset.s2;
        
        // 점화 시작: IGN, P1, P2, P3 모두 가동
        setDevice("IGN", true);
        setDevice("P1", true);
        setDevice("P2", true);
        setDevice("P3", true);
        
        // 초기 팬 속도 설정
        setFan("fan1", s2.fan1Init);
        setFan("fan2", s2.fan2Init);
        
        // 초기 상태 리셋
        flameDetected = false;
        flameLostDetected = false;
        retryCount = 0;
        ignitionStartTemp = getMainTempFromDom();
        clearTimeout(ignOffTimer);
        
        // 카메라 뷰 불길 표시 시작 (점화 단계)
        const cameraView = document.getElementById("camera-view");
        const flameContainer = document.getElementById("camera-flame-container");
        if (cameraView && flameContainer) {
          cameraView.classList.add("flame-active");
          flameContainer.classList.add("flame-active");
        }
        
        setTemps(ignitionStartTemp, getStackTempFromDom());
        log("S2 IGN: 점화 시작 - IGN, P1, P2, P3 가동", "success");
        log(`목표 온도: ${s2.tempMain}℃`, "info");
        
        // 점화 단계부터 그래프 기록 시작
        startGraphRecording();
        updateQuenchByStackTemp();
        break;

      case "S3_MAIN":
        stepText.textContent = "S3 MAIN";
        const presetMain = PRESETS[currentPreset];
        const s3 = presetMain.s3;
        
        setDevice("IGN", false);
        setDevice("P1", true);   // P1은 계속 가동
        setDevice("P2", false);  // 초기에는 OFF, 온도에 따라 작동
        setDevice("P3", false);  // 초기에는 OFF, 온도에 따라 작동
        
        // 팬 속도 설정
        setFan("fan1", s3.fan1);
        setFan("fan2", s3.fan2);
        
        // 상태 리셋
        targetTempReached = false;
        p2p3Active = false;
        
        // 소각 단계에서는 화염이 계속 유지되므로 카메라 뷰 불길 유지
        const cameraViewMain = document.getElementById("camera-view");
        const flameContainerMain = document.getElementById("camera-flame-container");
        if (cameraViewMain && flameContainerMain) {
          cameraViewMain.classList.add("flame-active");
          flameContainerMain.classList.add("flame-active");
        }
        
        // 시뮬레이션 모드가 아니면 현재 온도 사용
        if (!isSimulationMode) {
          setTemps(getMainTempFromDom(), getStackTempFromDom());
        }
        log("S3 MAIN: 소각 단계 시작", "success");
        log(`목표 온도: ${s3.tempMain}℃, P2/P3 작동 임계: ${s3.p2p3Temp}℃`, "info");
        updateQuenchByStackTemp();
        break;

      case "S4_COOL":
        stepText.textContent = "S4 COOL";
        const presetCool = PRESETS[currentPreset];
        const s4 = presetCool.s4;
        
        setDevice("IGN", false);
        setDevice("P1", false);
        setDevice("P2", false);
        setDevice("P3", false);
        
        // 초기 팬 속도 (냉각용)
        setFan("fan1", 60);
        setFan("fan2", 60);
        
        // 상태 리셋
        coolStartTime = seconds;
        tempBelowTargetTime = 0;
        extinguishDetected = false;
        clearTimeout(fan2IncreaseTimer);
        clearTimeout(fan2StopTimer);
        
        // 냉각 단계에서는 온도가 낮아질 때까지 불길 유지
        // processCoolStep에서 온도가 낮아져 끝날 때까지 불길 표시
        const cameraViewCool = document.getElementById("camera-view");
        const flameContainerCool = document.getElementById("camera-flame-container");
        if (cameraViewCool && flameContainerCool) {
          // 냉각 단계 시작 시에도 불길 유지 (온도가 낮아질 때까지)
          cameraViewCool.classList.add("flame-active");
          flameContainerCool.classList.add("flame-active");
        }
        
        // 시뮬레이션 모드가 아니면 현재 온도 사용
        if (!isSimulationMode) {
          setTemps(getMainTempFromDom(), getStackTempFromDom());
        }
        log("S4 COOL: 냉각 단계 시작", "warning");
        log(`목표 온도: ${s4.tempMain}℃, 소화 판단 시간: ${s4.extinguishTime}초`, "info");
        updateQuenchByStackTemp();
        break;

      case "S5_END":
        stepText.textContent = "S5 END";
        setDevice("IGN",   false);
        setDevice("P1",    false);
        setDevice("P2",    false);
        setDevice("P3",    false);
        setFan("fan1", 20);   // 잔열 제거용 약풍
        setFan("fan2", 0);
        setTemps(200, 150);
        quenchOn = false;
        setDevice("PUMP", false);
        log("S5 END: 배치 종료 – 폐기물통 이동 가능", "success");
        // 배치 종료 시 그래프 기록 중지
        stopGraphRecording();
        break;
    }
  }

  function clearStepTimer() {
    if (stepTimer) {
      clearTimeout(stepTimer);
      stepTimer = null;
    }
  }

  function goToStep(index) {
    clearStepTimer();
    currentStepIndex = index;
    const step = STEP_FLOW[currentStepIndex];
    if (!step) return;

    applyStepProfile(step.id);
    
    // 시뮬레이션 모드: 단계 시작 시간 기록
    if (isSimulationMode && mode === "AUTO") {
      stepStartTime = seconds;
    }

    if (step.sec > 0 && mode === "AUTO") {
      stepTimer = setTimeout(() => {
        if (currentStepIndex < STEP_FLOW.length - 1) {
          goToStep(currentStepIndex + 1);
        } else {
          log("AUTO 시퀀스 완료", "success");
          isSimulationMode = false;
        }
      }, step.sec * 1000);
    }
  }
  
  // 온도 시뮬레이션 함수
  function simulateTemperature() {
    if (!isSimulationMode || mode !== "AUTO") return;
    
    const stepElapsed = seconds - stepStartTime;
    const preset = PRESETS[currentPreset];
    
    switch (currentStepIndex) {
      case 1: // S1 PURGE
        // 퍼지 단계: 상온 유지 (30도)
        simulatedMainTemp = 30;
        simulatedStackTemp = 30;
        break;
        
      case 2: // S2 IGN
        // 점화 단계: 빠르게 온도 상승
        const s2 = preset.s2;
        const ignDuration = STEP_FLOW[2].sec; // 12초
        const progress = Math.min(1, stepElapsed / ignDuration);
        
        // 30도에서 목표 온도까지 급상승
        simulatedMainTemp = 30 + (s2.tempMain - 30) * progress;
        simulatedStackTemp = 30 + (s2.tempMain * 0.5 - 30) * progress;
        break;
        
      case 3: // S3 MAIN
        // 소각 단계: 목표 온도 도달 후 100도 들락날락
        const s3 = preset.s3;
        const mainDuration = STEP_FLOW[3].sec; // 120초
        
        if (stepElapsed < 15) {
          // 처음 15초: 목표 온도까지 상승
          const progress = stepElapsed / 15;
          const s2Temp = preset.s2.tempMain;
          simulatedMainTemp = s2Temp + (s3.tempMain - s2Temp) * progress;
        } else {
          // 이후: 1000도 기준으로 100도 들락날락
          const cycleTime = 10; // 10초 주기로 들락날락
          const cycleProgress = ((stepElapsed - 15) % cycleTime) / cycleTime;
          const oscillation = Math.sin(cycleProgress * Math.PI * 2) * 50; // ±50도
          simulatedMainTemp = s3.tempMain + oscillation;
        }
        
        simulatedStackTemp = simulatedMainTemp * 0.5;
        break;
        
      case 4: // S4 COOL
        // 냉각 단계: 서서히 온도 하강
        const s4 = preset.s4;
        const coolDuration = STEP_FLOW[4].sec; // 30초
        const coolProgress = Math.min(1, stepElapsed / coolDuration);
        
        // 1000도에서 목표 온도까지 하강
        const startTemp = preset.s3.tempMain;
        simulatedMainTemp = startTemp - (startTemp - s4.tempMain) * coolProgress;
        simulatedStackTemp = simulatedMainTemp * 0.5;
        
        // 팬 속도 조절: 700도부터 팬1 감속
        if (simulatedMainTemp <= 700 && simulatedMainTemp > s4.tempMain) {
          const tempDiff = 700 - simulatedMainTemp;
          const reductionSteps = Math.floor(tempDiff / 100);
          const newFan1 = Math.max(50, 80 - (reductionSteps * 10));
          setFan("fan1", newFan1);
        }
        break;
    }
    
    // 시뮬레이션된 온도 적용
    setTemps(Math.round(simulatedMainTemp), Math.round(simulatedStackTemp));
  }

  function resetAll() {
    clearStepTimer();
    stopTimer();
    stopGraphRecording();
    
    // 시뮬레이션 모드 비활성화
    isSimulationMode = false;
    simulatedMainTemp = 30;
    simulatedStackTemp = 30;
    
    // 폐기물통 이동 타이머 정리
    if (wasteMovingTimer) {
      clearTimeout(wasteMovingTimer);
      wasteMovingTimer = null;
    }
    
    // 점화 단계 상태 리셋
    flameDetected = false;
    flameLostDetected = false;
    retryCount = 0;
    clearTimeout(ignOffTimer);
    ignOffTimer = null;
    
    // 카메라 뷰 불길 제거
    const cameraViewReset = document.getElementById("camera-view");
    const flameContainerReset = document.getElementById("camera-flame-container");
    if (cameraViewReset && flameContainerReset) {
      cameraViewReset.classList.remove("flame-active");
      flameContainerReset.classList.remove("flame-active");
    }
    
    // 소각 단계 상태 리셋
    targetTempReached = false;
    p2p3Active = false;
    
    // 냉각 단계 상태 리셋
    coolStartTime = 0;
    tempBelowTargetTime = 0;
    extinguishDetected = false;
    clearTimeout(fan2IncreaseTimer);
    clearTimeout(fan2StopTimer);
    fan2IncreaseTimer = null;
    fan2StopTimer = null;
    
    seconds = 0;
    elapsedEl.textContent = "00:00:00";
    mode = "MAN";
    emg  = false;
    emgBtn.classList.remove("active");
    updateModeText();
    
    goToStep(0);
    log("시스템 리셋", "system");
  }

  // ---------- AUTO를 언제든 시작할 수 있도록 (현재 상태 판단) ----------

  function detectCurrentStepAndResume() {

    const tempMain  = getMainTempFromDom();
    const tempStack = getStackTempFromDom();

    // 화염 존재 판정 (향후: 카메라/센서 신호) – 지금은 tempMain 기준
    const flameDetected = tempMain >= 300;

    // 폐기물통 위치 확인 (리밋센서 기반)
    if (!isWasteReady()) {
      log("폐기물통 위치 불충분 → S1 PURGE부터 진행", "warning");
      goToStep(1);
      return;
    }

    if (!flameDetected) {
      log("화염 없음 → 점화 단계(S2)부터 진행", "info");
      goToStep(2);
      return;
    }

    if (tempMain >= 800) {
      log("고온 연소 중 → MAIN 단계(S3) 재개", "success");
      goToStep(3);
      return;
    }

    if (tempMain >= 400) {
      log("연소 후반부 → COOL 단계(S4) 재개", "info");
      goToStep(4);
      return;
    }

    log("조건 모호 → 기본적으로 점화 단계(S2)부터 진행", "info");
    goToStep(2);
  }

  // 버튼 이벤트 리스너 연결 (핸들러 함수는 위에서 이미 정의됨)
  // addEventListener를 사용하여 더 안정적으로 연결
  if (startBtn) {
    startBtn.addEventListener('click', handleStartClick);
    console.log('AUTO START 버튼 이벤트 리스너 연결됨');
  } else {
    console.error('AUTO START 버튼을 찾을 수 없습니다');
  }
  if (stopBtn) {
    stopBtn.addEventListener('click', handleStopClick);
    console.log('STOP 버튼 이벤트 리스너 연결됨');
  } else {
    console.error('STOP 버튼을 찾을 수 없습니다');
  }
  if (emgBtn) {
    emgBtn.addEventListener('click', handleEmgClick);
    console.log('EMG 버튼 이벤트 리스너 연결됨');
  } else {
    console.error('EMG 버튼을 찾을 수 없습니다');
  }
  if (settingsBtn) {
    settingsBtn.addEventListener('click', openSettingsModal);
    console.log('설정 버튼 이벤트 리스너 연결됨');
  } else {
    console.error('설정 버튼을 찾을 수 없습니다');
  }
  if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', closeSettingsModal);
  }
  if (cancelSettingsBtn) {
    cancelSettingsBtn.addEventListener('click', closeSettingsModal);
  }

  // 폐기물통 자동 위치 조정 (IN → UP 순서)
  function prepareWastePosition(callback) {
    // 이미 준비 상태면 바로 진행
    if (isWasteReady()) {
      callback();
      return;
    }

    // 1단계: 수평 위치 확인 (OUT → IN)
    if (wastePosition.horizontal !== "IN") {
      log("폐기물통 수평 이동 필요 (OUT → IN)", "info");
      moveWaste("IN", () => {
        // 2단계: 수직 위치 확인 (DOWN → UP)
        if (wastePosition.vertical !== "UP") {
          log("폐기물통 수직 이동 필요 (DOWN → UP)", "info");
          moveWaste("UP", callback);
        } else {
          callback();
        }
      });
    } else if (wastePosition.vertical !== "UP") {
      // 수평은 OK, 수직만 이동
      log("폐기물통 수직 이동 필요 (DOWN → UP)", "info");
      moveWaste("UP", callback);
    } else {
      callback();
    }
  }


  // ESC 키로 Modal 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && settingsModal.classList.contains("active")) {
      closeSettingsModal();
    }
  });

  // Modal 배경 클릭 시 닫기
  settingsModal.addEventListener("click", (e) => {
    if (e.target === settingsModal) {
      closeSettingsModal();
    }
  });

  // 언어 변경
  if (languageSelect) {
    languageSelect.value = currentLanguage;
    languageSelect.onchange = (e) => {
      const newLang = e.target.value;
      updateLanguage(newLang);
      const langNames = {ko: "한국어", en: "English", zh: "中文", ja: "日本語"};
      log(`언어가 ${langNames[newLang]}로 변경되었습니다.`, "info");
    };
  }
  
  // 초기 언어 적용 (모든 이벤트 리스너 연결 후)
  // 이벤트 리스너가 모두 연결된 후 언어 적용
  updateLanguage(currentLanguage);

  // 설정값을 UI에 로드
  function loadSettingsToUI() {
    // 언어 설정 로드
    if (languageSelect) {
      languageSelect.value = currentLanguage;
    }
    
    // 프리셋 설정값 로드 (STEP별)
    for (let i = 1; i <= 3; i++) {
      const preset = PRESETS[i];
      // S1 PURGE
      document.getElementById(`preset${i}-s1-time`).value = preset.s1.time;
      document.getElementById(`preset${i}-s1-fan1`).value = preset.s1.fan1;
      document.getElementById(`preset${i}-s1-fan2`).value = preset.s1.fan2;
      // S2 IGN
      document.getElementById(`preset${i}-s2-temp-main`).value = preset.s2.tempMain;
      document.getElementById(`preset${i}-s2-fan1-init`).value = preset.s2.fan1Init;
      document.getElementById(`preset${i}-s2-fan2-init`).value = preset.s2.fan2Init;
      document.getElementById(`preset${i}-s2-fan1-increment`).value = preset.s2.fan1Increment;
      document.getElementById(`preset${i}-s2-fan2-increment`).value = preset.s2.fan2Increment;
      document.getElementById(`preset${i}-s2-ign-off-delay`).value = preset.s2.ignOffDelay;
      document.getElementById(`preset${i}-s2-retry-count`).value = preset.s2.retryCount;
      // S3 MAIN
      document.getElementById(`preset${i}-s3-temp-main`).value = preset.s3.tempMain;
      document.getElementById(`preset${i}-s3-p2p3-temp`).value = preset.s3.p2p3Temp;
      document.getElementById(`preset${i}-s3-fan1`).value = preset.s3.fan1;
      document.getElementById(`preset${i}-s3-fan2`).value = preset.s3.fan2;
      document.getElementById(`preset${i}-s3-quench-temp`).value = preset.s3.quenchTemp;
      // S4 COOL
      document.getElementById(`preset${i}-s4-temp-main`).value = preset.s4.tempMain;
      document.getElementById(`preset${i}-s4-extinguish-time`).value = preset.s4.extinguishTime;
      document.getElementById(`preset${i}-s4-fan2-increase`).value = preset.s4.fan2Increase;
      document.getElementById(`preset${i}-s4-fan2-duration`).value = preset.s4.fan2Duration;
    }
    
    // 시스템 설정 로드
    const logMaxCountEl = document.getElementById("log-max-count");
    if (logMaxCountEl) logMaxCountEl.value = 1000;
    
    // 원격 접속 설정 로드
    const webServerPortEl = document.getElementById("web-server-port");
    if (webServerPortEl) webServerPortEl.value = 8080;
    const remoteAccessEl = document.getElementById("remote-access-enabled");
    if (remoteAccessEl) remoteAccessEl.checked = true;
    const authEnabledEl = document.getElementById("auth-enabled");
    if (authEnabledEl) authEnabledEl.checked = true;
    const adminUsernameEl = document.getElementById("admin-username");
    if (adminUsernameEl) adminUsernameEl.value = "admin";
    const sessionTimeoutEl = document.getElementById("session-timeout");
    if (sessionTimeoutEl) sessionTimeoutEl.value = 30;
    const ipWhitelistEl = document.getElementById("ip-whitelist-enabled");
    if (ipWhitelistEl) ipWhitelistEl.checked = false;
    const logDownloadEl = document.getElementById("log-download-enabled");
    if (logDownloadEl) logDownloadEl.checked = true;
    const cameraStreamingEl = document.getElementById("camera-streaming-enabled");
    if (cameraStreamingEl) cameraStreamingEl.checked = true;
    const cameraPortEl = document.getElementById("camera-streaming-port");
    if (cameraPortEl) cameraPortEl.value = 8081;
    const dataSendIntervalEl = document.getElementById("data-send-interval");
    if (dataSendIntervalEl) dataSendIntervalEl.value = 1;
  }

  // UI에서 설정값을 읽어서 저장
  function saveSettingsFromUI() {
    // 프리셋 설정값 저장 (STEP별)
    for (let i = 1; i <= 3; i++) {
      const preset = PRESETS[i];
      // S1 PURGE
      preset.s1.time = parseInt(document.getElementById(`preset${i}-s1-time`).value);
      preset.s1.fan1 = parseInt(document.getElementById(`preset${i}-s1-fan1`).value);
      preset.s1.fan2 = parseInt(document.getElementById(`preset${i}-s1-fan2`).value);
      // S2 IGN
      preset.s2.tempMain = parseInt(document.getElementById(`preset${i}-s2-temp-main`).value);
      preset.s2.fan1Init = parseInt(document.getElementById(`preset${i}-s2-fan1-init`).value);
      preset.s2.fan2Init = parseInt(document.getElementById(`preset${i}-s2-fan2-init`).value);
      preset.s2.fan1Increment = parseInt(document.getElementById(`preset${i}-s2-fan1-increment`).value);
      preset.s2.fan2Increment = parseInt(document.getElementById(`preset${i}-s2-fan2-increment`).value);
      preset.s2.ignOffDelay = parseInt(document.getElementById(`preset${i}-s2-ign-off-delay`).value);
      preset.s2.retryCount = parseInt(document.getElementById(`preset${i}-s2-retry-count`).value);
      // S3 MAIN
      preset.s3.tempMain = parseInt(document.getElementById(`preset${i}-s3-temp-main`).value);
      preset.s3.p2p3Temp = parseInt(document.getElementById(`preset${i}-s3-p2p3-temp`).value);
      preset.s3.fan1 = parseInt(document.getElementById(`preset${i}-s3-fan1`).value);
      preset.s3.fan2 = parseInt(document.getElementById(`preset${i}-s3-fan2`).value);
      preset.s3.quenchTemp = parseInt(document.getElementById(`preset${i}-s3-quench-temp`).value);
      // S4 COOL
      preset.s4.tempMain = parseInt(document.getElementById(`preset${i}-s4-temp-main`).value);
      preset.s4.extinguishTime = parseInt(document.getElementById(`preset${i}-s4-extinguish-time`).value);
      preset.s4.fan2Increase = parseInt(document.getElementById(`preset${i}-s4-fan2-increase`).value);
      preset.s4.fan2Duration = parseInt(document.getElementById(`preset${i}-s4-fan2-duration`).value);
    }
    
    // 현재 선택된 프리셋 적용
    applyPreset(currentPreset);
    
    log("설정이 저장되었습니다.", "success");
    // 나중에 서버에 저장하는 로직 추가
  }

  // 설정 저장
  saveSettingsBtn.onclick = () => {
    saveSettingsFromUI();
    closeSettingsModal();
  };

  // 프리셋 탭 전환
  document.querySelectorAll(".preset-tab").forEach(tab => {
    tab.onclick = () => {
      const presetNum = tab.dataset.presetTab;
      
      // 탭 활성화
      document.querySelectorAll(".preset-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      // 콘텐츠 표시
      document.querySelectorAll(".preset-content").forEach(c => c.classList.remove("active"));
      document.querySelector(`.preset-content[data-preset-content="${presetNum}"]`).classList.add("active");
    };
  });

  // ========== 프리셋 선택 기능 ==========
  function applyPreset(presetNum) {
    if (!PRESETS[presetNum]) return;
    
    const preset = PRESETS[presetNum];
    currentPreset = presetNum;
    
    // UI 업데이트
    const presetNames = {
      ko: {1: "프리셋 1", 2: "프리셋 2", 3: "프리셋 3"},
      en: {1: "Preset 1", 2: "Preset 2", 3: "Preset 3"},
      zh: {1: "预设 1", 2: "预设 2", 3: "预设 3"},
      ja: {1: "プリセット 1", 2: "プリセット 2", 3: "プリセット 3"}
    };
    presetSelectValue.textContent = presetNames[currentLanguage]?.[presetNum] || preset.name;
    presetDropdown.querySelectorAll(".preset-option").forEach(opt => {
      opt.classList.remove("selected");
      if (opt.dataset.preset == presetNum) {
        opt.classList.add("selected");
      }
    });
    
    // 설정값 적용 (나중에 실제 로직에 연동)
    log(`프리셋 ${presetNum} 선택됨: ${preset.name}`, "info");
    log(`- S1 PURGE: ${preset.s1.time}초, FAN1 ${preset.s1.fan1}%, FAN2 ${preset.s1.fan2}%`, "info");
    log(`- S2 IGN: 목표 온도 ${preset.s2.tempMain}℃, 초기 팬 FAN1 ${preset.s2.fan1Init}%, FAN2 ${preset.s2.fan2Init}%`, "info");
    log(`- S2 IGN: 100도마다 팬 증가 FAN1 ${preset.s2.fan1Increment}%, FAN2 ${preset.s2.fan2Increment}%`, "info");
    log(`- S3 MAIN: 목표 온도 ${preset.s3.tempMain}℃, P2/P3 작동 임계 ${preset.s3.p2p3Temp}℃`, "info");
    log(`- S3 MAIN: 팬 속도 FAN1 ${preset.s3.fan1}%, FAN2 ${preset.s3.fan2}%`, "info");
    log(`- S4 COOL: 목표 온도 ${preset.s4.tempMain}℃, 소화 판단 시간 ${preset.s4.extinguishTime}초`, "info");
  }

  // 프리셋 선택 버튼 클릭
  presetSelectBtn.onclick = (e) => {
    e.stopPropagation();
    presetSelectBtn.classList.toggle("active");
    presetDropdown.classList.toggle("active");
  };

  // 프리셋 옵션 선택
  presetDropdown.querySelectorAll(".preset-option").forEach(option => {
    option.onclick = (e) => {
      e.stopPropagation();
      const presetNum = parseInt(option.dataset.preset);
      applyPreset(presetNum);
      presetSelectBtn.classList.remove("active");
      presetDropdown.classList.remove("active");
    };
  });

  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener("click", (e) => {
    if (!presetSelectBtn.contains(e.target) && !presetDropdown.contains(e.target)) {
      presetSelectBtn.classList.remove("active");
      presetDropdown.classList.remove("active");
    }
  });

  // 초기 프리셋 적용
  applyPreset(1);

  // 장치 수동 버튼 (AUTO 중에도 허용)
  document.querySelectorAll(".device-btn").forEach(btn => {
    btn.onclick = () => {
      const dev  = btn.dataset.device;
      const isOn = btn.classList.contains("on");
      setDevice(dev, !isOn);
      log(`${dev} → ${!isOn ? "ON" : "OFF"} (수동)`, "info");

      // IGN 버튼을 수동으로 켰을 때 불꽃 표시
      if (dev === "IGN" && !isOn) {
        const cameraView = document.getElementById("camera-view");
        const flameContainer = document.getElementById("camera-flame-container");
        if (cameraView && flameContainer) {
          cameraView.classList.add("flame-active");
          flameContainer.classList.add("flame-active");
        }
      } else if (dev === "IGN" && isOn) {
        // IGN 버튼을 수동으로 껐을 때 불꽃 제거 (단, AUTO 모드의 S2/S3/S4 단계가 아닐 때만)
        if (mode !== "AUTO" || (currentStepIndex !== 2 && currentStepIndex !== 3 && currentStepIndex !== 4)) {
          const cameraView = document.getElementById("camera-view");
          const flameContainer = document.getElementById("camera-flame-container");
          if (cameraView && flameContainer) {
            cameraView.classList.remove("flame-active");
            flameContainer.classList.remove("flame-active");
          }
        }
      }

      // AUTO 상태에서도 수동 조작은 허용하되,
      // 다음 STEP 조건이 되면 goToStep()이 계속 진행.
    };
  });

  // 폐기물통 이동 – 연소 중 OUT/DOWN 금지, EMG에서는 예외 허용
  document.querySelectorAll(".btn-waste").forEach(btn => {
    btn.onclick = () => {
      const move = btn.dataset.move;

      // 연소 중(S2~S3) + EMG 아님 → OUT/DOWN 금지
      if ((move === "OUT" || move === "DOWN") && !emg && currentStepIndex >= 2 && currentStepIndex <= 3) {
        log(`연소 중 폐기물통 ${move} 금지 (EMG에서만 허용)`, "danger");
        return;
      }

      moveWaste(move);
    };
  });

  // ========== 팬 슬라이더 드래그 기능 ==========
  function initFanSliders() {
    ["fan1", "fan2"].forEach(fanId => {
      const slider = document.getElementById(`${fanId}-slider`);
      const knob = document.getElementById(`${fanId}-knob`);
      
      if (!slider || !knob) return;
      
      let isDragging = false;
      
      const startDrag = (e) => {
        isDragging = true;
        knob.classList.add("dragging");
        e.preventDefault();
      };
      
      const stopDrag = () => {
        if (isDragging) {
          isDragging = false;
          knob.classList.remove("dragging");
        }
      };
      
      const doDrag = (e) => {
        if (!isDragging) return;
        
        const rect = slider.getBoundingClientRect();
        const sliderHeight = rect.height - 18; // 패딩 및 노브 높이 보정
        
        // 마우스/터치 Y 좌표
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const offsetY = rect.bottom - clientY - 9; // 슬라이더 하단 기준
        
        // 0~100% 범위로 변환
        let percent = Math.round((offsetY / sliderHeight) * 100);
        percent = Math.max(0, Math.min(100, percent));
        
        setFan(fanId, percent, false);
      };
      
      // 마우스 이벤트
      knob.addEventListener("mousedown", startDrag);
      document.addEventListener("mousemove", doDrag);
      document.addEventListener("mouseup", stopDrag);
      
      // 터치 이벤트
      knob.addEventListener("touchstart", startDrag);
      document.addEventListener("touchmove", doDrag);
      document.addEventListener("touchend", stopDrag);
      
      // 슬라이더 클릭으로 직접 이동
      slider.addEventListener("click", (e) => {
        if (e.target === knob) return;
        
        const rect = slider.getBoundingClientRect();
        const sliderHeight = rect.height - 18;
        const offsetY = rect.bottom - e.clientY - 9;
        
        let percent = Math.round((offsetY / sliderHeight) * 100);
        percent = Math.max(0, Math.min(100, percent));
        
        setFan(fanId, percent, true);
      });
    });
  }
  
  initFanSliders();

  // 카메라 (로그 생략 - 카메라는 로그 기록 제외)
  document.querySelectorAll(".camera-tab").forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll(".camera-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("camera-view").textContent = "CAMERA " + tab.dataset.cam;
      // 카메라는 로그 기록 제외
    };
  });

  // ===========================
  // Chart.js 온도 그래프 초기화
  // ===========================
  
  // X축 라벨 생성 함수 (경과시간 기반)
  function generateTimeLabels(currentSeconds, pointCount) {
    const labels = [];
    const minuteWindow = 20; // 20분 창
    
    for (let i = pointCount - 1; i >= 0; i--) {
      const offsetSeconds = i * 60; // 1분 간격
      const labelSeconds = currentSeconds - offsetSeconds;
      
      if (labelSeconds < 0) {
        labels.push('');
      } else {
        const mins = Math.floor(labelSeconds / 60);
        const secs = labelSeconds % 60;
        if (i === 0) {
          labels.push('NOW');
        } else {
          labels.push(`${mins}:${String(secs).padStart(2, '0')}`);
        }
      }
    }
    return labels.reverse();
  }
  
  // 간략한 X축 라벨 (5분 간격만 표시)
  function formatElapsedTime(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) {
      return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  function initTempChart() {
    const canvas = document.getElementById('tempChart');
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    const pointCount = 5; // 5개 포인트 (0, 5, 10, 15, 20분 - 5분 간격)
    
    // 초기 라벨과 데이터
    const initialLabels = ['-20m', '-15m', '-10m', '-5m', 'NOW'];
    const initialData = Array(pointCount).fill(null);
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: initialLabels,
        datasets: [
          {
            label: '연소실',
            data: [...initialData],
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            borderWidth: 2.5,
            tension: 0.3,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'STACK',
            data: [...initialData],
            borderColor: '#ffaa00',
            backgroundColor: 'rgba(255, 170, 0, 0.1)',
            borderWidth: 2.5,
            tension: 0.3,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        animation: false,
        maintainAspectRatio: false,
        responsive: true,
        layout: {
          padding: { top: 10, right: 15, bottom: 5, left: 5 }
        },
        scales: {
          y: {
            min: 0,
            max: 1200,
            ticks: {
              stepSize: 100,
              color: '#8fa8d0',
              font: { size: 11 },
              callback: function(value) {
                return value + '℃';
              }
            },
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: true,
              color: function(context) {
                // 1100도 경보선은 빨간색
                if (context.tick && context.tick.value === 1100) {
                  return 'rgba(255, 80, 80, 0.8)';
                }
                return 'rgba(255, 255, 255, 0.12)';
              },
              lineWidth: function(context) {
                if (context.tick && context.tick.value === 1100) return 2;
                return 1;
              }
            },
            border: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          },
          x: {
            ticks: {
              color: '#8fa8d0',
              font: { size: 11 },
              maxRotation: 0,
              callback: function(value, index, ticks) {
                // 모든 라벨 표시 (5분 간격)
                const label = this.getLabelForValue(value);
                return label && label !== '' ? label : '';
              }
            },
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: true,
              color: 'rgba(255, 255, 255, 0.25)',
              lineWidth: 1.5
            },
            border: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              color: '#b0c4e8',
              usePointStyle: true,
              pointStyle: 'line',
              font: { size: 12 },
              padding: 15
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(10, 25, 47, 0.9)',
            titleColor: '#fff',
            bodyColor: '#b0c4e8',
            borderColor: 'rgba(255,255,255,0.2)',
            borderWidth: 1,
            callbacks: {
              title: function(context) {
                return `경과시간: ${context[0].label}`;
              },
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y}℃`;
              }
            }
          }
        }
      }
    });
  }

  // 그래프 데이터 업데이트 함수 (경과시간 연동, 5분 간격)
  function updateGraph(chart, burnerTemp, stackTemp, elapsedSeconds) {
    if (!chart) return;
    
    const pointCount = 5; // 5개 포인트 (5분 간격: 0, 5, 10, 15, 20분)
    
    // X축 라벨 업데이트 (경과시간 기반, 5분 간격)
    const newLabels = [];
    for (let i = pointCount - 1; i >= 0; i--) {
      const labelMinutes = i * 5; // 5분 간격
      const labelSeconds = elapsedSeconds - (labelMinutes * 60);
      
      if (labelSeconds < 0) {
        // 아직 시작하지 않은 시간대
        const minutesAgo = labelMinutes;
        newLabels.unshift(`-${minutesAgo}m`);
      } else if (i === 0) {
        // 마지막 포인트는 현재 경과시간
        newLabels.unshift(formatElapsedTime(elapsedSeconds));
      } else {
        // 5분 간격 라벨
        newLabels.unshift(formatElapsedTime(labelSeconds));
      }
    }
    chart.data.labels = newLabels;
    
    // 5분 간격으로 데이터 포인트 관리
    const currentMinute = Math.floor(elapsedSeconds / 60);
    const current5Minute = Math.floor(currentMinute / 5); // 5분 단위
    
    if (!chart.last5Minute) {
      chart.last5Minute = -1;
    }
    
    if (current5Minute !== chart.last5Minute) {
      // 새로운 5분 구간이 시작되면 데이터 추가
      chart.data.datasets[0].data.shift();
      chart.data.datasets[1].data.shift();
      
      chart.data.datasets[0].data.push(burnerTemp);
      chart.data.datasets[1].data.push(stackTemp);
      
      chart.last5Minute = current5Minute;
    } else {
      // 같은 5분 구간 내에서는 마지막 포인트만 업데이트
      const lastIndex = chart.data.datasets[0].data.length - 1;
      if (lastIndex >= 0) {
        chart.data.datasets[0].data[lastIndex] = burnerTemp;
        chart.data.datasets[1].data[lastIndex] = stackTemp;
      }
    }
    
    chart.update('none');
  }

  // 그래프 초기화
  let tempChart = null;
  
  // Chart.js가 로드되었는지 확인하고 그래프 초기화
  if (typeof Chart !== 'undefined') {
    tempChart = initTempChart();
    if (!tempChart) {
      console.error('그래프 초기화 실패 - canvas 요소를 찾을 수 없습니다');
    } else {
      console.log('그래프 초기화 성공');
    }
  } else {
    console.error('Chart.js가 로드되지 않았습니다. Chart.js 스크립트가 index.html에 포함되어 있는지 확인하세요.');
  }
  
  // 그래프는 항상 표시 (온도가 표시되는 한 상시 표시)
  
  // 점화 단계 처리 함수
  function processIgnitionStep() {
    if (currentStepIndex !== 2 || mode !== "AUTO") return; // S2_IGN 단계가 아니면 리턴
    
    const burnerTemp = getMainTempFromDom();
    const preset = PRESETS[currentPreset];
    const s2 = preset.s2;
    
    // 화염 감지 (온도 기반, 향후 카메라/센서로 대체)
    const currentFlameDetected = burnerTemp >= 300; // 화염 감지 기준 온도
    
    // 화염 감지 시
    if (currentFlameDetected && !flameDetected) {
      flameDetected = true;
      log("🔥 화염 감지됨", "success");
      
      // 카메라 뷰에 불길 표시
      const cameraView = document.getElementById("camera-view");
      const flameContainer = document.getElementById("camera-flame-container");
      if (cameraView && flameContainer) {
        cameraView.classList.add("flame-active");
        flameContainer.classList.add("flame-active");
      }
      
      // 화염 감지 후 설정된 시간 후 IGN OFF
      ignOffTimer = setTimeout(() => {
        setDevice("IGN", false);
        log("IGN OFF (화염 안정화 완료)", "info");
      }, s2.ignOffDelay * 1000);
    }
    
    // 화염 상태 업데이트 (카메라 뷰)
    const cameraView = document.getElementById("camera-view");
    const flameContainer = document.getElementById("camera-flame-container");
    if (cameraView && flameContainer) {
      if (currentFlameDetected) {
        cameraView.classList.add("flame-active");
        flameContainer.classList.add("flame-active");
      } else {
        // 화염이 꺼졌을 때는 AUTO 모드의 S2/S3/S4 단계가 아닐 때만 제거
        if (mode !== "AUTO" || (currentStepIndex !== 2 && currentStepIndex !== 3 && currentStepIndex !== 4)) {
          cameraView.classList.remove("flame-active");
          flameContainer.classList.remove("flame-active");
        }
      }
    }
    
    // 화염 소실 감지 (IGN이 꺼진 후, 목표 온도 도달 전)
    if (flameDetected && !currentFlameDetected && burnerTemp < s2.tempMain) {
      if (!flameLostDetected) {
        flameLostDetected = true;
        log("⚠️ 화염 소실 감지 - 자동 재점화 시도", "warning");
        attemptReignition();
      }
    } else if (currentFlameDetected) {
      flameLostDetected = false; // 화염이 다시 감지되면 리셋
    }
    
    // 온도 기반 팬 속도 조절 (100도마다 증가)
    if (burnerTemp > ignitionStartTemp) {
      const tempIncrease = burnerTemp - ignitionStartTemp;
      const incrementSteps = Math.floor(tempIncrease / 100); // 100도 단위
      
      const newFan1 = Math.min(100, s2.fan1Init + (incrementSteps * s2.fan1Increment));
      const newFan2 = Math.min(100, s2.fan2Init + (incrementSteps * s2.fan2Increment));
      
      if (fanValues.fan1 !== newFan1 || fanValues.fan2 !== newFan2) {
        setFan("fan1", newFan1);
        setFan("fan2", newFan2);
      }
    }
    
    // 목표 온도 도달 시 P1, P2, P3 OFF 및 다음 단계로
    if (burnerTemp >= s2.tempMain) {
      setDevice("P1", false);
      setDevice("P2", false);
      setDevice("P3", false);
      log(`목표 온도 도달 (${s2.tempMain}℃) - P1, P2, P3 OFF, 소각 단계로 전환`, "success");
      goToStep(3); // S3 MAIN 단계로
    }
  }
  
  // 자동 재점화 함수
  function attemptReignition() {
    const preset = PRESETS[currentPreset];
    const s2 = preset.s2;
    
    if (retryCount >= s2.retryCount) {
      log(`❌ 재점화 실패 (${s2.retryCount}회 시도 완료) - 작동 중지`, "emergency");
      log("⚠️ 폐기물 점검 확인 필요", "emergency");
      resetAll();
      return;
    }
    
    retryCount++;
    log(`재점화 시도 ${retryCount}/${s2.retryCount}`, "warning");
    
    // P1, P2, P3가 이미 가동 중이면 IGN만 가동
    const p1On = document.querySelector('[data-device="P1"]').classList.contains("on");
    const p2On = document.querySelector('[data-device="P2"]').classList.contains("on");
    const p3On = document.querySelector('[data-device="P3"]').classList.contains("on");
    
    if (p1On || p2On || p3On) {
      setDevice("IGN", true);
      log("IGN 재가동 (P1/P2/P3 이미 가동 중)", "info");
    } else {
      // 모두 꺼져있으면 모두 가동
      setDevice("IGN", true);
      setDevice("P1", true);
      setDevice("P2", true);
      setDevice("P3", true);
      log("IGN, P1, P2, P3 재가동", "info");
    }
    
    // 화염 감지 상태 리셋
    flameDetected = false;
    clearTimeout(ignOffTimer);
  }

  // 소각 단계 처리 함수
  function processMainStep() {
    if (currentStepIndex !== 3 || mode !== "AUTO") return; // S3_MAIN 단계가 아니면 리턴
    
    const burnerTemp = getMainTempFromDom();
    const stackTemp = getStackTempFromDom();
    const preset = PRESETS[currentPreset];
    const s3 = preset.s3;
    
    // 목표 온도 도달 확인
    if (!targetTempReached && burnerTemp >= s3.tempMain) {
      targetTempReached = true;
      log(`목표 온도 도달 (${s3.tempMain}℃) - 목표 온도 달성`, "success");
      // 목표 온도 도달 후에는 P2, P3 작동하지 않음
      setDevice("P2", false);
      setDevice("P3", false);
      p2p3Active = false;
    }
    
    // 목표 온도 도달 전: 온도가 임계값보다 낮으면 P2, P3 가동
    if (!targetTempReached && burnerTemp < s3.p2p3Temp) {
      if (!p2p3Active) {
        setDevice("P2", true);
        setDevice("P3", true);
        p2p3Active = true;
        log(`온도 저하 감지 (${burnerTemp}℃ < ${s3.p2p3Temp}℃) - P2, P3 가동`, "warning");
      }
    } else if (!targetTempReached && burnerTemp >= s3.p2p3Temp) {
      if (p2p3Active) {
        setDevice("P2", false);
        setDevice("P3", false);
        p2p3Active = false;
        log(`온도 회복 (${burnerTemp}℃ ≥ ${s3.p2p3Temp}℃) - P2, P3 정지`, "info");
      }
    }
    
    // 목표 온도 도달 후 냉각 단계로 전환
    if (targetTempReached) {
      goToStep(4); // S4 COOL 단계로
    }
    
    // 퀀처 펌프 제어 (STACK 온도 기준)
    const shouldQuenchOn = stackTemp >= s3.quenchTemp;
    if (shouldQuenchOn !== quenchOn) {
      quenchOn = shouldQuenchOn;
      setDevice("PUMP", shouldQuenchOn);
      if (shouldQuenchOn) {
        log(`퀀처 ON (STACK ${stackTemp}℃ ≥ ${s3.quenchTemp}℃)`, "warning");
      } else {
        log(`퀀처 OFF (STACK ${stackTemp}℃ < ${s3.quenchTemp}℃)`, "info");
      }
    }
  }
  
  // 냉각 단계 처리 함수
  function processCoolStep() {
    if (currentStepIndex !== 4 || mode !== "AUTO") return; // S4_COOL 단계가 아니면 리턴
    
    const burnerTemp = getMainTempFromDom();
    const preset = PRESETS[currentPreset];
    const s4 = preset.s4;
    
    // 목표 온도 이하로 내려간 시간 추적
    if (burnerTemp <= s4.tempMain) {
      if (tempBelowTargetTime === 0) {
        tempBelowTargetTime = seconds;
        log(`목표 온도 이하 도달 (${burnerTemp}℃ ≤ ${s4.tempMain}℃) - 소화 판단 시작`, "info");
      }
      
      // 소화 판단 시간 경과 확인
      const timeBelowTarget = seconds - tempBelowTargetTime;
      if (!extinguishDetected && timeBelowTarget >= s4.extinguishTime) {
        extinguishDetected = true;
        log(`소화 판단 완료 (${s4.extinguishTime}초 유지) - 팬2 속도 증가`, "success");
        
        // 소화 판단 완료 시 불길 제거
        const cameraView = document.getElementById("camera-view");
        const flameContainer = document.getElementById("camera-flame-container");
        if (cameraView && flameContainer) {
          cameraView.classList.remove("flame-active");
          flameContainer.classList.remove("flame-active");
        }
        
        // 팬2 속도 증가
        const currentFan2 = fanValues.fan2;
        const newFan2 = Math.min(100, currentFan2 + s4.fan2Increase);
        setFan("fan2", newFan2);
        log(`팬2 속도 증가: ${currentFan2}% → ${newFan2}%`, "info");
        
        // 팬2 작동 시간 후 정지
        fan2StopTimer = setTimeout(() => {
          setFan("fan2", 0);
          setFan("fan1", 0);
          log("팬1, 팬2 정지 - 폐기물통 배출 준비", "info");
          
          // 폐기물통 DOWN → OUT 자동 실행
          if (wastePosition.vertical === "UP") {
            moveWaste("DOWN", () => {
              moveWaste("OUT", () => {
                log("폐기물통 배출 완료", "success");
                goToStep(5); // S5 END 단계로
              });
            });
          } else {
            moveWaste("OUT", () => {
              log("폐기물통 배출 완료", "success");
              goToStep(5); // S5 END 단계로
            });
          }
        }, s4.fan2Duration * 1000);
      }
    } else {
      // 온도가 다시 올라가면 리셋
      if (tempBelowTargetTime > 0) {
        tempBelowTargetTime = 0;
        log(`온도 상승 (${burnerTemp}℃ > ${s4.tempMain}℃) - 소화 판단 리셋`, "warning");
      }
    }
  }

  // 1초마다 온도 데이터 기록 및 로그 기록 (기계 가동 중)
  setInterval(() => {
    // 시뮬레이션 모드: 온도 시뮬레이션 실행
    if (isSimulationMode) {
      simulateTemperature();
    }
    
    const burnerTemp = getMainTempFromDom();
    const stackTemp = getStackTempFromDom();
    
    // 그래프 기록 중이면 경과시간 기반으로, 아니면 현재 시간 기반으로
    const elapsedFromStart = isGraphRecording ? (seconds - graphStartSeconds) : seconds;
    
    // 온도 그래프 1초마다 업데이트
    if (tempChart) {
      updateGraph(tempChart, burnerTemp, stackTemp, elapsedFromStart);
    }
    
    // 단계별 처리
    processIgnitionStep();
    processMainStep();
    processCoolStep();
    
    // 기계 가동 중이면 1초마다 로그 기록
    if (mode === "AUTO" && currentStepIndex > 0) {
      const stepLabel = STEP_FLOW[currentStepIndex]?.label || "UNKNOWN";
      log(`[${stepLabel}] 연소실: ${burnerTemp}℃, STACK: ${stackTemp}℃, FAN1: ${fanValues.fan1}%, FAN2: ${fanValues.fan2}%`, "info");
    }
    
    // 온도 경고 체크
    if (burnerTemp >= 1100) {
      log(`⚠️ 연소실 온도 경고: ${burnerTemp}℃`, "danger");
    }
  }, 1000);

  // 초기 상태
  updateModeText();
  updateWasteStatusUI();  // 폐기물통 상태 초기화
  goToStep(0);
  log("시스템 로드 완료", "system");
  log("폐기물통 위치: " + wastePosition.horizontal + " / " + wastePosition.vertical, "info");
  log("AUTO START 버튼을 눌러 운전을 시작하세요", "info");

});
