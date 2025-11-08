'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { getFirstValidImage } from '@/utils/imageUtils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, images, rating, isOnSale, salePrice } = product;
  const { isInWishlist, addToWishlist, removeFromWishlist } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(id));

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(id);
      setIsWishlisted(false);
    } else {
      addToWishlist(id);
      setIsWishlisted(true);
    }
  };

  const imageSrc = getFirstValidImage(images);

  return (
    <Link href={`/products/${id}`} className="group relative block overflow-hidden rounded-lg border border-stone-200 hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-stone-100">
        <Image
          src={imageSrc}
          alt={name || 'Product Image'}
          width={400}
          height={400}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute top-3 right-3">
        <Button
          type="button"
          onClick={handleWishlistToggle}
          variant="ghost"
          className="p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm"
          aria-pressed={isWishlisted}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400 group-hover:text-red-500'}`}
          />
        </Button>
      </div>
      {isOnSale && (
        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          SALE
        </div>
      )}
      <div className="p-4 bg-white">
        <h3 className="text-md text-slate-800 font-semibold truncate group-hover:text-slate-900">{name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-slate-900">${isOnSale ? salePrice?.toFixed(2) : price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};
