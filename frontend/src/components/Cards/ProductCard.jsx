// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product bg-white shadow-md rounded-xl overflow-hidden">
      <figure>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
      </figure>
      <div className="p-6 text-zinc-800">
        <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
        <p className="text-sm text-gray-500 mb-2 capitalize">
          {product.category}
        </p>

        {/* Pricing */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl font-bold text-purple-700">
            ₹{product.price}
          </span>
          <span className="text-sm line-through text-gray-400">
            ₹{product.mrp}
          </span>
          <span className="text-sm text-green-600 font-medium">
            ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
            OFF)
          </span>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm mb-4">
          {"★".repeat(Math.floor(product.rating)) +
            (product.rating % 1 >= 0.5 ? "½" : "")}
          <span className="text-gray-500 ml-2">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Button */}
        <Link
          to={`/product/${product.id}`}
          className="block mt-4 bg-purple-600 text-white text-center py-2 rounded hover:bg-purple-700 transition"
        >
          {product.buttonText}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
