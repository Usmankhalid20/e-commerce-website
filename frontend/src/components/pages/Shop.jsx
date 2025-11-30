import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProductCard from "../Cards/ProductCard";
import Section from "../UI/Section";
import Button from "../UI/Button";
import { Filter, ChevronDown } from "lucide-react";

const Shop = () => {
  const { products, fetchProducts } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
         <p className="text-xl text-stone-500 font-serif mb-4">Loading our collection...</p>
         <div className="w-12 h-12 border-4 border-stone-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {/* Shop Header */}
      <div className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop"
            alt="Shop Banner"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <span className="text-white/80 font-medium tracking-widest text-sm uppercase mb-3 block">
            The Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-4">
            Shop All Products
          </h1>
          <p className="text-white/90 text-lg font-light max-w-xl mx-auto">
            Curated essentials for the modern individual.
          </p>
        </div>
      </div>

      {/* Filter Bar (Visual Only) */}
      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-stone-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
           <p className="text-sm text-stone-500">Showing {products.length} results</p>
           <div className="flex gap-4">
             <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors">
               Filter <Filter size={16} />
             </button>
             <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors">
               Sort by <ChevronDown size={16} />
             </button>
           </div>
        </div>
      </div>

      {/* Product Grid */}
      <Section className="bg-white pt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Section>
      
      {/* Sticky Mobile Cart/Filter Bar (Optional - if needed for mobile UX) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 p-3 md:hidden z-40 flex gap-2">
         <Button variant="outline" className="flex-1 text-xs py-3">Filter & Sort</Button>
         <Button to="/cart" variant="primary" className="flex-1 text-xs py-3">View Cart</Button>
      </div>
    </>
  );
};

export default Shop;
