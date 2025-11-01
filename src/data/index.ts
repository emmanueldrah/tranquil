import { Product, Vendor, Category, CartItem, Order, User } from '@/types';

// Initialize local storage with empty data
const initializeLocalStorage = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify([]));
  }
  if (!localStorage.getItem('vendors')) {
    localStorage.setItem('vendors', JSON.stringify([]));
  }
  if (!localStorage.getItem('categories')) {
    localStorage.setItem('categories', JSON.stringify([]));
  }
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
};

// Products
export const getAllProducts = (): Product[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('products');
  return stored ? JSON.parse(stored) : [];
};

export const getProductById = (id: string): Product | undefined => {
  const products = getAllProducts();
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  const products = getAllProducts();
  return products.filter(product => product.category === category);
};

export const addProduct = (product: Product) => {
  const products = getAllProducts();
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
};

export const updateProduct = (product: Product) => {
  const products = getAllProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index !== -1) {
    products[index] = product;
    localStorage.setItem('products', JSON.stringify(products));
  }
};

export const deleteProduct = (id: string) => {
  const products = getAllProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(filteredProducts));
};

// Vendors
export const getAllVendors = (): Vendor[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('vendors');
  return stored ? JSON.parse(stored) : [];
};

export const getVendorById = (id: string): Vendor | undefined => {
  const vendors = getAllVendors();
  return vendors.find(vendor => vendor.id === id);
};

export const addVendor = (vendor: Vendor) => {
  const vendors = getAllVendors();
  vendors.push(vendor);
  localStorage.setItem('vendors', JSON.stringify(vendors));
};

export const updateVendor = (vendor: Vendor) => {
  const vendors = getAllVendors();
  const index = vendors.findIndex(v => v.id === vendor.id);
  if (index !== -1) {
    vendors[index] = vendor;
    localStorage.setItem('vendors', JSON.stringify(vendors));
  }
};

export const deleteVendor = (id: string) => {
  const vendors = getAllVendors();
  const filteredVendors = vendors.filter(v => v.id !== id);
  localStorage.setItem('vendors', JSON.stringify(filteredVendors));
};

// Orders
export const getAllOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('orders');
  return stored ? JSON.parse(stored) : [];
};

export const getOrderById = (id: string): Order | undefined => {
  const orders = getAllOrders();
  return orders.find(order => order.id === id);
};

export const addOrder = (order: Order) => {
  const orders = getAllOrders();
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
};

export const updateOrderStatus = (orderId: string, status: Order['status']) => {
  const orders = getAllOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem('orders', JSON.stringify(orders));
  }
};

// Categories
export const getAllCategories = (): Category[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('categories');
  return stored ? JSON.parse(stored) : [];
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  const categories = getAllCategories();
  return categories.find(category => category.slug === slug);
};

// Cart
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
};

export const addToCart = (productId: string, quantity: number = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateCartItemQuantity = (productId: string, quantity: number) => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.productId === productId);
  
  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const removeFromCart = (productId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
};

// Initialize local storage when importing this module
initializeLocalStorage();