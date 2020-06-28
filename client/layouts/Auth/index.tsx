import React, { useEffect } from 'react';
import { useAppStore } from '@/client/modal/ryan-store';

export function AuthLayout({ children }: { children: React.ReactNode; }) {
  const { endSSR } = useAppStore();

  useEffect(() => {
    endSSR();
  }, [endSSR]);

  return <>{children}</>;
}
