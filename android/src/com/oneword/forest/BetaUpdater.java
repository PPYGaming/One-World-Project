package com.oneword.forest;

import android.app.*;
import android.content.*;
import android.content.pm.*;
import android.net.Uri;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.os.*;
import org.json.*;
import java.io.*;
import java.net.*;
import java.security.*;
import javax.net.ssl.HttpsURLConnection;

/** Public testing beta only. No GitHub credentials or world-save access. */
final class BetaUpdater {
 static final String REPO="https://api.github.com/repos/PPYGaming/One-World-Beta";
 static final String CERT="02db85e55056e12097dcf84daa5739dac0d1a3551ba8bdc4b257a58408c4c744";
 volatile String lastCheckStatus="not-started",lastCheckDetail="";volatile long lastCheckedAt=0;
 String diagnostics(){try{JSONObject j=new JSONObject();j.put("status",lastCheckStatus);j.put("detail",lastCheckDetail);j.put("checkedAt",lastCheckedAt);return j.toString();}catch(Exception e){return "{}";}}
 final Activity a; final Handler ui=new Handler(Looper.getMainLooper());
 volatile boolean cancelled=false,busy=false; File ready; long readyVersion; String stage="idle";JSONObject offeredManifest,offeredApk;interface Display{void show(String state,String title,String detail);}Display display;
 interface EntryResult {void complete(int id,String result);}
 boolean mandatory=false;
 int entryId=-1;EntryResult entryResult;boolean entryFinished=false,installerOpened=false,permissionOpened=false;
 BetaUpdater(Activity owner){a=owner;}
 void entry(int id,EntryResult callback){if(entryId>=0||busy){callback.complete(id,"unavailable");return;}entryId=id;entryResult=callback;entryFinished=false;installerOpened=false;permissionOpened=false;cancelled=false;mandatory=false;lastCheckedAt=System.currentTimeMillis();lastCheckDetail="";if(!online()){lastCheckDetail="Android did not report a validated internet connection.";finishEntry("offline");return;}show();}
 boolean online(){try{ConnectivityManager c=(ConnectivityManager)a.getSystemService(Context.CONNECTIVITY_SERVICE);NetworkCapabilities n=c.getNetworkCapabilities(c.getActiveNetwork());return n!=null&&n.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)&&n.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED);}catch(Exception e){return true;}}
 void finishEntry(String result){if(mandatory&&!result.equals("current"))return;if(entryId<0||entryFinished)return;lastCheckStatus=result;entryFinished=true;cancelled=true;int id=entryId;EntryResult cb=entryResult;entryId=-1;entryResult=null;if(cb!=null)cb.complete(id,result);}
 void emit(String state,String title,String detail){ui.post(()->{if(entryFinished||cancelled)return;stage=state;lastCheckStatus=state;if(display!=null)display.show(state,title,detail);});}
 void cancelEntry(int id){if(entryId!=id)return;if(!mandatory)finishEntry("unavailable");}
 void resumed(){if(permissionOpened&&entryId>=0&&!entryFinished){permissionOpened=false;install();return;}if(installerOpened&&entryId>=0&&!entryFinished){installerOpened=false;install();if(!entryFinished)emit("returned","Update still required","If installation was cancelled, install the verified update to continue. Your saved world stays on this device.");}}
 void failEntry(String title,String text){if(cancelled||entryFinished)return;if(!mandatory){ui.post(()->finishEntry(online()?"unavailable":"offline"));return;}emit("error",title,"The update was not installed. Check your connection or free device storage, then retry. Your saved world has not been cleared.");}
 void show(){if(ready!=null&&ready.isFile()){install();return;}if(busy){finishEntry("unavailable");return;}begin();}
 void begin(){busy=true;cancelled=false;lastCheckStatus="checking";emit("checking","Beta update","Checking for updates...");new Thread(()->{try{if(!cancelled)check();}catch(Exception e){if(!cancelled){lastCheckDetail=e.getClass().getSimpleName()+": "+String.valueOf(e.getMessage());if(lastCheckDetail.length()>240)lastCheckDetail=lastCheckDetail.substring(0,240);failEntry("Update unavailable","");}}finally{busy=false;}},"beta-update").start();}
 void text(String s){emit("checking","Beta update",s);}
 void action(String value){if(entryFinished||cancelled||entryId<0)return;
  // Once a verified newer release is offered, no later/cancel/continue bypass exists.
  if(value.equals("retry")&&(stage.equals("error")||stage.equals("returned"))&&!busy){if(ready!=null&&ready.isFile()){install();}else if(offeredManifest!=null){download(offeredManifest,offeredApk);}return;}
  if(value.equals("download")&&stage.equals("available")&&!busy){stage="downloading";download(offeredManifest,offeredApk);return;}

  if(value.equals("settings")&&stage.equals("permission")){try{permissionOpened=true;a.startActivity(new Intent(android.provider.Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,Uri.parse("package:"+a.getPackageName())));}catch(Exception e){permissionOpened=false;failEntry("Settings unavailable","");}return;}
  if(value.equals("install")&&stage.equals("ready")){try{stage="installing";Uri u=Uri.parse("content://"+a.getPackageName()+".beta-update/beta-update.apk");Intent i=new Intent(Intent.ACTION_VIEW);i.setDataAndType(u,"application/vnd.android.package-archive");i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);installerOpened=true;a.startActivity(i);}catch(Exception e){installerOpened=false;failEntry("Installer unavailable","");}}
 }
 HttpsURLConnection get(String url,boolean asset)throws Exception{
  URL u=new URL(url);if(!GithubUpdatePolicy.api(u))throw new IOException("Unexpected beta update URL.");
  HttpsURLConnection c=(HttpsURLConnection)u.openConnection();c.setInstanceFollowRedirects(false);c.setConnectTimeout(15000);c.setReadTimeout(30000);c.setRequestProperty("Accept",asset?"application/octet-stream":"application/vnd.github+json");c.setRequestProperty("X-GitHub-Api-Version","2022-11-28");return c;
 }
 byte[] api(String path)throws Exception{HttpsURLConnection c=get(REPO+path,false);try{int s=c.getResponseCode();if(s!=200)throw new IOException("Beta repository unavailable (HTTP "+s+").");return read(c.getInputStream(),4*1024*1024);}finally{c.disconnect();}}
 static byte[] read(InputStream in,int max)throws Exception{try(InputStream i=in;ByteArrayOutputStream o=new ByteArrayOutputStream()){byte[] b=new byte[16384];int n;while((n=i.read(b))!=-1){if(o.size()+n>max)throw new IOException("Update response is too large.");o.write(b,0,n);}return o.toByteArray();}}
 HttpsURLConnection asset(JSONObject asset)throws Exception{
  HttpsURLConnection c=get(asset.getString("url"),true);for(int redirects=0;redirects<4;redirects++){int s=c.getResponseCode();if(s==200)return c;if(s!=301&&s!=302&&s!=303&&s!=307&&s!=308){c.disconnect();throw new IOException("Beta download failed (HTTP "+s+").");}String location=c.getHeaderField("Location");c.disconnect();URL u=new URL(location);String h=u.getHost();if(!GithubUpdatePolicy.redirect(u))throw new IOException("Unsafe download redirect refused.");c=(HttpsURLConnection)u.openConnection();c.setInstanceFollowRedirects(false);c.setConnectTimeout(15000);c.setReadTimeout(30000);/* Never forward Authorization to a redirected host. */}c.disconnect();throw new IOException("Too many download redirects.");
 }
 static JSONObject find(JSONArray list,String name)throws Exception{for(int i=0;i<list.length();i++){JSONObject o=list.getJSONObject(i);if(name.equals(o.optString("name"))&&"uploaded".equals(o.optString("state")))return o;}return null;}
 void check()throws Exception{
  text("Checking beta releases...");JSONObject repo=new JSONObject(new String(api(""),"UTF-8"));if(repo.getBoolean("private")||repo.getLong("id")!=1460312831L)throw new IOException("Expected public beta repository not found.");
  JSONArray releases=new JSONArray(new String(api("/releases?per_page=30"),"UTF-8"));JSONObject best=null,bestApk=null;long installed=a.getPackageManager().getPackageInfo(a.getPackageName(),0).getLongVersionCode(),bestCode=installed;boolean validRelease=false;int unreadReleases=0;
  for(int i=0;i<releases.length();i++){if(cancelled)return;try{JSONObject r=releases.getJSONObject(i);if(r.optBoolean("draft"))continue;JSONArray assets=r.getJSONArray("assets");JSONObject ma=find(assets,"beta-update.json");if(ma==null)continue;HttpsURLConnection c=asset(ma);JSONObject m;try{m=new JSONObject(new String(read(c.getInputStream(),65536),"UTF-8"));}finally{c.disconnect();}
   long version=m.getLong("versionCode");if(m.optInt("schema")!=1||!a.getPackageName().equals(m.getString("package"))||!CERT.equalsIgnoreCase(m.getString("signingCertificateSha256")))continue;JSONObject apk=find(assets,m.getString("apk"));if(apk==null||apk.getLong("size")!=m.getLong("size"))continue;if(!m.getString("sha256").matches("[a-fA-F0-9]{64}"))continue;validRelease=true;if(version<=bestCode)continue;best=m;bestApk=apk;bestCode=version;
  }catch(Exception unread){unreadReleases++;lastCheckDetail="One or more release records could not be read ("+unread.getClass().getSimpleName()+").";}}
  if(!validRelease)throw new IOException("No verified beta release is published yet. Continue with this installed beta.");
  if(best==null&&unreadReleases>0)throw new IOException("Could not verify all beta release records. Retry the update check.");
  if(best==null){ui.post(()->{if(!cancelled&&!entryFinished)finishEntry("current");});return;}
  final JSONObject manifest=best,apk=bestApk;
  offeredManifest=manifest;offeredApk=apk;mandatory=true;busy=false;emit("available","Beta "+manifest.optString("versionName"),String.format(java.util.Locale.ROOT,"%.1f MiB update. Keep your saved world.",apk.optLong("size")/1048576.0));
 }
 void download(JSONObject m,JSONObject asset){if(busy)return;busy=true;cancelled=false;emit("downloading","Downloading update","Verifying the APK before installation...");new Thread(()->{File tmp=new File(a.getCacheDir(),"beta-update.part");try{long size=m.getLong("size");if(size<1||size>100*1024*1024)throw new IOException("Update size is not supported.");MessageDigest hash=MessageDigest.getInstance("SHA-256");HttpsURLConnection c=asset(asset);long total=0;try(InputStream in=c.getInputStream();OutputStream out=new FileOutputStream(tmp)){byte[] b=new byte[65536];int n;while((n=in.read(b))!=-1){if(cancelled)throw new IOException("Download cancelled.");total+=n;if(total>size)throw new IOException("Download size mismatch.");hash.update(b,0,n);out.write(b,0,n);}}finally{c.disconnect();}if(cancelled)throw new IOException("Download cancelled.");if(total!=size||!hex(hash.digest()).equalsIgnoreCase(m.getString("sha256")))throw new IOException("Download verification failed. No installation was started.");
   PackageInfo p=a.getPackageManager().getPackageArchiveInfo(tmp.getPath(),PackageManager.GET_SIGNING_CERTIFICATES);if(p==null||p.getLongVersionCode()<=a.getPackageManager().getPackageInfo(a.getPackageName(),0).getLongVersionCode()||!a.getPackageName().equals(p.packageName)||p.getLongVersionCode()!=m.getLong("versionCode")||p.signingInfo==null||p.signingInfo.hasMultipleSigners())throw new IOException("Downloaded APK identity did not match.");android.content.pm.Signature[] sig=p.signingInfo.getApkContentsSigners();if(sig.length!=1||!CERT.equals(hex(MessageDigest.getInstance("SHA-256").digest(sig[0].toByteArray()))))throw new IOException("Downloaded APK signing certificate did not match.");
   readyVersion=m.getLong("versionCode");ready=new File(a.getCacheDir(),"beta-update.apk");if(ready.exists()&&!ready.delete())throw new IOException("Could not replace old update cache.");if(!tmp.renameTo(ready))throw new IOException("Could not prepare verified update.");ui.post(()->{if(!cancelled&&!entryFinished)install();});
  }catch(Exception e){tmp.delete();if(!cancelled)ui.post(()->failEntry("Update not installed",e.getMessage()));}finally{busy=false;}},"beta-download").start();}
 static String hex(byte[] d){StringBuilder b=new StringBuilder();for(byte v:d)b.append(String.format(java.util.Locale.ROOT,"%02x",v&255));return b.toString();}
 void install(){if(cancelled||entryFinished)return;if(ready==null||!ready.isFile())return;
  try{PackageInfo installed=a.getPackageManager().getPackageInfo(a.getPackageName(),0);if(readyVersion<=installed.getLongVersionCode()){ready.delete();ready=null;finishEntry("current");return;}PackageInfo archive=a.getPackageManager().getPackageArchiveInfo(ready.getPath(),PackageManager.GET_SIGNING_CERTIFICATES);if(archive==null||!a.getPackageName().equals(archive.packageName)||archive.getLongVersionCode()!=readyVersion||archive.signingInfo==null||archive.signingInfo.hasMultipleSigners())throw new IOException();android.content.pm.Signature[] signatures=archive.signingInfo.getApkContentsSigners();if(signatures==null||signatures.length!=1||!CERT.equals(hex(MessageDigest.getInstance("SHA-256").digest(signatures[0].toByteArray()))))throw new IOException();}catch(Exception e){ready.delete();ready=null;failEntry("Update not installed","Cached APK identity check failed. No installer was opened.");return;}if(!a.getPackageManager().canRequestPackageInstalls()){emit("permission","Allow installation","Allow updates from One World Beta in Android settings.");return;}
  emit("ready","Verified update ready","Install over this beta. Do not uninstall or clear data.");
 }
 void close(){cancelled=true;}
}
