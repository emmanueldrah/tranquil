'use client';

import { useEffect, useState } from 'react';
import { getAllProducts } from '@/data';
import { Product } from '@/types';
import Link from 'next/link';

export function SpecialOffers() {
  const [offers, setOffers] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = getAllProducts();
    
    // Select products on sale
    const onSale = allProducts
      .filter(product => product.isOnSale && product.salePrice)
      .sort((a, b) => {
        const aDiscount = ((a.price - (a.salePrice || 0)) / a.price) * 100;
        const bDiscount = ((b.price - (b.salePrice || 0)) / b.price) * 100;
        return bDiscount - aDiscount;
      })
      .slice(0, 3);

    setOffers(onSale);
  }, []);

  if (offers.length === 0) return null;

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Special Offers
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Limited time deals on popular items
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {offers.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-2 rounded-bl-lg">
                  {Math.round(
                    ((product.price - (product.salePrice || 0)) / product.price) *
                      100
                  )}
                  % OFF
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      ${product.salePrice?.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  {product.saleEnds && (
                    <div className="text-sm text-gray-500">
                      Ends{' '}
                      {new Date(product.saleEnds).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  )}
                </div>
                <Link
                  href={`/products/${product.id}`}
                  className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700"
                >
                  View Deal
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}