'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Simple credential check — replace with Firebase Auth in production
    if (username === 'admin' && password === 'eliwares2025') {
      sessionStorage.setItem('eliwares_admin', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#8B1538', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', borderRadius: '20px', padding: '3rem 2.5rem', width: '100%', maxWidth: '420px' }}>
        <h1 style={{ textAlign: 'center', color: '#8B1538', marginBottom: '0.5rem' }}>ELIWARES Admin</h1>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>Staff only</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required
            style={{ padding: '14px', border: '1.5px solid #e5e5e4', borderRadius: '10px', fontSize: '1rem' }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
            style={{ padding: '14px', border: '1.5px solid #e5e5e4', borderRadius: '10px', fontSize: '1rem' }} />
          {error && <p style={{ color: '#dc2626', fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}
          <button type="submit" style={{ background: '#d4a574', color: '#8B1538', padding: '14px', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer' }}>
            Sign In
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem' }}>
          <a href="/" style={{ color: '#8B1538' }}>← Back to store</a>
        </p>
      </div>
    </div>
  );
}
