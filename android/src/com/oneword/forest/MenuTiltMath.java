package com.oneword.forest;
// Pure orientation math; menu only. Gameplay input is independent.
final class MenuTiltMath {
 private MenuTiltMath(){}
 static float[] quaternion(float[] v){
  if(v==null||v.length<3)return null;float x=v[0],y=v[1],z=v[2];
  float w=v.length>3?v[3]:(float)Math.sqrt(Math.max(0,1-x*x-y*y-z*z));
  if(!Float.isFinite(x)||!Float.isFinite(y)||!Float.isFinite(z)||!Float.isFinite(w))return null;
  float n=(float)Math.sqrt(x*x+y*y+z*z+w*w);if(n<.00001f)return null;
  return new float[]{x/n,y/n,z/n,w/n};
 }
 static float offset(float[] center,float[] q,int rotation){
  // Conjugate(center) * q gives rotation in the centered device frame.
  float x=center[3]*q[0]-center[0]*q[3]-center[1]*q[2]+center[2]*q[1];
  float y=center[3]*q[1]+center[0]*q[2]-center[1]*q[3]-center[2]*q[0];
  float w=center[3]*q[3]+center[0]*q[0]+center[1]*q[1]+center[2]*q[2];
  float axis=rotation==1?x:rotation==3?-x:rotation==2?-y:y;
  float angle=(float)(2*Math.atan2(axis,w));while(angle>Math.PI)angle-=2*Math.PI;while(angle< -Math.PI)angle+=2*Math.PI;
  float degrees=(float)Math.toDegrees(angle),clean=Math.max(0,Math.abs(degrees)-.5f);
  return Math.copySign(Math.min(4,clean*(4f/19.5f)),degrees);
 }
}
