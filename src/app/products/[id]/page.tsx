'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getProductById, getVendorById } from '@/data';
import { useCart } from '@/context/CartContext';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = getProductById(params.id);
  const vendor = product ? getVendorById(product.vendor) : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[0] || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover object-center"
            />
            {product.isOnSale && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                Sale
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-8 lg:mt-0">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            {/* Price */}
            <div className="mt-4">
              {product.isOnSale ? (
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-red-600">
                    ₵{product.salePrice?.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ₵{product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ₵{product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mt-4">
              {product.stock > 0 ? (
                <p className="text-green-600">
                  In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-red-600">Out of Stock</p>
              )}
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(product.rating.average)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Specifications</h2>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-gray-600">{key}</dt>
                      <dd className="mt-1 text-sm font-medium text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Vendor Info */}
            {vendor && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900">Sold by</h2>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{vendor.name}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-600">
                        {vendor.rating} stars ({vendor.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-800">
                    View Store
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center gap-4">
                <div className="w-32">
                  <label htmlFor="quantity" className="sr-only">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 py-2 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-indigo-600 py-3 px-8 rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}