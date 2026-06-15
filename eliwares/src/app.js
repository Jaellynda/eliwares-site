// ============================================================
//  ELIWARES – STOREFRONT APP
// ============================================================

let cart = [];
let allProducts = [];
let currentCat = 'all';
let currentSearch = '';
let currentBrand = 'all';

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  allProducts = DB.getProducts();
  renderProducts();
  renderBrands();
  populateBrandFilter();
  setupFilters();
  loadCart();
});

// ---- RENDER PRODUCTS ----
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noRes = document.getElementById('noResults');
  let list = allProducts;

  if (currentCat !== 'all') list = list.filter(p => p.category === currentCat);
  if (currentBrand !== 'all') list = list.filter(p => p.brand === currentBrand);
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (!list.length) {
    grid.innerHTML = '';
    noRes.classList.remove('hidden');
    return;
  }
  noRes.classList.add('hidden');

  grid.innerHTML = list.map(p => {
    const st = STATUS_LABELS[p.status] || STATUS_LABELS.available;
    const canBuy = p.status === 'available';
    const imgHtml = p.image
      ? `<img src="${p.image}" alt="${p.name}" class="product-img">`
      : `<div class="product-img-placeholder">${CAT_ICONS[p.category] || '🏠'}</div>`;

    return `
    <div class="product-card" onclick="openProduct('${p.id}')">
      <div class="product-img-wrap">
        ${imgHtml}
        <span class="product-status ${st.cls}">${st.label}</span>
      </div>
      <div class="product-info">
        <p class="product-brand">${p.brand}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description.slice(0, 80)}...</p>
        <div class="product-footer">
          <div>
            <span class="product-price">${fmtPrice(p.price)}</span>
            <span class="product-unit">/ ${p.unit}</span>
          </div>
          ${canBuy
            ? `<button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${p.id}')">Add to Cart</button>`
            : `<span class="btn-disabled">${st.label}</span>`
          }
        </div>
      </div>
    </div>`;
  }).join('');
}

// ---- BRANDS ----
function renderBrands() {
  const brands = DB.getBrands();
  document.getElementById('brandsGrid').innerHTML = brands.map(b => `
    <div class="brand-card">
      <div class="brand-initial">${b.name[0]}</div>
      <div>
        <p class="brand-name">${b.name}</p>
        <p class="brand-desc">${b.description}</p>
        <p class="brand-country">${b.country}</p>
      </div>
    </div>`).join('');
}

function populateBrandFilter() {
  const brands = DB.getBrands();
  const sel = document.getElementById('brandFilter');
  brands.forEach(b => {
    const o = document.createElement('option');
    o.value = b.name; o.textContent = b.name;
    sel.appendChild(o);
  });
}

// ---- FILTERS ----
function setupFilters() {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      renderProducts();
    });
  });
  document.getElementById('searchInput').addEventListener('input', e => {
    currentSearch = e.target.value;
    renderProducts();
  });
  document.getElementById('brandFilter').addEventListener('change', e => {
    currentBrand = e.target.value;
    renderProducts();
  });
}

// ---- PRODUCT MODAL ----
function openProduct(id) {
  const p = DB.getProducts().find(x => x.id === id);
  if (!p) return;
  const st = STATUS_LABELS[p.status] || STATUS_LABELS.available;
  const canBuy = p.status === 'available';
  const imgHtml = p.image
    ? `<img src="${p.image}" alt="${p.name}" style="width:100%;max-height:280px;object-fit:cover;border-radius:12px;">`
    : `<div class="product-img-placeholder large">${CAT_ICONS[p.category] || '🏠'}</div>`;

  document.getElementById('productModalContent').innerHTML = `
    ${imgHtml}
    <div class="pm-body">
      <div class="pm-top">
        <div>
          <p class="product-brand">${p.brand}</p>
          <h2 class="pm-title">${p.name}</h2>
          <span class="product-status ${st.cls}">${st.label}</span>
        </div>
        <div class="pm-price-block">
          <span class="pm-price">${fmtPrice(p.price)}</span>
          <span class="product-unit">/ ${p.unit}</span>
        </div>
      </div>
      <p class="pm-desc">${p.description}</p>
      <div class="pm-meta">
        <div class="pm-meta-item"><span>SKU</span><b>${p.sku}</b></div>
        <div class="pm-meta-item"><span>Brand</span><b>${p.brand}</b></div>
        <div class="pm-meta-item"><span>Warranty</span><b>${p.warranty}</b></div>
        <div class="pm-meta-item"><span>Category</span><b>${p.category}</b></div>
      </div>
      ${canBuy ? `
      <div class="pm-qty-row">
        <label>Quantity:</label>
        <div class="qty-ctrl">
          <button onclick="pmQty(-1)">−</button>
          <span id="pmQtyVal">1</span>
          <button onclick="pmQty(1)">+</button>
        </div>
      </div>
      <button class="btn btn-primary pm-buy" onclick="addToCartFromModal('${p.id}')">Add to Cart – ${fmtPrice(p.price)}</button>
      ` : `<div class="pm-unavail">${st.label} – Check back soon or contact us to be notified.</div>`}
    </div>`;

  document.getElementById('productOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

let pmCurrentQty = 1;
function pmQty(d) {
  pmCurrentQty = Math.max(1, pmCurrentQty + d);
  const el = document.getElementById('pmQtyVal');
  if (el) el.textContent = pmCurrentQty;
}
function closeProduct() {
  document.getElementById('productOverlay').classList.add('hidden');
  document.body.style.overflow = '';
  pmCurrentQty = 1;
}
function addToCartFromModal(id) {
  for (let i = 0; i < pmCurrentQty; i++) addToCart(id, true);
  closeProduct();
  openCart();
}

// ---- CART ----
function loadCart() {
  try { cart = JSON.parse(localStorage.getItem('eliwares_cart')) || []; } catch(e) { cart = []; }
  updateCartCount();
}
function saveCart() { localStorage.setItem('eliwares_cart', JSON.stringify(cart)); }

function addToCart(id, silent = false) {
  const p = DB.getProducts().find(x => x.id === id);
  if (!p || p.status !== 'available') return;
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, name: p.name, price: p.price, unit: p.unit, brand: p.brand, qty: 1 });
  saveCart();
  updateCartCount();
  if (!silent) showCartToast(p.name);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartCount();
  renderCartDrawer();
}

function updateCartQty(id, d) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + d);
  saveCart();
  renderCartDrawer();
}

function updateCartCount() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cartCount').textContent = total;
  document.getElementById('cartCount').style.display = total ? 'flex' : 'none';
}

function openCart() {
  renderCartDrawer();
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function renderCartDrawer() {
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (!cart.length) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    footerEl.innerHTML = '';
    return;
  }

  itemsEl.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="ci-info">
        <p class="ci-name">${c.name}</p>
        <p class="ci-brand">${c.brand}</p>
        <p class="ci-price">${fmtPrice(c.price)} / ${c.unit}</p>
      </div>
      <div class="ci-controls">
        <div class="qty-ctrl sm">
          <button onclick="updateCartQty('${c.id}',-1)">−</button>
          <span>${c.qty}</span>
          <button onclick="updateCartQty('${c.id}',1)">+</button>
        </div>
        <button class="ci-remove" onclick="removeFromCart('${c.id}')">✕</button>
      </div>
      <p class="ci-subtotal">${fmtPrice(c.price * c.qty)}</p>
    </div>`).join('');

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  footerEl.innerHTML = `
    <div class="cart-total"><span>Total</span><b>${fmtPrice(total)}</b></div>
    <button class="btn btn-primary" style="width:100%" onclick="openCheckout()">Proceed to Checkout</button>`;
}

