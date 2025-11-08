"use client";

import React, { useMemo, useState, useEffect } from 'react';
import LoadingInline from '@/components/ui/LoadingInline';
import ErrorBanner from '@/components/ui/ErrorBanner';
import { getAllOrders, getAllProducts, getAllVendors } from '@/data';
import VendorGuard, { useVendorForCurrentUser } from '@/components/vendor/VendorGuard';

export default function VendorOrdersPage() {
  const { vendor, isAdmin } = useVendorForCurrentUser();
  const [vendors, setVendors] = useState<any[]>([]);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(vendor?.id ?? null);

  const [allOrders, setAllOrders] = useState<any[]>([]);
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
          setAllOrders(ords as any[]);
          if (!selectedVendorId && vends && vends.length > 0) {
            setSelectedVendorId(vends[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load products for vendor orders', err);
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
    // Orders that include at least one item from this vendor
    return allOrders.filter(order => {
      return order.items.some((it: any) => {
        const p = products.find((x: any) => x.id === it.productId);
        return p && p.vendor === vendorId;
      });
    });
  }, [allOrders, products, vendorId]);

  return (
    <VendorGuard>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Orders</h2>
          {isAdmin && (
            <select value={selectedVendorId ?? ''} onChange={(e) => setSelectedVendorId(e.target.value)} className="border rounded px-3 py-2">
              {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          )}
        </div>

        {isLoading ? (
          <LoadingInline message="Loading orders..." />
        ) : loadError ? (
          <ErrorBanner message={loadError} />
        ) : vendorOrders.length === 0 ? (
          <p className="text-sm text-gray-500">No orders for this vendor yet.</p>
        ) : (
          <div className="space-y-4">
            {vendorOrders.map((order: any) => (
              <div key={order.id} className="border rounded p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Order {order.id}</p>
                    <p className="text-sm text-gray-500">Status: {order.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₵{order.totalAmount?.toFixed?.(2) ?? order.totalAmount}</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-semibold">Items from this vendor:</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {order.items.filter((it: any) => {
                      const p = products.find((x: any) => x.id === it.productId);
                      return p && p.vendor === vendorId;
                    }).map((it: any) => (
                      <li key={it.productId} className="flex items-center justify-between">
                        <span>{products.find((x: any) => x.id === it.productId)?.name || it.productId} x{it.quantity}</span>
                        <span>₵{(it.price * it.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </VendorGuard>
  );
}
