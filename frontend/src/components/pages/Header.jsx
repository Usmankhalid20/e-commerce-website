import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className=" text-black p-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-blue-200">
          OneDrop
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline hover:text-blue-200">
            Home
          </Link>
          <Link to="/users" className="hover:underline hover:text-blue-200">
            Users
          </Link>
          <Link to="/login" className="hover:underline hover:text-blue-200">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;