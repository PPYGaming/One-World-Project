'use strict';
// Private preparation only. Elapsed time is explicit active-game time, never wall-clock.
const copy=o=>JSON.parse(JSON.stringify(o));
function add(items,item,cap=200,max=999){
 if(!item||!Number.isSafeInteger(item.qty)||item.qty<1||!Number.isSafeInteger(cap)||cap<1||!Number.isSafeInteger(max)||max<1)return null;
 const out=copy(items);let left=item.qty;if(item.name==='Waterskin'){if(out.length+left>cap)return null;while(left--)out.push({...item,qty:1,filled:false,icon:'waterskinempty'});return out;}
 for(const it of out){if(it.name!==item.name||it.qty>=max)continue;const n=Math.min(left,max-it.qty);it.qty+=n;left-=n;if(!left)return out;}
 while(left&&out.length<cap){const n=Math.min(left,max);out.push({...item,qty:n});left-=n;}
 return left?null:out;
}
function remove(items,cost){const out=copy(items);for(const [name,amount]of Object.entries(cost)){if(!Number.isSafeInteger(amount)||amount<1)return null;let left=amount;for(let i=out.length-1;i>=0&&left;i--){if(out[i].name!==name)continue;let n=Math.min(left,out[i].qty);left-=n;out[i].qty-=n;if(!out[i].qty)out.splice(i,1);}if(left)return null;}return out;}
function create(id,kind){return {schema:1,id,kind,revision:0,queue:[],output:[],next:1};}
function enqueue(state,inventory,recipe,count,context){
 if(!context||context.id!==state.id||context.kind!==state.kind||recipe.station!==state.kind)return {ok:false,reason:'Visit this station'};
 if(!Number.isSafeInteger(count)||count<1||count>99||state.queue.length+count>99||!Number.isFinite(recipe.seconds)||recipe.seconds<=0)return {ok:false,reason:'Invalid queue'};
 let next=copy(inventory);for(let i=0;i<count;i++){next=remove(next,recipe.cost);if(!next)return {ok:false,reason:'Missing materials'};}
 const s=copy(state);for(let i=0;i<count;i++)s.queue.push({id:s.id+':'+s.next++,name:recipe.name,icon:recipe.icon,seconds:recipe.seconds,remaining:recipe.seconds});
 s.revision=state.revision+1;return {ok:true,state:s,inventory:next,expectedRevision:state.revision,expectedInventory:JSON.stringify(inventory)};
}
function advance(state,seconds){
 if(!Number.isFinite(seconds)||seconds<0)return copy(state);const s=copy(state);let left=seconds;
 while(s.queue.length&&left>=0){const q=s.queue[0];if(left<q.remaining){q.remaining-=left;break;}left-=q.remaining;s.queue.shift();let o=s.output.find(x=>x.name===q.name&&x.icon===q.icon);if(o)o.qty++;else s.output.push({name:q.name,icon:q.icon,qty:1});if(left===0)break;}
 if(JSON.stringify(s)!==JSON.stringify(state))s.revision=state.revision+1;return s;
}
function claim(state,inventory,name,context,cap=200,max=999){
 if(!context||context.id!==state.id||context.kind!==state.kind)return {ok:false,reason:'Visit this station'};
 const item=state.output.find(x=>x.name===name);if(!item)return {ok:false,reason:'Nothing to collect'};
 const next=add(inventory,item,cap,max);if(!next)return {ok:false,reason:'Inventory is full'};
 const s=copy(state);s.output=s.output.filter(x=>x!==s.output.find(y=>y.name===name));s.revision=state.revision+1;return {ok:true,state:s,inventory:next,expectedRevision:state.revision,expectedInventory:JSON.stringify(inventory)};
}
function encode(state){return JSON.stringify(state);}
function decode(text){const s=JSON.parse(text);if(s.schema!==1||!Number.isSafeInteger(s.revision)||s.revision<0||typeof s.id!=='string'||typeof s.kind!=='string'||!Number.isSafeInteger(s.next)||s.next<1||!Array.isArray(s.queue)||s.queue.length>99||!Array.isArray(s.output))throw Error('Invalid station save');for(const q of s.queue)if(typeof q.id!=='string'||typeof q.name!=='string'||!Number.isFinite(q.remaining)||q.remaining<=0||!Number.isFinite(q.seconds)||q.seconds<q.remaining)throw Error('Invalid queue');for(const o of s.output)if(typeof o.name!=='string'||!Number.isSafeInteger(o.qty)||o.qty<1)throw Error('Invalid output');return copy(s);}
window.StationState={add,remove,create,enqueue,advance,claim,encode,decode};
