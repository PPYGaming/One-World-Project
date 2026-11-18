// Save before returning to a clean title flow. Never resume a suspended world.
(function(){
 var s={suspended:false,restart:false,restarting:false,saveFailed:false,focused:true},runtime=null;
 function updatePending(){var u=window.oneworldStartupUpdate;return !!(u&&u.pending&&u.required);}
 function save(){try{return !runtime||runtime.save()!==false;}catch(e){return false;}}
 function pause(){
  if(s.restarting)return;
  if(!s.suspended){s.suspended=true;s.restart=!updatePending();if(runtime)runtime.pause();s.saveFailed=!save();}
  // Keep the verified update gate alive when Android settings/installer takes focus.
  if(updatePending())s.restart=false;
  if(window.oneworldMenuMusic)window.oneworldMenuMusic.suspend(true);
 }
 function failure(){
  var panel=document.getElementById('backgroundSaveFailure');
  if(!panel){panel=document.createElement('div');panel.id='backgroundSaveFailure';panel.className='overlay';panel.style.zIndex='1200';panel.style.background='#0b1926';panel.setAttribute('role','alertdialog');panel.setAttribute('aria-modal','true');var title=document.createElement('h2');title.textContent='WORLD SAFELY PAUSED';var text=document.createElement('p');text.style.cssText='max-width:440px;padding:20px;text-align:center;line-height:1.5';text.textContent='The latest progress could not be saved. Free device storage, then retry. Your previous save has not been cleared.';var button=document.createElement('button');button.className='playbtn';button.textContent='RETRY SAVE & RETURN TO TITLE';button.onclick=resume;panel.append(title,text,button);document.body.appendChild(panel);}
  panel.classList.remove('hidden');
 }
 function resume(){
  if(document.hidden||s.restarting||!s.suspended)return;
  if(s.restart){
   if(s.saveFailed&&!save()){failure();return;}
   s.saveFailed=false;s.restarting=true;
   if(window.oneworldMenuMusic)window.oneworldMenuMusic.close();
   if(window.OneWorldNative&&typeof OneWorldNative.restartAtTitle==='function')OneWorldNative.restartAtTitle();else location.reload();
   return;
  }
  s.suspended=false;if(runtime)runtime.resume();if(window.oneworldMenuMusic)window.oneworldMenuMusic.suspend(false);
 }
 window.oneworldAppLifecycle={state:s,configure:function(value){runtime=value;if(s.suspended)runtime.pause();}};
 window.oneworldWindowFocus=function(focused){
  s.focused=!!focused;
  if(runtime&&runtime.focus)runtime.focus(s.focused);
  if(window.oneworldMenuMusic)window.oneworldMenuMusic.suspend(s.suspended||!s.focused);
 };
 window.addEventListener('blur',function(){window.oneworldWindowFocus(false);});
 window.addEventListener('focus',function(){window.oneworldWindowFocus(true);});
 window.oneworldLifecyclePause=pause;window.oneworldLifecycleResume=resume;
 document.addEventListener('visibilitychange',function(){if(document.hidden)pause();else resume();});window.addEventListener('pagehide',pause);window.addEventListener('pageshow',resume);
})();
