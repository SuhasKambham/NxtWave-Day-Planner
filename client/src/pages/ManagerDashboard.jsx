import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const STATUS_COLORS = {
  "Yet to Start": "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-sky-100 text-sky-800",
  Done: "bg-green-100 text-green-800",
};

const ManagerDashboard = () => {
  const { user, token } = useAuth();
  const [query, setQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/api/admin/search?q=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      setError("Error searching employees");
      setLoading(false);
    }
  };

  const handleSelectEmployee = async (emp) => {
    setSelectedEmployee(emp);
    setPlan(null);
    setError("");
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/${emp._id}/${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlan(res.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching plan");
      setLoading(false);
    }
  };

  const handleDateChange = async (e) => {
    setDate(e.target.value);
    if (selectedEmployee) {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`/api/admin/${selectedEmployee._id}/${e.target.value}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlan(res.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching plan");
        setLoading(false);
      }
    }
  };

  const exportCSV = () => {
    if (!plan || !plan.entries || plan.entries.length === 0) return;
    const header = [
      "Topic,Status,Learning Date,Duration,Will Complete By,Remarks"
    ];
    const rows = plan.entries.map((e) =>
      [
        e.topic,
        e.status,
        e.learningDate ? e.learningDate.slice(0, 10) : "",
        (e.duration || []).join("; "),
        e.willCompleteBy ? e.willCompleteBy.slice(0, 10) : "",
        (e.remarks || "").replace(/\n/g, " ")
      ].map((v) => `"${v}"`).join(",")
    );
    const csv = [...header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedEmployee.name}_${date}_plan.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10 font-montserrat">
      <div className="max-w-5xl mx-auto pt-8">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4">Manager Dashboard</h1>
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            className="rounded-lg bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-sky-400 shadow-sm px-4 py-2 w-full max-w-xs outline-none transition"
            placeholder="Search employee by name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-blue-900 to-sky-400 text-white px-5 py-2 font-semibold shadow-md hover:scale-105 transition"
            disabled={loading}
          >
            Search
          </button>
        </form>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {loading && <div className="text-blue-100 mb-2">Loading...</div>}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-blue-900 mb-2">Employees</h2>
            <ul className="bg-white rounded-xl shadow divide-y border border-slate-100">
              {employees.map((emp) => (
                <li
                  key={emp._id}
                  className={`p-3 cursor-pointer hover:bg-sky-100 transition ${selectedEmployee?._id === emp._id ? "bg-sky-200" : ""}`}
                  onClick={() => handleSelectEmployee(emp)}
                >
                  <span className="font-semibold text-blue-900">{emp.name}</span>
                  <span className="ml-2 text-gray-500">({emp.email})</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            {selectedEmployee && (
              <div className="bg-white rounded-xl shadow p-4 border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-lg font-bold text-blue-900">
                    {selectedEmployee.name}'s Plan
                  </h2>
                  <input
                    type="date"
                    className="rounded-lg bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-sky-400 shadow-sm px-2 py-1 outline-none transition"
                    value={date}
                    onChange={handleDateChange}
                  />
                  <button
                    onClick={exportCSV}
                    className="rounded-full bg-green-500 text-white px-4 py-1 font-semibold shadow hover:bg-green-600 transition"
                  >
                    Export CSV
                  </button>
                </div>
                {plan && plan.entries && plan.entries.length > 0 ? (
                  <table className="w-full text-sm border rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-sky-100">
                        <th className="p-2 border">Topic</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Learning Date</th>
                        <th className="p-2 border">Duration</th>
                        <th className="p-2 border">Will Complete By</th>
                        <th className="p-2 border">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plan.entries.map((e, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="p-2 border">{e.topic}</td>
                          <td className="p-2 border">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[e.status]}`}>{e.status}</span>
                          </td>
                          <td className="p-2 border">{e.learningDate ? e.learningDate.slice(0, 10) : ""}</td>
                          <td className="p-2 border">{(e.duration || []).join(", ")}</td>
                          <td className="p-2 border">{e.willCompleteBy ? e.willCompleteBy.slice(0, 10) : ""}</td>
                          <td className="p-2 border">{e.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-gray-500">No plan found for this date.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard; 