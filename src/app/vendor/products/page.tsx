 'use client';

import React, { useEffect, useState } from 'react';
import LoadingInline from '@/components/ui/LoadingInline';
import ErrorBanner from '@/components/ui/ErrorBanner';
import { Button } from '@/components/ui/Button';
import { getAllProducts, addProduct, updateProduct, deleteProduct, getAllVendors } from '@/data';
import { v4 as uuidv4 } from 'uuid';

export default function VendorProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [vendors, setVendors] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({
    name: '',
    price: 0,
    stock: 0,
    vendor: vendors[0]?.id || '',
    category: '',
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const prods = await getAllProducts();
        const vends = await getAllVendors();
        if (mounted) {
          setProducts(prods as any[]);
          setVendors(vends as any[]);
        }
      } catch (err) {
        console.error('Failed to load vendor products', err);
        if (mounted) setLoadError('Failed to load products');
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const refresh = async () => {
    const prods = await getAllProducts();
    setProducts(prods as any[]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      const { id, ...updateData } = { ...editing, ...form };
      updateProduct(id, updateData);
      setEditing(null);
    } else {
      const newProduct = {
        id: `prod_${Date.now()}`,
        name: form.name,
        description: '',
        price: Number(form.price),
        images: [],
        category: form.category,
        stock: Number(form.stock),
        vendor: form.vendor,
        rating: { average: 0, count: 0 },
        reviews: 0,
        createdAt: new Date().toISOString(),
      };
      addProduct(newProduct as any);
    }

    setForm({ name: '', price: 0, stock: 0, vendor: vendors[0]?.id || '', category: '' });
    refresh();
  };

  const handleEdit = (p: any) => {
    setEditing(p);
    setForm({ name: p.name, price: p.price, stock: p.stock, vendor: p.vendor, category: p.category });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    deleteProduct(id);
    refresh();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="text-sm text-gray-500">Manage vendor product listings</p>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <LoadingInline message="Loading products..." />
            ) : loadError ? (
              <ErrorBanner message={loadError} />
            ) : (
              products.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between border-b py-3">
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-gray-500">₵{p.price?.toFixed?.(2) ?? p.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button type="button" variant="ghost" onClick={() => handleEdit(p)} className="text-sm text-teal-600 hover:underline p-0">Edit</Button>
                    <Button type="button" variant="ghost" onClick={() => handleDelete(p.id)} className="text-sm text-red-600 hover:underline p-0">Delete</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Product Editor</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="mt-1 block w-full rounded-md border-gray-300" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} className="mt-1 block w-full rounded-md border-gray-300" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Vendor</label>
              <select value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300">
                {vendors.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>

            <div className="flex items-center space-x-3">
              <Button type="submit" variant="primary" className="px-4 py-2">{editing ? 'Save Changes' : 'Add Product'}</Button>
              {editing && (
                <Button type="button" variant="ghost" className="px-4 py-2 border" onClick={() => { setEditing(null); setForm({ name: '', price: 0, stock: 0, vendor: vendors[0]?.id || '', category: '' }); }}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Import / Export</h3>
          <p className="text-sm text-gray-500">Not implemented: CSV import or bulk upload. Coming soon.</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Inventory</h3>
          <p className="text-sm text-gray-500">Low stock alerts will appear here.</p>
        </div>
      </aside>
    </div>
  );
}
