package com.oneword.forest;
import java.io.*;
import java.util.*;
import android.webkit.WebResourceResponse;
final class AssetRange {
 static long[] bounds(String range,int length){
  if(range==null)return new long[]{0,length-1,200};
  if(!range.matches("bytes=\\d*-\\d*"))return null;
  try{String[] v=range.substring(6).split("-",-1);long start,end;
   if(v[0].isEmpty()){long tail=Long.parseLong(v[1]);if(tail<=0)return null;start=Math.max(0,length-tail);end=length-1;}
   else{start=Long.parseLong(v[0]);end=v[1].isEmpty()?length-1:Math.min(Long.parseLong(v[1]),length-1);}
   if(start<0||start>=length||end<start)return null;return new long[]{start,end,206};
  }catch(Exception e){return null;}
 }
 static WebResourceResponse response(InputStream in,String mime,String range)throws IOException{
  ByteArrayOutputStream out=new ByteArrayOutputStream();try{byte[] buf=new byte[32768];int n;while((n=in.read(buf))!=-1)out.write(buf,0,n);}finally{in.close();}
  byte[] data=out.toByteArray();long[] b=bounds(range,data.length);Map<String,String> h=new HashMap<>();h.put("Accept-Ranges","bytes");
  if(b==null){h.put("Content-Range","bytes */"+data.length);return new WebResourceResponse(mime,null,416,"Range Not Satisfiable",h,new ByteArrayInputStream(new byte[0]));}
  int first=(int)b[0],count=(int)(b[1]-b[0]+1);h.put("Content-Length",String.valueOf(count));if(b[2]==206)h.put("Content-Range","bytes "+first+"-"+b[1]+"/"+data.length);
  return new WebResourceResponse(mime,null,(int)b[2],b[2]==206?"Partial Content":"OK",h,new ByteArrayInputStream(data,first,count));
 }
}
