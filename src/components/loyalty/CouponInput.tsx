'use client';

import { useState } from 'react';
import { Coupon } from '@/types/loyalty';
import { loyaltyService } from '@/utils/loyaltyService';
import { Button } from '@/components/ui/Button';

interface CouponInputProps {
  orderTotal: number;
  onCouponApplied: (discount: number, coupon: Coupon) => void;
  onCouponRemoved: () => void;
  appliedCoupon?: Coupon;
}

export default function CouponInput({
  orderTotal,
  onCouponApplied,
  onCouponRemoved,
  appliedCoupon
}: CouponInputProps) {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await loyaltyService.validateCoupon(couponCode.trim(), orderTotal);

      if (result.valid && result.coupon) {
        onCouponApplied(result.discount, result.coupon);
        setCouponCode('');
      } else {
        setError(result.error || 'Invalid coupon code');
      }
    } catch (err) {
      setError('Failed to validate coupon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    onCouponRemoved();
    setCouponCode('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyCoupon();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Have a coupon?</h3>

      {appliedCoupon ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-green-800">
                  {appliedCoupon.code} applied!
                </p>
                <p className="text-sm text-green-600">
                  {appliedCoupon.description}
                </p>
              </div>
            </div>
            <Button type="button" variant="ghost" onClick={handleRemoveCoupon} className="text-green-600 hover:text-green-800 text-sm font-medium p-0">Remove</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />
            <Button
              type="button"
              onClick={handleApplyCoupon}
              disabled={loading || !couponCode.trim()}
              variant="primary"
              className="px-4 py-2"
            >
              {loading ? 'Applying...' : 'Apply'}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </div>
      )}

      <div className="mt-3 text-sm text-gray-600">
        <p className="mb-1">Available coupons:</p>
          <div className="flex flex-wrap gap-2">
          <Button type="button" variant="ghost" onClick={() => setCouponCode('WELCOME10')} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors">WELCOME10</Button>
          <Button type="button" variant="ghost" onClick={() => setCouponCode('FREESHIP')} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors">FREESHIP</Button>
          <Button type="button" variant="ghost" onClick={() => setCouponCode('FLASH20')} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors">FLASH20</Button>
        </div>
      </div>
    </div>
  );
}
