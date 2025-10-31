'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  startDate: string;
  endDate: string;
}

const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: 'promo1',
    title: 'Summer Sale!',
    description: 'Up to 50% off on selected items',
    image: '/images/summer-sale.jpg',
    link: '/sales/summer',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
  },
  {
    id: 'promo2',
    title: 'New Arrivals',
    description: 'Check out our latest collection',
    image: '/images/new-arrivals.jpg',
    link: '/new-arrivals',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
  },
  // Add more promotions as needed
];

export function PromotionalBanner() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [activePromotions, setActivePromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    // Filter active promotions based on current date
    const now = new Date();
    const active = MOCK_PROMOTIONS.filter(
      (promo) =>
        new Date(promo.startDate) <= now && new Date(promo.endDate) >= now
    );
    setActivePromotions(active);
  }, []);

  useEffect(() => {
    if (activePromotions.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % activePromotions.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(timer);
  }, [activePromotions.length]);

  if (activePromotions.length === 0) return null;

  const currentPromo = activePromotions[currentPromoIndex];

  return (
    <div className="relative bg-blue-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <div className="flex items-center justify-center">
            <p className="font-medium text-white">
              <span>{currentPromo.title}</span>
              <span className="hidden md:inline"> - {currentPromo.description}</span>
              <span className="block sm:ml-2 sm:inline-block">
                <Link href={currentPromo.link} className="text-white font-bold underline">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </Link>
              </span>
            </p>
          </div>
        </div>
        {activePromotions.length > 1 && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-2">
            {activePromotions.map((_, index) => (
              <button
                key={index}
                className={`h-1 w-4 rounded ${
                  index === currentPromoIndex
                    ? 'bg-white'
                    : 'bg-white/50'
                }`}
                onClick={() => setCurrentPromoIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}