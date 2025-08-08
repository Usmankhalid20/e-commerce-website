import React from "react";
import Layout from "./components/Navbar/Layout";
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
// import Cart from "./components/pages/Cart";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuth();
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
    )
  }
  
  return (
    <div>
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ?<Login /> : <Navigate to="/" />} />
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={ <Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Route>
    </Routes>
    </div>
  );
};

export default App;
