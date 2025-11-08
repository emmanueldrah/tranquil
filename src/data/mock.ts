import { Product, Vendor, Order, TrackingEvent } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Decakila 2L Chopper',
    description: 'Powerful 400W electric chopper for quick and efficient food preparation. Perfect for chopping vegetables, nuts, and making sauces.',
    price: 89.99,
    images: ['/images/Decakila 2L Chopper.jpg'],
    category: 'Home Appliances',
    subcategory: 'Kitchen Appliances',
    stock: 15,
    vendor: 'vendor-1',
    rating: { average: 4.5, count: 23 },
    reviews: 23,
    specifications: {
      'Power': '400W',
      'Capacity': '2L',
      'Material': 'Plastic',
      'Warranty': '1 Year'
    },
    isOnSale: false,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'JBL Cinema SB170 Soundbar',
    description: 'Immersive sound experience with wireless subwoofer. Perfect for movies, music, and gaming.',
    price: 199.99,
    images: ['/images/jbl.jpg'],
    category: 'Electronics',
    subcategory: 'Audio',
    stock: 8,
    vendor: 'vendor-2',
    rating: { average: 4.2, count: 45 },
    reviews: 45,
    specifications: {
      'Power Output': '120W',
      'Connectivity': 'Bluetooth, HDMI, Optical',
      'Dimensions': '88.9 x 5.8 x 8.4 cm',
      'Warranty': '1 Year'
    },
    isOnSale: true,
    salePrice: 149.99,
    saleEnds: '2024-02-15T23:59:59Z',
    createdAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    name: 'Cordless Hand Mixer',
    description: 'Lightweight and powerful cordless hand mixer with multiple speed settings. Battery operated for convenience.',
    price: 45.99,
    images: ['/images/Cordless hand mixer.jpg'],
    category: 'Home Appliances',
    subcategory: 'Kitchen Appliances',
    stock: 22,
    vendor: 'vendor-1',
    rating: { average: 4.0, count: 18 },
    reviews: 18,
    specifications: {
      'Battery Life': 'Up to 30 minutes',
      'Speeds': '5 variable speeds',
      'Weight': '0.8kg',
      'Warranty': '6 Months'
    },
    isOnSale: false,
    createdAt: '2024-01-08T09:15:00Z'
  },
  {
    id: '4',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking, heart rate monitoring, and smartphone notifications.',
    price: 129.99,
    images: ['/images/smart watch.jpg'],
    category: 'Electronics',
    subcategory: 'Accessories',
    stock: 12,
    vendor: 'vendor-3',
    rating: { average: 4.3, count: 67 },
    reviews: 67,
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery Life': 'Up to 7 days',
      'Water Resistance': 'IP68',
      'Compatibility': 'iOS & Android'
    },
    isOnSale: true,
    salePrice: 99.99,
    saleEnds: '2024-02-10T23:59:59Z',
    createdAt: '2024-01-05T16:45:00Z'
  },
  {
    id: '5',
    name: 'Rice Cooker',
    description: '8-cup capacity rice cooker with keep-warm function. Perfect for cooking rice, quinoa, and other grains.',
    price: 34.99,
    images: ['/images/rice cooker.jpg'],
    category: 'Home Appliances',
    subcategory: 'Kitchen Appliances',
    stock: 18,
    vendor: 'vendor-3',
    rating: { average: 4.1, count: 32 },
    reviews: 32,
    specifications: {
      'Capacity': '8 cups',
      'Functions': 'Cook, Warm',
      'Material': 'Aluminum',
      'Power': '500W'
    },
    isOnSale: false,
    createdAt: '2024-01-03T11:20:00Z'
  },
  {
    id: '6',
    name: 'Waffle Maker',
    description: 'Non-stick waffle maker with adjustable temperature control. Makes perfect waffles every time.',
    price: 39.99,
    images: ['/images/waffle.jpg'],
    category: 'Home Appliances',
    subcategory: 'Kitchen Appliances',
    stock: 14,
    vendor: 'vendor-3',
    rating: { average: 4.4, count: 28 },
    reviews: 28,
    specifications: {
      'Plates': 'Non-stick',
      'Power': '750W',
      'Dimensions': '25 x 20 x 10 cm',
      'Warranty': '1 Year'
    },
    isOnSale: false,
    createdAt: '2024-01-01T13:00:00Z'
  }
];

