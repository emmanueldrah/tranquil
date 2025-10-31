'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Order, Address } from '@/types';

export default function Account() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          {/* Sidebar */}
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'bg-gray-50 text-blue-600'
                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <span className="truncate">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`${
                  activeTab === 'orders'
                    ? 'bg-gray-50 text-blue-600'
                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <span className="truncate">Orders</span>
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`${
                  activeTab === 'addresses'
                    ? 'bg-gray-50 text-blue-600'
                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <span className="truncate">Addresses</span>
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`${
                  activeTab === 'wishlist'
                    ? 'bg-gray-50 text-blue-600'
                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <span className="truncate">Wishlist</span>
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            {activeTab === 'profile' && <ProfileTab user={user} />}
            {activeTab === 'orders' && <OrdersTab orders={user.orders} />}
            {activeTab === 'addresses' && <AddressesTab addresses={user.addresses} />}
            {activeTab === 'wishlist' && <WishlistTab wishlist={user.wishlist} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user profile logic here
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Profile Information
        </h3>
        {!isEditing ? (
          <div className="mt-5">
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user.phone || 'Not provided'}
                </dd>
              </div>
            </dl>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function OrdersTab({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="bg-white shadow sm:rounded-lg p-6">
        <p className="text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Order History
        </h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {order.items.length} items
                </p>
                <p className="text-sm font-medium">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AddressesTab({ addresses }: { addresses: Address[] }) {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Saved Addresses
          </h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            Add New Address
          </button>
        </div>
        {addresses.length === 0 ? (
          <p className="text-gray-500">No addresses saved.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      address.isDefault
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {address.type}
                  </span>
                  {address.isDefault && (
                    <span className="text-sm text-blue-600">Default</span>
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-sm">{address.street}</p>
                  <p className="text-sm">
                    {address.city}, {address.region} {address.postalCode}
                  </p>
                </div>
                <div className="mt-4 flex space-x-4">
                  <button className="text-blue-600 text-sm hover:text-blue-800">
                    Edit
                  </button>
                  <button className="text-red-600 text-sm hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WishlistTab({ wishlist }: { wishlist: string[] }) {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Wishlist
        </h3>
        {wishlist.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Add wishlist items display logic here */}
          </div>
        )}
      </div>
    </div>
  );
}