import express from "express";
import { getShiftClients, saveTiffinRecords } from "../controllers/tiffinController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getShiftClients); // ?date=YYYY-MM-DD&shift=Morning
router.post("/", protect, saveTiffinRecords);

export default router;
