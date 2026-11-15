import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, RefreshCw, Plus, Minus, Check } from "lucide-react";
import axiosInstance from "../lib/axios";
import { useCartStore } from "../store/useCartStore";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import Badge from "../components/ui/Badge";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        const data = res.data?.data;
        setProduct(data);

        if (data?.category) {
          const relatedRes = await axiosInstance.get(`/products?category=${data.category}&limit=4`);
          const relatedData = relatedRes.data?.data || [];
          setRelatedProducts(relatedData.filter((p) => p._id !== id));
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square w-full rounded-3xl" />
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 text-center bg-white rounded-2xl border border-slate-100 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The product you are looking for may have been removed or is unavailable.</p>
        <Link to="/shop">
          <Button variant="primary">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </Link>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
        {/* Product Image */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs relative overflow-hidden">
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-slate-50">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                -{product.discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Info Column */}
        <div className="space-y-6">
          <div>
            <Badge variant="primary" className="mb-3 uppercase tracking-wider">
              {product.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {product.title}
            </h1>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-4 pt-2">
            <span className="text-3xl font-black text-slate-900">
              RS. {product.price?.toLocaleString()}
            </span>
            {product.mrp > product.price && (
              <span className="text-lg text-slate-400 line-through">
                RS. {product.mrp?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Availability Badge */}
          <div>
            {product.inStock > 0 ? (
              <Badge variant="success">In Stock ({product.inStock} items available)</Badge>
            ) : (
              <Badge variant="danger">Out of Stock</Badge>
            )}
          </div>

          {/* Quantity Selector & Add to Cart */}
          {product.inStock > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Quantity</span>
                <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-slate-600 hover:text-slate-900"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                    className="p-2 text-slate-600 hover:text-slate-900"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  variant={added ? "success" : "primary"}
                  onClick={handleAddToCart}
                  className="w-full sm:flex-1 shadow-lg shadow-blue-600/20"
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </Button>

                <Link to="/cart" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full">
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Shipping / Trust Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-center">
            <div className="p-3 bg-white rounded-xl border border-slate-100">
              <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-[10px] font-bold uppercase text-slate-800">Derm Tested</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-100">
              <Truck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-[10px] font-bold uppercase text-slate-800">Fast Shipping</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-100">
              <RefreshCw className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p className="text-[10px] font-bold uppercase text-slate-800">30-Day Return</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-slate-200">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Related Skincare</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <Card key={rp._id} hover className="flex flex-col overflow-hidden">
                <Link to={`/product/${rp._id}`} className="aspect-square bg-slate-100 overflow-hidden">
                  <img src={rp.image} alt={rp.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{rp.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">RS. {rp.price?.toLocaleString()}</p>
                  </div>
                  <Link to={`/product/${rp._id}`} className="mt-3">
                    <Button size="sm" variant="outline" className="w-full">View Details</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
