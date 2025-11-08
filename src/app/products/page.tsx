import { ProductCard } from '@/components/ProductCard';
import { getAllProducts } from '@/data';

export default async function ProductsPage() {
  const products = await getAllProducts();
  const categories = ['All', 'Electronics', 'Home Goods', 'Apparel', 'Books'];

  return (
    <div className="bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 font-serif">Shop Our Collection</h1>
          <p className="mt-4 text-xl text-slate-600">Browse our curated selection of quality products.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-200 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 border-b border-stone-200 pb-4 mb-6">Category</h3>
                <div className="space-y-4">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center text-lg text-slate-700 hover:text-slate-900 cursor-pointer">
                      <input type="radio" name="category" className="h-4 w-4 text-slate-800 border-stone-300 focus:ring-slate-900" />
                      <span className="ml-3">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-lg text-slate-600">Showing {products.length} products</p>
              <select className="rounded-md border-stone-300 bg-white text-slate-700 py-3 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900">
                <option>Sort by Latest</option>
                <option>Sort by Price: Low to High</option>
                <option>Sort by Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
