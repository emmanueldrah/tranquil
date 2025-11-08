"use client";

import React, { useMemo, useState, useEffect } from 'react';
import LoadingInline from '@/components/ui/LoadingInline';
import ErrorBanner from '@/components/ui/ErrorBanner';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import VendorGuard, { useVendorForCurrentUser } from '@/components/vendor/VendorGuard';
import { getOrderById, getAllProducts, updateOrderStatus, addOrderNote, addTrackingEvent } from '@/data';

export default function VendorOrderDetailPage({ params }: { params: { id: string } }) {
  // In app router, client components can't receive params directly; read from location
  const router = useRouter();
  // Extract id from window.location as a fallback
  const id = (typeof window !== 'undefined') ? decodeURIComponent(window.location.pathname.split('/').pop() || '') : '';

  const { vendor, isAdmin } = useVendorForCurrentUser();
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
        if (mounted) setProducts(prods as any[]);
      } catch (err) {
        console.error('Failed to load products for vendor order detail', err);
        if (mounted) setLoadError('Failed to load products');
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);
  const [order, setOrder] = useState<any | null>(null);
  const [status, setStatus] = useState<'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('pending');
  const [noteText, setNoteText] = useState('');
  const [trackingStatus, setTrackingStatus] = useState('Shipped');
  const [trackingDesc, setTrackingDesc] = useState('');
  const [trackingLocation, setTrackingLocation] = useState('');

  if (!order) {
    return (
      <VendorGuard>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold">Order not found</h2>
        </div>
      </VendorGuard>
    );
  }

  // load order details
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const ord = await getOrderById(id);
        if (mounted) {
          setOrder(ord as any);
          setStatus(ord?.status || 'pending');
        }
      } catch (err) {
        console.error('Failed to load order:', err);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const vendorId = vendor?.id ?? null;

  const vendorItems = order.items.filter((it: any) => {
    const p = products.find((x: any) => x.id === it.productId);
    return p && (isAdmin || (vendorId && p.vendor === vendorId));
  });

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    await updateOrderStatus(order.id, status);
    // Refresh local state
    const updated = await getOrderById(order.id);
    setOrder(updated as any);
    alert('Order status updated');
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !order) return;
    const author = (typeof window !== 'undefined' && localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser') || '{}').email || 'vendor' : 'vendor';
    await addOrderNote(order.id, author, noteText.trim());
    setNoteText('');
    const updated = await getOrderById(order.id);
    setOrder(updated as any);
  };

  const handleAddTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    const event = {
      id: `t_${Date.now()}`,
      status: trackingStatus,
      description: trackingDesc,
      location: trackingLocation,
      timestamp: new Date().toISOString(),
      carrier: order.carrier || ''
    };
    await addTrackingEvent(order.id, event as any);
    setTrackingDesc('');
    setTrackingLocation('');
    const updated = await getOrderById(order.id);
    setOrder(updated as any);
  };

  const handlePrintLabel = async () => {
    const vendorItemsForPrint = vendorItems;
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;
    const allProducts = await getAllProducts();
    const html = `
      <html>
        <head>
          <title>Shipment Label - ${order.id}</title>
          <style>body{font-family:Arial,Helvetica,sans-serif;padding:20px} .section{margin-bottom:16px}</style>
        </head>
        <body>
          <h1>Shipment Label</h1>
          <div class="section"><strong>Order:</strong> ${order.id}</div>
          <div class="section"><strong>Ship To:</strong><br>${order.shippingAddress?.street || ''}<br>${order.shippingAddress?.city || ''}, ${order.shippingAddress?.region || ''}<br>${order.shippingAddress?.postalCode || ''}</div>
          <div class="section"><strong>Items:</strong><ul>${vendorItemsForPrint.map((it: any) => `<li>${(allProducts.find((p: any)=>p.id===it.productId)?.name)||it.productId} x${it.quantity}</li>`).join('')}</ul></div>
          <div class="section"><strong>Total:</strong> ₵${(order.totalAmount || 0).toFixed(2)}</div>
          <div class="section"><button onclick="window.print();">Print</button></div>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <VendorGuard>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Order {order.id}</h2>
          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-2">Items</h3>
            <div className="space-y-3">
              {isLoading ? (
                <LoadingInline message="Loading product details..." />
              ) : loadError ? (
                <ErrorBanner message={loadError} />
              ) : (
                vendorItems.map((it: any) => (
                  <div key={it.productId} className="flex items-center justify-between border rounded p-3">
                    <div>
                      <p className="font-medium">{products.find((p: any) => p.id === it.productId)?.name || it.productId}</p>
                      <p className="text-sm text-gray-500">Qty: {it.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₵{(it.price * it.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <div className="text-sm text-gray-700">
                <p>{order.shippingAddress?.street}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.region}</p>
                <p>{order.shippingAddress?.postalCode}</p>
              </div>
            </div>

            {order.trackingHistory && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Tracking</h3>
                <ul className="space-y-2 text-sm">
                  {order.trackingHistory.map((t: any) => (
                    <li key={t.id} className="border rounded p-2">
                      <p className="font-medium">{t.status}</p>
                      <p className="text-xs text-gray-500">{t.timestamp}</p>
                      <p className="text-sm">{t.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Vendor Notes */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Notes</h3>
              {order.notes && order.notes.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {order.notes.map((n: any, idx: number) => (
                    <li key={idx} className="border rounded p-2">
                      <p className="font-medium">{n.author}</p>
                      <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
                      <p className="text-sm mt-1">{n.message}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No notes yet.</p>
              )}

              <form onSubmit={handleAddNote} className="mt-3">
                <label className="block text-sm font-medium text-gray-700">Add note</label>
                <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" rows={3} />
                <div className="mt-2">
                  <Button type="submit" variant="primary" className="px-3 py-2">Add Note</Button>
                </div>
              </form>
            </div>

            {/* Add tracking event */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Add Tracking Event</h3>
              <form onSubmit={handleAddTracking} className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <input value={trackingStatus} onChange={(e) => setTrackingStatus(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input value={trackingLocation} onChange={(e) => setTrackingLocation(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input value={trackingDesc} onChange={(e) => setTrackingDesc(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
                </div>
                <div>
                  <Button type="submit" variant="secondary" className="px-3 py-2">Add Tracking Event</Button>
                </div>
              </form>
            </div>
          </div>

          <aside>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">Order Total</p>
              <p className="text-xl font-bold">₵{order.totalAmount?.toFixed?.(2) ?? order.totalAmount}</p>

              <form onSubmit={handleSaveStatus} className="mt-4 space-y-3">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full rounded border p-2">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <Button type="submit" variant="primary" className="w-full mt-2 px-4 py-2">Save Status</Button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </VendorGuard>
  );
}
