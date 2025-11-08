"use client";

import React, { useMemo, useState, useEffect } from 'react';
import LoadingInline from '@/components/ui/LoadingInline';
import ErrorBanner from '@/components/ui/ErrorBanner';
import { getAllOrders, getAllProducts, getAllVendors } from '@/data';
import VendorGuard, { useVendorForCurrentUser } from '@/components/vendor/VendorGuard';

export default function VendorAnalyticsPage() {
  const { vendor, isAdmin } = useVendorForCurrentUser();
  const [vendors, setVendors] = useState<any[]>([]);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(vendor?.id ?? null);

  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const prods = await getAllProducts();
        const vends = await getAllVendors();
        const ords = await getAllOrders();
        if (mounted) {
          setProducts(prods as any[]);
          setVendors(vends as any[]);
          setOrders(ords as any[]);
          // initialize selected vendor if not set
          if (!selectedVendorId && vends && vends.length > 0) {
            setSelectedVendorId(vends[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load products for vendor analytics', err);
        if (mounted) setLoadError('Failed to load products');
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const vendorId = selectedVendorId;

  const vendorOrders = useMemo(() => {
    if (!vendorId) return [];
    return orders.filter(order => order.items.some((it: any) => {
      const p = products.find((x: any) => x.id === it.productId);
      return p && p.vendor === vendorId;
    }));
  }, [orders, products, vendorId]);

  const totalSales = vendorOrders.reduce((s, o) => s + (o.totalAmount || 0), 0);
  const ordersCount = vendorOrders.length;

  const productSalesMap: Record<string, number> = {};
  vendorOrders.forEach((o: any) => {
    o.items.forEach((it: any) => {
      const p = products.find((x: any) => x.id === it.productId);
      if (p && p.vendor === vendorId) {
        productSalesMap[p.id] = (productSalesMap[p.id] || 0) + (it.quantity || 0);
      }
    });
  });

  const topProducts = Object.entries(productSalesMap).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id, qty]) => ({ id, qty, name: products.find(p => p.id === id)?.name || id }));

  return (
    <VendorGuard>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Analytics</h2>
          {isAdmin && (
            <select value={selectedVendorId ?? ''} onChange={(e) => setSelectedVendorId(e.target.value)} className="border rounded px-3 py-2">
              {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {isLoading ? (
            <div className="col-span-3">
              <LoadingInline message="Loading analytics..." />
            </div>
          ) : loadError ? (
            <div className="col-span-3">
              <ErrorBanner message={loadError} />
            </div>
          ) : (
            <>
              <div className="p-4 bg-indigo-50 rounded">
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold">₵{totalSales.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded">
                <p className="text-sm text-gray-600">Orders</p>
                <p className="text-2xl font-bold">{ordersCount}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded">
                <p className="text-sm text-gray-600">Top Product</p>
                <p className="text-2xl font-bold">{topProducts[0]?.name ?? '—'}</p>
              </div>
            </>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Top Selling Products</h3>
          {topProducts.length === 0 ? (
            <p className="text-sm text-gray-500">No sales yet.</p>
          ) : (
            <ul className="space-y-2">
              {topProducts.map(tp => (
                <li key={tp.id} className="flex items-center justify-between">
                  <span>{tp.name}</span>
                  <span className="font-medium">{tp.qty} sold</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </VendorGuard>
  );
}
