// Local preparation only. Caller must supply a cleared, bundled track.
(function(root){
 function createMenuMusic(source,makeAudio){
  var audio=(makeAudio||function(s){return new Audio(s);})(source),world=false,suspended=false,closed=false,generation=0,pending=false,lastError='',lastEvent='created',playAttempts=0,recoveries=0,recoveryTimer=null;
  audio.loop=true;audio.preload='auto';audio.volume=.32;
  function allowed(){return !world&&!suspended&&!closed;}
  function clearRecovery(){if(recoveryTimer!==null){clearTimeout(recoveryTimer);recoveryTimer=null;}}
  function pause(reset){clearRecovery();generation++;pending=false;audio.pause();if(reset)try{audio.currentTime=0;}catch(e){}}
  function recover(){
   if(!allowed()||recoveryTimer!==null||recoveries>=2)return;
   var id=generation,delay=recoveries===0?600:1800;recoveries++;
   recoveryTimer=setTimeout(function(){recoveryTimer=null;if(id!==generation||!allowed())return;pending=false;if(audio.error&&audio.load)audio.load();lastError='';sync();},delay);
  }
  function failed(e,id){if(id!==generation)return;pending=false;lastError=(e&&e.name||'PlaybackError')+': '+(e&&e.message||'Playback did not start');recover();}
  function sync(){
   if(!allowed()){pause(world||closed);return;}
   if(pending||!audio.paused||recoveryTimer!==null||(lastError&&recoveries>=2))return;
   pending=true;lastError='';playAttempts++;var id=++generation;
   try{Promise.resolve(audio.play()).then(function(){if(id!==generation){if(!allowed())audio.pause();return;}pending=false;lastError='';if(!allowed())pause(world||closed);},function(e){failed(e,id);});}catch(e){failed(e,id);}
  }
  if(audio.addEventListener){['loadeddata','canplay','playing','waiting','stalled','error','pause','ended'].forEach(function(name){audio.addEventListener(name,function(){
   lastEvent=name;
   if(name==='playing'){clearRecovery();lastError='';}
   if(name==='error'){pending=false;lastError='MediaError '+(audio.error?audio.error.code:'unknown');recover();}
   if(name==='canplay'&&allowed()&&audio.paused&&!pending)sync();
   if(name==='ended'&&allowed()){try{audio.currentTime=0;}catch(e){}sync();}
  });});}
  return {volume:function(v){audio.volume=Math.max(0,Math.min(1,Number(v)||0));},sync:sync,world:function(v){var before=world;world=!!v;if(before&&!world){recoveries=0;lastError='';}sync();},suspend:function(v){var before=suspended;suspended=!!v;if(before&&!suspended){recoveries=0;lastError='';}sync();},close:function(){closed=true;pause(true);},state:function(){return {world:world,suspended:suspended,closed:closed,pending:pending,paused:audio.paused,volume:audio.volume,muted:!!audio.muted,time:Number(audio.currentTime)||0,ready:Number(audio.readyState)||0,network:Number(audio.networkState)||0,event:lastEvent,error:lastError,attempts:playAttempts,recoveries:recoveries,recovering:recoveryTimer!==null};}};
 }
 root.createOneWorldMenuMusic=createMenuMusic;
})(window);
