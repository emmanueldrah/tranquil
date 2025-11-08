'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card'; // Corrected import
import { Button } from '@/components/ui/Button';
import { Package, ShoppingCart, DollarSign, Users, BarChart3, ExternalLink, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/dashboard');
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
        } else {
          setStats({});
        }
      } catch (error) {
        console.error('Error loading admin data:', error);
        setStats({});
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading dashboard...</div>;
  }

  return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white p-6"><div className="flex items-center"><div className="p-3 rounded-full bg-red-100"><DollarSign className="h-6 w-6 text-red-600" /></div><div className="ml-4"><p className="text-sm font-medium text-gray-500">Total Revenue</p><p className="text-2xl font-bold text-gray-900">${stats?.totalRevenue?.toLocaleString() || 0}</p></div></div></Card>
          <Card className="bg-white p-6"><div className="flex items-center"><div className="p-3 rounded-full bg-red-100"><ShoppingCart className="h-6 w-6 text-red-600" /></div><div className="ml-4"><p className="text-sm font-medium text-gray-500">Total Orders</p><p className="text-2xl font-bold text-gray-900">{stats?.totalOrders || 0}</p></div></div></Card>
          <Card className="bg-white p-6"><div className="flex items-center"><div className="p-3 rounded-full bg-red-100"><Package className="h-6 w-6 text-red-600" /></div><div className="ml-4"><p className="text-sm font-medium text-gray-500">Total Products</p><p className="text-2xl font-bold text-gray-900">{stats?.totalProducts || 0}</p></div></div></Card>
          <Card className="bg-white p-6"><div className="flex items-center"><div className="p-3 rounded-full bg-red-100"><Users className="h-6 w-6 text-red-600" /></div><div className="ml-4"><p className="text-sm font-medium text-gray-500">Total Customers</p><p className="text-2xl font-bold text-gray-900">{stats?.totalUsers || 0}</p></div></div></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 bg-white"><h3 className="text-xl font-bold mb-4">Quick Links</h3><div className="grid grid-cols-2 gap-4"><Link href="/admin/products/new" className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 flex items-center"><Plus className="h-5 w-5 mr-3"/>Add Product</Link><Link href="/admin/orders" className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 flex items-center"><ShoppingCart className="h-5 w-5 mr-3"/>Manage Orders</Link><Link href="/" target="_blank" className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 flex items-center">_View Storefront <ExternalLink className="h-4 w-4 ml-2"/></Link></div></Card>
            <Card className="p-6 bg-white"><h3 className="text-xl font-bold mb-4">Analytics Overview</h3><BarChart3 className="h-24 w-24 text-gray-300 mx-auto"/><p className="text-center text-gray-500 mt-4">Analytics coming soon.</p></Card>
        </div>
      </div>
  );
}
