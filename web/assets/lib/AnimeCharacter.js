import * as THREE from 'three';

// Original animation curves for the CC0 VRoid HairSample rigs.
// These are not retargeted third-party animation clips.
export function animeClips(root){
  const clips=[];
  const names=['Idle','Run','Walk','Punch','Slash','Chop','Death','Swim'];
  const bones=[];root.traverse(b=>{if(b.isBone) bones.push(b);});
  const rig=Object.fromEntries(bones.map(b=>[b.name,b]));
  names.forEach(name=>{
    const duration= name==='Death'?1.1 : /Slash|Chop|Punch/.test(name)?0.48 : name==='Run'?0.65 : name==='Walk'?1.1 : name==='Swim'?1.4 : 2.4;
    const tracks=[]; const samples=33;
    bones.forEach(b=>{
      if(!/^J_Bip_[CLR]_/.test(b.name))return;
      const values=[];const times=[];
      for(let i=0;i<samples;i++){
        const u=i/(samples-1),a=u*Math.PI*2;let x=0,y=0,z=0;
        const left=b.name.includes('_L_'),right=b.name.includes('_R_'),sgn=left?1:-1;
        if(b.name.endsWith('UpperArm'))z=sgn*1.34;
        if(b.name.endsWith('LowerArm'))y=-sgn*0.12;
        if(/_(Index|Middle|Ring|Little)[123]$/.test(b.name))z=sgn*0.17;
        if(name==='Idle'){
          if(b.name.endsWith('Chest'))x=Math.sin(a)*0.012;
          if(b.name.endsWith('Head'))y=Math.sin(a)*0.015;
        }
        if(name==='Run'||name==='Walk'){
          const t=(left?0:Math.PI)+a,amp=name==='Run'?0.72:0.36;
          // A planted backstroke followed by a clear, bent-knee recovery.
          // Solve the two leg segments to an ankle path instead of coupling
          // knee flex to the thigh sine (which lifted both soles mid-stride).
          if(/(UpperLeg|LowerLeg|Foot)$/.test(b.name)){
          const phase=((u+(left?0:.5))%1),run=name==='Run';
          const stride=run?.42:.24,stance=phase<.5;
          const progress=stance?phase*2:(phase-.5)*2;
          const forward=stance?stride*(1-2*progress):-stride*Math.cos(progress*Math.PI);
          const height=-(run?.88:.88)+(stance?0:Math.sin(progress*Math.PI)*(run?.29:.12));
          const thigh=rig['J_Bip_'+(left?'L':'R')+'_LowerLeg'];
          const shin=rig['J_Bip_'+(left?'L':'R')+'_Foot'];
          const l1=thigh?thigh.position.length():.39,l2=shin?shin.position.length():.46;
          // Paths above are in normalized survivor metres; source bones are
          // rescaled by normSkinnedChar. Keep this ratio local to the rig.
          const scale=(l1+l2)/.94,fy=height*scale,fz=forward*scale;
          const d=Math.min(l1+l2-.002,Math.hypot(fy,fz));
          const hip=Math.atan2(fz,-fy)+Math.acos(THREE.MathUtils.clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1));
          const knee=-Math.acos(THREE.MathUtils.clamp((d*d-l1*l1-l2*l2)/(2*l1*l2),-1,1));
          if(b.name.endsWith('UpperLeg'))x=hip;
          if(b.name.endsWith('LowerLeg'))x=knee;
          if(b.name.endsWith('Foot'))x=-hip-knee+(stance?Math.sin(progress*Math.PI)*.08:-.08);
          }
          if(b.name.endsWith('UpperArm')){x=-Math.sin(t)*amp*.78;z=sgn*1.30;}
          if(b.name.endsWith('LowerArm')){y=-sgn*(name==='Run'?(.95+.12*Math.sin(t)):(.3+.08*Math.sin(t)));z=0;}
          if(b.name.endsWith('Head')){y=Math.sin(a)*.025;x=Math.sin(a*2)*.012;}
          if(b.name.endsWith('Spine')){x=name==='Run'?.055:0;y=Math.sin(a)*.045;z=Math.cos(a)*.008;}
          if(b.name.endsWith('Hips'))z=Math.cos(a)*.006;
        }
        if(name==='Swim'){
          if(b.name.endsWith('UpperArm')){z=sgn*(0.4+0.65*Math.sin(a));x=0.8*Math.cos(a);}
          if(b.name.endsWith('LowerArm'))y=-sgn*(.35+.2*Math.sin(a));
          if(b.name.endsWith('UpperLeg'))x=Math.sin(a*2+(left?0:Math.PI))*0.18;
          if(b.name.endsWith('LowerLeg'))x=-.12-Math.max(0,Math.sin(a*2))*.2;
        }
        if(/Slash|Chop|Punch/.test(name)){
          const s=Math.sin(u*Math.PI);
          // Aim in the rig's forward (-Z) plane, rather than rotating the
          // lowered arm about its old T-pose axis (which produced a side swipe).
          const upper=rig.J_Bip_R_UpperArm;
          const lower=rig.J_Bip_R_LowerArm;
          const hand=rig.J_Bip_R_Hand;
          if(upper&&lower&&hand&&(b===upper||b===lower)){
            const thrust=name==='Punch',lift=thrust?.80:1.04;
            const upperDir=new THREE.Vector3(.16,-1+s*lift,-.04-s*.98).normalize();
            const uq=new THREE.Quaternion().setFromUnitVectors(lower.position.clone().normalize(),upperDir);
            const lowerDir=new THREE.Vector3(.06,-.87+s*(thrust?.9:.65),-.2-s*.9).normalize().applyQuaternion(uq.clone().invert());
            const aq=b===upper?uq:new THREE.Quaternion().setFromUnitVectors(hand.position.clone().normalize(),lowerDir);
            const ae=new THREE.Euler().setFromQuaternion(aq);x=ae.x;y=ae.y;z=ae.z;
          }
          if(b.name==='J_Bip_C_Chest')y=-Math.sin(u*Math.PI*2)*0.06;
          if(/_R_(Index|Middle|Ring|Little)[123]$/.test(b.name))z=-0.8;
        }
        if(name==='Death'){
          if(b.name.endsWith('Spine'))x=u*0.3;
          if(b.name.endsWith('LowerLeg'))x=u*.7;
          if(b.name.endsWith('UpperLeg'))x=u*0.4;
          if(b.name.endsWith('Head'))x=u*0.5;
        }
        const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(x,y,z));values.push(q.x,q.y,q.z,q.w);times.push(u*duration);
      }
      tracks.push(new THREE.QuaternionKeyframeTrack(b.name+'.quaternion',times,values));
      if(b.name==='J_Bip_C_Hips'&&(name==='Run'||name==='Walk')){
        // Keep a flexed stance within reach; the unchanged sole-support pass
        // still makes the final terrain contact correction. No root motion.
        const y=b.position.y-(name==='Run'?.085:.09);
        tracks.push(new THREE.VectorKeyframeTrack(b.name+'.position',[0,duration],[b.position.x,y,b.position.z,b.position.x,y,b.position.z]));
      }
    });
    clips.push(new THREE.AnimationClip(name,duration,tracks));
  });
  return clips;
}

