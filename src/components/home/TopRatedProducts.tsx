import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '@/data';
import { getFirstValidImage } from '@/utils/imageUtils';

async function TopRatedProducts() {
  const products = await getAllProducts();

  // Get top rated products (mock rating for now)
  const topRatedProducts = products
    .filter(p => p.rating.average >= 4.5)
    .slice(0, 8);

  return (
    <section className="py-8 bg-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-6">Top Rated Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topRatedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group block">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={getFirstValidImage(product.images)}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">
                    -{Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)}%
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      ₵{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₵{(product.price * 1.2).toFixed(2)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 ml-1">{product.rating.average.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export { TopRatedProducts };
