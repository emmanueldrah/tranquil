import prisma from '@/lib/prisma';
import { Product, Vendor, Banner, Order, Address } from '@/types';
import { Review } from '@/types/reviews';
import { randomUUID } from 'crypto';

const mapToProduct = (p: unknown): Product => {
  let images: string[] = [];
  if (p && typeof p === 'object' && 'images' in p) {
    try {
      let parsed = (p as { images: unknown }).images;
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }
      // This will handle nested arrays and ensure all items are strings.
      if (Array.isArray(parsed)) {
        images = parsed.flat(Infinity).filter((img: unknown) => typeof img === 'string' && img.length > 0);
      }
    } catch {
      images = [];
    }
  }

  if (!p || typeof p !== 'object') {
    throw new Error('Invalid product data');
  }

  const product = p as Record<string, unknown>;

  return {
    id: String(product.id ?? ''),
    name: product.name && typeof product.name === 'string' ? product.name : 'Unnamed Product',
    description: product.description && typeof product.description === 'string' ? product.description : '',
    price: typeof product.price === 'number' ? product.price : Number(product.price ?? 0),
    images,
    category: product.category && typeof product.category === 'string' ? product.category : '',
    subcategory: product.subcategory && typeof product.subcategory === 'string' ? product.subcategory : undefined,
    brand: product.brand && typeof product.brand === 'string' ? product.brand : undefined,
    stock: typeof product.stock === 'number' ? product.stock : Number(product.stock ?? 0),
    vendor: product.vendor && typeof product.vendor === 'string' ? product.vendor : '',
    rating: product.rating ? (typeof product.rating === 'string' ? JSON.parse(product.rating) : product.rating) : { average: 0, count: 0 },
    reviews: Array.isArray(product.reviews) ? product.reviews.length : 0,
    specifications: product.specifications && typeof product.specifications === 'string' ? JSON.parse(product.specifications) : {},
    isOnSale: typeof product.isOnSale === 'boolean' ? product.isOnSale : false,
    salePrice: typeof product.salePrice === 'number' ? product.salePrice : undefined,
    createdAt: product.createdAt ? new Date(product.createdAt as string | number | Date).toISOString() : new Date().toISOString(),
    variants: product.variants && typeof product.variants === 'string' ? JSON.parse(product.variants) : undefined,
    seo: (() => {
      if (product.seo) {
        if (typeof product.seo === 'string') {
          try {
            return JSON.parse(product.seo);
          } catch {
            return undefined;
          }
        }
        return product.seo;
      }
      return undefined;
    })(),
    tags: (() => {
      try {
        return product.tags && typeof product.tags === 'string' ? JSON.parse(product.tags) : undefined;
      } catch {
        return undefined;
      }
    })(),
  };
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const dbProducts = await prisma.product.findMany({ include: { reviews: true } });
    return dbProducts.map(mapToProduct);
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const dbProduct = await prisma.product.findUnique({
      where: { id },
      include: { reviews: true },
    });
    if (!dbProduct) return undefined;
    return mapToProduct(dbProduct);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return undefined;
  }
};

export const getVendorById = async (id: string): Promise<Vendor | undefined> => {
  return {
    id,
    name: 'Tranquil Goods',
    description: '',
    logo: '',
    rating: 5,
    reviews: 100,
    joinedDate: '',
    products: [],
    contactInfo: {
      phone: '',
      email: '',
      address: ''
    }
  };
};

export const getReviewsByProductId = async (id: string): Promise<Review[]> => {
    try {
        const reviews = await prisma.review.findMany({ where: { productId: id } });
        return reviews.map(r => ({
            id: r.id,
            productId: r.productId,
            userId: r.userId,
            rating: r.rating,
            title: r.title ?? undefined,
            comment: r.comment ?? undefined,
            userName: 'Anonymous',
            helpful: 0,
            verified: false,
            createdAt: r.createdAt.toISOString(),
            updatedAt: r.createdAt.toISOString() // Assuming updatedAt is same as createdAt if not present
        }));
    } catch {
        return [];
    }
};

