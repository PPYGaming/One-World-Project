import * as T from 'three';
// Original compact meshes. No third-party geometry or textures.
export function wildlife(kind){
 const root=new T.Group(),legs=[];const mats={sand:new T.MeshStandardMaterial({color:0xb59363,roughness:1}),dark:new T.MeshStandardMaterial({color:0x252e32,roughness:1}),white:new T.MeshStandardMaterial({color:0xe2ded1,roughness:1}),beak:new T.MeshStandardMaterial({color:0xc8924f,roughness:1}),eye:new T.MeshStandardMaterial({color:0x111513,roughness:1})};
 function oval(parent,mat,x,y,z,sx,sy,sz){const m=new T.Mesh(new T.SphereGeometry(1,12,10),mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);parent.add(m);return m;}
 function limb(x,y,z,len,r,mat){const pivot=new T.Group();pivot.position.set(x,y,z);root.add(pivot);const m=new T.Mesh(new T.CylinderGeometry(r*.75,r,len,7),mat);m.position.y=-len/2;pivot.add(m);legs.push(pivot);pivot.name='Leg'+legs.length;return pivot;}
 if(kind==='penguin'){
  oval(root,mats.dark,0,.52,0,.24,.43,.21);oval(root,mats.white,0,.49,.13,.18,.31,.1);oval(root,mats.dark,0,.91,.03,.17,.17,.17);oval(root,mats.white,0,.87,.16,.12,.1,.04);
  for(const sign of [-1,1]){const wing=oval(root,mats.dark,sign*.245,.56,0,.06,.26,.12);wing.rotation.z=sign*.22;const foot=limb(sign*.12,.14,.02,.08,.035,mats.beak);oval(foot,mats.beak,0,-.07,.06,.08,.035,.13);oval(root,mats.eye,sign*.12,.94,.145,.022,.022,.018);}
  const beak=new T.Mesh(new T.ConeGeometry(.07,.2,6),mats.beak);beak.rotation.x=Math.PI/2;beak.position.set(0,.9,.25);root.add(beak);
 }else{
  oval(root,mats.sand,0,1.45,0,.44,.57,.87);oval(root,mats.sand,0,1.97,-.05,.32,.38,.43);
  const neck=oval(root,mats.sand,0,1.95,.76,.21,.71,.22);neck.rotation.x=.3;oval(root,mats.sand,0,2.55,1,.22,.27,.33);oval(root,mats.sand,0,2.43,1.25,.23,.17,.27);
  for(const x of [-.3,.3])for(const z of [-.57,.57]){const l=limb(x,1.38,z,1.14,.08,mats.sand);oval(l,mats.dark,0,-1.15,.06,.11,.07,.17);oval(l,mats.sand,0,-.59,0,.1,.12,.09);}
  for(const sign of [-1,1]){oval(root,mats.sand,sign*.2,2.7,.9,.075,.14,.1);oval(root,mats.eye,sign*.2,2.6,1.13,.025,.025,.02);}
  const tail=oval(root,mats.sand,0,1.4,-.98,.06,.39,.07);tail.rotation.x=-.18;oval(root,mats.dark,0,1.03,-1.05,.07,.12,.07);
 }
 const clips=[];for(const name of ['Idle','Walk','Run','Death']){const tracks=[];legs.forEach((l,i)=>{const v=[],time=[];for(let k=0;k<=24;k++){const t=k/24;time.push(t);v.push(name==='Idle'?0:name==='Death'?Math.PI*.3:Math.sin(t*Math.PI*2+(i%2)*Math.PI)*(kind==='penguin'?.3:.45));}tracks.push(new T.NumberKeyframeTrack(l.name+'.rotation[x]',time,v));});clips.push(new T.AnimationClip(name,1,tracks));}
 return {scene:root,animations:clips};
}
