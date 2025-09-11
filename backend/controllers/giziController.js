import History from "../models/History.js";
import { calculateNutrition } from "../utils/calculateNutrition.js";

export const hitungGizi = async (req, res) => {
  try {
    const { usia, berat, tinggi, gender, aktivitas, tujuan } = req.body;

    const hasil = calculateNutrition(berat, tinggi, usia, gender, aktivitas, tujuan);

    // simpan ke riwayat user
    const history = await History.create({
      userId: req.user.id,
      usia,
      berat,
      tinggi,
      gender,
      aktivitas,
      tujuan,
      hasil,
    });

    res.json({
      message: "Perhitungan berhasil",
      hasil,
      historyId: history._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
