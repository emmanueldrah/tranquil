import Image from 'next/image';
import Link from 'next/link';
import { getAllCategories } from '@/data';

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group">
              {/* Main Category */}
              <Link href={`/categories/${category.slug}`}>
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  </div>
                </div>
              </Link>

              {/* Subcategories */}
              <div className="grid grid-cols-2 gap-4">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={`/categories/${category.slug}/${subcategory.slug}`}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={subcategory.image}
                        alt={subcategory.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h3 className="text-lg font-semibold text-white text-center">
                          {subcategory.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Category Description */}
              <div className="mt-4">
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}