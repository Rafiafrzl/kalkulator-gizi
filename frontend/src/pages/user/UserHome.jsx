import { useState } from "react";
import UserNavbar from "./UserNavbar";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

export default function UserHome() {
  const [form, setForm] = useState({
    usia: "",
    berat: "",
    tinggi: "",
    gender: "male",
    aktivitas: "sedang",
    tujuan: "maintenance",
  });

  const [errors, setErrors] = useState({});
  const [hasil, setHasil] = useState(null);

  const validate = () => {
    let newErrors = {};
    if (!form.usia) newErrors.usia = "Usia harus diisi";
    if (!form.berat) newErrors.berat = "Berat badan harus diisi";
    if (!form.tinggi) newErrors.tinggi = "Tinggi badan harus diisi";
    return newErrors;
  };

  const submit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const { data } = await api.post("/api/gizi/hitung", form);
      setHasil(data.hasil);
      toast.success("Perhitungan berhasil");
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghitung");
    }
  };

  const chartData = hasil
    ? [
        { name: "Protein (g)", value: hasil.protein },
        { name: "Karbo (g)", value: hasil.karbohidrat },
        { name: "Lemak (g)", value: hasil.lemak },
      ]
    : [];

  const COLORS = ["#4CAF50", "#2196F3", "#FF9800"];

  const getStatus = () => {
    if (!hasil) return null;
    if (hasil.kalori < 1500) return { text: "Gizi Buruk (Kurang)", color: "text-red-600" };
    if (hasil.kalori > 3000) return { text: "Gizi Buruk (Berlebih)", color: "text-yellow-600" };
    return { text: "Gizi Baik", color: "text-green-600" };
  };

  const status = getStatus();

  return (
    <>
      <UserNavbar />
      <div className="bg-gray-100 min-h-[calc(100vh-64px)]">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Hitung Kebutuhan Gizi Anda</h2>

            <form onSubmit={submit} className="space-y-5">
              {/* Usia */}
              <div>
                <label className="block text-sm font-medium mb-1">Usia (tahun)</label>
                <input type="number" className={`w-full border rounded-lg px-3 py-2 ${errors.usia ? "border-red-500" : ""}`} value={form.usia} onChange={(e) => setForm({ ...form, usia: +e.target.value })} />
                {errors.usia && <p className="text-red-500 text-sm mt-1">{errors.usia}</p>}
              </div>

              {/* Berat & Tinggi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Berat Badan (kg)</label>
                  <input type="number" className={`w-full border rounded-lg px-3 py-2 ${errors.berat ? "border-red-500" : ""}`} value={form.berat} onChange={(e) => setForm({ ...form, berat: +e.target.value })} />
                  {errors.berat && <p className="text-red-500 text-sm mt-1">{errors.berat}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tinggi Badan (cm)</label>
                  <input type="number" className={`w-full border rounded-lg px-3 py-2 ${errors.tinggi ? "border-red-500" : ""}`} value={form.tinggi} onChange={(e) => setForm({ ...form, tinggi: +e.target.value })} />
                  {errors.tinggi && <p className="text-red-500 text-sm mt-1">{errors.tinggi}</p>}
                </div>
              </div>

              {/* Gender */}
              <div>
                <span className="block text-sm font-medium mb-1">Jenis Kelamin</span>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" checked={form.gender === "male"} onChange={() => setForm({ ...form, gender: "male" })} /> Pria
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" checked={form.gender === "female"} onChange={() => setForm({ ...form, gender: "female" })} /> Wanita
                  </label>
                </div>
              </div>

              {/* Aktivitas */}
              <div>
                <label className="block text-sm font-medium mb-1">Aktivitas Harian</label>
                <select className="w-full border rounded-lg px-3 py-2" value={form.aktivitas} onChange={(e) => setForm({ ...form, aktivitas: e.target.value })}>
                  <option value="rendah">Ringan (sedikit/tanpa olahraga)</option>
                  <option value="sedang">Sedang</option>
                  <option value="tinggi">Tinggi</option>
                </select>
              </div>

              {/* Tujuan */}
              <div>
                <label className="block text-sm font-medium mb-1">Tujuan</label>
                <select className="w-full border rounded-lg px-3 py-2" value={form.tujuan} onChange={(e) => setForm({ ...form, tujuan: e.target.value })}>
                  <option value="maintenance">Mempertahankan</option>
                  <option value="bulking">Menambah BB</option>
                  <option value="cutting">Menurunkan BB</option>
                </select>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Hitung Kebutuhan Gizi</button>
            </form>
          </div>

          {/* Hasil */}
          {hasil && (
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="font-semibold mb-3">Hasil Perhitungan</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    Total Kalori: <b>{hasil.kalori} kkal</b>
                  </li>
                  <li>
                    Protein: <b>{hasil.protein} g</b>
                  </li>
                  <li>
                    Karbohidrat: <b>{hasil.karbohidrat} g</b>
                  </li>
                  <li>
                    Lemak: <b>{hasil.lemak} g</b>
                  </li>
                </ul>
                {status && <div className={`mt-4 font-semibold ${status.color}`}>Status: {status.text}</div>}
              </div>

              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="font-semibold mb-3">Visualisasi</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={90} label>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
