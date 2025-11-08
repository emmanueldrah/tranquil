export type PaymentMethod =
  | 'mobile_money'
  | 'card'
  | 'bank_transfer'
  | 'paypal'
  | 'paystack'
  | 'cash';

export type MobileMoneyProvider = 'mtn' | 'vodafone' | 'airteltigo';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export interface PaymentData {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  provider?: string; // For mobile money providers
  transactionId?: string;
  externalTransactionId?: string; // Provider&apos;s transaction ID
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  refundedAt?: string;
  refundAmount?: number;
  failureReason?: string;
}

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
}

export interface MobileMoneyPaymentData {
  provider: MobileMoneyProvider;
  phoneNumber: string;
  accountName?: string;
}

export interface CardPaymentData {
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  holderName: string;
}

export interface BankTransferData {
  bankName: string;
  accountNumber: string;
  accountName: string;
  reference?: string;
}

export interface PayPalPaymentData {
  email?: string;
  payerId?: string;
}

export interface PaymentConfig {
  stripe?: {
    publishableKey: string;
    secretKey: string;
  };
  paystack?: {
    publicKey: string;
    secretKey: string;
  };
  paypal?: {
    clientId: string;
    clientSecret: string;
  };
  mobileMoney?: {
    mtn: {
      apiKey: string;
      apiSecret: string;
    };
    vodafone: {
      apiKey: string;
      apiSecret: string;
    };
    airteltigo: {
      apiKey: string;
      apiSecret: string;
    };
  };
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  transactionId?: string;
  error?: string;
  redirectUrl?: string;
  requiresAction?: boolean;
  clientSecret?: string;
}
