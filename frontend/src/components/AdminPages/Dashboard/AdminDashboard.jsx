import React from "react";
import Sidebar from "./Sidebar";
import Authentication from "./Authentication";

export default function AdminDashboard() {
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
