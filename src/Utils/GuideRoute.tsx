import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuideRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  const role  = localStorage.getItem("role");
  if (!token || role !== "guide") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default GuideRoute;