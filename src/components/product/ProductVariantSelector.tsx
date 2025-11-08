'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/types';
import { Button } from '@/components/ui/Button';

interface ProductVariantSelectorProps {
  product: Product;
  selectedVariants: Record<string, string>;
  onVariantChange: (type: string, variantId: string) => void;
}

export const ProductVariantSelector = ({
  product,
  selectedVariants,
  onVariantChange,
}: ProductVariantSelectorProps) => {
  if (!product.variants || product.variants.length === 0) {
    return null;
  }

  // Group variants by type
  const variantsByType = product.variants.reduce((acc, variant) => {
    if (!acc[variant.type]) {
      acc[variant.type] = [];
    }
    acc[variant.type].push(variant);
    return acc;
  }, {} as Record<string, ProductVariant[]>);

  const getVariantTypeLabel = (type: string) => {
    switch (type) {
      case 'color':
        return 'Color';
      case 'size':
        return 'Size';
      case 'storage':
        return 'Storage';
      case 'material':
        return 'Material';
      case 'style':
        return 'Style';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const renderVariantOptions = (type: string, variants: ProductVariant[]) => {
    if (type === 'color') {
      return (
        <div className="flex flex-wrap gap-3">
          {variants.map((variant) => (
            <Button
              key={variant.id}
              type="button"
              variant="ghost"
              onClick={() => onVariantChange(type, variant.id)}
              className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                selectedVariants[type] === variant.id
                  ? 'border-green-600 ring-2 ring-green-200'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              title={variant.name}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: variant.value }}
              />
              {selectedVariants[type] === variant.id && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </Button>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <Button
            key={variant.id}
            type="button"
            variant="ghost"
            onClick={() => onVariantChange(type, variant.id)}
            className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
              selectedVariants[type] === variant.id
                ? 'border-green-600 bg-green-50 text-green-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            {variant.name}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(variantsByType).map(([type, variants]) => (
        <div key={type}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {getVariantTypeLabel(type)}
          </h3>
          {renderVariantOptions(type, variants)}
        </div>
      ))}
    </div>
  );
};
