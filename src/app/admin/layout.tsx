'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import NewAdminLayout from '@/components/admin/NewAdminLayout';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin') && 
        pathname !== '/admin/login' && pathname !== '/admin/register') {
      router.push('/admin/login');
    }
  }, [user, isLoading, router, pathname]);

  // Don't apply admin layout to login and register pages
  if (pathname === '/admin/login' || pathname === '/admin/register') {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render admin layout if user is not authenticated as admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  return <NewAdminLayout>{children}</NewAdminLayout>;
}
