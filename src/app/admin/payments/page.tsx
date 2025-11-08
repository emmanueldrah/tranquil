'use client';

import { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, TrendingDown, Search, Filter, Eye, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { paymentService } from '@/utils/paymentService';

interface Payment {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  method: 'card' | 'paypal' | 'bank_transfer' | 'cash';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  transactionId: string;
  createdAt: string;
  processedAt?: string;
}

export default function PaymentsPage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed' | 'refunded'>('all');
  const [filterMethod, setFilterMethod] = useState<'all' | 'card' | 'paypal' | 'bank_transfer' | 'cash'>('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [payments, setPayments] = useState<Payment[]>(() => {
    const storedPayments = paymentService.getStoredPayments();
    const formattedPayments: Payment[] = storedPayments.map(p => ({
      id: p.id,
      orderId: p.orderId,
      customerName: p.customerName,
      customerEmail: p.customerEmail,
      amount: p.amount,
      currency: p.currency,
      method: p.method as 'card' | 'paypal' | 'bank_transfer' | 'cash',
      status: p.status as 'completed' | 'pending' | 'failed' | 'refunded',
      transactionId: p.transactionId || 'N/A',
      createdAt: p.createdAt,
      processedAt: p.processedAt
    }));
    return formattedPayments;
  });

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'refunded':
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'refunded':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      case 'paypal':
        return <DollarSign className="h-4 w-4" />;
      case 'bank_transfer':
        return <TrendingUp className="h-4 w-4" />;
      case 'cash':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;

  return (
    <div className="space-y-6">
      <Card style={{ background: 'var(--admin-bg-card)', borderColor: 'var(--admin-border)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Processing</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Manage payment methods, transactions, and processing settings.
            </p>
          </div>
          <Button variant="primary" className="px-4 py-2 rounded-lg hover:opacity-95 transition-colors" style={{ background: 'var(--admin-deep-blue)', color: 'var(--admin-text-white)' }}>
            Process Payment
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg p-6 text-white" style={{ background: 'var(--admin-gradient-success)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Revenue</p>
              <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
        </div>
        <div className="rounded-lg p-6 text-white" style={{ background: 'var(--admin-gradient-warning)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Pending Payments</p>
              <p className="text-2xl font-bold">{pendingPayments}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-200" />
          </div>
        </div>
        <div className="rounded-lg p-6 text-white" style={{ background: 'var(--admin-gradient-danger)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Failed Payments</p>
              <p className="text-2xl font-bold">{failedPayments}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by order ID, customer, or transaction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'pending' | 'failed' | 'refunded')}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CreditCard className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value as 'all' | 'card' | 'paypal' | 'bank_transfer' | 'cash')}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Methods</option>
              <option value="card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{payment.transactionId}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Order: {payment.orderId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{payment.customerName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{payment.customerEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ${payment.amount.toFixed(2)} {payment.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getMethodIcon(payment.method)}
                      <span className="ml-2 text-sm text-gray-900 dark:text-white capitalize">
                        {payment.method.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(payment.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button onClick={() => handleViewPayment(payment)} variant="ghost" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Eye className="h-4 w-4" />
                      </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No payments found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Payment Details Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Details</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      ${selectedPayment.amount.toFixed(2)} {selectedPayment.currency}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">Transaction ID: {selectedPayment.transactionId}</p>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(selectedPayment.status)}
                    <span className={`ml-2 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedPayment.status)}`}>
                      {selectedPayment.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Order ID</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPayment.orderId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</label>
                    <div className="flex items-center mt-1">
                      {getMethodIcon(selectedPayment.method)}
                      <span className="ml-2 text-sm text-gray-900 dark:text-white capitalize">
                        {selectedPayment.method.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPayment.customerName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedPayment.customerEmail}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Created At</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(selectedPayment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {selectedPayment.processedAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Processed At</label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(selectedPayment.processedAt).toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  {selectedPayment.status === 'pending' && (
                    <Button className="px-4 py-2" variant="primary" style={{ background: 'var(--admin-gradient-success)', color: 'var(--admin-text-white)' }}>
                      Process Payment
                    </Button>
                  )}
                  {selectedPayment.status === 'completed' && (
                    <Button className="px-4 py-2" variant="secondary" style={{ background: 'var(--admin-deep-blue)', color: 'var(--admin-text-white)' }}>
                      Refund Payment
                    </Button>
                  )}
                  <Button className="px-4 py-2" variant="ghost" style={{ background: 'var(--admin-bg-hover)', color: 'var(--admin-text-white)' }}>
                    Download Receipt
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
