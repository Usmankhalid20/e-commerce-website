import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const { authUser, role, isCheckingAuth } = useAuth();
  
  // ADD THESE DEBUG LOGS
  console.log('🔐 ProtectedRoute Debug:');
  console.log('authUser:', authUser);
  console.log('role:', role);
  console.log('requiredRole:', requiredRole);
  console.log('isCheckingAuth:', isCheckingAuth);
  
  if (isCheckingAuth) return <div>Loading...</div>;
  
  if (!authUser) return <Navigate to="/login" />;
  
  if (requiredRole && role !== requiredRole) {
    console.log('❌ Access denied - redirecting to /unauthorized');
    return <Navigate to="/unauthorized" />;
  }
  
  console.log('✅ Access granted - rendering children');
  return children;
}