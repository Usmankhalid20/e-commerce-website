import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../components/context/AuthContext';
import { FiLogOut } from "react-icons/fi";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const { authUser, role, Logout } = useAuth(); // ✅ role added

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-center" ref={dropdownRef}>
      {/* Avatar Button */}
      <img
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF_xXMYRNugAnQWuh9DIUNNC6SwVDuYHJTqQ&s"
        alt="User dropdown"
      />

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 max-w-[90vw] bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 z-50"
        >
          {/* User Info */}
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-semibold">{authUser?.name}</div>
            <div className="text-xs truncate">{authUser?.email}</div>
            <span className="text-xs text-gray-500">Role: {role}</span>
          </div>

          {/* Links */}
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Dashboard</Link>
            </li>
            <li>
              <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Settings</Link>
            </li>
            <li>
              <Link to="/earnings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Earnings</Link>
            </li>
          </ul>

          {/* Logout */}
          <div className="py-2 px-4">
            <button
              onClick={Logout}
              className="flex items-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm justify-center"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
