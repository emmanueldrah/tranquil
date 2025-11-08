import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { getFirstValidImage } from '@/utils/imageUtils';

export function RecentlyViewedProducts() {
  const { recentlyViewed } = useRecentlyViewed();
  const [mounted, setMounted] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => setAllProducts(data || []))
      .catch(() => { /* ignore */ });
  }, []);

  const recentlyViewedProducts = recentlyViewed
    .map(id => allProducts.find(p => String(p.id) === String(id)))
    .filter((product): product is Product => product != null)
    .slice(0, 4); // Show max 4 products

  if (!mounted || recentlyViewedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Recently Viewed</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentlyViewedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative block overflow-hidden rounded-lg border border-stone-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-stone-100">
                <Image
                  src={getFirstValidImage(product.images)}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-md text-slate-800 font-semibold truncate group-hover:text-slate-900">{product.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-lg font-bold text-slate-900">${product.isOnSale ? product.salePrice?.toFixed(2) : product.price.toFixed(2)}</p>
                  {product.rating && (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-slate-600">{product.rating.average.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                {product.isOnSale && (<p className="text-sm text-slate-500 line-through">${product.price.toFixed(2)}</p>)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
