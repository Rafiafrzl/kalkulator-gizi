import express from "express";
import { getUserHistory, hitungDanSimpanHistory } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/hitung", protect, hitungDanSimpanHistory);

router.get("/history", protect, getUserHistory);

export default router;
