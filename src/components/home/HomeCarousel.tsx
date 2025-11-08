'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/images/promo-slide-1.jpg',
    title: 'Elevate Your Space',
    subtitle: 'Discover our new collection of modern home essentials.',
    buttonText: 'Shop Home Goods',
    buttonLink: '/products?category=home'
  },
  {
    image: '/images/promo-slide-2.jpg',
    title: 'Latest Tech, Best Prices',
    subtitle: 'Explore cutting-edge electronics from top brands.',
    buttonText: 'Shop Electronics',
    buttonLink: '/products?category=electronics'
  },
  {
    image: '/images/promo-slide-3.jpg',
    title: 'Style for Every Season',
    subtitle: 'Update your wardrobe with our latest fashion arrivals.',
    buttonText: 'Shop Apparel',
    buttonLink: '/products?category=apparel'
  }
];

export function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
      {slides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          <Image src={slide.image} alt={slide.title} fill className="object-cover"/>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8">
            <h2 className="text-4xl font-extrabold">{slide.title}</h2>
            <p className="mt-4 text-lg max-w-xl">{slide.subtitle}</p>
            <Link href={slide.buttonLink}>
              <Button className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full">
                {slide.buttonText}
              </Button>
            </Link>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white'}`} />
        ))}
      </div>

      <Button onClick={prevSlide} variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 text-white"><ChevronLeft className="h-6 w-6"/></Button>
      <Button onClick={nextSlide} variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 text-white"><ChevronRight className="h-6 w-6"/></Button>
    </div>
  );
}