const recolorCache=new Map();
function recolorMap(map,hex,kind){
 if(!map||!map.image||!hex||hex==='original')return map;
 const key=map.uuid+':'+hex+':'+kind;
 if(recolorCache.has(key))return recolorCache.get(key);
 const c=document.createElement('canvas');c.width=map.image.width;c.height=map.image.height;
 const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(map.image,0,0);
 const img=ctx.getImageData(0,0,c.width,c.height),d=img.data;
 // Keep the saved Light warm option ID while giving it a distinct warm tint.
 // #ffe7d8 was the reference divisor itself, so that choice used to be identical to Original.
 const tint=kind==='skin'&&hex.toLowerCase()==='#ffe7d8'?'#eac6ae':hex;
 const col=new THREE.Color(tint); // convert back to display-space bytes for texture painting
 col.convertLinearToSRGB(); const rgb=[col.r*255,col.g*255,col.b*255];
 for(let i=0;i<d.length;i+=4){
   if(kind==='skin'){d[i]=d[i]*rgb[0]/255;d[i+1]=d[i+1]*rgb[1]/231;d[i+2]=d[i+2]*rgb[2]/216;}
   else {const lum=(d[i]*0.2126+d[i+1]*0.7152+d[i+2]*0.0722)/255;
     const shade=kind==='hair'?Math.min(1,0.21+lum*2.3):Math.min(1,0.3+lum*1.15);
     d[i]=rgb[0]*shade;d[i+1]=rgb[1]*shade;d[i+2]=rgb[2]*shade;
   }
 }
 ctx.putImageData(img,0,0);const out=map.clone();out.source=new THREE.Source(c);out.needsUpdate=true;out.colorSpace=THREE.SRGBColorSpace;
 recolorCache.set(key,out);return out;
}
export function applyAnimeColors(root,look){
 root.traverse(o=>{if(!o.isMesh)return;
  const ms=Array.isArray(o.material)?o.material:[o.material];
  ms.forEach(m=>{
   if(!Object.prototype.hasOwnProperty.call(m.userData,'originalMap'))m.userData.originalMap=m.map;
   let kind= /_HAIR/.test(m.name)?'hair':/EyeIris/.test(m.name)?'eye':/_SKIN/.test(m.name)?'skin':null;
   if(m.userData.customHair)m.color.set(look.hair==='original'?0x251e31:look.hair);else if(kind)m.map=recolorMap(m.userData.originalMap,look[kind],kind);
   m.needsUpdate=true;
  });
 });
}

