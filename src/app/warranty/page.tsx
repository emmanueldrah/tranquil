import { MainLayout } from '@/components/layout/MainLayout';

export default function WarrantyPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Warranty Information</h1>

        <div className="prose prose-lg max-w-none">
          <h2>Manufacturer Warranty</h2>
          <p>
            All products sold on Tranquil come with the manufacturer&apos;s standard warranty.
            Warranty coverage varies by product and manufacturer. Please refer to your
            product&apos;s documentation for specific warranty terms.
          </p>

          <h2>Extended Warranty Options</h2>
          <p>
            We offer extended warranty options for select products. These plans provide
            additional coverage beyond the manufacturer&apos;s warranty period. Contact our
            customer service team for more information about extended warranty options.
          </p>

          <h2>Warranty Claims</h2>
          <p>
            To file a warranty claim, please contact the manufacturer directly using the
            information provided in your product&apos;s documentation. If you purchased your
            product from Tranquil, we can assist you in the claims process.
          </p>

          <h2>What is Covered</h2>
          <ul>
            <li>Manufacturing defects</li>
            <li>Material defects</li>
            <li>Functional failures under normal use</li>
            <li>Parts and labor (as specified by manufacturer)</li>
          </ul>

          <h2>What is Not Covered</h2>
          <ul>
            <li>Normal wear and tear</li>
            <li>Accidental damage</li>
            <li>Misuse or abuse</li>
            <li>Unauthorized modifications</li>
            <li>Damage from natural disasters</li>
          </ul>

          <h2>Contact Information</h2>
          <p>
            For warranty-related questions, please contact our support team at
            warranty@tranquil.com or call 1-800-TRANQUIL.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
