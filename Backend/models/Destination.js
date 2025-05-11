import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., "Adventure", "Wildlife", etc.
  activities: [String],
  budget: { 
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  idealDuration: { type: Number, required: true }, // in days
  region: { type: String },
  season: { type: String },
  imageUrl: { type: String },
  description: { type: String }
});

export default mongoose.model("Destination", destinationSchema);