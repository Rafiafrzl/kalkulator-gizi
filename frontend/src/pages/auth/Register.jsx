import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      toast.success("Registrasi berhasil , silakan login!");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/Login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registrasi gagal ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full">
        {/* Bagian Kiri (Ilustrasi) */}
        <div className="hidden md:flex w-1/2 bg-green-100 items-center justify-center p-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706195.png" // ilustrasi sehat/gizi (contoh)
            alt="Healthy Illustration"
            className="w-64 h-64 object-contain"
          />
        </div>

        {/* Bagian Kanan (Form) */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-extrabold text-green-600 mb-2">Sign Up For Free.</h2>
          <p className="text-gray-600 mb-6">Jaga kesehatanmu dengan gizi seimbang.</p>

          <form onSubmit={handleRegister} className="space-y-5">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" required />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" required />

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md">
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-orange-500 font-semibold hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
