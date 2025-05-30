import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import BlogPage from "./Components/BlogPage/BlogPage";
import "./App.css";
import LocalGuideList from "./Components/GuideListing/LocalGuideList";
import GuideRoute from "./Utils/GuideRoute";
import GuideDashboard from "./Pages/GuideDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedRoute from "./Utils/ProtectedRoute";
import AdminRoute from "./Utils/AdminRoute";
import LoginForm from "./Components/LoginForm/LoginForm";
import ExperiencePage from "./Components/ExperiencePage/ExperiencePage";
import BookingsPage from "./Pages/BookingsPage";
import RegisterForm from "./Components/RegisterationForm/RegisterForm.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} /> 

        {/* Public Routes */}

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/guides" element={<LocalGuideList destination="India" />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/experiences" element={<ExperiencePage />} />
          <Route path="/bookings" element={<BookingsPage />} />

        </Route>


        {/* guide-only */}
        <Route element={<GuideRoute />}>
          <Route path="/guide" element={<GuideDashboard />} />
        </Route>

        {/* Admin Protected Route */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;