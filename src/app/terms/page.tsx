import { MainLayout } from '@/components/layout/MainLayout';

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Tranquil ("the Service"), you accept and agree to be bound by
            the terms and provision of this agreement. If you do not agree to abide by the above,
            please do not use this service.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Tranquil's
            website for personal, non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display</li>
            <li>attempt to decompile or reverse engineer any software contained on the website</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate,
            complete, and current at all times. You are responsible for safeguarding the password
            and for all activities that occur under your account.
          </p>

          <h2>4. Orders and Payment</h2>
          <p>
            All orders are subject to acceptance and availability. Prices are subject to change
            without notice. Payment must be received in full before order processing begins.
            We accept major credit cards and other payment methods as indicated on our website.
          </p>

          <h2>5. Shipping and Delivery</h2>
          <p>
            We will make reasonable efforts to deliver goods within the estimated timescales,
            however, delivery dates are estimates only. We are not liable for delays caused
            by factors beyond our control.
          </p>

          <h2>6. Returns and Refunds</h2>
          <p>
            Items may be returned within 30 days of purchase for a full refund, provided they
            are in their original condition and packaging. Return shipping costs may apply.
            Refunds will be processed within 5-7 business days after receipt of returned items.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall Tranquil or its suppliers be liable for any damages (including,
            without limitation, damages for loss of data or profit, or due to business interruption)
            arising out of the use or inability to use the materials on our website.
          </p>

          <h2>8. Privacy Policy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which also governs
            your use of the Service, to understand our practices.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws
            of the jurisdiction in which Tranquil operates, and you irrevocably submit to the
            exclusive jurisdiction of the courts in that state or location.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any
            time. If a revision is material, we will try to provide at least 30 days notice prior
            to any new terms taking effect.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at
            legal@tranquil.com or call 1-800-TRANQUIL.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
