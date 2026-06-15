'use client';

export default function AdminProducts() {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#8B1538' }}>Products</h1>
        <button style={{ background: '#8B1538', color: '#fff', padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          + Add Product
        </button>
      </div>
      <div style={{ background: '#fff', borderRadius: 8, padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e5e4' }}>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Product</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Category</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Price (UGX)</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Stock</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e5e4' }}>
              <td style={{ padding: '1rem', color: '#1a1a1a' }}>Ceramic Floor Tiles</td>
              <td style={{ padding: '1rem', color: '#6b7280' }}>Tiles</td>
              <td style={{ padding: '1rem', color: '#1a1a1a' }}>850,000</td>
              <td style={{ padding: '1rem', color: '#1a1a1a' }}>45</td>
              <td style={{ padding: '1rem' }}><a href="#" style={{ color: '#8B1538', marginRight: '1rem' }}>Edit</a> <a href="#" style={{ color: '#dc2626' }}>Delete</a></td>
            </tr>
          </tbody>
        </table>
        <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '2rem' }}>Loading products...</p>
      </div>
    </div>
  );
}
