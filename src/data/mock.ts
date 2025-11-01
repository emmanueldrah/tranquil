import { Category, Product, Vendor, User } from '@/types';

// Mock users data
export const mockUsers: User[] = [
  {
    id: 'admin_1',
    name: 'Admin User',
    email: 'admin@tranquil.com',
    role: 'admin',
    phone: '+233501234567',
    addresses: [],
    wishlist: [],
    cart: [],
    orders: [],
  },
];

// Map image paths to actual images in /images folder
export const productImages: Record<string, string> = {
  'samsung-s21': '/images/aa.jpg',
  'lg-washer': '/images/deca.jpg',
  'waffle-maker': '/images/delron waffle.jpg',
  'hot-plate': '/images/hot-pot-600x600.jpeg',
  'smart-watch': '/images/itel-smartwatch.jpg',
  'jbl-soundbar': '/images/JBL_CINEMA_SB170_LS1_WEB.png',
  'electric-kettle': '/images/KEKT017W-electric-kettle-plastic-hassanco-trading.jpg',
  'iron': '/images/Nasco-1200-Watts-Dry-Iron-NA-8820A.jpg',
  'rice-cooker': '/images/rice cooker.jpg',
  'toaster': '/images/toast.jpg',
};

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Home Appliances',
    slug: 'home-appliances',
    description: 'Quality appliances for your home',
    image: '/images/dec.jpg',
    subcategories: [
      {
        id: 'sub-1',
        name: 'Kitchen Appliances',
        slug: 'kitchen-appliances',
        description: 'Appliances for your kitchen',
        image: '/images/Decakila Mini Chopper.jpg',
      },
      {
        id: 'sub-2',
        name: 'Small Appliances',
        slug: 'small-appliances',
        description: 'Compact and efficient home appliances',
        image: '/images/Decakila 60W Hand Blender.jpg',
      },
    ],
  },
  {
    id: 'cat-2',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest electronics and gadgets',
    image: '/images/itel-smartwatch.jpg',
    subcategories: [
      {
        id: 'sub-3',
        name: 'Audio & Sound',
        slug: 'audio-sound',
        description: 'Premium audio equipment',
        image: '/images/JBL_CINEMA_SB170_LS1_WEB.png',
      },
      {
        id: 'sub-4',
        name: 'Wearables',
        slug: 'wearables',
        description: 'Smart wearable devices',
        image: '/images/smart watch.jpg',
      },
    ],
  },
  {
    id: 'cat-3',
    name: 'Kitchen Equipment',
    slug: 'kitchen-equipment',
    description: 'Professional kitchen equipment',
    image: '/images/Decakila Chopper.jpg',
    subcategories: [
      {
        id: 'sub-5',
        name: 'Food Preparation',
        slug: 'food-preparation',
        description: 'Food prep equipment',
        image: '/images/Decakila 2L Chopper.jpg',
      },
      {
        id: 'sub-6',
        name: 'Cooking',
        slug: 'cooking',
        description: 'Cooking equipment',
        image: '/images/double hot burner.jpg',
      },
    ],
  },
];

export const vendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Decakila',
    description: 'Quality kitchen and home appliances',
    logo: '/images/dec.jpg',
    rating: 4.5,
    reviews: 128,
    products: ['prod-1', 'prod-2'],
    joinedDate: '2024-01-15',
    contactInfo: {
      phone: '0241234567',
      email: 'sales@decakila.com',
      address: 'Accra Mall, Spintex Road',
    },
  },
  {
    id: 'vendor-2',
    name: 'JBL Ghana',
    description: 'Premium audio solutions',
    logo: '/images/jbl.jpg',
    rating: 4.3,
    reviews: 95,
    products: ['prod-3', 'prod-4'],
    joinedDate: '2024-02-01',
    contactInfo: {
      phone: '0257654321',
      email: 'info@jblghana.com',
      address: 'A&C Mall, East Legon',
    },
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Decakila 2L Food Chopper',
    description: 'Powerful 400W motor food processor with 2L capacity',
    price: 299.99,
    images: ['/images/Decakila 2L Chopper.jpg'],
    category: 'Kitchen Equipment',
    subcategory: 'Food Preparation',
    vendor: 'vendor-1',
    stock: 15,
    rating: { average: 4.7, count: 45 },
    reviews: 45,
    specifications: {
      'Capacity': '2L',
      'Power': '400W',
      'Material': 'Food-grade plastic',
      'Speed Settings': '2',
    },
    isOnSale: true,
    salePrice: 249.99,
    saleEnds: '2024-11-30T23:59:59Z',
  },
  {
    id: 'prod-2',
    name: 'JBL Cinema SB170',
    description: '2.1 channel soundbar with wireless subwoofer',
    price: 899.99,
    images: ['/images/JBL_CINEMA_SB170_LS1_WEB.png'],
    category: 'Electronics',
    subcategory: 'Audio & Sound',
    vendor: 'vendor-2',
    stock: 8,
    rating: { average: 4.5, count: 32 },
    reviews: 32,
    specifications: {
      'Total Power': '220W',
      'Subwoofer': 'Wireless',
      'Connectivity': 'Bluetooth, HDMI ARC',
      'Sound Channels': '2.1',
    },
  },
  {
    id: 'prod-3',
    name: 'Decakila Hand Blender',
    description: '60W portable hand blender with multiple attachments',
    price: 149.99,
    images: ['/images/Decakila 60W Hand Blender.jpg'],
    category: 'Kitchen Equipment',
    subcategory: 'Food Preparation',
    vendor: 'vendor-1',
    stock: 20,
    rating: { average: 4.3, count: 28 },
    reviews: 28,
    specifications: {
      'Power': '60W',
      'Speed Settings': 'Variable',
      'Attachments': 'Whisk, Chopper',
      'Material': 'Stainless Steel',
    },
  },
  {
    id: 'prod-4',
    name: 'Electric Hot Plate',
    description: 'Double burner electric hot plate',
    price: 199.99,
    images: ['/images/double hot burner.jpg'],
    category: 'Kitchen Equipment',
    subcategory: 'Cooking',
    vendor: 'vendor-1',
    stock: 12,
    rating: { average: 4.4, count: 15 },
    reviews: 15,
    specifications: {
      'Burners': '2',
      'Power': '2000W',
      'Temperature Control': 'Variable',
      'Material': 'Cast Iron',
    },
  },
  {
    id: 'prod-5',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness and health with this smart watch',
    price: 299.99,
    images: ['/images/smart watch.jpg'],
    category: 'Electronics',
    subcategory: 'Wearables',
    vendor: 'vendor-2',
    stock: 25,
    rating: { average: 4.6, count: 42 },
    reviews: 42,
    specifications: {
      'Screen': '1.4" AMOLED',
      'Battery Life': '14 days',
      'Water Resistance': '5ATM',
      'Features': 'Heart Rate, SpO2, Sleep Tracking',
    },
  },
];

// Add more mock data as needed

export const adminProfile = {
  name: '',
  email: '',
  phone: '',
  role: 'Super Admin',
  joinDate: '',
  lastLogin: '',
  permissions: ['All Access', 'User Management', 'Product Management', 'Order Management'],
  address: ''
};
