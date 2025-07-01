import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  month: { type: String, required: true }, // e.g. "2025-06"
  totalDelivered: { type: Number, default: 0 },
  pricePerMeal: { type: Number, default: 60 }, // Can be dynamic
  customCharges: { type: Number, default: 0 },
  totalAmount: { type: Number },
  paymentStatus: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
}, { timestamps: true });

export default mongoose.model("Bill", billSchema);
