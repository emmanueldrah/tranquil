'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

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
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">Tranquil</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/categories"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Deals
              </Link>
              <Link
                href="/new-arrivals"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                New Arrivals
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/cart"
                className="relative text-gray-600 hover:text-blue-600"
              >
                <ShoppingBag className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                    <User className="h-6 w-6" />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600"
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
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
              />
              <Link
                href="/categories"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </Link>
              <Link
                href="/new-arrivals"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                New Arrivals
              </Link>
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    href="/account/orders"
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block px-3 py-2 text-gray-600 hover:text-blue-600"
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
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="pt-16 min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Tranquil</h3>
              <p className="text-gray-400 text-sm">
                Your one-stop shop for all your needs. Quality products,
                competitive prices, and excellent customer service.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Shipping Information
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Returns Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to our newsletter for updates and exclusive offers.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Tranquil. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}