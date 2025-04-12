const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    let user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ msg: "Username already taken" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;  
  
  try {
    const user = await User.findOne({ username });  
    if (!user) return res.status(400).json({ msg: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid username or password" });

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
module.exports = router;
