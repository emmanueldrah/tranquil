 'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

import { paymentService } from '@/utils/paymentService';
import { PaymentMethod, MobileMoneyProvider } from '@/types/payment';
import { useNotifications } from '@/context/NotificationContext';
import { useAuth } from '@/context/AuthContext';
import CouponInput from '@/components/loyalty/CouponInput';
import LoyaltyPointsCard from '@/components/loyalty/LoyaltyPointsCard';
import { Button } from '@/components/ui/Button';
import { loyaltyService } from '@/utils/loyaltyService';
import { Coupon } from '@/types/loyalty';
import LoadingInline from '@/components/ui/LoadingInline';
import ErrorBanner from '@/components/ui/ErrorBanner';
import { getFirstValidImage } from '@/utils/imageUtils';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation' | 'processing';

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const { items, clearCart } = useCart();
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  const [isGuest, setIsGuest] = useState<boolean>(!user);
  const [isProcessing, setIsProcessing] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | undefined>();
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const [formData, setFormData] = useState({
    // Shipping Info
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    // Order notes / special instructions
    orderNotes: '',
    // Payment Info
    paymentMethod: '',
    mobileMoneyNumber: '',
    mobileMoneyProvider: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    bankName: '',
    accountNumber: '',
    accountName: '',
  });

  // Load product details for each cart item (getProductById is async)
  const [cartItemsResolved, setCartItemsResolved] = useState(
    items.map((it) => ({ ...it, product: undefined as unknown as any }))
  );
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [cartLoadError, setCartLoadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoadingCart(true);
        setCartLoadError(null);
        const enriched = await Promise.all(
          items.map(async (item) => {
            const response = await fetch(`/api/products/${item.productId}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch product ${item.productId}`);
            }
            const product = await response.json();
            return {
              ...item,
              product,
            };
          })
        );
        if (mounted) setCartItemsResolved(enriched as any);
      } catch (err) {
        console.error('Error loading cart products in checkout', err);
        if (mounted) setCartLoadError('Failed to load cart products');
      } finally {
        if (mounted) setIsLoadingCart(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [items]);

  const subtotal = cartItemsResolved.reduce((total, item) => {
    const product = item.product as any;
    const price = product?.isOnSale ? (product.salePrice || 0) : (product?.price || 0);
    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 50;

  // Calculate discounts
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = (subtotal * appliedCoupon.value) / 100;
      if (appliedCoupon.maxDiscount) {
        discount = Math.min(discount, appliedCoupon.maxDiscount);
      }
    } else if (appliedCoupon.type === 'fixed') {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  // Points discount (1 point = $0.01)
  const pointsDiscount = pointsToRedeem * 0.01;
  const totalDiscount = discount + pointsDiscount;

  const total = subtotal + shipping - totalDiscount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      setIsProcessing(true);
      setStep('processing');

      try {
        const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        let paymentResult;

        switch (formData.paymentMethod) {
          case 'mobileMoney':
            paymentResult = await paymentService.processMobileMoneyPayment(
              total,
              'GHS',
              formData.mobileMoneyProvider as MobileMoneyProvider,
              formData.mobileMoneyNumber,
              orderId,
              formData.fullName,
              formData.email
            );
            break;

          case 'card':
            paymentResult = await paymentService.processCardPayment(
              {
                number: formData.cardNumber,
                expiryMonth: formData.cardExpiry.split('/')[0],
                expiryYear: formData.cardExpiry.split('/')[1],
                cvc: formData.cardCvc,
                holderName: formData.fullName,
              },
              total,
              'GHS',
              orderId,
              formData.fullName,
              formData.email
            );
            break;

          case 'bank_transfer':
            paymentResult = await paymentService.initiateBankTransfer(
              {
                bankName: formData.bankName,
                accountNumber: formData.accountNumber,
                accountName: formData.accountName,
              },
              total,
              'GHS',
              orderId,
              formData.fullName,
              formData.email
            );
            break;

          case 'paystack':
            paymentResult = await paymentService.processPaystackPayment(
              total,
              'GHS',
              orderId,
              formData.fullName,
              formData.email
            );
            break;

          case 'cash':
            // Cash on delivery - no payment processing needed
            paymentResult = { success: true };
            break;

          default:
            throw new Error('Invalid payment method');
        }

        if (paymentResult.success) {
          // Persist order locally (MVP) including order notes so order history includes special instructions
          try {
            const order = {
              id: orderId,
              items: cartItemsResolved.map((it) => ({
                productId: it.productId,
                name: it.product?.name,
                quantity: it.quantity,
                unitPrice: it.product?.isOnSale ? (it.product.salePrice || 0) : (it.product?.price || 0),
              })),
              subtotal,
              shipping,
              discount: totalDiscount,
              total,
              notes: formData.orderNotes,
              customer: {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                region: formData.region,
              },
              createdAt: new Date().toISOString(),
              status: 'confirmed',
            };

            const existing = JSON.parse(localStorage.getItem('orders') || '[]');
            existing.push(order);
            localStorage.setItem('orders', JSON.stringify(existing));
          } catch (err) {
            console.error('Error saving order to localStorage:', err);
          }

          addNotification({
            userId: user?.id ?? formData.email ?? 'guest',
            type: 'success',
            title: 'Payment Successful',
            message: 'Your order has been placed successfully!',
            isRead: false,
          });

          clearCart();
          setStep('confirmation');
        } else {
          addNotification({
            userId: user?.id ?? formData.email ?? 'guest',
            type: 'system',
            title: 'Payment Failed',
            message: paymentResult.error || 'Payment processing failed. Please try again.',
            isRead: false,
          });

          setStep('payment');
        }
      } catch (error) {
        console.error('Payment error:', error);
        addNotification({
          userId: user?.id ?? formData.email ?? 'guest',
          type: 'system',
          title: 'Payment Error',
          message: 'An unexpected error occurred. Please try again.',
          isRead: false,
        });

        setStep('payment');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. We&apos;ll send you a confirmation email shortly.
            </p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
              <div className="mt-4 flex items-center">
                <div
                  className={`h-1 flex-1 ${
                    step === 'shipping' ? 'bg-teal-600' : 'bg-gray-200'
                  }`}
                />
                <div
                  className={`h-1 flex-1 ${
                    step === 'payment' ? 'bg-teal-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 'shipping' && (
                <div className="space-y-6">
                  {!user && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isGuest}
                          onChange={(e) => setIsGuest(e.target.checked)}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                        />
                        <span className="text-sm text-gray-700">Checkout as guest</span>
                      </label>
                      <Link href="/login" className="text-sm text-teal-600 hover:underline">
                        Sign in to save details
                      </Link>
                    </div>
                  )}
                  {!user && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isGuest}
                          onChange={(e) => setIsGuest(e.target.checked)}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                        />
                        <span className="text-sm text-gray-700">Checkout as guest</span>
                      </label>
                      <Link href="/login" className="text-sm text-teal-600 hover:underline">
                        Sign in to save details
                      </Link>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-teal-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Region
                      </label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        required
                        value={formData.region}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700">
                      Order Notes (optional)
                    </label>
                    <textarea
                      name="orderNotes"
                      id="orderNotes"
                      value={formData.orderNotes}
                      onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                      placeholder="Any delivery instructions or special requests"
                    />
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mobileMoney"
                          checked={formData.paymentMethod === 'mobileMoney'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                        />
                        <span className="ml-3">Mobile Money</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                        />
                        <span className="ml-3">Card Payment</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank_transfer"
                          checked={formData.paymentMethod === 'bank_transfer'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                        />
                        <span className="ml-3">Bank Transfer</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paystack"
                          checked={formData.paymentMethod === 'paystack'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                        />
                        <span className="ml-3">Paystack</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                        />
                        <span className="ml-3">Cash on Delivery</span>
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'mobileMoney' && (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="mobileMoneyProvider"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Provider
                        </label>
                        <select
                          name="mobileMoneyProvider"
                          id="mobileMoneyProvider"
                          required
                          value={formData.mobileMoneyProvider}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                        >
                          <option value="">Select Provider</option>
                          <option value="mtn">MTN Mobile Money</option>
                          <option value="vodafone">Vodafone Cash</option>
                          <option value="airteltigo">AirtelTigo Money</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="mobileMoneyNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mobile Money Number
                        </label>
                        <input
                          type="tel"
                          name="mobileMoneyNumber"
                          id="mobileMoneyNumber"
                          required
                          value={formData.mobileMoneyNumber}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          id="cardNumber"
                          required
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="cardExpiry"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            id="cardExpiry"
                            placeholder="MM/YY"
                            required
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="cardCvc"
                            className="block text-sm font-medium text-gray-700"
                          >
                            CVC
                          </label>
                          <input
                            type="text"
                            name="cardCvc"
                            id="cardCvc"
                            required
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step === 'payment' && (
                  <Button
                    type="button"
                    onClick={() => setStep('shipping')}
                    variant="ghost"
                    className="bg-gray-100 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-teal-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-teal-700 transition-colors ml-auto"
                >
                  {step === 'shipping' ? 'Continue to Payment' : 'Place Order'}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-gray-50 rounded-lg px-6 py-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="divide-y divide-gray-200">
                    {isLoadingCart ? (
                      <LoadingInline message="Loading cart items..." />
                    ) : cartLoadError ? (
                      <ErrorBanner message={cartLoadError} />
                    ) : (
                      cartItemsResolved.map((item) => {
                        const product = item.product;
                        if (!product) return null;

                        return (
                    <div key={item.productId} className="py-4 flex items-center">
                      <div className="flex-shrink-0 w-20 h-20 relative rounded overflow-hidden">
                        <Image
                          src={getFirstValidImage(product.images)}
                          alt={product.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ₵
                          {(
                            (product.isOnSale
                              ? product.salePrice || 0
                              : product.price) * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
          );
        }))}
              </div>

              {/* Loyalty and Coupon Section */}
              {user && (
                <div className="mt-6 space-y-4">
                  <CouponInput
                    orderTotal={subtotal}
                    onCouponApplied={(discount, coupon) => setAppliedCoupon(coupon)}
                    onCouponRemoved={() => setAppliedCoupon(undefined)}
                    appliedCoupon={appliedCoupon}
                  />
                  <LoyaltyPointsCard
                    userId={user.id}
                    onPointsRedeemed={(points) => setPointsToRedeem(points)}
                  />
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    ₵{subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">
                    {shipping === 0 ? 'Free' : `₵${shipping.toFixed(2)}`}
                  </p>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-green-600">Discount</p>
                    <p className="text-sm font-medium text-green-600">
                      -₵{totalDiscount.toFixed(2)}
                    </p>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-base font-medium text-gray-900">
                      ₵{total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}