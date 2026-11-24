
const products = [
    {
        id: 1,
        name: "Novikov Café",
        price: 250000,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900"
    },
    {
        id: 2,
        name: "Afsona Restaurant",
        price: 180000,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900"
    },
    {
        id: 3,
        name: "Caravan",
        price: 150000,
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900"
    },
    {
        id: 4,
        name: "Besh Qozon",
        price: 90000,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900"
    },
    {
        id: 5,
        name: "Maroon by Novikov",
        price: 220000,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900"
    },
    {
        id: 6,
        name: "LALI Restaurant",
        price: 130000,
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900"
    },
    {
        id: 7,
        name: "Uzbek House",
        price: 110000,
        image: "https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?w=900"
    },
    {
        id: 8,
        name: "Turkish Restaurant",
        price: 160000,
        image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=900"
    },
    {
        id: 9,
        name: "City Garden",
        price: 120000,
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900"
    },
    {
        id: 10,
        name: "Sato Restaurant",
        price: 175000,
        image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900"
    },
    {
        id: 11,
        name: "Basilic Restaurant",
        price: 145000,
        image: "https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?w=900"
    },
    {
        id: 12,
        name: "Plov Center",
        price: 85000,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900"
    },
    {
        id: 13,
        name: "Emirhan Restaurant",
        price: 190000,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900"
    },
    {
        id: 14,
        name: "Osh Markazi",
        price: 75000,
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900"
    },
    {
        id: 15,
        name: "Manas Restaurant",
        price: 140000,
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900"
    },
    {
        id: 16,
        name: "Samarkand Restaurant",
        price: 125000,
        image: "https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?w=900"
    }
];

let cart = [];

const cartOpen = document.getElementById("cartOpen");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const panelCount = document.getElementById("panelCount");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");
const checkoutButton = document.getElementById("checkoutButton");
const checkoutModal = document.getElementById("checkoutModal");
const modalClose = document.getElementById("modalClose");
const checkoutForm = document.getElementById("checkoutForm");

function formatPrice(price) {
    return price.toLocaleString("en-US") + " UZS";
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showToast( " added to your bag!");
}

document.querySelectorAll(".order-button").forEach(button => {
    button.addEventListener("click", () => {
        addToCart(Number(button.dataset.id));
    });
});

function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    cartCount.textContent = count;
    panelCount.textContent = count;
    cartTotal.textContent = formatPrice(total);

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your bag is empty.</p>';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${formatPrice(item.price)}</p>

                <div class="quantity">
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </div>

            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join("");
}

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);

    updateCart();
    showToast("Restaurant removed from your bag!");
}

function toggleCart() {
    cartPanel.classList.toggle("show");
    cartOverlay.classList.toggle("show");
}

cartOpen.addEventListener("click", toggleCart);
cartClose.addEventListener("click", toggleCart);
cartOverlay.addEventListener("click", toggleCart);

const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");

menuButton.addEventListener("click", () => {
    navbar.classList.toggle("show");
});

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("show");
    });
});

checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your bag is empty!");
        return;
    }

    toggleCart();
    checkoutModal.classList.add("show");
});

modalClose.addEventListener("click", () => {
    checkoutModal.classList.remove("show");
});

checkoutModal.addEventListener("click", e => {
    if (e.target === checkoutModal) {
        checkoutModal.classList.remove("show");
    }
});

checkoutForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("customerName").value;

    checkoutModal.classList.remove("show");

    cart = [];

    updateCart();
    checkoutForm.reset();

    showToast(`Thank you, ${name}! Your restaurant booking received.`);
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            if (entry.target.querySelector(".counter")) {
                const counters = entry.target.querySelectorAll(".counter");

                counters.forEach(counter => {
                    const target = +counter.getAttribute("data-target");
                    let count = 0;
                    const speed = target / 30;

                    const updateCount = () => {
                        count += speed;

                        if (count < target) {
                            counter.textContent = Math.ceil(count);
                            setTimeout(updateCount, 40);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCount();
                });
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});

const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", e => {
    e.preventDefault();

    newsletterForm.reset();

    showToast("Subscribed to restaurant updates!");
});

updateCart();
