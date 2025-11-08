'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { SearchBar } from './SearchBar';
import { CategoryNav } from './CategoryNav';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';

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
      <header className="glass sticky top-0 z-50 animate-gradient">
        <div className="container-modern">
          <div className="flex flex-col py-6">
            <div className="flex items-center justify-between mb-6">
                <Link href="/" className="flex-shrink-0 group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src="/images/dec.jpg"
                      alt="Tranquil Logo"
                      width={48}
                      height={48}
                      className="rounded-full ring-2 animate-pulse-glow"
                    />
                    <div className="absolute -inset-1 g-teal-deep rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                  </div>
                  <h1 className="text-3xl font-bold text-white animate-float">Tranquil</h1>
                </div>
              </Link>

              <div className="flex items-center space-x-6">
                <SearchBar />

                <Link
                  href="/compare"
                  className="relative p-3 rounded-full bg-deep opacity-80 hover:opacity-100 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </Link>

                <Link
                  href="/cart"
                  className="relative p-3 rounded-full bg-deep opacity-80 hover:opacity-100 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <div className="relative">
                  <Button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    variant="ghost"
                    className="flex items-center space-x-3 p-2 rounded-full bg-deep opacity-90 hover:opacity-100 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center ring-2 ring-white/10">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="hidden md:inline text-sm font-semibold text-white">
                      {user ? user.name : 'Account'}
                    </span>
                  </Button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 card-modern z-50 shadow-2xl bg-deep text-white">
                      <div className="py-2">
                        {user ? (
                          <>
                            <Link
                              href="/account"
                              className="flex items-center px-4 py-3 text-sm text-white hover:bg-deep hover:text-white transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              My Account
                            </Link>
                            <Link
                              href="/account/orders"
                              className="flex items-center px-4 py-3 text-sm text-white hover:bg-deep hover:text-white transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              My Orders
                            </Link>
                            <Button
                              onClick={() => {
                                logout();
                                setIsUserMenuOpen(false);
                              }}
                              variant="ghost"
                              className="flex items-center w-full text-left px-4 py-3 text-sm text-white hover:bg-deep transition-colors"
                            >
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Sign Out
                            </Button>
                          </>
                        ) : (
                          <>
                            <Link
                              href="/login"
                              className="flex items-center px-4 py-3 text-sm text-white hover:bg-deep hover:text-white transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Sign In
                            </Link>
                            <Link
                              href="/register"
                              className="flex items-center px-4 py-3 text-sm text-white hover:bg-deep hover:text-white transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                              </svg>
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

      <footer className="bg-deep text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 g-teal-deep"></div>

        <div className="container-modern py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src="/images/dec.jpg"
                    alt="Tranquil Logo"
                    width={48}
                    height={48}
                    className="rounded-full ring-2"
                  />
                  <div className="absolute -inset-1 g-teal-deep rounded-full blur opacity-30"></div>
                </div>
                <h3 className="text-2xl font-bold text-white">Tranquil</h3>
              </div>
              <div className="space-y-3">
                <p className="text-white font-medium">Contact us:</p>
                <div className="space-y-2 text-white">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    0247572364
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@tranquil.com
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Accra, Ghana
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6 relative">
                Categories
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent"></div>
              </h3>
              <ul className="space-y-3">
                <li><Link href="/categories/home-appliances" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green rounded-full group-hover:bg-teal transition-colors"></span>
                  Home Appliances
                </Link></li>
                <li><Link href="/categories/electronics" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green rounded-full group-hover:bg-teal transition-colors"></span>
                  Electronics
                </Link></li>
                <li><Link href="/categories/kitchen-equipment" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green rounded-full group-hover:bg-teal transition-colors"></span>
                  Kitchen Equipment
                </Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6 relative">
                Customer Service
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent"></div>
              </h3>
              <ul className="space-y-3">
                <li><Link href="/shipping" className="text-white hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-teal rounded-full group-hover:bg-green transition-colors"></span>
                  Shipping Information
                </Link></li>
                <li><Link href="/returns" className="text-white hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-teal rounded-full group-hover:bg-green transition-colors"></span>
                  Returns & Exchanges
                </Link></li>
                <li><Link href="/warranty" className="text-white hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-teal rounded-full group-hover:bg-green transition-colors"></span>
                  Warranty
                </Link></li>
                <li><Link href="/faq" className="text-white hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-teal rounded-full group-hover:bg-green transition-colors"></span>
                  FAQ
                </Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6 relative">
                About Us
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent"></div>
              </h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-white hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green rounded-full group-hover:bg-teal transition-colors"></span>
                  Our Story
                </Link></li>
                <li><Link href="/contact" className="text-white hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green rounded-full group-hover:bg-teal transition-colors"></span>
                  Contact Us
                </Link></li>
                <li><Link href="/terms" className="text-white hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green rounded-full group-hover:bg-teal transition-colors"></span>
                  Terms & Conditions
                </Link></li>
                <li><Link href="/privacy" className="text-white hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-green rounded-full group-hover:bg-teal transition-colors"></span>
                  Privacy Policy
                </Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white text-center md:text-left">
                © {new Date().getFullYear()} Tranquil Enterprise. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-purple-200">
                <Link href="#" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.017z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
