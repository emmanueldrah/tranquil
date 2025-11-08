import { Address, CartItem, Order } from './index';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'admin';
  addresses: Address[];
  wishlist: string[];
  cart: CartItem[];
  orders: Order[];
  loyaltyPoints?: number;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  currency: string;
  language: string;
  theme: 'light' | 'dark' | 'auto';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}