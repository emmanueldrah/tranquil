import { ProductCard } from '@/components/product/ProductCard';
import Card from '@/components/ui/Card';
import Grid from '@/components/ui/Grid';

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
    <section className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient">Featured Products</h2>
          <p className="mt-4 text-lg text-[rgba(230,240,255,0.75)]">Check out our most popular items, handpicked for you.</p>
        </div>

        <div className="mt-12">
          <Grid cols={3} gap="gap-6" className="sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} title={product.name} className="!p-0">
                <ProductCard product={product} />
              </Card>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
}
