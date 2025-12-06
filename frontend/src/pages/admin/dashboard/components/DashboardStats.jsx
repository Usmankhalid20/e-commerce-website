import React from "react";
import { Users, UserCog, Package, ShoppingBag } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon={Users}
        color="bg-blue-500"
      />
      <StatCard
        title="Total Admins"
        value={stats.totalAdmins}
        icon={UserCog}
        color="bg-purple-500"
      />
      <StatCard
        title="Total Products"
        value={stats.totalProducts}
        icon={Package}
        color="bg-orange-500"
      />
      <StatCard
        title="Total Stock"
        value={stats.totalStock}
        icon={ShoppingBag}
        color="bg-green-500"
      />
    </div>
  );
}
