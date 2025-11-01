import { ProductCard } from '@/components/product/ProductCard';

interface FeaturedProductsProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }>;
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Check out our most popular items handpicked for you
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}