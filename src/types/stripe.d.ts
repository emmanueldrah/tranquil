import { Stripe } from '@stripe/stripe-js';

declare global {
  type StripeInstance = Stripe;
}