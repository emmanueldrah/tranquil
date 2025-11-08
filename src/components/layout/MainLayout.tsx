'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Search, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { items: cartItems, wishlist } = useCart();

  const navLinks = [
    { href: '/products', label: 'All Categories' },
    { href: '/products?tag=new-arrivals', label: 'New Arrivals' },
    { href: '/products?tag=top-selling', label: 'Top Selling' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-3xl font-extrabold text-[#FF4747] tracking-tighter">TRANQUIL</span>
              </Link>
            </div>

            <div className="flex-1 max-w-3xl mx-8 hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="w-full pl-5 pr-28 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:border-[#FF4747] transition-colors"
                />
                <Button className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-24 bg-[#FF4747] hover:bg-[#D43737] rounded-full text-white font-semibold">
                  Search
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {user ? (
                <div className="relative group">
                  <Button variant="ghost" className="flex items-center space-x-1 p-2 text-gray-600 hover:text-[#FF4747]">
                    <User className="h-6 w-6" />
                    <span className="hidden md:block text-sm font-medium">Account</span>
                    <ChevronDown className="h-4 w-4 hidden md:block"/>
                  </Button>
                  <div className="absolute right-0 w-48 mt-2 py-1 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-200 z-10">
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                    <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-[#FF4747] hover:bg-gray-100">Logout</button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="flex items-center space-x-2 text-gray-600 hover:text-[#FF4747]">
                  <User className="h-6 w-6" />
                  <span className="hidden md:block text-sm font-medium">Sign In</span>
                </Link>
              )}

              <Link href="/cart" className="relative flex items-center space-x-2 text-gray-600 hover:text-[#FF4747]">
                <ShoppingBag className="h-6 w-6" />
                <span className="hidden md:block text-sm font-medium">Cart</span>
                {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-[#FF4747] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{cartItems.length}</span>}
              </Link>

              <div className="lg:hidden">
                <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600 hover:text-[#FF4747]">
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">&copy; {new Date().getFullYear()} Tranquil. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
