'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllProducts } from '@/data';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: 0,
  });

  useEffect(() => {
    const allProducts = getAllProducts();
    let filtered = allProducts;

    // Search filter
    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (product) => product.price <= Number(filters.maxPrice)
      );
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    setProducts(filtered);
  }, [query, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
        {/* Filters */}
        <div className="hidden lg:block">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All Categories</option>
                {/* Add your categories here */}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Price</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Minimum Rating
              </h3>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilters({ ...filters, rating })}
                    className={`p-2 rounded ${
                      filters.rating === rating
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    {rating}★
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() =>
                setFilters({
                  category: '',
                  minPrice: '',
                  maxPrice: '',
                  rating: 0,
                })
              }
              className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-6 lg:mt-0 lg:col-span-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Search Results for "{query}"
          </h1>
          {products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}