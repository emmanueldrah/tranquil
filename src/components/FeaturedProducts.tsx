'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';
import { getFeaturedProducts } from '@/data';
import { Sparkles, Star, TrendingUp } from 'lucide-react';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const featuredProducts = await getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
  return (
  <section className="py-24 bg-background relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-deep opacity-30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-deep opacity-20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-accent opacity-20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-deep px-6 py-3 rounded-full mb-6 border border-deep">
              <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
              <span className="text-white font-semibold text-sm uppercase tracking-wider">Premium Collection</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-gradient animate-gradient">Featured Products</span>
            </h2>
            <p className="text-[rgba(230,240,255,0.8)] max-w-3xl mx-auto text-xl leading-relaxed">
              Discover our handpicked selection of premium products, curated for exceptional quality and style
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-16 h-1 bg-deep rounded-full opacity-40"></div>
              <Star className="w-6 h-6 text-white animate-pulse" />
            <div className="w-16 h-1 bg-accent rounded-full opacity-50"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative">
                {/* Skeleton Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 animate-pulse rounded-t-3xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-xl animate-pulse mb-4"></div>
                    <div className="h-5 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg animate-pulse w-3/4 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gradient-to-r from-pink-200 to-orange-200 rounded animate-pulse w-1/3"></div>
                      <div className="h-6 bg-gradient-to-r from-orange-200 to-red-200 rounded-full animate-pulse w-16"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: `${i * 0.5}s` }}></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: `${i * 0.7}s` }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
  <section className="py-24 bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-deep opacity-30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-deep opacity-20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-accent opacity-20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-deep px-6 py-3 rounded-full mb-6 border border-deep shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-sm uppercase tracking-wider">Trending Now</span>
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <h2 className="text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
            Discover our handpicked selection of premium products, curated for exceptional quality and style
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-20 h-1 bg-deep rounded-full opacity-40"></div>
            <Star className="w-8 h-8 text-white" />
            <div className="w-20 h-1 bg-deep rounded-full opacity-40"></div>
            <Star className="w-6 h-6 text-white" />
            <div className="w-20 h-1 bg-accent rounded-full opacity-40"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
          <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 g-teal-deep text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl cursor-pointer">
            <span>Explore All Products</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
