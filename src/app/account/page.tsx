'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Order, Address } from '@/types';
import { Settings, CreditCard, User as UserIcon } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'orders', label: 'Orders', icon: CreditCard },
    { id: 'addresses', label: 'Addresses', icon: Settings },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <aside className="lg:col-span-3 mb-8 lg:mb-0">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-stone-100 text-slate-900'
                        : 'text-slate-600 hover:bg-stone-100 hover:text-slate-900'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-9">
            {activeTab === 'profile' && <ProfileTab user={user} />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'addresses' && <AddressesTab addresses={[]} />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) {
    return <div className="bg-white shadow sm:rounded-lg p-6 text-center">Loading orders...</div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white shadow sm:rounded-lg p-6 text-center">
        <p className="text-slate-500">You have not placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-xl leading-6 font-bold text-slate-900 mb-6">Order History</h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 hover:bg-stone-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-slate-800">Order #{order.id}</p>
                  <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-slate-500">{order.items.length} items</p>
                <p className="text-md font-semibold text-slate-900">Total: ${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ user }: { user: { name: string; email: string } }) { return <div className="bg-white shadow sm:rounded-lg p-6"><h3 className="text-xl font-bold">Profile</h3><p className="mt-4 text-slate-600">Name: {user.name}</p><p className="text-slate-600">Email: {user.email}</p></div>; }
function AddressesTab({ addresses }: { addresses: Address[] }) { return <div className="bg-white shadow sm:rounded-lg p-6"><h3 className="text-xl font-bold">Addresses</h3><p className="mt-4 text-slate-500">No addresses saved.</p></div>; }
function SettingsTab() { return <div className="bg-white shadow sm:rounded-lg p-6"><h3 className="text-xl font-bold">Settings</h3><p className="mt-4 text-slate-500">Settings will be available soon.</p></div>; }