// Gender-specific original geometry styles on the existing licensed head/rig.
export function applyHairStyle(root,style='original',kind='boy'){
 const old=root.getObjectByName('CustomHairLocks');if(old){old.geometry.dispose();old.material.dispose();old.parent.remove(old);}
 let source=null;
 root.traverse(o=>{
  if(!o.isMesh||!/_HAIR/.test(o.material?.name||''))return;
  if(!source&&o.isSkinnedMesh)source=o;
  if(kind==='boy')o.visible=style!=='short';
  if(!o.userData.hairBase){o.geometry=o.geometry.clone();o.userData.hairBase=new Float32Array(o.geometry.attributes.position.array);}
  const base=o.userData.hairBase,p=o.geometry.attributes.position;
  for(let i=0;i<p.count;i++){
   let x=base[i*3],y=base[i*3+1],z=base[i*3+2];
   if(kind==='girl'&&style==='long'){if(y<1.56&&Math.abs(x)>.10)y=1.56+(y-1.56)*1.75;}
   else if(kind==='girl'){
    // Preserve the scalp and bangs; long side-tail components are filtered below.
   }else if(style==='long'){
    x*=.26;
    if(y<1.68)y=1.68+(y-1.68)*.20;
   }
   p.setXYZ(i,x,y,z);
  }
  if(kind==='girl'&&(style==='original'||style==='long')){if(o.userData.baseHairIndex)o.geometry.setIndex(o.userData.baseHairIndex);}
  else if(kind==='girl'){
   if(!o.userData.baseHairIndex)o.userData.baseHairIndex=Array.from(o.geometry.index.array);
   const ix=o.userData.baseHairIndex,par=Array.from({length:p.count},(_,i)=>i),find=x=>{while(par[x]!==x){par[x]=par[par[x]];x=par[x];}return x;};
   for(let t=0;t<ix.length;t+=3){par[find(ix[t+1])]=find(ix[t]);par[find(ix[t+2])]=find(ix[t]);}
   const groups=new Map();for(const v of ix){const k=find(v);if(!groups.has(k))groups.set(k,{minY:9,minX:9,maxX:-9});const g=groups.get(k);g.minY=Math.min(g.minY,base[v*3+1]);g.minX=Math.min(g.minX,base[v*3]);g.maxX=Math.max(g.maxX,base[v*3]);}
   const kept=[];for(let t=0;t<ix.length;t+=3){const g=groups.get(find(ix[t]));if(g.minY<1.385&&(g.minX>.045||g.maxX<-.045))continue;kept.push(ix[t],ix[t+1],ix[t+2]);}o.geometry.setIndex(kept);
  }
  o.userData.swayOriginalHair=kind==='girl'&&(style==='original'||style==='long');o.userData.styledHairBase=new Float32Array(p.array);
  p.needsUpdate=true;o.geometry.computeVertexNormals();o.geometry.computeBoundingBox();o.geometry.computeBoundingSphere();
 });
 if(!source||kind!=='girl'||style==='original'||style==='long')return;
 const hairMaterial=source.material;
 let binder=null;root.traverse(o=>{if(!binder&&o.isSkinnedMesh&&/Body/.test(o.name)&&/_SKIN/.test(o.material?.name||''))binder=o;});if(binder)source=binder;
 const verts=[],uv=[],inds=[],N=24,R=20;
 function lock(x,y,z,length,rx,rz,bendX=0,bendZ=0){
  const start=verts.length/3;
  for(let j=0;j<=R;j++){
   const t=j/R,taper=Math.max(.015,Math.sin((.05+.95*t)*Math.PI)**.65),cx=x+bendX*t*t,cz=z+bendZ*t*t;
   for(let i=0;i<N;i++){const a=i/N*Math.PI*2,ripple=1+.045*Math.cos(a*6);verts.push(cx+Math.cos(a)*rx*taper*ripple,y-length*t,-cz+Math.sin(a)*rz*taper*ripple);uv.push(i/N,t);}
  }
  for(let j=0;j<R;j++)for(let i=0;i<N;i++){let a=start+j*N+i,b=start+j*N+(i+1)%N,c=a+N,d=b+N;inds.push(a,c,b,b,c,d);}
 }
 if(style==='short')lock(0,1.565,-.095,.29,.052,.045,0,-.025); // single rear ponytail
 else if(style==='long'||style==='loose'){
  // Loose back curtain made from overlapping rounded tapered locks.
  for(let k=-2;k<=2;k++)lock(k*.035,1.57,-.080,.29-Math.abs(k)*.020,.037,.026,k*.005,-.025);
  if(style==='loose'){lock(-.075,1.58,.04,.22,.025,.025,-.045,.02);lock(.075,1.58,.04,.22,.025,.025,.045,.02);}
 }else if(style==='front'){
  lock(0,1.565,-.095,.29,.052,.045,0,-.02);lock(-.075,1.58,.05,.22,.025,.022,-.04,.015);lock(.075,1.58,.04,.18,.022,.021,.04,.012);
 }else{
  // Medium side twin tails, with a soft outward arc rather than floor-length hair.
  lock(-.115,1.585,-.015,.28,.044,.033,-.052,-.018);lock(.115,1.585,-.015,.28,.044,.033,.052,-.018);
 }
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(inds);geo.computeVertexNormals();
 const head=source.skeleton.bones.findIndex(b=>b.name==='J_Bip_C_Head'),si=[],sw=[];for(let i=0;i<verts.length/3;i++){si.push(head,0,0,0);sw.push(1,0,0,0);}geo.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(si,4));geo.setAttribute('skinWeight',new THREE.Float32BufferAttribute(sw,4));
 const mat=hairMaterial.clone();mat.userData={...hairMaterial.userData};mat.name='_HAIR_CUSTOM';
 const mesh=new THREE.SkinnedMesh(geo,mat);mesh.name='CustomHairLocks';mesh.frustumCulled=false;mesh.bind(source.skeleton,source.bindMatrix);mesh.userData.base=new Float32Array(verts);root.add(mesh);
}
export function updateHairSway(root,dt,moving=false,running=false){
 if(!root)return;const skirt=root.getObjectByName('LeatherOuterSkirt');if(skirt?.userData.drapeBase){const u=skirt.userData;u.lift=THREE.MathUtils.lerp(u.lift||0,running?1:0,Math.min(1,dt*18));const p=skirt.geometry.attributes.position,b=u.drapeBase;for(let i=0;i<p.count;i++){const t=THREE.MathUtils.clamp((1.015-b[i*3+1])/.24,0,1);p.setY(i,b[i*3+1]+.090*t*t*u.lift);}p.needsUpdate=true;}root.traverse(o=>{if(!o.userData.swayOriginalHair)return;const u=o.userData;u.swayClock=(u.swayClock||0)+dt;u.swayAmp=THREE.MathUtils.lerp(u.swayAmp||0,moving?1:0,Math.min(1,dt*5));const p=o.geometry.attributes.position,b=u.styledHairBase;for(let i=0;i<p.count;i++){const t=THREE.MathUtils.clamp((1.56-b[i*3+1])/.4,0,1)*(Math.abs(b[i*3])>.1?1:0);p.setX(i,b[i*3]+Math.sin(u.swayClock*7+b[i*3]*4)*.010*t*t*u.swayAmp);p.setZ(i,b[i*3+2]+Math.cos(u.swayClock*6)*.007*t*t*u.swayAmp);}p.needsUpdate=true;});const m=root.getObjectByName('CustomHairLocks');if(!m)return;const u=m.userData;u.clock=(u.clock||0)+dt;u.amp=THREE.MathUtils.lerp(u.amp||0,moving?1:0,Math.min(1,dt*5));const p=m.geometry.attributes.position,b=u.base;
 for(let i=0;i<p.count;i++){const t=THREE.MathUtils.clamp((1.60-b[i*3+1])/.35,0,1),phase=u.clock*(moving?7:2)+b[i*3]*4;p.setX(i,b[i*3]+Math.sin(phase)*.012*t*t*u.amp);p.setZ(i,b[i*3+2]+Math.cos(phase*.8)*.008*t*t*u.amp);}
 p.needsUpdate=true;
}
// ---- ARK-style primitive partial-coverage leather outfit (original painted design) ----
// Painted onto the body skin texture using the mesh's own skin weights, so each
// leather piece lands exactly on the intended body part and deforms with the rig.
// Band placement uses MODEL-space projection along skeleton bone axes (robust to UV outliers).
const outfitCache=new Map();
function boneWorldPos(mesh){
  let root=mesh;while(root.parent)root=root.parent;
  root.updateMatrixWorld(true);
  const map={};
  mesh.skeleton.bones.forEach(b=>{const v=new THREE.Vector3();b.getWorldPosition(v);map[b.name]=v;});
  return map;
}
function composeBodyOutfit(mesh,baseMap,look,kind){
  const key=mesh.uuid+':'+(look.skin||'original')+':'+kind;
  if(outfitCache.has(key))return outfitCache.get(key);
  const tinted=recolorMap(baseMap,look.skin,'skin');
  const src=(tinted&&tinted.image)?tinted.image:baseMap.image;
  const W=src.width,H=src.height;
  const c=document.createElement('canvas');c.width=W;c.height=H;
  const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(src,0,0);
  const g=mesh.geometry,uv=g.attributes.uv,pos=g.attributes.position,idx=g.index;
  const siA=g.attributes.skinIndex.array,swA=g.attributes.skinWeight.array;
  const bones=mesh.skeleton.bones;
  const bpos=boneWorldPos(mesh);
  const n=idx?idx.count:uv.count;
  const vi=i=>idx?idx.getX(i):i;
  const px=v=>uv.getX(v)*W, py=v=>(1-uv.getY(v))*H;
  // per-vertex dominant bone (raw index array; weights via float array may be normalized ints)
  const vpart=new Array(uv.count);
  for(let v=0;v<uv.count;v++){
    let bw=-1,bi=0;
    for(let k=0;k<4;k++){const w=swA[v*4+k];if(w>bw){bw=w;bi=siA[v*4+k];}}
    vpart[v]=bones[bi]?bones[bi].name:'';
  }
  // world-space vertex position (bind pose transformed like the bones)
  const wpx=new Float32Array(uv.count),wpy=new Float32Array(uv.count),wpz=new Float32Array(uv.count);
  {const tv=new THREE.Vector3();for(let v=0;v<uv.count;v++){tv.set(pos.getX(v),pos.getY(v),pos.getZ(v));mesh.localToWorld(tv);wpx[v]=tv.x;wpy[v]=tv.y;wpz[v]=tv.z;}}
  const vx=v=>wpx[v], vy=v=>wpy[v], vz=v=>wpz[v];
  // projection t of vertex onto axis A->B (bone world positions)
  function axisT(A,B){
    const a=bpos[A],b=bpos[B];
    if(!a||!b)return null;
    const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z;const len2=dx*dx+dy*dy+dz*dz||1;
    const out=new Float32Array(uv.count);
    for(let v=0;v<uv.count;v++)out[v]=((vx(v)-a.x)*dx+(vy(v)-a.y)*dy+(vz(v)-a.z)*dz)/len2;
    return out;
  }
  const axes={
    lfa:axisT('J_Bip_L_LowerArm','J_Bip_L_Hand'), rfa:axisT('J_Bip_R_LowerArm','J_Bip_R_Hand'),
    lsh:axisT('J_Bip_L_LowerLeg','J_Bip_L_Foot'), rsh:axisT('J_Bip_R_LowerLeg','J_Bip_R_Foot'),
    lth:axisT('J_Bip_L_UpperLeg','J_Bip_L_LowerLeg'), rth:axisT('J_Bip_R_UpperLeg','J_Bip_R_LowerLeg')
  };
  const LEATHER='#6d4a2c',LEATHER_D='#503521',LEATHER_L='#8a6844',WRAP='#7d5a37';
  function fillTris(pred,color,alpha){
    ctx.save();ctx.globalAlpha=alpha==null?1:alpha;ctx.fillStyle=color;ctx.beginPath();
    for(let i=0;i<n;i+=3){const a=vi(i),b=vi(i+1),d=vi(i+2);
      if(!pred(a,b,d))continue;
      ctx.moveTo(px(a),py(a));ctx.lineTo(px(b),py(b));ctx.lineTo(px(d),py(d));ctx.closePath();}
    ctx.fill();ctx.restore();
  }
  const allPart=(nm)=>(a,b,d)=>vpart[a]===nm&&vpart[b]===nm&&vpart[d]===nm;
  const tAvg=(arr,a,b,d)=>(arr[a]+arr[b]+arr[d])/3;
  const yAvg=(a,b,d)=>(vy(a)+vy(b)+vy(d))/3;
  // 1) leather shorts/loincloth: hips + top of thighs
  const hipY=bpos['J_Bip_C_Hips']?bpos['J_Bip_C_Hips'].y:0.95;
  // loincloth covers the hip band only (below hipY+0.06); belly/ribs stay bare
  fillTris((a,b,d)=>allPart('J_Bip_C_Hips')(a,b,d)&&yAvg(a,b,d)<hipY+0.06,LEATHER);
  [['J_Bip_L_UpperLeg','lth'],['J_Bip_R_UpperLeg','rth']].forEach(([nm,ax])=>{
    if(!axes[ax])return;
    fillTris((a,b,d)=>allPart(nm)(a,b,d)&&tAvg(axes[ax],a,b,d)<0.34,LEATHER);
  });
  // waistband: darker band at the top edge of the loincloth
  fillTris((a,b,d)=>allPart('J_Bip_C_Hips')(a,b,d)&&yAvg(a,b,d)>hipY+0.03&&yAvg(a,b,d)<hipY+0.06,LEATHER_D);
  // fringe: light band at bottom edge of shorts (thigh t .30-.40)
  [['J_Bip_L_UpperLeg','lth'],['J_Bip_R_UpperLeg','rth']].forEach(([nm,ax])=>{
    if(!axes[ax])return;
    fillTris((a,b,d)=>allPart(nm)(a,b,d)&&tAvg(axes[ax],a,b,d)>0.30&&tAvg(axes[ax],a,b,d)<0.42,LEATHER_L);
  });
  // 2) chest: girl = leather bust wrap band; boy = bare tribal chest
  if(kind==='girl'){
    const chY=bpos['J_Bip_C_Chest']?bpos['J_Bip_C_Chest'].y:1.25;
    const spY=bpos['J_Bip_C_Spine']?bpos['J_Bip_C_Spine'].y:1.1;
    const half=Math.max(0.03,Math.abs(chY-spY)*0.8);
    const chPart=(a,b,d)=>(vpart[a]==='J_Bip_C_Chest'||vpart[a]==='J_Bip_C_UpperChest')&&(vpart[b]==='J_Bip_C_Chest'||vpart[b]==='J_Bip_C_UpperChest')&&(vpart[d]==='J_Bip_C_Chest'||vpart[d]==='J_Bip_C_UpperChest');
    fillTris((a,b,d)=>chPart(a,b,d)&&Math.abs(yAvg(a,b,d)-chY)<half,WRAP);
    fillTris((a,b,d)=>chPart(a,b,d)&&(yAvg(a,b,d)-chY)<-half*0.55&&(yAvg(a,b,d)-chY)>-half,LEATHER_D);
  }
  // 3) leather bracer wraps on forearms (two bands)
  [['J_Bip_L_LowerArm','lfa'],['J_Bip_R_LowerArm','rfa']].forEach(([nm,ax])=>{
    if(!axes[ax])return;
    fillTris((a,b,d)=>allPart(nm)(a,b,d)&&tAvg(axes[ax],a,b,d)>0.12&&tAvg(axes[ax],a,b,d)<0.42,LEATHER_L);
    fillTris((a,b,d)=>allPart(nm)(a,b,d)&&tAvg(axes[ax],a,b,d)>0.48&&tAvg(axes[ax],a,b,d)<0.78,LEATHER_D);
  });
  // 4) leather wrap bands on shins
  [['J_Bip_L_LowerLeg','lsh'],['J_Bip_R_LowerLeg','rsh']].forEach(([nm,ax])=>{
    if(!axes[ax])return;
    fillTris((a,b,d)=>allPart(nm)(a,b,d)&&tAvg(axes[ax],a,b,d)>0.15&&tAvg(axes[ax],a,b,d)<0.45,LEATHER_L);
    fillTris((a,b,d)=>allPart(nm)(a,b,d)&&tAvg(axes[ax],a,b,d)>0.52&&tAvg(axes[ax],a,b,d)<0.78,LEATHER_D);
  });
  // 5) leather moccasins on feet
  ['J_Bip_L_Foot','J_Bip_R_Foot','J_Bip_L_ToeBase','J_Bip_R_ToeBase'].forEach(nm=>{
    fillTris(allPart(nm),'#5d4023');
  });
  const out=baseMap.clone();out.image=c;out.needsUpdate=true;out.colorSpace=THREE.SRGBColorSpace;
  outfitCache.set(key,out);return out;
}
// ---- ARK-style primitive leather garments: SEPARATE 3D models mounted on the rig ----
// (User direction 2026-11-16 12:00: garments must be real geometry, not body paint.)
const garmentLeather=()=>new THREE.MeshStandardMaterial({color:0x6d4a2c,roughness:0.88,metalness:0.03,side:THREE.DoubleSide});
const garmentLeatherDark=()=>new THREE.MeshStandardMaterial({color:0x4a3118,roughness:0.95,side:THREE.DoubleSide});
function worldMountOn(bone,name){
  bone.updateMatrixWorld(true);
  const ws=new THREE.Vector3();bone.getWorldScale(ws);
  const q=new THREE.Quaternion();bone.getWorldQuaternion(q);
  const g=new THREE.Group();g.name=name;
  g.scale.setScalar(1/Math.max(ws.x,1e-4));
  g.quaternion.copy(q).invert(); // world-axis-aligned, still follows the bone
  bone.add(g);return g;
}
function buildLoincloth(){
  const g=new THREE.Group();g.name='LeatherLoincloth';
  const geo=new THREE.CylinderGeometry(0.135,0.24,0.30,26,4,true);
  geo.scale(1.08,1,0.94); // hips are elliptical, not circular
  const p=geo.attributes.position;
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),y=p.getY(i),z=p.getZ(i);
    const az=Math.atan2(z,x);
    const fold=Math.sin(az*7)*0.013+Math.sin(az*3+1.3)*0.008;
    const r=Math.hypot(x,z);
    if(r>1e-5){const nr=(r+fold)/r;p.setX(i,x*nr);p.setZ(i,z*nr);}
    // Only the upper two rows change: snug elliptical waist, room over hips.
    // Preserve every lower row and the original hem silhouette.
    if(y>.11){const a=Math.atan2(z/.94,x/1.08);p.setX(i,Math.cos(a)*.120);p.setZ(i,Math.sin(a)*.150);}
    else if(y>.04){const a=Math.atan2(z/.94,x/1.08);p.setX(i,Math.cos(a)*.174);p.setZ(i,Math.sin(a)*.180);}
    if(y<-0.11&&i%2===0)p.setY(i,y-0.02); // tattered hem
  }
  geo.computeVertexNormals();
  const skirt=new THREE.Mesh(geo,garmentLeather());skirt.position.y=-0.06;g.add(skirt);
  // hanging leather thong strips at the hem
  for(let i=0;i<8;i++){
    const az=i/8*Math.PI*2+0.4;
    const strip=new THREE.Mesh(new THREE.BoxGeometry(0.018,0.07,0.006),garmentLeatherDark());
    strip.position.set(Math.cos(az)*0.245,-0.16,Math.sin(az)*0.245);
    strip.rotation.y=-az;g.add(strip);
  }
  const belt=new THREE.Mesh(new THREE.TorusGeometry(0.138,0.016,8,26),garmentLeatherDark());
  belt.scale.set(.87,1.087,1);belt.rotation.x=Math.PI/2;belt.position.y=0.085;g.add(belt);
  const knot=new THREE.Mesh(new THREE.BoxGeometry(0.055,0.04,0.03),garmentLeatherDark());
  knot.position.set(0,0.08,0.135);g.add(knot);
  return g;
}
// Thin conformal leather bust wrap: an exact copy of the body's own chest-surface
// triangles, offset 0.012 outward along their normals and carrying the same skin
// weights - true shrink-wrap fit that deforms identically to the body.
// (user 12:16: thin leather on the same body shape, slightly raised, no towel band.)
function buildFittedLoincloth(body){
  const src=body.geometry,p=src.attributes.position,idx=src.index;
  const rings=[1.075,1.04,1.00,.96,.91,.85,.79],N=48,verts=[],indices=[];
  // Intersect the real skin triangles at each height, then fit a closed wrap to
  // the outer body contour. No circular-waist assumption or deep waist folds.
  for(let j=0;j<rings.length;j++){
    const y=rings[j],segments=[];
    for(let k=0;k<idx.count;k+=3){
      const vs=[idx.getX(k),idx.getX(k+1),idx.getX(k+2)],hits=[];
      if(vs.some(v=>{let bi=0,bw=0;for(let t=0;t<4;t++){const w=src.attributes.skinWeight.array[v*4+t];if(w>bw){bw=w;bi=src.attributes.skinIndex.array[v*4+t];}}return /Arm|Hand|Thumb|Index|Middle|Ring|Little/.test(body.skeleton.bones[bi]?.name||'');}))continue;
      for(let e=0;e<3;e++){
        const a=vs[e],b=vs[(e+1)%3],ya=p.getY(a),yb=p.getY(b);
        if((ya<=y&&yb>y)||(yb<=y&&ya>y)){
          const t=(y-ya)/(yb-ya);hits.push([p.getX(a)+(p.getX(b)-p.getX(a))*t,p.getZ(a)+(p.getZ(b)-p.getZ(a))*t]);
        }
      }
      if(hits.length===2)segments.push(hits);
    }
    for(let i=0;i<N;i++){
      const a=i/N*Math.PI*2,dx=Math.cos(a),dz=Math.sin(a);let radius=0;
      for(const [u,v] of segments){
        const ex=v[0]-u[0],ez=v[1]-u[1],det=dx*ez-dz*ex;
        if(Math.abs(det)<1e-8)continue;
        const r=(u[0]*ez-u[1]*ex)/det,t=(u[0]*dz-u[1]*dx)/det;
        if(r>0&&t>=0&&t<=1)radius=Math.max(radius,r);
      }
      // Match the previous approved silhouette (cone .135->.24, elliptical x1.08/z.94):
      // fit the body at the waist, but never exceed the old hem width lower down.
      const coneT=Math.max(0,Math.min(1,(1.075-y)/.285));
      const cone=.135+(.24-.135)*coneT;
      const priorX=cone*1.08+.012,priorZ=cone*.94+.012;
      radius=radius>0?radius+.008:Math.hypot(dx*.17,dz*.115); // follow body, never wider than the old approved cone
      verts.push(dx*radius,y,dz*radius);
    }
  }
  // A cloth wrap bridges the crotch rather than tracing two separate legs.
  for(let j=0;j<rings.length;j++){
    const row=verts.slice(j*N*3,(j+1)*N*3);let rx=0,rz=0,zc=0;
    for(let i=0;i<N;i++){rx=Math.max(rx,Math.abs(row[i*3]));rz=Math.max(rz,Math.abs(row[i*3+2]));}
    for(let i=0;i<N;i++){const a=i/N*Math.PI*2;verts[(j*N+i)*3]=Math.cos(a)*rx;verts[(j*N+i)*3+2]=Math.sin(a)*rz;}
  }
  const outer=verts.length/3;
  for(let i=0;i<outer;i++){
    const x=verts[i*3],y=verts[i*3+1],z=verts[i*3+2],r=Math.hypot(x,z);
    verts.push(x*(r-.006)/r,y,z*(r-.006)/r);
  }
  for(let j=0;j<rings.length-1;j++)for(let i=0;i<N;i++){
    const a=j*N+i,b=j*N+(i+1)%N,c=(j+1)*N+i,d=(j+1)*N+(i+1)%N;
    indices.push(a,c,b,b,c,d,outer+a,outer+b,outer+c,outer+b,outer+d,outer+c);
  }
  for(const j of [0,rings.length-1])for(let i=0;i<N;i++){
    const a=j*N+i,b=j*N+(i+1)%N;indices.push(a,b,a+outer,b,b+outer,a+outer);
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geo.setIndex(indices);geo.computeVertexNormals();
  const hip=body.skeleton.bones.findIndex(b=>b.name==='J_Bip_C_Hips'),si=[],sw=[];
  for(let i=0;i<verts.length/3;i++){si.push(hip,0,0,0);sw.push(1,0,0,0);}
  geo.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(si,4));geo.setAttribute('skinWeight',new THREE.Float32BufferAttribute(sw,4));
  const mesh=new THREE.SkinnedMesh(geo,garmentLeather());mesh.name='LeatherFittedWrap';mesh.frustumCulled=false;mesh.bind(body.skeleton,body.bindMatrix);return mesh;
}

