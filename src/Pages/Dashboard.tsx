import React, { useEffect, useState } from "react";
import axios from "axios";

interface Destination {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
}

interface Booking {
  _id: string;
  guide: {
    _id: string;
    name: string;
    expertise: string;
    imageUrl?: string;
  };
  bookingDate: string;
  status: string;
}

interface UserProfile {
  username: string;
  email: string;
  profileImage?: string;
  preferences?: Record<string, any>;
  savedDestinations: Destination[];
  bookings: Booking[];
}

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!profile) return <p>No profile data found.</p>;

  return (
    <div className="dashboard p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="profile-info mb-6">
        <img
          src={profile.profileImage || "/default-profile.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <h3 className="text-xl font-semibold">{profile.username}</h3>
        <p>{profile.email}</p>
      </div>
      <div className="saved-destinations mb-6">
        <h3 className="text-xl font-bold mb-2">Saved Destinations</h3>
        {profile.savedDestinations.length === 0 ? (
          <p>No saved destinations.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.savedDestinations.map((dest) => (
              <div key={dest._id} className="destination-card border p-4 rounded">
                {dest.imageUrl && (
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-32 object-cover mb-2"
                  />
                )}
                <h4 className="font-semibold">{dest.name}</h4>
                <p className="text-sm">{dest.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bookings">
        <h3 className="text-xl font-bold mb-2">My Bookings</h3>
        {profile.bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {profile.bookings.map((booking) => (
              <div key={booking._id} className="booking-card border p-4 rounded">
                <h4 className="font-semibold">
                  Guide: {booking.guide.name}
                </h4>
                <p>Expertise: {booking.guide.expertise}</p>
                <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p>Status: {booking.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;