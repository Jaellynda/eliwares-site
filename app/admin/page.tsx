'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ADMIN_KEY = 'eliwares_admin_auth';
const PRODUCTS_KEY = 'eliwares_products_admin';
const BRANDS_KEY = 'eliwares_brands_admin';

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'tiles',
    brand: '',
    description: '',
    price: '',
    unit: 'each',
    status: 'available',
    image: ''
  });
  const [brandFormData, setBrandFormData] = useState({
    name: '',
    description: '',
    country: '',
    tier: 'mid'
  });
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem(ADMIN_KEY);
    if (auth) setIsLoggedIn(true);
    else {
      const prods = localStorage.getItem(PRODUCTS_KEY);
      if (prods) setProducts(JSON.parse(prods));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'eliwares2025') {
      localStorage.setItem(ADMIN_KEY, JSON.stringify({ admin: true }));
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid credentials. Use admin/eliwares2025');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_KEY);
    setIsLoggedIn(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (evt.target?.result) {
            const imageData = evt.target.result as string;
            setUploadedImages([...uploadedImages, { id: Date.now(), src: imageData, name: file.name }]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: `P${Date.now()}`,
      ...formData,
      price: parseFloat(formData.price),
      createdAt: new Date().toISOString()
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
    setFormData({
      name: '',
      category: 'tiles',
      brand: '',
      description: '',
      price: '',
      unit: 'each',
      status: 'available',
      image: ''
    });
    setShowProductForm(false);
    alert('Product added successfully!');
  };

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    const newBrand = {
      id: `B${Date.now()}`,
      ...brandFormData,
      createdAt: new Date().toISOString()
    };
    const updatedBrands = [...brands, newBrand];
    setBrands(updatedBrands);
    localStorage.setItem(BRANDS_KEY, JSON.stringify(updatedBrands));
    setBrandFormData({
      name: '',
      description: '',
      country: '',
      tier: 'mid'
    });
    setShowBrandForm(false);
    alert('Brand added successfully!');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Delete this product?')) {
      const filtered = products.filter(p => p.id !== id);
      setProducts(filtered);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #8B1538 60%, #a6234b)', padding: '1rem' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '400px', boxShadow: '0 8px 32px rgba(139,21,56,0.2)' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: '#8B1538', textAlign: 'center' }}>
            ELIWARES Admin
          </h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '12px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '12px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
              required
            />
            <button
              type="submit"
              style={{ padding: '12px', background: '#8B1538', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#a6234b')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#8B1538')}
            >
              Login
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#6b7280' }}>
            Demo: admin / eliwares2025
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9' }}>
      <header style={{ background: '#8B1538', color: 'white', padding: '1.5rem', boxShadow: '0 2px 8px rgba(139,21,56,0.15)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>ELIWARES Admin Panel</h1>
          <button
            onClick={handleLogout}
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #e5e5e4' }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: activeTab === 'products' ? '#8B1538' : 'transparent',
              color: activeTab === 'products' ? 'white' : '#6b7280',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              borderBottom: activeTab === 'products' ? '3px solid #8B1538' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('brands')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: activeTab === 'brands' ? '#8B1538' : 'transparent',
              color: activeTab === 'brands' ? 'white' : '#6b7280',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              borderBottom: activeTab === 'brands' ? '3px solid #8B1538' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Brands
          </button>
          <button
            onClick={() => setActiveTab('images')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: activeTab === 'images' ? '#8B1538' : 'transparent',
              color: activeTab === 'images' ? 'white' : '#6b7280',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              borderBottom: activeTab === 'images' ? '3px solid #8B1538' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Image Management
          </button>
        </div>

        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8B1538' }}>Product Management</h2>
              <button
                onClick={() => setShowProductForm(!showProductForm)}
                style={{
                  background: '#8B1538',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                {showProductForm ? 'Cancel' : 'Add Product'}
              </button>
            </div>

            {showProductForm && (
              <form onSubmit={handleAddProduct} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                    required
                  />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option value="tiles">Tiles</option>
                    <option value="toilets">Toilets</option>
                    <option value="sinks">Sinks</option>
                    <option value="taps">Taps</option>
                    <option value="showers">Showers</option>
                    <option value="fixtures">Fixtures</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    style={{ padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                    required
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', marginBottom: '1rem', fontFamily: 'inherit' }}
                  rows={3}
                  required
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    style={{ padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option value="each">Each</option>
                    <option value="per sqm">Per SQM</option>
                    <option value="per meter">Per Meter</option>
                  </select>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option value="available">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="coming_soon">Coming Soon</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    style={{ padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: '#8B1538',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Add Product
                </button>
              </form>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {products.map((product: any) => (
                <div key={product.id} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{product.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.75rem' }}>Brand: {product.brand}</p>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.75rem' }}>Price: {product.price.toLocaleString()} UGX</p>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.75rem' }}>Status: {product.status}</p>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'brands' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8B1538' }}>Brand Management</h2>
              <button
                onClick={() => setShowBrandForm(!showBrandForm)}
                style={{
                  background: '#8B1538',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                {showBrandForm ? 'Cancel' : 'Add Brand'}
              </button>
            </div>

            {showBrandForm && (
              <form onSubmit={handleAddBrand} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Brand Name"
                    value={brandFormData.name}
                    onChange={(e) => setBrandFormData({ ...brandFormData, name: e.target.value })}
                    style={{ padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={brandFormData.country}
                    onChange={(e) => setBrandFormData({ ...brandFormData, country: e.target.value })}
                    style={{ padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                    required
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={brandFormData.description}
                  onChange={(e) => setBrandFormData({ ...brandFormData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', marginBottom: '1rem', fontFamily: 'inherit' }}
                  rows={2}
                  required
                />
                <select
                  value={brandFormData.tier}
                  onChange={(e) => setBrandFormData({ ...brandFormData, tier: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1.5px solid #e5e5e4', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', marginBottom: '1rem' }}
                >
                  <option value="luxury">Luxury</option>
                  <option value="mid">Mid-Range</option>
                  <option value="value">Value/Budget</option>
                </select>
                <button
                  type="submit"
                  style={{
                    background: '#8B1538',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Add Brand
                </button>
              </form>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {brands.map((brand: any) => (
                <div key={brand.id} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{brand.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>Tier: {brand.tier}</p>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>Country: {brand.country}</p>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>{brand.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8B1538', marginBottom: '1.5rem' }}>Image Management</h2>
            <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '2rem' }}>
              <p style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.95rem' }}>
                Upload product images to use in your product catalog. Images are stored locally and can be referenced in product listings.
              </p>
              <label style={{
                display: 'block',
                padding: '2rem',
                border: '2px dashed #d4a574',
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                background: '#fafaf9',
                transition: 'background 0.2s'
              }}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <span style={{ color: '#8B1538', fontWeight: 600 }}>📤 Click to upload images or drag & drop</span>
              </label>
            </div>

            {uploadedImages.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>Uploaded Images</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  {uploadedImages.map((img) => (
                    <div key={img.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                      <img src={img.src} alt={img.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                      <div style={{ padding: '1rem' }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.5rem' }}>{img.name}</p>
                        <button
                          onClick={() => setUploadedImages(uploadedImages.filter(i => i.id !== img.id))}
                          style={{
                            background: '#dc2626',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            width: '100%'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
