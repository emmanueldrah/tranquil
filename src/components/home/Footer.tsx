import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Hotline */}
          <div>
            <h3 className="text-lg font-bold mb-4">Hotline</h3>
            <p className="text-2xl font-bold text-blue-400">0593030913</p>
          </div>

          {/* Ghana */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ghana</h3>
            <p className="text-gray-300">info@sntradehub.com</p>
          </div>

          {/* Accounts */}
          <div>
            <h3 className="text-lg font-bold mb-4">Accounts</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register" className="text-gray-300 hover:text-white transition-colors">
                  Open Your Store
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  Featured Products
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-gray-300 hover:text-white transition-colors">
                  Top Stores
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  Latest Products
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Other Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About Company
            </Link>
            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/refund" className="text-gray-300 hover:text-white transition-colors">
              Refund policy
            </Link>
            <Link href="/returns" className="text-gray-300 hover:text-white transition-colors">
              Return policy
            </Link>
            <Link href="/cancellation" className="text-gray-300 hover:text-white transition-colors">
              Cancellation policy
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">&copy; 2024 SN Trade Hub. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">Free Shipping</span>
              <span className="text-gray-400">Free Shipping on all Order Above $560</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
