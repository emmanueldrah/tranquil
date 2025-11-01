'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import { getAllCategories } from '@/data';

export const CategoryNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <nav className="relative bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="animate-pulse h-8 w-32 bg-gray-200 rounded"></div>
            <div className="hidden md:flex md:space-x-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse h-6 w-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="relative bg-white">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Categories
            </button>

            <div className="hidden md:flex md:items-center md:space-x-8">
              {categories.map((category) => (
                <div key={category.id} className="group relative">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                  >
                    {category.name}
                  </Link>

                  {/* Dropdown Panel */}
                  <div className="hidden group-hover:block absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-2">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/categories/${category.slug}/${sub.slug}`}
                          className="flex items-center px-4 py-3 hover:bg-gray-50"
                        >
                          <div className="relative w-12 h-12 rounded overflow-hidden mr-3">
                            <Image
                              src={sub.image}
                              alt={sub.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {sub.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {sub.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/30" onClick={() => setIsOpen(false)} />
          <div className="fixed top-16 left-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto">
            <div className="py-2">
              {categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  <div className="relative h-32 bg-gray-900">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover opacity-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link
                        href={`/categories/${category.slug}`}
                        className="text-white text-xl font-semibold px-4 py-2 bg-black/50 rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </div>
                  </div>
                  <div className="px-2 py-3">
                    <div className="grid grid-cols-2 gap-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={`/categories/${category.slug}/${subcategory.slug}`}
                          className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden mb-2">
                            <Image
                              src={subcategory.image}
                              alt={subcategory.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900 text-center">
                            {subcategory.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};