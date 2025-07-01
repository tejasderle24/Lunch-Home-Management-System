import express from "express";
import { exportTiffinCSV } from "../controllers/exportController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/tiffin-csv", protect, exportTiffinCSV);
export default router;
