import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="relative bg-blue-600">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-white text-center py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Tranquil Enterprise</h1>
        <p className="text-xl md:text-2xl mb-8">Your One-Stop Shop for Quality Appliances &amp; Electronics</p>
        <Link
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          href="/categories/home-appliances"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
