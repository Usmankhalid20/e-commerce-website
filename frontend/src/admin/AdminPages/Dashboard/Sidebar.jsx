import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiMenu } from "react-icons/fi";
import { FaListUl  } from "react-icons/fa";
import { LiaFirstOrder } from "react-icons/lia";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 text-white min-h-screen transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <span className={`${isOpen ? "block" : "hidden"} font-bold text-lg`}>
          My Dashboard
        </span>
        <FiMenu
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <nav className="mt-4">
        <Link
          to="/admin"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
        >
          <FiHome /> <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
        >
          <FiUsers /> <span className={`${isOpen ? "block" : "hidden"}`}>Users</span>
        </Link>

           <Link
          to="/admin/listing"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
        >
          <FaListUl /> <span className={`${isOpen ? "block" : "hidden"}`}>Listing</span>
        </Link>
        
        <Link
          to="/admin/orders"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
        >
          <LiaFirstOrder /> <span className={`${isOpen ? "block" : "hidden"}`}>Orders</span>
        </Link>

      </nav>
    </div>
  );
}
