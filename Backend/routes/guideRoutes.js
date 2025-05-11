import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Guide from "../models/Guide.js";

const router = express.Router();

// Example endpoint: /api/guides?destination=xyz&language=English&maxPrice=50
router.get("/", async (req, res) => {
  const { destination, language, maxPrice } = req.query;
  try {
    const query = {};
    if (destination) {
      query.destinationsCovered = destination;
    }
    if (language) {
      query.languages = language;
    }
    if (maxPrice) {
      query.pricePerHour = { $lte: Number(maxPrice) };
    }
    const guides = await Guide.find(query);
    res.json(guides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/guides/register
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      name,
      expertise,
      languages,
      destinationsCovered,
      contactInfo,
      pricePerHour,
      profilePhoto, // ← pull it out of the request
    } = req.body;

    // 1) make sure email/username free
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    // 2) hash password, create User
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hash,
      role: "guide",
    });

    // 3) create Guide profile
    await Guide.create({
      user: user._id,
      name,
      expertise,
      languages,
      destinationsCovered,
      contactInfo,
      pricePerHour,
      profilePhoto,
    });

    res.status(201).json({ msg: "Guide registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;