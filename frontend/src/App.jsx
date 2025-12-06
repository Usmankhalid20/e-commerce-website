import React from "react";
import LayoutUser from "./layouts/LayoutUser";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import { useAuth } from "./context/AuthContext";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import ProtectedRoute from "./lib/ProtectedRoute";
import ProfileUpdate from "./components/common/Navbar/ProfileUpdate";
import AdminHome from "./pages/admin/dashboard/AdminHome";
import LayoutAdmin from "./layouts/LayoutAdmin";
import UserPage from "./components/admin/UserPage";
import ListingPage from "./components/admin/ListingPage";
import OrdersPage from "./components/admin/OrdersPage";
import Unauthorized from "./pages/admin/auth/Unauthorized";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
  <div>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    <Routes>
        {/* Public Routes */}
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />

        {/* Protected User Routes */}
       <Route
          element={
            <ProtectedRoute>
              <LayoutUser />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/profileUpdate" element={<ProfileUpdate />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserPage />} />
          <Route path="listing" element={<ListingPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
 
    
  </Routes>
    </div>
  );
};

export default App;
