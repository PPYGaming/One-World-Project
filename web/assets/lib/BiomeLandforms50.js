// Connected landforms interpreted from the owner's oblique island illustration.
// Scene distances and hidden slopes are design choices, not recovered measurements.
const clamp=x=>Math.max(0,Math.min(1,x));
const ramp=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
function noise(x,z){const f=(a,b)=>{const v=Math.sin(a*127.1+b*311.7)*43758.5453;return v-Math.floor(v);},a=Math.floor(x),b=Math.floor(z),u=ramp(0,1,x-a),v=ramp(0,1,z-b);return (f(a,b)*(1-u)+f(a+1,b)*u)*(1-v)+(f(a,b+1)*(1-u)+f(a+1,b+1)*u)*v;}
function ridge(x,z,pts,w,p=1.15){let h=0;for(let i=1;i<pts.length;i++){const [ax,az,ah]=pts[i-1],[bx,bz,bh]=pts[i],dx=bx-ax,dz=bz-az,t=clamp(((x-ax)*dx+(z-az)*dz)/(dx*dx+dz*dz)),d=Math.hypot(x-ax-dx*t,z-az-dz*t);h=Math.max(h,Math.pow(clamp(1-d/w),p)*(ah+(bh-ah)*t));}return h;}
export function landform50(x,z,b,old){
 const wx=x+(noise(x*.0017,z*.0017)-.5)*90,wz=z+(noise(x*.0019+8,z*.0019)-.5)*75;
 if(b==='snow'){
  let h=ridge(wx,wz,[[-5100,-3200,95],[-4400,-3500,400],[-3650,-2980,260],[-2860,-3450,345],[-2080,-2700,110]],680);
  h=Math.max(h,ridge(wx,wz,[[-4380,-3400,360],[-4110,-2600,255],[-3580,-2050,100]],530),ridge(wx,wz,[[-3600,-2960,290],[-3000,-2350,205],[-2350,-1870,35]],520),ridge(wx,wz,[[-2870,-3400,330],[-2420,-3100,240],[-2050,-2650,60]],430));
  const ribs=Math.abs(noise(x*.008,z*.008)*2-1),detail=(noise(x*.026,z*.026)-.5)*12;
  return Math.max(3,8+h*1.65+(ribs-.5)*48*ramp(25,170,h)+detail*ramp(15,90,h));
 }
 if(b==='desert'){
  let h=ridge(wx,wz,[[4270,-1400,45],[4480,-960,175],[4590,-420,245],[4400,120,165],[4750,550,40]],520,.7);
  h=Math.max(h,ridge(wx,wz,[[4590,-420,240],[3950,-230,150],[3590,140,20]],400,.8),ridge(wx,wz,[[4500,-600,235],[5020,-830,105],[5400,-400,20]],370,.8));
  const band=h/28,i=Math.floor(band),f=band-i;
  h=h*.22+(i+ramp(.67,1,f))*28*.78;
  const gully=1-ramp(14,65,Math.abs(x-(4330+Math.sin(z*.0028)*170)));
  return 6+Math.max(0,h-gully*66*ramp(10,100,h))*1.7+(noise(x*.025,z*.025)-.5)*4;
 }
 if(b==='swamp'){
  let h=-.9+(noise(x*.0014,z*.0014)-.5)*5.8;
  for(const [cx,cz,hi,rx]of [[-4700,-450,62,230],[-4000,-420,98,280],[-3350,220,67,220],[-4600,570,38,180],[-3650,840,45,180]])h=Math.max(h,ridge(wx,wz,[[cx-180,cz-80,hi*.45],[cx,cz,hi],[cx+180,cz+95,hi*.6]],rx,.8)+(noise(x*.018,z*.018)-.5)*8);
  return h>8?h*1.35:h;
 }
 if(b==='forest'){
  const cx=-50,cz=-780,d=Math.hypot((x-cx)/1130,(z-cz)/830),mask=1-ramp(.72,1.15,d);
  if(mask>0){let h=ridge(wx,wz,[[-630,-1050,90],[-190,-1080,185],[150,-720,245],[500,-420,80]],380,.9);h=Math.max(h,ridge(wx,wz,[[120,-760,240],[-380,-420,140],[-560,-160,25]],330,.9));return old*(1-mask)+(10+h*1.8+(noise(x*.018,z*.018)-.5)*12*ramp(20,90,h))*mask;}
 }
 return old;
}
export function landformDetail50(x,z){return (x< -1500&&z< -1550)||(x>3400&&x<5600&&z> -1650&&z<850)||(x> -1000&&x<850&&z> -1600&&z<150)||(x< -2800&&x> -5200&&z> -900&&z<1200);}
