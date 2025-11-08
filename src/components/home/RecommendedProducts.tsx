import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '@/data';
import { getFirstValidImage } from '@/utils/imageUtils';

async function RecommendedProducts() {
  const products = await getAllProducts();

  // Get top 8 products as recommended
  const recommendedProducts = products.slice(0, 8);

  return (
    <section className="py-8 bg-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recommended For You</h2>
          <Link href="/products" className="text-teal-400 hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group block">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={getFirstValidImage(product.images)}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  {product.isOnSale && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      -{Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)}%
                    </div>
                  )}
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    {product.isOnSale ? (
                      <>
                        <span className="text-lg font-bold text-gray-900">
                          ₵{product.salePrice?.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₵{product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ₵{product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export { RecommendedProducts };
