import React, { useEffect } from 'react'
import { useProductStore } from "../../../store/useProductStore";

import ProductCard from './ProductCard'

const MainCards = () => {
  const { products, fetchProducts, isLoading, error } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-10 text-center text-sm text-stone-500">
        No products available right now.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((item) => (
        <ProductCard key={item._id || item.id} product={item} />
      ))}
    </div>
  )
}

export default MainCards
