import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema({
  claim_id: String,
  village: String,
  land_data: {
    water: Number,
    crops: Number,
    trees: Number
  },
  status: { type: String, default: "Pending" },
  reason: { type: String, default: "" },
  suggestions: [String]
});

export default mongoose.model("Claim", ClaimSchema);