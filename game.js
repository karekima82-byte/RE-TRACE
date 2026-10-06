const script = [
 {name:"", text:"金曜の夜。駅前の安いチェーン居酒屋。", chars:["takumi","koichi"]},
 {name:"恒一", text:"金持ちなのに俺に奢らすとか相変わらずせこいな！"},
 {name:"拓海", text:"お前が勝手に財布忘れただけだろ。"},
 {name:"恒一", text:"細かいこと言うなって。"},
 {name:"拓海", text:"三千億持ってても、唐揚げは一個しかないんだよ。"},
 {name:"恒一", text:"じゃあ、その一個を俺にくれ。"},
 {name:"拓海", text:"嫌だ。"},
 {name:"", text:"二人で笑う。"},
 {name:"拓海", text:"……こういうくだらない時間が、一番好きだった。"}
];

let i = 0;
const nameEl = document.getElementById("name");
const textEl = document.getElementById("text");
const charsEl = document.getElementById("characters");

function render(){
  const s = script[i];
  nameEl.textContent = s.name;
  nameEl.style.display = s.name ? "inline-block" : "none";
  textEl.textContent = s.text;
  charsEl.innerHTML = "";
  (s.chars || []).forEach(id=>{
    const d=document.createElement("div");
    d.className="character";
    d.id=id;
    const label=document.createElement("span");
    label.textContent=id==="takumi" ? "拓海" : "恒一";
    d.appendChild(label);
    charsEl.appendChild(d);
  });
}
function next(){
  if(i < script.length-1){i++;render()}
  else {textEl.textContent="— プロトタイプ終了 —"; nameEl.textContent="RE:TRACE"; nameEl.style.display="inline-block"}
}
document.getElementById("game").addEventListener("click", next);
document.addEventListener("keydown",e=>{if(e.key===" "||e.key==="Enter"||e.key==="ArrowRight")next()});
render();
