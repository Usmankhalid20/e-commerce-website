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
import AdminRoute from "./components/AdminPages/Dashboard/AdminRoute";
import AdminDashboard from "./components/AdminPages/Dashboard/AdminDashboard";
import LayoutAdmin from "./components/AdminPages/pages/Admin_page/AdminNavbar";
import AdminNavbar from "./components/AdminPages/pages/Admin_page/AdminNavbar";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, role } = useAuth();
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
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route element={  <LayoutUser /> }>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <>
                <LayoutAdmin />
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
