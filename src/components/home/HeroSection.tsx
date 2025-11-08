import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
  <div className="relative bg-background">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center py-28">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-gradient">Discover Curated Tech & Premium Deals</h1>
        <p className="text-lg md:text-xl mb-8 text-text-muted max-w-2xl">
          Handpicked gadgets and appliances from trusted vendors — shop with confidence and fast shipping.
        </p>
        <div className="flex items-center space-x-4">
          <Button href="/categories/home-appliances" variant="primary">Shop Now</Button>
          <Button href="/about" variant="secondary">Learn More</Button>
        </div>
      </div>
    </div>
  );
}
