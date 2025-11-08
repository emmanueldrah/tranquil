'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, Heart, ShoppingCart, GitCompare, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useComparison } from '@/context/ComparisonContext';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/mock';
import { Product } from '@/types';
import { getFirstValidImage } from '@/utils/imageUtils';

export default function ComparePage() {
  const { comparedProducts, removeFromComparison, clearComparison } = useComparison();
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useCart();
  const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/products')
      .then((r) => r.json())
      .then((all: any[]) => {
        if (!mounted) return;
        const loadedProducts = comparedProducts
          .map(id => all.find(p => String(p.id) === String(id)))
          .filter((product): product is Product => product !== undefined);
        setLoadedProducts(loadedProducts as Product[]);
      })
      .catch((err) => console.error('Failed to load products for compare:', err));
    return () => { mounted = false; };
  }, [comparedProducts]);

  const handleRemoveFromComparison = (productId: string) => {
    removeFromComparison(productId);
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
  };

  const handleWishlistToggle = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  if (loadedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-teal py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/50">
            <GitCompare className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-4xl font-black text-gray-900 mb-4">No Products to Compare</h1>
            <p className="text-xl text-gray-600 mb-8">Add some products to your comparison list to see them side by side.</p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-deep text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Products</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-3xl font-black g-teal-deep bg-clip-text text-transparent">
              Compare Products ({loadedProducts.length})
            </h1>
          </div>

          <Button
            onClick={clearComparison}
            variant="secondary"
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            Clear All
          </Button>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Product Images Row */}
              <thead>
                <tr>
                  <th className="p-6 text-left font-bold text-gray-900 border-b border-gray-200">Product</th>
                  {loadedProducts.map((product) => (
                    <th key={product.id} className="p-6 text-center border-b border-gray-200 min-w-[300px]">
                      <div className="relative">
                        <Button
                          onClick={() => handleRemoveFromComparison(product.id)}
                          variant="ghost"
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <div className="aspect-square relative mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
                          <Image
                            src={getFirstValidImage(product.images)}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating.average)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({product.reviews})</span>
                        </div>
                        <div className="flex gap-2 justify-center">
                          <Button
                            onClick={() => handleAddToCart(product.id)}
                            variant="primary"
                            className="flex items-center gap-2 px-4 py-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </Button>
                          <Button
                            onClick={() => handleWishlistToggle(product.id)}
                            variant={isInWishlist(product.id) ? 'primary' : 'ghost'}
                            className={`p-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${isInWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'}`}
                          >
                            <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Price Row */}
              <tbody>
                <tr>
                  <td className="p-6 font-bold text-gray-900 border-b border-gray-100 bg-gray-50">Price</td>
                  {loadedProducts.map((product) => (
                    <td key={product.id} className="p-6 text-center border-b border-gray-100">
                      <div className="space-y-2">
                        {product.isOnSale ? (
                          <>
                            <div className="text-2xl font-black text-gray-900">
                              ₵{product.salePrice?.toFixed(2)}
                            </div>
                            <div className="text-lg text-gray-500 line-through">
                              ₵{product.price.toFixed(2)}
                            </div>
                            <div className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">
                              SAVE {Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)}%
                            </div>
                          </>
                        ) : (
                          <div className="text-2xl font-black text-gray-900">
                            ₵{product.price.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Stock Row */}
                <tr>
                  <td className="p-6 font-bold text-gray-900 border-b border-gray-100 bg-gray-50">Availability</td>
                  {loadedProducts.map((product) => (
                    <td key={product.id} className="p-6 text-center border-b border-gray-100">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        product.stock > 10
                          ? 'bg-green-100 text-green-800'
                          : product.stock > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr>
                  <td className="p-6 font-bold text-gray-900 border-b border-gray-100 bg-gray-50">Rating</td>
                  {loadedProducts.map((product) => (
                    <td key={product.id} className="p-6 text-center border-b border-gray-100">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating.average)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">{product.rating.average.toFixed(1)}</span>
                        <span className="text-gray-600">({product.reviews} reviews)</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Specifications Row */}
                <tr>
                  <td className="p-6 font-bold text-gray-900 border-b border-gray-100 bg-gray-50">Specifications</td>
                  {loadedProducts.map((product) => (
                    <td key={product.id} className="p-6 border-b border-gray-100">
                      <div className="space-y-2">
                        {product.specifications ? (
                          Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="font-medium text-gray-600">{key}:</span>
                              <span className="text-gray-900">{value}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">No specifications available</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Vendor Row */}
                <tr>
                  <td className="p-6 font-bold text-gray-900 bg-gray-50">Vendor</td>
                  {loadedProducts.map((product) => (
                    <td key={product.id} className="p-6 text-center">
                      <span className="font-semibold text-indigo-600">{product.vendor}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Add More Products CTA */}
        {loadedProducts.length < 4 && (
          <div className="mt-8 text-center">
            <div className="bg-deep/60 rounded-3xl p-8 border border-deep/20">
              <GitCompare className="w-12 h-12 text-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compare More Products</h3>
              <p className="text-gray-600 mb-4">Add up to 4 products to compare features side by side.</p>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-deep text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Browse More Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
