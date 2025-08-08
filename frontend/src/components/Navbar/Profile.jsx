import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-center " ref={dropdownRef}>
      {/* Avatar Button */}
      <img
        onClick={() => setIsOpen(!isOpen)}
        id="avatarButton"
        type="button"
        className="w-10 h-10 rounded-full cursor-pointer"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF_xXMYRNugAnQWuh9DIUNNC6SwVDuYHJTqQ&s"
        alt="User dropdown"
      />

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="userDropdown"
          className="absolute z-10 mt-2  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
            </li>
            <li>
              <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
            </li>
            <li>
              <Link to="/earnings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
            </li>
          </ul>
          <div className="py-1">
            <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
