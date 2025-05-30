import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute: React.FC = () => {
  const token = sessionStorage.getItem("token");
  // Assume the user role is stored in localStorage as "role"
  const userRole = sessionStorage.getItem("role");

  if (!token || userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default AdminRoute;