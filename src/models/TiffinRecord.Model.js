import mongoose from "mongoose";

const tiffinRecordSchema = new mongoose.Schema({
  date: { type: String, required: true }, // e.g., "2025-06-30"
  shift: { type: String, enum: ["Morning", "Night"], required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  isDelivered: { type: Boolean, default: false },
  extraItems: { type: String }, // e.g., "2 extra rotis"
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model("TiffinRecord", tiffinRecordSchema);
