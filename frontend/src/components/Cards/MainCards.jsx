import React from 'react'
// import { cardData } from '../Constant/content'
import { useAuth } from '../context/AuthContext'
import ProductCard from './ProductCard'
import { useEffect } from 'react'

const MainCards = () => {
const { products, fetchProducts} = useAuth();

useEffect(() => {
  fetchProducts();
}, [fetchProducts])

if (!Array.isArray(products) || products.length === 0) {
    return <p>No products available</p>;
  };

  return (
    <>
<div className="w-full px-4 py-10">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-10">
   {products.map((item) => (
           <ProductCard key={item._id} product={item} />
        ))}
  </div>
</div>


    </>
  )
}

export default MainCards
