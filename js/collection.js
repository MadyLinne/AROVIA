// ===============================
// Thay đổi số lượng
// ===============================

function changeQuantity(id, value) {

    const quantity = document.getElementById("qty" + id);

    let current = parseInt(quantity.innerText);

    current += value;

    if (current < 1) {

        current = 1;

    }

    quantity.innerText = current;

}

// ===============================
// Thêm vào giỏ hàng
// ===============================

function addToCart(id, name, price, image, quantity) {

    quantity = parseInt(quantity);

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({

            id: id,

            name: name,

            price: price,

            image: image,

            quantity: quantity

        });

    }

    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Cập nhật Drawer Cart
    if (typeof renderCart === "function") {

        renderCart();

    }

    // Mở Drawer Cart
    if (typeof openCart === "function") {

        openCart();

    }

    // Reset số lượng về 1
    document.getElementById("qty" + id).innerText = "1";

    // Thông báo
    showToast(name);

}

// ===============================
// Thông báo
// ===============================

function showToast(productName) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        document.body.appendChild(toast);

    }

    toast.innerHTML = "✓ Đã thêm <b>" + productName + "</b> vào giỏ hàng";

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}