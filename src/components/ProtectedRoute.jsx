
import { Navigate, useLocation } from "react-router-dom";
import { getDemoSession } from "../utils/demoAuth";

function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation();
  const user = getDemoSession();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Please sign in to access this page." }}
      />
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
