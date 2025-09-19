import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const link = "px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition";
  const active = "bg-gray-800 text-white hover:bg-gray-800";

  return (
    <header className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="font-semibold text-gray-800">Kalkulator Gizi Sehat</h1>
        <nav className="flex items-center gap-2">
          <NavLink to="/user/home" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
            Home
          </NavLink>
          <NavLink to="/user/history" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
            Riwayat
          </NavLink>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
