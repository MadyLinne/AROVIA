const perfumes={

1:{
id:1,
name:"Noir Essence",
price:2390000,
image:"img/cocoNoir.png",
description:"Noir Essence là mùi hương dành cho những người yêu phong cách mạnh mẽ, bí ẩn với sự hòa quyện giữa gỗ, da thuộc và xạ hương.",
top:["Bergamot","Pink Pepper","Lemon"],
middle:["Lavender","Rose","Cedarwood"],
base:["Leather","Musk","Amber"]
},

2:{
id:2,
name:"White Bloom",
price:2190000,
image:"img/cocoNoir.png",
description:"White Bloom mang hương hoa trắng thanh lịch kết hợp vani nhẹ nhàng tạo nên vẻ đẹp tinh tế.",
top:["Orange","Pear","Lemon"],
middle:["Jasmine","Rose","Lily"],
base:["Vanilla","White Musk","Sandalwood"]
},

3:{
id:3,
name:"Velvet Rose",
price:2590000,
image:"img/cocoNoir.png",
description:"Velvet Rose đem đến cảm giác quyến rũ với hoa hồng, mẫu đơn và xạ hương.",
top:["Pink Pepper","Mandarin","Bergamot"],
middle:["Rose","Peony","Magnolia"],
base:["Musk","Amber","Patchouli"]
},

4:{
id:4,
name:"Golden Musk",
price:2690000,
image:"img/cocoNoir.png",
description:"Golden Musk nổi bật với hương hổ phách, đàn hương và xạ hương đầy sang trọng.",
top:["Saffron","Orange"],
middle:["Amber","Jasmine"],
base:["Musk","Sandalwood","Vanilla"]
},

5:{
id:5,
name:"Ocean Mist",
price:2090000,
image:"img/cocoNoir.png",
description:"Ocean Mist mang cảm giác mát lạnh của đại dương cùng hương cam chanh tươi mới.",
top:["Lemon","Sea Salt","Mint"],
middle:["Marine","Lavender","Geranium"],
base:["Cedar","Musk","Oakmoss"]
},

6:{
id:6,
name:"Midnight Amber",
price:2790000,
image:"img/cocoNoir.png",
description:"Midnight Amber là mùi hương ấm áp với trầm hương, hổ phách và vani.",
top:["Bergamot","Cardamom"],
middle:["Oud","Rose","Patchouli"],
base:["Amber","Vanilla","Musk"]
}

};

const params=new URLSearchParams(window.location.search);

const id=params.get("id")||1;

const perfume=perfumes[id];

document.getElementById("productName").textContent=perfume.name;

document.getElementById("productPrice").textContent=
perfume.price.toLocaleString("vi-VN")+"₫";

document.getElementById("productDescription").textContent=
perfume.description;

document.getElementById("mainImage").src=perfume.image;

const thumbs=document.querySelectorAll(".thumb");

thumbs.forEach(img=>{
img.src=perfume.image;
});

function loadList(id,list){

const ul=document.getElementById(id);

ul.innerHTML="";

list.forEach(item=>{

ul.innerHTML+=`<li>${item}</li>`;

});

}

loadList("topNotes",perfume.top);

loadList("middleNotes",perfume.middle);

loadList("baseNotes",perfume.base);

let quantity=1;

document.getElementById("plus").onclick=function(){

quantity++;

document.getElementById("qty").textContent=quantity;

}

document.getElementById("minus").onclick=function(){

if(quantity>1){

quantity--;

document.getElementById("qty").textContent=quantity;

}

}

document.querySelectorAll(".size").forEach(btn=>{

btn.onclick=function(){

document.querySelectorAll(".size").forEach(x=>x.classList.remove("active"));

this.classList.add("active");

}

});

document.getElementById("addCartBtn").onclick=function(){

addToCart(

perfume.id,

perfume.name,

perfume.price,

perfume.image,

quantity

);

if(typeof renderCart==="function"){

renderCart();

}

if(typeof openCart==="function"){

openCart();

}

}

document.getElementById("buyNow").onclick=function(){

addToCart(

perfume.id,

perfume.name,

perfume.price,

perfume.image,

quantity

);

window.location.href="checkout.html";

}