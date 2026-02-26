// --- Modal Management ---
const modal = document.getElementById("loginModal");
function openModal() { modal.style.display = "block"; }
function closeModal() { modal.style.display = "none"; }
window.onclick = (e) => { if (e.target == modal) closeModal(); }

// --- Cart Logic ---
let cart = [];
function toggleCart() { document.getElementById('cartSidebar').classList.toggle('active'); }

// Add click listeners to all "Add to Cart" buttons
document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const info = btn.parentElement;
        const name = info.querySelector('h4').innerText;
        const price = parseInt(info.querySelector('.price').innerText.replace('₦', '').replace(',', ''));
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    cart.push({ name, price });
    updateUI();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateUI();
}

function updateUI() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    const countEl = document.getElementById('cart-count');
    
    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, i) => {
        total += item.price;
        container.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>₦${item.price} <i class="fas fa-trash" onclick="removeItem(${i})" style="color:red; cursor:pointer; margin-left:10px;"></i></span>
            </div>
        `;
    });

    countEl.innerText = cart.length;
    totalEl.innerText = `₦${total.toLocaleString()}`;
    if (cart.length === 0) container.innerHTML = '<p>Your cart is empty</p>';
}

function checkout() {
    if (cart.length === 0) return alert("Select items first!");
    let total = 0;
    let list = "APT Order from UNIBEN:%0A";
    cart.forEach(item => {
        list += `- ${item.name} (₦${item.price})%0A`;
        total += item.price;
    });
    list += `%0ATotal: ₦${total}%0ALocation: (Type Hostel/Dept here)`;
    
    // Primary WhatsApp contact: Precious
    window.open(`https://wa.me/2349053194315?text=${list}`, '_blank');
}

// Handle Login Form
document.getElementById('loginForm').onsubmit = (e) => {
    e.preventDefault();
    alert("Login successful! Welcome back to APT Logistics.");
    closeModal();
}