'use client';

import { usePathname } from 'next/navigation';
import { Layout } from './Layout';
import { MainLayout } from './layout/MainLayout';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Use the new MainLayout for the non-admin site shell; fall back to the legacy Layout where needed
  return <MainLayout>{children}</MainLayout>;
}
