'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';

interface SalesData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  conversionRate: number;
  topProducts: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }>;
  salesByCategory: Array<{
    category: string;
    sales: number;
    percentage: number;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  recentOrders: Array<{
    id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
  }>;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data
  const [analyticsData] = useState<SalesData>({
    totalRevenue: 125430.50,
    totalOrders: 1247,
    totalCustomers: 892,
    averageOrderValue: 100.67,
    conversionRate: 3.2,
    topProducts: [
      { id: '1', name: 'Wireless Headphones', sales: 145, revenue: 21750 },
      { id: '2', name: 'Smart Watch', sales: 98, revenue: 29400 },
      { id: '3', name: 'Laptop Stand', sales: 76, revenue: 5320 },
      { id: '4', name: 'USB Cable', sales: 234, revenue: 3510 },
      { id: '5', name: 'Phone Case', sales: 189, revenue: 5670 }
    ],
    salesByCategory: [
      { category: 'Electronics', sales: 456, percentage: 45 },
      { category: 'Accessories', sales: 323, percentage: 32 },
      { category: 'Home & Garden', sales: 156, percentage: 15 },
      { category: 'Sports', sales: 78, percentage: 8 }
    ],
    monthlyRevenue: [
      { month: 'Aug', revenue: 85000, orders: 850 },
      { month: 'Sep', revenue: 92000, orders: 920 },
      { month: 'Oct', revenue: 98000, orders: 980 },
      { month: 'Nov', revenue: 105000, orders: 1050 },
      { month: 'Dec', revenue: 125430, orders: 1247 }
    ],
    recentOrders: [
      { id: '#12345', customer: 'John Doe', amount: 299.99, status: 'completed', date: '2024-11-15' },
      { id: '#12346', customer: 'Jane Smith', amount: 149.50, status: 'processing', date: '2024-11-15' },
      { id: '#12347', customer: 'Bob Johnson', amount: 79.99, status: 'shipped', date: '2024-11-14' },
      { id: '#12348', customer: 'Alice Brown', amount: 199.99, status: 'completed', date: '2024-11-14' }
    ]
  });

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'processing':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'shipped':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Analytics</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Comprehensive insights into your store's performance and trends.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d' | '1y')}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Revenue</p>
              <p className="text-2xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-200 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from last month
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Orders</p>
              <p className="text-2xl font-bold">{analyticsData.totalOrders.toLocaleString()}</p>
              <p className="text-sm text-blue-200 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2% from last month
              </p>
            </div>
            <ShoppingCart className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Customers</p>
              <p className="text-2xl font-bold">{analyticsData.totalCustomers.toLocaleString()}</p>
              <p className="text-sm text-purple-200 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.3% from last month
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Avg Order Value</p>
              <p className="text-2xl font-bold">${analyticsData.averageOrderValue}</p>
              <p className="text-sm text-orange-200 flex items-center mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1% from last month
              </p>
            </div>
            <Package className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.monthlyRevenue.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{month.month}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">${month.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{month.orders} orders</p>
                  </div>
                </div>
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(month.revenue / Math.max(...analyticsData.monthlyRevenue.map(m => m.revenue))) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales by Category</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.salesByCategory.map((category, index) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'][index % 4]
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{category.category}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{category.sales}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{category.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Performing Products</h3>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.sales} sales</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-green-600">${product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {analyticsData.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{order.id}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">${order.amount}</p>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Rate Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Conversion Rate</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Percentage of visitors who make a purchase
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">{analyticsData.conversionRate}%</p>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.5% from last month
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{ width: `${analyticsData.conversionRate * 10}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
