package com.oneword.forest;
import android.app.Activity;
import android.os.Bundle;
import android.view.WindowManager;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;
import android.webkit.JavascriptInterface;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity implements android.hardware.SensorEventListener {
    private WebView wv;
    private BetaUpdater updater;
    private final android.os.Handler ui = new android.os.Handler(android.os.Looper.getMainLooper());
    private Runnable backTimeout;
    private boolean closing=false;
    private android.hardware.SensorManager sensors;
    private android.hardware.Sensor wallpaperSensor;
    private boolean wallpaperRequested=false,foreground=false,wallpaperListening=false,haveGravity=false,haveCenter=false;
    private final float[] gravity=new float[3];
    private float wallpaperCenter;
    private int wallpaperRotation=-1;
    private long lastWallpaperSend=0,wallpaperTouchQuietUntil=0;
    private boolean wallpaperTouching=false;
    @Override public boolean dispatchTouchEvent(android.view.MotionEvent event){
        int action=event.getActionMasked();
        if(action==android.view.MotionEvent.ACTION_DOWN||action==android.view.MotionEvent.ACTION_POINTER_DOWN){wallpaperTouching=true;haveCenter=false;}
        if(action==android.view.MotionEvent.ACTION_UP||action==android.view.MotionEvent.ACTION_CANCEL){wallpaperTouching=false;wallpaperTouchQuietUntil=android.os.SystemClock.uptimeMillis()+300;haveCenter=false;haveGravity=false;}
        return super.dispatchTouchEvent(event);
    }
    private void syncWallpaperSensor(){
        boolean wanted=foreground&&wallpaperRequested&&!closing&&sensors!=null&&wallpaperSensor!=null;
        if(wanted&&!wallpaperListening){haveGravity=false;haveCenter=false;lastWallpaperSend=0;wallpaperListening=sensors.registerListener(this,wallpaperSensor,50000);}
        else if(!wanted&&wallpaperListening){sensors.unregisterListener(this);wallpaperListening=false;haveCenter=false;}
    }
    @Override public void onAccuracyChanged(android.hardware.Sensor sensor,int accuracy){}
    @Override public void onSensorChanged(android.hardware.SensorEvent event){
        if(!wallpaperListening||wv==null||closing||event.values.length<3)return;
        if(wallpaperTouching||android.os.SystemClock.uptimeMillis()<wallpaperTouchQuietUntil){haveCenter=false;return;}
        for(int i=0;i<3;i++){float v=event.values[i];if(!Float.isFinite(v))return;gravity[i]=haveGravity?gravity[i]*.82f+v*.18f:v;}
        haveGravity=true;
        int rotation=getWindowManager().getDefaultDisplay().getRotation();
        float horizontal=rotation==android.view.Surface.ROTATION_90?-gravity[1]:rotation==android.view.Surface.ROTATION_270?gravity[1]:rotation==android.view.Surface.ROTATION_180?-gravity[0]:gravity[0];
        if(!haveCenter||rotation!=wallpaperRotation){wallpaperCenter=horizontal;wallpaperRotation=rotation;haveCenter=true;}
        long time=android.os.SystemClock.uptimeMillis();if(time-lastWallpaperSend<50)return;lastWallpaperSend=time;
        float delta=horizontal-wallpaperCenter;float clean=Math.abs(delta)<.08f?0f:Math.copySign(Math.abs(delta)-.08f,delta);
        float offset=Math.max(-4f,Math.min(4f,clean*1.6f));
        wv.evaluateJavascript("window.oneworldNativeWallpaper&&window.oneworldNativeWallpaper("+Float.toString(offset)+")",null);
    }
    private static final String ORIGIN = "https://appassets.androidplatform.net";
    private static final Map<String, String> MIME = new HashMap<>();
    static {
        MIME.put("ogg","audio/ogg"); MIME.put("svg","image/svg+xml"); MIME.put("html", "text/html"); MIME.put("js", "text/javascript");
        MIME.put("glb", "model/gltf-binary"); MIME.put("jpg", "image/jpeg");
        MIME.put("jpeg", "image/jpeg"); MIME.put("png", "image/png");
        MIME.put("txt", "text/plain"); MIME.put("css", "text/css"); MIME.put("json", "application/json"); MIME.put("bin", "application/octet-stream"); MIME.put("gltf", "model/gltf+json");
    }
    private void immersive(){
        if(android.os.Build.VERSION.SDK_INT>=30){android.view.WindowInsetsController c=getWindow().getInsetsController();if(c!=null){c.setSystemBarsBehavior(android.view.WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);c.hide(android.view.WindowInsets.Type.systemBars());}}
        else getWindow().getDecorView().setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY|android.view.View.SYSTEM_UI_FLAG_FULLSCREEN|android.view.View.SYSTEM_UI_FLAG_HIDE_NAVIGATION|android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE|android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN|android.view.View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
    }
    @Override public void onWindowFocusChanged(boolean focus){super.onWindowFocusChanged(focus);if(focus)immersive();}
    private void resetUpdater(){if(updater!=null)updater.close();updater=new BetaUpdater(this);updater.display=(state,title,detail)->{if(wv!=null&&!closing)wv.evaluateJavascript("window.oneworldUpdateUI&&window.oneworldUpdateUI("+org.json.JSONObject.quote(state)+","+org.json.JSONObject.quote(title)+","+org.json.JSONObject.quote(detail)+")",null);};}
    @Override public void onCreate(Bundle b) {
        super.onCreate(b);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        resetUpdater();
        wv = new WebView(this);
        wv.setOverScrollMode(android.view.View.OVER_SCROLL_NEVER);
        sensors=(android.hardware.SensorManager)getSystemService(SENSOR_SERVICE);
        if(sensors!=null){wallpaperSensor=sensors.getDefaultSensor(android.hardware.Sensor.TYPE_GRAVITY);if(wallpaperSensor==null)wallpaperSensor=sensors.getDefaultSensor(android.hardware.Sensor.TYPE_ACCELEROMETER);}
        WebSettings s = wv.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setMediaPlaybackRequiresUserGesture(false);
        wv.addJavascriptInterface(new Object() {
            @JavascriptInterface public void restartAtTitle(){ui.post(()->{if(wv==null||closing)return;wallpaperRequested=false;syncWallpaperSensor();resetUpdater();wv.stopLoading();wv.loadUrl(ORIGIN+"/index.html");});}
            @JavascriptInterface public void openStudioWebsite(){ui.post(()->{try{startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW,android.net.Uri.parse("https://tamilcraftersstudio.in/")));}catch(android.content.ActivityNotFoundException e){android.widget.Toast.makeText(MainActivity.this,"No browser is available",android.widget.Toast.LENGTH_SHORT).show();}});}
            @JavascriptInterface public void setWallpaperMotionActive(final boolean active){ui.post(()->{wallpaperRequested=active;syncWallpaperSensor();});}
            @JavascriptInterface public void betaUpdateAction(final String value){ui.post(()->updater.action(value));}
            @JavascriptInterface public String getUpdateInfo(){return updater==null?"{}":updater.diagnostics();}
            @JavascriptInterface public String getBuildInfo(){try{android.content.pm.PackageInfo p=getPackageManager().getPackageInfo(getPackageName(),0);org.json.JSONObject j=new org.json.JSONObject();j.put("name",p.versionName);j.put("code",p.getLongVersionCode());j.put("package",p.packageName);return j.toString();}catch(Exception e){return "{}";}}
            @JavascriptInterface public void checkBetaAtEntry(final int id){ui.post(()->updater.entry(id,(n,result)->{if(wv!=null&&!closing)wv.evaluateJavascript("window.oneworldEntryUpdateResult&&window.oneworldEntryUpdateResult("+n+","+org.json.JSONObject.quote(result)+")",null);}));}
            @JavascriptInterface public void cancelBetaEntry(final int id){ui.post(()->updater.cancelEntry(id));}
            @JavascriptInterface public void quit() {
                runOnUiThread(new Runnable() { @Override public void run() { if(closing)return;closing=true;if(backTimeout!=null)ui.removeCallbacks(backTimeout);finishAndRemoveTask(); } });
            }
            @JavascriptInterface public void backHandled() { ui.post(new Runnable(){public void run(){if(backTimeout!=null)ui.removeCallbacks(backTimeout);}}); }
        }, "OneWorldNative");
        setContentView(wv);immersive();
        wv.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) { return !ORIGIN.equals(req.getUrl().getScheme()+"://"+req.getUrl().getAuthority()); }
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest req) {
                if (!ORIGIN.equals(req.getUrl().getScheme() + "://" + req.getUrl().getAuthority())) return null;
                String path = req.getUrl().getPath();
                if (path == null || path.contains("..")) return null;
                if (path.startsWith("/")) path = path.substring(1);
                if (path.isEmpty()) path = "index.html";
                String ext = path.contains(".") ? path.substring(path.lastIndexOf('.') + 1) : "";
                String mime = MIME.get(ext);
                if (mime == null) return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found", null, null);
                try {
                    if (ext.equals("ogg")) return AssetRange.response(getAssets().open(path), mime, req.getRequestHeaders().get("Range"));
                    InputStream in = getAssets().open(path);
                    return new WebResourceResponse(mime, "utf-8", in);
                } catch (IOException e) {
                    return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found", null, null);
                }
            }
        });
        wv.loadUrl(ORIGIN + "/index.html");
    }
    @Override protected void onPause() {
        foreground=false;syncWallpaperSensor();
        if (wv != null) {
            wv.evaluateJavascript("if(window.oneworldLifecyclePause)window.oneworldLifecyclePause();", value->{if(!foreground&&wv!=null)wv.pauseTimers();});
            wv.onPause();
            ui.postDelayed(()->{if(!foreground&&wv!=null)wv.pauseTimers();},1500);
        }
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        super.onPause();
    }
    @Override protected void onResume() {
        super.onResume();immersive();
        foreground=true;syncWallpaperSensor();
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        if(updater!=null)updater.resumed();
        if (wv != null) {
            wv.resumeTimers();
            wv.onResume();
            wv.evaluateJavascript("if(window.oneworldLifecycleResume)window.oneworldLifecycleResume();", null);
        }
    }
    @Override protected void onDestroy() {
        closing=true;foreground=false;syncWallpaperSensor();
        if(updater!=null)updater.close();
        if(backTimeout!=null)ui.removeCallbacks(backTimeout);
        if (wv != null) {
            if(wv.getParent() instanceof android.view.ViewGroup)((android.view.ViewGroup)wv.getParent()).removeView(wv);
            wv.stopLoading();
            wv.removeJavascriptInterface("OneWorldNative");
            wv.removeAllViews();
            wv.destroy();
            wv = null;
        }
        super.onDestroy();
    }
    @Override public void onBackPressed() {
        if(closing||wv==null)return;
        if(backTimeout!=null)ui.removeCallbacks(backTimeout);
        backTimeout=new Runnable(){public void run(){if(isFinishing()||closing)return;new android.app.AlertDialog.Builder(MainActivity.this).setTitle("Game not responding?").setMessage("Close using the last autosave? Changes since that save may be lost. Your saved world will not be deleted.").setNegativeButton("STAY",null).setPositiveButton("CLOSE APP",new android.content.DialogInterface.OnClickListener(){public void onClick(android.content.DialogInterface d,int which){closing=true;finishAndRemoveTask();}}).show();}};
        ui.postDelayed(backTimeout,1800);
        wv.evaluateJavascript("if(window.oneworldHandleBack)window.oneworldHandleBack();",null);
    }
}
