import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      pathname === path
        ? "bg-white text-blue-600 shadow"
        : "text-white hover:bg-blue-500"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1
          className="text-xl font-bold tracking-wide cursor-pointer text-white"
          onClick={() => navigate("/")}
        >
          💊 Prescription App
        </h1>

        <div className="flex items-center gap-4">

          {/* Always visible */}
          <Link to="/doctors" className={linkClass("/doctors")}>
            Doctors
          </Link>

          {/* 🔥 PATIENT */}
          {user?.role === "patient" && (
            <Link
              to="/patient/consultations"
              className={linkClass("/patient/consultations")}
            >
              My Consultations
            </Link>
          )}

          {/* 🔥 DOCTOR */}
          {user?.role === "doctor" && (
            <Link
              to="/doctor/dashboard"
              className={linkClass("/doctor/dashboard")}
            >
              Dashboard
            </Link>
          )}

          {/* Not logged in */}
          {!user && (
            <>
              <Link to="/login" className={linkClass("/login")}>
                Login
              </Link>

              <Link to="/doctor/signup" className={linkClass("/doctor/signup")}>
                Doctor Signup
              </Link>

              <Link to="/patient/signup" className={linkClass("/patient/signup")}>
                Patient Signup
              </Link>
            </>
          )}

          {/* Logged in */}
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}