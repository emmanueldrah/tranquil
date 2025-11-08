'use client';

import { useState } from 'react';
import { Truck, MapPin, Clock, DollarSign, Plus, Edit, Trash2, Settings, Package, Globe } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ShippingMethod {
  id: string;
  name: string;
  carrier: string;
  type: 'standard' | 'express' | 'overnight';
  zones: string[];
  rates: {
    minWeight: number;
    maxWeight: number;
    price: number;
    currency: string;
  }[];
  estimatedDays: string;
  isActive: boolean;
}

interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  states: string[];
  postalCodes: string[];
}

export default function ShippingPage() {
  const [activeTab, setActiveTab] = useState('methods');
  const [editingMethod, setEditingMethod] = useState<string | null>(null);
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [showAddZoneModal, setShowAddZoneModal] = useState(false);
  const [newMethod, setNewMethod] = useState({
    name: '',
    carrier: '',
    type: 'standard' as 'standard' | 'express' | 'overnight',
    zones: [] as string[],
    rates: [{ minWeight: 0, maxWeight: 1, price: 0, currency: 'GHS' }],
    estimatedDays: '',
    isActive: true
  });
  const [newZone, setNewZone] = useState({
    name: '',
    countries: [] as string[],
    states: [] as string[],
    postalCodes: [] as string[]
  });

  // Mock shipping methods
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([
    {
      id: '1',
      name: 'Standard Shipping',
      carrier: 'Local Courier',
      type: 'standard',
      zones: ['Ghana'],
      rates: [
        { minWeight: 0, maxWeight: 1, price: 15, currency: 'GHS' },
        { minWeight: 1, maxWeight: 5, price: 25, currency: 'GHS' },
        { minWeight: 5, maxWeight: 10, price: 40, currency: 'GHS' }
      ],
      estimatedDays: '3-5 business days',
      isActive: true
    },
    {
      id: '2',
      name: 'Express Shipping',
      carrier: 'Fast Delivery Co.',
      type: 'express',
      zones: ['Ghana'],
      rates: [
        { minWeight: 0, maxWeight: 2, price: 35, currency: 'GHS' },
        { minWeight: 2, maxWeight: 5, price: 55, currency: 'GHS' }
      ],
      estimatedDays: '1-2 business days',
      isActive: true
    },
    {
      id: '3',
      name: 'International Standard',
      carrier: 'Global Shipping',
      type: 'standard',
      zones: ['Nigeria', 'Kenya', 'South Africa'],
      rates: [
        { minWeight: 0, maxWeight: 1, price: 50, currency: 'USD' },
        { minWeight: 1, maxWeight: 5, price: 80, currency: 'USD' }
      ],
      estimatedDays: '7-14 business days',
      isActive: false
    }
  ]);

  // Mock shipping zones
  const [shippingZones] = useState<ShippingZone[]>([
    {
      id: '1',
      name: 'Ghana',
      countries: ['Ghana'],
      states: ['Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central', 'Volta', 'Northern', 'Upper East', 'Upper West', 'Bono', 'Bono East', 'Ahafo', 'Savannah', 'North East', 'Oti'],
      postalCodes: []
    },
    {
      id: '2',
      name: 'West Africa',
      countries: ['Nigeria', 'Togo', 'Benin', 'Burkina Faso', 'Ivory Coast'],
      states: [],
      postalCodes: []
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'standard':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'express':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'overnight':
        return 'text-blue-700 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const tabs = [
    { id: 'methods', label: 'Shipping Methods', icon: Truck },
    { id: 'zones', label: 'Shipping Zones', icon: MapPin },
    { id: 'tracking', label: 'Tracking', icon: Package }
  ];

  return (
    <div className="space-y-6">
      <Card style={{ background: 'var(--admin-bg-card)', borderColor: 'var(--admin-border)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shipping Management</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Configure shipping methods, rates, and tracking information.
            </p>
          </div>
          <Button variant="primary" className="flex items-center px-4 py-2 rounded-lg hover:opacity-95 transition-colors" style={{ background: 'var(--admin-deep-blue)', color: 'var(--admin-text-white)' }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Method
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant="ghost"
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'methods' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shippingMethods.map((method) => (
                  <div key={method.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{method.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{method.carrier}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(method.type)}`}>
                          {method.type}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${method.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        {method.estimatedDays}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Globe className="h-4 w-4 mr-2" />
                        {method.zones.join(', ')}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <DollarSign className="h-4 w-4 mr-2" />
                        From {method.rates[0].price} {method.rates[0].currency}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 flex items-center justify-center px-3 py-2 text-sm rounded-lg hover:opacity-95 transition-colors" variant="primary" style={{ background: 'var(--admin-deep-blue)', color: 'var(--admin-text-white)' }}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button className="flex items-center justify-center px-3 py-2 text-sm rounded-lg" variant="ghost" style={{ background: 'var(--admin-bg-hover)', color: 'var(--admin-text-white)' }}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Method Card */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Add New Shipping Method</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Create a new shipping method with custom rates and zones
                </p>
                <Button variant="primary" className="px-4 py-2 rounded-lg hover:opacity-95 transition-colors" style={{ background: 'var(--admin-deep-blue)', color: 'var(--admin-text-white)' }}>
                  <Plus className="h-4 w-4 mr-2 inline" />
                  Add Method
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'zones' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shippingZones.map((zone) => (
                  <div key={zone.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{zone.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {zone.countries.length} countries, {zone.states.length} states
                        </p>
                      </div>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Countries:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{zone.countries.join(', ')}</p>
                      </div>
                      {zone.states.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">States/Provinces:</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{zone.states.slice(0, 5).join(', ')}{zone.states.length > 5 ? '...' : ''}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Zone Card */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Add New Shipping Zone</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Define geographic areas for shipping calculations
                </p>
                <Button variant="primary" className="px-4 py-2 rounded-lg hover:opacity-95 transition-colors" style={{ background: 'var(--admin-deep-blue)', color: 'var(--admin-text-white)' }}>
                  <Plus className="h-4 w-4 mr-2 inline" />
                  Add Zone
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                <div className="flex">
                  <Package className="h-6 w-6 text-yellow-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">
                      Tracking Integration Coming Soon
                    </h3>
                    <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                      Automatic tracking updates and carrier integrations will be available in the next update.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Shipments</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-600">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Order #12345</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tracking: 1Z999AA1234567890</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">Delivered</p>
                      <p className="text-xs text-gray-500">Nov 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-600">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Order #12346</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tracking: 1Z999AA1234567891</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">In Transit</p>
                      <p className="text-xs text-gray-500">Nov 14, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
