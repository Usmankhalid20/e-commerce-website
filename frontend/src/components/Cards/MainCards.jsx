import React from 'react'
import { cardData } from '../Constant/content'
import ProductCard from './ProductCard'
const MainCards = () => {
  return (
    <>
<div className="w-full px-4 py-10">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-10">
   {cardData.map((item) => (
           <ProductCard key={item.id} product={item} />
        ))}
  </div>
</div>


    </>
  )
}

export default MainCards