function buildConformalWrap(bodyMesh,lower=false){
  const g=bodyMesh.geometry,pos=g.attributes.position,nor=g.attributes.normal,si=g.attributes.skinIndex.array,sw=g.attributes.skinWeight.array,idx=g.index;
  const yLo=lower?.79:1.150,yHi=lower?1.075:1.275;
  const n=idx?idx.count:pos.count;const vi=i=>idx?idx.getX(i):i;
  const verts=[],nrms=[],sidx=[],swt=[],edges=new Map();
  const addVertex=(v,offset)=>{
    const nx=nor.getX(v),ny=nor.getY(v),nz=nor.getZ(v);
    verts.push(pos.getX(v)+nx*offset,pos.getY(v)+ny*offset,pos.getZ(v)+nz*offset);nrms.push(nx,ny,nz);
    for(let k=0;k<4;k++){sidx.push(si[v*4+k]);swt.push(sw[v*4+k]);}
  };
  for(let i=0;i<n;i+=3){
    const a=vi(i),b=vi(i+1),d=vi(i+2);
    const cx=(pos.getX(a)+pos.getX(b)+pos.getX(d))/3;
    const cy=(pos.getY(a)+pos.getY(b)+pos.getY(d))/3;
    const cz=(pos.getZ(a)+pos.getZ(b)+pos.getZ(d))/3;
    const ny=Math.abs((nor.getY(a)+nor.getY(b)+nor.getY(d))/3);
    if(cy<yLo||cy>yHi)continue;
    if([a,b,d].some(v=>{let bw=-1,bi=0;for(let k=0;k<4;k++)if(sw[v*4+k]>bw){bw=sw[v*4+k];bi=si[v*4+k];}return /Arm|Hand|Thumb|Index|Middle|Ring|Little/.test(bodyMesh.skeleton.bones[bi]?.name||'');}))continue;

    for(const v of [a,b,d])addVertex(v,.006);
    for(const v of [d,b,a])addVertex(v,.003);
    for(const [u,v] of [[a,b],[b,d],[d,a]]){const key=Math.min(u,v)+':'+Math.max(u,v);const e=edges.get(key);if(e)e.count++;else edges.set(key,{u,v,count:1});}
  }
  for(const {u,v,count} of edges.values())if(count===1){
    addVertex(u,.006);addVertex(v,.006);addVertex(u,.003);
    addVertex(v,.006);addVertex(v,.003);addVertex(u,.003);
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
  geo.setAttribute('normal',new THREE.Float32BufferAttribute(nrms,3));
  geo.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(sidx,4));
  geo.setAttribute('skinWeight',new THREE.Float32BufferAttribute(swt,4));
  const m=new THREE.SkinnedMesh(geo,garmentLeather());
  m.name=lower?'LeatherBodyWrap':'LeatherBustWrap';m.frustumCulled=false;
  m.bind(bodyMesh.skeleton,bodyMesh.bindMatrix);
  return m;
}
// Closed sampled cloth bands. The skirt uses smooth oval rings rather than
// independent ray maxima, and blends both leg weights continuously at the seam.
function torsoSections(body,levels,N){
 const g=body.geometry,p=g.attributes.position,idx=g.index,si=g.attributes.skinIndex,sw=g.attributes.skinWeight;
 const excluded=v=>{let k=0,bw=-1;for(let q=0;q<4;q++)if(sw.array[v*4+q]>bw){bw=sw.array[v*4+q];k=si.array[v*4+q];}return /Arm|Hand|Thumb|Index|Middle|Ring|Little/.test(body.skeleton.bones[k]?.name||'');};
 return levels.map(y=>{
  const segments=[];
  for(let k=0;k<idx.count;k+=3){const vs=[idx.getX(k),idx.getX(k+1),idx.getX(k+2)];if(vs.some(excluded))continue;const hits=[];
   for(let q=0;q<3;q++){const a=vs[q],b=vs[(q+1)%3],ya=p.getY(a),yb=p.getY(b);if((ya<=y&&yb>y)||(yb<=y&&ya>y)){const t=(y-ya)/(yb-ya);hits.push([p.getX(a)+(p.getX(b)-p.getX(a))*t,p.getZ(a)+(p.getZ(b)-p.getZ(a))*t]);}}
   if(hits.length===2)segments.push(hits);
  }
  return Array.from({length:N},(_,i)=>{const a=i/N*Math.PI*2,dx=Math.cos(a),dz=Math.sin(a);let r=0;for(const[u,v]of segments){const ex=v[0]-u[0],ez=v[1]-u[1],det=dx*ez-dz*ex;if(Math.abs(det)<1e-8)continue;const d=(u[0]*ez-u[1]*ex)/det,t=(u[0]*dz-u[1]*dx)/det;if(d>0&&t>=0&&t<=1)r=Math.max(r,d);}return r||.1;});
 });
}
function buildClosedCloth(body,isSkirt){
 const levels=isSkirt?[1.076,1.045,1.00,.945,.89,.83,.77]:[1.278,1.25,1.215,1.18,1.145],N=64,contours=torsoSections(body,levels,N),verts=[],inds=[],skin=[],weights=[];
 const bones=body.skeleton.bones,hip=bones.findIndex(b=>b.name==='J_Bip_C_Hips'),left=bones.findIndex(b=>b.name==='J_Bip_L_UpperLeg'),right=bones.findIndex(b=>b.name==='J_Bip_R_UpperLeg');
 const p=body.geometry.attributes.position,si=body.geometry.attributes.skinIndex.array,sw=body.geometry.attributes.skinWeight.array;
 const oval=contours.map((r,j)=>{let rx=0,rz=0;for(let i=0;i<N;i++){let a=i/N*Math.PI*2;rx=Math.max(rx,Math.abs(Math.cos(a)*r[i]));rz=Math.max(rz,Math.abs(Math.sin(a)*r[i]));}return [rx,rz];});
 for(let side=0;side<2;side++)for(let j=0;j<levels.length;j++)for(let i=0;i<N;i++){
  const a=i/N*Math.PI*2,ca=Math.cos(a),sa=Math.sin(a);let radius;
  if(isSkirt){
   // All-around drape: continuous elliptical cross-section with no square corners.
   const flare=Math.max(0,(1.00-levels[j])/.23);const t=(levels[0]-levels[j])/(levels[0]-levels[levels.length-1]);
   const rx=.112+.090*t,rz=.142+.010*t;
   radius=1/Math.sqrt((ca/rx)**2+(sa/rz)**2)+Math.sin(a*10)*.0018*t;
  }else{
   // Keep the bust profile while joining the entire circumference into one cloth.
   const r=contours[j];radius=(r[(i+N-1)%N]+r[i]*2+r[(i+1)%N])/4+.013;
  }
  radius-=side?.004:0;const x=ca*radius,z=sa*radius,y=levels[j];verts.push(x,y,z);
  if(isSkirt){const w=Math.max(0,(1.00-y)/.23)*.20,wl=(ca+1)*.5;skin.push(hip,left,right,0);weights.push(1-w,w*wl,w*(1-wl),0);}
  else{
   let nearest=0,best=1e9;for(let v=0;v<p.count;v++){let bi=0,bw=-1;for(let q=0;q<4;q++)if(sw[v*4+q]>bw){bw=sw[v*4+q];bi=si[v*4+q];}if(/Arm|Hand|Thumb|Index|Middle|Ring|Little/.test(body.skeleton.bones[bi]?.name||''))continue;const d=(p.getX(v)-x)**2+(p.getY(v)-y)**2+(p.getZ(v)-z)**2;if(d<best){best=d;nearest=v;}}
   for(let q=0;q<4;q++){skin.push(si[nearest*4+q]);weights.push(sw[nearest*4+q]);}
  }
 }
 const count=N*levels.length;for(let j=0;j<levels.length-1;j++)for(let i=0;i<N;i++){const a=j*N+i,b=j*N+(i+1)%N,c=(j+1)*N+i,d=(j+1)*N+(i+1)%N;inds.push(a,c,b,b,c,d,count+a,count+b,count+c,count+b,count+d,count+c);}
 for(const j of [0,levels.length-1])for(let i=0;i<N;i++){const a=j*N+i,b=j*N+(i+1)%N;inds.push(a,b,a+count,b,b+count,a+count);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(skin,4));g.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));g.setIndex(inds);g.computeVertexNormals();const m=new THREE.SkinnedMesh(g,garmentLeather());m.userData.sections=oval;m.name=isSkirt?'LeatherOuterSkirt':'LeatherBustWrap';m.frustumCulled=false;m.bind(body.skeleton,body.bindMatrix);return m;
}
function buildGirlSkirt(body){
 // One closed waist-to-hem surface. Waist follows the actual asymmetric torso,
 // rather than a centered cylinder that floats away from the lower back.
 const levels=[1.112,1.10,1.076,1.045,1.015,.985,.95,.915,.88,.845,.81,.775],N=64;
 const sampled=torsoSections(body,levels,N),v=[],ix=[],si=[],sw=[];
 const pos=body.geometry.attributes.position,bs=body.geometry.attributes.skinIndex,bw=body.geometry.attributes.skinWeight,bones=body.skeleton.bones;
 const hip=bones.findIndex(b=>b.name==='J_Bip_C_Hips'),left=bones.findIndex(b=>b.name==='J_Bip_L_UpperLeg'),right=bones.findIndex(b=>b.name==='J_Bip_R_UpperLeg');
 const allowed=i=>{let b=0,w=-1;for(let k=0;k<4;k++)if(bw.array[i*4+k]>w){w=bw.array[i*4+k];b=bs.array[i*4+k];}return !/Arm|Hand|Thumb|Index|Middle|Ring|Little/.test(bones[b]?.name||'');};
 for(let side=0;side<2;side++)for(let j=0;j<levels.length;j++)for(let i=0;i<N;i++){
  const y=levels[j],a=i/N*Math.PI*2,ca=Math.cos(a),sa=Math.sin(a),r=sampled[j];
  let x,z;
  if(j<4){let radius=(r[(i+N-1)%N]+2*r[i]+r[(i+1)%N])/4+.007;radius-=side?.003:0;x=ca*radius;z=sa*radius;}
  else{const t=(1.045-y)/.27,rx=.12+.07*t,rz=.117+.055*t,power=3;const r=1/(Math.abs(ca/rx)**power+Math.abs(sa/rz)**power)**(1/power)-(side?.003:0);x=ca*r;z=-.025+sa*r;}
  v.push(x,y,z);
  if(j<5){let nearest=0,d=1e9;for(let k=0;k<pos.count;k++){if(!allowed(k))continue;const q=(pos.getX(k)-x)**2+(pos.getY(k)-y)**2+(pos.getZ(k)-z)**2;if(q<d){d=q;nearest=k;}}for(let q=0;q<4;q++){si.push(bs.array[nearest*4+q]);sw.push(bw.array[nearest*4+q]);}}
  else{const t=Math.max(0,(1.015-y)/.24),w=0,wl=(ca+1)/2;si.push(hip,left,right,0);sw.push(1-w,w*wl,w*(1-wl),0);}
 }
 const count=N*levels.length;for(let j=0;j<levels.length-1;j++)for(let i=0;i<N;i++){const a=j*N+i,b=j*N+(i+1)%N,c=a+N,d=b+N;ix.push(a,c,b,b,c,d,count+a,count+b,count+c,count+b,count+d,count+c);}
 for(const j of[0,levels.length-1])for(let i=0;i<N;i++){const a=j*N+i,b=j*N+(i+1)%N;ix.push(a,b,a+count,b,b+count,a+count);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(si,4));g.setAttribute('skinWeight',new THREE.Float32BufferAttribute(sw,4));g.setIndex(ix);g.computeVertexNormals();const m=new THREE.SkinnedMesh(g,garmentLeather());m.name='LeatherOuterSkirt';m.userData.drapeBase=new Float32Array(v);m.frustumCulled=false;m.bind(body.skeleton,body.bindMatrix);return m;
}
function buildGirlReferenceCloth(body,upper=false){
 // Closed-thickness garment clipped from the original fitted body surface.
 // Interpolated skin weights keep each leg attached without a rigid bridging box.
 const src=body.geometry,p=src.attributes.position,no=src.attributes.normal,si=src.attributes.skinIndex,sw=src.attributes.skinWeight,ids=src.index;
 const faces=[],edgeMap=new Map(),verts=[],normals=[],skin=[],weights=[],colours=[];
 const vertex=i=>({p:new THREE.Vector3().fromBufferAttribute(p,i),n:new THREE.Vector3().fromBufferAttribute(no,i),w:Array.from({length:4},(_,k)=>[si.array[i*4+k],sw.array[i*4+k]])});
 function mix(a,b,t){const wm=new Map();for(const [bi,w]of a.w)wm.set(bi,(wm.get(bi)||0)+w*(1-t));for(const [bi,w]of b.w)wm.set(bi,(wm.get(bi)||0)+w*t);let w=[...wm].sort((a,b)=>b[1]-a[1]).slice(0,4),total=w.reduce((a,b)=>a+b[1],0);w=w.map(([bi,v])=>[bi,v/total]);while(w.length<4)w.push([0,0]);return {p:a.p.clone().lerp(b.p,t),n:a.n.clone().lerp(b.n,t).normalize(),w};}
 function distance(v,top){if(!upper){const front=THREE.MathUtils.clamp((.025-v.p.z)/.13,0,1);return v.p.y-(top?1.040-.052*front:.815);}const front=THREE.MathUtils.clamp((.025-v.p.z)/.13,0,1),scoop=.008*Math.max(0,1-Math.abs(v.p.x)/.11)*front;const y=top?1.267+.027*front-scoop:1.202-.052*front;return v.p.y-y;}function clip(poly,top){let out=[];for(let i=0;i<poly.length;i++){let a=poly[i],b=poly[(i+1)%poly.length],da=distance(a,top),db=distance(b,top),ai=top?da<=0:da>=0,bi=top?db<=0:db>=0;if(ai)out.push(a);if(ai!==bi)out.push(mix(a,b,da/(da-db)));}return out;}
 function key(v){return v.p.toArray().map(x=>Math.round(x*1e6)).join(',');}
 const envelopeCache=new Map();function envelope(y){const key=Math.round(y*1000);if(envelopeCache.has(key))return envelopeCache.get(key);let min=0;for(let i=0;i<ids.count;i++){const vi=ids.getX(i),vy=p.getY(vi);if(Math.abs(vy-y)<.018&&Math.abs(p.getX(vi))<.125)min=Math.min(min,p.getZ(vi));}envelopeCache.set(key,min-.006);return min-.006;}
 function emit(v,offset){let q=v.p.clone().addScaledVector(v.n,offset);if(upper&&v.p.z<.018){const front=THREE.MathUtils.smoothstep(-v.p.z,-.01,.065),across=1-THREE.MathUtils.smoothstep(Math.abs(v.p.x),.025,.075);const panelZ=envelope(v.p.y);q.z=THREE.MathUtils.lerp(q.z,Math.min(q.z,panelZ-(offset-.005)),front*across);}verts.push(...q.toArray());const nn=v.n.clone();if(upper&&v.p.z<.018){const a=(1-THREE.MathUtils.smoothstep(Math.abs(v.p.x),.025,.075))*THREE.MathUtils.smoothstep(-v.p.z,-.01,.055);nn.lerp(new THREE.Vector3(v.p.x*.9,0,-1).normalize(),a).normalize();}normals.push(...nn.toArray());const grain=.97+.025*Math.sin(v.p.x*380+v.p.y*270+v.p.z*180),seam=Math.min(Math.abs(distance(v,true)),Math.abs(distance(v,false)))<.0055,stitch=seam&&(Math.floor((v.p.x+v.p.z)*240)%2===0);const tint=stitch?1.10:grain;colours.push(tint,tint*.995,tint*.98);for(const[bi,w]of v.w){skin.push(bi);weights.push(w);}}
 for(let i=0;i<ids.count;i+=3){let vs=[vertex(ids.getX(i)),vertex(ids.getX(i+1)),vertex(ids.getX(i+2))];if(vs.some(v=>v.w.some(([b,w])=>w>.4&&/Arm|Hand|Thumb|Index|Middle|Ring|Little/.test(body.skeleton.bones[b]?.name||''))))continue;let poly=clip(clip(vs,false),true);for(let k=1;k+1<poly.length;k++)faces.push([poly[0],poly[k],poly[k+1]]);}
 if(upper){
  // Extend the actual lower hem to the approved tip. Every join vertex is
  // interpolated from that hem, including its surface normal and skin weights.
  // A separate flat plate can overlap in Y and still leave a depth gap.
  // Split the base at both flap limits before sewing, so joined edges are
  // exact full edges. Partial overlap would leave internal thickness walls.
  function splitX(poly,x,left){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],da=(a.p.x-x)*(left?1:-1),db=(b.p.x-x)*(left?1:-1);if(da<=0)out.push(a);if((da<=0)!==(db<=0))out.push(mix(a,b,da/(da-db)));}return out;}
  function floorPanel(poly){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],da=a.p.y-1.185,db=b.p.y-1.185;if(da>=0)out.push(a);if((da>=0)!==(db>=0))out.push(mix(a,b,da/(da-db)));}return out;}
  const cut=[];
  for(const tri of faces){const mid=splitX(splitX(tri,-.033,false),.033,true),polys=[splitX(tri,-.033,true),tri.every(v=>v.p.z<-.06)?floorPanel(mid):mid,splitX(tri,.033,false)];for(const poly of polys)for(let k=1;k+1<poly.length;k++)cut.push([poly[0],poly[k],poly[k+1]]);}
  faces.length=0;for(const tri of cut)faces.push(tri);
  const boundary=new Map();for(const tri of faces)for(let i=0;i<3;i++){const a=tri[i],b=tri[(i+1)%3],ka=key(a),kb=key(b),k=ka<kb?ka+'|'+kb:kb+'|'+ka;const e=boundary.get(k);if(e)e.count++;else boundary.set(k,{a,b,count:1});}
  const joins=[...boundary.values()].filter(({a,b,count})=>count===1&&a.p.z<-.06&&b.p.z<-.06&&Math.abs(a.p.x)<=.033001&&Math.abs(b.p.x)<=.033001&&Math.max(a.p.y,b.p.y)<=1.185001);
  if(!joins.length)throw new Error('Girl upper hem join was not found');
  const near=joins.flatMap(e=>[e.a,e.b]).reduce((a,b)=>Math.abs(a.p.x)<Math.abs(b.p.x)?a:b),tip={p:new THREE.Vector3(0,1.120,-.143),n:new THREE.Vector3(0,0,-1),w:near.w.map(a=>[...a])};
  for(const {a,b}of joins){const n=new THREE.Vector3().subVectors(b.p,a.p).cross(new THREE.Vector3().subVectors(tip.p,a.p));faces.push(n.z<0?[a,b,tip]:[b,a,tip]);}

 }

 for(const tri of faces){for(const v of tri)emit(v,.010);for(const v of [...tri].reverse())emit(v,.005);for(let i=0;i<3;i++){let a=tri[i],b=tri[(i+1)%3],ka=key(a),kb=key(b),k=ka<kb?ka+'|'+kb:kb+'|'+ka;let e=edgeMap.get(k);if(e)e.count++;else edgeMap.set(k,{a,b,count:1});}}
 for(const {a,b,count}of edgeMap.values())if(count===1){emit(a,.010);emit(b,.010);emit(a,.005);emit(b,.010);emit(b,.005);emit(a,.005);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));g.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(skin,4));g.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));g.setAttribute('color',new THREE.Float32BufferAttribute(colours,3));let mat=garmentLeather();mat.color.setHex(0xbe8c60);mat.emissive.setHex(0x603218);mat.emissiveIntensity=.35;mat.vertexColors=true;mat.roughness=.95;const m=new THREE.SkinnedMesh(g,mat);m.name=upper?'LeatherBustWrap':'LeatherGirlShorts';m.bind(body.skeleton,body.bindMatrix);m.frustumCulled=false;return m;
}
function removeGirlCatEars(root){
  root.traverse(o=>{
    if(o.isMesh&&/_HAIR_02$/.test(o.material?.name||'')){o.visible=false;return;}
    if(!o.geometry||!/^Hair001baked/.test(o.name))return;
    o.geometry=o.geometry.clone();
    const p=o.geometry.attributes.position;
    // Flatten the pointed extension into the scalp envelope, retaining closed
    // hair topology rather than cutting holes through the crown.
    for(let i=0;i<p.count;i++){
      const x=p.getX(i),y=p.getY(i);
      if(y>1.585&&Math.abs(x)>.05)p.setY(i,Math.min(y,1.63-Math.max(0,Math.abs(x)-.03)*.4));
    }
    p.needsUpdate=true;o.geometry.computeVertexNormals();
  });
}
export function attachLeatherGarments(root,kind){
  root.traverse(o=>{if(o.isSkinnedMesh&&/_CLOTH/.test(o.material.name))o.visible=false;});
  root.updateMatrixWorld(true);
  const hips=root.getObjectByName('J_Bip_C_Hips');
  let bodyMesh=null;
  root.traverse(o=>{if(!bodyMesh&&o.isSkinnedMesh&&/_SKIN/.test(o.material.name)&&/Body/.test(o.name))bodyMesh=o;});
  if(bodyMesh){if(kind!=='girl')root.add(buildConformalWrap(bodyMesh,true));}else if(hips)worldMountOn(hips,'GarmentMount_Hips').add(buildLoincloth());
  if(kind==='girl'){
    if(bodyMesh){root.add(buildGirlReferenceCloth(bodyMesh,true));root.add(buildGirlReferenceCloth(bodyMesh));}
    removeGirlCatEars(root); // user 12:13: remove cat ears
  }
}

export function applyPrimitiveOutfit(root,look,kind){
  root.traverse(o=>{
    if(o.isSkinnedMesh&&/_CLOTH/.test(o.material.name)){o.visible=false;return;}
    if(o.isSkinnedMesh&&/_SKIN/.test(o.material.name)&&/Body/.test(o.name)){
      const base=o.material.userData.originalMap||o.material.map;
      o.material.userData.originalMap=base;
      o.material.map=composeBodyOutfit(o,base,look,kind);
      o.material.needsUpdate=true;
    }
  });
}
