import express from "express";
import { getKitchenSummary } from "../controllers/kitchenController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, getKitchenSummary); // ?date=YYYY-MM-DD&shift=Morning

export default router;
