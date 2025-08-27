import React, { useState, useRef, useEffect } from 'react'; // ✅ Added missing imports
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const { authUser, role, Logout } = useAuth();

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await Logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Profile Image Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={
            authUser?.profilePic || 
            authUser?.avatar 
          }
          alt={authUser?.fullName || 'Profile'}
          onError={(e) => {
            // Fallback to UI Avatars if image fails to load
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.fullName || 'User')}&background=3b82f6&color=white&size=128`;
          }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* User Info */}
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">
                {authUser?.fullName}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {authUser?.email}
              </p>
              {role && (
                <span className="inline-block px-2 py-1 mt-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                  {role}
                </span>
              )}
            </div>

            {/* Menu Items */}
            <Link
              to="/profileUpdate"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              View Profile
            </Link>

            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>

            {/* Admin Links - Only show if user is admin */}
            {role === 'admin' && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  Manage Users
                </Link>
              </>
            )}

            {/* Logout */}
            <div className="border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
              >
                <FiLogOut className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;