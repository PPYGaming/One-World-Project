// Local preparation only. Caller must supply a cleared, bundled track.
(function(root){
 function createMenuMusic(source,makeAudio){
  var audio=(makeAudio||function(s){return new Audio(s);})(source),world=false,suspended=false,closed=false,generation=0,pending=false;
  audio.loop=true;audio.preload='auto';audio.volume=.32;
  function allowed(){return !world&&!suspended&&!closed;}
  function pause(reset){generation++;pending=false;audio.pause();if(reset)try{audio.currentTime=0;}catch(e){}}
  function sync(){
   if(!allowed()){pause(world||closed);return;}
   if(pending||!audio.paused)return;
   pending=true;var id=++generation;
   try{var result=audio.play();Promise.resolve(result).then(function(){if(id!==generation){if(!allowed())audio.pause();return;}pending=false;if(!allowed())pause(world||closed);},function(){if(id===generation)pending=false;});}catch(e){pending=false;}
  }
  return {sync:sync,world:function(v){world=!!v;sync();},suspend:function(v){suspended=!!v;sync();},close:function(){closed=true;pause(true);},state:function(){return {world:world,suspended:suspended,closed:closed,pending:pending,paused:audio.paused};}};
 }
 root.createOneWorldMenuMusic=createMenuMusic;
})(window);
