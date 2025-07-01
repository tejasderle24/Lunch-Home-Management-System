import express from "express";
import {
  generateMonthlyBills,
  getAllBills,
  updateBillStatus,
} from "../controllers/billingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, generateMonthlyBills);
router.get("/", protect, getAllBills);
router.put("/:id", protect, updateBillStatus);

export default router;
