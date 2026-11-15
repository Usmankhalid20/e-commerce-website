import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export default function PublicOnlyRoute({ children }) {
  const { authUser, role, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (authUser) {
    if (['admin', 'superadmin'].includes(role)) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}
