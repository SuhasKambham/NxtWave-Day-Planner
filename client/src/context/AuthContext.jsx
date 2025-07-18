import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token && !user) {
      // Optionally decode token or fetch user info
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, [token, user]);

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setLoading(false);
      return { success: true, role: res.data.user.role };
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
      return { success: false };
    }
  };

  const register = async (name, email, password, role) => {
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/auth/register", { name, email, password, role });
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false);
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 