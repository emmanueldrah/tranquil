'use client';

import { useEffect, useState } from 'react';
import { getAllProducts } from '@/data';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = getAllProducts();
    
    // Select featured products (in this case, top-rated products)
    const featured = allProducts
      .filter(product => product.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    setProducts(featured);
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}