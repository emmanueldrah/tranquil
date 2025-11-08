'use client';

import { useState, useEffect } from 'react';
import { Banner } from '@/types';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, Eye, EyeOff, UploadCloud } from 'lucide-react';

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    isActive: true,
    position: 0,
  });

  const loadBanners = async () => {
    try {
      const response = await fetch('/api/admin/banners');
      if (response.ok) {
        const data = await response.json();
        setBanners(data);
      } else {
        setBanners([]);
      }
    } catch (error) {
      console.error('Error loading banners:', error);
      setBanners([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({ ...prev, image: data.url }));
        } else {
          console.error('Image upload failed');
        }
      } catch (error) {
        console.error('Image upload error:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingBanner ? 'PUT' : 'POST';
      const url = editingBanner ? `/api/admin/banners/${editingBanner.id}` : '/api/admin/banners';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadBanners();
        setShowForm(false);
        setEditingBanner(null);
        setFormData({
          title: '',
          description: '',
          image: '',
          link: '',
          isActive: true,
          position: 0,
        });
      } else {
        console.error('Error saving banner');
      }
    } catch (error) {
      console.error('Error saving banner:', error);
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      description: banner.description || '',
      image: banner.image,
      link: banner.link || '',
      isActive: banner.isActive,
      position: banner.position,
    });
    setShowForm(true);
  };

  const handleDelete = async (bannerId: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        const response = await fetch(`/api/admin/banners/${bannerId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await loadBanners();
        } else {
          console.error('Error deleting banner');
        }
      } catch (error) {
        console.error('Error deleting banner:', error);
      }
    }
  };

  const toggleActive = async (banner: Banner) => {
    try {
      const response = await fetch(`/api/admin/banners/${banner.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...banner, isActive: !banner.isActive }),
      });
      if (response.ok) {
        await loadBanners();
      } else {
        console.error('Error toggling banner status');
      }
    } catch (error) {
      console.error('Error toggling banner status:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Banner Management</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Banner
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingBanner ? 'Edit Banner' : 'Add New Banner'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <div className="mt-1 flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <UploadCloud className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {formData.image && (
                  <div className="w-32 h-32 rounded-lg overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              {isUploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Link (optional)</label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="number"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="0"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">Active</label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingBanner ? 'Update Banner' : 'Create Banner'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingBanner(null);
                  setFormData({
                    title: '',
                    description: '',
                    image: '',
                    link: '',
                    isActive: true,
                    position: 0,
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Banner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0 mr-4">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={banner.image}
                          alt={banner.title}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {banner.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {banner.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      banner.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {banner.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {banner.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      onClick={() => toggleActive(banner)}
                      variant="ghost"
                      className="mr-2"
                    >
                      {banner.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      onClick={() => handleEdit(banner)}
                      variant="ghost"
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(banner.id)}
                      variant="ghost"
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
