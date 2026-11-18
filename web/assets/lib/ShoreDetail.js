// Private proposal: original generated tile detail, fixed geometry and world heights.
export function applyShoreDetail(T,water,horizon,rockRoot){
 const time={value:0},mat=water.material;
 const size=256,cv=document.createElement('canvas');cv.width=cv.height=size;const cx=cv.getContext('2d'),im=cx.createImageData(size,size);let seed=3619;
 function rand(){seed=(Math.imul(seed,1664525)+1013904223)|0;return(seed>>>0)/4294967296;}
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){let i=(y*size+x)*4,n=rand(),ridge=Math.sin(y*.31+Math.sin(x*.025)*2.5),g=170+n*42+ridge*3;im.data[i]=g;im.data[i+1]=g*.91;im.data[i+2]=g*.72;im.data[i+3]=Math.round(70+n*185);}
 cx.putImageData(im,0,0);for(let i=0;i<400;i++){const x=rand()*size,y=rand()*size,r=.4+rand()*1.3;cx.fillStyle=i%4?'rgba(91,76,54,.35)':'rgba(236,226,199,.6)';cx.beginPath();cx.ellipse(x,y,r,r*.65,rand()*Math.PI,0,Math.PI*2);cx.fill();}
 const sand=new T.CanvasTexture(cv);sand.wrapS=sand.wrapT=T.RepeatWrapping;sand.colorSpace=T.SRGBColorSpace;sand.anisotropy=2;
 const ground=horizon.mesh.material,previous=ground.onBeforeCompile;
 ground.onBeforeCompile=shader=>{if(previous)previous(shader);shader.uniforms.shoreSand={value:sand};shader.vertexShader='varying vec3 vShoreGround;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvShoreGround=(modelMatrix*vec4(transformed,1.)).xyz;');shader.fragmentShader='uniform sampler2D shoreSand;varying vec3 vShoreGround;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <alphamap_fragment>',`#include <alphamap_fragment>
 float beach=1.-smoothstep(1.,5.,vShoreGround.y);
 beach*=smoothstep(.01,.13,diffuseColor.r-diffuseColor.b);
 vec3 grain=texture2D(shoreSand,vShoreGround.xz*.23).rgb;
 float wet=1.-smoothstep(-.2,.85,vShoreGround.y);
 diffuseColor.rgb=mix(diffuseColor.rgb,grain*mix(.72,1.05,1.-wet),beach*.85);`);};ground.customProgramCacheKey=()=> 'shore-detail-earth-preview1';ground.needsUpdate=true;
 mat.color.setHex(0xffffff);mat.opacity=1;mat.roughness=.36;mat.metalness=.08;mat.depthWrite=false;
 mat.onBeforeCompile=shader=>{shader.uniforms.shoreHeight={value:horizon.colorMap};shader.uniforms.shoreTime=time;shader.vertexShader='varying vec2 vWaterXZ;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvWaterXZ=(modelMatrix*vec4(transformed,1.)).xz;');shader.fragmentShader='uniform sampler2D shoreHeight;uniform float shoreTime;varying vec2 vWaterXZ;\n'+shader.fragmentShader;
 shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
 float floorY=texture2D(shoreHeight,(vWaterXZ+vec2(6400.,4352.))/vec2(12800.,8704.)).a*32.-16.;
 float depth=max(0.,-floorY);
 float w1=sin(vWaterXZ.x*.72+vWaterXZ.y*.35+shoreTime*.9),w2=sin(vWaterXZ.y*1.14-vWaterXZ.x*.23-shoreTime*.7);
 float crest=pow(max(0.,w1*w2),7.);
 diffuseColor.rgb=mix(vec3(.20,.49,.48),vec3(.025,.17,.25),1.-exp(-depth*.22));
 diffuseColor.rgb+=vec3(.045,.07,.075)*crest;
 float lace=pow(max(0.,sin(vWaterXZ.x*.17+vWaterXZ.y*.31-shoreTime*.7)),14.);
 float foam=(1.-smoothstep(.06,.62,depth))*lace*.32;
 diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.77,.88,.82),foam);
 diffuseColor.a=mix(.11,.92,1.-exp(-depth*.43))+foam*.15;`);
 shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
 vec2 waveSlope=vec2(cos(vWaterXZ.x*.72+vWaterXZ.y*.35+shoreTime*.9),cos(vWaterXZ.y*1.14-vWaterXZ.x*.23-shoreTime*.7))*.10;
 normal=normalize(normal+mat3(viewMatrix)*vec3(waveSlope.x,0.,waveSlope.y));`);};mat.customProgramCacheKey=()=> 'shore-detail-water-preview1';mat.needsUpdate=true;
 if(rockRoot)rockRoot.traverse(o=>{if(!o.isMesh)return;(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.userData.shoreGrain)return;m.userData.shoreGrain=true;const before=m.onBeforeCompile;m.onBeforeCompile=shader=>{if(before)before(shader);shader.uniforms.rockGrain={value:sand};shader.vertexShader='varying vec3 vRockGrain;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvRockGrain=transformed;');shader.fragmentShader='uniform sampler2D rockGrain;varying vec3 vRockGrain;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <alphamap_fragment>',`#include <alphamap_fragment>
 float rg=texture2D(rockGrain,vRockGrain.xz*4.+vRockGrain.y*1.3).a;
 diffuseColor.rgb*=.55+rg*.95;`);};m.customProgramCacheKey=()=> 'shore-rock-grain-preview1';m.roughness=1;m.needsUpdate=true;});});
 return time;
}
