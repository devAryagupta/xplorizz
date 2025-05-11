import React, { useState } from "react";
import axios from "axios";
import "./BookingModal.css";

interface BookingModalProps {
  guideId: string;          // <-- accept guide’s _id
  guideName: string;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ guideId, guideName, onClose }) => {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [hours, setHours] = useState<number>(1);
  const [contact, setContact] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to continue.");
        return;
      }
      console.log("🔑 booking token:", token);

      await axios.post(
        "http://localhost:5000/api/bookings",
        { guideId, date, hours, contact },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Booking request sent to ${guideName}`);
      alert(`Booking request sent to ${guideName}!`);
      onClose();
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || err.message;
      alert(`Failed to submit booking: ${msg}`);
    }
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-content">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h3>Book Guide: {guideName}</h3>
        <form onSubmit={handleSubmit}>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
          <label>Hours</label>
          <input
            type="number"
            min={1}
            value={hours}
            onChange={e => setHours(Number(e.target.value))}
            required
          />
          <label>Contact</label>
          <input
            type="text"
            value={contact}
            onChange={e => setContact(e.target.value)}
            placeholder="Your phone or email"
            required
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;