'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import { getAllCategories } from '@/data';

export const CategoryNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = getAllCategories();

  return (
    <nav className="relative bg-white">
      <div className="border-b">
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
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-50 md:hidden">
          <div className="py-2">
            {categories.map((category) => (
              <div key={category.id}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
                <div className="pl-8">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={`/categories/${category.slug}/${subcategory.slug}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};