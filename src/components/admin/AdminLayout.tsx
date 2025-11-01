'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  BarChart,
  CreditCard,
  Truck,
  FileText,
  Menu,
  X,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  LogOut,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, category: 'Overview' },
  { name: 'Sales Analytics', href: '/admin/analytics', icon: BarChart, category: 'Overview' },
  { name: 'Product Management', href: '/admin/products', icon: Package, category: 'Products' },
  { name: 'Order Management', href: '/admin/orders', icon: ShoppingCart, category: 'Orders' },
  { name: 'Customer Management', href: '/admin/customers', icon: Users, category: 'Customers' },
  { name: 'User Management', href: '/admin/users', icon: Users, category: 'Customers' },
  { name: 'Payment Processing', href: '/admin/payments', icon: CreditCard, category: 'Operations' },
  { name: 'Shipping Management', href: '/admin/shipping', icon: Truck, category: 'Operations' },
  { name: 'Content Management', href: '/admin/content', icon: FileText, category: 'Content' },
  { name: 'Settings', href: '/admin/settings', icon: Settings, category: 'System' },
];

const categories = ['Overview', 'Products', 'Orders', 'Customers', 'Operations', 'Content', 'System'];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Close sidebar on mobile when route changes
    setIsSidebarOpen(false);
  }, [pathname]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd save this to localStorage and apply to document
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} flex`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:shadow-none`}
      >
        <div className={`flex items-center justify-between h-20 px-6 ${
          isDarkMode ? 'bg-gradient-to-r from-gray-900 to-gray-800' : 'bg-gradient-to-r from-gray-100 to-white'
        } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Link href="/admin" className="flex items-center group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tranquil Admin
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            } lg:hidden transition-colors`}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-8 px-4 space-y-6">
          {categories.map((category) => {
            const categoryItems = navigation.filter(item => item.category === category);
            return (
              <div key={category}>
                <h3 className={`px-4 text-xs font-bold uppercase tracking-widest mb-3 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                            : isDarkMode
                            ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:shadow-md'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
                        }`}
                      >
                        <div className={`p-2 rounded-lg mr-4 transition-colors ${
                          isActive
                            ? 'bg-white/20'
                            : isDarkMode
                            ? 'bg-gray-700 group-hover:bg-gray-600'
                            : 'bg-gray-100 group-hover:bg-gray-200'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="flex-1">{item.name}</span>
                        {isActive && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`sticky top-0 z-40 ${
          isDarkMode ? 'bg-gray-800/95 backdrop-blur-sm border-gray-700' : 'bg-white/95 backdrop-blur-sm border-gray-200'
        } border-b shadow-lg`}>
          <div className="flex items-center justify-between h-20 px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`p-3 rounded-xl ${
                  isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                } lg:hidden transition-all duration-200`}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {navigation.find(item => pathname === item.href || pathname.startsWith(item.href + '/'))?.name || 'Dashboard'}
                </h1>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage your store efficiently
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search admin panel..."
                  className={`block w-80 pl-12 pr-4 py-3 border ${
                    isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  } rounded-xl leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm`}
                />
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl ${
                  isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                } transition-all duration-200`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Notifications */}
              <button className={`p-3 rounded-xl relative ${
                isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              } transition-all duration-200`}>
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </button>

              {/* Profile menu */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`flex items-center space-x-3 p-2 rounded-xl ${
                    isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  } transition-all duration-200`}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isProfileMenuOpen && (
                  <div className={`absolute right-0 mt-3 w-56 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border rounded-xl shadow-2xl py-2 z-50`}>
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin User</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">admin@tranquil.com</p>
                    </div>
                    <Link
                      href="/admin/profile"
                      className={`flex items-center px-4 py-3 text-sm ${
                        isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      } transition-colors`}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Your Profile
                    </Link>
                    <Link
                      href="/admin/settings"
                      className={`flex items-center px-4 py-3 text-sm ${
                        isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                      } transition-colors`}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-2">
                      <button
                        onClick={() => {
                          localStorage.removeItem('currentUser');
                          window.location.href = '/admin/login';
                        }}
                        className={`flex items-center w-full text-left px-4 py-3 text-sm ${
                          isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        } transition-colors`}
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-t`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                © {new Date().getFullYear()} Tranquil Enterprise Admin Panel
              </p>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Version 2.0.0
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
