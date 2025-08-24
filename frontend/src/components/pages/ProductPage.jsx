// src/pages/ProductPage.jsx
import { useParams } from "react-router-dom";
// import { cardData } from "../Constant/content"; // make sure this file exports the array
import { useAuth } from "../context/AuthContext"; // your Zustand store
import React from "react";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProductPage = () => {
   const { id } = useParams();

  // get state & actions from Zustand
  const { 
    products, 
    fetchProducts, 
    addToCart, 
    quantity, 
    increment, 
    decrement, 
    resetQuantity,
    getProductById 
  } = useAuth();

  // fetch products if not already loaded
  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  // find product by id
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="text-center py-10 text-red-500">Product not found</div>
    );
  }

  const handleAddToCart = () => {
    if (product.inStock && quantity > 0) {
      addToCart(product, quantity);
      resetQuantity();
      toast.success("Item added to cart");
    } else {
      toast.error("Out of Stock");
    }
  };

  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  return (
    <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-50 aspect-square">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              loading="eager"
            />
            {/* Badge */}
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                {discount}% OFF
              </div>
            )}
          </div>
          {/* Thumbnails can be added here if multiple images exist */}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-purple-700">
                RS {product.price}
              </span>
              {product.mrp > product.price && (
                <span className="text-lg line-through text-gray-400">
                  RS {product.mrp}
                </span>
              )}
            </div>
            {product.mrp > product.price && (
              <p className="text-sm text-green-600">
                You save RS {product.mrp - product.price} ({discount}%)
              </p>
            )}
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-current"
                      : "fill-none stroke-current"
                  }`}
                  viewBox="0 0 24 24"
                >
                  {i < Math.floor(product.rating) ? (
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  )}
                  {product.rating % 1 > 0 &&
                    i === Math.floor(product.rating) && (
                      <path
                        fill="currentColor"
                        d={`M12 2v0L${12 + 3.09 * (product.rating % 1)} ${
                          2 + 6.26 * (product.rating % 1)
                        }v0L22 9.27v0l-5 4.87v0l1.18 6.88v0L12 17.77v0l-6.18 3.25v0L7 14.14v0L2 9.27v0l6.91-1.01v0L12 2z`}
                      />
                    )}
                </svg>
              ))}
            </div>
            <span className="text-gray-600 text-sm">
              ({product.reviews} customer reviews)
            </span>
          </div>

          {/* count Status */}
          <div className="flex items-center gap-4">
            {/* Stock Status Badge */}
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Quantity Selector */}
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white overflow-hidden">
              <button
                onClick={() => decrement(product.inStock)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="px-3 py-1 text-sm font-medium text-gray-700 border-x border-gray-200">
                {quantity}
              </span>

              <button
                onClick={() => increment(product.inStock)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-50  transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="pt-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}

              className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                product.inStock
                  ? "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.inStock ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </span>
              ) : (
                "Out of Stock"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
