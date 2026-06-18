// src/app/dashboard/franchise/students/page.jsx
import React from 'react';

export default function FranchiseStudents() {
  const students = [
    { id: 'STU-99', name: 'Rohan Deshmukh', level: 'Level 1', teacher: 'Aman Sharma', status: 'Active', feeStatus: 'Paid' },
    { id: 'STU-102', name: 'Isha Sharma', level: 'Level 2', teacher: 'Neha Patel', status: 'Active', feeStatus: 'Pending' },
    { id: 'STU-88', name: 'Aditya Patil', level: 'Level 4', teacher: 'Sarah Jenkins', status: 'Suspended', feeStatus: 'Overdue' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Student Roster</h2>
          <p className="text-xs text-gray-400 mt-1">View and manage admissions, levels, and statuses for all students at this center.</p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-all">
          + New Admission
        </button>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">ID</th>
              <th className="py-4 px-6">Student Name</th>
              <th className="py-4 px-6">Abacus Level</th>
              <th className="py-4 px-6">Assigned Teacher</th>
              <th className="py-4 px-6">Fee Status</th>
              <th className="py-4 px-6">Account Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-[#10192e]/40 transition-colors">
                <td className="py-4 px-6 font-mono text-amber-400 font-semibold">{student.id}</td>
                <td className="py-4 px-6 font-semibold text-white">{student.name}</td>
                <td className="py-4 px-6 text-gray-400">{student.level}</td>
                <td className="py-4 px-6 text-gray-400">{student.teacher}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    student.feeStatus === 'Paid' ? 'text-emerald-400 bg-emerald-950/40' : 'text-rose-400 bg-rose-950/40'
                  }`}>
                    {student.feeStatus}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    student.status === 'Active' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/50' : 'bg-rose-950/60 text-rose-400 border border-rose-900/50'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center space-x-3">
                  <button className="text-gray-400 hover:text-amber-400 transition-colors">✏️</button>
                  <button className="text-gray-400 hover:text-rose-400 transition-colors">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}