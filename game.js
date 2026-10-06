const $=s=>document.querySelector(s);
const screens={boot:$('#boot'),op:$('#op'),title:$('#title'),demo:$('#demo')};
const start=$('#traceStart'),video=$('#opVideo'),skip=$('#skipOp'),voice=$('#titleVoice'),bootTheme=$('#bootTheme');
const titleMessage=$('#titleMessage'),opStart=$('#opStart');
const startKey='retrace_start_time_v06';
const menu=$('#menu'),settings=$('#settings');
let fx=true,started=false;
function stopBootTheme(){bootTheme.pause();bootTheme.currentTime=0;}
function saveStart(){let t=localStorage.getItem(startKey);if(!t){t=new Date().toISOString();localStorage.setItem(startKey,t)}const d=new Date(t);opStart.textContent=`START ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`}
function waitForEnded(media){return new Promise(resolve=>{if(media.ended){resolve();return}media.addEventListener('ended',resolve,{once:true})})}
function goTitle(){stopBootTheme();video.pause();video.currentTime=0;video.volume=1;$('#op').classList.remove('waiting');show('title');voice.currentTime=0;voice.volume=.9;voice.play().catch(()=>{});}
function playOP(){const op=$('#op');op.classList.remove('waiting');show('op');video.currentTime=0;video.volume=1;video.play().catch(()=>{});}
function begin(){if(started)return;started=true;saveStart();
  // iOS Safari requires media.play() to be directly caused by the user gesture.
  // Start the OP video in the same tap, but keep it invisible and silent while the boot sound plays.
  const op=$('#op');op.classList.add('waiting');show('op');video.currentTime=0;video.volume=0;
  const videoPromise=video.play();
  bootTheme.currentTime=0;bootTheme.volume=.9;
  const bootPromise=bootTheme.play();
  if(bootPromise) bootPromise.catch(()=>{started=false;video.pause();video.currentTime=0;op.classList.remove('waiting');});
  waitForEnded(bootTheme).then(()=>{
    // Restart the already-authorized video from frame 0; no second user gesture is required.
    video.currentTime=0;video.volume=1;op.classList.remove('waiting');
  });
  if(videoPromise) videoPromise.catch(()=>{started=false;});
}
function show(name){Object.values(screens).forEach(x=>x.classList.remove('active'));screens[name].classList.add('active')}
start.addEventListener('click',begin);
skip.addEventListener('click',e=>{e.stopPropagation();goTitle()});
video.addEventListener('ended',goTitle);
menu.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const type=b.dataset.menu;if(type==='op')playOP();if(type==='start')startDemo();if(type==='continue'){message('このデモではセーブデータはありません。');}if(type==='settings')settings.classList.add('open')});
function message(t){titleMessage.textContent=t;titleMessage.classList.add('titleMessageShow');setTimeout(()=>titleMessage.classList.remove('titleMessageShow'),1800)}
$('#closeSettings').addEventListener('click',()=>settings.classList.remove('open'));
$('#fxToggle').addEventListener('change',e=>fx=e.target.checked);
const script=[{n:'',t:'金曜の夜。駅前の安いチェーン居酒屋。'},{n:'恒一',t:'乾杯！',sfx:'カチンッ！',sound:true},{n:'拓海',t:'お前、さっきから食ってばっかじゃないか？'},{n:'恒一',t:'いいだろ。今日はお前の奢りなんだから。'},{n:'拓海',t:'……勝手に決めるなよ。'},{n:'恒一',t:'細かいこと言うなって。'},{n:'',t:'二人で笑う。'},{n:'拓海',t:'……こういうくだらない時間が、一番好きだった。'}];
let i=0;const name=$('#name'),text=$('#text'),sfx=$('#sfx'),amb=$('#amb'),bgm=$('#bgm'),toast=$('#toast');
function render(){const x=script[i];name.textContent=x.n;name.style.display=x.n?'inline-block':'none';text.textContent=x.t;if(fx&&x.sfx)effect(x.sfx);if(x.sound){toast.currentTime=0;toast.play().catch(()=>{})}}
function effect(t){sfx.innerHTML='';const e=document.createElement('div');e.className='sfx';e.textContent=t;sfx.append(e);requestAnimationFrame(()=>e.classList.add('show'));setTimeout(()=>e.remove(),700)}
function next(){if(i<script.length-1){i++;render()}else{text.textContent='— デモ終了 —';name.textContent='RE:TRACE';name.style.display='inline-block'}}
function startDemo(){show('demo');i=0;amb.volume=.28;bgm.volume=.22;amb.play().catch(()=>{});bgm.play().catch(()=>{});render()}
$('#demo').addEventListener('click',next);document.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '||e.key==='ArrowRight')next()});
