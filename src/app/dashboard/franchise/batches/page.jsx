// src/app/dashboard/franchise/batches/page.jsx
import React from 'react';

export default function FranchiseBatches() {
  const centerBatches = [
    { code: 'B-DEL-01', name: 'Morning Standard', level: 'Level 1', teacher: 'Aman Sharma', schedule: 'Mon, Wed, Fri', timing: '09:00 AM', utilization: '12 / 15 Students' },
    { code: 'B-MUM-02', name: 'Evening Advance', level: 'Level 2', teacher: 'Neha Patel', schedule: 'Tue, Thu', timing: '04:00 PM', utilization: '8 / 10 Students' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Center Batches</h2>
          <p className="text-xs text-gray-400 mt-1">Create slots, allocate faculty, and check student occupancy ratios.</p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-all">
          + Create New Batch
        </button>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">Batch Code</th>
              <th className="py-4 px-6">Batch Name</th>
              <th className="py-4 px-6">Target Level</th>
              <th className="py-4 px-6">Assigned Faculty</th>
              <th className="py-4 px-6">Weekly Schedule</th>
              <th className="py-4 px-6">Slot Time</th>
              <th className="py-4 px-6 text-center">Occupancy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {centerBatches.map((batch) => (
              <tr key={batch.code} className="hover:bg-[#10192e]/40 transition-colors">
                <td className="py-4 px-6 font-mono text-amber-400 font-semibold">{batch.code}</td>
                <td className="py-4 px-6 font-semibold text-white">{batch.name}</td>
                <td className="py-4 px-6 text-purple-400 font-medium">{batch.level}</td>
                <td className="py-4 px-6 text-gray-300">{batch.teacher}</td>
                <td className="py-4 px-6 text-gray-400">{batch.schedule}</td>
                <td className="py-4 px-6 text-gray-400 font-mono">🕒 {batch.timing}</td>
                <td className="py-4 px-6 text-center font-semibold text-gray-200">{batch.utilization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}