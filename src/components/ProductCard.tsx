import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

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

  return (
    <Link href={`/products/${id}`}>
      <div className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          <Image
            src={images[0] || '/images/placeholder.jpg'}
            alt={name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {isOnSale && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
              Sale
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-1">{name}</h3>
          <div className="flex items-center justify-between mb-2">
            <div>
              {isOnSale ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-red-600">
                    ₵{salePrice?.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₵{price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  ₵{price.toFixed(2)}
                </span>
              )}
            </div>
            {stock < 5 && stock > 0 && (
              <span className="text-sm text-orange-500">
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