function showCartToast(name) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = `✓ ${name} added to cart`;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 50);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2500);
}

// ---- CHECKOUT ----
function openCheckout() {
  closeCart();
  renderCheckoutSummary();
  document.getElementById('checkoutOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Payment option toggle
  document.querySelectorAll('input[name="payment"]').forEach(r => {
    r.addEventListener('change', () => {
      const show = r.value === 'mtn' || r.value === 'airtel';
      document.getElementById('momoField').classList.toggle('hidden', !show);
    });
  });
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.add('hidden');
  document.getElementById('step1').classList.remove('hidden');
  document.getElementById('step2').classList.add('hidden');
  document.body.style.overflow = '';
}

function renderCheckoutSummary() {
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('checkoutSummary').innerHTML = `
    <div class="co-summary">
      <p class="co-summary-title">Order Summary</p>
      ${cart.map(c => `<div class="co-sum-row"><span>${c.qty}× ${c.name}</span><span>${fmtPrice(c.price * c.qty)}</span></div>`).join('')}
      <div class="co-sum-total"><span>Total</span><b>${fmtPrice(total)}</b></div>
    </div>`;
}

function submitOrder() {
  const name = document.getElementById('co_name').value.trim();
  const phone = document.getElementById('co_phone').value.trim();
  const address = document.getElementById('co_address').value.trim();
  const notes = document.getElementById('co_notes').value.trim();
  const payment = document.querySelector('input[name="payment"]:checked');

  if (!name || !phone || !address) { alert('Please fill in Name, Phone, and Address.'); return; }
  if (!payment) { alert('Please select a payment method.'); return; }

  const momoNum = document.getElementById('co_momo').value.trim();
  if ((payment.value === 'mtn' || payment.value === 'airtel') && !momoNum) {
    alert('Please enter your mobile money number.'); return;
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const order = DB.saveOrder({
    customer: { name, phone, address, notes },
    payment: { method: payment.value, momoNumber: momoNum || null },
    items: cart.map(c => ({ ...c })),
    total
  });

  // Record sales & update stock
  cart.forEach(c => DB.recordSale(c.id, c.qty, order.id));

  // Clear cart
  cart = [];
  saveCart();
  updateCartCount();
  allProducts = DB.getProducts();
  renderProducts();

  const payLabel = payment.value === 'mtn' ? 'MTN MoMo' : payment.value === 'airtel' ? 'Airtel Money' : 'Pay on Pickup';
  document.getElementById('orderConfirmMsg').innerHTML =
    `Order <b>${order.id}</b> received! Payment: ${payLabel}${momoNum ? ' – ' + momoNum : ''}.<br>Total: <b>${fmtPrice(total)}</b>`;

  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
}

// ---- CONTACT ----
function submitContact(e) {
  e.preventDefault();
  alert('Thank you! We will contact you shortly.');
  e.target.reset();
}

// ---- KEYBOARD CLOSE ----
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeCart(); closeCheckout(); closeProduct(); }
});
