'use strict';
// Placement is a preview until the caller saves a successful consume-and-place transaction.
(function(root){
 const items=Object.freeze({campfire:{name:'Campfire Kit',icon:'fire',radius:.95,width:1.9,depth:1.9},bed:{name:'Bedroll Kit',icon:'bed',radius:1.15,width:.95,depth:2},bench:{name:'Workbench Kit',icon:'bench',radius:1.1,width:1.9,depth:.9},furnace:{name:'Furnace Kit',icon:'furnace',radius:.9,width:1.44,depth:1.44},anvil:{name:'Anvil Kit',icon:'anvil',radius:.75,width:1,depth:.65}});
 function candidate(kind,pose,env){
  const spec=items[kind];
  if(!spec||!pose||![pose.x,pose.z,pose.rotY].every(Number.isFinite))return {valid:false,reason:'Invalid placement'};
  const x=pose.x+Math.sin(pose.rotY)*2.8,z=pose.z+Math.cos(pose.rotY)*2.8,rot=pose.rotY;
  const out={kind,x,z,rot,y:0,valid:false,reason:''};
  if(env.exists&&env.exists(kind)){out.reason='Already placed';return out;}
  if(!env.hasItem(spec.name)){out.reason='Item no longer in bag';return out;}
  if(env.blocked&&env.blocked()){out.reason='Cannot place right now';return out;}
  const samples=[[0,0]];
  for(const dx of [-spec.width/2,spec.width/2])for(const dz of [-spec.depth/2,spec.depth/2])samples.push([dx*Math.cos(rot)+dz*Math.sin(rot),-dx*Math.sin(rot)+dz*Math.cos(rot)]);
  const heights=[];
  for(const [dx,dz] of samples){
   const sx=x+dx,sz=z+dz;
   if(env.ready&&!env.ready(sx,sz)){out.reason='Ground is loading';return out;}
   const y=env.ground(sx,sz);if(!Number.isFinite(y)){out.reason='Ground unavailable';return out;}heights.push(y);
   if(y<1||env.water&&env.water(sx,sz)>0){out.y=heights[0];out.reason='Need dry ground';return out;}
  }
  out.y=heights[0];
  if(Math.max(...heights)-Math.min(...heights)>.42||env.slope&&env.slope(x,z)>1.1){out.reason='Need flatter ground';return out;}
  if(!env.clear(x,z,spec.radius)){out.reason='Too close to trees, rocks or structures';return out;}
  out.valid=true;return out;
 }
 function consume(inventory,kind){const spec=items[kind];if(!spec)return null;const i=inventory.findIndex(v=>v.name===spec.name&&Number.isSafeInteger(v.qty)&&v.qty>0);if(i<0)return null;const next=inventory.map(v=>({...v}));if(--next[i].qty===0)next.splice(i,1);return next;}
 root.Placement56={items,candidate,consume};
})(typeof window==='object'?window:globalThis);
