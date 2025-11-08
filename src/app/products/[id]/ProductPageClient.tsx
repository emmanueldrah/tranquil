'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Shield, Truck, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Product, Vendor } from '@/types';
import { Review } from '@/types/reviews';
import { useCart } from '@/context/CartContext';
import { RecentlyViewedProducts } from '@/components/home/RecentlyViewedProducts';
import { getFirstValidImage } from '@/utils/imageUtils';

interface ProductPageClientProps {
  product: Product;
  vendor: Vendor;
  initialReviews: Review[];
}

export function ProductPageClient({ product, vendor, initialReviews }: ProductPageClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-stone-100 shadow-lg">
              <Image
                src={getFirstValidImage(product.images)}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 font-serif">{product.name}</h1>
            <div className="mt-4">
              <p className="text-3xl text-slate-900 font-bold">${product.isOnSale ? product.salePrice?.toFixed(2) : product.price.toFixed(2)}</p>
              {product.isOnSale && <p className="text-lg text-slate-500 line-through ml-2">${product.price.toFixed(2)}</p>}
            </div>
            {product.rating &&
              <div className="mt-4 flex items-center">
                <div className="flex items-center"><Star className="h-5 w-5 text-yellow-400 fill-current" /> <span className="ml-2 text-md text-slate-600">{product.rating.average.toFixed(1)} ({product.rating.count} reviews)</span></div>
              </div>
            }
            <p className="mt-6 text-lg text-slate-600">{product.description}</p>

            <div className="mt-8 flex items-center space-x-4">
              <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min="1" className="w-20 rounded-md border-stone-300 focus:ring-1 focus:ring-slate-900 focus:border-slate-900"/>
              <Button onClick={() => addToCart(product.id, quantity)} className="flex-1 bg-slate-900 text-white hover:bg-slate-800 px-8 py-3 rounded-md shadow-md text-lg font-semibold">Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
      <RecentlyViewedProducts />
    </div>
  );
}
