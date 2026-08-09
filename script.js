// ===============================
// CART
// ===============================

const cartItems = [];

const cartList = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartPanel = document.getElementById("cart");

function updateCart() {

    cartCount.textContent = cartItems.length;

    const total = cartItems.reduce(
        (sum, item) => sum + item.price,
        0
    );

    cartTotal.textContent = `$${total}`;

    cartList.innerHTML = "";

    if (cartItems.length === 0) {
        cartList.innerHTML = "<li>No items yet</li>";
        return;
    }

    cartItems.forEach((item, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${item.name}</span>
            <strong>$${item.price}</strong>
        `;

        cartList.appendChild(li);
    });
}


// ===============================
// ADD TO CART
// ===============================

document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        cartItems.push({
            name: name,
            price: price
        });

        updateCart();

    });

});


// ===============================
// CART ICON
// ===============================

const cartBtn = document.getElementById("cartBtn");

if (cartBtn) {

    cartBtn.addEventListener("click", () => {

        cartPanel.classList.toggle("open");

    });

}

// ===============================
// SEARCH
// ===============================

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
    searchBox.classList.add("active");
    searchInput.focus();
});

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        const searchText = searchInput.value
            .toLowerCase()
            .trim();

        const products = document.querySelectorAll(".product-card");

        products.forEach(card => {

            const productName = card
                .querySelector("h3")
                .textContent
                .toLowerCase();

            if (productName.includes(searchText)) {

                // Searched product display
                card.style.display = "block";

            } else {

                // Baaki products hide
                card.style.display = "none";

            }

        });

        // Search box close
        searchBox.classList.remove("active");
    }

});

// ===============================
// WISHLIST
// ===============================

let wishlist = [];

// Navbar wishlist button
const wishlistBtn = document.getElementById("wishlistBtn");

if (wishlistBtn) {

    wishlistBtn.addEventListener("click", function () {

        if (wishlist.length === 0) {
            alert("Wishlist is empty!");
            return;
        }

        alert(
            "My Wishlist:\n\n" +
            wishlist.join("\n")
        );

    });

}


// Add wishlist button to products
document.querySelectorAll(".product-card").forEach(function (card) {

    const heartButton = document.createElement("button");

    heartButton.className = "wishlist-btn";
    heartButton.innerHTML = "♡";

    card.appendChild(heartButton);

    heartButton.addEventListener("click", function () {

        const productName =
            card.querySelector("h3").textContent;

        if (wishlist.includes(productName)) {

            wishlist = wishlist.filter(function (item) {
                return item !== productName;
            });

            heartButton.innerHTML = "♡";

        } else {

            wishlist.push(productName);

            heartButton.innerHTML = "♥";

        }

    });

});

// ===============================
// CHECKOUT MODAL
// ===============================

const modal =
    document.getElementById("orderModal");

const openCheckout =
    document.getElementById("openCheckout");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const closeModal =
    document.getElementById("closeModal");

const orderForm =
    document.getElementById("orderForm");


function openModal() {

    modal.classList.remove("hidden");

}


function closeModalView() {

    modal.classList.add("hidden");

}


if (openCheckout) {

    openCheckout.addEventListener(
        "click",
        openModal
    );

}


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        openModal
    );

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeModalView
    );

}


modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModalView();

    }

});


orderForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        orderForm.querySelector(
            'input[type="text"]'
        ).value;

    alert(
        `Thanks ${name}! Your puff order is confirmed.`
    );

    orderForm.reset();

    closeModalView();

    cartItems.length = 0;

    updateCart();

});


// ===============================
// PARALLAX
// ===============================

const layers =
    document.querySelectorAll(".layer");

window.addEventListener("scroll", () => {

    const y = window.scrollY;

    layers.forEach((layer, index) => {

        const speed =
            0.2 + index * 0.1;

        layer.style.transform =
            `translateY(${y * speed}px)`;

    });

});


// ===============================
// TILT CARD
// ===============================

const tiltCard =
    document.getElementById("tiltCard");

if (tiltCard) {

    tiltCard.addEventListener(
        "mousemove",
        event => {

            const rect =
                tiltCard.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 12;

            const rotateX =
                ((0.5 - y / rect.height)) * 10;

            tiltCard.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    tiltCard.addEventListener(
        "mouseleave",
        () => {

            tiltCard.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        }
    );

}


// Initial cart

updateCart();

window.addEventListener("scroll", function () {

    // Search close
    if (searchBox) {
        searchBox.classList.remove("active");
    }

    // Cart close
    if (cartPanel) {
        cartPanel.classList.remove("open");
    }

});