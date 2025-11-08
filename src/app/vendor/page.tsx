"use client";

import React, { useMemo, useEffect, useState } from 'react';
import { getAllProducts, getAllVendors } from '@/data';

export default function VendorIndexPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const prods = await getAllProducts();
      const vends = await getAllVendors();
      if (mounted) {
        setProducts(prods as any[]);
        setVendors(vends as any[]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Simple summary metrics
  const vendorCount = vendors.length;
  const productCount = products.length;
  const lowStock = products.filter((p: any) => p.stock <= 5).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          <p className="text-sm text-gray-600">Quick metrics about your store and products.</p>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-indigo-50 rounded">
              <p className="text-sm text-gray-600">Vendors</p>
              <p className="text-2xl font-bold">{vendorCount}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded">
              <p className="text-sm text-gray-600">Products</p>
              <p className="text-2xl font-bold">{productCount}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded">
              <p className="text-sm text-gray-600">Low stock</p>
              <p className="text-2xl font-bold">{lowStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent activity</h3>
          <p className="text-sm text-gray-500">Activity logging is not yet implemented. This space will show recent vendor actions and orders.</p>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>- Manage products</li>
            <li>- View orders</li>
            <li>- Edit profile</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Tips</h3>
          <p className="text-sm text-gray-600">Use the products page to add or edit product listings. Inventory updates are live in local storage.</p>
        </div>
      </aside>
    </div>
  );
}
