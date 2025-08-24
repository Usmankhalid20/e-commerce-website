import React from "react";
// import { cardData } from "../Constant/content";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect  } from "react";

const Shop = () => {
  const { products, fetchProducts} = useAuth();

useEffect(() => {
  fetchProducts();
}, [fetchProducts])

if (!Array.isArray(products) || products.length === 0) {
    return <p>No products available</p>;
  };
  return (
    <>
      <div className="w-full relative bg-gradient-to-r h-80 text-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://www.spacenk.com/on/demandware.static/-/Library-Sites-spacenk-global/default/dw667aa67e/images/PLP/Multi-Active%20Delivery%20Essence%20Banner%20-%201440x420.png"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-snug text- bg-center">
            Shop
          </h1>
        </div>
      </div>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p">
        <div className="w-full px-4 py-10 bg-zinc-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-10">
            {products.map((card, id) => (
              <div
                key={id}
                className="card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <figure>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-64 object-cover"
                  />
                </figure>
                <div className="p-6 text-zinc-800">
                  <h2 className="text-lg font-semibold mb-1">{card.title}</h2>
                  <p className="text-sm text-gray-500 mb-2 capitalize">
                    {card.category}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl font-bold text-purple-700">
                      RS {card.price}
                    </span>
                    <span className="text-sm line-through text-gray-400">
                      RS {card.mrp}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      ({Math.round(((card.mrp - card.price) / card.mrp) * 100)}%
                      OFF)
                    </span>
                  </div>

                  {/* Ratings */}
                  <div className="flex items-center gap-1 text-yellow-500 text-sm mb-4">
                    {"★".repeat(Math.floor(card.rating)) +
                      (card.rating % 1 >= 0.5 ? "½" : "")}
                    <span className="text-gray-500 ml-2">
                      ({card.reviews} reviews)
                    </span>
                  </div>

                  {/* Button */}
                  <Link
                    to={`/product/${card._id}`}
                    className="block mt-4 bg-purple-600 text-white text-center py-2 rounded hover:bg-purple-700 transition"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
