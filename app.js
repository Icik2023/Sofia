let section="math";
let mode="practice";

let questions={};
let current=0;
let score=0;

async function loadQuestions(){

questions.math=
await fetch("questions/math.json")
.then(r=>r.json());

questions.russian=
await fetch("questions/russian.json")
.then(r=>r.json());

questions.english=
await fetch("questions/english.json")
.then(r=>r.json());

render();
}

function setSection(s){
section=s;
current=0;
render();
}

function setMode(m){
mode=m;
current=0;
score=0;
render();
}

function render(){

const q=questions[section][current];

document.getElementById("question").innerText=q.question;

let html="";

q.options.forEach((o,i)=>{

html+=`
<button class="option"
onclick="answer(${i})">
${o}
</button>
`;

});

document.getElementById("options").innerHTML=html;

document.getElementById("score").innerText=score;
}

function answer(i){

const q=questions[section][current];

if(i===q.correct){
score++;
alert("Верно");
}else{
alert("Неверно");
}

if(mode==="practice"){
alert(q.explanation);
}
}

function nextQuestion(){

current++;

if(current>=questions[section].length){

alert(
"Результат: "+
score+
"/"+
questions[section].length
);

current=0;
score=0;
}

render();
}

loadQuestions();
