import React from 'react'
import { cardData } from '../Constant/content'
const MainCards = () => {
  return (
    <>
<div className="w-full px-4 py-10 bg-zinc-100">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-10">
    {cardData.map((card, index) => (
      <div key={index} className="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <figure>
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-100 object-cover"
          />
        </figure>
        <div className="p-6 text-zinc-800">
          <h2 className="card-title text-lg font-semibold">{card.title}</h2>
          <p className="text-sm mt-2">{card.description}</p>
          <h3 className="text-xl font-bold text-purple-700 mt-3">{card.price}</h3>
          <div className="card-actions mt-5">
            <button className="btn btn-primary w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              {card.buttonText}
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  )
}

export default MainCards
