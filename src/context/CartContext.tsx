'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { CartItem } from '@/types';
import {
  getCart,
  addToCart as addToLocalStorage,
  updateCartItemQuantity as updateLocalStorageQuantity,
  removeFromCart as removeFromLocalStorage,
  clearCart as clearLocalStorage,
  getWishlist,
  addToWishlist as addToWishlistStorage,
  removeFromWishlist as removeFromWishlistStorage,
  isInWishlist as isInWishlistStorage,
  clearWishlist as clearWishlistStorage,
} from '@/data';

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Initialize cart and wishlist from localStorage
  useEffect(() => {
    setItems(getCart());
    setWishlist(getWishlist());
  }, []);

  const addToCart = (productId: string, quantity: number = 1) => {
    addToLocalStorage(productId, quantity);
    setItems(getCart());
  };

  const updateQuantity = (productId: string, quantity: number) => {
    updateLocalStorageQuantity(productId, quantity);
    setItems(getCart());
  };

  const removeItem = (productId: string) => {
    removeFromLocalStorage(productId);
    setItems(getCart());
  };

  const clearCart = () => {
    clearLocalStorage();
    setItems([]);
  };

  const addToWishlist = (productId: string) => {
    addToWishlistStorage(productId);
    setWishlist(getWishlist());
  };

  const removeFromWishlist = (productId: string) => {
    removeFromWishlistStorage(productId);
    setWishlist(getWishlist());
  };

  const isInWishlist = (productId: string): boolean => {
    return isInWishlistStorage(productId);
  };

  const clearWishlist = () => {
    clearWishlistStorage();
    setWishlist([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
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