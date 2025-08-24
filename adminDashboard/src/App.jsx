import { useState } from 'react'
import AdminHome from "./AdminPages/Dashboard/AdminHome";
import LayoutAdmin from "./AdminPages/pages/LayoutAdmin";
import ProtectedRoute from "./AdminPages/pages/AdminRoute";
import UserPage from "./AdminPages/components/UserPage";
import ListingPage from "./AdminPages/components/ListingPage";
import OrdersPage from "./AdminPages/components/OrdersPage";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "./context/useContent";
import { Loader } from "lucide-react";
import { useEffect } from 'react';
import SignUp from './AdminPages/pages/SignUp';
import Login from './AdminPages/pages/Login';
import Unauthorized from './AdminPages/pages/unauthorized/Unauthorized';
// import { Toaster } from "react-hot-toast";


function App() {
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
    <>
    <Routes >
      <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
      {/* Admin Routes */}
      <Route
          path="/" // Add this path
          element={
            <ProtectedRoute requiredRole="admin">
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
       </Route>
       </Routes>
    </>
  )
}

export default App
