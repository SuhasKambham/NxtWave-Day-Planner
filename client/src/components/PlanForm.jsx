import React from "react";

const TIME_SLOTS = [
  "09:00–10:00",
  "10:00–11:00",
  "11:00–12:00",
  "12:00–12:30",
  "13:30–14:30",
  "14:30–15:30",
  "15:30–16:30",
  "16:30–17:30",
  "17:30–18:30",
];

const STATUS_OPTIONS = ["Yet to Start", "In Progress", "Done"];
const STATUS_COLORS = {
  "Yet to Start": "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-sky-100 text-sky-800",
  Done: "bg-green-100 text-green-800",
};

const PlanForm = ({ entries, setEntries, onSubmit, loading }) => {
  const handleChange = (idx, field, value) => {
    const updated = entries.map((entry, i) =>
      i === idx ? { ...entry, [field]: value } : entry
    );
    setEntries(updated);
  };

  const handleDurationChange = (idx, slot) => {
    const entry = entries[idx];
    const hasSlot = entry.duration.includes(slot);
    const updatedDuration = hasSlot
      ? entry.duration.filter((s) => s !== slot)
      : [...entry.duration, slot];
    handleChange(idx, "duration", updatedDuration);
  };

  const addRow = () => {
    setEntries([
      ...entries,
      {
        topic: "",
        status: "Yet to Start",
        learningDate: new Date().toISOString().slice(0, 10),
        duration: [],
        willCompleteBy: "",
        remarks: "",
      },
    ]);
  };

  const removeRow = (idx) => {
    setEntries(entries.filter((_, i) => i !== idx));
  };

  return (
    <form
      className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto mt-6 font-montserrat border border-slate-100"
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-extrabold mb-4 text-blue-900">Today's Plan</h2>
      <div className="space-y-6">
        {entries.map((entry, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-4 border border-slate-100 relative"
          >
            <button
              type="button"
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xl font-bold transition"
              onClick={() => removeRow(idx)}
              disabled={entries.length === 1}
            >
              ×
            </button>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1">Topic Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full mt-1 rounded-lg px-2 py-2 border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-sky-400 shadow-sm outline-none transition"
                  value={entry.topic}
                  onChange={(e) => handleChange(idx, "topic", e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-sm font-medium text-blue-900 mb-1">Status</label>
                <select
                  className="input input-bordered w-full mt-1 rounded-lg px-2 py-2 border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-sky-400 shadow-sm outline-none transition"
                  value={entry.status}
                  onChange={(e) => handleChange(idx, "status", e.target.value)}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[entry.status]}`}>{entry.status}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">Learning Date</label>
                <input
                  type="date"
                  className="input input-bordered w-full mt-1 rounded-lg px-2 py-2 border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-sky-400 shadow-sm outline-none transition"
                  value={entry.learningDate}
                  onChange={(e) => handleChange(idx, "learningDate", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1">Duration</label>
                <div className="flex flex-wrap gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      className={`px-3 py-1 rounded-full border text-sm font-medium transition shadow-sm ${
                        entry.duration.includes(slot)
                          ? "bg-sky-500 text-white border-sky-700 scale-105"
                          : "bg-slate-100 text-blue-900 border-slate-300 hover:bg-sky-100"
                      }`}
                      onClick={() => handleDurationChange(idx, slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">Will Complete By</label>
                <input
                  type="date"
                  className="input input-bordered w-full mt-1 rounded-lg px-2 py-2 border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-sky-400 shadow-sm outline-none transition"
                  value={entry.willCompleteBy}
                  onChange={(e) => handleChange(idx, "willCompleteBy", e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-900 mb-1">Remarks</label>
                <textarea
                  className="input input-bordered w-full mt-1 rounded-lg px-2 py-2 border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-sky-400 shadow-sm outline-none transition"
                  value={entry.remarks}
                  onChange={(e) => handleChange(idx, "remarks", e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="rounded-full bg-gradient-to-r from-blue-900 to-sky-400 text-white px-5 py-2 font-semibold shadow-md hover:scale-105 transition"
          onClick={addRow}
        >
          + Add Task Row
        </button>
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-blue-900 to-sky-400 text-white px-8 py-2 font-bold shadow-md hover:scale-105 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Plan"}
        </button>
      </div>
    </form>
  );
};

export default PlanForm; 