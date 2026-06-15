'use client';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#8B1538', marginBottom: '1rem' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
          <h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>Total Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#8B1538' }}>156</p>
        </div>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏷️</div>
          <h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>Brands</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#8B1538' }}>9</p>
        </div>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛒</div>
          <h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: '#8B1538' }}>24</p>
        </div>
      </div>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: 8, marginTop: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h2 style={{ color: '#8B1538', marginBottom: '1rem' }}>Quick Links</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <li><a href="/admin/products" style={{ color: '#8B1538', textDecoration: 'none' }}>→ Manage Products</a></li>
          <li><a href="/admin/brands" style={{ color: '#8B1538', textDecoration: 'none' }}>→ Manage Brands</a></li>
          <li><a href="/admin/inventory" style={{ color: '#8B1538', textDecoration: 'none' }}>→ Check Inventory</a></li>
          <li><a href="/admin/orders" style={{ color: '#8B1538', textDecoration: 'none' }}>→ View Orders</a></li>
        </ul>
      </div>
    </div>
  );
}
