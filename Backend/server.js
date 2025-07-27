import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import guideRoutes from "./routes/guideRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
connectDB();

const app = express();

const WHITELIST = [
  "https://xplorizz.netlify.app",
  "https://xplorizz-backend.vercel.app",
  "http://localhost:3000"
];

// Set up cors options:
const corsOptions = {
  origin: (origin, callback) => {
    console.log("Request origin:", origin); // Debug log
    // If there is no origin (e.g. a curl call) or it's in the whitelist
    if (!origin || WHITELIST.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin); // Debug log
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "X-Requested-With",
    "Accept",
    "Origin"
  ]
};

// Use the cors middleware
app.use(cors(corsOptions));

// Explicit OPTIONS handler for preflight requests
app.options("*", cors(corsOptions));

// Additional CORS middleware for Vercel
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (WHITELIST.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
  
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

// Then proceed with JSON parsing and mounting routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Xplorizz Backend API is running!" });
});

// Debug CORS endpoint
app.get("/api/debug/cors", (req, res) => {
  res.json({ 
    message: "CORS is working!",
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// 2) mount your API routers
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", recommendationRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS policy violation" });
  }
  res.status(500).json({ error: "Internal server error" });
});

// Handle 404
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// 3) finally export or listen
export default app;
