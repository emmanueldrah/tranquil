import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Tranquil Enterprise
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your One-Stop Shop for Home Appliances, Electronics, Fashion, Beauty & Wellness
          </p>
          <p className="text-gray-600">
            Contact us: 0247572364
          </p>
        </div>

        {/* Featured Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Home Appliances', 'Electronics', 'Fashion', 'Beauty & Wellness'].map((category) => (
              <div key={category} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-gray-900">{category}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-100 rounded-md mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Coming Soon</h3>
                <p className="text-gray-500">Product details will be available soon</p>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Sales Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Flash Sales Coming Soon!</h2>
            <p className="mb-4">Get ready for amazing deals and discounts.</p>
            <div className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold">
              Stay Tuned
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
