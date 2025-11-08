'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Ban, CheckCircle, Search, Filter, Edit, Eye, Trash2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
  lastLogin?: string;
  ordersCount: number;
  totalSpent: number;
  addresses: Array<{
    street: string;
    city: string;
    region: string;
    postalCode: string;
  }>;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'banned'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  // Customers initialized empty; in production this would be fetched from an API

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive':
        return <Ban className="h-4 w-4 text-yellow-500" />;
      case 'banned':
        return <Ban className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'banned':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700/20 dark:text-gray-400';
    }
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleStatusChange = (customerId: string, newStatus: 'active' | 'inactive' | 'banned') => {
    setCustomers(customers.map(customer =>
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Management</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Manage your customers and their information.
            </p>
          </div>
          <Button variant="primary" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {/* open add modal (kept behavior) */}}>
            Add New Customer
          </Button>
        </div>
      </Card>

      {/* Filters */}
      <Card className="bg-white dark:bg-gray-800 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive' | 'banned')}
              className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="bg-white dark:bg-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </div>
                        {customer.phone && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(customer.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {customer.ordersCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button onClick={() => handleViewCustomer(customer)} variant="ghost" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <select
                        value={customer.status}
                        onChange={(e) => handleStatusChange(customer.id, e.target.value as 'active' | 'inactive' | 'banned')}
                        className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="banned">Ban</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No customers found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Customer Details Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Details</h3>
                <Button onClick={() => setShowCustomerModal(false)} variant="ghost" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedCustomer.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedCustomer.email}</p>
                    {selectedCustomer.phone && (
                      <p className="text-gray-600 dark:text-gray-400">{selectedCustomer.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <div className="flex items-center mt-1">
                      {getStatusIcon(selectedCustomer.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCustomer.status)}`}>
                        {selectedCustomer.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Orders</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedCustomer.ordersCount}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Spent</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">${selectedCustomer.totalSpent.toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Join Date</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{new Date(selectedCustomer.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Addresses</label>
                  <div className="space-y-2">
                    {selectedCustomer.addresses.map((address, index) => (
                      <div key={index} className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                        <div className="text-sm text-gray-900 dark:text-white">
                          <p>{address.street}</p>
                          <p>{address.city}, {address.region} {address.postalCode}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
