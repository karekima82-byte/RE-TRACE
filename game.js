const script = [
  {name:"", text:"金曜の夜。駅前の安いチェーン居酒屋。", chars:["takumi","koichi"]},
  {name:"恒一", text:"金持ちなのに俺に奢らすとか相変わらずせこいな！", chars:["takumi","koichi"], active:"koichi"},
  {name:"拓海", text:"お前が勝手に財布忘れただけだろ。", chars:["takumi","koichi"], active:"takumi"},
  {name:"恒一", text:"細かいこと言うなって。", chars:["takumi","koichi"], active:"koichi"},
  {name:"拓海", text:"三千億持ってても、唐揚げは一個しかないんだよ。", chars:["takumi","koichi"], active:"takumi"},
  {name:"恒一", text:"じゃあ、その一個を俺にくれ。", chars:["takumi","koichi"], active:"koichi"},
  {name:"拓海", text:"嫌だ。", chars:["takumi","koichi"], active:"takumi"},
  {name:"", text:"二人で笑う。", chars:["takumi","koichi"]},
  {name:"拓海", text:"……こういうくだらない時間が、一番好きだった。", chars:["takumi","koichi"], active:"takumi"}
];
const characterAssets={takumi:"assets/characters/takumi_master.webp",koichi:"assets/characters/koichi_master.webp"};
let i=0;
const nameEl=document.getElementById("name"),textEl=document.getElementById("text"),charsEl=document.getElementById("characters");
function render(){const s=script[i];nameEl.textContent=s.name;nameEl.style.display=s.name?"inline-block":"none";textEl.textContent=s.text;charsEl.innerHTML="";(s.chars||[]).forEach(id=>{const d=document.createElement("div");d.className="character "+(s.active&&s.active!==id?"dimmed":"");d.id=id;const img=document.createElement("img");img.src=characterAssets[id];img.alt=id==="takumi"?"山田拓海":"佐藤恒一";img.draggable=false;const fallback=document.createElement("div");fallback.className="asset-fallback";fallback.textContent=id==="takumi"?"拓海":"恒一";img.onerror=()=>{img.style.display="none";fallback.style.display="grid"};d.append(img,fallback);charsEl.appendChild(d)})}
function next(){if(i<script.length-1){i++;render()}else{textEl.textContent="— プロトタイプ終了 —";nameEl.textContent="RE:TRACE";nameEl.style.display="inline-block"}}
document.getElementById("game").addEventListener("click",next);document.addEventListener("keydown",e=>{if(e.key===" "||e.key==="Enter"||e.key==="ArrowRight")next()});render();
