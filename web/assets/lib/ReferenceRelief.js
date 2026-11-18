// Landforms traced from visible ridges in the unchanged illustrated map.
// Horizontal positions follow map coordinates. Heights are estimates, not survey data.
// x, z, estimated rise, width, depth, ridge angle (radians).
const hills=[
 [-180,-720,165,410,720,-.20], [590,-390,110,370,460,.35],[-40,140,78,500,230,-.1],
 [-2850,700,125,380,700,-.65],[-2260,1140,78,390,410,-.5],[-3380,1340,64,410,380,.35],
 [-4050,2040,48,520,270,-.2],[-4170,3220,70,300,200,.25],
 [1690,2530,115,430,650,-.25],[930,2000,50,310,300,.2],[-120,3230,32,350,200,.2]
];
export function referenceRelief(x,z,biome){
 if(biome==='swamp'||biome==='volcanic'||biome==='snow')return 0;
 let height=0;
 for(const [cx,cz,h,rx,rz,a] of hills){const dx=x-cx,dz=z-cz,ca=Math.cos(a),sa=Math.sin(a),u=(dx*ca-dz*sa)/rx,v=(dx*sa+dz*ca)/rz,q=u*u+v*v;if(q<8){const ridge=.88+.12*Math.abs(Math.sin(x*.012+Math.sin(z*.009)));height=Math.max(height,h*Math.exp(-q*1.45)*ridge);}}
 if(biome==='desert'){
  const u=(x-4490)/470,v=(z+380)/650,r=Math.sqrt(u*u+v*v),edge=Math.max(0,Math.min(1,(1.25-r)/.5)),mesa=145*edge*edge*(3-2*edge);
  height=Math.max(height,mesa+18*Math.exp(-(((x-4070)/290)**2+((z+1070)/380)**2)));
 }
 return height;
}
