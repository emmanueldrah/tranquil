import { LoyaltyPoints, LoyaltyTransaction, LoyaltyTier, Coupon, ReferralProgram, LoyaltyConfig } from '@/types/loyalty';

// Mock loyalty configuration
const LOYALTY_CONFIG: LoyaltyConfig = {
  pointsPerDollar: 1, // 1 point per $1 spent
  pointsExpiryMonths: 12,
  tiers: [
    {
      level: 'bronze',
      name: 'Bronze Member',
      minPoints: 0,
      maxPoints: 999,
      benefits: [
        { id: '1', type: 'discount', description: '5% discount on all purchases', value: 5 }
      ],
      color: '#CD7F32'
    },
    {
      level: 'silver',
      name: 'Silver Member',
      minPoints: 1000,
      maxPoints: 4999,
      benefits: [
        { id: '2', type: 'discount', description: '10% discount on all purchases', value: 10 },
        { id: '3', type: 'free_shipping', description: 'Free shipping on orders over $50', value: 50 }
      ],
      color: '#C0C0C0'
    },
    {
      level: 'gold',
      name: 'Gold Member',
      minPoints: 5000,
      maxPoints: 9999,
      benefits: [
        { id: '4', type: 'discount', description: '15% discount on all purchases', value: 15 },
        { id: '5', type: 'free_shipping', description: 'Free shipping on all orders', value: 0 },
        { id: '6', type: 'bonus_points', description: '2x points on all purchases', value: 2 }
      ],
      color: '#FFD700'
    },
    {
      level: 'platinum',
      name: 'Platinum Member',
      minPoints: 10000,
      maxPoints: Infinity,
      benefits: [
        { id: '7', type: 'discount', description: '20% discount on all purchases', value: 20 },
        { id: '8', type: 'free_shipping', description: 'Free shipping on all orders', value: 0 },
        { id: '9', type: 'bonus_points', description: '3x points on all purchases', value: 3 },
        { id: '10', type: 'priority_support', description: 'Priority customer support', value: 1 }
      ],
      color: '#E5E4E2'
    }
  ],
  referralBonus: 500,
  birthdayBonus: 200,
  reviewBonus: 50
};

// Mock coupons data
const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minPurchase: 50,
    usageLimit: 100,
    usedCount: 23,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    isActive: true,
    description: '10% off your first purchase',
    terms: 'Valid for new customers only'
  },
  {
    id: '2',
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    minPurchase: 75,
    usageLimit: 50,
    usedCount: 12,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    isActive: true,
    description: 'Free shipping on orders over $75',
    terms: 'Valid on standard shipping only'
  },
  {
    id: '3',
    code: 'FLASH20',
    type: 'percentage',
    value: 20,
    maxDiscount: 50,
    usageLimit: 25,
    usedCount: 8,
    validFrom: '2024-01-15',
    validUntil: '2024-01-20',
    applicableCategories: ['electronics', 'clothing'],
    isActive: true,
    description: '20% off electronics and clothing',
    terms: 'Limited time offer'
  }
];

class LoyaltyService {
  private config: LoyaltyConfig = LOYALTY_CONFIG;

  // Calculate points earned from purchase
  calculatePointsEarned(amount: number, userTier?: LoyaltyTier): number {
    const basePoints = Math.floor(amount * this.config.pointsPerDollar);
    const multiplier = userTier?.benefits.find(b => b.type === 'bonus_points')?.value || 1;
    return basePoints * multiplier;
  }

  // Get user&apos;s current tier
  getUserTier(points: number): LoyaltyTier {
    return this.config.tiers
      .slice()
      .reverse()
      .find(tier => points >= tier.minPoints) || this.config.tiers[0];
  }

