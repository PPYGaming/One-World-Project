import {referenceSample,referenceHeight,referenceBiome} from './ReferenceIsland.js';
import {SITE_PLANS} from './ReferenceLocations.js';
var WORLD_SEED=20261115;
var perm = new Uint8Array(512);
(function(){ var p=[]; for(var i=0;i<256;i++) p[i]=i; var s=9871;
  function rnd(){ s = (s*16807)%2147483647; return s/2147483647; }
  for(var i=255;i>0;i--){ var j=(rnd()*(i+1))|0, t=p[i]; p[i]=p[j]; p[j]=t; }
  for(var i=0;i<512;i++) perm[i]=p[i&255]; })();
function fade(t){ return t*t*(3-2*t); }
function noise2(x, y){
  var X=Math.floor(x)&255, Y=Math.floor(y)&255, xf=x-Math.floor(x), yf=y-Math.floor(y);
  function h(i,j){ return perm[(perm[(X+i)&255]+Y+j)&255]/255; }
  var u=fade(xf), v=fade(yf);
  return (h(0,0)*(1-u)+h(1,0)*u)*(1-v) + (h(0,1)*(1-u)+h(1,1)*u)*v;
}
function fbm(x, y, oct){ var a=0, amp=1, f=1, n=0; for(var i=0;i<oct;i++){ a+=noise2(x*f,y*f)*amp; n+=amp; amp*=0.5; f*=2.1; } return a/n; }


function hash3(a, b, c){
  var h = (Math.imul(a|0, 374761393) ^ Math.imul(b|0, 668265263) ^ Math.imul(c|0, 974711) ^ WORLD_SEED) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
var QUALITY = {
  low:    { loadR: 1, trees: 22, grass: 18, bushes: 20 },
  medium: { loadR: 2, trees: 52, grass: 135, bushes: 80 },
  high:   { loadR: 3, trees: 76, grass: 200, bushes: 120 }
};
function forestScore(x, z){
  var r = Math.sqrt(x*x + z*z);
  return forestNoise(x, z) + Math.max(0, 0.55 - r/1600); // spawn ring is always dense forest
}
function forestNoise(x, z){ return fbm(x*0.018+31.7, z*0.018+17.2, 3); }
const beacons=[[-3780,-3150],[2750,-3070],[-20,-1280],[-4000,-420],[4640,-500]];
function clear(x,z){return SITE_PLANS.some(p=>Math.abs(p.x-x)<(p.kind==='lab'?25:9)&&Math.abs(p.z-z)<(p.kind==='lab'?23:8));}
const cache=new Map();
export function legacyTreeCandidates(key){
 if(cache.has(key))return cache.get(key);
 const a=String(key).split(','),cx=Number(a[0]),cz=Number(a[1]),group=a[2],index=Number(a[3]);
 if(a.length!==4||!Number.isInteger(cx)||!Number.isInteger(cz)||!['NF','NH','PF'].includes(group)||!Number.isInteger(index)||index<0)return [];
 const results=new Map(),bx=cx*128+64,bz=cz*128+64,bio=referenceBiome(bx,bz),belt=forestScore(bx,bz)>.55;
 for(const near of [true,false]){
  // High is a superset of low/medium: accepted candidates and indices are identical prefixes.
  let target=Math.round((near?76:76*.7)*(belt?1.6:1));
  if(bio==='ocean')target=0;if(bio==='volcanic')target=referenceHeight(bx,bz)>85?0:Math.round(target*.65);if(bio==='desert')target=Math.round(target*.04);
  const counts={};
  for(let i=0;i<target;i++){
   const x=cx*128+hash3(cx,cz,i*7+1)*128,z=cz*128+hash3(cx,cz,i*7+2)*128,y=referenceHeight(x,z);
   if((y<.5&&!(bio==='swamp'&&y>.12))||clear(x,z)||beacons.some(b=>Math.hypot(x-b[0],z-b[1])<25)||forestScore(x,z)<.15||y<(bio==='swamp'?.12:1.2)||(bio==='volcanic'&&y>85))continue;
   const slope=Math.max(Math.abs(referenceHeight(x+.6,z)-y),Math.abs(referenceHeight(x,z+.6)-y))/.6;if(slope>1.2)continue;
   const hero=near&&hash3(cx,cz,i*7+6)<.15,k=bio==='snow'?'PF':hero?'NH':i%2===0?'NF':'PF',n=counts[k]||0;counts[k]=n+1;
   if(k===group&&n===index)results.set(i,{key:cx+','+cz+',tree,'+i,x,z,candidate:i,near});
  }
 }
 const out=[...results.values()];cache.set(key,out);return out;
}

// Retain 37's generator for existing saves. Identity is assigned before new surface safety checks.
export function legacyTrees(cx,cz,near,quality){
 const bx=cx*128+64,bz=cz*128+64,bio=referenceBiome(bx,bz),belt=forestScore(bx,bz)>.55,qt=QUALITY[quality]||QUALITY.medium;
 let target=Math.round((near?qt.trees:qt.trees*.7)*(belt?1.6:1));
 if(bio==='ocean')target=0;if(bio==='volcanic')target=referenceHeight(bx,bz)>85?0:Math.round(target*.65);if(bio==='desert')target=Math.round(target*.04);
 const counts={},out=[];
 for(let i=0;i<target;i++){
 const x=cx*128+hash3(cx,cz,i*7+1)*128,z=cz*128+hash3(cx,cz,i*7+2)*128,y=referenceHeight(x,z);
 if((y<.5&&!(bio==='swamp'&&y>.12))||clear(x,z)||beacons.some(b=>Math.hypot(x-b[0],z-b[1])<25)||forestScore(x,z)<.15||y<(bio==='swamp'?.12:1.2)||(bio==='volcanic'&&y>85))continue;
 const slope=Math.max(Math.abs(referenceHeight(x+.6,z)-y),Math.abs(referenceHeight(x,z+.6)-y))/.6;if(slope>1.2)continue;
 const hero=near&&hash3(cx,cz,i*7+6)<.15,k=bio==='snow'?'PF':hero?'NH':i%2===0?'NF':'PF',n=counts[k]||0;counts[k]=n+1;
 out.push({x,z,k,i,key:[cx,cz,k,n].join(',')});
 }
 return out;
}
