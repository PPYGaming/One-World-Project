import * as T from './three.module.js';
import {SITE_PLANS} from './ReferenceLocations.js';
import {referenceCoast} from './ReferenceCoast.js';
export async function createReferenceHorizon(scene,height,color,yieldPaint){
 const cols=100,rows=68,data=new Uint8Array(cols*rows*4),mask=new T.DataTexture(data,cols,rows,T.RGBAFormat);mask.minFilter=mask.magFilter=T.NearestFilter;mask.needsUpdate=true;
 const cw=513,ch=345,cd=new Uint8Array(cw*ch*4);let colorStart=performance.now();for(let z=0;z<ch;z++){for(let x=0;x<cw;x++){const wx=x/(cw-1)*12800-6400,wz=z/(ch-1)*8704-4352,c=color(wx,wz,height(wx,wz)),i=(z*cw+x)*4;cd[i]=Math.round(c[0]*255);cd[i+1]=Math.round(c[1]*255);cd[i+2]=Math.round(c[2]*255);cd[i+3]=255;}if(performance.now()-colorStart>8){await yieldPaint();colorStart=performance.now();}}
 const colorMap=new T.DataTexture(cd,cw,ch,T.RGBAFormat);colorMap.minFilter=colorMap.magFilter=T.LinearFilter;colorMap.needsUpdate=true;
 const verts=[],norms=[],colors=[],indices=[],cells=new Map();let start=performance.now();
 const colsX=200,rowsZ=136,base=64,divisions=new Map();
 for(let iz=0;iz<rowsZ;iz++)for(let ix=0;ix<colsX;ix++){const x0=ix*base-6400,z0=iz*base-4352,coast=Math.abs(referenceCoast(x0+32,z0+32)),nearSite=SITE_PLANS.some(p=>Math.abs(p.x-x0-32)<115&&Math.abs(p.z-z0-32)<115);divisions.set(ix+','+iz,nearSite?8:coast<65?4:coast<140?2:1);}
 function edgeY(x,z,step,vertical){const v=vertical?z+4352:x+6400,a=Math.floor(v/step)*step,t=v/step-Math.floor(v/step);return vertical?height(x,a-4352)*(1-t)+height(x,a+step-4352)*t:height(a-6400,z)*(1-t)+height(a+step-6400,z)*t;}

 for(let iz=0;iz<rowsZ;iz++)for(let ix=0;ix<colsX;ix++){
  const x0=ix*base-6400,z0=iz*base-4352,coast=Math.abs(referenceCoast(x0+32,z0+32)),nearSite=SITE_PLANS.some(p=>Math.abs(p.x-x0-32)<115&&Math.abs(p.z-z0-32)<115),div=nearSite?8:coast<65?4:coast<140?2:1,step=base/div,n=div+1,offset=verts.length/3,ys=[];
  for(let j=0;j<n;j++)for(let i=0;i<n;i++){const x=x0+i*step,z=z0+j*step;let y=height(x,z);if(i===0||i===div){const other=divisions.get((ix+(i===0?-1:1))+','+iz)||div;if(other<div)y=edgeY(x,z,base/other,true);}if(j===0||j===div){const other=divisions.get(ix+','+(iz+(j===0?-1:1)))||div;if(other<div)y=edgeY(x,z,base/other,false);}y=Math.fround(y);const c=color(x,z,y),v=new T.Vector3(height(x-5,z)-height(x+5,z),10,height(x,z-5)-height(x,z+5)).normalize();verts.push(x,y,z);ys.push(y);norms.push(v.x,v.y,v.z);colors.push(...c);}
  for(let j=0;j<div;j++)for(let i=0;i<div;i++){const a=offset+j*n+i,b=a+1,c=a+n,d=c+1;indices.push(a,c,b,b,c,d);}
  cells.set(ix+','+iz,{div,ys});
  if(performance.now()-start>8){await yieldPaint();start=performance.now();}
 }
 function smoothHeight(x,z){const ix=Math.max(0,Math.min(colsX-1,Math.floor((x+6400)/base))),iz=Math.max(0,Math.min(rowsZ-1,Math.floor((z+4352)/base))),cell=cells.get(ix+','+iz),{div,ys}=cell,n=div+1,sx=Math.max(0,Math.min(div-.0000001,(x+6400-ix*base)/(base/div))),sz=Math.max(0,Math.min(div-.0000001,(z+4352-iz*base)/(base/div))),gx=Math.floor(sx),gz=Math.floor(sz),fx=sx-gx,fz=sz-gz,i=gz*n+gx,a=ys[i],b=ys[i+1],c=ys[i+n],d=ys[i+n+1];return fx+fz<1?a+(b-a)*fx+(c-a)*fz:d+(c-d)*(1-fx)+(b-d)*(1-fz);}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));geo.setAttribute('normal',new T.Float32BufferAttribute(norms,3));geo.setAttribute('color',new T.Float32BufferAttribute(colors,3));geo.setIndex(indices);
 const mat=new T.MeshStandardMaterial({vertexColors:true,roughness:1});mat.onBeforeCompile=shader=>{shader.uniforms.referenceLoaded={value:mask};shader.vertexShader='varying vec2 vReferenceXZ;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvReferenceXZ=(modelMatrix*vec4(transformed,1.0)).xz;');shader.fragmentShader='uniform sampler2D referenceLoaded;\nvarying vec2 vReferenceXZ;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nvec2 refCell=(floor(vReferenceXZ/128.0)+vec2(50.0,34.0)+.5)/vec2(100.0,68.0);');};mat.customProgramCacheKey=()=> 'reference-horizon-v1';const mesh=new T.Mesh(geo,mat);mesh.name='ReferenceIslandDistantTerrain';scene.add(mesh);
 function mark(cx,cz,on){const x=cx+50,z=cz+34;if(x<0||x>=cols||z<0||z>=rows)return;const i=(z*cols+x)*4;data[i]=on?255:0;data[i+3]=255;mask.needsUpdate=true;}
 return {mesh,mark,colorMap,smoothHeight};
}
