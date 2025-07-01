import TiffinRecord from "../models/TiffinRecord.Model.js";
import Client from "../models/Client.Model.js";

export const getKitchenSummary = async (req, res) => {
  try {
    const { date, shift } = req.query;

    // Fetch all records for date & shift
    const records = await TiffinRecord.find({ date, shift }).populate("client");

    // Group by service type
    const summary = {
      Tiffin: [],
      Plate: [],
      Parcel: [],
      totals: {
        Tiffin: 0,
        Plate: 0,
        Parcel: 0
      }
    };

    for (const record of records) {
      const type = record.client.serviceType;
      summary[type].push({
        name: record.client.name,
        address: record.client.address,
        phone: record.client.phone,
        extraItems: record.extraItems,
        notes: record.notes,
        isDelivered: record.isDelivered,
      });
      summary.totals[type]++;
    }

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: "Kitchen summary fetch error", error: err.message });
  }
};
