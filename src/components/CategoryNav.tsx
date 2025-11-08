'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import { getAllCategories } from '@/lib/categories';
import Button from '@/components/ui/Button';

export const CategoryNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
      <nav className="relative bg-deep backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            <div className="animate-pulse h-10 w-40 bg-deep/60 rounded-2xl"></div>
            <div className="hidden md:flex md:space-x-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse h-8 w-28 bg-deep/60 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="relative bg-surface backdrop-blur-xl border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Button
            type="button"
            variant="primary"
            className="group flex items-center gap-4 px-8 py-4 gradient-primary text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl transform hover:scale-105 hover:-translate-y-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative">
              <svg
                className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
            </div>
            <span className="tracking-wide">Explore Categories</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>

          <div className="hidden md:flex md:items-center md:space-x-10">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative"
                onMouseEnter={() => setOpenDropdown(category.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="relative text-text hover:text-primary px-6 py-3 text-base font-semibold transition-all duration-300 transform hover:scale-105"
                  onFocus={() => setOpenDropdown(category.id)}
                  onBlur={() => setOpenDropdown(null)}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === category.id}
                >
                  {category.name}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300 rounded-full"></div>
                </Link>

                {/* Enhanced Dropdown Panel (also shown when focused) */}
                <div
                  id={`cat-dropdown-${category.id}`}
                  role="region"
                  aria-hidden={openDropdown !== category.id}
                  className={`absolute left-1/2 transform -translate-x-1/2 mt-6 w-96 z-50 transition-all duration-300 ${
                    openDropdown === category.id ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-4'
                  } group-hover:block group-hover:opacity-100 group-hover:translate-y-0`}
                >
                  <div className="bg-surface text-text rounded-2xl shadow-2xl border border-border overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-xl ring-4 ring-primary/20">
                          <Image
                            src={category.image || '/images/placeholder.jpg'}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>
                        <div>
                          <h3 className="font-bold text-2xl text-text mb-1">{category.name}</h3>
                          <p className="text-sm text-text-muted leading-relaxed">{category.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {category.subcategories.map((sub, index) => (
                          <Link
                            key={sub.id}
                            href={`/categories/${category.slug}/${sub.slug}`}
                            className="group/item flex items-center p-4 rounded-xl hover:bg-background transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden mr-5 ring-3 ring-primary/30 group-hover/item:ring-accent transition-all duration-300 shadow-md">
                              <Image
                                src={sub.image || '/images/placeholder.jpg'}
                                alt={sub.name}
                                fill
                                className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-text group-hover/item:text-primary transition-colors duration-300 text-lg">
                                {sub.name}
                              </p>
                              <p className="text-sm text-text-muted group-hover/item:text-accent transition-colors duration-300 leading-tight">
                                {sub.description}
                              </p>
                            </div>
                            <svg className="w-6 h-6 text-text-muted group-hover/item:text-primary group-hover/item:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="fixed top-24 left-4 right-4 bottom-4 bg-surface text-text rounded-2xl overflow-hidden border border-border shadow-2xl">
            <div className="p-8 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-text">Categories</h2>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="secondary"
                  className="p-3 rounded-xl bg-background hover:bg-border transition-all duration-200 shadow-lg transform hover:scale-110"
                >
                  <svg className="w-6 h-6 text-text-muted transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              <div className="space-y-8">
                {categories.map((category, categoryIndex) => (
                  <div key={category.id} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 200}ms` }}>
                    <div className="relative h-32 bg-gradient-primary rounded-2xl overflow-hidden mb-6 shadow-xl">
                      <Image
                        src={category.image || '/images/placeholder.jpg'}
                        alt={category.name}
                        fill
                        className="object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Link
                          href={`/categories/${category.slug}`}
                          className="text-white text-xl font-bold px-8 py-3 bg-black/30 backdrop-blur-md rounded-xl hover:bg-black/50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                          onClick={() => setIsOpen(false)}
                        >
                          {category.name}
                        </Link>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <Link
                          key={subcategory.id}
                          href={`/categories/${category.slug}/${subcategory.slug}`}
                          className="group flex flex-col items-center p-5 rounded-xl bg-background hover:bg-border transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-border"
                          onClick={() => setIsOpen(false)}
                          style={{ animationDelay: `${(categoryIndex * 200) + (subIndex * 100)}ms` }}
                        >
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden mb-4 ring-4 ring-primary/30 group-hover:ring-accent transition-all duration-300 shadow-lg">
                            <Image
                              src={subcategory.image || '/images/placeholder.jpg'}
                              alt={subcategory.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <span className="text-base font-bold text-text text-center group-hover:text-primary transition-colors duration-300 leading-tight">
                            {subcategory.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
