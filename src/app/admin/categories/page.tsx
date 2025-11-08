'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', image: '' });

  async function fetchCategories() {
    setIsLoading(true);
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Failed to load categories', error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories';
    const method = editingCategory ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleCancel();
        fetchCategories();
      }
    } catch (error) {
      console.error('Failed to save category', error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description || '', image: category.image || '' });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`/api/categories/${id}`, { method: 'DELETE' });
        fetchCategories();
      } catch (error) {
        console.error('Failed to delete category', error);
      }
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', image: '' });
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading categories...</div>;
  }

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Categories</h1>
          <Button onClick={() => { setShowAddForm(true); setEditingCategory(null); }} className="bg-red-600 hover:bg-red-700">Add Category</Button>
        </div>

        {(showAddForm || editingCategory) && (
          <Card className="p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Category Name"/>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Category Description"/>
              <input type="url" name="image" value={formData.image} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Image URL"/>
              <div className="flex justify-end space-x-4"><Button type="button" variant="ghost" onClick={handleCancel}>Cancel</Button><Button type="submit" className="bg-red-600 hover:bg-red-700">{editingCategory ? 'Update' : 'Add'}</Button></div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <Card key={category.id} className="bg-white p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </div>
                <div className="flex space-x-2"><Button onClick={() => handleEdit(category)} variant="ghost" className="text-blue-600 hover:text-blue-800">Edit</Button><Button onClick={() => handleDelete(category.id)} variant="ghost" className="text-red-600 hover:text-red-800">Delete</Button></div>
              </div>
              {category.image && <img src={category.image} alt={category.name} className="w-full h-32 object-cover rounded mb-4"/>}
            </Card>
          ))}
        </div>
      </div>
  );
}
