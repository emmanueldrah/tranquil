"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Product, Category, Vendor } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/ui/Button';
import { Upload, X, Save, ArrowLeft } from 'lucide-react';

export default function ProductForm({
  params,
}: {
  params: { id?: string[] };
}) {
  const router = useRouter();
  const isEditing = params.id?.[0] !== undefined;

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    images: [],
    vendor: '',
    stock: 0,
    rating: { average: 0, count: 0 },
    reviews: 0,
    seo: {
      title: '',
      description: '',
      keywords: '',
    },
    tags: [],
    brand: '',
    subcategory: '',
    isOnSale: false,
    salePrice: undefined,
    specifications: {},
    variants: undefined,
  });

  // Load product when editing
  useEffect(() => {
    if (!isEditing || !params.id?.[0]) return;

    let mounted = true;
    (async () => {
      try {
        const response = await fetch(`/api/products/${params.id![0]}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const prod = await response.json();
        if (mounted && prod) setFormData(prod);
      } catch (err) {
        console.error('Failed to load product for edit:', err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [isEditing, params.id]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // load categories and vendors for selects
    let mounted = true;
    (async () => {
      try {
        const catsResponse = await fetch('/api/categories');
        const cats = catsResponse.ok ? await catsResponse.json() : [];

        const vendsResponse = await fetch('/api/vendors');
        const vends = vendsResponse.ok ? await vendsResponse.json() : [];
        if (mounted) {
          setCategories(cats);
          setVendors(vends);
        }
      } catch (err) {
        console.error('Failed to load categories/vendors:', err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value, type } = target as HTMLInputElement;
    const parsed = type === 'number' ? Number(value) : type === 'checkbox' ? (target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: parsed,
    }));
  };

  const handleSeoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: value,
      },
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formDataUpload,
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              uploadedUrls.push(data.url);
            }
          }
        } catch (error) {
          console.error('Upload failed:', error);
        }
      }

      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedUrls],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/products/${params.id![0]}` : '/api/products';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isEditing ? formData : {
          ...formData,
          id: uuidv4(),
          rating: { average: 0, count: 0 },
          reviews: 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      setError('Error saving product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Edit Product' : 'Add New Product'}
                </h1>
                <p className="text-sm text-gray-600">
                  {isEditing ? 'Update product information and settings' : 'Create a new product listing'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white shadow-sm rounded-lg border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
              <p className="text-sm text-gray-600">Essential product details</p>
            </div>
            <div className="px-6 py-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name ?? ''}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description ?? ''}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your product"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price ?? 0}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock ?? 0}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category ?? ''}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor *
                  </label>
                  <select
                    name="vendor"
                    value={formData.vendor ?? ''}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand ?? ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Product brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    name="subcategory"
                    value={formData.subcategory ?? ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Product subcategory"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white shadow-sm rounded-lg border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Product Images</h2>
              <p className="text-sm text-gray-600">Upload high-quality images of your product</p>
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {formData.images?.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Add Image</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Sales & Pricing */}
          <div className="bg-white shadow-sm rounded-lg border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Sales & Pricing</h2>
              <p className="text-sm text-gray-600">Configure pricing and promotional settings</p>
            </div>
            <div className="px-6 py-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isOnSale"
                    checked={formData.isOnSale ?? false}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">
                    Put this product on sale
                  </label>
                </div>

                {formData.isOnSale && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        name="salePrice"
                        value={formData.salePrice ?? ''}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter sale price"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white shadow-sm rounded-lg border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">SEO Settings</h2>
              <p className="text-sm text-gray-600">Optimize your product for search engines</p>
            </div>
            <div className="px-6 py-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.seo?.title ?? ''}
                  onChange={handleSeoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Custom SEO title"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to use product name. Recommended: 50-60 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Description
                </label>
                <textarea
                  name="description"
                  value={formData.seo?.description ?? ''}
                  onChange={handleSeoChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Custom SEO description"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to use product description. Recommended: 150-160 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Keywords
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.seo?.keywords ?? ''}
                  onChange={handleSeoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate keywords with commas
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white shadow-sm rounded-lg border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Tags</h2>
              <p className="text-sm text-gray-600">Add tags to help categorize and find your product</p>
            </div>
            <div className="px-6 py-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags?.join(', ') ?? ''}
                  onChange={handleTagsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate tags with commas
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              className="px-6 py-2"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{isEditing ? 'Update Product' : 'Create Product'}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
