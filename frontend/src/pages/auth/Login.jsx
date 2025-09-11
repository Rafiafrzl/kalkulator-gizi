import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const payload = {
        ...res.data.user,
        token: res.data.token,
      };

      login(payload);

      toast.success("Login berhasil!", {
        onClose: () => navigate(res.data.redirectUrl, { replace: true }),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login gagal!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Bagian Kiri - Ilustrasi */}
        <div className="hidden md:flex w-1/2 bg-green-100 items-center justify-center p-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3082/3082031.png" // contoh ikon apel sehat
            alt="Healthy Login"
            className="w-64 h-64"
          />
        </div>

        {/* Bagian Kanan - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-extrabold text-green-600 mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-6">Masuk untuk cek gizimu dengan kalkulator gizi</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" required />

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md">
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Belum punya akun?{" "}
            <a href="/register" className="text-orange-500 font-semibold hover:underline">
              Daftar sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
