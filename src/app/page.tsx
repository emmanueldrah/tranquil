import Image from "next/image";
import Link from "next/link";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { getAllCategories, getAllProducts } from "@/data";
import { Star, Truck, Shield, HeadphonesIcon, ArrowRight, Sparkles, Zap, Award } from "lucide-react";

async function getTopSaleProducts() {
  const products = await getAllProducts();
  return products
    .filter(p => p.isOnSale && p.stock > 0)
    .sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))
    .slice(0, 3);
}

export default async function Home() {
  const categories = await getAllCategories();
  const saleProducts = await getTopSaleProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-teal-500 via-cyan-600 to-emerald-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-cyan-400/15 to-teal-400/15 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-white text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-emerald-300 mr-2" />
            <span className="text-sm font-medium text-white">Premium Quality Products</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Tranquil
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-teal-100 max-w-3xl leading-relaxed">
            Your One-Stop Shop for Quality Appliances & Electronics.
            Discover premium products with exceptional quality and unbeatable prices.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <Link
              href="/categories/home-appliances"
              className="group inline-flex items-center px-8 py-4 bg-white text-teal-600 rounded-2xl font-bold text-lg hover:bg-teal-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1"
            >
              Shop Now
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Browse Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-teal-100">Products Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">4.9★</div>
              <div className="text-teal-100">Customer Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-teal-100">Customer Support</div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-24">
            <path
              fill="#ffffff"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by <span className="text-teal-600">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of premium products across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-teal-50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-teal-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium">#{index + 1}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedProducts />
        </div>
      </section>

      {/* Sale Products Section */}
      {saleProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <Zap className="w-5 h-5 text-emerald-300 mr-2" />
                <span className="text-white font-medium">Limited Time</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Flash <span className="text-emerald-300">Sale!</span>
              </h2>
              <p className="text-white/90 text-xl max-w-2xl mx-auto">
                Don't miss out on these incredible deals. Limited stock available!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {saleProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Save {Math.round((1 - (product.salePrice ?? 0) / product.price) * 100)}%
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-2xl font-bold text-emerald-600">
                        ₵{product.salePrice?.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₵{product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">4.5</span>
                      </div>
                      <span className="text-sm text-gray-500">In Stock</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-teal-600">Tranquil?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience shopping like never before with our premium services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payment</h3>
              <p className="text-gray-600 leading-relaxed">
                Multiple secure payment options available for your convenience
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick and reliable shipping to get your products delivered fast
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Guarantee</h3>
              <p className="text-gray-600 leading-relaxed">
                All products come with our quality guarantee and warranty
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <HeadphonesIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Round-the-clock customer support. Contact us: 0247572364
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
              <button className="px-8 py-4 bg-white text-teal-600 rounded-2xl font-bold hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
