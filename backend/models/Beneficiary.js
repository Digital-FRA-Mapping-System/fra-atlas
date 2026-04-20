import mongoose from "mongoose";

const BeneficiarySchema = new mongoose.Schema({
  name: String,
  village: String,
  aadhaar: String,
  claim_id: String,
  status: {
    type: String,
    default: "Pending"
  }
});

export default mongoose.model("Beneficiary", BeneficiarySchema);