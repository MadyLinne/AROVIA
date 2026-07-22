const questions=document.querySelectorAll(".question");
const nextBtn=document.getElementById("nextBtn");
const prevBtn=document.getElementById("prevBtn");
const progress=document.getElementById("progressFill");
const current=document.getElementById("currentQuestion");
const loading=document.getElementById("loadingScreen");
const modal=document.getElementById("resultModal");

let index=0;
let answers=[];

const perfumes=[
{
name:"Noir Essence",
image:"img/cocoNoir.png",
desc:"Woody • Amber • Sang trọng",
link:"product.html?id=1",
score:0
},
{
name:"White Bloom",
image:"img/cocoNoir.png",
desc:"Floral • White Musk • Thanh lịch",
link:"product.html?id=2",
score:0
},
{
name:"Velvet Rose",
image:"img/cocoNoir.png",
desc:"Rose • Vanilla • Quyến rũ",
link:"product.html?id=3",
score:0
},
{
name:"Golden Musk",
image:"img/cocoNoir.png",
desc:"Amber • Musk • Cao cấp",
link:"product.html?id=4",
score:0
},
{
name:"Ocean Mist",
image:"img/cocoNoir.png",
desc:"Citrus • Marine • Tươi mát",
link:"product.html?id=5",
score:0
},
{
name:"Midnight Amber",
image:"img/cocoNoir.png",
desc:"Leather • Oud • Bí ẩn",
link:"product.html?id=6",
score:0
}
];

showQuestion();

document.querySelectorAll(".answer").forEach(btn=>{

btn.addEventListener("click",()=>{

const parent=btn.parentElement;

parent.querySelectorAll(".answer").forEach(a=>{
a.classList.remove("selected");
});

btn.classList.add("selected");

answers[index]=Array.from(parent.children).indexOf(btn);

});

});

nextBtn.onclick=()=>{

if(answers[index]==null){

alert("Vui lòng chọn một đáp án.");

return;

}

if(index<questions.length-1){

index++;

showQuestion();

}else{

calculate();

}

};

prevBtn.onclick=()=>{

if(index>0){

index--;

showQuestion();

}

};

function showQuestion(){

questions.forEach(q=>q.classList.remove("active"));

questions[index].classList.add("active");

current.textContent=index+1;

progress.style.width=((index+1)/questions.length*100)+"%";

prevBtn.style.visibility=index===0?"hidden":"visible";

}

function calculate(){

loading.classList.add("active");

perfumes.forEach(p=>p.score=0);

answers.forEach((a,i)=>{

switch(i){

case 0:

if(a===0)perfumes[1].score+=3;
if(a===1)perfumes[2].score+=3;
if(a===2)perfumes[5].score+=3;
if(a===3)perfumes[4].score+=3;

break;

case 1:

if(a===0)perfumes[1].score+=2;
if(a===1)perfumes[4].score+=2;
if(a===2)perfumes[2].score+=2;
if(a===3)perfumes[0].score+=2;

break;

case 2:

if(a===0)perfumes[2].score+=3;
if(a===1)perfumes[0].score+=3;
if(a===2)perfumes[4].score+=3;
if(a===3)perfumes[3].score+=3;

break;

case 3:

if(a===0)perfumes[4].score++;
if(a===1)perfumes[1].score+=2;
if(a===2)perfumes[2].score+=2;
if(a===3)perfumes[0].score+=3;

break;

case 4:

if(a===0)perfumes[1].score+=2;
if(a===1)perfumes[4].score+=2;
if(a===2)perfumes[2].score+=2;
if(a===3)perfumes[5].score+=2;

break;

case 5:

if(a===0)perfumes[0].score+=2;
if(a===1)perfumes[2].score+=2;
if(a===2)perfumes[3].score+=2;
if(a===3)perfumes[4].score+=2;

break;

case 6:

if(a===0)perfumes[4].score++;
if(a===1)perfumes[1].score+=2;
if(a===2)perfumes[0].score+=2;
if(a===3)perfumes[3].score+=2;

break;

case 7:

if(a===0)perfumes[4].score++;
if(a===1)perfumes[1].score++;
if(a===2)perfumes[2].score+=2;
if(a===3)perfumes[0].score+=3;

break;

case 8:

if(a===0)perfumes[3].score+=3;
if(a===1)perfumes[5].score+=3;
if(a===2)perfumes[1].score+=3;
if(a===3)perfumes[2].score+=3;

break;

case 9:

if(a===0)perfumes[0].score+=3;
if(a===1)perfumes[1].score+=3;
if(a===2)perfumes[3].score+=3;
if(a===3)perfumes[4].score+=3;

break;

}

});

setTimeout(()=>{

loading.classList.remove("active");

showResult();

},2000);

}

function showResult(){

const best=perfumes.reduce((a,b)=>a.score>b.score?a:b);

document.getElementById("resultImage").src=best.image;

document.getElementById("resultName").textContent=best.name;

document.getElementById("resultDescription").textContent=best.desc;

document.getElementById("viewProduct").href=best.link;

const percent=Math.min(95,70+best.score);

document.querySelector(".match strong").textContent=percent+"%";

modal.classList.add("active");

}