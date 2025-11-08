'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Save, X, Camera } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AdminProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('adminProfileImage');
    } catch {
      return null;
    }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState(() => {
    const base = {
      name: user?.name || 'Admin User',
      email: user?.email || 'admin@example.com',
      phone: user?.phone || '+1234567890',
      role: user?.role === 'admin' ? 'Super Admin' : 'Admin',
      joinDate: '2024-01-01',
      lastLogin: '2024-11-15',
      permissions: ['All Access', 'User Management', 'Product Management', 'Order Management'],
      address: 'Accra, Ghana'
    } as any;

    try {
      const saved = localStorage.getItem('adminProfile');
      if (saved) {
        return { ...base, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error parsing saved profile:', e);
    }

    return base;
  });

  const [editForm, setEditForm] = useState(() => {
    try {
      const saved = localStorage.getItem('adminProfile');
      if (saved) return { ...JSON.parse(saved) };
    } catch {}

    return {
      name: user?.name || 'Admin User',
      email: user?.email || 'admin@example.com',
      phone: user?.phone || '+1234567890',
      role: user?.role === 'admin' ? 'Super Admin' : 'Admin',
      joinDate: '2024-01-01',
      lastLogin: '2024-11-15',
      permissions: ['All Access', 'User Management', 'Product Management', 'Order Management'],
      address: 'Accra, Ghana'
    } as any;
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setProfileImage(imageData);
        localStorage.setItem('adminProfileImage', imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    // Save profile data to localStorage
    localStorage.setItem('adminProfile', JSON.stringify(editForm));

  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card style={{ background: 'var(--admin-bg-card)', borderColor: 'var(--admin-border)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Profile</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences.
            </p>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="secondary"
              className="flex items-center px-4 py-2 rounded-lg hover:opacity-95 transition-colors"
              style={{ background: 'var(--admin-deep-blue)', color: 'var(--admin-text-white)' }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  ) : (
                  <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'var(--admin-gradient-primary)' }}>
                    <User className="h-12 w-12 text-white" />
                  </div>
                )}
                {isEditing && (
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="secondary"
                    className="absolute bottom-0 right-0 p-1.5 rounded-full hover:opacity-95 transition-colors"
                    style={{ background: 'var(--admin-deep-blue)', color: 'var(--admin-text-white)' }}
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {profile.name}
              </h3>
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-4 w-4 text-[var(--admin-deep-blue)] mr-1" />
                <span className="text-sm text-[var(--admin-deep-blue)] font-medium">{profile.role}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{profile.email}</p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                Joined {new Date(profile.joinDate).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                {profile.address}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Profile Information
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900 dark:text-white">{profile.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900 dark:text-white">{profile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900 dark:text-white">{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <Shield className="h-4 w-4 mr-2" style={{ color: 'var(--admin-deep-blue)' }} />
                    <span className="text-gray-900 dark:text-white">{profile.role}</span>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Permissions
                </label>
                <div className="flex flex-wrap gap-2">
                  {profile.permissions.map((permission: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex space-x-3 pt-4">
                  <Button onClick={handleSave} variant="primary" className="flex items-center" style={{ background: 'var(--admin-accent-green)', color: 'var(--admin-text-white)' }}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="ghost" className="flex items-center" style={{ background: 'var(--admin-border)', color: 'var(--admin-text)' }}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Logged in to admin panel</span>
                </div>
                <span className="text-xs text-gray-500">{profile.lastLogin}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Updated product inventory</span>
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-700 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Created new user account</span>
                </div>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
