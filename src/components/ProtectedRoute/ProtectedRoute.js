import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = ({ children }) => {
  const jwt = Cookies.get("jwt_token");
  if (jwt === undefined) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
