 'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Edit,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  DollarSign,
  User,
  Calendar,
  Download,
  RefreshCw,
  Trash2
} from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  orderDate: string;
  shippingAddress: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  };
  trackingNumber?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');
  const [filterPayment, setFilterPayment] = useState<'all' | 'paid' | 'pending' | 'failed' | 'refunded'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchOrders() {
    setIsFetching(true);
    try {
      const response = await fetch('/api/admin/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const mapped: Order[] = (data.recentOrders || []).map((o: unknown) => {
        const obj = o as Record<string, unknown>;
        return {
          id: String(obj.id || ''),
          customerName: String(obj.customer || 'Unknown'),
          customerEmail: String(obj.userEmail || ''),
          totalAmount: Number(obj.amount || 0),
          currency: 'USD',
          status: (obj.status as Order['status']) || 'pending',
          paymentStatus: String(obj.paymentStatus || 'pending') as Order['paymentStatus'],
          items: Array.isArray(obj.items) ? obj.items : [],
          orderDate: String(obj.time || new Date().toISOString()),
          shippingAddress: obj.shippingAddress && typeof obj.shippingAddress === 'object' ? obj.shippingAddress as Order['shippingAddress'] : { street: '', city: '', region: '', postalCode: '' },
          trackingNumber: obj.trackingNumber ? String(obj.trackingNumber) : undefined
        };
      });
      setOrders(mapped);
    } catch (err) {
      console.error('Failed to load orders:', err);
      setOrders([]); // Set to empty array on error
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesPayment = filterPayment === 'all' || order.paymentStatus === filterPayment;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing': return <Package className="h-4 w-4 text-blue-500" />;
      case 'shipped': return <Truck className="h-4 w-4 text-orange-500" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'processing': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'shipped': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'delivered': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700/20 dark:text-gray-400';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'refunded': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700/20 dark:text-gray-400';
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await fetch(`/api/orders/${orderId}`,
          { method: 'DELETE' }
        );
        if (response.ok) {
          setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
          alert('Order deleted successfully');
        } else {
          let errorMessage = 'Failed to delete order';
          try {
            const data = await response.json();
            errorMessage = data.error || errorMessage;
          } catch (e) {
            errorMessage = response.statusText;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        alert((error as Error).message);
      }
    }
  };
  
  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const processingOrders = orders.filter(o => o.status === 'processing').length;

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold text-gray-800 dark:text-white">Order Management</h1><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Manage customer orders, track shipments, and process payments.</p></div>
          <div className="flex items-center space-x-3"><Button onClick={fetchOrders} disabled={isFetching} variant="ghost" className="flex items-center px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 shadow"><RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />Refresh</Button><Button variant="secondary" className="flex items-center px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow"><Download className="h-4 w-4 mr-2" />Export</Button></div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-500 text-white p-6"><div className="flex items-center justify-between"><div><p className="text-green-100">Total Revenue</p><p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p></div><DollarSign className="h-8 w-8 text-green-200" /></div></Card>
        <Card className="bg-yellow-500 text-white p-6"><div className="flex items-center justify-between"><div><p className="text-yellow-100">Pending Orders</p><p className="text-2xl font-bold">{pendingOrders}</p></div><Clock className="h-8 w-8 text-yellow-200" /></div></Card>
        <Card className="bg-blue-500 text-white p-6"><div className="flex items-center justify-between"><div><p className="text-blue-100">Processing</p><p className="text-2xl font-bold">{processingOrders}</p></div><Package className="h-8 w-8 text-blue-200" /></div></Card>
      </div>

      <Card className="bg-white dark:bg-gray-800 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div><input type="text" placeholder="Search by order ID, customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)} className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="all">All Status</option><option value="pending">Pending</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select>
          <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="h-5 w-5 text-gray-400" /></div><select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value as any)} className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="all">All Payments</option><option value="paid">Paid</option><option value="pending">Pending</option><option value="failed">Failed</option><option value="refunded">Refunded</option></select></div>
        </div>
      </Card>

      <Card className="bg-white dark:bg-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"><thead className="bg-gray-50 dark:bg-gray-700"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th></tr></thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (<tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700"><td className="px-6 py-4 whitespace-nowrap"><div><div className="text-sm font-medium text-gray-900 dark:text-white">{order.id}</div><div className="text-sm text-gray-500 dark:text-gray-400">{order.items.length} items</div></div></td><td className="px-6 py-4 whitespace-nowrap"><div><div className="text-sm font-medium text-gray-900 dark:text-white">{order.customerName}</div><div className="text-sm text-gray-500 dark:text-gray-400">{order.customerEmail}</div></div></td><td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900 dark:text-white">${order.totalAmount.toFixed(2)} {order.currency}</div></td><td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center">{getStatusIcon(order.status)}<span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>{order.status}</span></div></td><td className="px-6 py-4 whitespace-nowrap"><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>{order.paymentStatus}</span></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"><div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{new Date(order.orderDate).toLocaleDateString()}</div></td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><div className="flex space-x-2"><Button onClick={() => handleViewOrder(order)} variant="ghost" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"><Eye className="h-4 w-4" /></Button><Button variant="ghost" className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"><Edit className="h-4 w-4" /></Button><Button onClick={() => handleDeleteOrder(order.id)} variant="ghost" className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"><Trash2 className="h-4 w-4" /></Button><select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])} className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><option value="pending">Pending</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select></div></td></tr>))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredOrders.length === 0 && (<div className="text-center py-12"><ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" /><h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders found</h3><p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p></div>)}

      {showOrderModal && selectedOrder && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><Card className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"><div className="p-6"><div className="flex items-center justify-between mb-6"><h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Details - {selectedOrder.id}</h3><button onClick={() => setShowOrderModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div className="space-y-6"><div><h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Order Information</h4><div className="space-y-3"><div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Order Date:</span><span className="text-sm text-gray-900 dark:text-white">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span></div><div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Status:</span><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span></div><div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Payment:</span><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>{selectedOrder.paymentStatus}</span></div>{selectedOrder.trackingNumber && (<div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Tracking:</span><span className="text-sm text-gray-900 dark:text-white">{selectedOrder.trackingNumber}</span></div>)}</div></div><div><h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Customer Information</h4><div className="space-y-3"><div className="flex items-center"><User className="h-4 w-4 text-gray-400 mr-2" /><span className="text-sm text-gray-900 dark:text-white">{selectedOrder.customerName}</span></div><div className="flex items-center"><span className="text-sm text-gray-600 dark:text-gray-400">@</span><span className="text-sm text-gray-900 dark:text-white ml-2">{selectedOrder.customerEmail}</span></div></div></div><div><h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h4><div className="text-sm text-gray-600 dark:text-gray-400"><p>{selectedOrder.shippingAddress.street}</p><p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.region}</p><p>{selectedOrder.shippingAddress.postalCode}</p></div></div></div><div><h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Order Items</h4><div className="space-y-4">{selectedOrder.items.map((item) => (<div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><div><p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p></div><p className="text-sm font-semibold text-gray-900 dark:text-white">${item.price.toFixed(2)}</p></div>))}<div className="border-t border-gray-200 dark:border-gray-600 pt-4"><div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white"><span>Total:</span><span>${selectedOrder.totalAmount.toFixed(2)} {selectedOrder.currency}</span></div></div></div></div></div><div className="flex space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700"><Button className="flex-1 px-4 py-2" variant="primary">Update Status</Button><Button className="flex-1 px-4 py-2" variant="secondary">Print Invoice</Button><Button className="px-4 py-2" variant="ghost" onClick={() => setShowOrderModal(false)}>Close</Button></div></div></Card></div>)}
    </div>
  );
}
