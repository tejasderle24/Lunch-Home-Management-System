import TiffinRecord from "../models/TiffinRecord.Model.js";
import Client from "../models/Client.Model.js";

// Get clients for shift + date (and check if record exists)
export const getShiftClients = async (req, res) => {
  try {
    const { date, shift } = req.query;

    const clients = await Client.find({ shift, isActive: true });

    // check existing records
    const existing = await TiffinRecord.find({ date, shift });

    // match record status per client
    const result = clients.map((client) => {
      const record = existing.find(r => r.client.toString() === client._id.toString());
      return {
        client,
        isDelivered: record?.isDelivered || false,
        extraItems: record?.extraItems || "",
        notes: record?.notes || "",
      };
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching clients", error: err.message });
  }
};

// Save or Update records
export const saveTiffinRecords = async (req, res) => {
  try {
    const { date, shift, records } = req.body;

    for (let r of records) {
      await TiffinRecord.findOneAndUpdate(
        { date, shift, client: r.clientId },
        {
          isDelivered: r.isDelivered,
          extraItems: r.extraItems,
          notes: r.notes,
          client: r.clientId,
          date,
          shift
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: "Records saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving records", error: err.message });
  }
};
