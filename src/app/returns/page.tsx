import { MainLayout } from '@/components/layout/MainLayout';

export default function ReturnsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns Policy</h1>

        <div className="prose prose-lg max-w-none">
          <h2>Return Window</h2>
          <p>
            We want you to be completely satisfied with your purchase. If you're not happy
            with your order, you can return most items within 30 days of delivery for a
            full refund or exchange.
          </p>

          <h2>Eligibility</h2>
          <ul>
            <li>Items must be in their original condition and packaging</li>
            <li>Items must not have been used or worn</li>
            <li>Original tags and labels must be attached</li>
            <li>Return authorization required for all returns</li>
          </ul>

          <h2>How to Return</h2>
          <ol>
            <li>Contact our customer service team to initiate a return</li>
            <li>Receive a return authorization number</li>
            <li>Package the item securely with all original materials</li>
            <li>Ship the package using the provided return label</li>
            <li>Refunds are processed within 5-7 business days after receipt</li>
          </ol>

          <h2>Non-Returnable Items</h2>
          <ul>
            <li>Personal care items</li>
            <li>Custom or personalized products</li>
            <li>Items damaged due to misuse</li>
            <li>Items purchased during clearance sales</li>
          </ul>

          <h2>Refunds</h2>
          <p>
            Refunds are issued to the original payment method. Shipping charges are
            non-refundable unless the return is due to our error.
          </p>

          <h2>Contact Us</h2>
          <p>
            For questions about returns, please email returns@tranquil.com or call
            1-800-TRANQUIL.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
