import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Profile from "../Navbar/Profile";
import Button from "../UI/Button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { authUser, cart } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isOpen ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-primary">
          OneDrop<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path 
                  ? "text-accent" 
                  : "text-stone-600 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-stone-600 hover:text-primary transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>

          <Link to="/cart" className="text-stone-600 hover:text-primary transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          
          <div className="h-4 w-px bg-stone-300"></div>
          
          {authUser ? (
             <div className="pl-2">
               <Profile />
             </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-stone-600 hover:text-primary">
                Login
              </Link>
              <Button to="/shop" variant="primary" size="sm">
                Shop Now
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
           <button className="text-stone-600 hover:text-primary">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link to="/cart" className="text-stone-600 hover:text-primary relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu} className="text-primary focus:outline-none">
            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-stone-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8 space-y-6 flex flex-col items-center text-center">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`text-lg font-medium ${
                location.pathname === link.path ? "text-accent" : "text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="w-12 h-px bg-stone-200 my-2"></div>
          
          {authUser ? (
             <div className="flex flex-col items-center gap-4">
                 <span className="text-sm text-stone-500">Welcome back!</span>
                 <Profile />
             </div>
          ) : (
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <Link to="/login" className="text-stone-600 font-medium py-2">
                Login
              </Link>
              <Button to="/shop" variant="primary" className="w-full">
                Shop Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
