'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/admin/login') {
      const auth = sessionStorage.getItem('eliwares_admin');
      if (!auth) router.push('/admin/login');
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;

  function logout() {
    sessionStorage.removeItem('eliwares_admin');
    router.push('/admin/login');
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '📦' },
    { href: '/admin/inventory', label: 'Inventory', icon: '🏪' },
    { href: '/admin/orders', label: 'Orders', icon: '🛒' },
    { href: '/admin/brands', label: 'Brands', icon: '🏷️' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 240, background: '#1a3c5e', color: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '1.5rem', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>ELIWARES Admin</div>
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 1.5rem',
              color: pathname === item.href ? '#fff' : 'rgba(255,255,255,0.7)',
              background: pathname === item.href ? 'rgba(255,255,255,0.12)' : 'transparent',
              textDecoration: 'none', fontSize: '0.9rem'
            }}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>← View Store</Link>
          <button onClick={logout} style={{ color: 'rgba(255,100,100,0.8)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>Log Out</button>
        </div>
      </aside>
      <main style={{ flex: 1, background: '#f7f8fa', overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  );
}