'use client';

import { useState, useEffect } from 'react';
import { Settings, Save, Bell, Mail, MessageSquare, Package, Truck, Star, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNotifications } from '@/context/NotificationContext';

export function NotificationPreferences() {
  const { preferences, updatePreferences } = useNotifications();
  const [localPreferences, setLocalPreferences] = useState(() => preferences || {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotionalEmails: true,
    shippingUpdates: true,
    reviewNotifications: true,
    systemAnnouncements: true,
  });

  const handleSave = () => {
    updatePreferences(localPreferences);
    // You could add a toast notification here
    alert('Notification preferences saved successfully!');
  };

  const handleToggle = (key: keyof typeof localPreferences) => {
    setLocalPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const preferenceGroups = [
    {
      title: 'General Notifications',
      icon: Bell,
      items: [
        {
          key: 'emailNotifications' as const,
          label: 'Email Notifications',
          description: 'Receive notifications via email',
          icon: Mail,
        },
        {
          key: 'pushNotifications' as const,
          label: 'Push Notifications',
          description: 'Receive browser push notifications',
          icon: Bell,
        },
        {
          key: 'smsNotifications' as const,
          label: 'SMS Notifications',
          description: 'Receive important updates via SMS',
          icon: MessageSquare,
        },
      ],
    },
    {
      title: 'Order & Shipping',
      icon: Package,
      items: [
        {
          key: 'orderUpdates' as const,
          label: 'Order Updates',
          description: 'Get notified about order status changes',
          icon: Package,
        },
        {
          key: 'shippingUpdates' as const,
          label: 'Shipping Updates',
          description: 'Track your packages in real-time',
          icon: Truck,
        },
      ],
    },
    {
      title: 'Marketing & Reviews',
      icon: Star,
      items: [
        {
          key: 'promotionalEmails' as const,
          label: 'Promotional Emails',
          description: 'Receive special offers and promotions',
          icon: Star,
        },
        {
          key: 'reviewNotifications' as const,
          label: 'Review Notifications',
          description: 'Get notified when someone reviews your purchases',
          icon: Star,
        },
      ],
    },
    {
      title: 'System',
      icon: Info,
      items: [
        {
          key: 'systemAnnouncements' as const,
          label: 'System Announcements',
          description: 'Important platform updates and maintenance notices',
          icon: Info,
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-black">Notification Preferences</h1>
              <p className="text-purple-100 mt-1">Customize how you receive notifications</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {preferenceGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <group.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{group.title}</h2>
              </div>

              <div className="space-y-4 ml-4">
                {group.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <item.icon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.label}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={localPreferences[item.key]}
                        onChange={() => handleToggle(item.key)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end">
            <Button onClick={handleSave} variant="primary" className="flex items-center gap-2 px-6 py-3">
              <Save className="w-5 h-5" />
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
