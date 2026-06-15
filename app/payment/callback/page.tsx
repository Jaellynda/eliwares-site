'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'success' | 'failed' | 'pending'>('checking');
  const [orderRef, setOrderRef] = useState('');

  useEffect(() => {
    const trackingId = searchParams.get('OrderTrackingId');
    const merchantRef = searchParams.get('OrderMerchantReference');
    
    if (!trackingId) {
      setStatus('failed');
      return;
    }
    
    setOrderRef(merchantRef || '');

    // Check payment status via our API
    fetch(`/api/pesapal/verify?trackingId=${trackingId}`)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'Completed') setStatus('success');
        else if (data.status === 'Pending') setStatus('pending');
        else setStatus('failed');
      })
      .catch(() => setStatus('failed'));
  }, [searchParams]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafaf9' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '3rem 2rem', maxWidth: 480, width: '100%', textAlign: 'center', boxShadow: '0 2px 12px rgba(139, 21, 56, 0.08)' }}>
        {status === 'checking' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <h2 style={{ color: '#8B1538', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Confirming Payment...</h2>
            <p style={{ color: '#888', fontSize: '0.95rem' }}>Please wait while we verify your Mobile Money payment.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div style={{ width: 64, height: 64, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem' }}>✓</div>
            <h2 style={{ color: '#16a34a', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Payment Successful!</h2>
            <p style={{ color: '#555', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Order <strong>{orderRef}</strong> confirmed.</p>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Our team will contact you to arrange delivery. Thank you for shopping with ELIWARES!</p>
            <button onClick={() => router.push('/')} style={{ background: '#8B1538', color: '#fff', padding: '12px 24px', borderRadius: 8, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
              Continue Shopping
            </button>
          </>
        )}
        {status === 'pending' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🕐</div>
            <h2 style={{ color: '#d97706', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Payment Processing</h2>
            <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Your Mobile Money payment is being processed. You will receive a confirmation SMS once complete. Your order reference is <strong>{orderRef}</strong>.</p>
            <button onClick={() => router.push('/')} style={{ background: '#8B1538', color: '#fff', padding: '12px 24px', borderRadius: 8, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
              Go to Home
            </button>
          </>
        )}
        {status === 'failed' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✗</div>
            <h2 style={{ color: '#dc2626', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Payment Failed</h2>
            <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Your payment was not completed. Please try again or contact us at <strong>info@eliwares.com</strong>.</p>
            <button onClick={() => router.push('/')} style={{ background: '#8B1538', color: '#fff', padding: '12px 24px', borderRadius: 8, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentCallback() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <PaymentCallbackContent />
    </Suspense>
  );
}
