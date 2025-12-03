package com.cds.incinerator;

import android.annotation.SuppressLint;
import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 화면 방향을 가로 모드로 강제 설정 (가장 먼저 실행)
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        
        setContentView(R.layout.activity_main);
        
        // 전체 화면 모드 설정 - 상단바 숨기기 (setContentView 이후)
        hideSystemUI();

        webView = findViewById(R.id.webview);
        
        // WebView 설정
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(false);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setDisplayZoomControls(false);
        webSettings.setSupportZoom(true);
        
        // 모바일 최적화 - 스케일링 비활성화하여 CSS transform이 제대로 작동하도록
        webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NORMAL);
        webView.setInitialScale(100);
        
        // 캐시 설정
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        
        // WebViewClient 설정 (외부 브라우저로 열리지 않도록)
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }
        });
        
        // 로컬 HTML 파일 로드
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        // 화면이 다시 활성화될 때도 가로 모드 유지
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        // 전체 화면 모드 유지
        hideSystemUI();
    }
    
    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            // 포커스를 받을 때마다 전체 화면 모드 유지
            hideSystemUI();
        }
    }
    
    /**
     * 시스템 UI(상단바, 하단 네비게이션 바)를 숨기는 메서드
     * 모든 Android 버전에서 안전하게 작동하도록 수정
     */
    private void hideSystemUI() {
        try {
            View decorView = getWindow().getDecorView();
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                // Android 11 (API 30) 이상
                getWindow().setDecorFitsSystemWindows(false);
                try {
                    android.view.WindowInsetsController controller = getWindow().getInsetsController();
                    if (controller != null) {
                        controller.hide(
                            android.view.WindowInsets.Type.statusBars() | 
                            android.view.WindowInsets.Type.navigationBars()
                        );
                        controller.setSystemBarsBehavior(
                            android.view.WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
                        );
                    }
                } catch (Exception e) {
                    // API 30+ 메서드 실패 시 하위 버전 방법 사용
                    int uiOptions = View.SYSTEM_UI_FLAG_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                            | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;
                    decorView.setSystemUiVisibility(uiOptions);
                }
            } else {
                // Android 10 이하 - 안전한 방법 사용
                int uiOptions = View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;
                decorView.setSystemUiVisibility(uiOptions);
            }
            
            // 화면이 꺼지지 않도록 설정
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        } catch (Exception e) {
            // 오류 발생 시 기본 설정만 적용
            try {
                getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            } catch (Exception ex) {
                // 최소한 화면이 꺼지지 않도록
                getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            }
        }
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }
}
