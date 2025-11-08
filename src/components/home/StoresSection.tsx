import Link from 'next/link';

function StoresSection() {
  const stores = [
    { name: 'Eden Satellite Service', products: 0, phone: '' },
    { name: 'Deaa', products: 0, phone: '' },
    { name: 'A-GEE CLASSIC FOOTWEARS', products: 0, phone: '' },
    { name: '0242571795', products: 0, phone: '0242571795' },
    { name: 'Thella\'s cosmetic hub', products: 0, phone: '' },
    { name: 'Vintage Technologies', products: 0, phone: '' },
    { name: 'Delorm\'s shop', products: 0, phone: '' },
  ];

  return (
    <section className="py-8 bg-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">More stores</h2>
          <Link href="/stores" className="text-teal-400 hover:underline">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{store.name}</h3>
                  <p className="text-sm text-gray-500">{store.products} Products</p>
                </div>
                {store.phone && (
                  <span className="text-sm text-blue-600 font-medium">{store.phone}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { StoresSection };
