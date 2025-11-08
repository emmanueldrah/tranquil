export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  // Add other product fields as needed
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CheckoutData {
  total: number;
  items: CartItem[];
}

