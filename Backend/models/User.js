import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["user", "guide", "admin"], default: "user" },
  profileImage: { type: String },
  preferences: { type: Object },
  savedDestinations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Destination" }],
  bookings: [{
    bookings: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, default: "pending" }
  }]
});

export default mongoose.model("User", UserSchema);
