import { Product } from '@/types/product';

// Sample products data - replace with actual data from your database
const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    description: 'Premium wireless earbuds with active noise cancellation',
    price: 129.99,
    category: 'Electronics',
    subcategory: 'Audio',
    images: ['/products/earbuds.jpg'],
    stock: 45,
    vendor: 'TechCorp',
    rating: {
      average: 4.5,
      count: 128,
    },
    reviews: 128,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 199.99,
    category: 'Electronics',
    subcategory: 'Accessories',
    images: ['/products/smartwatch.jpg'],
    stock: 32,
    vendor: 'WearTech',
    rating: {
      average: 4.3,
      count: 95,
    },
    reviews: 95,
  },
  // Add more sample products here
];

export async function getAllProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  return products.find((product) => product.id === id);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getProductsBySearch(query: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  // For demo purposes, return first 4 products as featured
  return products.slice(0, 4);
}

export async function getNewArrivals(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  // For demo purposes, return last 4 products as new arrivals
  return products.slice(-4);
}