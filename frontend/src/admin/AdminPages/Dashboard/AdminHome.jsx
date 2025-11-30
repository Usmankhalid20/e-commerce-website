import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/context/AuthContext";
import axiosInstance from "../../../components/lib/axios";
import DashboardStats from "./components/DashboardStats";
import DashboardCharts from "./components/DashboardCharts";

export default function AdminHome() {
  const { authUser, role, isCheckingAuth } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalStock: 0,
    totalProducts: 0,
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!authUser) {
        navigate("/login");
      } else if (role !== "admin") {
        // Handle non-admin access if needed, though protectRoute should handle it
        setIsLoading(false);
      } else {
        fetchDashboardData();
      }
    }
  }, [isCheckingAuth, authUser, role, navigate]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [usersRes, productsRes] = await Promise.all([
        axiosInstance.get("/auth/getusers"),
        axiosInstance.get("/adminAuth/products"),
      ]);

      const users = usersRes.data || [];
      const allProducts = productsRes.data || [];

      // Calculate stats
      const totalUsers = users.length;
      const totalAdmins = users.filter((u) => u.role === "admin").length;
      const totalStock = allProducts.reduce((acc, p) => acc + (p.inStock || 0), 0);
      const totalProducts = allProducts.length;

      setStats({
        totalUsers,
        totalAdmins,
        totalStock,
        totalProducts,
      });
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied 🚫</h1>
          <p className="text-gray-600">You do not have admin privileges.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        
        <DashboardStats stats={stats} />
        
        <DashboardCharts stats={stats} products={products} />

        {/* Recent Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">New Product Listings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 5)
                  .map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="font-medium text-gray-900">{product.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">${product.price}</td>
                      <td className="px-6 py-4 text-gray-600">{product.inStock}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            product.inStock > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.inStock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}