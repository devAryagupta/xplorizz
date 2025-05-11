import React, { useState } from "react";
import DestinationForm from "../Components/Admin/DestinationForm";
import BlogManagement from "../Components/Admin/BlogManagement";
import GuideManagement from "../Components/Admin/GuideManagement";
import ReviewsManagement from "../Components/Admin/ReviewsManagement";
import BookingsManagement from "../Components/Admin/BookingsManagement";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("destinations");
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "destinations":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Destinations</h2>
            <DestinationForm onSuccess={handleRefresh} />
            {/* Optionally, list destinations here */}
            <p>Destination management functionalities go here.</p>
          </div>
        );
      case "blogs":
        return <BlogManagement />;
      case "guides":
        return <GuideManagement />;
      case "reviews":
        return <ReviewsManagement />;
      case "bookings":
        return <BookingsManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex">
        <nav className="w-1/4">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveTab("destinations")}
                className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
              >
                Destinations
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("blogs")}
                className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
              >
                Blogs
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("guides")}
                className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
              >
                Local Guides
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("reviews")}
                className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
              >
                User Reviews
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("bookings")}
                className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
              >
                Bookings
              </button>
            </li>
          </ul>
        </nav>
        <div className="w-3/4 pl-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;