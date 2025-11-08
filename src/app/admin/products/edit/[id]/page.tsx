'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { UploadCloud } from 'lucide-react';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/products/${id}`);
          if (response.ok) {
            const data = await response.json();
            setProduct(data);
            setImages(data.images || []);
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsUploading(true);
      const files = Array.from(e.target.files);
      const uploadedImageUrls: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await fetch('/api/upload', { method: 'POST', body: formData });
          const data = await response.json();
          if (data.success) {
            uploadedImageUrls.push(data.url);
          }
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      }
      setImages(prev => [...prev, ...uploadedImageUrls]);
      setProduct((prev: any) => ({ ...prev, images: [...prev.images, ...uploadedImageUrls] }));
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };
  
  if (isLoading || !product) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white"><input type="text" name="name" value={product.name} onChange={handleInputChange} className="w-full text-lg font-semibold border-none focus:ring-0"/></Card>
            <Card className="p-6 bg-white"><textarea name="description" value={product.description} onChange={handleInputChange} rows={8} className="w-full border-none focus:ring-0"/></Card>
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold mb-4">Images</h3>
              <div className="grid grid-cols-3 gap-4">
                {images.map(url => <div key={url} className="relative h-32 rounded-lg overflow-hidden"><img src={url} className="w-full h-full object-cover"/></div>)}
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <UploadCloud className="h-8 w-8 text-gray-400"/>
                  <span className="text-sm text-gray-500">Upload</span>
                  <input type="file" multiple onChange={handleImageUpload} className="hidden"/>
                </label>
              </div>
              {isUploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6 bg-white"><h3 className="text-lg font-semibold mb-4">Pricing</h3><input type="number" name="price" value={product.price} onChange={handleInputChange} className="w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500"/></Card>
            <Card className="p-6 bg-white"><h3 className="text-lg font-semibold mb-4">Inventory</h3><input type="number" name="stock" value={product.stock} onChange={handleInputChange} className="w-full rounded-md border-gray-300 focus:ring-red-500 focus:border-red-500"/></Card>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4"><Button type="button" variant="ghost" onClick={() => router.push('/admin/products')}>Cancel</Button><Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">Save Changes</Button></div>
      </form>
    </div>
  );
}
