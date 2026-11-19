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
 const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';
 for(let j=0;j<74;j++){const a=j*2.39996,r=Math.sqrt((j+.5)/74),x=128+Math.cos(a)*r*105,y=79+Math.sin(a)*r*66;ctx.beginPath();ctx.ellipse(x,y,13+hash(j,8)*15,10+hash(j,9)*13,a*.2,0,Math.PI*2);ctx.fill();}
 ctx.fillRect(124,114,8,142);ctx.beginPath();ctx.moveTo(128,172);ctx.lineTo(81,106);ctx.lineTo(130,148);ctx.lineTo(178,103);ctx.lineTo(130,170);ctx.fill();
 const texture=new T.CanvasTexture(canvas),mat=new T.MeshBasicMaterial({map:texture,color:0xffffff,alphaTest:.25,alphaToCoverage:true,side:T.DoubleSide});
 mat.onBeforeCompile=sh=>{sh.uniforms.forestCenter50=uniform;sh.vertexShader='varying vec2 forestPos50;\n'+sh.vertexShader;sh.vertexShader=sh.vertexShader.replace('#include <project_vertex>',`vec4 c52=modelViewMatrix*instanceMatrix*vec4(0.0,0.0,0.0,1.0);vec2 s52=vec2(length(instanceMatrix[0].xyz),length(instanceMatrix[1].xyz));vec4 mvPosition=c52+vec4(position.xy*s52,0.0,0.0);gl_Position=projectionMatrix*mvPosition;forestPos50=(modelMatrix*instanceMatrix*vec4(0.0,0.0,0.0,1.0)).xz;`);sh.fragmentShader='uniform vec2 forestCenter50;varying vec2 forestPos50;\n'+sh.fragmentShader;sh.fragmentShader=sh.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\ndiffuseColor.rgb=vec3(1.0);diffuseColor.a*=smoothstep(170.0,245.0,distance(forestPos50,forestCenter50));');};
 const all=[...green,...pine],cs=[...colors,...pc],mesh=new T.InstancedMesh(new T.PlaneGeometry(1,1),mat,all.length);all.forEach((m,i)=>{const e=m.elements,h=i<green.length?Math.hypot(e[4],e[5],e[6])/.30:Math.hypot(e[4],e[5],e[6])/.90,y=e[13]-(i<green.length?h*.72:h*.52);mesh.setMatrixAt(i,matrix(e[12],y+h*.5,e[14],h*.72,h,1,0));mesh.setColorAt(i,cs[i]);});mesh.name='DistantCanopy52';scene.add(mesh);
 return{update(x,z){uniform.value.set(x,z);},stats:{trees:trunk.length,triangles:all.length*2,pointSprites:0,draws:1},meshes:[mesh]};
}
