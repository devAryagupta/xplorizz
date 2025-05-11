import express from "express";
import Destination from "../models/Destination.js";

const router = express.Router();

router.post("/recommendations", async (req, res) => {
  const { interest, budget, duration, location, season } = req.body;
  try {
    // Rule‑based matching:
    const query = {
      type: interest, // assuming interest maps to destination type
      "budget.min": { $lte: Number(budget) },
      "budget.max": { $gte: Number(budget) },
      idealDuration: { $lte: Number(duration) }
    };
    if (location) query.region = location;
    if (season) query.season = season;

    const destinations = await Destination.find(query);
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;