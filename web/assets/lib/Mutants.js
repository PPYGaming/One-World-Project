import * as T from 'three';
// Original adult horror silhouettes with covered torsos. No copied game assets.
export function mutant(kind){
 const root=new T.Group(),limbs=[];root.name='AdultMutant_'+kind;
 const skin=new T.MeshStandardMaterial({color:kind==='female'?0x817e6a:0x646b55,roughness:1,flatShading:true}),lesion=new T.MeshStandardMaterial({color:0x522d2c,roughness:1}),cloth=new T.MeshStandardMaterial({color:0x3d3630,roughness:1,side:T.DoubleSide}),bone=new T.MeshStandardMaterial({color:0xaaa18b,roughness:1}),dark=new T.MeshStandardMaterial({color:0x201d19,roughness:1}),eye=new T.MeshStandardMaterial({color:0x9c402e,emissive:0x3f100a,roughness:1});
 function ell(parent,mat,x,y,z,sx,sy,sz){const o=new T.Mesh(new T.SphereGeometry(1,9,7),mat);o.position.set(x,y,z);o.scale.set(sx,sy,sz);parent.add(o);return o;}
 function head(x,y,z,scale=1){const g=new T.Group();g.position.set(x,y,z);g.scale.setScalar(scale*.7);root.add(g);ell(g,skin,0,0,0,.17,.27,.18);ell(g,skin,0,-.18,.07,.13,.1,.14);ell(g,skin,0,-.015,.185,.035,.07,.05);for(const sign of [-1,1]){ell(g,dark,sign*.09,.025,.165,.065,.055,.035);ell(g,eye,sign*.09,.018,.195,.013,.01,.006);}ell(g,dark,0,-.15,.2,.115,.045,.02);for(let i=0;i<5;i++)ell(g,bone,(i-2)*.035,-.14,.225,.012,.022,.01);ell(g,lesion,-.12,.12,.15,.08,.11,.045);return g;}
 function shaft(parent,mat,x,y,z,r1,r2,len,angle=0){const o=new T.Mesh(new T.CylinderGeometry(r1,r2,len,7,1),mat);o.position.set(x,y,z);o.rotation.z=angle;parent.add(o);return o;}
 function limb(name,x,y,z,length,rad,rot=0){const pivot=new T.Group();pivot.name=name;pivot.position.set(x,y,z);pivot.rotation.z=rot;root.add(pivot);const arm=name.includes('Arm');
 shaft(pivot,skin,0,-length*.25,0,rad,rad*.7,length*.5);ell(pivot,lesion,.02,-length*.52,0,rad*.74,rad*.85,rad*.8);
 shaft(pivot,skin,.025,-length*.75,.035,rad*.64,rad*.43,length*.48,-.07);
 ell(pivot,skin,.04,-length,.06,rad*.63,rad*.95,arm?rad*.55:rad*1.6);
 if(arm)for(let f=0;f<4;f++){const finger=shaft(pivot,skin,.04+(f-1.5)*rad*.32,-length-rad*1.35,.065,rad*.14,rad*.08,rad*1.6,(f-1.5)*.1);ell(pivot,dark,finger.position.x,-length-rad*2.1,.085,rad*.1,rad*.3,rad*.11);}
 limbs.push({o:pivot,rot});return pivot;}
 function torso(x,y,z,w,h,d){const rings=[[0,.6],[.15,.9],[.38,.67],[.64,.83],[.83,1],[1,.48]],pos=[],idx=[];for(let j=0;j<rings.length;j++){for(let i=0;i<10;i++){const a=i/10*Math.PI*2;pos.push(x+Math.cos(a)*w*rings[j][1],y+(rings[j][0]-.5)*h,z+Math.sin(a)*d*(.85+rings[j][1]*.15));if(j<rings.length-1){const n=j*10+i,k=j*10+(i+1)%10;idx.push(n,n+10,k,k,n+10,k+10);}}}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setIndex(idx);geo.computeVertexNormals();root.add(new T.Mesh(geo,skin));}

 const wide=kind==='male'?.42:.31;torso(0,1.18,0,wide,.99,.205);ell(root,cloth,0,1.3,.015,wide*.87,.23,.21);ell(root,skin,0,.78,0,.28,.23,.22);
 // Uneven ragged skirt/shirt edges are actual geometry, kept below the torso.
 for(let i=0;i<9;i++){const a=i/9*Math.PI*2,o=new T.Mesh(new T.ConeGeometry(.09,.18+(i%3)*.06,3),cloth);o.rotation.z=Math.PI;o.position.set(Math.cos(a)*.27,.72,Math.sin(a)*.21);root.add(o);}
 for(const sign of [-1,1]){limb('Leg'+(sign+1),sign*.18,.78,0,.77,.105);limb('Arm'+(sign+1),sign*wide*.94,1.57,0,.94,.082,sign*.19);}
 if(kind==='male'){
  head(-.16,1.91,0,.95);head(.21,1.86,-.01,.8);ell(root,lesion,.15,1.52,.205,.09,.13,.008);
 }else if(kind==='female'){
  head(0,1.95,0);for(let i=0;i<7;i++)ell(root,dark,Math.cos(i)*.17,2.03+(i%2)*.04,-.11,.075,.24,.06);
  limb('RearLegL',-.25,.86,-.24,.8,.1,-.35);limb('RearLegR',.25,.86,-.24,.8,.1,.35);
 }else{
  ell(root,skin,.32,1.16,-.16,.3,.55,.23);ell(root,cloth,.32,1.3,-.15,.31,.31,.24);head(-.12,1.95,0);head(.4,1.78,-.12,.9);limb('JoinedArm',.6,1.47,-.1,.9,.13,.35);
 }
 for(let i=0;i<10;i++){const a=i*2.4;ell(root,lesion,Math.cos(a)*wide*.95,.85+(i%5)*.16,Math.sin(a)*.23,.035+(i%2)*.015,.08,.008);}
 for(let side of [-1,1])for(let j=0;j<4;j++){const wound=new T.Mesh(new T.BoxGeometry(.13,.018,.018),lesion);wound.position.set(side*(.12+j*.015),1.12+j*.09,.205);wound.rotation.z=side*.3;root.add(wound);}
 for(let j=0;j<5;j++){const tear=new T.Mesh(new T.ConeGeometry(.045,.22+(j%2)*.09,3),cloth);tear.rotation.z=Math.PI+.15;tear.position.set((j-2)*.13,1.04,.18);root.add(tear);}
 const clips=[];for(const name of ['Idle','Walk','Run','Attack','Death']){const tracks=[];limbs.forEach((l,i)=>{const times=[],vals=[];for(let k=0;k<=24;k++){const u=k/24,a=u*Math.PI*2;times.push(u);vals.push(name==='Death'?u*1.3:name==='Attack'&&l.o.name.includes('Arm')?-Math.sin(u*Math.PI)*1.5:name==='Idle'?Math.sin(a)*.025:Math.sin(a+(i%2)*Math.PI)*.4);}tracks.push(new T.NumberKeyframeTrack(l.o.name+'.rotation[x]',times,vals));});clips.push(new T.AnimationClip(name,1,tracks));}
 return {scene:root,animations:clips};
}
