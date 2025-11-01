import { MainLayout } from '@/components/layout/MainLayout';

export default function ShippingPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Information</h1>

        <div className="prose prose-lg max-w-none">
          <h2>Shipping Options</h2>
          <p>
            We offer several shipping options to ensure your order arrives quickly and safely.
            Standard shipping typically takes 3-5 business days, while express shipping
            delivers within 1-2 business days.
          </p>

          <h2>Shipping Rates</h2>
          <ul>
            <li>Standard Shipping: $5.99 (Free on orders over $50)</li>
            <li>Express Shipping: $12.99</li>
            <li>Overnight Shipping: $24.99</li>
          </ul>

          <h2>International Shipping</h2>
          <p>
            We ship to most countries worldwide. International shipping rates vary by location
            and are calculated at checkout. Delivery times for international orders typically
            range from 7-14 business days.
          </p>

          <h2>Order Tracking</h2>
          <p>
            Once your order ships, you'll receive a tracking number via email. You can use
            this number to track your package on our website or the carrier's website.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about shipping, please contact our customer service team
            at support@tranquil.com or call us at 1-800-TRANQUIL.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
