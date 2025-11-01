import { Category } from '@/types/category';

// Sample categories data - replace with actual data from your database
const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    image: '/categories/electronics.jpg',
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Accessories'],
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    image: '/categories/fashion.jpg',
    subcategories: ['Men', 'Women', 'Kids', 'Accessories'],
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden',
    image: '/categories/home-garden.jpg',
    subcategories: ['Furniture', 'Decor', 'Garden', 'Kitchen'],
  },
  {
    id: '4',
    name: 'Beauty & Wellness',
    slug: 'beauty-wellness',
    description: 'Beauty products and wellness essentials',
    image: '/categories/beauty.jpg',
    subcategories: ['Skincare', 'Makeup', 'Haircare', 'Wellness'],
  },
];

export async function getAllCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  return categories.find((category) => category.slug === slug);
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  return categories.find((category) => category.id === id);
}