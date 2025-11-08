export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'promotion' | 'system' | 'review' | 'shipping' | 'success';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  promotionalEmails: boolean;
  shippingUpdates: boolean;
  reviewNotifications: boolean;
  systemAnnouncements: boolean;
}

export interface PushSubscription {
  userId: string;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}
