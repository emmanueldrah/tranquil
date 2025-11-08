"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getFirstValidImage } from '@/utils/imageUtils';

interface ProductCardProps {
  product: Partial<Product>;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  // Normalize image and stock fields since the repo uses multiple shapes
  const imageSrc = getFirstValidImage('image' in product ? product.image : product.images);
  const stockValue = 'stock' in product ? product.stock : 0;
  const isInStock = typeof stockValue === 'number' ? stockValue > 0 : Boolean(stockValue);

  const handleAddToCart = () => {
    if (!isInStock) return;
    // CartContext API: addToCart(productId: string, quantity?: number)
  if (!product.id) return;
  addToCart(product.id, 1);
  };

  return (
    <Card className="group relative card-modern overflow-hidden transform transition-transform hover:scale-[1.02] !p-0">
      <div className="relative w-full h-64 g-teal-deep">
        {!isInStock && (
          <div className="absolute inset-0 z-20 flex items-start justify-end p-4">
            <span className="text-sm font-semibold px-3 py-1 bg-accent text-white rounded-full shadow">Out of Stock</span>
          </div>
        )}
        <Image src={imageSrc} alt={product.name ?? 'product image'} fill className="object-cover object-center group-hover:opacity-90" />
      </div>

      <div className="p-4 bg-deep">
        <div className="flex justify-between items-start">
          <div className="pr-4">
            <h3 className="text-base font-semibold text-white">
              <Link href={`/products/${product.id}`} className="hover:underline">
                {product.name}
              </Link>
            </h3>
            {product.category && <p className="mt-1 text-xs text-[rgba(230,240,255,0.6)]">{product.category}</p>}
          </div>

          <p className="text-lg font-extrabold text-white">₵{(product.price ?? 0).toFixed(2)}</p>
        </div>

        <p className="mt-3 text-sm text-[rgba(230,240,255,0.65)] line-clamp-2">{product.description}</p>

        <Button
          onClick={handleAddToCart}
          disabled={!isInStock}
          variant="primary"
          className="mt-4 w-full"
        >
          {isInStock ? 'Add to Cart' : 'Unavailable'}
        </Button>
      </div>
    </Card>
  );
}