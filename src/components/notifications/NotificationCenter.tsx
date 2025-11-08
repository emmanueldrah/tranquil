'use client';

import { useState } from 'react';
import { Bell, X, Trash2, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNotifications } from '@/context/NotificationContext';
import { Notification } from '@/types/notifications';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    // Use useEffect for navigation
    if (notification.actionUrl) {
      const url = notification.actionUrl;
      // Use Next.js router or similar for client-side navigation
      // For this example, we'll just set a timeout to avoid the React warning
      setTimeout(() => {
        window.location.href = url;
      }, 0);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return '📦';
      case 'promotion':
        return '🎉';
      case 'shipping':
        return '🚚';
      case 'review':
        return '⭐';
      case 'system':
        return 'ℹ️';
      default:
        return '🔔';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 rounded-full hover:bg-indigo-50"
        aria-expanded={isOpen}
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Panel */}
          <div className="absolute right-0 mt-2 w-96 max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <Button type="button" variant="ghost" onClick={markAllAsRead} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 p-0">
                    <CheckCheck className="w-4 h-4" />
                    Mark all read
                  </Button>
                )}
                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium">No notifications yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    We&apos;ll notify you when something important happens
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.isRead ? 'bg-indigo-50/50' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Notification Icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-lg">
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className={`text-sm font-semibold text-gray-900 ${
                                !notification.isRead ? 'font-bold' : ''
                              }`}>
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {formatTimeAgo(notification.createdAt)}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 ml-2">
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                              )}
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                aria-label="Delete notification"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <Button type="button" variant="ghost" className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all notifications</Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
