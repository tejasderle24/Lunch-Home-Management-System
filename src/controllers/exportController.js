import TiffinRecord from "../models/TiffinRecord.Model.js";
import Client from "../models/Client.Model.js";
import { Parser } from "json2csv";

export const exportTiffinCSV = async (req, res) => {
  try {
    const { date, shift } = req.query;
    const records = await TiffinRecord.find({ date, shift }).populate("client");

    const data = records.map(r => ({
      Name: r.client.name,
      Phone: r.client.phone,
      Address: r.client.address,
      Shift: shift,
      Delivered: r.isDelivered ? "Yes" : "No",
      Extra: r.extraItems,
      Notes: r.notes
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment(`tiffin_${date}_${shift}.csv`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "CSV export error", error: err.message });
  }
};
