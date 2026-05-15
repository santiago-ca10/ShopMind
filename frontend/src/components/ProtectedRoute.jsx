import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  //  no logueado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //  validación de rol (admin, user, etc)
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;