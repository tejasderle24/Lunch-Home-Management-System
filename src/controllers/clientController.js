import Client from "../models/Client.Model.js";

// Create Client
export const addClient = async (req, res) => {
  try {
    const { name, phone, address, shift, serviceType } = req.body;
    const client = new Client({
      name,
      phone,
      address,
      shift,
      serviceType,
      createdBy: req.user.userId
    });
    await client.save();
    res.status(201).json({ message: "Client added", client });
  } catch (error) {
    res.status(500).json({ message: "Error adding client", error: error.message });
  }
};

// Get All Clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error: error.message });
  }
};

// Delete Client
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await Client.findByIdAndDelete(id);
    res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete error", error: error.message });
  }
};
