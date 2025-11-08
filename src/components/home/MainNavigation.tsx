import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';

export function MainNavigation() {
  return (
    <nav className="bg-surface border-b border-border backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
              SN TRADE HUB
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-text hover:text-primary font-medium transition-colors">
              Home
            </Link>
            <Link href="/stores" className="text-text hover:text-primary font-medium transition-colors">
              Stores
            </Link>
            <Link href="/brands" className="text-text hover:text-primary font-medium transition-colors">
              Brands
            </Link>
            <Link href="/discounted" className="text-text hover:text-primary font-medium transition-colors">
              Discounted products
            </Link>
          </div>

          {/* Right side - Cart and User */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-text hover:text-primary transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                0
              </span>
            </Link>
            <Link href="/account" className="p-2 text-text hover:text-primary transition-colors">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
