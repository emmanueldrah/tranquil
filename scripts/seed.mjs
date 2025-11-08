import prismaImport from '@prisma/client';
const { PrismaClient } = prismaImport;
const prisma = new PrismaClient();

// Mock data (subset) — mirror of src/data/mock.ts but simplified for seeding
const vendors = [
  {
    id: 'vendor-1',
    name: 'Decakila',
    description: 'Leading manufacturer of kitchen appliances and home gadgets. Committed to quality and innovation.',
    logo: '/images/decakila-logo.png',
    rating: 4.3,
    joinedDate: '2023-06-15T00:00:00Z',
    contactInfo: { phone: '+233 24 123 4567', email: 'info@decakila.com', address: '123 Industrial Road, Accra, Ghana' }
  },
  {
    id: 'vendor-2',
    name: 'JBL Ghana',
    description: 'Official distributor of JBL audio products in Ghana.',
    logo: '/images/jbl-logo.png',
    rating: 4.5,
    joinedDate: '2023-08-20T00:00:00Z',
    contactInfo: { phone: '+233 20 987 6543', email: 'sales@jblghana.com', address: '456 Commercial Street, Tema, Ghana' }
  },
  {
    id: 'vendor-3',
    name: 'Generic Electronics',
    description: 'Wide range of electronic products and accessories for everyday use.',
    logo: '/images/generic-logo.png',
    rating: 3.8,
    joinedDate: '2023-04-10T00:00:00Z',
    contactInfo: { phone: '+233 27 555 1234', email: 'contact@genericelectronics.com', address: '789 Market Road, Kumasi, Ghana' }
  }
];

const imageFiles = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '7speed.jpg',
  'aa.jpg',
  'aaaa.png',
  'ASAno-43.jpg',
  'birudmart-multi-functional-plastic-knife-and-other-kitchen-cutlery-holder-stand-for-dinning-tables-product-images-orvutvwy4ds-p596337543-1-202212131825.jpg',
  'blen.jpg',
  'bluetooth.jpg',
  'Cordless hand mixer.jpg',
  'dec.jpg',
  'deca.jpg',
  'Decakila 2L Chop.png',
  'Decakila 2L Chopper.jpg',
  'Decakila 50W Cordless Portable Blen.jpg',
  'Decakila 50W Cordless Portable Blender.jpg',
  'Decakila 60W Hand B.jpg',
  'Decakila 60W Hand Blend.png',
  'Decakila 60W Hand Blender.jpg',
  'Decakila Chopper 400W.jpg',
  'Decakila Chopper.jpg',
  'Decakila electric skill.jpg',
  'Decakila electric skillet.jpg',
  'Decakila Mini Chopper 200W.jpg',
  'Decakila Mini Chopper.jpg',
  'Decakila-KMJB012P-C-R.jpg',
  'deco.jpg',
  'delron waffle.jpg',
  'double hot burner.jpg',
  'gy.jpg',
  'hot-pot-600x600.jpeg',
  'itel-smartwatch.jpg',
  'jb.jpg',
  'jbk.jpg',
  'JBL_CINEMA_SB170_LS1_WEB.png',
  'jbl.jpg',
  'jbl.png',
  'jnb.png',
  'KEKT017W-electric-kettle-plastic-hassanco-trading.jpg',
  'kett.jpg',
  'kettle.jpg',
  'Nasco-1200-Watts-Dry-Iron-NA-8820A.jpg',
  'NASGC-SNIPER50B-600x600.jpg',
  'otak-interglobe-multi-functional-brown-and-beige-plastic-empty-cutlery-box-case-product-images-orvi1t0jqlh-p598883594-1-202302271352.jpg',
  'oven.jpg',
  'pro.jpg',
  'rack.jpg',
  'rice cooker.jpg',
  's-l1600.jpg',
  'slice.jpg',
  'smart watch.jpg',
  'sunn.jpg',
  'sunny.jpg',
  'sunnywalk.jpg',
  'tcl.jpg',
  'TFGRJHRFGJH-600x600.jpg',
  'toas.jpg',
  'toast.jpg',
  'TRUF-SOUDBAR-1.jpg',
  'tw.jpg',
  'twin tab.jpg',
  'waffl.jpg',
  'waffle.jpg'
];

