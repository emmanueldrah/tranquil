import { Product, Vendor, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Home Appliances',
    slug: 'home-appliances',
    description: 'Quality appliances for your home',
    image: '/images/categories/home-appliances.jpg',
    subcategories: [
      {
        id: 'sub-1',
        name: 'Kitchen Appliances',
        slug: 'kitchen-appliances',
        description: 'Appliances for your kitchen',
        image: '/images/subcategories/kitchen-appliances.jpg',
      },
      {
        id: 'sub-2',
        name: 'Laundry',
        slug: 'laundry',
        description: 'Washing machines and dryers',
        image: '/images/subcategories/laundry.jpg',
      },
    ],
  },
  {
    id: 'cat-2',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest electronics and gadgets',
    image: '/images/categories/electronics.jpg',
    subcategories: [
      {
        id: 'sub-3',
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Latest smartphones',
        image: '/images/subcategories/smartphones.jpg',
      },
      {
        id: 'sub-4',
        name: 'Laptops',
        slug: 'laptops',
        description: 'Powerful laptops',
        image: '/images/subcategories/laptops.jpg',
      },
    ],
  },
  {
    id: 'cat-3',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy fashion items',
    image: '/images/categories/fashion.jpg',
    subcategories: [
      {
        id: 'sub-5',
        name: 'Men',
        slug: 'men',
        description: 'Men\'s fashion',
        image: '/images/subcategories/men.jpg',
      },
      {
        id: 'sub-6',
        name: 'Women',
        slug: 'women',
        description: 'Women\'s fashion',
        image: '/images/subcategories/women.jpg',
      },
    ],
  },
  {
    id: 'cat-4',
    name: 'Beauty & Wellness',
    slug: 'beauty-wellness',
    description: 'Beauty and wellness products',
    image: '/images/categories/beauty.jpg',
    subcategories: [
      {
        id: 'sub-7',
        name: 'Skincare',
        slug: 'skincare',
        description: 'Skincare products',
        image: '/images/subcategories/skincare.jpg',
      },
      {
        id: 'sub-8',
        name: 'Haircare',
        slug: 'haircare',
        description: 'Haircare products',
        image: '/images/subcategories/haircare.jpg',
      },
    ],
  },
];

export const vendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'TechHub Ghana',
    description: 'Your trusted electronics partner',
    logo: '/images/vendors/techhub.jpg',
    rating: 4.5,
    reviews: 128,
    products: ['prod-1', 'prod-2'],
    joinedDate: '2024-01-15',
    contactInfo: {
      phone: '0241234567',
      email: 'sales@techhubgh.com',
      address: 'Accra Mall, Spintex Road',
    },
  },
  {
    id: 'vendor-2',
    name: 'HomeStyle',
    description: 'Quality home appliances',
    logo: '/images/vendors/homestyle.jpg',
    rating: 4.3,
    reviews: 95,
    products: ['prod-3', 'prod-4'],
    joinedDate: '2024-02-01',
    contactInfo: {
      phone: '0257654321',
      email: 'info@homestylegh.com',
      address: 'A&C Mall, East Legon',
    },
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Samsung Galaxy S21',
    description: 'Latest Samsung flagship smartphone',
    price: 4999.99,
    images: ['/images/products/samsung-s21.jpg'],
    category: 'Electronics',
    subcategory: 'Smartphones',
    vendor: 'vendor-1',
    stock: 15,
    rating: 4.7,
    reviews: 45,
    specifications: {
      'Screen Size': '6.2 inches',
      'Storage': '128GB',
      'RAM': '8GB',
      'Battery': '4000mAh',
    },
    isOnSale: true,
    salePrice: 4499.99,
    saleEnds: '2024-11-30T23:59:59Z',
  },
  {
    id: 'prod-2',
    name: 'LG Front Load Washer',
    description: '8kg front loading washing machine',
    price: 2999.99,
    images: ['/images/products/lg-washer.jpg'],
    category: 'Home Appliances',
    subcategory: 'Laundry',
    vendor: 'vendor-2',
    stock: 8,
    rating: 4.5,
    reviews: 32,
    specifications: {
      'Capacity': '8kg',
      'Spin Speed': '1200 RPM',
      'Energy Rating': 'A+++',
    },
  },
];

// Add more mock data as needed