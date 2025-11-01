'use client';

import { useState, useEffect } from 'react';
import { getAllProducts, getAllOrders } from '@/data';
import Link from 'next/link';
import { Order } from '@/types';
import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Activity,
  BarChart3,
  CreditCard,
  Truck,
  FileText,
  Settings,
  Plus,
  Eye,
  UserCheck,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalVendors: 0,
  });

  const [recentActivity] = useState([
    { id: 1, action: 'New order placed', time: '2 minutes ago', type: 'order', amount: '$299.99' },
    { id: 2, action: 'Product updated', time: '15 minutes ago', type: 'product', product: 'Wireless Headphones' },
    { id: 3, action: 'New customer registered', time: '1 hour ago', type: 'user', user: 'john.doe@example.com' },
    { id: 4, action: 'Payment processed', time: '2 hours ago', type: 'payment', amount: '$1,250.00' },
  ]);

  useEffect(() => {
    const products = getAllProducts();
    const orders = getAllOrders();
    const revenue = orders.reduce((total: number, order: Order) => total + order.totalAmount, 0);

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: revenue,
      totalUsers: 0, // TODO: Get from users data
      totalVendors: 0, // TODO: Get from vendors data
    });
  }, []);

  const quickActions = [
    {
      title: 'Add Product',
      href: '/admin/products/new',
      icon: Plus,
      gradient: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      description: 'Create new product listing',
    },
    {
      title: 'View Orders',
      href: '/admin/orders',
      icon: Eye,
      gradient: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      description: 'Manage customer orders',
    },
    {
      title: 'Manage Customers',
      href: '/admin/customers',
      icon: UserCheck,
      gradient: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      description: 'View customer database',
    },
    {
      title: 'View Analytics',
      href: '/admin/analytics',
      icon: PieChart,
      gradient: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      description: 'Sales & performance data',
    },
  ];

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'from-green-400 to-green-500',
      bgGradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
      gradient: 'from-blue-400 to-blue-500',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toString(),
      change: '+3.1%',
      changeType: 'positive',
      icon: Package,
      gradient: 'from-purple-400 to-purple-500',
      bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    },
    {
      title: 'Active Users',
      value: stats.totalUsers.toString(),
      change: '-2.4%',
      changeType: 'negative',
      icon: Users,
      gradient: 'from-orange-400 to-orange-500',
      bgGradient: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Welcome back! Here's what's happening with your store today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.changeType === 'positive'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-full opacity-10`}></div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`group relative overflow-hidden bg-gradient-to-br ${action.gradient} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="flex items-center justify-between mb-3">
                  <action.icon className="h-8 w-8" />
                  <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/10 rounded-full"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity & Analytics Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'order' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'product' ? 'bg-green-100 dark:bg-green-900/30' :
                    activity.type === 'user' ? 'bg-purple-100 dark:bg-purple-900/30' :
                    'bg-orange-100 dark:bg-orange-900/30'
                  }`}>
                    {activity.type === 'order' && <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                    {activity.type === 'product' && <Package className="h-4 w-4 text-green-600 dark:text-green-400" />}
                    {activity.type === 'user' && <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                    {activity.type === 'payment' && <CreditCard className="h-4 w-4 text-orange-600 dark:text-orange-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    {activity.amount && (
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">{activity.amount}</p>
                    )}
                    {activity.product && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{activity.product}</p>
                    )}
                    {activity.user && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{activity.user}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Analytics Overview</h3>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Sales</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$2,847</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">+15.3%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">3.2%</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Order Value</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">$127.50</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Sessions</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
                  </div>
                  <div className="text-green-600 dark:text-green-400">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/admin/analytics"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                View detailed analytics
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Management Shortcuts */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Management Shortcuts</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { href: '/admin/products', icon: Package, label: 'Products', color: 'from-blue-500 to-blue-600' },
              { href: '/admin/orders', icon: ShoppingCart, label: 'Orders', color: 'from-green-500 to-green-600' },
              { href: '/admin/customers', icon: Users, label: 'Customers', color: 'from-purple-500 to-purple-600' },
              { href: '/admin/payments', icon: CreditCard, label: 'Payments', color: 'from-orange-500 to-orange-600' },
              { href: '/admin/shipping', icon: Truck, label: 'Shipping', color: 'from-red-500 to-red-600' },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group flex flex-col items-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 hover:from-white hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-600"
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
