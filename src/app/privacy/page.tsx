import { MainLayout } from '@/components/layout/MainLayout';

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account,
            make a purchase, or contact us for support. This may include your name, email address,
            shipping address, payment information, and any other information you choose to provide.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Provide customer service and support</li>
            <li>Send you important updates about your orders</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and maintain security</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties
            without your consent, except as described in this policy. We may share your information
            with trusted third parties who assist us in operating our website, conducting our business,
            or servicing you, as long as those parties agree to keep this information confidential.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of
            transmission over the internet is 100% secure.
          </p>

          <h2>5. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing experience, analyze
            website traffic, and personalize content. You can control cookie settings through your
            browser preferences.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. You may also
            opt out of marketing communications at any time. To exercise these rights, please contact
            us using the information provided below.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the
            privacy practices or content of these external sites. We encourage you to review the
            privacy policies of any third-party websites you visit.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect personal
            information from children under 13. If we become aware that we have collected personal
            information from a child under 13, we will take steps to delete such information.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            By posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at
            privacy@tranquil.com or call 1-800-TRANQUIL.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
