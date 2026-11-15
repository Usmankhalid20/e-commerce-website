import { useAuthStore } from "../store/useAuthStore";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children, requiredRole }) {
  const { authUser, role, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin text-stone-500" />
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return children ?? <Outlet />;
}
