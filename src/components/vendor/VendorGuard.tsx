"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getAllVendors } from '@/data';

export function useVendorForCurrentUser() {
  const { user } = useAuth();
  const [vendors, setVendors] = useState<any[] | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const v = await getAllVendors();
        if (mounted) setVendors(v as any[]);
      } catch (err) {
        console.error('Failed to load vendors in VendorGuard:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (!user) return { vendor: null, isAdmin: false };

  const matched = vendors?.find((v: any) => v.contactInfo?.email?.toLowerCase() === user.email?.toLowerCase()) ?? null;
  return { vendor: matched, isAdmin: user.role === 'admin' };
}

export default function VendorGuard({ children }: { children: React.ReactNode }) {
  const { vendor, isAdmin } = useVendorForCurrentUser();

  if (!vendor && !isAdmin) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold">Access denied</h2>
        <p className="text-sm text-gray-600 mt-2">You must be the vendor owner or an admin to access this section.</p>
      </div>
    );
  }

  return <>{children}</>;
}
