import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  languages: [String],
  destinationsCovered: [String],
  availability: { type: Boolean, default: true },
  contactInfo: {
    email: String,
    phone: String,
  },
  pricePerHour: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  profilePhoto: { type: String, default: "" },
});

export default mongoose.model("Guide", guideSchema);