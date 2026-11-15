import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import PageLoader from "../../components/shared/PageLoader";

const LayoutUser = lazy(() => import("../../layouts/LayoutUser"));
const LayoutAdmin = lazy(() => import("../../layouts/LayoutAdmin"));

const Home = lazy(() => import("../../pages/Home"));
const About = lazy(() => import("../../pages/About"));
const Shop = lazy(() => import("../../pages/Shop"));
const ProductPage = lazy(() => import("../../pages/ProductPage"));
const Contact = lazy(() => import("../../pages/Contact"));
const Cart = lazy(() => import("../../pages/Cart"));
const CheckOut = lazy(() => import("../../pages/CheckOut"));
const Login = lazy(() => import("../../pages/auth/Login"));
const SignUp = lazy(() => import("../../pages/auth/SignUp"));
const ProfileUpdate = lazy(() => import("../../components/common/Navbar/ProfileUpdate"));
const AdminHome = lazy(() => import("../../pages/admin/dashboard/AdminHome"));
const UserPage = lazy(() => import("../../components/admin/UserPage"));
const ListingPage = lazy(() => import("../../components/admin/ListingPage"));
const OrdersPage = lazy(() => import("../../components/admin/OrdersPage"));
const Unauthorized = lazy(() => import("../../pages/admin/auth/Unauthorized"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Auth Routes — Public Only */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route path="/admin/unauthorized" element={<Unauthorized />} />

        {/* Public Store Routes */}
        <Route element={<LayoutUser />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Customer Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/profileUpdate" element={<ProfileUpdate />} />
          </Route>
        </Route>

        {/* Admin Portal Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <LayoutAdmin />
            </AdminRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserPage />} />
          <Route path="listing" element={<ListingPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
