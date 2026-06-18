// src/app/dashboard/teacher/attendance/page.jsx
import React from 'react';

export default function AttendancePage() {
  const currentBatches = [
    { id: 'B1', name: 'New Delhi - Morning (Level 1)', students: 12, timing: '09:00 AM - 10:30 AM' },
    { id: 'B2', name: 'Mumbai West - Evening (Level 2)', students: 8, timing: '04:00 PM - 05:30 PM' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Attendance Management</h2>
          <p className="text-xs text-gray-400 mt-1">Select a batch to mark or view daily student attendance.</p>
        </div>
      </div>

      {/* Batch Cards for Attendance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentBatches.map((batch) => (
          <div key={batch.id} className="bg-[#0d1527] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex justify-between items-start">
                <span className="bg-blue-950 text-blue-400 border border-blue-900/50 px-2.5 py-0.5 rounded text-[10px] font-bold">
                  {batch.id}
                </span>
                <span className="text-[11px] text-gray-400 font-mono">🕒 {batch.timing}</span>
              </div>
              <h3 className="text-base font-semibold text-white mt-3">{batch.name}</h3>
              <p className="text-xs text-gray-400 mt-1">Total Assigned Students: {batch.students}</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800/60 flex items-center justify-between">
              <button className="text-xs text-gray-400 hover:text-white transition-colors">
                View History
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all">
                ✏️ Mark Today's Attendance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}