import TiffinRecord from "../models/TiffinRecord.Model.js";
import Bill from "../models/Bill.Model.js";
import Client from "../models/Client.Model.js";

export const generateMonthlyBills = async (req, res) => {
  try {
    const { month, pricePerMeal } = req.body; // e.g., "2025-06"
    const clients = await Client.find({ isActive: true });

    for (let client of clients) {
      // Get count of delivered records
      const count = await TiffinRecord.countDocuments({
        client: client._id,
        isDelivered: true,
        date: { $regex: `^${month}` },
      });

      const totalAmount = count * pricePerMeal;

      await Bill.findOneAndUpdate(
        { client: client._id, month },
        {
          client: client._id,
          month,
          totalDelivered: count,
          pricePerMeal,
          totalAmount,
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: "Bills generated for " + month });
  } catch (err) {
    res.status(500).json({ message: "Billing error", error: err.message });
  }
};

export const getAllBills = async (req, res) => {
  try {
    const { month } = req.query;
    const bills = await Bill.find(month ? { month } : {}).populate("client");
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ message: "Bill fetch error", error: err.message });
  }
};

export const updateBillStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, customCharges } = req.body;

    const bill = await Bill.findById(id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    if (customCharges != null) {
      bill.customCharges = customCharges;
      bill.totalAmount = (bill.totalDelivered * bill.pricePerMeal) + customCharges;
    }

    if (paymentStatus) bill.paymentStatus = paymentStatus;

    await bill.save();
    res.status(200).json({ message: "Bill updated", bill });
  } catch (err) {
    res.status(500).json({ message: "Update error", error: err.message });
  }
};
