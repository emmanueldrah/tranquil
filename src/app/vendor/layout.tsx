'use client';

import React from 'react';
import Link from 'next/link';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your products, orders and store settings.</p>
          </div>
          <nav className="space-x-4">
            <Link href="/vendor" className="text-sm text-teal-600 hover:underline">Overview</Link>
            <Link href="/vendor/products" className="text-sm text-gray-700 hover:underline">Products</Link>
            <Link href="/vendor/orders" className="text-sm text-gray-700 hover:underline">Orders</Link>
            <Link href="/vendor/profile" className="text-sm text-gray-700 hover:underline">Profile</Link>
          </nav>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
