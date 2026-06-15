'use client';

export default function AdminOrders() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#8B1538', marginBottom: '2rem' }}>Orders</h1>
      <div style={{ background: '#fff', borderRadius: 8, padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e5e4' }}>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Order ID</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Customer</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Amount</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#1a1a1a' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e5e4' }}>
              <td style={{ padding: '1rem', color: '#1a1a1a' }}>ELI-001</td>
              <td style={{ padding: '1rem', color: '#1a1a1a' }}>John Ssemakula</td>
              <td style={{ padding: '1rem', color: '#1a1a1a' }}>2,500,000 UGX</td>
              <td style={{ padding: '1rem' }}><span style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: 4, fontSize: '0.85rem' }}>Delivered</span></td>
              <td style={{ padding: '1rem', color: '#6b7280' }}>2024-06-10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
