"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Partial<Product>;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  // Normalize image and stock fields since the repo uses multiple shapes
  const imageSrc = String((product as any).image ?? (product.images && product.images[0]) ?? '/placeholder.jpg');
  const stockValue = (product as any).stock ?? product.stock ?? 0;
  const isInStock = typeof stockValue === 'number' ? stockValue > 0 : Boolean(stockValue);

  const handleAddToCart = () => {
    if (!isInStock) return;
    // CartContext API: addToCart(productId: string, quantity?: number)
  if (!product.id) return;
  addToCart(product.id, 1);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.02]">
      <div className="relative w-full h-64 bg-gray-200">
        {!isInStock && (
          <div className="absolute inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium px-4 py-2 bg-red-600 rounded-full">Out of Stock</span>
          </div>
        )}
  <Image src={imageSrc} alt={product.name ?? 'product image'} fill className="object-cover object-center group-hover:opacity-75" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              <Link href={`/products/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            {product.category && <p className="mt-1 text-xs text-gray-500">{product.category}</p>}
          </div>

          <p className="text-lg font-semibold text-gray-900">${(product.price ?? 0).toFixed(2)}</p>
        </div>

        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>

        <button
          onClick={handleAddToCart}
          disabled={!isInStock}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}