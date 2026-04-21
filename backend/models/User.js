// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  type: String, // "government" or "tribal"
  employeeId: String,
  aadhaar: String,
  password: String
});
const User = mongoose.model("User", userSchema);
export default User;