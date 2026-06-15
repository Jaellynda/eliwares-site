// ============================================================
//  ELIWARES DATA STORE
//  Edit products, brands, and settings here or via Admin panel
// ============================================================

const ELIWARES_DB_KEY = 'eliwares_data';
const ELIWARES_ORDERS_KEY = 'eliwares_orders';
const ELIWARES_AUTH_KEY = 'eliwares_auth';

// ---------- DEFAULT ADMIN CREDENTIALS ----------
const DEFAULT_ADMIN = { username: 'admin', password: 'eliwares2025' };

// ---------- SAMPLE PRODUCTS ----------
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
    status: 'available', // available | out_of_stock | coming_soon
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
  { id: 'B001', name: 'CeramicPro', description: 'Premium tiles & surfaces', country: 'Italy' },
  { id: 'B002', name: 'AquaLux', description: 'Taps, mixers & sanitaryware', country: 'Germany' },
  { id: 'B003', name: 'SteelMaster', description: 'Stainless steel sinks', country: 'South Africa' },
  { id: 'B004', name: 'FlowTech', description: 'Showers & thermostatics', country: 'UK' },
  { id: 'B005', name: 'FixPro', description: 'Bathroom fixtures & accessories', country: 'China' },
  { id: 'B006', name: 'LuxBath', description: 'Luxury bathtubs & vanities', country: 'Spain' }
];

// ============================================================
//  DATA ACCESS LAYER
// ============================================================
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

  getProducts() { return this.load().products; },
  getBrands() { return this.load().brands; },

  saveProducts(products) {
    const d = this.load();
    d.products = products;
    this.save(d);
  },

  saveBrands(brands) {
    const d = this.load();
    d.brands = brands;
    this.save(d);
  },

  addProduct(p) {
    const d = this.load();
    p.id = 'P' + Date.now();
    p.soldCount = 0;
    p.salesLog = [];
    p.createdAt = new Date().toISOString();
    d.products.push(p);
    this.save(d);
    return p;
  },

  updateProduct(id, updates) {
    const d = this.load();
    const idx = d.products.findIndex(p => p.id === id);
    if (idx > -1) { d.products[idx] = { ...d.products[idx], ...updates }; this.save(d); }
  },

  deleteProduct(id) {
    const d = this.load();
    d.products = d.products.filter(p => p.id !== id);
    this.save(d);
  },

  recordSale(productId, qty, orderRef) {
    const d = this.load();
    const p = d.products.find(x => x.id === productId);
    if (!p) return;
    p.soldCount = (p.soldCount || 0) + qty;
    p.salesLog = p.salesLog || [];
    p.salesLog.push({ date: new Date().toISOString(), qty, orderRef });
    const totalStock = (p.shopQty || 0) + (p.storageQty || 0);
    if (totalStock <= qty) { p.shopQty = 0; p.storageQty = 0; p.status = 'out_of_stock'; }
    else if (p.shopQty >= qty) { p.shopQty -= qty; }
    else { const rem = qty - p.shopQty; p.shopQty = 0; p.storageQty = Math.max(0, p.storageQty - rem); }
    this.save(d);
  },

  // Orders
  getOrders() {
    try { return JSON.parse(localStorage.getItem(ELIWARES_ORDERS_KEY)) || []; } catch(e) { return []; }
  },

  saveOrder(order) {
    const orders = this.getOrders();
    order.id = 'ORD-' + Date.now();
    order.createdAt = new Date().toISOString();
    order.status = 'pending';
    orders.unshift(order);
    localStorage.setItem(ELIWARES_ORDERS_KEY, JSON.stringify(orders));
    return order;
  },

  updateOrderStatus(id, status) {
    const orders = this.getOrders();
    const o = orders.find(x => x.id === id);
    if (o) { o.status = status; localStorage.setItem(ELIWARES_ORDERS_KEY, JSON.stringify(orders)); }
  },

  // Auth
  checkAuth() {
    try { return JSON.parse(sessionStorage.getItem(ELIWARES_AUTH_KEY)); } catch(e) { return null; }
  },

  login(username, password) {
    if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
      sessionStorage.setItem(ELIWARES_AUTH_KEY, JSON.stringify({ username, role: 'admin', at: Date.now() }));
      return true;
    }
    return false;
  },

  logout() { sessionStorage.removeItem(ELIWARES_AUTH_KEY); }
};

// Format price in UGX
function fmtPrice(n) {
  return 'UGX ' + Number(n).toLocaleString();
}

// Status labels
const STATUS_LABELS = {
  available: { label: 'In Stock', cls: 'status-available' },
  out_of_stock: { label: 'Out of Stock', cls: 'status-oos' },
  coming_soon: { label: 'Coming Soon', cls: 'status-soon' }
};

// Category icons
const CAT_ICONS = {
  tiles: '🪟', toilets: '🚽', sinks: '🪣', taps: '🚿', fixtures: '🔩', showers: '🚿'
};
