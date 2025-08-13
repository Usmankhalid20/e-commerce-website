import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const { authUser, role, isCheckingAuth } = useAuth();
  
  if (isCheckingAuth) return <div>Loading...</div>;
  
  if (!authUser) return <Navigate to="/login" />;
  
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
}