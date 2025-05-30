import express from "express";
import bcrypt from "bcryptjs"; //encryption of pwd
import jwt from "jsonwebtoken";// token generation
import User from "../models/User.js";   // User model import

const router = express.Router();
console.log(router);
//  server side logs happening here  so they are visible on terminal.

// Register Route
router.post("/register", async (req, res) => {  //This creates a POST endpoint at /api/auth/register for user registration. in server.js
  console.log("Registering user", req.body);
  const { username, email, password } = req.body;
  try {
    // Check for Existing Users by username
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: "Username already taken" });
    
    // Also check for existing email 
    user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with default role "user"
    user = new User({ 
      username, 
      email, 
      password: hashedPassword,
      role: "user" // Make sure default role is set
    });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;  
  try {
    const user = await User.findOne({ username });
    //Error code 400 indicates a bad request, meaning the server could not understand the request due to invalid syntax.
    //In this case, it means that the username or password provided by the user is incorrect.
    if (!user) return res.status(400).json({ msg: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid username or password" });



    const payload = { userId: user._id, username: user.username, role: user.role };
    const token   = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    //isne token create kia hai with userId, username, and role as payload
    //process.env.JWT_SECRET is the secret key used to sign the token, and the token will expire in 1 hour.
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
