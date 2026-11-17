package com.oneword.forest;
import java.net.URL;
final class GithubUpdatePolicy {
 static boolean api(URL u){return "https".equals(u.getProtocol())&&u.getUserInfo()==null&&u.getPort()==-1&&u.getRef()==null&&"api.github.com".equals(u.getHost())&&(u.getPath().equals("/repos/PPYGaming/One-World-Beta")||u.getPath().startsWith("/repos/PPYGaming/One-World-Beta/"))&&!u.getPath().contains("..")&&!u.getPath().contains("%");}
 static boolean redirect(URL u){String h=u.getHost();return "https".equals(u.getProtocol())&&u.getUserInfo()==null&&u.getPort()==-1&&u.getRef()==null&&(h.equals("github.com")||h.endsWith(".githubusercontent.com"));}
}
