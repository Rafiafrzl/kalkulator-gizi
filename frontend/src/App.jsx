import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// user pages
import UserHome from "./pages/user/UserHome";
import UserHistory from "./pages/user/UserHistory";
// admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAllHistory from "./pages/admin/AdminAllHistory";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User */}
          <Route
            path="/user/home"
            element={
              <ProtectedRoute role="user">
                <UserHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/history"
            element={
              <ProtectedRoute role="user">
                <UserHistory />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/history"
            element={
              <ProtectedRoute role="admin">
                <AdminAllHistory />
              </ProtectedRoute>
            }
          />

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
