const $=s=>document.querySelector(s);
const screens={boot:$('#boot'),op:$('#op'),title:$('#title'),demo:$('#demo')};
const start=$('#traceStart'),video=$('#opVideo'),skip=$('#skipOp'),voice=$('#titleVoice'),bootTheme=$('#startup');
const liveClock=$('#liveClock'),startStamp=$('#startStamp'),titleMessage=$('#titleMessage');
const menu=$('#menu'),settings=$('#settings');
let fx=true,started=false;
const key='retrace_start_time_v06';
function clock(){const d=new Date();const h=String(d.getHours()).padStart(2,'0'),m=String(d.getMinutes()).padStart(2,'0');liveClock.textContent=`${h}:${m}`}
setInterval(clock,1000);clock();
function show(name){Object.values(screens).forEach(x=>x.classList.remove('active'));screens[name].classList.add('active')}
function saveStart(){let t=localStorage.getItem(key);if(!t){t=new Date().toISOString();localStorage.setItem(key,t)}const d=new Date(t);startStamp.textContent=`START ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`}
saveStart();
function stopBootTheme(){bootTheme.pause();bootTheme.currentTime=0;}
function goTitle(){stopBootTheme();video.pause();video.currentTime=0;show('title');voice.currentTime=0;voice.volume=.9;voice.play().catch(()=>{});}
function playOP(){stopBootTheme();show('op');video.currentTime=0;video.play().catch(()=>{});}
function begin(){if(!started){saveStart();started=true} bootTheme.pause(); bootTheme.currentTime=0; playOP()}
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
