'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { CartItem } from '@/types';
import { useAuth } from '@/context/AuthContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number, selectedVariant?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedVariant?: string) => void;
  removeItem: (productId: string, selectedVariant?: string) => void;
  clearCart: () => void;
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCartAndWishlist = async () => {
    if (!user) {
      setItems([]);
      setWishlist([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const [cartRes, wishlistRes] = await Promise.all([
        fetch('/api/cart'),
        fetch('/api/wishlist'),
      ]);
      
      if (!cartRes.ok || !wishlistRes.ok) {
        throw new Error('Failed to fetch cart or wishlist');
      }

      const cartData = await cartRes.json();
      const wishlistData = await wishlistRes.json();

      setItems(cartData.cart || []);
      setWishlist(wishlistData.wishlist || []);
    } catch (error) {
      console.error("Error fetching cart or wishlist:", error);
      setItems([]);
      setWishlist([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartAndWishlist();
  }, [user]);

  const handleAddToCart = async (productId: string, quantity: number = 1, selectedVariant?: string) => {
    if (!user) return;
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, selectedVariant }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchCartAndWishlist();
  };

  const handleUpdateQuantity = async (productId: string, quantity: number, selectedVariant?: string) => {
    if (!user) return;
    await fetch('/api/cart', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity, selectedVariant }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchCartAndWishlist();
  };

  const handleRemoveItem = async (productId: string, selectedVariant?: string) => {
    if (!user) return;
    await fetch('/api/cart', {
      method: 'DELETE',
      body: JSON.stringify({ productId, selectedVariant }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchCartAndWishlist();
  };

  const handleClearCart = async () => {
    if (!user) return;
    await fetch('/api/cart/clear', { method: 'POST' });
    fetchCartAndWishlist();
  };

  const handleAddToWishlist = async (productId: string) => {
    if (!user) return;
    await fetch('/api/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchCartAndWishlist();
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    if (!user) return;
    await fetch('/api/wishlist', {
      method: 'DELETE',
      body: JSON.stringify({ productId }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchCartAndWishlist();
  };

  const handleIsInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  const handleClearWishlist = async () => {
    if (!user) return;
    await fetch('/api/wishlist/clear', { method: 'POST' });
    fetchCartAndWishlist();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart: handleAddToCart,
        updateQuantity: handleUpdateQuantity,
        removeItem: handleRemoveItem,
        clearCart: handleClearCart,
        wishlist,
        addToWishlist: handleAddToWishlist,
        removeFromWishlist: handleRemoveFromWishlist,
        isInWishlist: handleIsInWishlist,
        clearWishlist: handleClearWishlist,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
