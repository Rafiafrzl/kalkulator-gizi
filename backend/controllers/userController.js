import History from "../models/History.js";
import { calculateNutrition } from "../utils/calculateNutrition.js";

export const hitungDanSimpanHistory = async (req, res) => {
  try {
    const { usia, berat, tinggi, gender, aktivitas, tujuan } = req.body;

    if (!usia || !berat || !tinggi || !gender || !aktivitas || !tujuan) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const hasil = calculateNutrition(berat, tinggi, usia, gender, aktivitas, tujuan);

    const history = await History.create({
      user: req.user.id,
      usia,
      berat,
      tinggi,
      gender,
      aktivitas,
      tujuan,
      hasil,
    });

    res.status(201).json({
      message: "Perhitungan berhasil",
      hasil,
      historyId: history._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

export const getUserHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil history", error });
  }
};
