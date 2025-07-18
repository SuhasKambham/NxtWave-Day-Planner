import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!name || !email || !password) {
      setFormError("Please fill all fields.");
      return;
    }
    const res = await register(name, email, password, role);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 font-montserrat">
      <form
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-slate-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-extrabold text-blue-900 mb-6 text-center">Register</h2>
        {formError && <div className="text-red-600 mb-2 text-center">{formError}</div>}
        {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-2 text-center">Registration successful! Redirecting to login...</div>}
        <div className="mb-4">
          <label className="block text-blue-900 font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-sky-400 shadow-sm outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-blue-900 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-sky-400 shadow-sm outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-blue-900 font-medium mb-1">Role</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-sky-400 shadow-sm outline-none transition"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-blue-900 to-sky-400 text-white py-2 font-semibold shadow-md hover:scale-105 transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="mt-6 text-center text-slate-500">
          <span>Already have an account? </span>
          <a href="/login" className="text-sky-600 hover:underline font-semibold">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register; 