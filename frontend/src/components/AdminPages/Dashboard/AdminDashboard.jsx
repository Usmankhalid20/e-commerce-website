import React from "react";
import Sidebar from "./Sidebar";
import Header from "../pages/Admin_page/AdminNavbar";
import Authentication from './Authentication'

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen bg-gray-100">
        <main className="flex-1">
          <Authentication />
        </main>
      </div>
    </div>
  );
}
