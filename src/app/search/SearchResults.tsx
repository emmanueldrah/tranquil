'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllProducts, getAllCategories } from '@/data';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import Button from '@/components/ui/Button';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    minPrice: '',
    maxPrice: '',
    rating: 0,
    sortBy: 'relevance',
    inStock: false,
  });
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [allProducts, allCategories] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);

        let filtered = allProducts;

        // Search filter
        if (query) {
          const searchTerms = query.toLowerCase().split(' ');
          filtered = filtered.filter((product) =>
            searchTerms.every(term =>
              product.name.toLowerCase().includes(term) ||
              product.description.toLowerCase().includes(term) ||
              product.category.toLowerCase().includes(term) ||
              product.subcategory?.toLowerCase().includes(term) ||
              product.brand?.toLowerCase().includes(term)
            )
          );
        }

        // Apply sorting
        filtered = sortProducts(filtered, filters.sortBy);

        setProducts(filtered);
        setCategories(allCategories);
      } catch (error) {
        console.error('Error loading search results:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [query]);

  // Apply filters effect
  useEffect(() => {
    const applyFilters = async () => {
      const allProducts = await getAllProducts();
      let filtered = allProducts;

      // Search filter
      if (query) {
        const searchTerms = query.toLowerCase().split(' ');
        filtered = filtered.filter((product) =>
          searchTerms.every(term =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term) ||
            product.subcategory?.toLowerCase().includes(term) ||
            product.brand?.toLowerCase().includes(term)
          )
        );
      }

      // Category filter
      if (filters.category) {
        filtered = filtered.filter(
          (product) => product.category === filters.category
        );

        if (filters.subcategory) {
          filtered = filtered.filter(
            (product) => product.subcategory === filters.subcategory
          );
        }
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
        filtered = filtered.filter((product) => product.rating.average >= filters.rating);
      }

      // Stock filter
      if (filters.inStock) {
        filtered = filtered.filter((product) => product.stock > 0);
      }

      // Apply sorting
      filtered = sortProducts(filtered, filters.sortBy);

      setProducts(filtered);
    };

    applyFilters();
  }, [filters]);

  const sortProducts = (products: Product[], sortBy: string) => {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => b.rating.average - a.rating.average);
      case 'newest':
        return [...products].sort((a, b) => {
          const dateA = new Date(a.createdAt || '');
          const dateB = new Date(b.createdAt || '');
          return dateB.getTime() - dateA.getTime();
        });
      default:
        return products; // relevance (default order)
    }
  };

  const selectedCategory = categories.find(c => c.slug === filters.category);

  if (loading) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-transparent">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-transparent">
      <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
         <div className="bg-deep p-4 rounded-lg border border-deep sticky top-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                <select
                  value={filters.category}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      category: e.target.value,
                      subcategory: '',
                    });
                  }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-deep bg-deep text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Filter */}
              {selectedCategory && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Subcategory</h3>
                  <select
                    value={filters.subcategory}
                    onChange={(e) =>
                      setFilters({ ...filters, subcategory: e.target.value })
                    }
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-deep bg-deep text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Subcategories</option>
                    {selectedCategory.subcategories.map((sub) => (
                      <option key={sub.id} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sort By */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Sort By</h3>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters({ ...filters, sortBy: e.target.value })
                  }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-deep bg-deep text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                      className="block w-full pl-3 pr-10 py-2 text-base border-deep bg-deep text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                      className="block w-full pl-3 pr-10 py-2 text-base border-deep bg-deep text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
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
                    <Button
                      key={rating}
                      onClick={() => setFilters({ ...filters, rating })}
                      variant={filters.rating === rating ? 'primary' : 'secondary'}
                      className="p-2 rounded"
                    >
                      {rating}★
                    </Button>
                  ))}
                </div>
              </div>

              {/* In Stock Filter */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-gray-900">In Stock Only</span>
                </label>
              </div>

              {/* Clear Filters */}
              <Button
                onClick={() =>
                  setFilters({
                    category: '',
                    subcategory: '',
                    minPrice: '',
                    maxPrice: '',
                    rating: 0,
                    sortBy: 'relevance',
                    inStock: false,
                  })
                }
                variant="secondary"
                className="w-full px-4 py-2 rounded-md"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-6 lg:mt-0 lg:col-span-3">
          <div className="flex items-baseline justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {query ? `Search Results for &quot;${query}&quot;` : 'All Products'}
            </h1>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-500">
                {products.length} result{products.length === 1 ? '' : 's'}
              </p>
              {/* Mobile Filter Toggle */}
              <Button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                variant="secondary"
                className="lg:hidden px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="lg:hidden mb-6 bg-deep p-4 rounded-lg border border-deep">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
              <div className="space-y-4">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                  <select
                    value={filters.category}
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        category: e.target.value,
                        subcategory: '',
                      });
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory Filter */}
                {selectedCategory && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Subcategory</h3>
                    <select
                      value={filters.subcategory}
                      onChange={(e) =>
                        setFilters({ ...filters, subcategory: e.target.value })
                      }
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                    >
                      <option value="">All Subcategories</option>
                      {selectedCategory.subcategories.map((sub) => (
                        <option key={sub.id} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Sort By */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Sort By</h3>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters({ ...filters, sortBy: e.target.value })
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, minPrice: e.target.value })
                      }
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, maxPrice: e.target.value })
                      }
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
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
                      <Button
                        key={rating}
                        onClick={() => setFilters({ ...filters, rating })}
                        variant={filters.rating === rating ? 'primary' : 'secondary'}
                        className="p-2 rounded"
                      >
                        {rating}★
                      </Button>
                    ))}
                  </div>
                </div>

                {/* In Stock Filter */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-900">In Stock Only</span>
                  </label>
                </div>

                {/* Clear Filters */}
                <Button
                  onClick={() =>
                    setFilters({
                      category: '',
                      subcategory: '',
                      minPrice: '',
                      maxPrice: '',
                      rating: 0,
                      sortBy: 'relevance',
                      inStock: false,
                    })
                  }
                  variant="secondary"
                  className="w-full px-4 py-2 rounded-md"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() =>
                  setFilters({
                    category: '',
                    subcategory: '',
                    minPrice: '',
                    maxPrice: '',
                    rating: 0,
                    sortBy: 'relevance',
                    inStock: false,
                  })
                }
                variant="ghost"
                className="mt-4 text-sm font-medium text-teal-600 hover:text-teal-500"
              >
                Clear all filters
              </Button>
            </div>
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