const vendorsList = ['vendor-1', 'vendor-2', 'vendor-3'];

function getCategoryFromName(name) {
  const lower = name.toLowerCase();
  if (lower.includes('chopper') || lower.includes('blender') || lower.includes('mixer') || lower.includes('kettle') || lower.includes('cooker') || lower.includes('waffle') || lower.includes('oven') || lower.includes('burner') || lower.includes('skillet') || lower.includes('iron') || lower.includes('knife') || lower.includes('cutlery') || lower.includes('holder') || lower.includes('stand') || lower.includes('rack') || lower.includes('slice') || lower.includes('toast')) {
    return 'Home Appliances';
  } else if (lower.includes('jbl') || lower.includes('soundbar') || lower.includes('bluetooth') || lower.includes('smartwatch') || lower.includes('watch') || lower.includes('itel') || lower.includes('tcl') || lower.includes('tab') || lower.includes('phone') || lower.includes('electronic')) {
    return 'Electronics';
  } else {
    return 'General';
  }
}

const products = imageFiles.map((file, index) => {
  const name = file.replace(/\.(jpg|png|jpeg)$/i, '').replace(/-/g, ' ').replace(/_/g, ' ');
  const category = getCategoryFromName(name);
  const price = Math.floor(Math.random() * 190) + 10; // 10-200
  const stock = Math.floor(Math.random() * 46) + 5; // 5-50
  const vendor = vendorsList[index % vendorsList.length];
  return {
    id: (index + 1).toString(),
    name: name.charAt(0).toUpperCase() + name.slice(1),
    description: `High-quality product: ${name}`,
    price: parseFloat(price.toFixed(2)),
    images: [`/images/${file}`],
    category,
    stock,
    vendor,
    createdAt: new Date().toISOString()
  };
});

const orders = [
  {
    id: '#ORD-2024-001',
    userId: 'user-1',
    items: [
      { productId: '1', quantity: 1, price: 89.99 },
      { productId: '3', quantity: 2, price: 45.99 }
    ],
    totalAmount: 181.97,
    status: 'delivered',
    paymentMethod: 'Mobile Money',
    shippingAddress: { id: 'addr-1', type: 'home', street: '123 Main Street', city: 'Accra', region: 'Greater Accra', postalCode: '00233', isDefault: true },
    createdAt: '2024-11-15T10:30:00Z',
    updatedAt: '2024-11-17T14:20:00Z'
  }
];

async function main() {
  console.log('Seeding DB...');

  for (const v of vendors) {
    await prisma.vendor.upsert({ where: { id: v.id }, update: {}, create: {
      id: v.id,
      name: v.name,
      description: v.description,
      logo: v.logo,
      rating: v.rating,
      joinedDate: new Date(v.joinedDate),
      contactInfo: JSON.stringify(v.contactInfo)
    }});
  }

  for (const p of products) {
    await prisma.product.upsert({ where: { id: p.id }, update: {}, create: {
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      images: JSON.stringify(p.images),
      category: p.category,
      stock: p.stock,
      vendor: p.vendor,
      createdAt: p.createdAt ? new Date(p.createdAt) : new Date()
    }});
  }

  // Create a test user first
  await prisma.user.upsert({ where: { email: 'test@example.com' }, update: {}, create: {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedpassword',
    phone: '+233 24 123 4567',
    role: 'customer'
  }});

  for (const o of orders) {
    await prisma.order.upsert({ where: { id: o.id }, update: {}, create: {
      id: o.id,
      userId: o.userId,
      items: JSON.stringify(o.items),
      totalAmount: o.totalAmount,
      status: o.status,
      paymentMethod: o.paymentMethod,
      shippingAddress: JSON.stringify(o.shippingAddress),
      createdAt: new Date(o.createdAt),
      updatedAt: new Date(o.updatedAt)
    }});
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
