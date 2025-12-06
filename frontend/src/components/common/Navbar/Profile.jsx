import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FiLogOut, FiUser, FiSettings, FiGrid, FiUsers } from "react-icons/fi";

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
        className="flex items-center justify-center w-10 h-10 rounded-full border border-stone-200 hover:border-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        <img
          className="w-full h-full rounded-full object-cover"
          src={
            authUser?.profilePic || 
            authUser?.avatar 
          }
          alt={authUser?.fullName || 'Profile'}
          onError={(e) => {
            // Fallback to UI Avatars if image fails to load
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.fullName || 'User')}&background=2C3E50&color=F2E8CF&size=128`;
          }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in-up">
          <div className="py-2">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-stone-100">
              <p className="text-sm font-medium text-primary truncate font-serif">
                {authUser?.fullName}
              </p>
              <p className="text-xs text-stone-500 truncate">
                {authUser?.email}
              </p>
              {role && (
                <span className="inline-block px-2 py-0.5 mt-2 text-[10px] font-bold uppercase tracking-wider text-accent bg-stone-50 rounded-full border border-stone-100">
                  {role}
                </span>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Link
                to="/profileUpdate"
                className="flex items-center px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-primary transition-colors duration-150"
                onClick={() => setIsOpen(false)}
              >
                <FiUser className="mr-3 text-stone-400" />
                View Profile
              </Link>

              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-primary transition-colors duration-150"
                onClick={() => setIsOpen(false)}
              >
                <FiSettings className="mr-3 text-stone-400" />
                Settings
              </Link>
            </div>

            {/* Admin Links - Only show if user is admin */}
            {role === 'admin' && (
              <div className="border-t border-stone-100 py-1">
                <p className="px-4 py-1 text-[10px] uppercase tracking-wider text-stone-400 font-medium">Admin</p>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-primary transition-colors duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  <FiGrid className="mr-3 text-stone-400" />
                  Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  className="flex items-center px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-primary transition-colors duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  <FiUsers className="mr-3 text-stone-400" />
                  Manage Users
                </Link>
              </div>
            )}

            {/* Logout */}
            <div className="border-t border-stone-100 py-1">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
              >
                <FiLogOut className="mr-3" />
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