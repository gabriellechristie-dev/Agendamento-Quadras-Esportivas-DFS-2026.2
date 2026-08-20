import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, allowedTypes }) {
  
  const { isAuthenticated, tipo } = useAuth();

 
  const location = useLocation();

 
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  
  if (allowedTypes && !allowedTypes.includes(tipo)) {
    return <Navigate to="/" replace />;
  }

 
  return children;
}