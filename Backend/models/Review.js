import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user:    { type: String, required: true },
  content: { type: String, required: true },
  approved:{ type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);