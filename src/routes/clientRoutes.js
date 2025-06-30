import express from "express";
import { addClient, getClients, deleteClient } from "../controllers/clientController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addClient);
router.get("/", protect, getClients);
router.delete("/:id", protect, deleteClient);

export default router;
