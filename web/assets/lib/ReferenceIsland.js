import {landform50} from './BiomeLandforms50.js';
import {referenceRelief} from './ReferenceRelief.js';
import {referenceSurface} from './ReferenceSurface.js';
export {referenceSurface};
import {SITE_PLANS} from './ReferenceLocations.js';
import {referenceCoast} from './ReferenceCoast.js';
// Original parametric terrain layout guided by the owner's supplied map.
// Normalized coordinates: x east, z south. Coast and waterways follow the supplied image raster.
export const REFERENCE_WORLD={id:'reference-island-v1',saveKey:'oneword-save-reference-island-v1',label:'Reference Island',halfWidth:6300,halfHeight:4200};
const coast=[[-.89,-.72],[-.67,-.92],[-.36,-.85],[-.17,-.7],[.10,-.83],[.27,-.96],[.62,-.91],[.79,-.7],[.94,-.57],[.78,-.39],[.95,-.21],[.98,.17],[.85,.45],[.68,.64],[.51,.74],[.27,.67],[.07,.89],[-.16,.81],[-.37,.65],[-.66,.68],[-.83,.48],[-.97,.12],[-.91,-.28]];
const channels=[{width:.028,points:[[-.12,-.62],[-.04,-.4],[-.08,-.25],[-.25,-.16],[-.35,.02],[-.24,.19],[-.10,.37],[.03,.48],[.10,.85]]},{width:.029,points:[[.39,-.53],[.27,-.35],[.34,-.17],[.54,-.08],[.56,.10],[.43,.22],[.12,.27],[-.10,.37]]},{width:.025,points:[[-.35,.02],[-.21,-.04],[.02,-.06],[.19,.05],[.12,.27]]},{width:.022,points:[[-.73,-.2],[-.53,-.21],[-.35,.02]]}];
const islands=[[-.67,.84,.09,.065],[-.27,.88,.035,.035],[.01,.54,.095,.06],[.30,.68,.10,.18],[.61,.88,.055,.035],[.85,.72,.055,.05],[.19,.94,.032,.025],[-.9,-.86,.032,.025],[.93,-.8,.028,.03]];
function clamp(v,a=0,b=1){return Math.max(a,Math.min(b,v));}function smooth(a,b,v){let t=clamp((v-a)/(b-a));return t*t*(3-2*t);}function segment(x,z,a,b){let dx=b[0]-a[0],dz=b[1]-a[1],t=clamp(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz));return Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t);}
function signedPolygon(x,z,pts){let inside=false,d=2;for(let i=0,j=pts.length-1;i<pts.length;j=i++){let a=pts[j],b=pts[i];if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;d=Math.min(d,segment(x,z,a,b));}return inside?d:-d;}
function wave(x,z){return (Math.sin(x*89+Math.sin(z*71))*Math.sin(z*97-x*21)+Math.sin(x*171+z*137)*.3)/1.3;}
const biomePolygons={"snow": [[-0.92384, -0.74857], [-0.7639, -0.85143], [-0.68012, -0.92], [-0.61615, -0.94286], [-0.58264, -0.84914], [-0.38157, -0.936], [-0.30541, -0.86057], [-0.24296, -0.81714], [-0.18812, -0.84], [-0.15156, -0.696], [-0.18203, -0.56571], [-0.23534, -0.42171], [-0.38462, -0.39429], [-0.45621, -0.35543], [-0.63442, -0.41257], [-0.75324, -0.36229], [-0.85834, -0.43543], [-0.92384, -0.54514], [-0.86443, -0.60914], [-0.90404, -0.68229]], "volcanic": [[0.07845, -0.89714], [0.21858, -0.94286], [0.43184, -0.95429], [0.58416, -0.91543], [0.64509, -0.80343], [0.78218, -0.70286], [0.81264, -0.51543], [0.64509, -0.41029], [0.49429, -0.37371], [0.31759, -0.46286], [0.1805, -0.49486], [0.08454, -0.61143]], "swamp": [[-0.87357, -0.29143], [-0.75781, -0.33943], [-0.64204, -0.28], [-0.50495, -0.22971], [-0.42574, -0.11086], [-0.3511, 0.04], [-0.36938, 0.20686], [-0.47144, 0.27314], [-0.6329, 0.25714], [-0.76847, 0.14057], [-0.89033, 0.16571], [-0.96192, 0.00571], [-0.92384, -0.19771]], "desert": [[0.62986, -0.36686], [0.84311, -0.40571], [0.91927, -0.31429], [0.94973, 0.00571], [0.91165, 0.22286], [0.74105, 0.37829], [0.53389, 0.472], [0.50038, 0.24571], [0.39832, 0.09714], [0.46535, -0.09257], [0.52323, -0.26629]]};
const landmarkPads=[[-3780,-3150],[2750,-3070],[-20,-1280],[-4000,-420],[4640,-500]],padHeights=new Map(),siteHeights=new Map();
export function referenceSample(worldX,worldZ,noPads=false){
 let x=worldX/REFERENCE_WORLD.halfWidth,z=worldZ/REFERENCE_WORLD.halfHeight,shore=referenceCoast(worldX,worldZ),edge=shore/4200;
 const snowPeak=Math.exp(-(((x+.60)/.24)**2+((z+.75)/.21)**2)),snowRidge=Math.exp(-(((x+.39)/.20)**2+((z+.63)/.34)**2)),volcanoRadius=Math.hypot((x-.438)/.20,(z+.744)/.25),volcano=Math.exp(-(((volcanoRadius-.30)/.20)**2))*225-Math.exp(-((volcanoRadius/.13)**2))*12;
 let biome='forest';for(const b of ['snow','volcanic','desert','swamp'])if(signedPolygon(x,z,biomePolygons[b])+wave(x*2,z*2)*.006>0){biome=b;break;}
 const surface=referenceSurface(worldX,worldZ);
 let h=8+wave(x,z)*2.2+snowPeak*(220+Math.abs(wave(x*.30,z*.30))*24)+snowRidge*(120+Math.abs(wave(x*.40,z*.40))*20)+Math.max(0,volcano);
 const desertBlend=smooth(-.035,.035,signedPolygon(x,z,biomePolygons.desert));if(desertBlend>0){const dune=Math.max(0,wave(x*.38,z*.38)),desertH=8+dune*75+wave(x*2,z*2)*1.2;h=h*(1-desertBlend)+desertH*desertBlend;}
 h+=referenceRelief(worldX,worldZ,biome);
 if(biome==='swamp')h=.45+wave(x*1.7,z*1.7)*1.0;
 if(biome==='forest'&&surface.sand>.18&&shore>0&&shore<260&&referenceRelief(worldX,worldZ,biome)<25){const blend=smooth(.18,.65,surface.sand);h=h*(1-blend)+(1.4+Math.max(0,shore)*.003)*blend;}
 h=landform50(worldX,worldZ,biome,h);
 if(shore<85)h=h*smooth(0,85,shore);if(shore<0)h=-Math.min(20,-shore*.12);
 
 if(!noPads)for(let i=0;i<landmarkPads.length;i++){const p=landmarkPads[i],d=Math.hypot(worldX-p[0],worldZ-p[1]);const padOuter=i===2?65:32,padInner=i===2?44:13;if(d<padOuter){let py=padHeights.get(i);if(py===undefined){py=Math.max(2,referenceSample(p[0],p[1],true).height);padHeights.set(i,py);}h=py+(h-py)*smooth(padInner,padOuter,d);}}
 if(!noPads)for(const p of SITE_PLANS){if(p.kind==='lab')continue;const d=Math.hypot(worldX-p.x,worldZ-p.z);if(d<22){let py=siteHeights.get(p.id);if(py===undefined){py=Math.max(1.4,referenceSample(p.x,p.z,true).height);siteHeights.set(p.id,py);}h=py+(h-py)*smooth(10,22,d);}}
 let water=h<0?'sea':null;if(edge>0&&h<0)water=biome==='swamp'?'swamp':'river';
 return {surface,height:h,biome:shore>0?biome:'ocean',water,coastDistance:shore,riverDistance:Math.abs(shore)};
}
export function referenceBiome(x,z){return referenceSample(x,z).biome;}
export function referenceHeight(x,z){return referenceSample(x,z).height;}
export const REFERENCE_ANIMALS={forest:['deer','stag','wolf','bull','snake'],snow:['penguin','wolf'],desert:['camel','snake'],swamp:['snake'],volcanic:[]};
export const REFERENCE_RESOURCES={forest:['wood','stone','berries','fibre','iron'],snow:['wood','stone','iron'],desert:['stone','iron','fibre'],swamp:['wood','fibre'],volcanic:['stone','iron']};
