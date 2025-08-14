import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Authentication() {
  // ALL HOOKS MUST BE CALLED FIRST - NEVER CONDITIONALLY!
  const { authUser, role, Dashboard, isCheckingAuth } = useAuth();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // ALL useEffect hooks must be called on every render
  useEffect(() => {
    if (!isCheckingAuth) {
      setIsLoading(false);
    }
  }, [isCheckingAuth]);

  useEffect(() => {
    if (role === "admin" && authUser && !isCheckingAuth) {
      const fetchData = async () => {
        try {
          console.log("Fetching admin dashboard data...");
          const res = await Dashboard();
          console.log("Dashboard response:", res);
          
          if (res?.message) {
            setMessage(res.message);
          } else {
            setMessage("Welcome to Admin Dashboard");
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          setMessage("Error loading dashboard data");
        }
      };
      
      fetchData();
    }
  }, [Dashboard, role, authUser, isCheckingAuth]);

  // NOW we can do conditional rendering AFTER all hooks are called
  if (isLoading || isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
          <p className="text-sm text-gray-400 mt-2">Role: {role || "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Required 🔒</h1>
          <p className="text-gray-600 mb-4">Please log in to access the admin dashboard.</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied 🚫</h1>
          <p className="text-gray-600 mb-2">You do not have admin privileges to view this page.</p>
          <p className="text-sm text-gray-400 mb-4">
            Current role: <span className="font-semibold">{role || "No role assigned"}</span>
          </p>
          <div className="space-x-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Content */}
      <main className="container mx-auto p-6">
        <div className="w-[600px] bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {message || "Loading..."}
          </h2>
          <p className="text-gray-600 mb-6">
            This is your admin control panel. From here, you can manage users, view statistics, and configure settings.
          </p>
          
          
        </div>
      </main>
    </div>
  );
}