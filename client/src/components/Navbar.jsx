import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// Try to import the logo, fallback to 'N' if not found
let logo;
try {
  logo = require("../assets/logo.png");
} catch (e) {
  logo = null;
}

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-900 to-sky-400 py-3 px-6 flex items-center justify-between shadow-lg rounded-b-xl font-montserrat">
      <div className="flex items-center gap-3">
        {/* Logo or fallback */}
        {logo ? (
          <img src={logo} alt="NxtWave Logo" className="w-10 h-10 rounded-full bg-white shadow" />
        ) : (
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-blue-900 text-xl shadow">N</div>
        )}
        <span className="text-white text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-900 to-sky-400 bg-clip-text text-transparent font-montserrat">NxtWave DayPlan</span>
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-white font-medium mr-2">
              {user.name} <span className="text-xs bg-white/20 px-2 py-1 rounded ml-1 capitalize">{user.role}</span>
            </span>
            <button
              onClick={handleLogout}
              className="rounded-full bg-gradient-to-r from-blue-900 to-sky-400 text-white px-5 py-2 font-semibold shadow hover:scale-105 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white font-medium hover:underline">Login</Link>
            <Link to="/register" className="text-white font-medium hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 