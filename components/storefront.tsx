'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// DB Logic from data.js
const ELIWARES_DB_KEY = 'eliwares_data';
const ELIWARES_ORDERS_KEY = 'eliwares_orders';
const ELIWARES_AUTH_KEY = 'eliwares_auth';

const DEFAULT_ADMIN = { username: 'admin', password: 'eliwares2025' };

const DEFAULT_PRODUCTS = [
  {
    id: 'P001',
    name: 'Marble Effect Floor Tile',
    category: 'tiles',
    brand: 'CeramicPro',
    description: 'Premium 60x60cm polished porcelain floor tile with stunning marble effect. Suitable for all floor and wall applications.',
    price: 45000,
    unit: 'per sqm',
    image: '',
    status: 'available',
    shopQty: 20,
    storageQty: 150,
    minStockAlert: 15,
    warranty: '5 years',
    sku: 'CER-MBL-001',
    soldCount: 312,
    salesLog: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'P002',
    name: 'Wall-Hung Toilet Suite',
    category: 'toilets',
    brand: 'AquaLux',
    description: 'Modern wall-hung toilet with concealed cistern. Includes soft-close seat, dual flush 3L/6L, and all fittings.',
    price: 850000,
    unit: 'each',
    image: '',
    status: 'available',
    shopQty: 5,
    storageQty: 12,
    minStockAlert: 3,
    warranty: '2 years',
    sku: 'AQL-WHT-002',
    soldCount: 47,
    salesLog: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'P003',
    name: 'Undermount Stainless Sink',
    category: 'sinks',
    brand: 'SteelMaster',
    description: 'Double bowl undermount kitchen/bathroom sink. 304-grade stainless steel, scratch resistant, includes basket strainers.',
    price: 320000,
    unit: 'each',
    image: '',
    status: 'available',
    shopQty: 8,
    storageQty: 22,
    minStockAlert: 5,
    warranty: '3 years',
    sku: 'STL-UMS-003',
    soldCount: 89,
    salesLog: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'P004',
    name: 'Thermostatic Shower Mixer',
    category: 'showers',
    brand: 'FlowTech',
    description: 'Concealed thermostatic shower mixer with integrated diverter. Keeps water at set temperature. Anti-scald protection.',
    price: 480000,
    unit: 'each',
    image: '',
    status: 'available',
    shopQty: 4,
    storageQty: 9,
    minStockAlert: 3,
    warranty: '2 years',
    sku: 'FLW-TSM-004',
    soldCount: 61,
    salesLog: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'P005',
    name: 'Matt Black Basin Tap',
    category: 'taps',
    brand: 'AquaLux',
    description: 'Single lever tall basin mixer tap in matt black finish. Ceramic disc cartridge, flexible hoses included.',
    price: 185000,
    unit: 'each',
    image: '',
    status: 'available',
    shopQty: 12,
    storageQty: 35,
    minStockAlert: 8,
    warranty: '2 years',
    sku: 'AQL-BBT-005',
    soldCount: 134,
    salesLog: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'P006',
    name: 'Chrome Towel Rail',
    category: 'fixtures',
    brand: 'FixPro',
    description: 'Heated towel rail, 600x800mm, chrome plated. Central heating compatible. Includes all wall fixings.',
    price: 220000,
    unit: 'each',
    image: '',
    status: 'out_of_stock',
    shopQty: 0,
    storageQty: 0,
    minStockAlert: 2,
    warranty: '1 year',
    sku: 'FXP-CTR-006',
    soldCount: 28,
    salesLog: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'P007',
    name: 'Herringbone Mosaic Tile',
    category: 'tiles',
    brand: 'CeramicPro',
    description: '10x30cm ceramic mosaic in herringbone pattern. Perfect for bathroom walls, splashbacks and feature walls.',
    price: 38000,
    unit: 'per sqm',
    image: '',
    status: 'coming_soon',
    shopQty: 0,
    storageQty: 0,
    minStockAlert: 20,
    warranty: '3 years',
    sku: 'CER-HBM-007',
    soldCount: 0,
    salesLog: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'P008',
    name: 'Freestanding Bathtub',
    category: 'fixtures',
    brand: 'LuxBath',
    description: 'Acrylic freestanding oval bathtub 1700x750mm. Gloss white, with overflow and waste. Centre drain.',
    price: 1850000,
    unit: 'each',
    image: '',
    status: 'available',
    shopQty: 2,
    storageQty: 4,
    minStockAlert: 1,
    warranty: '5 years',
    sku: 'LUX-FSB-008',
    soldCount: 11,
    salesLog: [],
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_BRANDS = [
  { id: 'B001', name: 'Grohe', description: 'Luxury German taps & fittings', country: 'Germany', tier: 'luxury' },
  { id: 'B002', name: 'Duravit', description: 'Premium luxury sanitaryware', country: 'Germany', tier: 'luxury' },
  { id: 'B003', name: 'Himark', description: 'High-end bathroom fixtures', country: 'USA', tier: 'luxury' },
  { id: 'B004', name: 'CeramicPro', description: 'Premium tiles & surfaces', country: 'Italy', tier: 'mid' },
  { id: 'B005', name: 'AquaLux', description: 'Quality taps & mixers', country: 'Germany', tier: 'mid' },
  { id: 'B006', name: 'SteelMaster', description: 'Stainless steel sinks', country: 'South Africa', tier: 'value' },
  { id: 'B007', name: 'FlowTech', description: 'Showers & thermostatics', country: 'UK', tier: 'value' },
  { id: 'B008', name: 'FixPro', description: 'Bathroom fixtures', country: 'China', tier: 'value' },
  { id: 'B009', name: 'LuxBath', description: 'Luxury bathtubs', country: 'Spain', tier: 'luxury' }
];

const STATUS_LABELS = {
  available: { label: 'In Stock', cls: 'status-available' },
  out_of_stock: { label: 'Out of Stock', cls: 'status-oos' },
  coming_soon: { label: 'Coming Soon', cls: 'status-soon' }
};

const CAT_ICONS = {
  tiles: '🪟',
  toilets: '🚽',
  sinks: '🪣',
  taps: '🚿',
  fixtures: '🔩',
  showers: '🚿'
};

const DB = {
  load() {
    try {
      const raw = localStorage.getItem(ELIWARES_DB_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return { products: DEFAULT_PRODUCTS, brands: DEFAULT_BRANDS };
  },

  save(data) {
    localStorage.setItem(ELIWARES_DB_KEY, JSON.stringify(data));
  },

  getProducts() {
    return this.load().products;
  },

  getBrands() {
    return this.load().brands;
  }
};

function fmtPrice(n: number) {
  return 'UGX ' + Number(n).toLocaleString();
}

export function Storefront() {
  const [cart, setCart] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [currentCat, setCurrentCat] = useState('all');
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentBrand, setCurrentBrand] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const products = DB.getProducts();
    const brands = DB.getBrands();
    setAllProducts(products);
    setBrands(brands);
    
    const savedCart = localStorage.getItem('eliwares_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('eliwares_cart', JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = allProducts.filter(p => {
    if (currentCat !== 'all' && p.category !== currentCat) return false;
    if (currentBrand !== 'all' && p.brand !== currentBrand) return false;
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const addToCart = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, qty } : item
      ));
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-inner">
          <a href="/" className="logo">
            <Image 
              src="/eliwares-logo.png" 
              alt="ELIWARES" 
              width={40} 
              height={40}
              priority
            />
          </a>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginLeft: '0.5rem' }}>ELIWARES</span>
          <nav className="nav-links">
            <a href="#products">Products</a>
            <a href="#brands">Brands</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-actions">
            <button
              className="cart-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="cart-count">{cart.length}</span>
            </button>
            <a href="/admin/login" className="admin-link">
              Admin
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Uganda&apos;s Premium Bathroom Store</p>
          <h1>
            Tiles. Toilets.
            <br />
            Fixtures. Done Right.
          </h1>
          <p className="hero-sub">
            Quality bathroom hardware with warranty, delivered to your door. Order directly with MTN or Airtel Money.
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn btn-primary">
              Shop Now
            </a>
            <a href="#contact" className="btn btn-outline">
              Get a Quote
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-tiles">
            <div className="tile-card tc1">
              <div className="tile-icon">🚿</div>
              <span>Showers</span>
            </div>
            <div className="tile-card tc2">
              <div className="tile-icon">🚽</div>
              <span>Toilets</span>
            </div>
            <div className="tile-card tc3">
              <div className="tile-icon">🪣</div>
              <span>Sinks</span>
            </div>
            <div className="tile-card tc4">
              <div className="tile-icon">🔩</div>
              <span>Fixtures</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="filters-bar" id="products">
        <div className="filters-inner">
          <div className="filter-tabs" id="categoryTabs">
            {['all', 'tiles', 'toilets', 'sinks', 'taps', 'fixtures', 'showers'].map(cat => (
              <button
                key={cat}
                className={`filter-tab ${currentCat === cat ? 'active' : ''}`}
                onClick={() => setCurrentCat(cat)}
              >
                {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div className="filter-right">
            <input
              type="search"
              placeholder="Search products..."
              className="search-input"
              value={currentSearch}
              onChange={(e) => setCurrentSearch(e.target.value)}
            />
            <select
              className="brand-select"
              value={currentBrand}
              onChange={(e) => setCurrentBrand(e.target.value)}
            >
              <option value="all">All Brands</option>
              {brands.map(b => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="products-section">
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => {
              const st = STATUS_LABELS[product.status as keyof typeof STATUS_LABELS] || STATUS_LABELS.available;
              const canBuy = product.status === 'available';
              return (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="product-img-wrap">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="product-img" />
                    ) : (
                      <div className="product-img-placeholder">
                        {CAT_ICONS[product.category as keyof typeof CAT_ICONS] || '🏠'}
                      </div>
                    )}
                    <span className={`product-status ${st.cls}`}>{st.label}</span>
                  </div>
                  <div className="product-info">
                    <p className="product-brand">{product.brand}</p>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description.slice(0, 80)}...</p>
                    <div className="product-footer">
                      <div>
                        <span className="product-price">{fmtPrice(product.price)}</span>
                        <span className="product-unit">/ {product.unit}</span>
                      </div>
                      {canBuy ? (
                        <button
                          className="btn-add-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product.id);
                          }}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <span className="btn-disabled">{st.label}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-results" style={{ gridColumn: '1 / -1' }}>
              <p>No products found. Try a different filter or search.</p>
            </div>
          )}
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands-section" id="brands">
        <div className="section-inner">
          <h2 className="section-title">Brands We Carry</h2>
          <div className="brands-grid">
            {brands.map(b => (
              <div key={b.id} className="brand-card">
                <div className="brand-initial">{b.name[0]}</div>
                <div>
                  <p className="brand-name">{b.name}</p>
                  <p className="brand-desc">{b.description}</p>
                  <p className="brand-country">{b.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="section-inner about-inner">
          <div className="about-text">
            <h2>Why ELIWARES?</h2>
            <p>
              We&apos;ve been supplying premium bathroom hardware across Uganda since 2015. Every product comes with a
              manufacturer warranty, and our team is on hand to help you pick the right fixtures for your project.
            </p>
            <ul className="about-list">
              <li>✓ All products carry manufacturer warranty</li>
              <li>✓ Order with MTN or Airtel Mobile Money</li>
              <li>✓ In-stock items dispatched same day</li>
              <li>✓ Bulk pricing for contractors & developers</li>
            </ul>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-num">500+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">50+</span>
              <span className="stat-label">Brands</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">2,000+</span>
              <span className="stat-label">Customers</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">9yrs</span>
              <span className="stat-label">Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="section-inner">
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <span className="ci-label">📍 Address</span>
                <span>Kasangati - Kira Rd, Kira Town, Uganda</span>
              </div>
              <div className="contact-item">
                <span className="ci-label">📞 Phone</span>
                <span>0784 639456</span>
              </div>
              <div className="contact-item">
                <span className="ci-label">📧 Email</span>
                <span>info@eliwares.com</span>
              </div>
              <div className="contact-item">
                <span className="ci-label">⏰ Hours</span>
                <span>Mon–Sat: 8am – 6pm</span>
              </div>
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="email" placeholder="Email (optional)" />
              <textarea placeholder="Your message or inquiry..." rows={4} required></textarea>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#1a3c5e" />
              <path
                d="M8 22V14c0-3.3 2.7-6 6-6s6 2.7 6 6v1h-3v-1c0-1.7-1.3-3-3-3s-3 1.3-3 3v8H8z"
                fill="#fff"
              />
              <rect x="17" y="17" width="7" height="5" rx="1" fill="#4fc3f7" />
            </svg>
            <span>ELIWARES</span>
          </div>
          <p className="footer-copy">© 2025 ELIWARES Uganda. Premium Bathroom Hardware.</p>
          <a href="/admin/login" className="footer-admin">
            Admin Login
          </a>
        </div>
      </footer>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div
          className="overlay"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button
            onClick={() => setIsCartOpen(false)}
            className="close-btn"
          >
            ✕
          </button>
        </div>
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="ci-info">
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-brand">{item.brand}</div>
                  <div className="ci-price">{fmtPrice(item.price)} each</div>
                </div>
                <div className="ci-controls">
                  <div className="qty-ctrl sm">
                    <button onClick={() => updateCartQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateCartQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <button
                    className="ci-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="ci-subtotal">
                  {fmtPrice(item.price * item.qty)}
                </div>
              </div>
            ))
          ) : (
            <div className="cart-empty">Your cart is empty</div>
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <b>{fmtPrice(cartTotal)}</b>
          </div>
          {cart.length > 0 && (
            <button className="btn btn-primary" style={{ width: '100%' }}>
              Proceed to Checkout
            </button>
          )}
        </div>
      </aside>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal modal-product"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn modal-close-top"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>
            <div className="pm-body">
              <div className="pm-top">
                <h2 className="pm-title">{selectedProduct.name}</h2>
                <div className="pm-price-block">
                  <div className="pm-price">{fmtPrice(selectedProduct.price)}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    / {selectedProduct.unit}
                  </div>
                </div>
              </div>
              <p className="pm-desc">{selectedProduct.description}</p>
              <div className="pm-meta">
                <div className="pm-meta-item">
                  <span>Brand</span>
                  <b>{selectedProduct.brand}</b>
                </div>
                <div className="pm-meta-item">
                  <span>Category</span>
                  <b>{selectedProduct.category}</b>
                </div>
                <div className="pm-meta-item">
                  <span>Warranty</span>
                  <b>{selectedProduct.warranty}</b>
                </div>
                <div className="pm-meta-item">
                  <span>Stock Status</span>
                  <b>{STATUS_LABELS[selectedProduct.status as keyof typeof STATUS_LABELS]?.label}</b>
                </div>
              </div>
              {selectedProduct.status === 'available' ? (
                <button
                  className="btn btn-primary pm-buy"
                  onClick={() => {
                    addToCart(selectedProduct.id);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="pm-unavail">
                  {STATUS_LABELS[selectedProduct.status as keyof typeof STATUS_LABELS]?.label}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
