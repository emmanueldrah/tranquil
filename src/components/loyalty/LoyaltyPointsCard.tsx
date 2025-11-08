'use client';

import { useState, useEffect } from 'react';
import { LoyaltyPoints } from '@/types/loyalty';
import { Button } from '@/components/ui/Button';
import { loyaltyService } from '@/utils/loyaltyService';

interface LoyaltyPointsCardProps {
  userId: string;
  onPointsRedeemed?: (points: number) => void;
}

export default function LoyaltyPointsCard({ userId, onPointsRedeemed }: LoyaltyPointsCardProps) {
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [redeemAmount, setRedeemAmount] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);

  useEffect(() => {
    const fetchLoyaltyData = async () => {
      try {
        const data = await loyaltyService.getUserLoyaltyPoints(userId);
        setLoyaltyData(data);
      } catch (error) {
        console.error('Failed to fetch loyalty data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoyaltyData();
  }, [userId]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="animate-pulse">
          <div className="h-4 bg-purple-200 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-purple-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-purple-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (!loyaltyData) {
    return null;
  }

  const progressToNextTier = loyaltyData.tier.maxPoints === Infinity
    ? 100
    : ((loyaltyData.current - loyaltyData.tier.minPoints) / (loyaltyData.tier.maxPoints - loyaltyData.tier.minPoints)) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Loyalty Points</h3>
        <div
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{ backgroundColor: loyaltyData.tier.color + '20', color: loyaltyData.tier.color }}
        >
          {loyaltyData.tier.name}
        </div>
      </div>

      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {loyaltyData.current.toLocaleString()}
        </div>
        <p className="text-sm text-gray-600">Available Points</p>
      </div>

      {loyaltyData.tier.maxPoints !== Infinity && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress to {loyaltyData.tier.level === 'bronze' ? 'Silver' : loyaltyData.tier.level === 'silver' ? 'Gold' : 'Platinum'}</span>
            <span>{loyaltyData.current}/{loyaltyData.tier.maxPoints}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(progressToNextTier, 100)}%`,
                backgroundColor: loyaltyData.tier.color
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Total Earned</p>
          <p className="font-semibold text-gray-900">{loyaltyData.totalEarned.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600">Total Spent</p>
          <p className="font-semibold text-gray-900">{loyaltyData.totalSpent.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-purple-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Redeem Points</h4>
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            value={redeemAmount}
            onChange={(e) => setRedeemAmount(e.target.value)}
            placeholder="Points to redeem"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            min="0"
            max={loyaltyData.current}
          />
          <Button
            type="button"
            onClick={async () => {
              const points = parseInt(redeemAmount);
              if (points > 0 && points <= loyaltyData.current) {
                setIsRedeeming(true);
                try {
                  await loyaltyService.redeemPoints(userId, points);
                  onPointsRedeemed?.(points);
                  setRedeemAmount('');
                  // Refresh loyalty data
                  const data = await loyaltyService.getUserLoyaltyPoints(userId);
                  setLoyaltyData(data);
                } catch (error) {
                  console.error('Failed to redeem points:', error);
                } finally {
                  setIsRedeeming(false);
                }
              }
            }}
            disabled={isRedeeming || !redeemAmount || parseInt(redeemAmount) <= 0 || parseInt(redeemAmount) > loyaltyData.current}
            variant="primary"
            className="px-4 py-2 text-sm"
          >
            {isRedeeming ? 'Redeeming...' : 'Redeem'}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          1 point = ₵0.01 discount. Maximum redeemable: {loyaltyData.current} points
        </p>

        <h4 className="text-sm font-medium text-gray-900 mb-2">Your Benefits</h4>
        <ul className="space-y-1">
          {loyaltyData.tier.benefits.map((benefit) => (
            <li key={benefit.id} className="text-sm text-gray-600 flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {benefit.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
