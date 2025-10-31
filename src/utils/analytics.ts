// Types
export interface AnalyticsEvent {
  id: string;
  type: 'pageView' | 'productView' | 'addToCart' | 'checkout' | 'search';
  userId?: string;
  timestamp: string;
  data: Record<string, any>;
}

export interface AnalyticsSummary {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: Array<{
    productId: string;
    name: string;
    sales: number;
    revenue: number;
  }>;
  topCategories: Array<{
    category: string;
    sales: number;
    revenue: number;
  }>;
}

// Analytics tracking
export const trackEvent = (type: AnalyticsEvent['type'], data: Record<string, any>) => {
  try {
    const event: AnalyticsEvent = {
      id: `evt_${Date.now()}`,
      type,
      timestamp: new Date().toISOString(),
      data,
    };

    // Get current user if available
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      event.userId = JSON.parse(currentUser).id;
    }

    // Store event in local storage
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push(event);
    localStorage.setItem('analytics_events', JSON.stringify(events));
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

// Analytics reporting
export const getAnalyticsSummary = (
  startDate: string,
  endDate: string
): AnalyticsSummary => {
  const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
  const filteredEvents = events.filter(
    (event: AnalyticsEvent) =>
      event.timestamp >= startDate && event.timestamp <= endDate
  );

  // Initialize summary
  const summary: AnalyticsSummary = {
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topProducts: [],
    topCategories: [],
  };

  // Process checkout events for sales data
  const productSales = new Map<string, { sales: number; revenue: number }>();
  const categorySales = new Map<string, { sales: number; revenue: number }>();

  filteredEvents
    .filter((event: AnalyticsEvent) => event.type === 'checkout')
    .forEach((event: AnalyticsEvent) => {
      summary.totalOrders++;
      summary.totalSales += event.data.total;

      // Track product sales
      event.data.items.forEach((item: any) => {
        const product = JSON.parse(localStorage.getItem('products') || '[]').find(
          (p: any) => p.id === item.productId
        );

        if (product) {
          // Update product sales
          const productStats = productSales.get(product.id) || {
            sales: 0,
            revenue: 0,
          };
          productStats.sales += item.quantity;
          productStats.revenue += item.price * item.quantity;
          productSales.set(product.id, productStats);

          // Update category sales
          const categoryStats = categorySales.get(product.category) || {
            sales: 0,
            revenue: 0,
          };
          categoryStats.sales += item.quantity;
          categoryStats.revenue += item.price * item.quantity;
          categorySales.set(product.category, categoryStats);
        }
      });
    });

  // Calculate average order value
  summary.averageOrderValue =
    summary.totalOrders > 0 ? summary.totalSales / summary.totalOrders : 0;

  // Get top products
  summary.topProducts = Array.from(productSales.entries())
    .map(([productId, stats]) => {
      const product = JSON.parse(localStorage.getItem('products') || '[]').find(
        (p: any) => p.id === productId
      );
      return {
        productId,
        name: product ? product.name : 'Unknown Product',
        sales: stats.sales,
        revenue: stats.revenue,
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Get top categories
  summary.topCategories = Array.from(categorySales.entries())
    .map(([category, stats]) => ({
      category,
      sales: stats.sales,
      revenue: stats.revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return summary;
};