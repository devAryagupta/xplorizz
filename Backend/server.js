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

// for every request (including OPTIONS preflight)…
app.use(
  cors({
    origin: (origin, callback) => {
      // allow non‐web (curl, mobile) or any whitelisted host
      if (!origin || WHITELIST.includes(origin)) {
        // reflect the request origin in the CORS header
        return callback(null, origin || "*");
      }
      callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"]
  })
);

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
