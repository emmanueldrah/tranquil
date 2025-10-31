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
} from '@/data';

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Initialize cart from localStorage
  useEffect(() => {
    setItems(getCart());
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

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeItem, clearCart }}
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