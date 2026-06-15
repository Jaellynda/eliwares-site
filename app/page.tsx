'use client';

import { useEffect, useState } from 'react';
import { Storefront } from '@/components/storefront';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Storefront />;
}
