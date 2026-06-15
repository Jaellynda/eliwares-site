'use client';

export default function AdminInventory() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#8B1538', marginBottom: '2rem' }}>Inventory Management</h1>
      <div style={{ background: '#fff', borderRadius: 8, padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e5e4' }}>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Product</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Stock Level</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e5e4' }}>
              <td style={{ padding: '1rem', color: '#1a1a1a' }}>Ceramic Floor Tiles</td>
              <td style={{ padding: '1rem', color: '#1a1a1a' }}>45</td>
              <td style={{ padding: '1rem' }}><span style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: 4, fontSize: '0.85rem' }}>In Stock</span></td>
              <td style={{ padding: '1rem' }}><button style={{ background: '#8B1538', color: '#fff', padding: '6px 12px', borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>Update</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
