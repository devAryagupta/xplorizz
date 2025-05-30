import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuideRoute: React.FC = () => {
  const token = sessionStorage.getItem("token");
  const role  = sessionStorage.getItem("role");
  if (!token || role !== "guide") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default GuideRoute;