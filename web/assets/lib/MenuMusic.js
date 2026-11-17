// Local preparation only. Caller must supply a cleared, bundled track.
(function(root){
 function createMenuMusic(source,makeAudio){
  var audio=(makeAudio||function(s){return new Audio(s);})(source),world=false,suspended=false,closed=false,generation=0,pending=false,lastError='',lastEvent='created',playAttempts=0;
  audio.loop=true;audio.preload='auto';audio.volume=.32;
  function allowed(){return !world&&!suspended&&!closed;}
  function pause(reset){generation++;pending=false;audio.pause();if(reset)try{audio.currentTime=0;}catch(e){}}
  function sync(){
   if(!allowed()){pause(world||closed);return;}
   if(pending||!audio.paused)return;
   pending=true;lastError='';playAttempts++;var id=++generation;
   try{var result=audio.play();Promise.resolve(result).then(function(){if(id!==generation){if(!allowed())audio.pause();return;}pending=false;if(!allowed())pause(world||closed);},function(e){if(id===generation){pending=false;lastError=(e&&e.name||'PlaybackError')+': '+(e&&e.message||'Playback did not start');}});}catch(e){pending=false;lastError=(e&&e.name||'PlaybackError')+': '+(e&&e.message||'Playback did not start');}
  }
  if(audio.addEventListener){['loadeddata','canplay','playing','waiting','stalled','error','pause'].forEach(function(name){audio.addEventListener(name,function(){lastEvent=name;if(name==='error')lastError='MediaError '+(audio.error?audio.error.code:'unknown');if(name==='canplay'&&allowed()&&audio.paused&&!pending)sync();});});}
  return {retry:function(){if(!allowed())return false;generation++;pending=false;lastError='';if(audio.error&&audio.load)audio.load();sync();return true;},volume:function(v){audio.volume=Math.max(0,Math.min(1,Number(v)||0));},sync:sync,world:function(v){world=!!v;sync();},suspend:function(v){suspended=!!v;sync();},close:function(){closed=true;pause(true);},state:function(){return {world:world,suspended:suspended,closed:closed,pending:pending,paused:audio.paused,volume:audio.volume,muted:!!audio.muted,time:Number(audio.currentTime)||0,ready:Number(audio.readyState)||0,network:Number(audio.networkState)||0,event:lastEvent,error:lastError,attempts:playAttempts};}};
 }
 root.createOneWorldMenuMusic=createMenuMusic;
})(window);
