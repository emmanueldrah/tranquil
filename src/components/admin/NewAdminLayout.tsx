'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BarChart2, ShoppingCart, Users, Folder, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props { children: React.ReactNode; }

const nav = [
  { name: 'Dashboard', href: '/admin', icon: BarChart2 },
  { name: 'Products', href: '/admin/products', icon: ShoppingCart },
  { name: 'Banners', href: '/admin/banners', icon: Folder },
  { name: 'Orders', href: '/admin/orders', icon: Users },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Categories', href: '/admin/categories', icon: Folder },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function NewAdminLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-2xl font-bold text-[#FF4747]">Admin Panel</Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {nav.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.href ? 'text-[#FF4747] font-semibold' : 'text-gray-600 hover:text-[#FF4747]'}`}>
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="lg:hidden">
              <Button variant="ghost" onClick={() => setOpen(true)} className="p-2">
                <Menu />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-64 bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-bold">Admin</div>
              <Button variant="ghost" onClick={() => setOpen(false)}><X /></Button>
            </div>
            <nav className="space-y-2">
              {nav.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${pathname === item.href ? 'bg-gray-100 text-red-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-1 bg-black bg-opacity-25" onClick={() => setOpen(false)} />
        </div>
      )}

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
