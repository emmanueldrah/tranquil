 'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types';
import Link from 'next/link';
import { Eye, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

export default function AccountOrdersPage() {
  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    fetch('/api/orders')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const myOrders: Order[] = (data || [])
          .filter((o: unknown) => o && typeof o === 'object' && 'userId' in o && o.userId === user.id)
          .map((o: unknown) => {
            const obj = o as Record<string, unknown>;
            return {
              id: obj.id as string,
              userId: obj.userId as string,
              items: (obj.items as unknown[]) || [],
              totalAmount: (obj.totalAmount as number) || 0,
              status: (obj.status as Order['status']) || 'pending',
              paymentMethod: (obj.paymentMethod as string) || '',
              shippingAddress: (obj.shippingAddress as unknown) || { id: '', type: 'home', street: '', city: '', region: '', postalCode: '', isDefault: false },
              createdAt: (obj.createdAt as string) || new Date().toISOString(),
              updatedAt: (obj.updatedAt as string) || new Date().toISOString(),
              trackingNumber: (obj.trackingNumber as string) || undefined
            };
          });
        setOrders(myOrders);
      })
      .catch((err) => console.error('Failed to load orders for account:', err));
    return () => { mounted = false; };
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
            <p className="text-gray-600 mb-6">You need to be logged in to view your orders.</p>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your recent orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">When you place your first order, it will appear here.</p>
            <Link
              href="/categories"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <p className="text-gray-600">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-600">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        ${order.totalAmount.toFixed(2)}
                      </div>
                    </div>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/account"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Account
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
