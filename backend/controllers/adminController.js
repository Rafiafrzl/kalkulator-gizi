import User from "../models/User.js";
import History from "../models/History.js";

// Ambil semua user
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Ambil semua riwayat user
export const getAllHistories = async (req, res) => {
  const histories = await History.find().populate("userId", "name email");
  res.json(histories);
};

// Statistik
export const getStats = async (req, res) => {
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalHistories = await History.countDocuments();
  res.json({ totalUsers, totalHistories });
};

// Hapus user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Hapus riwayat
export const deleteHistory = async (req, res) => {
  try {
    const history = await History.findByIdAndDelete(req.params.id);
    if (!history) return res.status(404).json({ message: "Riwayat tidak ditemukan" });

    res.json({ message: "Riwayat berhasil dihapus" });
  } catch (error) {
    console.error("Delete history error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
