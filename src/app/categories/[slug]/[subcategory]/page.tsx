import Image from 'next/image';
import { getCategoryBySlug } from '@/data';
import { ProductCard } from '@/components/ProductCard';
import { getAllProducts } from '@/data';

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ slug: string; subcategory: string }>;
}) {
  const { slug, subcategory: subcategorySlug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Category not found</p>
      </div>
    );
  }

  const subcategory = category.subcategories.find(
    (sub) => sub.slug === subcategorySlug
  );
  if (!subcategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Subcategory not found</p>
      </div>
    );
  }

  const allProducts = getAllProducts();
  const products = allProducts.filter(
    (product) =>
      product.category === category.name &&
      product.subcategory === subcategory.name
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subcategory Header */}
        <div className="relative h-64 rounded-xl overflow-hidden mb-8">
          <Image
            src={subcategory.image}
            alt={subcategory.name}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <div className="text-center">
              <p className="text-lg mb-2">{category.name}</p>
              <h1 className="text-4xl font-bold mb-2">{subcategory.name}</h1>
              <p className="text-lg">{subcategory.description}</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}