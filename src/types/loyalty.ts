export interface LoyaltyPoints {
  current: number;
  totalEarned: number;
  totalSpent: number;
  tier: LoyaltyTier;
  history: LoyaltyTransaction[];
}

export interface LoyaltyTransaction {
  id: string;
  type: 'earned' | 'spent' | 'expired';
  amount: number;
  reason: string;
  orderId?: string;
  timestamp: string;
  expiresAt?: string;
}

export interface LoyaltyTier {
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  name: string;
  minPoints: number;
  maxPoints: number;
  benefits: LoyaltyBenefit[];
  color: string;
}

export interface LoyaltyBenefit {
  id: string;
  type: 'discount' | 'free_shipping' | 'priority_support' | 'bonus_points';
  description: string;
  value: number; // percentage for discount, points multiplier, etc.
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  applicableCategories?: string[];
  applicableProducts?: string[];
  isActive: boolean;
  description: string;
  terms?: string;
}

export interface ReferralProgram {
  referrerBonus: number;
  refereeBonus: number;
  maxReferrals?: number;
  referralCode: string;
  referredUsers: string[];
  totalEarnings: number;
}

export interface LoyaltyConfig {
  pointsPerDollar: number;
  pointsExpiryMonths: number;
  tiers: LoyaltyTier[];
  referralBonus: number;
  birthdayBonus: number;
  reviewBonus: number;
}
