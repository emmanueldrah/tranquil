import fs from 'fs/promises';
import path from 'path';
import prismaImport from '@prisma/client';
const { PrismaClient } = prismaImport;
const prisma = new PrismaClient();

async function readJsonIfExists(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function importAbandonedCarts(filePath) {
  const list = await readJsonIfExists(filePath);
  if (!list || !Array.isArray(list)) return 0;
  for (const s of list) {
    try {
      await prisma.abandonedCart.upsert({ where: { id: s.id }, update: {}, create: {
        id: s.id,
        items: JSON.stringify(s.items || []),
        total: s.total || 0,
        userEmail: s.userEmail || null,
        createdAt: s.createdAt ? new Date(s.createdAt) : new Date(),
        sentAt: s.sentAt ? new Date(s.sentAt) : null,
      }});
    } catch (err) {
      console.error('Failed to import abandoned cart', s.id, err.message || err);
    }
  }
  return list.length;
}

async function importOrders(filePath) {
  const list = await readJsonIfExists(filePath);
  if (!list || !Array.isArray(list)) return 0;
  for (const o of list) {
    try {
      await prisma.order.upsert({ where: { id: o.id }, update: {}, create: {
        id: o.id,
        userId: o.userId || 'imported',
        items: JSON.stringify(o.items || []),
        totalAmount: o.totalAmount || 0,
        status: o.status || 'pending',
        paymentMethod: o.paymentMethod || '',
        shippingAddress: JSON.stringify(o.shippingAddress || {}),
        createdAt: o.createdAt ? new Date(o.createdAt) : new Date(),
        updatedAt: o.updatedAt ? new Date(o.updatedAt) : new Date(),
        trackingNumber: o.trackingNumber || null,
        estimatedDelivery: o.estimatedDelivery ? new Date(o.estimatedDelivery) : null,
        trackingHistory: o.trackingHistory ? JSON.stringify(o.trackingHistory) : null,
        notes: o.notes ? JSON.stringify(o.notes) : null,
      }});
    } catch (err) {
      console.error('Failed to import order', o.id, err.message || err);
    }
  }
  return list.length;
}

async function importProducts(filePath) {
  const list = await readJsonIfExists(filePath);
  if (!list || !Array.isArray(list)) return 0;
  for (const p of list) {
    try {
      await prisma.product.upsert({ where: { id: p.id }, update: {}, create: {
        id: p.id,
        name: p.name,
        description: p.description || null,
        price: p.price || 0,
        images: JSON.stringify(p.images || []),
        category: p.category || null,
        stock: p.stock || 0,
        vendor: p.vendor || '',
        createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
      }});
    } catch (err) {
      console.error('Failed to import product', p.id, err.message || err);
    }
  }
  return list.length;
}

async function importVendors(filePath) {
  const list = await readJsonIfExists(filePath);
  if (!list || !Array.isArray(list)) return 0;
  for (const v of list) {
    try {
      await prisma.vendor.upsert({ where: { id: v.id }, update: {}, create: {
        id: v.id,
        name: v.name,
        description: v.description || null,
        logo: v.logo || null,
        rating: v.rating || null,
        joinedDate: v.joinedDate ? new Date(v.joinedDate) : null,
        contactInfo: v.contactInfo ? JSON.stringify(v.contactInfo) : null,
      }});
    } catch (err) {
      console.error('Failed to import vendor', v.id, err.message || err);
    }
  }
  return list.length;
}

async function main() {
  const dataDir = path.join(process.cwd(), 'data');
  const abandonedPath = path.join(dataDir, 'abandoned-carts.json');
  const ordersPath = path.join(dataDir, 'orders.json');
  const productsPath = path.join(dataDir, 'products.json');
  const vendorsPath = path.join(dataDir, 'vendors.json');

  console.log('Importing local JSON files to Prisma DB if present...');
  const acCount = await importAbandonedCarts(abandonedPath);
  console.log(`Imported ${acCount} abandoned carts (if file existed)`);
  const ordersCount = await importOrders(ordersPath);
  console.log(`Imported ${ordersCount} orders (if file existed)`);
  const productsCount = await importProducts(productsPath);
  console.log(`Imported ${productsCount} products (if file existed)`);
  const vendorsCount = await importVendors(vendorsPath);
  console.log(`Imported ${vendorsCount} vendors (if file existed)`);

  await prisma.$disconnect();
  console.log('Import finished.');
}

main().catch((e)=>{ console.error(e); process.exit(1); });
