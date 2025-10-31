export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  vendor: string;
  stock: number;
  rating: number;
  reviews: number;
  specifications?: Record<string, string>;
  isOnSale?: boolean;
  salePrice?: number;
  saleEnds?: string;
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
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  wishlist: string[]; // Product IDs
  cart: CartItem[];
  orders: Order[];
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
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
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