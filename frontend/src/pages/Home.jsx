import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, Leaf, Award, Truck, ShoppingBag } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";

export default function Home() {
  const { products, fetchProducts, isLoading } = useProductStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchProducts({ limit: 6 });
  }, [fetchProducts]);

  const categories = [
    { title: "Cleansers", name: "cleanser", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop" },
    { title: "Serums", name: "serum", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop" },
    { title: "Moisturizers", name: "moisturizer", image: "https://images.unsplash.com/photo-1608248597262-838d76d49811?q=80&w=800&auto=format&fit=crop" },
    { title: "Sun Protection", name: "sunscreen", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Pure Skincare Perfection</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Radiant Skin Starts With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">One Drop</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal">
              Formulated with dermatologist-backed organic botanical extracts. Restore hydration, nourish your barrier, and unlock natural radiance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-600/30">
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-slate-200 border-slate-700 hover:bg-slate-800 hover:text-white">
                  Learn Our Science
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop"
                alt="OneDrop Skincare Botanical Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/60 w-full">
                  <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Featured Release</p>
                  <p className="text-sm font-bold text-white mt-0.5">Hydra-Restore Botanical Elixir</p>
                  <p className="text-xs text-slate-300 mt-1">100% Organic Hyaluronic Acid + Niacinamide Complex</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-y border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Derm Approved</h4>
              <p className="text-xs text-slate-500">Clinical Formulation</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">100% Organic</h4>
              <p className="text-xs text-slate-500">Sustainably Sourced</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Cruelty Free</h4>
              <p className="text-xs text-slate-500">Never Tested on Animals</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Free Shipping</h4>
              <p className="text-xs text-slate-500">On orders over RS. 10,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Shop by Category</h2>
            <p className="text-slate-500 text-sm mt-1">Explore targeted skincare routines designed for every skin type</p>
          </div>
          <Link to="/shop" className="text-blue-600 hover:text-blue-700 font-bold text-sm inline-flex items-center gap-1.5">
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/shop?category=${cat.name}`} className="group">
              <Card hover className="overflow-hidden">
                <div className="aspect-4/3 relative overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                    <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Popular Best-Sellers</h2>
            <p className="text-slate-500 text-sm mt-1">Discover customer favorites crafted for glowing, healthy skin</p>
          </div>
          <Link to="/shop" className="text-blue-600 hover:text-blue-700 font-bold text-sm inline-flex items-center gap-1.5">
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 space-y-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => (
              <Card key={product._id} hover className="flex flex-col overflow-hidden">
                <Link to={`/product/${product._id}`} className="aspect-square bg-slate-100 relative overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                      -{product.discount}%
                    </span>
                  )}
                </Link>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      {product.category}
                    </span>
                    <Link to={`/product/${product._id}`}>
                      <h3 className="text-base font-bold text-slate-900 mt-2 hover:text-blue-600 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-lg font-extrabold text-slate-900">RS. {product.price?.toLocaleString()}</span>
                      {product.mrp > product.price && (
                        <span className="text-xs text-slate-400 line-through ml-2">RS. {product.mrp?.toLocaleString()}</span>
                      )}
                    </div>

                    <Button
                      size="sm"
                      onClick={() => addToCart(product, 1)}
                      className="gap-1.5 shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