export const getAllBanners = async (): Promise<Banner[]> => {
  try {
    const dbBanners = await (prisma as any).banner.findMany();
    return dbBanners.map((b: any) => ({
      id: b.id,
      title: b.title,
      description: b.description ?? undefined,
      image: b.image,
      link: b.link ?? undefined,
      isActive: b.isActive,
      position: b.position,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching all banners:', error);
    return [];
  }
};

export const getBannerById = async (id: string): Promise<Banner | undefined> => {
  try {
    const dbBanner = await (prisma as any).banner.findUnique({ where: { id } });
    if (!dbBanner) return undefined;
    return {
      id: dbBanner.id,
      title: dbBanner.title,
      description: dbBanner.description ?? undefined,
      image: dbBanner.image,
      link: dbBanner.link ?? undefined,
      isActive: dbBanner.isActive,
      position: dbBanner.position,
      createdAt: dbBanner.createdAt.toISOString(),
      updatedAt: dbBanner.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching banner ${id}:`, error);
    return undefined;
  }
};

export const createBanner = async (data: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Banner> => {
  try {
    const dbBanner = await (prisma as any).banner.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        link: data.link,
        isActive: data.isActive,
        position: data.position,
      },
    });
    return {
      id: dbBanner.id,
      title: dbBanner.title,
      description: dbBanner.description ?? undefined,
      image: dbBanner.image,
      link: dbBanner.link ?? undefined,
      isActive: dbBanner.isActive,
      position: dbBanner.position,
      createdAt: dbBanner.createdAt.toISOString(),
      updatedAt: dbBanner.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error creating banner:', error);
    throw error;
  }
};

export const updateBanner = async (id: string, data: Partial<Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Banner> => {
  try {
    const dbBanner = await (prisma as any).banner.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        link: data.link,
        isActive: data.isActive,
        position: data.position,
      },
    });
    return {
      id: dbBanner.id,
      title: dbBanner.title,
      description: dbBanner.description ?? undefined,
      image: dbBanner.image,
      link: dbBanner.link ?? undefined,
      isActive: dbBanner.isActive,
      position: dbBanner.position,
      createdAt: dbBanner.createdAt.toISOString(),
      updatedAt: dbBanner.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error(`Error updating banner ${id}:`, error);
    throw error;
  }
};

export const deleteBanner = async (id: string): Promise<void> => {
  try {
    await (prisma as any).banner.delete({ where: { id } });
  } catch (error) {
    console.error(`Error deleting banner ${id}:`, error);
    throw error;
  }
};

export const getAllVendors = async (): Promise<Vendor[]> => {
  try {
    const dbVendors = await prisma.vendor.findMany();
    return dbVendors.map(v => ({
      id: v.id,
      name: v.name,
      description: v.description ?? '',
      logo: v.logo ?? '',
      rating: v.rating ?? 0,
      reviews: 0, // TODO: Calculate from reviews table
      products: [], // No products relation in schema
      joinedDate: v.joinedDate?.toISOString() ?? '',
      contactInfo: v.contactInfo ? JSON.parse(v.contactInfo) : {
        phone: '',
        email: '',
        address: ''
      },
      website: undefined,
    }));
  } catch (error) {
    console.error('Error fetching all vendors:', error);
    return [];
  }
};

export const createVendor = async (data: Omit<Vendor, 'id' | 'joinedDate' | 'products' | 'reviews'>): Promise<Vendor> => {
  try {
    const dbVendor = await prisma.vendor.create({
      data: {
        id: randomUUID(),
        name: data.name,
        description: data.description,
        logo: data.logo,
        rating: data.rating,
        joinedDate: new Date(),
        contactInfo: JSON.stringify(data.contactInfo),
      },
    });
    return {
      id: dbVendor.id,
      name: dbVendor.name,
      description: dbVendor.description ?? '',
      logo: dbVendor.logo ?? '',
      rating: dbVendor.rating ?? 0,
      reviews: 0,
      products: [],
      joinedDate: dbVendor.joinedDate?.toISOString() ?? '',
      contactInfo: dbVendor.contactInfo ? JSON.parse(dbVendor.contactInfo) : {
        phone: '',
        email: '',
        address: ''
      },
      website: undefined,
    };
  } catch (error) {
    console.error('Error creating vendor:', error);
    throw error;
  }
};

export const updateVendor = async (id: string, data: Partial<Omit<Vendor, 'id' | 'joinedDate' | 'products' | 'reviews'>>): Promise<Vendor> => {
  try {
    const dbVendor = await prisma.vendor.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        logo: data.logo,
        rating: data.rating,
        contactInfo: data.contactInfo ? JSON.stringify(data.contactInfo) : undefined,
      },
    });
    return {
      id: dbVendor.id,
      name: dbVendor.name,
      description: dbVendor.description ?? '',
      logo: dbVendor.logo ?? '',
      rating: dbVendor.rating ?? 0,
      reviews: 0,
      products: [],
      joinedDate: dbVendor.joinedDate?.toISOString() ?? '',
      contactInfo: dbVendor.contactInfo ? JSON.parse(dbVendor.contactInfo) : {
        phone: '',
        email: '',
        address: ''
      },
      website: undefined,
    };
  } catch (error) {
    console.error(`Error updating vendor ${id}:`, error);
    throw error;
  }
};

export const deleteVendor = async (id: string): Promise<void> => {
  try {
    await prisma.vendor.delete({ where: { id } });
  } catch (error) {
    console.error(`Error deleting vendor ${id}:`, error);
    throw error;
  }
};

export const addProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'reviews'>): Promise<Product> => {
  try {
    const dbProduct = await (prisma.product.create as any)({
      data: {
        id: randomUUID(),
        name: data.name,
        description: data.description,
        price: data.price,
        images: JSON.stringify(data.images),
        category: data.category,
        subcategory: data.subcategory,
        brand: data.brand,
        stock: data.stock,
        vendor: data.vendor,
        specifications: JSON.stringify(data.specifications),
        isOnSale: data.isOnSale,
        salePrice: data.salePrice,
        variants: data.variants ? JSON.stringify(data.variants) : undefined,
        seo: data.seo ? JSON.stringify(data.seo) : undefined,
        tags: data.tags ? JSON.stringify(data.tags) : undefined,
      },
      include: { reviews: true },
    });
    return mapToProduct(dbProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'reviews'>>): Promise<Product> => {
  try {
    const dbProduct = await (prisma.product.update as any)({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images ? JSON.stringify(data.images) : undefined,
        category: data.category,
        subcategory: data.subcategory,
        brand: data.brand,
        stock: data.stock,
        vendor: data.vendor,
        specifications: data.specifications ? JSON.stringify(data.specifications) : undefined,
        isOnSale: data.isOnSale,
        salePrice: data.salePrice,
        variants: data.variants ? JSON.stringify(data.variants) : undefined,
        seo: data.seo ? JSON.stringify(data.seo) : undefined,
        tags: data.tags ? JSON.stringify(data.tags) : undefined,
      },
      include: { reviews: true },
    });
    return mapToProduct(dbProduct);
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await prisma.product.delete({ where: { id } });
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const dbOrders = await prisma.order.findMany();
    return dbOrders.map(o => ({
      id: o.id,
      userId: o.userId,
      status: o.status as Order['status'],
      totalAmount: o.totalAmount,
      paymentMethod: o.paymentMethod,
      items: o.items ? JSON.parse(o.items) : [],
      shippingAddress: o.shippingAddress ? JSON.parse(o.shippingAddress) : {} as Address,
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return [];
  }
};

export const getOrderById = async (id: string): Promise<Order | undefined> => {
  try {
    const dbOrder = await prisma.order.findUnique({
      where: { id },
    });
    if (!dbOrder) return undefined;
    return {
      id: dbOrder.id,
      userId: dbOrder.userId,
      status: dbOrder.status as Order['status'],
      totalAmount: dbOrder.totalAmount,
      paymentMethod: dbOrder.paymentMethod,
      items: dbOrder.items ? JSON.parse(dbOrder.items) : [],
      shippingAddress: dbOrder.shippingAddress ? JSON.parse(dbOrder.shippingAddress) : {} as Address,
      createdAt: dbOrder.createdAt.toISOString(),
      updatedAt: dbOrder.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    return undefined;
  }
};

export const updateOrderStatus = async (id: string, status: string): Promise<Order> => {
  try {
    const dbOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });
    return {
      id: dbOrder.id,
      userId: dbOrder.userId,
      status: dbOrder.status as Order['status'],
      totalAmount: dbOrder.totalAmount,
      paymentMethod: dbOrder.paymentMethod,
      items: dbOrder.items ? JSON.parse(dbOrder.items) : [],
      shippingAddress: dbOrder.shippingAddress ? JSON.parse(dbOrder.shippingAddress) : {} as Address,
      createdAt: dbOrder.createdAt.toISOString(),
      updatedAt: dbOrder.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error(`Error updating order ${id}:`, error);
    throw error;
  }
};

export const addOrderNote = async (id: string, author: string, note: string): Promise<Order> => {
  try {
    // Assuming there's a notes field or we need to add to order history
    const dbOrder = await prisma.order.update({
      where: { id },
      data: {
        // Add note to order - this might need adjustment based on schema
        // For now, we'll assume there's a notes field
      },
    });
    return {
      id: dbOrder.id,
      userId: dbOrder.userId,
      status: dbOrder.status as Order['status'],
      totalAmount: dbOrder.totalAmount,
      paymentMethod: dbOrder.paymentMethod,
      items: dbOrder.items ? JSON.parse(dbOrder.items) : [],
      shippingAddress: dbOrder.shippingAddress ? JSON.parse(dbOrder.shippingAddress) : {} as Address,
      createdAt: dbOrder.createdAt.toISOString(),
      updatedAt: dbOrder.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error(`Error adding note to order ${id}:`, error);
    throw error;
  }
};

export const addTrackingEvent = async (id: string, event: any): Promise<Order> => {
  try {
    // This would typically add to a tracking events table
    // For now, we'll return the order
    const dbOrder = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
    if (!dbOrder) throw new Error('Order not found');
    return {
      id: dbOrder.id,
      userId: dbOrder.userId,
      status: dbOrder.status as Order['status'],
      totalAmount: dbOrder.totalAmount,
      paymentMethod: dbOrder.paymentMethod,
      items: dbOrder.items ? JSON.parse(dbOrder.items) : [],
      shippingAddress: dbOrder.shippingAddress ? JSON.parse(dbOrder.shippingAddress) : {} as Address,
      createdAt: dbOrder.createdAt.toISOString(),
      updatedAt: dbOrder.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error(`Error adding tracking event to order ${id}:`, error);
    throw error;
  }
};

export const getAllCategories = async (): Promise<any[]> => {
  try {
    // This might be from a categories table or derived from products
    const categories = await prisma.product.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });
    return categories.map(c => c.category).filter(Boolean);
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
};

export const addVendor = async (data: Omit<Vendor, 'id' | 'joinedDate' | 'products' | 'reviews'>): Promise<Vendor> => {
  return createVendor(data);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const allProducts = await getAllProducts();
    // Return first 4 products as featured (you can modify this logic)
    return allProducts.slice(0, 4);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};
