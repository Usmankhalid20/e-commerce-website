import { Link } from "react-router-dom";
import { FaStar, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import Button from "../../ui/Button";

const ProductCard = ({ product }) => {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="group relative bg-white">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-stone-100 rounded-sm">
        <Link to={`/product/${product._id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-primary text-white text-[10px] font-medium px-2 py-1 uppercase tracking-wider">
              -{discount}%
            </span>
          )}
          {product.isNew && (
             <span className="bg-white text-primary text-[10px] font-medium px-2 py-1 uppercase tracking-wider">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white rounded-full text-stone-400 hover:text-accent hover:bg-stone-50 transition-colors shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
          <FaRegHeart size={14} />
        </button>
        
        {/* Quick Add Button (Desktop) */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
           <Button variant="primary" className="w-full text-xs py-3 shadow-lg" onClick={() => {}}>
             Add to Cart
           </Button>
        </div>
      </div>

      {/* Content */}
      <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
        <p className="text-[10px] font-medium text-stone-500 uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-primary font-serif font-medium text-lg mb-1 hover:text-accent transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-center gap-3 text-sm mb-2">
          <span className="font-medium text-primary">
            RS {product.price}
          </span>
          {product.mrp > product.price && (
            <span className="text-stone-400 line-through text-xs">
              RS {product.mrp}
            </span>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center justify-center gap-1">
          <div className="flex text-accent text-[10px]">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < Math.floor(product.rating) ? "fill-current" : "text-stone-200"} />
            ))}
          </div>
          <span className="text-[10px] text-stone-400">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
