document.addEventListener("DOMContentLoaded",()=>{

    if(typeof initCart==="function"){
        initCart();
    }

    renderCheckout();

    document.querySelectorAll("input[name='payment']").forEach(radio=>{

        radio.addEventListener("change",togglePayment);

    });

    togglePayment();

});

function renderCheckout(){

    const orderList=document.getElementById("orderList");
    const subTotal=document.getElementById("subTotal");
    const totalPrice=document.getElementById("totalPrice");
    const qrAmount=document.getElementById("qrAmount");

    let cart=JSON.parse(sessionStorage.getItem("cart"))||[];

    orderList.innerHTML="";

    if(cart.length===0){

        orderList.innerHTML=`
        <p style="text-align:center;color:#777;padding:40px 0;">
            Giỏ hàng đang trống
        </p>`;

        subTotal.innerText="0₫";
        totalPrice.innerText="0₫";
        qrAmount.innerText="0₫";

        return;

    }

    let total=0;

    cart.forEach(item=>{

        const money=item.price*item.quantity;

        total+=money;

        orderList.innerHTML+=`

        <div class="checkout-item">

            <img src="${item.image}">

            <div>

                <h4>${item.name}</h4>

                <p>

                    ${item.quantity} ×
                    ${item.price.toLocaleString("vi-VN")}₫

                </p>

            </div>

            <strong>

                ${money.toLocaleString("vi-VN")}₫

            </strong>

        </div>

        `;

    });

    subTotal.innerText=total.toLocaleString("vi-VN")+"₫";
    totalPrice.innerText=total.toLocaleString("vi-VN")+"₫";
    qrAmount.innerText=total.toLocaleString("vi-VN")+"₫";



    /*================= VIETQR =================*/

    const bank="MB";                 // đổi ngân hàng

    const account="0354159519";       // đổi số tài khoản

    const accountName="Nguyễn hoàng minh";// đổi tên

    const content="Thanh toan AROVIA";

    document.getElementById("qrImage").src=
    `https://img.vietqr.io/image/${bank}-${account}-compact2.png?amount=${total}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent(accountName)}`;

}

function togglePayment(){

    const payment=document.querySelector("input[name='payment']:checked").value;

    const qr=document.getElementById("qrSection");

    const orderBtn=document.querySelector(".place-order");

    if(payment==="QR"){

        qr.style.display="block";

        orderBtn.style.display="none";

    }else{

        qr.style.display="none";

        orderBtn.style.display="block";

    }

}

function placeOrder(){

    const form=document.getElementById("checkoutForm");

    if(!form.checkValidity()){

        form.reportValidity();

        return;

    }

    sessionStorage.removeItem("cart");

    alert("🎉 Đặt hàng thành công!");

    window.location.href="index.html";

}

function confirmPayment(){

    document
    .getElementById("paymentModal")
    .classList.add("active");

}

function continueShopping(){

    sessionStorage.removeItem("cart");

    window.location.href="index.html";

}