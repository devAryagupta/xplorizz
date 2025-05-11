import express from "express";
import Review from "../models/Review.js";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// GET all reviews (admin or authenticated)
router.get("/", auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort("-createdAt");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/reviews/:id/approve (admin only)
router.put("/:id/approve", adminAuth, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!review) return res.status(404).json({ msg: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;