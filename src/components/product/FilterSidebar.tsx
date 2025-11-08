'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const categories = [
  'All Categories',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Books',
  'Beauty',
  'Toys',
  'Automotive',
];

const priceRanges = [
  { label: 'Under ₵25', value: '0-25' },
  { label: '₵25 to ₵50', value: '25-50' },
  { label: '₵50 to ₵100', value: '50-100' },
  { label: '₵100 to ₵200', value: '100-200' },
  { label: 'Over ₵200', value: '200-' },
];

interface FilterSidebarProps {
  onFilterChange: (filters: {
    category?: string;
    priceRange?: string;
    inStock?: boolean;
  }) => void;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({
      category: category === 'All Categories' ? undefined : category,
      priceRange: selectedPriceRange ?? undefined,
      inStock: showInStockOnly,
    });
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(range === selectedPriceRange ? null : range);
    onFilterChange({
      category: selectedCategory === 'All Categories' ? undefined : selectedCategory,
      priceRange: range === selectedPriceRange ? undefined : range,
      inStock: showInStockOnly,
    });
  };

  const handleInStockChange = (checked: boolean) => {
    setShowInStockOnly(checked);
    onFilterChange({
      category: selectedCategory === 'All Categories' ? undefined : selectedCategory,
      priceRange: selectedPriceRange ?? undefined,
      inStock: checked,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Categories */}
      <div className="mb-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => toggleSection('categories')}
          className="flex justify-between items-center w-full text-lg font-semibold mb-4"
        >
          Categories
          {expandedSections.categories ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => toggleSection('price')}
          className="flex justify-between items-center w-full text-lg font-semibold mb-4"
        >
          Price Range
          {expandedSections.price ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPriceRange === range.value}
                  onChange={() => handlePriceRangeChange(range.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div>
        <Button
          type="button"
          variant="ghost"
          onClick={() => toggleSection('availability')}
          className="flex justify-between items-center w-full text-lg font-semibold mb-4"
        >
          Availability
          {expandedSections.availability ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
        {expandedSections.availability && (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showInStockOnly}
              onChange={(e) => handleInStockChange(e.target.checked)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Show In-Stock Only</span>
          </label>
        )}
      </div>
    </div>
  );
}