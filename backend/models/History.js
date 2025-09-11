import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    usia: { type: Number, required: true },
    berat: { type: Number, required: true },
    tinggi: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    aktivitas: { type: String, enum: ["rendah", "sedang", "tinggi"], required: true },
    tujuan: { type: String, enum: ["bulking", "cutting", "maintenance"], required: true },
    hasil: {
      kalori: Number,
      protein: Number,
      karbohidrat: Number,
      lemak: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("History", historySchema);
