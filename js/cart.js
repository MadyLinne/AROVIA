let drawer;
let overlay;

function initCart() {

    drawer = document.getElementById("cartDrawer");
    overlay = document.getElementById("cartOverlay");

    const cartBtn = document.getElementById("cartBtn");
    if (cartBtn) {
        cartBtn.onclick = openCart;
    }

    const closeBtn = document.getElementById("closeCart");
    if (closeBtn) {
        closeBtn.onclick = closeCart;
    }
    renderCart();

}

function openCart() {
    drawer.classList.add("active");
}

function closeCart() {
    drawer.classList.remove("active");
}

function renderCart() {

    const body = document.getElementById("cartBody");
    const badge = document.getElementById("cartBadge");
    const count = document.getElementById("cartCount");
    const total = document.getElementById("cartTotal");
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    body.innerHTML = "";
    if (cart.length === 0) {
        body.innerHTML = `
        <div class="empty-cart">
            <h3>Giỏ hàng đang trống</h3>
            <p>Hãy chọn một mùi hương của AROVIA.</p>
        </div>`;
        badge.textContent = "0";
        count.textContent = "(0)";
        total.textContent = "0₫";
        return;
    }

    let tong = 0;
    let soluong = 0;

    cart.forEach((item, index) => {

        tong += item.price * item.quantity;

        soluong += item.quantity;

        body.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price.toLocaleString("vi-VN")}₫</p>
                <div class="cart-quantity">
                    <button onclick="decreaseItem(${index})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseItem(${index})">+</button>
                </div>
            </div>
            <button class="delete-btn"
            onclick="removeItem(${index})">
            🗑
            </button>
        </div>`;

    });

    badge.textContent = soluong;
    count.textContent = `(${soluong})`;
    total.textContent = tong.toLocaleString("vi-VN") + "₫";

}

function increaseItem(index) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart[index].quantity++;
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();

}

function decreaseItem(index) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();

}

function removeItem(index) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
    initCart();
});

function goCheckout(){

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if(cart.length===0){
        alert("Giỏ hàng đang trống.");
        return;
    }
    window.location.href="checkout.html";

}