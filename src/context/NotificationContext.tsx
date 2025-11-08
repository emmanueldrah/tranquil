'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Notification, NotificationPreferences } from '@/types/notifications';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences | null;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NOTIFICATIONS_KEY = 'notifications';
const PREFERENCES_KEY = 'notificationPreferences';

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(NOTIFICATIONS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return Array.isArray(parsed) ? parsed : [];
        }
      }
    } catch (error) {
      console.error('Error parsing notifications from localStorage:', error);
    }
    return [];
  });

  const [preferences, setPreferences] = useState<NotificationPreferences | null>(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedPrefs = localStorage.getItem(PREFERENCES_KEY);
        if (storedPrefs) {
          return JSON.parse(storedPrefs);
        }
      }
    } catch (error) {
      console.error('Error parsing notification preferences from localStorage:', error);
    }
    return null;
  });

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }, [notifications]);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (preferences) {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    }
  }, [preferences]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const updatePreferences = (newPreferences: Partial<NotificationPreferences>) => {
    setPreferences(prev => {
      if (!prev) {
        // Create default preferences if none exist
        return {
          userId: 'current-user', // In a real app, this would be the actual user ID
          emailNotifications: true,
          pushNotifications: true,
          smsNotifications: false,
          orderUpdates: true,
          promotionalEmails: true,
          shippingUpdates: true,
          reviewNotifications: true,
          systemAnnouncements: true,
          ...newPreferences,
        };
      }
      return { ...prev, ...newPreferences };
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        preferences,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        updatePreferences,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
