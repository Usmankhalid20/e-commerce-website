import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaCartShopping } from "react-icons/fa6";
import ShoppingCart from "../pages/ShoppingCart";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // ✅ Get cart from context
  const cart = useAuth((state) => state.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="text-black p-4 shadow bg-white fixed w-full z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-blue-600">
            OneDrop
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 font-medium items-center">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/shop" className="hover:text-blue-600">Shop</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>

            {/* Cart Icon */}
            <button
              type="button"
              className="relative inline-flex items-center hover:text-blue-600"
              onClick={toggleCart}
            >
              <FaCartShopping className="text-2xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <Link to="/login" className="hover:text-blue-600">Login</Link>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-300 shadow-md px-6 py-4 space-y-3 text-center">
            <Link to="/" onClick={toggleMenu} className="block hover:text-blue-600">Home</Link>
            <Link to="/shop" onClick={toggleMenu} className="block hover:text-blue-600">Shop</Link>
            <Link to="/about" onClick={toggleMenu} className="block hover:text-blue-600">About</Link>
            <Link to="/contact" onClick={toggleMenu} className="block hover:text-blue-600">Contact</Link>

            {/* Mobile Cart Button */}
            <button
              onClick={() => { toggleCart(); toggleMenu(); }}
              className="block hover:text-blue-600 w-full text-center "
            >
              Shopping Cart ({cartItemCount})
            </button>

            <Link to="/login" onClick={toggleMenu} className="block hover:text-blue-600">Login</Link>
          </div>
        )}

        {/* Cart Drawer */}
        {isCartOpen && (
          <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        )}
      </header>
    </>
  );
};

export default Header;
