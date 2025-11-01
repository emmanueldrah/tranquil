import { getAllProducts } from '@/data';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

export async function FeaturedProducts() {
  const allProducts = await getAllProducts();

  // Select featured products (in this case, highest rated and in stock)
  const featured = allProducts
    .filter(product => product.rating.average >= 4.3 && product.stock > 0)
    .sort((a, b) => b.rating.average - a.rating.average)
    .slice(0, 4);

  if (featured.length === 0) {
    return (
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Featured</span> Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most loved products, carefully selected for quality and performance
            </p>
          </div>
          <p className="text-gray-500 text-center text-lg">No featured products available at the moment</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Featured</span> Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved products, carefully selected for quality and performance
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
