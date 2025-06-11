import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookingsPage.css";

interface Booking {
  _id: string;
  bookingDate?: string;         // from User.bookings
  date?: string;                // if you switch to Booking model
  hours?: number;
  totalPrice?: number;
  status: string;
  guide: {
    _id: string;
    name: string;
    expertise: string;
    contactInfo?: { email: string; phone: string };
    profilePhoto?: string;
  };
}

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = sessionStorage.getItem("token");
        // hit your userRoutes GET /api/users/bookings
        const { data } = await axios.get(
          "/api/users/bookings",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(data);
      } catch (err) {
        console.error("Failed to load bookings", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="loading">Loading your bookings…</p>;
  if (bookings.length === 0) return <p className="empty">You have no bookings yet.</p>;

  return (
    <div className="bookings-page">
      <h2>My Bookings</h2>
      <div className="booking-grid">
        {bookings.map((b) => (
          <div key={b._id} className="booking-card">
            {b.guide.profilePhoto && (
              <img
                src={b.guide.profilePhoto}
                alt={b.guide.name}
                className="booking-avatar"
              />
            )}
            <div className="booking-info">
              <h3>{b.guide.name}</h3>
              <p className="expertise">{b.guide.expertise}</p>
              {b.date && <p>Date: {new Date(b.date).toLocaleDateString()}</p>}
              {b.hours && <p>Hours: {b.hours}</p>}
              {b.totalPrice && <p>Total: ₹{b.totalPrice}</p>}
              <p className={`status ${b.status}`}>Status: {b.status}</p>
              {b.guide.contactInfo?.phone && (
                <p>Contact: {b.guide.contactInfo.phone}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;