  // Get loyalty points for a user
  async getUserLoyaltyPoints(userId: string): Promise<LoyaltyPoints> {
    // Mock data - in real app, this would fetch from database
    const mockPoints: LoyaltyPoints = {
      current: 2500,
      totalEarned: 3200,
      totalSpent: 700,
      tier: this.getUserTier(2500),
      history: [
        {
          id: '1',
          type: 'earned',
          amount: 150,
          reason: 'Purchase reward',
          orderId: 'ORD_001',
          timestamp: '2024-01-15T10:30:00Z',
          expiresAt: '2025-01-15T10:30:00Z'
        },
        {
          id: '2',
          type: 'spent',
          amount: 200,
          reason: 'Discount redemption',
          timestamp: '2024-01-14T14:20:00Z'
        },
        {
          id: '3',
          type: 'earned',
          amount: 500,
          reason: 'Referral bonus',
          timestamp: '2024-01-10T09:15:00Z',
          expiresAt: '2025-01-10T09:15:00Z'
        }
      ]
    };

    return mockPoints;
  }

  // Award points to user
  async awardPoints(userId: string, amount: number, reason: string, orderId?: string): Promise<void> {
    // In real app, this would update database
    console.log(`Awarded ${amount} points to user ${userId} for: ${reason}`);
  }

  // Redeem points for discount
  async redeemPoints(userId: string, pointsToRedeem: number): Promise<{ remainingPoints: number }> {
    const userPoints = await this.getUserLoyaltyPoints(userId);

    if (pointsToRedeem > userPoints.current) {
      throw new Error('Insufficient points');
    }

    // In real app, this would update the database to deduct points
    console.log(`Redeemed ${pointsToRedeem} points for user ${userId}`);

    return {
      remainingPoints: userPoints.current - pointsToRedeem
    };
  }

  // Get available coupons
  async getAvailableCoupons(userId?: string): Promise<Coupon[]> {
    // Filter active coupons that haven't expired
    const now = new Date().toISOString().split('T')[0];
    return mockCoupons.filter(coupon =>
      coupon.isActive &&
      coupon.validFrom <= now &&
      coupon.validUntil >= now &&
      (!coupon.usageLimit || coupon.usedCount < coupon.usageLimit)
    );
  }

  // Validate and apply coupon
  async validateCoupon(code: string, orderTotal: number, userId?: string): Promise<{ valid: boolean; discount: number; coupon?: Coupon; error?: string }> {
    const coupon = mockCoupons.find(c => c.code.toLowerCase() === code.toLowerCase());

    if (!coupon) {
      return { valid: false, discount: 0, error: 'Invalid coupon code' };
    }

    if (!coupon.isActive) {
      return { valid: false, discount: 0, error: 'Coupon is no longer active' };
    }

    const now = new Date().toISOString().split('T')[0];
    if (coupon.validFrom > now || coupon.validUntil < now) {
      return { valid: false, discount: 0, error: 'Coupon has expired' };
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { valid: false, discount: 0, error: 'Coupon usage limit exceeded' };
    }

    if (coupon.minPurchase && orderTotal < coupon.minPurchase) {
      return { valid: false, discount: 0, error: `Minimum purchase of $${coupon.minPurchase} required` };
    }

    let discount = 0;
    switch (coupon.type) {
      case 'percentage':
        discount = (orderTotal * coupon.value) / 100;
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount);
        }
        break;
      case 'fixed':
        discount = Math.min(coupon.value, orderTotal);
        break;
      case 'free_shipping':
        // Shipping discount handled separately
        discount = 0;
        break;
    }

    return { valid: true, discount, coupon };
  }

  // Apply coupon to order
  async applyCoupon(code: string, orderId: string): Promise<void> {
    // In real app, this would update coupon usage count
    console.log(`Applied coupon ${code} to order ${orderId}`);
  }

  // Get referral program for user
  async getReferralProgram(userId: string): Promise<ReferralProgram> {
    // Mock referral data
    return {
      referrerBonus: this.config.referralBonus,
      refereeBonus: this.config.referralBonus,
      maxReferrals: 10,
      referralCode: `REF_${userId.slice(-6).toUpperCase()}`,
      referredUsers: ['user1', 'user2'],
      totalEarnings: 1000
    };
  }

  // Process referral
  async processReferral(referrerId: string, refereeId: string): Promise<void> {
    await this.awardPoints(referrerId, this.config.referralBonus, 'Referral bonus');
    await this.awardPoints(refereeId, this.config.referralBonus, 'Welcome bonus for being referred');
  }

  // Get loyalty configuration
  getConfig(): LoyaltyConfig {
    return this.config;
  }
}

export const loyaltyService = new LoyaltyService();
