import * as T from './three.module.js';
// Original lab mutation layered on the project's licensed animated wolf base.
export function referenceMutantAnimal(source,clone,normalize){
 const body=clone(source.scene),root=new T.Group();root.name='LabSixLeggedCanid';root.add(body);normalize(body,1.15);
 body.traverse(o=>{if(o.isMesh){o.material=(Array.isArray(o.material)?o.material:[o.material]).map(m=>{const n=m.clone();n.color.multiply(new T.Color(0xbba998));return n;});if(o.material.length===1)o.material=o.material[0];}});
 const head=body.getObjectByName('Head');if(head)head.scale.multiply(new T.Vector3(1.3,.9,1.16));
 const skin=new T.MeshStandardMaterial({color:0x8c6e60,roughness:1}),bone=new T.MeshStandardMaterial({color:0xc6bba0,roughness:1}),scar=new T.MeshStandardMaterial({color:0x63443a,roughness:1});
 const legs=[];for(const sign of [-1,1]){const pivot=new T.Group();pivot.name=sign<0?'ExtraForeL':'ExtraForeR';pivot.position.set(sign*.17,.55,-.1);root.add(pivot);legs.push(pivot);const a=new T.Mesh(new T.CylinderGeometry(.045,.065,.36,6),skin);a.position.set(sign*.05,-.16,.02);a.rotation.z=sign*.25;pivot.add(a);const b=new T.Mesh(new T.CylinderGeometry(.028,.045,.3,6),skin);b.position.set(sign*.08,-.45,.08);b.rotation.x=-.25;pivot.add(b);const paw=new T.Mesh(new T.BoxGeometry(.13,.07,.2),scar);paw.position.set(sign*.08,-.60,.15);pivot.add(paw);}
 for(let i=0;i<6;i++){const spur=new T.Mesh(new T.ConeGeometry(.045,.18+(i%3)*.07,5),bone);spur.position.set(0,.85+Math.sin(i*.6)*.08,-.46+i*.16);spur.rotation.x=-.3;root.add(spur);}
 const animations=source.animations.map(clip=>{const tracks=clip.tracks.map(t=>t.clone());for(let i=0;i<legs.length;i++){const times=[],values=[];for(let k=0;k<=24;k++){const u=k/24;times.push(u*clip.duration);values.push(/Death/.test(clip.name)?u*.7:/Idle/.test(clip.name)?Math.sin(u*Math.PI*2)*.02:Math.sin(u*Math.PI*2+i*Math.PI)*.5);}tracks.push(new T.NumberKeyframeTrack(legs[i].name+'.rotation[x]',times,values));}return new T.AnimationClip(clip.name,clip.duration,tracks);});
 return {scene:root,animations};
}
