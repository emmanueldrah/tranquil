'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/data';
import { Product } from '@/types';

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();

  // Calculate cart totals
  const cartItems = items.map((item) => ({
    ...item,
    product: getProductById(item.productId),
  }));

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product?.isOnSale
      ? (item.product.salePrice || 0)
      : (item.product?.price || 0);
    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 50; // Free shipping over 1000 cedis
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              <div className="border-t border-gray-200 divide-y divide-gray-200">
                {cartItems.map((item) => {
                  const product = item.product;
                  if (!product) return null;

                  return (
                    <div key={item.productId} className="py-6">
                      <div className="flex items-center">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24 relative rounded overflow-hidden">
                          <Image
                            src={product.images[0] || '/images/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h2 className="text-lg font-medium text-gray-900">
                                <Link href={`/products/${product.id}`}>
                                  {product.name}
                                </Link>
                              </h2>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.category}
                              </p>
                            </div>
                            <p className="text-lg font-medium text-gray-900">
                              ₵{((product.isOnSale ? product.salePrice : product.price) || 0).toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <select
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(product.id, Number(e.target.value))
                                }
                                className="rounded-md border-gray-300 py-1.5 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                              >
                                {[...Array(10)].map((_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => removeItem(product.id)}
                                className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-16 lg:mt-0 lg:col-span-5">
              <div className="bg-gray-50 rounded-lg px-6 py-8">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">
                      ₵{subtotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Shipping</p>
                    <p className="text-sm font-medium text-gray-900">
                      {shipping === 0 ? 'Free' : `₵${shipping.toFixed(2)}`}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-medium text-gray-900">Total</p>
                      <p className="text-base font-medium text-gray-900">
                        ₵{total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/checkout"
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-center block"
                  >
                    Proceed to Checkout
                  </Link>
                </div>

                <div className="mt-4">
                  <Link
                    href="/products"
                    className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center justify-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}