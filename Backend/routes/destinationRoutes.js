import express from "express";
import Destination from "../models/Destination.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Create a new destination (Admin only)
router.post("/", adminAuth, async (req, res) => {
  try {
    const newDestination = await Destination.create(req.body);
    res.status(201).json(newDestination);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update a destination (Admin only)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDestination) return res.status(404).json({ msg: "Destination not found" });
    res.json(updatedDestination);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete a destination (Admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
    if (!deletedDestination) return res.status(404).json({ msg: "Destination not found" });
    res.json({ msg: "Destination deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Public: Get all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;