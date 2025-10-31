import { ProductCard } from '@/components/ProductCard';
import { getAllProducts } from '@/data';

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                    <span className="ml-2 text-sm text-gray-600">Under ₵1000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                    <span className="ml-2 text-sm text-gray-600">₵1000 - ₵5000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                    <span className="ml-2 text-sm text-gray-600">Over ₵5000</span>
                  </label>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                      <span className="ml-2 text-sm text-gray-600">
                        {rating}+ Stars
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                    <span className="ml-2 text-sm text-gray-600">In Stock</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                    <span className="ml-2 text-sm text-gray-600">On Sale</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
              <select className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option>Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}