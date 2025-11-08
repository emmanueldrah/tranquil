'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

interface RecentlyViewedContextType {
  recentlyViewed: string[];
  addToRecentlyViewed: (productId: string) => void;
  clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const RECENTLY_VIEWED_KEY = 'recentlyViewed';
const MAX_RECENTLY_VIEWED = 10;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return Array.isArray(parsed) ? parsed : [];
        }
      }
    } catch (error) {
      console.error('Error parsing recently viewed from localStorage:', error);
    }
    return [];
  });

  // Save to localStorage whenever recentlyViewed changes
  useEffect(() => {
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed(prev => {
      // Remove the product if it already exists
      const filtered = prev.filter(id => id !== productId);
      // Add it to the beginning
      const updated = [productId, ...filtered];
      // Keep only the most recent MAX_RECENTLY_VIEWED items
      return updated.slice(0, MAX_RECENTLY_VIEWED);
    });
  }, []);

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
