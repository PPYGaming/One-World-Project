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

public class MainActivity extends Activity {
    private WebView wv;
    private BetaUpdater updater;
    private final android.os.Handler ui = new android.os.Handler(android.os.Looper.getMainLooper());
    private Runnable backTimeout;
    private boolean closing=false;
    private static final String ORIGIN = "https://appassets.androidplatform.net";
    private static final Map<String, String> MIME = new HashMap<>();
    static {
        MIME.put("ogg","audio/ogg"); MIME.put("svg","image/svg+xml"); MIME.put("html", "text/html"); MIME.put("js", "text/javascript");
        MIME.put("glb", "model/gltf-binary"); MIME.put("jpg", "image/jpeg");
        MIME.put("jpeg", "image/jpeg"); MIME.put("png", "image/png");
        MIME.put("txt", "text/plain"); MIME.put("css", "text/css"); MIME.put("json", "application/json"); MIME.put("bin", "application/octet-stream"); MIME.put("gltf", "model/gltf+json");
    }
    @Override public void onCreate(Bundle b) {
        super.onCreate(b);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        updater = new BetaUpdater(this);
        wv = new WebView(this);
        updater.display=(state,title,detail)->{if(wv!=null&&!closing)wv.evaluateJavascript("window.oneworldUpdateUI&&window.oneworldUpdateUI("+org.json.JSONObject.quote(state)+","+org.json.JSONObject.quote(title)+","+org.json.JSONObject.quote(detail)+")",null);};
        WebSettings s = wv.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setMediaPlaybackRequiresUserGesture(false);
        wv.addJavascriptInterface(new Object() {
            @JavascriptInterface public void betaUpdateAction(final String value){ui.post(()->updater.action(value));}
            @JavascriptInterface public String getBuildInfo(){try{android.content.pm.PackageInfo p=getPackageManager().getPackageInfo(getPackageName(),0);org.json.JSONObject j=new org.json.JSONObject();j.put("name",p.versionName);j.put("code",p.getLongVersionCode());j.put("package",p.packageName);return j.toString();}catch(Exception e){return "{}";}}
            @JavascriptInterface public void checkBetaAtEntry(final int id){ui.post(()->updater.entry(id,(n,result)->{if(wv!=null&&!closing)wv.evaluateJavascript("window.oneworldEntryUpdateResult&&window.oneworldEntryUpdateResult("+n+","+org.json.JSONObject.quote(result)+")",null);}));}
            @JavascriptInterface public void cancelBetaEntry(final int id){ui.post(()->updater.cancelEntry(id));}
            @JavascriptInterface public void quit() {
                runOnUiThread(new Runnable() { @Override public void run() { if(closing)return;closing=true;if(backTimeout!=null)ui.removeCallbacks(backTimeout);finishAndRemoveTask(); } });
            }
            @JavascriptInterface public void backHandled() { ui.post(new Runnable(){public void run(){if(backTimeout!=null)ui.removeCallbacks(backTimeout);}}); }
        }, "OneWorldNative");
        setContentView(wv);
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
        if (wv != null) {
            wv.evaluateJavascript("if(window.oneworldLifecyclePause)window.oneworldLifecyclePause();", null);
            wv.onPause();
            wv.pauseTimers();
        }
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        super.onPause();
    }
    @Override protected void onResume() {
        super.onResume();
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        if(updater!=null)updater.resumed();
        if (wv != null) {
            wv.resumeTimers();
            wv.onResume();
            wv.evaluateJavascript("if(window.oneworldLifecycleResume)window.oneworldLifecycleResume();", null);
        }
    }
    @Override protected void onDestroy() {
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
