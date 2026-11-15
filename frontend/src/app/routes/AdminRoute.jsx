import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export default function AdminRoute({ children }) {
  const { authUser, role, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // Case 1: Unauthenticated -> Redirect to Login with state return URL
  if (!authUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Case 2: Authenticated but not Admin/Superadmin -> Redirect to Unauthorized / 403
  if (!['admin', 'superadmin'].includes(role)) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  // Case 3 & 4: Admin -> Render Admin layout/outlet
  return children ? children : <Outlet />;
}
