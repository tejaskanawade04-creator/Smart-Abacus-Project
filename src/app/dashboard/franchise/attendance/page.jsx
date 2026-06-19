import React from 'react';

export default function FranchiseAttendance() {
  const batchAttendanceLog = [
    { date: '2026-06-18', batchName: 'Morning Standard', teacher: 'Aman Sharma', total: 12, present: 11, absent: 1, ratio: '91.6%' },
    { date: '2026-06-18', batchName: 'Evening Advance', teacher: 'Neha Patel', total: 8, present: 8, absent: 0, ratio: '100%' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Center Attendance Audit</h2>
        <p className="text-xs text-gray-400 mt-1">Monitor daily log summaries submitted by faculty members for operations auditing.</p>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Batch Name</th>
              <th className="py-4 px-6">Class Teacher</th>
              <th className="py-4 px-6 text-center">Total Students</th>
              <th className="py-4 px-6 text-center text-emerald-400">Present</th>
              <th className="py-4 px-6 text-center text-rose-400">Absent</th>
              <th className="py-4 px-6 text-center">Attendance Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {batchAttendanceLog.map((log, index) => (
              <tr key={index} className="hover:bg-[#10192e]/40 transition-colors">
                <td className="py-4 px-6 font-mono text-gray-400">{log.date}</td>
                <td className="py-4 px-6 font-semibold text-white">{log.batchName}</td>
                <td className="py-4 px-6 text-gray-400">{log.teacher}</td>
                <td className="py-4 px-6 text-center font-mono">{log.total}</td>
                <td className="py-4 px-6 text-center font-bold font-mono text-emerald-400">{log.present}</td>
                <td className="py-4 px-6 text-center font-bold font-mono text-rose-400">{log.absent}</td>
                <td className="py-4 px-6 text-center font-bold text-blue-400 font-mono">{log.ratio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}