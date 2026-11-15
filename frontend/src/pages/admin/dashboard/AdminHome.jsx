import React, { useEffect, useState } from "react";
import { Package, Users, ShoppingCart, DollarSign, AlertTriangle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../lib/axios";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Skeleton from "../../../components/ui/Skeleton";

export default function AdminHome() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/admin/dashboard");
      setStats(res.data?.data || null);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1">Real-time statistics & business performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Products</p>
              <p className="text-3xl font-black text-slate-900 mt-2">{stats?.totalProducts || 0}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Orders</p>
              <p className="text-3xl font-black text-slate-900 mt-2">{stats?.totalOrders || 0}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Customers</p>
              <p className="text-3xl font-black text-slate-900 mt-2">{stats?.totalUsers || 0}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Inventory</p>
              <p className="text-3xl font-black text-slate-900 mt-2">{stats?.totalStock || 0}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Customer Orders</h3>
            <p className="text-xs text-slate-500 mt-0.5">Latest order activity across the store</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Order ID</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Customer</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Items</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Total Amount</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/80 transition-colors text-sm">
                    <td className="px-6 py-4 font-mono font-bold text-slate-900">
                      {order._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{order.shippingInfo?.fullName || "Guest"}</div>
                      <div className="text-xs text-slate-500">{order.shippingInfo?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {order.items?.length || 0} items
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">
                      RS. {order.total?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          order.orderStatus === "delivered"
                            ? "success"
                            : order.orderStatus === "shipped"
                            ? "primary"
                            : order.orderStatus === "processing"
                            ? "warning"
                            : "default"
                        }
                      >
                        {order.orderStatus ? order.orderStatus.toUpperCase() : "PENDING"}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-slate-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}