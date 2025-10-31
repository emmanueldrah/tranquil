'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/admin" className="text-xl font-bold text-white">
            Tranquil Admin
          </Link>
        </div>
        <nav className="mt-4 px-2">
          <Link
            href="/admin"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
          >
            Products
          </Link>
          <Link
            href="/admin/vendors"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
          >
            Vendors
          </Link>
          <Link
            href="/admin/orders"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
          >
            Orders
          </Link>
          <Link
            href="/admin/users"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
          >
            Users
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="text-gray-700">Admin User</span>
              <Link
                href="/"
                className="ml-4 text-sm text-gray-500 hover:text-gray-700"
              >
                View Store
              </Link>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}