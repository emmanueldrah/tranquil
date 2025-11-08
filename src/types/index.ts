export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  stock: number;
  vendor: string;
  rating: {
    average: number;
    count: number;
  };
  reviews: number;
  specifications?: Record<string, string>;
  isOnSale?: boolean;
  salePrice?: number;
  originalPrice?: number;
  saleEnds?: string;
  createdAt?: string;
  variants?: ProductVariant[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  tags?: string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'storage' | 'material' | 'style';
  value: string;
  price?: number; // Additional price for this variant
  stock: number;
  sku?: string;
  image?: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  rating: number;
  reviews: number;
  products: string[]; // Product IDs
  joinedDate: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  website?: string;
}

import { UserPreferences } from './auth';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: 'user' | 'admin';
  addresses: Address[];
  wishlist: string[]; // Product IDs
  cart: CartItem[];
  orders: Order[];
  loyaltyPoints?: number;
  preferences?: UserPreferences;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  region: string;
  postalCode: string;
  isDefault: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  trackingHistory?: TrackingEvent[];
  carrier?: string;
  // Optional notes left on the order (customer or vendor/admin)
  notes?: { author: string; message: string; createdAt: string }[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location?: string;
  timestamp: string;
  carrier?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Banner {
  id: string;
  title: string;
  description?: string;
  image: string;
  link?: string;
  isActive: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
}
