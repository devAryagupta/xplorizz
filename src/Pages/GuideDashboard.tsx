import React, { useEffect, useState } from "react";
import axios from "axios";

interface Booking {
  _id: string;
  user:  { username: string; email: string };
  date:   string;
  hours:  number;
  totalPrice: number;
  status: string;
}

const GuideDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "/api/bookings/guide",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "accepted" | "declined") => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.put(
        `/api/bookings/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings…</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li key={b._id} className="p-4 border rounded">
              <p><strong>User:</strong> {b.user.username} ({b.user.email})</p>
              <p><strong>Date:</strong> {new Date(b.date).toLocaleString()}</p>
              <p>
                <strong>Hours:</strong> {b.hours} –{" "}
                <strong>Total:</strong> ₹{b.totalPrice}
              </p>
              <p><strong>Status:</strong> {b.status}</p>
              {b.status === "pending" && (
                <div className="mt-2">
                  <button
                    onClick={() => updateStatus(b._id, "accepted")}
                    className="mr-2 px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(b._id, "declined")}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Decline
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuideDashboard;