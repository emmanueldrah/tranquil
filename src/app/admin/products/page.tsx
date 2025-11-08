'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Search, Plus, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { getFirstValidImage } from '@/utils/imageUtils';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products');
        if(response.ok) {
          const productsData = await response.json();
          setProducts(productsData || []);
        }
      } catch (err) {
        console.error('Failed to load admin products', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
        if (response.ok) {
          setProducts(prev => prev.filter(p => p.id !== productId));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const getStatusColor = (stock: number) => {
    if (stock > 10) return 'bg-green-100 text-green-800';
    if (stock > 0) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  
  if (isLoading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/admin/products/new" passHref>
          <Button className="bg-[#FF4747] hover:bg-[#D43737] text-white"><Plus className="h-4 w-4 mr-2" />Add Product</Button>
        </Link>
      </div>

      <Card className="p-6 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input type="text" placeholder="Search products..." className="md:col-span-2 w-full rounded-md border-gray-300 focus:ring-[#FF4747] focus:border-[#FF4747]"/>
          <select className="w-full rounded-md border-gray-300 focus:ring-[#FF4747] focus:border-[#FF4747]"><option>All Categories</option></select>
          <select className="w-full rounded-md border-gray-300 focus:ring-[#FF4747] focus:border-[#FF4747]"><option>All Statuses</option></select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><div className="flex-shrink-0 h-10 w-10"><Image src={getFirstValidImage(product.images)} alt={product.name} width={40} height={40} className="rounded-md object-cover"/></div><div className="ml-4"><div className="font-medium text-gray-900">{product.name}</div></div></div></td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.stock)}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div className="flex justify-end items-center space-x-2"><Link href={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:text-blue-900"><Edit className="h-5 w-5" /></Link><Button onClick={() => handleDeleteProduct(product.id)} variant="ghost" className="text-red-600 hover:text-red-900"><Trash2 className="h-5 w-5" /></Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
