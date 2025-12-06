import React from "react";
import AdminNavbar from "../pages/admin/AdminNavbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/admin/dashboard/Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <AdminNavbar />

      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
