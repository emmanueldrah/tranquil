import Link from 'next/link';
import { getAllProducts } from '@/data';
import { ProductCard } from '@/components/ProductCard';
import { HomeCarousel } from '@/components/home/HomeCarousel';
import { ArrowRight, ChevronRight, Gift, Zap, Percent } from 'lucide-react';

export default async function Home() {
  const products = await getAllProducts();
  const topSellers = products.slice(0, 12);
  const newArrivals = products.slice(12, 24);

  const categories = [
    { name: 'Electronics', href: '/products?category=electronics' },
    { name: 'Home & Garden', href: '/products?category=home' },
    { name: "Men's Fashion", href: '/products?category=men' },
    { name: "Women's Fashion", href: '/products?category=women' },
    { name: 'Toys & Hobbies', href: '/products?category=toys' },
    { name: 'Sports & Outdoors', href: '/products?category=sports' },
    { name: 'Automotive', href: '/products?category=auto' },
    { name: 'Health & Beauty', href: '/products?category=health' },
  ];

  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.map(cat => <li key={cat.name}><Link href={cat.href} className="flex items-center justify-between text-gray-700 hover:text-red-600 transition-colors"><span className="text-sm font-medium">{cat.name}</span><ChevronRight className="h-4 w-4"/></Link></li>)}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <HomeCarousel />
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Selling Products</h2>
              <Link href="/products?tag=top-selling" className="text-red-600 font-semibold flex items-center">See All <ArrowRight className="h-4 w-4 ml-1"/></Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {topSellers.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <Link href="/products?tag=new-arrivals" className="text-red-600 font-semibold flex items-center">See All <ArrowRight className="h-4 w-4 ml-1"/></Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
