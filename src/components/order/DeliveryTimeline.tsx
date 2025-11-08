'use client';

import { TrackingEvent } from '@/types';
import { CheckCircle, Clock, Truck, MapPin } from 'lucide-react';

interface DeliveryTimelineProps {
  trackingHistory: TrackingEvent[];
  currentStatus: string;
}

export default function DeliveryTimeline({ trackingHistory, currentStatus }: DeliveryTimelineProps) {
  const getStatusIcon = (status: string, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }

    switch (status.toLowerCase()) {
      case 'shipped':
      case 'in transit':
      case 'out for delivery':
        return <Truck className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) return 'text-green-600 bg-green-50 border-green-200';
    if (isCurrent) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-gray-400 bg-gray-50 border-gray-200';
  };

  const sortedHistory = [...trackingHistory].sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Timeline</h3>

      <div className="space-y-4">
        {sortedHistory.map((event, index) => {
          const isCompleted = index === 0; // Latest event is current/completed
          const isCurrent = event.status.toLowerCase() === currentStatus.toLowerCase();

          return (
            <div key={event.id} className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStatusColor(isCompleted, isCurrent)}`}>
                {getStatusIcon(event.status, isCompleted)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-medium ${isCompleted ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-gray-600'}`}>
                    {event.status}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {new Date(event.timestamp).toLocaleDateString()} at {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-1">{event.description}</p>

                {event.location && (
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </div>
                )}

                {event.carrier && (
                  <div className="text-xs text-gray-500 mt-1">
                    Carrier: {event.carrier}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {sortedHistory.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p>No tracking information available yet.</p>
        </div>
      )}
    </div>
  );
}
