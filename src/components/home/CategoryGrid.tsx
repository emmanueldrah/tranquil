import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories } from '@/data';

async function CategoryGrid() {
  const categories = await getAllCategories();

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group block"
            >
              <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={category.image || '/images/placeholder.jpg'}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">{category.subcategories?.length || 0} Subcategories</p>
              </div>
            </Link>
          ))}
          <Link href="/categories" className="group block">
            <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors h-full flex items-center justify-center">
              <span className="text-gray-600 font-medium">View all</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export { CategoryGrid };
