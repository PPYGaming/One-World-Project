import * as T from './three.module.js';
export async function createReferenceHorizon(scene,height,color,yieldPaint){
 const cols=100,rows=68,data=new Uint8Array(cols*rows*4),mask=new T.DataTexture(data,cols,rows,T.RGBAFormat);mask.minFilter=mask.magFilter=T.NearestFilter;mask.needsUpdate=true;
 const geo=new T.PlaneGeometry(12800,8704,192,128);geo.rotateX(-Math.PI/2);const p=geo.attributes.position,colors=[];let start=performance.now();
 for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),y=height(x,z);p.setY(i,y);colors.push(...color(x,z,y));if(i%193===0&&performance.now()-start>8){await yieldPaint();start=performance.now();}}
 geo.setAttribute('color',new T.Float32BufferAttribute(colors,3));geo.computeVertexNormals();
 const mat=new T.MeshStandardMaterial({vertexColors:true,roughness:1});mat.onBeforeCompile=shader=>{shader.uniforms.referenceLoaded={value:mask};shader.vertexShader='varying vec2 vReferenceXZ;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvReferenceXZ=(modelMatrix*vec4(transformed,1.0)).xz;');shader.fragmentShader='uniform sampler2D referenceLoaded;\nvarying vec2 vReferenceXZ;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nvec2 refCell=(floor(vReferenceXZ/128.0)+vec2(50.0,34.0)+.5)/vec2(100.0,68.0);if(texture2D(referenceLoaded,refCell).r>.5)discard;');};mat.customProgramCacheKey=()=> 'reference-horizon-v1';const mesh=new T.Mesh(geo,mat);mesh.name='ReferenceIslandDistantTerrain';scene.add(mesh);
 function mark(cx,cz,on){const x=cx+50,z=cz+34;if(x<0||x>=cols||z<0||z>=rows)return;const i=(z*cols+x)*4;data[i]=on?255:0;data[i+3]=255;mask.needsUpdate=true;}
 return {mesh,mark};
}
