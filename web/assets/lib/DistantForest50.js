import * as T from './three.module.js';
// Cheap landscape-scale canopy silhouettes. Real harvestable assets stream nearby.
export async function createDistantForest50(scene,sample,height,yieldPaint){
 const d=new T.Object3D(),green=[],pine=[],trunk=[],matrix=(x,y,z,sx,sy,sz,rot)=>{d.position.set(x,y,z);d.scale.set(sx,sy,sz);d.rotation.set(0,rot,0);d.updateMatrix();return d.matrix.clone();};
 const hash=(a,b)=>{const n=Math.sin(a*127.1+b*311.7)*43758.5453;return n-Math.floor(n);};
 const colors=[],pc=[];let start=performance.now();
 for(let i=0;i<60000;i++){
  const x=(hash(i,1)-.5)*12400,z=(hash(i,2)-.5)*8200,s=sample(x,z);if(s.coastDistance<95||s.height<1.2||s.biome==='ocean'||s.biome==='desert')continue;
  if(s.biome==='volcanic'&&s.height>80||s.biome==='snow'&&s.height>300)continue;
  if(hash(i,3)>s.surface.canopy*.8)continue;
  const y=height(x,z),h=17+hash(i,4)*24,w=h*(.22+hash(i,5)*.10),rot=hash(i,6)*6.28,isPine=s.biome==='snow';
  if(isPine){pine.push(matrix(x,y+h*.52,z,w,h*.90,w,rot));pc.push(new T.Color('#d8e2df'));}
  else{green.push(matrix(x,y+h*.72,z,w*1.6,h*.30,w*1.5,rot));colors.push(new T.Color(s.biome==='volcanic'?['#984128','#b6502d','#813021'][i%3]:s.biome==='swamp'?['#50652d','#607c35','#3e592c'][i%3]:['#456f2c','#577d32','#3b652d'][i%3]));}
  trunk.push(matrix(x,y+h*.28,z,.6,h*.56,.6,rot));
  if(performance.now()-start>8){await yieldPaint();start=performance.now();}
 }
 const uniform={value:new T.Vector2()};
 const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';for(const [x,y,r]of [[32,27,22],[17,39,15],[46,38,16],[31,45,14]]){ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();}const texture=new T.CanvasTexture(canvas);
 const verts=[],cols=[];for(let i=0;i<green.length;i++){const e=green[i].elements;verts.push(e[12],e[13],e[14]);cols.push(colors[i].r,colors[i].g,colors[i].b);}for(let i=0;i<pine.length;i++){const e=pine[i].elements;verts.push(e[12],e[13],e[14]);cols.push(pc[i].r,pc[i].g,pc[i].b);}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));geo.setAttribute('color',new T.Float32BufferAttribute(cols,3));const mat=new T.PointsMaterial({map:texture,size:30,sizeAttenuation:true,alphaTest:.5,vertexColors:true});
 mat.onBeforeCompile=sh=>{sh.uniforms.forestCenter50=uniform;sh.vertexShader='varying vec2 forestPos50;\n'+sh.vertexShader;sh.vertexShader=sh.vertexShader.replace('#include <project_vertex>','#include <project_vertex>\nforestPos50=position.xz;');sh.fragmentShader='uniform vec2 forestCenter50;varying vec2 forestPos50;\n'+sh.fragmentShader;sh.fragmentShader=sh.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif(distance(forestPos50,forestCenter50)<220.0)discard;');};
 const mesh=new T.Points(geo,mat);mesh.name='DistantCanopy50';scene.add(mesh);
 return{update(x,z){uniform.value.set(x,z);},stats:{trees:trunk.length,triangles:0,pointSprites:verts.length/3,draws:1},meshes:[mesh]};
}
