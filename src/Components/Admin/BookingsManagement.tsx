import React, { useEffect, useState } from "react";
import axios from "axios";

interface Booking {
  _id: string;
  user: { username: string; email: string };
  guide: { name: string };
  date: string;
  hours: number;
    contact: { phone?: string; email?: string }; 
  status: string;
}

const BookingsManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBookings = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Admin not authenticated.");
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get<Booking[]>(
          "http://localhost:5000/api/bookings/all",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings…</p>;
  if (error)   return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Bookings</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1">User</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Guide</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Hours</th>
            <th className="border px-2 py-1">Contact</th>
            <th className="border px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td className="border px-2 py-1">{b.user.username}</td>
              <td className="border px-2 py-1">{b.user.email}</td>
              <td className="border px-2 py-1">{b.guide.name}</td>
              <td className="border px-2 py-1">
                {new Date(b.date).toLocaleDateString()}
              </td>
              <td className="border px-2 py-1">{b.hours}</td>
              <td className="border px-2 py-1">
  {b.contact
    ? [b.contact.phone, b.contact.email].filter(Boolean).join(" / ")
    : "-"}
</td>
              <td className="border px-2 py-1">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsManagement;