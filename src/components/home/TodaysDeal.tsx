import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '@/data';
import { getFirstValidImage } from '@/utils/imageUtils';

async function TodaysDeal() {
  const products = await getAllProducts();

  // Get a product for today's deal (first on sale product)
  const todaysDeal = products.find(p => p.isOnSale) || products[0];

  return (
    <section className="py-8 bg-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Don't Miss the Chance!</h2>
            <span className="text-sm text-gray-300">Today's Best Deal</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="aspect-square relative max-w-sm mx-auto rounded-lg overflow-hidden">
                <Image
                  src={getFirstValidImage(todaysDeal.images)}
                  alt={todaysDeal.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {todaysDeal.name}
              </h3>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₵{todaysDeal.salePrice?.toFixed(2) || todaysDeal.price.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₵{todaysDeal.price.toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Save ₵{(todaysDeal.price - (todaysDeal.salePrice || 0)).toFixed(2)}
                </span>
              </div>
              <Link
                href={`/products/${todaysDeal.id}`}
                className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { TodaysDeal };