// Mock tracking events for demonstration
export const mockTrackingEvents: TrackingEvent[] = [
  {
    id: '1',
    status: 'Order Placed',
    description: 'Your order has been successfully placed and is being processed.',
    location: 'Accra, Ghana',
    timestamp: '2024-11-15T10:30:00Z',
    carrier: 'Internal Processing'
  },
  {
    id: '2',
    status: 'Order Confirmed',
    description: 'Your order has been confirmed and payment has been received.',
    location: 'Accra, Ghana',
    timestamp: '2024-11-15T11:00:00Z',
    carrier: 'Internal Processing'
  },
  {
    id: '3',
    status: 'Processing',
    description: 'Your order is being prepared for shipment.',
    location: 'Accra Warehouse',
    timestamp: '2024-11-15T14:30:00Z',
    carrier: 'Internal Processing'
  },
  {
    id: '4',
    status: 'Shipped',
    description: 'Your order has been shipped and is on its way.',
    location: 'Accra Distribution Center',
    timestamp: '2024-11-16T09:15:00Z',
    carrier: 'DHL Ghana'
  },
  {
    id: '5',
    status: 'In Transit',
    description: 'Package is in transit to the delivery location.',
    location: 'Tema Transit Hub',
    timestamp: '2024-11-16T16:45:00Z',
    carrier: 'DHL Ghana'
  },
  {
    id: '6',
    status: 'Out for Delivery',
    description: 'Your package is out for delivery and will arrive today.',
    location: 'Kumasi Delivery Center',
    timestamp: '2024-11-17T08:30:00Z',
    carrier: 'DHL Ghana'
  },
  {
    id: '7',
    status: 'Delivered',
    description: 'Your order has been successfully delivered.',
    location: 'Customer Address',
    timestamp: '2024-11-17T14:20:00Z',
    carrier: 'DHL Ghana'
  }
];

// Mock orders with tracking data
export const mockOrders: Order[] = [
  {
    id: '#ORD-2024-001',
    userId: 'user-1',
    items: [
      {
        productId: '1',
        quantity: 1,
        price: 89.99
      },
      {
        productId: '3',
        quantity: 2,
        price: 45.99
      }
    ],
    totalAmount: 181.97,
    status: 'delivered',
    paymentMethod: 'Mobile Money',
    shippingAddress: {
      id: 'addr-1',
      type: 'home',
      street: '123 Main Street',
      city: 'Accra',
      region: 'Greater Accra',
      postalCode: '00233',
      isDefault: true
    },
    createdAt: '2024-11-15T10:30:00Z',
    updatedAt: '2024-11-17T14:20:00Z',
    trackingNumber: 'DHL-GH-123456789',
    estimatedDelivery: '2024-11-17T18:00:00Z',
    trackingHistory: mockTrackingEvents,
    carrier: 'DHL Ghana'
  },
  {
    id: '#ORD-2024-002',
    userId: 'user-1',
    items: [
      {
        productId: '2',
        quantity: 1,
        price: 149.99
      }
    ],
    totalAmount: 149.99,
    status: 'shipped',
    paymentMethod: 'Card',
    shippingAddress: {
      id: 'addr-1',
      type: 'home',
      street: '123 Main Street',
      city: 'Accra',
      region: 'Greater Accra',
      postalCode: '00233',
      isDefault: true
    },
    createdAt: '2024-11-16T09:00:00Z',
    updatedAt: '2024-11-16T16:45:00Z',
    trackingNumber: 'DHL-GH-987654321',
    estimatedDelivery: '2024-11-18T18:00:00Z',
    trackingHistory: mockTrackingEvents.slice(0, 5),
    carrier: 'DHL Ghana'
  },
  {
    id: '#ORD-2024-003',
    userId: 'user-1',
    items: [
      {
        productId: '4',
        quantity: 1,
        price: 99.99
      },
      {
        productId: '5',
        quantity: 1,
        price: 34.99
      }
    ],
    totalAmount: 134.98,
    status: 'processing',
    paymentMethod: 'Mobile Money',
    shippingAddress: {
      id: 'addr-1',
      type: 'home',
      street: '123 Main Street',
      city: 'Accra',
      region: 'Greater Accra',
      postalCode: '00233',
      isDefault: true
    },
    createdAt: '2024-11-17T14:00:00Z',
    updatedAt: '2024-11-17T14:30:00Z',
    estimatedDelivery: '2024-11-20T18:00:00Z',
    trackingHistory: mockTrackingEvents.slice(0, 3),
    carrier: 'Internal Processing'
  }
];

export const vendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Decakila',
    description: 'Leading manufacturer of kitchen appliances and home gadgets. Committed to quality and innovation.',
    logo: '/images/decakila-logo.png',
    rating: 4.3,
    reviews: 156,
    products: ['1', '3'],
    joinedDate: '2023-06-15T00:00:00Z',
    contactInfo: {
      phone: '+233 24 123 4567',
      email: 'info@decakila.com',
      address: '123 Industrial Road, Accra, Ghana'
    },
    website: 'https://decakila.com'
  },
  {
    id: 'vendor-2',
    name: 'JBL Ghana',
    description: 'Official distributor of JBL audio products in Ghana. Bringing premium sound experiences to your home.',
    logo: '/images/jbl-logo.png',
    rating: 4.5,
    reviews: 89,
    products: ['2'],
    joinedDate: '2023-08-20T00:00:00Z',
    contactInfo: {
      phone: '+233 20 987 6543',
      email: 'sales@jblghana.com',
      address: '456 Commercial Street, Tema, Ghana'
    },
    website: 'https://jblghana.com'
  },
  {
    id: 'vendor-3',
    name: 'Generic Electronics',
    description: 'Wide range of electronic products and accessories for everyday use.',
    logo: '/images/generic-logo.png',
    rating: 3.8,
    reviews: 234,
    products: ['4', '5', '6'],
    joinedDate: '2023-04-10T00:00:00Z',
    contactInfo: {
      phone: '+233 27 555 1234',
      email: 'contact@genericelectronics.com',
      address: '789 Market Road, Kumasi, Ghana'
    }
  }
];
