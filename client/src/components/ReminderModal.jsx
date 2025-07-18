import React from "react";
import { Dialog } from "@headlessui/react";

const ReminderModal = ({ open, onClose, incompleteTasks }) => {
  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center font-montserrat">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-auto border border-slate-100">
        <Dialog.Title className="text-lg font-extrabold text-yellow-600 mb-2">Incomplete Tasks from Yesterday</Dialog.Title>
        <div className="mb-4">
          <ul className="space-y-2">
            {incompleteTasks.map((task, idx) => (
              <li key={idx} className="flex items-center gap-2 bg-yellow-50 rounded px-3 py-2 text-blue-900 shadow-sm">
                <span className="font-semibold">{task.topic}</span>
                <span className="inline-block px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">{task.status}</span>
                {task.remarks && <span className="ml-2 text-gray-500">({task.remarks})</span>}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-yellow-400 text-white px-5 py-2 font-semibold shadow hover:bg-yellow-500 transition"
        >
          OK, Got it!
        </button>
      </div>
    </Dialog>
  );
};

export default ReminderModal; 