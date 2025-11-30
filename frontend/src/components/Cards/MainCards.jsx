import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import ProductCard from './ProductCard'

const MainCards = () => {
  const { products, fetchProducts } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  )
}

export default MainCards
