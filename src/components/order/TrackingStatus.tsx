'use client';

import { CheckCircle, Clock, Truck, XCircle, Package } from 'lucide-react';

interface TrackingStatusProps {
  status: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  carrier?: string;
}

export default function TrackingStatus({
  status,
  trackingNumber,
  estimatedDelivery,
  carrier
}: TrackingStatusProps) {
  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return {
          icon: <Clock className="h-6 w-6 text-yellow-500" />,
          color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          title: 'Order Placed',
          description: 'Your order has been received and is being processed.'
        };
      case 'processing':
        return {
          icon: <Package className="h-6 w-6 text-blue-500" />,
          color: 'text-blue-600 bg-blue-50 border-blue-200',
          title: 'Processing',
          description: 'Your order is being prepared for shipment.'
        };
      case 'shipped':
        return {
          icon: <Truck className="h-6 w-6 text-orange-500" />,
          color: 'text-orange-600 bg-orange-50 border-orange-200',
          title: 'Shipped',
          description: 'Your order has been shipped and is on its way.'
        };
      case 'delivered':
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          color: 'text-green-600 bg-green-50 border-green-200',
          title: 'Delivered',
          description: 'Your order has been successfully delivered.'
        };
      case 'cancelled':
        return {
          icon: <XCircle className="h-6 w-6 text-red-500" />,
          color: 'text-red-600 bg-red-50 border-red-200',
          title: 'Cancelled',
          description: 'Your order has been cancelled.'
        };
      default:
        return {
          icon: <Package className="h-6 w-6 text-gray-500" />,
          color: 'text-gray-600 bg-gray-50 border-gray-200',
          title: 'Unknown Status',
          description: 'Status information is being updated.'
        };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className={`p-6 rounded-lg border-2 ${statusInfo.color}`}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {statusInfo.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{statusInfo.title}</h3>
          <p className="text-sm opacity-90 mt-1">{statusInfo.description}</p>

          {trackingNumber && (
            <div className="mt-3">
              <p className="text-sm font-medium">Tracking Number:</p>
              <p className="text-sm font-mono bg-white bg-opacity-50 px-2 py-1 rounded mt-1">
                {trackingNumber}
              </p>
            </div>
          )}

          {carrier && (
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-medium">Carrier:</span> {carrier}
              </p>
            </div>
          )}

          {estimatedDelivery && status !== 'delivered' && status !== 'cancelled' && (
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-medium">Estimated Delivery:</span>{' '}
                {new Date(estimatedDelivery).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
