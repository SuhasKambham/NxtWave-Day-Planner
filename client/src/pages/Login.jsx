import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!email || !password) {
      setFormError("Please enter both email and password.");
      return;
    }
    // Optionally, you can send role to backend for extra validation
    const res = await login(email, password);
    if (res.success) {
      if (res.role === "employee") navigate("/employee/dashboard");
      else if (res.role === "manager") navigate("/manager/dashboard");
      else setFormError("Role mismatch. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 font-montserrat">
      <form
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-slate-100"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            className={`px-6 py-2 rounded-full font-bold shadow transition border-2 text-lg ${role === "employee" ? "bg-gradient-to-r from-blue-900 to-sky-400 text-white border-sky-400 scale-105" : "bg-slate-100 text-blue-900 border-slate-200 hover:bg-sky-50"}`}
            onClick={() => setRole("employee")}
          >
            Employee Login
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded-full font-bold shadow transition border-2 text-lg ${role === "manager" ? "bg-gradient-to-r from-blue-900 to-sky-400 text-white border-sky-400 scale-105" : "bg-slate-100 text-blue-900 border-slate-200 hover:bg-sky-50"}`}
            onClick={() => setRole("manager")}
          >
            Manager Login
          </button>
        </div>
        <h2 className="text-2xl font-extrabold text-blue-900 mb-6 text-center">Login</h2>
        {formError && <div className="text-red-600 mb-2 text-center">{formError}</div>}
        {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-blue-900 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-sky-400 shadow-sm outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-blue-900 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-sky-400 shadow-sm outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-blue-900 to-sky-400 text-white py-2 font-semibold shadow-md hover:scale-105 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="mt-6 text-center text-slate-500">
          <span>Don't have an account? </span>
          <a href="/register" className="text-sky-600 hover:underline font-semibold">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login; 