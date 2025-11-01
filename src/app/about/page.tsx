import { MainLayout } from '@/components/layout/MainLayout';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About Tranquil</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Welcome to Tranquil, your one-stop destination for quality products that enhance your lifestyle.
            We&apos;re committed to providing exceptional value, outstanding customer service, and a seamless shopping experience.
          </p>

          <h2>Our Story</h2>
          <p>
            Founded in 2020, Tranquil began with a simple mission: to make high-quality products accessible
            to everyone. We believe that everyone deserves access to products that improve their daily lives,
            whether it&apos;s the latest technology, home essentials, or lifestyle items.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to create a shopping experience that is transparent, trustworthy, and enjoyable.
            We carefully curate our product selection to ensure that every item meets our high standards
            for quality, value, and customer satisfaction.
          </p>

          <h2>What Sets Us Apart</h2>
          <ul>
            <li><strong>Quality Assurance:</strong> Every product is thoroughly tested and vetted before it reaches our shelves.</li>
            <li><strong>Competitive Pricing:</strong> We work directly with manufacturers to offer the best possible prices.</li>
            <li><strong>Fast Shipping:</strong> Quick and reliable delivery to get your orders to you as soon as possible.</li>
            <li><strong>Customer Support:</strong> Our dedicated team is always ready to help with any questions or concerns.</li>
            <li><strong>Sustainability:</strong> We&apos;re committed to environmentally responsible practices and eco-friendly products.</li>
          </ul>

          <h2>Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Customer First</h3>
              <p className="text-blue-800">
                Your satisfaction is our top priority. We listen to your feedback and continuously
                improve our services to better serve you.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Integrity</h3>
              <p className="text-green-800">
                We believe in honest business practices, transparent pricing, and building
                long-term relationships with our customers.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Innovation</h3>
              <p className="text-purple-800">
                We stay ahead of trends and embrace new technologies to provide you with
                the latest and greatest products.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">Community</h3>
              <p className="text-orange-800">
                We're proud to be part of the communities we serve and actively contribute
                to making our world a better place.
              </p>
            </div>
          </div>

          <h2>Contact Us</h2>
          <p>
            We&apos;d love to hear from you! Whether you have questions about our products,
            need help with an order, or just want to share your feedback, our team is here for you.
          </p>
          <p>
            Email: info@tranquil.com<br />
            Phone: 1-800-TRANQUIL<br />
            Address: 123 Commerce Street, Suite 100, Tranquil City, TC 12345
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
