import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Guide from "../models/Guide.js";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// POST /api/bookings — user creates a booking request
router.post("/", auth, async (req, res) => {
  try {
    const { guideId, date, hours, contact } = req.body;
    const guide = await Guide.findById(guideId);
    if (!guide) return res.status(404).json({ msg: "Guide not found" });

    const bookingDate = new Date(date);
    const totalPrice = guide.pricePerHour * Number(hours);

    // 3) create the single Booking doc
    const booking = await Booking.create({
      user:       req.user.userId,
      guide:      guideId,
      date:       bookingDate,
      hours,
      totalPrice,
      contact
    });

    // 4) push that booking._id into the User.bookings and Guide.bookings arrays
    await Promise.all([
      User.findByIdAndUpdate(req.user.userId,  { $push: { bookings: booking._id } }),
      Guide.findByIdAndUpdate(guideId,          { $push: { bookings: booking._id } })
    ]);

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking creation failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings/guide — list all bookings for the logged-in guide
router.get("/guide", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ guide: req.user.userId })
      .populate("user", "username email")
      .populate("guide", "name");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings/all — admin: get all bookings
router.get("/all", adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "username email")
      .populate("guide", "name");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/bookings/:id/status — accept or decline a booking
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });
    if (booking.guide.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Forbidden" });
    }
    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;