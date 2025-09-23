import express from "express";
import { getAllUsers, getAllHistories, deleteUser, deleteHistory } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Manajemen User
router.get("/users", protect, isAdmin, getAllUsers);
router.delete("/users/:id", protect, isAdmin, deleteUser);

// Manajemen Riwayat
router.get("/histories", protect, isAdmin, getAllHistories);
router.delete("/histories/:id", protect, isAdmin, deleteHistory);

export default router;
