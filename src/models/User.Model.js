import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,
  role: { type: String, enum: ["admin", "kitchen", "client"], default: "client" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
