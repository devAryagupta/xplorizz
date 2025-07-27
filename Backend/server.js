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
  "http://localhost:3000"
];

// Set up cors options:
const corsOptions = {
  origin: (origin, callback) => {
    // If there is no origin (e.g. a curl call) or it's in the whitelist
    if (!origin || WHITELIST.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
};

// Use the cors middleware
app.use(cors(corsOptions));

// (Optional) Also handle OPTIONS requests explicitly
app.options("*", cors(corsOptions));

// Then proceed with JSON parsing and mounting routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2) mount your API routers
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", recommendationRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// 3) finally export or listen
export default app;
