import type { Notification } from '@/types/notifications';

export class NotificationService {
  private static instance: NotificationService;
  private swRegistration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Initialize push notifications
  async initializePushNotifications(): Promise<void> {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        this.swRegistration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  // Request notification permission
  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  // Subscribe to push notifications
  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.swRegistration) {
      console.warn('Service Worker not registered');
      return null;
    }

    try {
      const subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
        ),
      });

      console.log('Push subscription successful:', subscription);
      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }

  // Send notification (for demo purposes - in real app, this would be server-side)
  async sendNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<void> {
    if (Notification.permission === 'granted') {
      const options: NotificationOptions = {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.type,
        requireInteraction: false,
        silent: false,
        data: {
          url: notification.actionUrl,
          type: notification.type,
        },
      };

      // Add specific icons based on notification type
      switch (notification.type) {
        case 'order':
          options.icon = '/icons/order.png';
          break;
        case 'promotion':
          options.icon = '/icons/promotion.png';
          break;
        case 'shipping':
          options.icon = '/icons/shipping.png';
          break;
        case 'review':
          options.icon = '/icons/review.png';
          break;
        default:
          options.icon = '/favicon.ico';
      }

      const browserNotification = new Notification(notification.title, options);

      browserNotification.onclick = () => {
        if (notification.actionUrl) {
          window.focus();
          window.location.href = notification.actionUrl;
        }
        browserNotification.close();
      };

      // Auto-close after 5 seconds
      setTimeout(() => {
        browserNotification.close();
      }, 5000);
    }
  }

  // Create order-related notifications
  createOrderNotification(orderId: string, status: string): Omit<Notification, 'id' | 'createdAt'> {
    const messages = {
      pending: 'Your order has been placed successfully!',
      processing: 'Your order is being processed.',
      shipped: 'Your order has been shipped!',
      delivered: 'Your order has been delivered successfully!',
      cancelled: 'Your order has been cancelled.',
    };

    return {
      userId: 'current-user', // In real app, use actual user ID
      type: 'order',
      title: 'Order Update',
      message: messages[status as keyof typeof messages] || 'Order status updated',
      isRead: false,
      actionUrl: `/account/orders/${orderId}`,
      metadata: { orderId, status },
    };
  }

  // Create shipping notifications
  createShippingNotification(orderId: string, trackingNumber: string): Omit<Notification, 'id' | 'createdAt'> {
    return {
      userId: 'current-user',
      type: 'shipping',
      title: 'Shipping Update',
      message: `Your order is on the way! Track with: ${trackingNumber}`,
      isRead: false,
      actionUrl: `/account/orders/${orderId}`,
      metadata: { orderId, trackingNumber },
    };
  }

  // Create promotional notifications
  createPromotionNotification(title: string, message: string, actionUrl?: string): Omit<Notification, 'id' | 'createdAt'> {
    return {
      userId: 'current-user',
      type: 'promotion',
      title,
      message,
      isRead: false,
      actionUrl: actionUrl || '/categories',
      metadata: { promotion: true },
    };
  }

  // Create review notifications
  createReviewNotification(productId: string, productName: string): Omit<Notification, 'id' | 'createdAt'> {
    return {
      userId: 'current-user',
      type: 'review',
      title: 'Review Your Purchase',
      message: `How was your experience with ${productName}? Share your review!`,
      isRead: false,
      actionUrl: `/products/${productId}#reviews`,
      metadata: { productId, productName },
    };
  }

  // Create system notifications
  createSystemNotification(title: string, message: string): Omit<Notification, 'id' | 'createdAt'> {
    return {
      userId: 'current-user',
      type: 'system',
      title,
      message,
      isRead: false,
      metadata: { system: true },
    };
  }

  // Utility function to convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(new ArrayBuffer(rawData.length));

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export const notificationService = NotificationService.getInstance();
