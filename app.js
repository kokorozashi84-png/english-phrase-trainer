alert("app.js loaded");

window.onerror = function(msg){
    alert(msg);
};

alert(typeof phrases);

let current = 0;

const learned =
JSON.parse(
localStorage.getItem("learned")
|| "[]"
);

function saveProgress(){

localStorage.setItem(
"learned",
JSON.stringify(learned)
);

document.getElementById(
"learnedCount"
).innerText = learned.length;

}

function loadCard(){

document.getElementById(
"meaning"
).innerText =
phrases[current].meaning;

document.getElementById(
"answer"
).innerHTML = "";

}

function showAnswer(){

document.getElementById(
"answer"
).innerHTML =
"<h2>"+phrases[current].answer+"</h2>";

if(!learned.includes(current)){

learned.push(current);

saveProgress();

}

}

function nextPhrase(){

current++;

if(current >= phrases.length){

current = 0;

}

loadCard();

}

function showTab(tab){

document.getElementById(
"cardTab"
).style.display =
tab==="card"?"block":"none";

document.getElementById(
"quizTab"
).style.display =
tab==="quiz"?"block":"none";

if(tab==="quiz"){

loadQuiz();

}

}

function loadQuiz(){

let p = phrases[current];

document.getElementById(
"quizMeaning"
).innerText =
p.meaning;

let choices =
[...phrases]
.sort(()=>Math.random()-0.5)
.slice(0,3)
.map(x=>x.answer);

choices.push(p.answer);

choices =
choices.sort(
()=>Math.random()-0.5
);

let html="";

choices.forEach(c=>{

html += `
<button
class="option"
onclick="checkAnswer('${c}')">
${c}
</button>
`;

});

document.getElementById(
"options"
).innerHTML = html;

document.getElementById(
"quizResult"
).innerHTML = "";

}

function checkAnswer(ans){

if(ans===phrases[current].answer){

document.getElementById(
"quizResult"
).innerHTML =
"✅ 正解";

}else{

document.getElementById(
"quizResult"
).innerHTML =
"❌ 正解: "
+phrases[current].answer;

}

}

saveProgress();
loadCard();

if('serviceWorker' in navigator){

navigator.serviceWorker
.register('sw.js');

}
