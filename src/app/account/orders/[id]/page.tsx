'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { mockOrders, products } from '@/data/mock';
import TrackingStatus from '@/components/order/TrackingStatus';
import DeliveryTimeline from '@/components/order/DeliveryTimeline';
import { ArrowLeft, Package, MapPin } from 'lucide-react';
import { getFirstValidImage } from '@/utils/imageUtils';

export default function OrderTrackingPage() {
  const { user } = useAuth();
  const params = useParams();
  const orderId = params.id as string;

  const order = useMemo(() => {
    const foundOrder = mockOrders.find(o => o.id === orderId);
    return foundOrder || null;
  }, [orderId]);

  const loading = false;

  if (!user) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
            <p className="text-gray-600 mb-6">You need to be logged in to view order details.</p>
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

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading order details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!order) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-6">The order you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.</p>
            <Link
              href="/account/orders"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/account/orders"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Tracking</h1>
          <p className="text-gray-600">Track your order #{order?.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tracking Status */}
            <TrackingStatus
              status={order.status}
              trackingNumber={order.trackingNumber}
              estimatedDelivery={order.estimatedDelivery}
              carrier={order.carrier}
            />

            {/* Delivery Timeline */}
            {order.trackingHistory && order.trackingHistory.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <DeliveryTimeline
                  trackingHistory={order.trackingHistory}
                  currentStatus={order.status}
                />
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => {
                  const product = getProductDetails(item.productId);
                  return (
                    <div key={item.productId} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        {product?.images && (
                          <Image
                            src={getFirstValidImage(product.images)}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {product?.name || 'Product'}
                        </h4>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-medium">{order.items.length}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Shipping Address
              </h3>
              <div className="text-sm text-gray-600">
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.region}</p>
                <p>{order.shippingAddress.postalCode}</p>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-700 mb-4">
                If you have any questions about your order, contact our support team.
              </p>
              <div className="space-y-2">
                <Link
                  href="/contact"
                  className="block text-sm text-blue-600 hover:text-blue-800"
                >
                  Contact Support
                </Link>
                <Link
                  href="/returns"
                  className="block text-sm text-blue-600 hover:text-blue-800"
                >
                  Return Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
