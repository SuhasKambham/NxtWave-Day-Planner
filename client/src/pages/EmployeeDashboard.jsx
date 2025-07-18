import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import PlanForm from "../components/PlanForm";
import ReminderModal from "../components/ReminderModal";

const EmployeeDashboard = () => {
  const { user, token } = useAuth();
  const [entries, setEntries] = useState([
    {
      topic: "",
      status: "Yet to Start",
      learningDate: new Date().toISOString().slice(0, 10),
      duration: [],
      willCompleteBy: "",
      remarks: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    // Fetch yesterday's plan for reminder
    const fetchYesterday = async () => {
      try {
        const res = await api.get("/api/plans/yesterday", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && res.data.entries) {
          const incomplete = res.data.entries.filter(
            (e) => e.status !== "Done"
          );
          setIncompleteTasks(incomplete);
          setReminderOpen(incomplete.length > 0);
        }
      } catch (err) {
        // ignore
      }
    };
    if (token) fetchYesterday();
  }, [token]);

  useEffect(() => {
    // Fetch today's plan (if any)
    const fetchToday = async () => {
      try {
        const res = await api.get("/api/plans/today", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data && res.data.entries && res.data.entries.length > 0) {
          setEntries(
            res.data.entries.map((e) => ({
              ...e,
              learningDate: e.learningDate?.slice(0, 10) || new Date().toISOString().slice(0, 10),
              willCompleteBy: e.willCompleteBy?.slice(0, 10) || "",
            }))
          );
        }
      } catch (err) {
        // ignore
      }
    };
    if (token) fetchToday();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(
        "/api/plans/today",
        { entries },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      alert("Plan submitted!");
    } catch (err) {
      setLoading(false);
      alert("Error submitting plan");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-400 pb-10">
      <div className="max-w-4xl mx-auto pt-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {greeting}, {user?.name}!
        </h1>
        <div className="text-white mb-6 text-lg">
          Today is {new Date().toLocaleDateString()}
        </div>
        <PlanForm
          entries={entries}
          setEntries={setEntries}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
      <ReminderModal
        open={reminderOpen}
        onClose={() => setReminderOpen(false)}
        incompleteTasks={incompleteTasks}
      />
    </div>
  );
};

export default EmployeeDashboard; 