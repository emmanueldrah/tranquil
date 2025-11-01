'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, User, Search, Menu, X, Sun, Moon, Bell, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { items: cartItems, wishlist } = useCart();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <div className="min-h-screen bg-gray-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg backdrop-blur-md' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Tranquil
                </h1>
                <p className="text-xs text-gray-500">Premium Electronics</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/categories"
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
              >
                Deals
              </Link>
              <Link
                href="/new-arrivals"
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
              >
                New Arrivals
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search premium products..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 bg-gray-50 hover:bg-white transition-all duration-200"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-3 rounded-xl text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow-lg">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-3 rounded-xl text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow-lg">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              <button className="p-3 rounded-xl text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-xl text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </button>
                  <div className="absolute right-0 w-64 mt-3 py-3 bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                    <div className="px-5 py-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Welcome back!</p>
                      <p className="text-xs text-gray-500">{(user as any)?.email || 'user@example.com'}</p>
                    </div>
                    <Link
                      href="/account"
                      className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                    >
                      <User className="h-4 w-4 mr-3" />
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                    >
                      <ShoppingBag className="h-4 w-4 mr-3" />
                      Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                    >
                      <Heart className="h-4 w-4 mr-3" />
                      Wishlist
                    </Link>
                    {(user as any)?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                      >
                        <div className="w-4 h-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded mr-3"></div>
                        Admin Dashboard
                      </Link>
                    )}
                    <div className="border-t border-gray-100 mt-3">
                      <button
                        onClick={logout}
                        className="flex items-center w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        <X className="h-4 w-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search premium products..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 bg-gray-50"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="space-y-2">
                <Link
                  href="/categories"
                  className="block px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  href="/deals"
                  className="block px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Deals
                </Link>
                <Link
                  href="/new-arrivals"
                  className="block px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  New Arrivals
                </Link>
                <Link
                  href="/wishlist"
                  className="block px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wishlist ({wishlist.length})
                </Link>
              </div>

              {user ? (
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <Link
                    href="/account"
                    className="block px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    href="/account/orders"
                    className="block px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  {(user as any)?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4">
                  <Link
                    href="/login"
                    className="block w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-lg text-center font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="pt-16 min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Tranquil
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your one-stop shop for all your needs. Quality products,
                competitive prices, and excellent customer service.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-200 cursor-pointer">
                  <span className="text-white text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center hover:from-pink-600 hover:to-pink-700 transition-all duration-200 cursor-pointer">
                  <span className="text-white text-sm">i</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-200 cursor-pointer">
                  <span className="text-white text-sm">t</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Customer Service</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                    Shipping Information
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                    Returns Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Stay Connected</h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Subscribe to our newsletter for updates and exclusive offers.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Tranquil Enterprise. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Version 2.0.0</span>
                <span>•</span>
                <span>Made with ❤️</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}