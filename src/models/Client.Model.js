import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  shift: { type: String, enum: ["Morning", "Night"], required: true },
  serviceType: { type: String, enum: ["Tiffin", "Plate", "Parcel"], required: true },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Client", clientSchema);
