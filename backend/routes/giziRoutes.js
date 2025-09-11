import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { hitungGizi, getHistory } from "../controllers/giziController.js";

const router = express.Router();

router.post("/hitung", protect, hitungGizi);

router.get("/history", protect, getHistory);

export default router;
