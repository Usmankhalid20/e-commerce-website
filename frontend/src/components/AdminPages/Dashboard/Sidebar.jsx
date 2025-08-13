import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiSettings, FiMenu } from "react-icons/fi";

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
          to="/"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
        >
          <FiHome /> <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
        </Link>
        <Link
          to="/users"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
        >
          <FiUsers /> <span className={`${isOpen ? "block" : "hidden"}`}>Users</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
        >
          <FiSettings />{" "}
          <span className={`${isOpen ? "block" : "hidden"}`}>Settings</span>
        </Link>
      </nav>
    </div>
  );
}
