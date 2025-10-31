import Link from 'next/link';
import { SearchBar } from './SearchBar';
import { CategoryNav } from './CategoryNav';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col py-4">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600">Tranquil</h1>
              </Link>
              <div className="flex items-center space-x-4">
                <SearchBar />
                <Link href="/cart" className="text-gray-900 hover:text-gray-700 p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </Link>
              </div>
            </div>
            <CategoryNav />
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        {children}
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Contact</h3>
              <p className="mt-4 text-base text-gray-500">Phone: 0247572364</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Categories</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/categories/home-appliances" className="text-base text-gray-500 hover:text-gray-900">Home Appliances</Link></li>
                <li><Link href="/categories/electronics" className="text-base text-gray-500 hover:text-gray-900">Electronics</Link></li>
                <li><Link href="/categories/fashion" className="text-base text-gray-500 hover:text-gray-900">Fashion</Link></li>
                <li><Link href="/categories/beauty-wellness" className="text-base text-gray-500 hover:text-gray-900">Beauty & Wellness</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Customer Service</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/shipping" className="text-base text-gray-500 hover:text-gray-900">Shipping Info</Link></li>
                <li><Link href="/returns" className="text-base text-gray-500 hover:text-gray-900">Returns</Link></li>
                <li><Link href="/faq" className="text-base text-gray-500 hover:text-gray-900">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">About</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/about" className="text-base text-gray-500 hover:text-gray-900">Our Story</Link></li>
                <li><Link href="/blog" className="text-base text-gray-500 hover:text-gray-900">Blog</Link></li>
                <li><Link href="/careers" className="text-base text-gray-500 hover:text-gray-900">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              © {new Date().getFullYear()} Tranquil Enterprise. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};