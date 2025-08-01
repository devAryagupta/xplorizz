import express from "express";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get user profile (with saved destinations and bookings)
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate("savedDestinations")
      .populate("bookings.guide");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true })
      .populate("savedDestinations")
      .populate("bookings.guide");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's bookings history
router.get("/bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking
      .find({ user: req.user.userId })
      .populate("guide", "name expertise contactInfo profilePhoto")
      .sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;