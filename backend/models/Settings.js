import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  waterThreshold: { type: Number, default: 10 },
  cropsThreshold: { type: Number, default: 20 },
  updatedAt: { type: Date, default: Date.now }
});

const Settings = mongoose.model("Settings", SettingsSchema);
export default Settings;