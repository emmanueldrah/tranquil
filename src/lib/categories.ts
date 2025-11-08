import { Category } from '@/types/category';

// Sample categories data - replace with actual data from your database
const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    image: '/categories/electronics.jpg',
    subcategories: [
      {
        id: '1-1',
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Latest smartphones and mobile devices',
        image: '/categories/smartphones.jpg',
      },
      {
        id: '1-2',
        name: 'Laptops',
        slug: 'laptops',
        description: 'Portable computers and laptops',
        image: '/categories/laptops.jpg',
      },
      {
        id: '1-3',
        name: 'Audio',
        slug: 'audio',
        description: 'Headphones, speakers, and audio equipment',
        image: '/categories/audio.jpg',
      },
      {
        id: '1-4',
        name: 'Accessories',
        slug: 'accessories',
        description: 'Phone cases, chargers, and tech accessories',
        image: '/categories/accessories.jpg',
      },
    ],
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    image: '/categories/fashion.jpg',
    subcategories: [
      {
        id: '2-1',
        name: 'Men',
        slug: 'men',
        description: 'Men&apos;s clothing and fashion',
        image: '/categories/men.jpg',
      },
      {
        id: '2-2',
        name: 'Women',
        slug: 'women',
        description: 'Women&apos;s clothing and fashion',
        image: '/categories/women.jpg',
      },
      {
        id: '2-3',
        name: 'Kids',
        slug: 'kids',
        description: 'Children&apos;s clothing and accessories',
        image: '/categories/kids.jpg',
      },
      {
        id: '2-4',
        name: 'Accessories',
        slug: 'fashion-accessories',
        description: 'Fashion accessories and jewelry',
        image: '/categories/fashion-accessories.jpg',
      },
    ],
  },
  {
    id: '3',
    name: 'Home Appliances',
    slug: 'home-appliances',
    description: 'Everything for your home and garden',
    image: '/categories/home-garden.jpg',
    subcategories: [
      {
        id: '3-1',
        name: 'Furniture',
        slug: 'furniture',
        description: 'Home furniture and decor',
        image: '/categories/furniture.jpg',
      },
      {
        id: '3-2',
        name: 'Decor',
        slug: 'decor',
        description: 'Home decoration and accessories',
        image: '/categories/decor.jpg',
      },
      {
        id: '3-3',
        name: 'Garden',
        slug: 'garden',
        description: 'Gardening tools and supplies',
        image: '/categories/garden.jpg',
      },
      {
        id: '3-4',
        name: 'Kitchen Appliances',
        slug: 'kitchen-appliances',
        description: 'Kitchen appliances and utensils',
        image: '/categories/kitchen.jpg',
      },
    ],
  },
  {
    id: '4',
    name: 'Beauty & Wellness',
    slug: 'beauty-wellness',
    description: 'Beauty products and wellness essentials',
    image: '/categories/beauty.jpg',
    subcategories: [
      {
        id: '4-1',
        name: 'Skincare',
        slug: 'skincare',
        description: 'Skincare products and treatments',
        image: '/categories/skincare.jpg',
      },
      {
        id: '4-2',
        name: 'Makeup',
        slug: 'makeup',
        description: 'Cosmetics and makeup products',
        image: '/categories/makeup.jpg',
      },
      {
        id: '4-3',
        name: 'Haircare',
        slug: 'haircare',
        description: 'Hair care products and styling',
        image: '/categories/haircare.jpg',
      },
      {
        id: '4-4',
        name: 'Wellness',
        slug: 'wellness',
        description: 'Wellness and personal care products',
        image: '/categories/wellness.jpg',
      },
    ],
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