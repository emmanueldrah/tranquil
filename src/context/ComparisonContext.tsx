'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface ComparisonContextType {
  comparedProducts: string[];
  addToComparison: (productId: string) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
  canAddToComparison: (productId: string) => boolean;
  maxComparisonItems: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_COMPARISON_ITEMS = 4;

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparedProducts, setComparedProducts] = useState<string[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('comparedProducts');
        if (stored) {
          const parsed = JSON.parse(stored);
          return Array.isArray(parsed) ? parsed : [];
        }
      }
    } catch (error) {
      console.error('Error parsing compared products from localStorage:', error);
    }
    return [];
  });

  // Save to localStorage whenever comparedProducts changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('comparedProducts', JSON.stringify(comparedProducts));
    }
  }, [comparedProducts]);

  const addToComparison = (productId: string) => {
    if (!comparedProducts.includes(productId) && comparedProducts.length < MAX_COMPARISON_ITEMS) {
      setComparedProducts(prev => [...prev, productId]);
    }
  };

  const removeFromComparison = (productId: string) => {
    setComparedProducts(prev => prev.filter(id => id !== productId));
  };

  const clearComparison = () => {
    setComparedProducts([]);
  };

  const isInComparison = (productId: string): boolean => {
    return comparedProducts.includes(productId);
  };

  const canAddToComparison = (productId: string): boolean => {
    return !comparedProducts.includes(productId) && comparedProducts.length < MAX_COMPARISON_ITEMS;
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparedProducts,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        canAddToComparison,
        maxComparisonItems: MAX_COMPARISON_ITEMS,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
