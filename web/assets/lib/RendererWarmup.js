// Prepare existing materials/textures in bounded work slices before first draw.
// Geometry, source hierarchy, lights, materials and render settings stay owned by
// the caller. This only warms the renderer's normal caches.
import * as THREE from './three.module.js';
export async function warmRenderer(renderer,scene,camera,yieldPaint){
 const textures=new Set(),objects=[],seen=new Set();
 scene.traverse(function(o){
  if(!o.material)return;
  const materials=Array.isArray(o.material)?o.material:[o.material];
  materials.forEach(function(m){Object.values(m).forEach(function(v){if(v&&v.isTexture)textures.add(v);});});
  const key=materials.map(m=>m.uuid).join(',')+'-'+!!o.isSkinnedMesh+'-'+!!o.isInstancedMesh+'-'+!!o.geometry?.attributes.color+'-'+!!o.geometry?.morphAttributes.position?.length;
  if(!seen.has(key)){seen.add(key);objects.push(o);}
 });
 let sliceStart=performance.now(),sliceItems=0;
 async function yieldIfNeeded(){
  if(performance.now()-sliceStart>=8||++sliceItems>=32){await yieldPaint();sliceStart=performance.now();sliceItems=0;}
 }
 for(const texture of textures){renderer.initTexture(texture);await yieldIfNeeded();}
 // compile() in the bundled renderer is synchronous. Use a small temporary
 // scene with equivalent lights/fog and one shallow object at a time, allowing
 // a paint between groups instead of one large all-material compilation.
 const warmScene=new THREE.Scene();warmScene.fog=scene.fog;warmScene.environment=scene.environment;warmScene.background=scene.background;
 scene.traverseVisible(function(o){if(o.isLight)warmScene.add(o.clone());});
 for(const object of objects){
  const proxy=object.clone(false);warmScene.add(proxy);
  try{renderer.compile(warmScene,camera);}finally{warmScene.remove(proxy);}
  await yieldIfNeeded();
 }
 await yieldPaint();
 return {textures:textures.size,objects:objects.length};
}
