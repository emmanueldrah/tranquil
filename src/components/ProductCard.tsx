'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const {
    id,
    name,
    price,
    images,
    rating,
    reviews,
    isOnSale,
    salePrice,
    stock,
  } = product;

  const { isInWishlist, addToWishlist, removeFromWishlist } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(id));

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    if (isWishlisted) {
      removeFromWishlist(id);
      setIsWishlisted(false);
    } else {
      addToWishlist(id);
      setIsWishlisted(true);
    }
  };

  return (
    <Link href={`/products/${id}`}>
      <div className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 transform hover:-translate-y-1">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-50 to-teal-50">
          <Image
            src={images[0] || '/images/placeholder.jpg'}
            alt={name}
            fill
            className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
          {isOnSale && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
              Sale
            </div>
          )}
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 left-3 p-2.5 rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                isWishlisted ? 'fill-emerald-500 text-emerald-500' : 'text-gray-400 hover:text-emerald-500'
              }`}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">{name}</h3>
          <div className="flex items-center justify-between mb-3">
            <div>
              {isOnSale ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-emerald-600">
                    ₵{salePrice?.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₵{price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  ₵{price.toFixed(2)}
                </span>
              )}
            </div>
            {stock < 5 && stock > 0 && (
              <span className="text-sm text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded-full">
                Only {stock} left!
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(rating.average)
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
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
