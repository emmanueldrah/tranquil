import { MainLayout } from '@/components/layout/MainLayout';

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you&apos;ll receive an email with a tracking number. You can use this number to track your package on our website or the carrier&apos;s website."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Items must be in their original condition and packaging. Please contact our customer service team to initiate a return."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates vary by location and are calculated at checkout."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the US. Express shipping delivers within 1-2 business days. International shipping takes 7-14 business days."
    },
    {
      question: "Can I change or cancel my order?",
      answer: "Orders can be changed or cancelled within 2 hours of placement. Please contact our customer service team immediately if you need to make changes."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted."
    },
    {
      question: "Do you offer warranties?",
      answer: "All products come with the manufacturer&apos;s standard warranty. We also offer extended warranty options for select products."
    },
    {
      question: "How do I contact customer service?",
      answer: "You can reach our customer service team at support@tranquil.com or by calling 1-800-TRANQUIL. We're available Monday through Friday, 9 AM to 6 PM EST."
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-4">
            Can&apos;t find the answer you&apos;re looking for? Our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:support@tranquil.com"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
            >
              Email Support
            </a>
            <a
              href="tel:1-800-TRANQUIL"
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors text-center"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
