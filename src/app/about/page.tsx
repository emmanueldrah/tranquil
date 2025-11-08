import { ShieldCheck, Truck, ThumbsUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl font-serif">Our Philosophy</h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-600">
            Tranquil was founded on a simple idea: that the items we use every day should bring a sense of peace and quality to our lives. We curate high-quality, durable products that combine form and function, helping you create a space that feels like a sanctuary.
          </p>
        </div>
      </div>

      <div className="bg-[#FDFDFB] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center"><h2 className="text-4xl font-extrabold tracking-tight text-slate-900 font-serif">Our Commitment</h2></div>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 text-center">
            <div className="p-8"><div className="flex items-center justify-center h-20 w-20 mx-auto bg-white rounded-full shadow-lg"><ShieldCheck className="h-10 w-10 text-slate-800" /></div><h3 className="mt-8 text-2xl font-bold text-slate-900">Quality Guaranteed</h3><p className="mt-4 text-lg text-slate-600">Every item is hand-picked and tested for the highest quality and durability.</p></div>
            <div className="p-8"><div className="flex items-center justify-center h-20 w-20 mx-auto bg-white rounded-full shadow-lg"><Truck className="h-10 w-10 text-slate-800" /></div><h3 className="mt-8 text-2xl font-bold text-slate-900">Reliable Shipping</h3><p className="mt-4 text-lg text-slate-600">Enjoy fast and reliable shipping on all orders, with no minimum purchase required.</p></div>
            <div className="p-8"><div className="flex items-center justify-center h-20 w-20 mx-auto bg-white rounded-full shadow-lg"><ThumbsUp className="h-10 w-10 text-slate-800" /></div><h3 className="mt-8 text-2xl font-bold text-slate-900">Customer First</h3><p className="mt-4 text-lg text-slate-600">Our dedicated support team is here to help you with any questions or concerns.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
