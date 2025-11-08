import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    const totalProducts = products.length;
    const activeProducts = totalProducts;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;

    const orders = await prisma.order.findMany();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        userId: true,
        totalAmount: true,
        status: true,
        createdAt: true
      }
    });

    const formattedRecentOrders = recentOrders.map(order => ({
      id: order.id,
      customer: order.userId || 'Unknown Customer',
      amount: order.totalAmount,
      status: order.status,
      time: order.createdAt.toLocaleString()
    }));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    return NextResponse.json({
      stats: {
        totalProducts,
        activeProducts,
        outOfStockProducts,
        totalOrders,
        totalRevenue,
        avgOrderValue,
        todayOrders
      },
      recentOrders: formattedRecentOrders
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    // Always return a valid, empty-state JSON object
    return NextResponse.json({
      stats: {
        totalProducts: 0,
        activeProducts: 0,
        outOfStockProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        avgOrderValue: 0,
        todayOrders: 0
      },
      recentOrders: []
    }, { status: 200 }); // Return a 200 OK status
  }
}
