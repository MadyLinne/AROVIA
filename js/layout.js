document.addEventListener("click",(e)=>{

    const menu=document.getElementById("navMenu");

    const btn=document.getElementById("menuBtn");

    if(!menu || !btn) return;

    if(e.target===btn){

        menu.classList.toggle("active");

    }

});

const story=document.querySelector(".home-story");
const popup=document.getElementById("discPopup");

if(story && !sessionStorage.getItem("discPopupShown")){

const observer=new IntersectionObserver(entries=>{

if(entries[0].isIntersecting){

popup.classList.add("show");

sessionStorage.setItem("discPopupShown","true");

observer.disconnect();

}

},{threshold:.4});

observer.observe(story);

}

document.getElementById("laterDisc").onclick=()=>{

popup.classList.remove("show");

};

document.getElementById("closeDisc").onclick=()=>{

popup.classList.remove("show");

};