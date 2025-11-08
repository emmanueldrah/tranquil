import Image from 'next/image';
import Link from 'next/link';
import { getCategoryBySlug } from '@/lib/categories';
import { getAllProducts } from '@/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types/product';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subParam = undefined;
  const [category, allProducts] = await Promise.all([
    getCategoryBySlug(slug),
    getAllProducts(),
  ]);

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-center px-4">
        <div>
          <svg
            className="mx-auto h-12 w-12 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="mt-4 text-xl text-slate-400">Category not found</h1>
          <p className="mt-2 text-slate-500">The category you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/categories"
            className="mt-6 inline-block text-teal-400 hover:text-teal-300"
          >
            Browse all categories
          </Link>
        </div>
      </div>
    );
  }

  const products = allProducts.filter(
    (product) => product.category === category.name
  );

  const subcategory = subParam
    ? category.subcategories.find((sub) => sub.slug === subParam)
    : null;

  const filteredProducts = subcategory
    ? products.filter((product) => product.subcategory === subcategory.name)
    : products;

  // Sort products by popularity (rating * reviews)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
      const scoreA = a.rating.average * a.rating.count;
      const scoreB = b.rating.average * b.rating.count;
    return scoreB - scoreA;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-slate-400 hover:text-teal-400">
                Home
              </Link>
            </li>
            <li>
              <span className="text-slate-500 mx-2">/</span>
              <Link href="/categories" className="text-slate-400 hover:text-teal-400">
                Categories
              </Link>
            </li>
            <li>
              <span className="text-slate-500 mx-2">/</span>
              <Link href={`/categories/${category.slug}`} className="text-slate-400 hover:text-teal-400">
                {category.name}
              </Link>
            </li>
            {subcategory && (
              <li>
                <span className="text-slate-500 mx-2">/</span>
                <span className="text-slate-100">{subcategory.name}</span>
              </li>
            )}
          </ol>
        </nav>

        {/* Category Header */}
        <div className="relative h-80 rounded-xl overflow-hidden mb-12">
          <Image
            src={subcategory?.image || category.image}
            alt={subcategory?.name || category.name}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center px-4">
              {subcategory?.name || category.name}
            </h1>
            <p className="text-lg md:text-xl text-center max-w-2xl px-4">
              {subcategory?.description || category.description}
            </p>
          </div>
        </div>

        {/* Subcategories Navigation */}
        {!subcategory && category.subcategories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">Browse Subcategories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/categories/${category.slug}/${sub.slug}`}
                  className="group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-700">
                    <Image
                      src={sub.image}
                      alt={sub.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-colors" />
                    <div className="absolute inset-0 flex items-end p-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {sub.name}
                        </h3>
                        <p className="text-sm text-white/90 line-clamp-2">
                          {sub.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Products Section */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">
              {subcategory ? `${subcategory.name} Products` : 'All Products'}
            </h2>
            <p className="text-sm text-slate-400">
              {sortedProducts.length} product{sortedProducts.length === 1 ? '' : 's'}
            </p>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-800 rounded-lg shadow-sm">
              <svg
                className="mx-auto h-12 w-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-slate-100">No products found</h3>
              <p className="mt-2 text-slate-400">
                We couldn&apos;t find any products in this category{subcategory ? ' and subcategory' : ''}.
              </p>
              {subcategory && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="mt-6 inline-block text-teal-400 hover:text-teal-300"
                >
                  View all {category.name}
                </Link>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}