'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { SearchBar } from './SearchBar';
import { CategoryNav } from './CategoryNav';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const cartItemCount = items?.length ?? 0;

  // Don't render the main layout for admin routes
  if (pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col py-4">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/dec.jpg"
                    alt="Tranquil Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <h1 className="text-2xl font-bold text-blue-600">Tranquil</h1>
                </div>
              </Link>

              <div className="flex items-center space-x-6">
                <SearchBar />

                <Link
                  href="/cart"
                  className="relative text-gray-900 hover:text-gray-700 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="hidden md:inline text-sm font-medium">
                      {user ? user.name : 'Account'}
                    </span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        {user ? (
                          <>
                            {(user as any)?.role === 'admin' && (
                              <Link
                                href="/admin"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                Admin Dashboard
                              </Link>
                            )}
                            <Link
                              href="/account"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              My Account
                            </Link>
                            <Link
                              href="/account/orders"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              My Orders
                            </Link>
                            <button
                              onClick={() => {
                                logout();
                                setIsUserMenuOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Sign Out
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              href="/login"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              Sign In
                            </Link>
                            <Link
                              href="/register"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              Create Account
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <CategoryNav />
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        {children}
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/dec.jpg"
                  alt="Tranquil Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <h3 className="text-xl font-bold">Tranquil</h3>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-gray-300">Contact us:</p>
                <p className="text-gray-400">Phone: 0247572364</p>
                <p className="text-gray-400">Email: info@tranquil.com</p>
                <p className="text-gray-400">Location: Accra, Ghana</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Categories</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="/categories/home-appliances" className="text-gray-400 hover:text-white">Home Appliances</Link></li>
                <li><Link href="/categories/electronics" className="text-gray-400 hover:text-white">Electronics</Link></li>
                <li><Link href="/categories/kitchen-equipment" className="text-gray-400 hover:text-white">Kitchen Equipment</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Customer Service</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="/shipping" className="text-gray-400 hover:text-white">Shipping Information</Link></li>
                <li><Link href="/returns" className="text-gray-400 hover:text-white">Returns & Exchanges</Link></li>
                <li><Link href="/warranty" className="text-gray-400 hover:text-white">Warranty</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">About Us</h3>
              <ul className="mt-4 space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-white">Our Story</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} Tranquil Enterprise. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
