import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional: For icons, or use any SVG

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="text-black p-4 shadow bg-white fixed w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-600">
          OneDrop
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/shop" className="hover:text-blue-600">Shop</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          <Link to="/cart" className="hover:text-blue-600">Cart</Link>
          <Link to="/login" className="hover:text-blue-600">Login</Link>
        </nav>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
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
          <Link to="/cart" onClick={toggleMenu} className="block hover:text-blue-600">Cart</Link>
          <Link to="/login" onClick={toggleMenu} className="block hover:text-blue-600">Login</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
