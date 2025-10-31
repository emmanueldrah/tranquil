import Image from 'next/image';
import Link from 'next/link';
import { getCategoryBySlug } from '@/data';
import { ProductCard } from '@/components/ProductCard';
import { getAllProducts } from '@/data';

export default function CategoryPage({
  params,
}: {
  params: { slug: string; subcategory?: string };
}) {
  const category = getCategoryBySlug(params.slug);
  const allProducts = getAllProducts();
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Category not found</p>
      </div>
    );
  }

  const products = allProducts.filter(
    (product) => product.category === category.name
  );

  const subcategory = params.subcategory
    ? category.subcategories.find((sub) => sub.slug === params.subcategory)
    : null;

  const filteredProducts = subcategory
    ? products.filter((product) => product.subcategory === subcategory.name)
    : products;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="relative h-64 rounded-xl overflow-hidden mb-8">
          <Image
            src={subcategory?.image || category.image}
            alt={subcategory?.name || category.name}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-2">
              {subcategory?.name || category.name}
            </h1>
            <p className="text-lg">
              {subcategory?.description || category.description}
            </p>
          </div>
        </div>

        {/* Subcategories Navigation */}
        {!subcategory && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Browse Subcategories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/categories/${category.slug}/${sub.slug}`}
                  className="block group"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={sub.image}
                      alt={sub.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <h3 className="text-lg font-semibold text-white">
                        {sub.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}