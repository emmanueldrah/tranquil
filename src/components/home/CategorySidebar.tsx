'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getAllCategories } from '@/data';
import { Category } from '@/types';

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function CategorySidebar({ isOpen, onClose }: CategorySidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <aside className={`w-80 bg-deep border-r border-gray-200 p-6 h-screen overflow-y-auto fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Categories</h2>
            <button
              onClick={onClose}
              className="p-1 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="text-white">Loading categories...</div>
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <aside className={`w-80 bg-deep border-r border-gray-200 p-6 h-screen overflow-y-auto fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Categories</h2>
            <button
              onClick={onClose}
              className="p-1 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group flex items-center p-4 rounded-lg hover:bg-teal transition-colors border border-gray-100 hover:border-gray-200"
                onClick={onClose}
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                  <Image
                    src={category.image || '/images/placeholder.jpg'}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white leading-tight">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">{category.subcategories.length} Subcategories</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional sidebar content can go here */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <div className="space-y-2">
            <Link href="/deals" className="block text-sm text-gray-300 hover:text-teal-400 transition-colors" onClick={onClose}>
              Special Deals
            </Link>
            <Link href="/new-arrivals" className="block text-sm text-gray-300 hover:text-teal-400 transition-colors" onClick={onClose}>
              New Arrivals
            </Link>
            <Link href="/bestsellers" className="block text-sm text-gray-300 hover:text-teal-400 transition-colors" onClick={onClose}>
              Best Sellers
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export { CategorySidebar };
