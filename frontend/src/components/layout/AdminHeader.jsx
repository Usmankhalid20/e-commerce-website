import React from "react";
import { Menu, ExternalLink, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function AdminHeader({ setMobileOpen }) {
  const { authUser, role } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 hidden sm:block">
          Admin Portal
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-gray-200 transition-colors font-medium"
        >
          <span>View Public Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="h-6 w-px bg-gray-200" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            {authUser?.fullName?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-gray-800 leading-tight">
              {authUser?.fullName}
            </p>
            <p className="text-[10px] text-gray-500 capitalize">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
