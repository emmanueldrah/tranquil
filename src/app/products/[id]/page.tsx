
import { ProductPageClient } from './ProductPageClient';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products/${id}`);
  if (!response.ok) {
    return <div className="text-center py-20">Product not found.</div>;
  }
  const product = await response.json();
  
  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  const vendorResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/vendors/${product.vendor}`);
  const vendor = vendorResponse.ok ? await vendorResponse.json() : { id: '', name: 'Unknown Vendor', description: '', logo: '', rating: 0, reviews: 0, joinedDate: '', products: [], contactInfo: { phone: '', email: '', address: '' } };

  const reviewsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products/${id}/reviews`);
  const reviews = reviewsResponse.ok ? await reviewsResponse.json() : [];

  return <ProductPageClient product={product} vendor={vendor} initialReviews={reviews} />;
}
