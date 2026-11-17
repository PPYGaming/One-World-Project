import * as T from './three.module.js';
import {SAFE_AREAS,LAB,SITE_PLANS} from './ReferenceLocations.js';
export {SAFE_AREAS,LAB,SITE_PLANS};
export function createReferenceSites(scene,height){
 const active=new Map(),colliders=[];let lootClock=0,lootTaken={};
 const stone=new T.MeshStandardMaterial({color:0x737b77,roughness:1}),wood=new T.MeshStandardMaterial({color:0x685642,roughness:1}),rust=new T.MeshStandardMaterial({color:0x65594c,roughness:1}),tarp=new T.MeshStandardMaterial({color:0x626e54,roughness:1,side:T.DoubleSide});
 function surfaceTexture(wooden){const cv=document.createElement('canvas');cv.width=cv.height=256;const c=cv.getContext('2d');c.fillStyle=wooden?'#8a765e':'#a5a89e';c.fillRect(0,0,256,256);let seed=wooden?31:47;function rnd(){seed=(Math.imul(seed,1664525)+1013904223)|0;return (seed>>>0)/4294967296;}for(let i=0;i<1800;i++){c.fillStyle='rgba(30,28,22,'+(rnd()*.15)+')';const x=rnd()*256,y=rnd()*256;c.fillRect(x,y,wooden?2+rnd()*35:1+rnd()*4,wooden?1:1+rnd()*4);}c.strokeStyle=wooden?'#443b3080':'#555e5566';c.lineWidth=1;for(let i=0;i<(wooden?8:15);i++){c.beginPath();let x=wooden?0:rnd()*256,y=wooden?i*32:rnd()*256;c.moveTo(x,y);for(let j=0;j<5;j++){x+=wooden?52:rnd()*18-4;y+=wooden?rnd()*2-1:rnd()*12;c.lineTo(x,y);}c.stroke();}const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;return t;}
 stone.map=surfaceTexture(false);wood.map=surfaceTexture(true);stone.color.setHex(0xa3aaa0);wood.color.setHex(0x9c8871);
 const screen=new T.MeshStandardMaterial({color:0x273a37,roughness:.9}),steel=new T.MeshStandardMaterial({color:0x49544e,roughness:.9,metalness:.25}),glass=new T.MeshStandardMaterial({color:0x698b80,roughness:.6});
 const box=new T.BoxGeometry(1,1,1),post=new T.CylinderGeometry(.15,.21,1,6),crystalGeo=new T.CylinderGeometry(0,.8,3,5);
 function build(plan){const g=new T.Group();g.name='ReferenceSite_'+plan.id;g.position.set(plan.x,height(plan.x,plan.z),plan.z);const cols=[];
  function block(mat,x,y,z,w,h,d,solid=true,angle=0){const m=new T.Mesh(box,mat);m.position.set(x,y,z);m.scale.set(w,h,d);m.rotation.y=angle;g.add(m);m.userData.cameraSolid=y>.3;if(solid)cols.push({x:plan.x+x,z:plan.z+z,halfX:w/2,halfZ:d/2,r:.3,h});return m;}
  function beam(x,z,h){const m=new T.Mesh(post,wood);m.scale.y=h;m.position.set(x,h/2,z);g.add(m);m.userData.cameraSolid=true;cols.push({x:plan.x+x,z:plan.z+z,r:.3,h});}
  function crate(x,z){block(wood,x,.55,z,1.2,1.1,1.1);for(const sign of [-1,1])block(rust,x+sign*.5,.56,z,.08,1.13,1.14,false);}
  if(plan.kind==='lab'){
   // Open, original low-rise concrete ruins. Door and corridor gaps remain walkable.
   block(stone,0,.15,0,32,.3,25,false);for(const x of [-15,15])block(stone,x,3,0,.5,6,24);block(stone,0,3,-12,30,6,.5);
   for(const x of [-10,10])block(stone,x,3,12,10,6,.5);for(const x of [-7,7])block(stone,x,2,-3,.35,4,13);block(stone,0,4.8,-8,29,.4,8,false);
   for(let i=0;i<6;i++){block(stone,-11+i*4,1.2,-7,2.2,2.2,1.3);block(rust,-10+i*3.5,.6,3,1.5,1.2,.9);}
   for(let i=0;i<8;i++)block(stone,-19+(i%4)*12,.5,17+Math.floor(i/4)*5,2,.7,1.5,true,i*.4);
   const sign=new T.Mesh(new T.PlaneGeometry(8,1.8),new T.MeshStandardMaterial({color:0x40554f,roughness:1}));sign.position.set(0,5.4,12.28);g.add(sign);
   for(let i=0;i<4;i++)crate(-10+i*6,-1);
   // Benches, dead terminals and storage racks identify the abandoned lab in-world.
   for(const x of [-11,11])for(const z of [-7,1]){block(steel,x,1.05,z,2.8,.12,1.2);for(const dx of [-1.15,1.15])block(steel,x+dx,.5,z,.08,1,.9);block(screen,x,1.55,z-.25,.9,.65,.12);block(rust,x,1.20,z+.25,.85,.05,.35,false);for(let ti=0;ti<3;ti++)block(glass,x-1+ti*.17,1.3,z,.07,.4,.07,false);}
   for(const x of [-14.5,14.5]){block(steel,x,3,-3,.14,.14,16,false);block(rust,x,1.5,-10,.2,3,.2,false);}
   for(let i=0;i<7;i++){const chip=block(stone,-14+i*4.3,.34,10+(i%2)*3,1.5,.2,.9,false,i*.7);chip.rotation.z=.05;}
   const labelCanvas=document.createElement('canvas');labelCanvas.width=512;labelCanvas.height=96;const lc=labelCanvas.getContext('2d');lc.fillStyle='#34433e';lc.fillRect(0,0,512,96);lc.fillStyle='#c2c7b4';lc.font='bold 34px sans-serif';lc.textAlign='center';lc.fillText('RESEARCH ANNEX',256,43);lc.font='18px sans-serif';lc.fillText('FIELD STATION 04',256,73);const labelMat=new T.MeshStandardMaterial({map:new T.CanvasTexture(labelCanvas),roughness:1});const labelMesh=new T.Mesh(new T.PlaneGeometry(7.7,1.45),labelMat);labelMesh.position.set(0,5.4,12.30);g.add(labelMesh);

  }else if(plan.kind==='camp'){
   if(plan.id.indexOf('refuge')===0){const green=new T.MeshBasicMaterial({color:0x7aff49,transparent:true,opacity:.7,depthWrite:false});const ring=new T.Mesh(new T.TorusGeometry(4,.1,5,32),green);ring.rotation.x=Math.PI/2;ring.position.y=.12;g.add(ring);const beam=new T.Mesh(new T.CylinderGeometry(.12,.4,30,6,1,true),green);beam.position.set(5,15,0);g.add(beam);}

   for(const x of [-2.5,2.5]){beam(x,-2,3.2);beam(x,2,2.1);}const roof=block(tarp,0,2.8,0,5.8,.09,5,false);roof.rotation.x=.22;crate(3.6,1);block(wood,-3.6,.4,0,1,.7,3);block(tarp,0,.08,.5,1.2,.12,2.5,false);
  }else if(plan.kind==='hut'){
   block(wood,0,.2,0,7,.4,6,false);for(const x of [-3.3,3.3]){beam(x,-2.8,3.2);beam(x,2.8,3.2);}for(let i=0;i<8;i++)block(wood,-3+i*.85,1.5,-2.8,.73,2.6,.15);block(wood,-3.3,1.5,0,.16,2.6,5.7);block(wood,3.3,1.5,0,.16,2.6,5.7);const roof=block(wood,0,3.3,-.2,7.4,.2,6.4,false);roof.rotation.z=.07;crate(1,-1);for(let pi=0;pi<8;pi++){const plank=block(wood,-3.0+pi*.86,.44,0,.79,.08,5.6,false);if(pi===2||pi===5)plank.rotation.y=.025;}block(wood,0,.1,3.3,2,.2,.6,false);block(wood,0,.025,3.8,2.3,.08,.6,false);for(const x of [-1.6,1.6])block(wood,x,1.4,2.8,2,.15,.15);
  }else{for(let i=0;i<5;i++)block(stone,-4+i*2,1+(i%2),Math.sin(i)*2,1.4,2+(i%2)*2,1.2);crate(0,3);}
  const loot=new T.Group();loot.name='AbandonedSupplies';loot.position.set(0,.1,plan.kind==='lab'?9:3.4);
  const bottle=new T.Mesh(new T.CylinderGeometry(.10,.12,.42,8),new T.MeshStandardMaterial({color:0x7aa7a7,roughness:.45}));bottle.position.set(-.45,.24,0);loot.add(bottle);const cap=new T.Mesh(new T.CylinderGeometry(.07,.07,.07,8),rust);cap.position.set(-.45,.49,0);loot.add(cap);
  const bandage=new T.Mesh(new T.CylinderGeometry(.12,.12,.25,10),new T.MeshStandardMaterial({color:0xe0d8be,roughness:1}));bandage.rotation.z=Math.PI/2;bandage.position.set(0,.15,0);loot.add(bandage);const tin=new T.Mesh(new T.CylinderGeometry(.13,.13,.18,8),rust);tin.position.set(.4,.12,0);loot.add(tin);g.add(loot);loot.visible=available(plan.id);g.userData.loot=loot;
  g.userData.plan=plan;g.userData.colliders=cols;scene.add(g);return g;
 }
 const sharedGeometry=new Set([box,post]),sharedMaterial=new Set([stone,wood,rust,tarp,screen,steel,glass]);
 function destroy(g){g.traverse(o=>{if(!o.isMesh)return;if(!sharedGeometry.has(o.geometry))o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material])if(!sharedMaterial.has(m)){if(m.map)m.map.dispose();m.dispose();}});scene.remove(g);}
 function update(x,z){for(const p of SITE_PLANS){const near=Math.hypot(x-p.x,z-p.z)<520;if(near&&!active.has(p.id))active.set(p.id,build(p));else if(!near&&active.has(p.id)){destroy(active.get(p.id));active.delete(p.id);}}colliders.length=0;for(const g of active.values())colliders.push(...g.userData.colliders);}
 function cameraSolids(){const out=[];for(const g of active.values())g.traverse(o=>{if(o.isMesh&&o.userData.cameraSolid)out.push(o);});return out;}
 function floorAt(x,z){let y=-Infinity;for(const g of active.values()){const p=g.userData.plan,dx=Math.abs(x-p.x),dz=Math.abs(z-p.z);if(p.kind==='lab'&&dx<16&&dz<12.5)y=Math.max(y,g.position.y+.30);if(p.kind==='hut'&&dx<3.5&&dz<3)y=Math.max(y,g.position.y+.44);}return y;}
 function available(id){return lootTaken[id]===undefined||lootClock-lootTaken[id]>=6000;}
 function lootState(clock,taken){lootClock=clock;lootTaken=taken;for(const [id,g]of active)g.userData.loot.visible=available(id);}
 function nearestLoot(x,z){let hit=null,d=2.8;for(const [id,g]of active){if(!available(id))continue;const p=g.userData.loot.position,dist=Math.hypot(x-g.position.x-p.x,z-g.position.z-p.z);if(dist<d){d=dist;hit={id,x:g.position.x+p.x,z:g.position.z+p.z};}}return hit;}
 function collect(id){if(!available(id)||!active.has(id))return false;lootTaken[id]=lootClock;active.get(id).userData.loot.visible=false;return true;}
 function solve(x,z,r){for(const c of colliders){if(c.halfX){const qx=Math.max(c.x-c.halfX,Math.min(c.x+c.halfX,x)),qz=Math.max(c.z-c.halfZ,Math.min(c.z+c.halfZ,z)),dx=x-qx,dz=z-qz,d=Math.hypot(dx,dz);if(d<r){if(d>.00001){x+=dx/d*(r-d);z+=dz/d*(r-d);}else{const left=Math.abs(x-(c.x-c.halfX-r)),right=Math.abs(x-(c.x+c.halfX+r)),top=Math.abs(z-(c.z-c.halfZ-r)),bottom=Math.abs(z-(c.z+c.halfZ+r)),v=Math.min(left,right,top,bottom);if(v===left)x=c.x-c.halfX-r;else if(v===right)x=c.x+c.halfX+r;else if(v===top)z=c.z-c.halfZ-r;else z=c.z+c.halfZ+r;}}}else{let dx=x-c.x,dz=z-c.z,d=Math.hypot(dx,dz),rr=r+c.r;if(d<rr){if(d<.00001){dx=1;dz=0;d=1;}x=c.x+dx/d*rr;z=c.z+dz/d*rr;}}}return [x,z];}
 return {update,solve,colliders,active,plans:SITE_PLANS,floorAt,cameraSolids,lootState,nearestLoot,collect};
}
