'use client';

import { useState, useEffect } from 'react';
import { getAllProducts, getAllOrders } from '@/data';
import Link from 'next/link';
import { Order } from '@/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const products = getAllProducts();
    const orders = getAllOrders();
    const revenue = orders.reduce((total: number, order: Order) => total + order.totalAmount, 0);

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: revenue,
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-3xl font-semibold">{stats.totalProducts}</p>
          <Link
            href="/admin/products"
            className="text-blue-600 text-sm hover:underline mt-2 inline-block"
          >
            View all products
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-3xl font-semibold">{stats.totalOrders}</p>
          <Link
            href="/admin/orders"
            className="text-blue-600 text-sm hover:underline mt-2 inline-block"
          >
            View all orders
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-semibold">
            ${stats.totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Add recent activity items here */}
          <p className="text-gray-500">No recent activity</p>
        </div>
      </div>
    </div>
  );
}