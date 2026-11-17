import * as T from './three.module.js';
const stemGeo=new T.CylinderGeometry(.025,.045,1,4),headGeo=new T.CylinderGeometry(.07,.07,.32,5),woodGeo=new T.CylinderGeometry(.12,.24,1,5),reedMat=new T.MeshStandardMaterial({color:0x59653a,roughness:1}),headMat=new T.MeshStandardMaterial({color:0x453422,roughness:1}),woodMat=new T.MeshStandardMaterial({color:0x514638,roughness:1});
export function buildWetlands(scene,cx,cz,size,height,biome,hash){
 const reeds=[],roots=[];
 for(let i=0;i<40;i++){const x=cx*size+hash(cx,cz,4100+i*3)*size,z=cz*size+hash(cx,cz,4101+i*3)*size,y=height(x,z);if(biome(x,z)!=='swamp'||y<-.8||y>1.3)continue;for(let k=0;k<5;k++)reeds.push({x:x+Math.sin(k*2.4)*.5,z:z+Math.cos(k*2.4)*.5,y:Math.max(-.15,y),h:.9+hash(cx,cz,4200+i*5+k)*1.1});if(i%6===0)roots.push({x,z,y,h:1.5+hash(cx,cz,4300+i)*2});}
 const m=new T.Matrix4(),q=new T.Quaternion(),v=new T.Vector3(),s=new T.Vector3(),meshes=[];
 for(const [geo,mat,top]of [[stemGeo,reedMat,false],[headGeo,headMat,true]]){if(!reeds.length)break;const im=new T.InstancedMesh(geo,mat,reeds.length);reeds.forEach((p,i)=>{v.set(p.x,p.y+p.h*(top?.92:.5),p.z);s.set(1,top?1:p.h,1);q.setFromAxisAngle(new T.Vector3(0,0,1),Math.sin(i)*.1);m.compose(v,q,s);im.setMatrixAt(i,m);});im.name=top?'WetlandCattails':'WetlandReeds';scene.add(im);meshes.push(im);}
 if(roots.length){const im=new T.InstancedMesh(woodGeo,woodMat,roots.length*4);roots.forEach((p,i)=>{for(let k=0;k<4;k++){const a=k*Math.PI/2;v.set(p.x+Math.sin(a)*.6,p.y+.5,p.z+Math.cos(a)*.6);q.setFromEuler(new T.Euler(Math.cos(a)*.7,0,Math.sin(a)*.7));s.set(1,p.h,1);m.compose(v,q,s);im.setMatrixAt(i*4+k,m);}});im.name='WetlandSnags';scene.add(im);meshes.push(im);}
 return meshes;
}
