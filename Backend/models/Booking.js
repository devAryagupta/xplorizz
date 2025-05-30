import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guide:   { type: mongoose.Schema.Types.ObjectId, ref: "Guide", required: true },
  date:    { type: Date, required: true },
  hours:   { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status:  { type: String, enum: ["pending", "accepted", "declined", "completed"], default: "pending" },
    contact: {
    phone: { type: String },
    email: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
