import React from "react";
import LayoutUser from "./components/Navbar/LayoutUser";
import Home from "./components/pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import { useAuth } from "./components/context/AuthContext";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Shop from "./components/pages/Shop";
import ProductPage from "./components/pages/ProductPage";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Cart from "./components/pages/Cart";
import CheckOut from "./components/pages/CheckOut";
import AdminHome from "./components/AdminPages/Dashboard/AdminHome";
import LayoutAdmin from "./components/AdminPages/pages/Admin_page/LayoutAdmin";
import ProtectedRoute from "./components/lib/AdminRoute";
import UserPage from "./components/AdminPages/components/UserPage";
import ListingPage from "./components/AdminPages/components/ListingPage";
import OrdersPage from "./components/AdminPages/components/OrdersPage";

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
        </Route>
 
    {/* Admin Routes */}
      <Route
          path="/admin" // Add this path
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
          
       </Route>
  </Routes>
    </div>
  );
};

export default App;
