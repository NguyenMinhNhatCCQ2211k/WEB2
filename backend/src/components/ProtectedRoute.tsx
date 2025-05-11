import { Navigate, Outlet } from "react-router";


export default function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("authToken"); 

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}