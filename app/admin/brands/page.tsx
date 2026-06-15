'use client';

export default function AdminBrands() {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#8B1538' }}>Brands</h1>
        <button style={{ background: '#8B1538', color: '#fff', padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          + Add Brand
        </button>
      </div>
      <div style={{ background: '#fff', borderRadius: 8, padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e5e4' }}>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Brand</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Country</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Tier</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e5e4' }}>
              <td style={{ padding: '1rem', color: '#1a1a1a' }}>Grohe</td>
              <td style={{ padding: '1rem', color: '#6b7280' }}>Germany</td>
              <td style={{ padding: '1rem' }}><span style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 12px', borderRadius: 4, fontSize: '0.85rem' }}>Luxury</span></td>
              <td style={{ padding: '1rem' }}><a href="#" style={{ color: '#8B1538', marginRight: '1rem' }}>Edit</a> <a href="#" style={{ color: '#dc2626' }}>Delete</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
