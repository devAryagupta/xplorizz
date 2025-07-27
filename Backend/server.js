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

// whitelist the two hosts you actually use
const WHITELIST = [
  "https://xplorizz.netlify.app",
  "http://localhost:3000"
];

// configure CORS options to allow whitelisted origins and reflect origin for credentialed requests
const corsOptions = {
  origin: (origin, callback) => {
    // allow requests without origin (e.g., curl or server-to-server)
    if (!origin || WHITELIST.includes(origin)) {
      // callback with true to reflect the request origin
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true
};
// apply CORS middleware and enable preflight across all routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", recommendationRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
