// src/app/dashboard/franchise/teachers/page.jsx
import React from 'react';

export default function FranchiseTeachers() {
  const teachers = [
    { id: 'TCH-01', name: 'Aman Sharma', email: 'aman@abacus.com', activeBatches: 3, phone: '+91 98765 43210', status: 'Active' },
    { id: 'TCH-02', name: 'Neha Patel', email: 'neha@abacus.com', activeBatches: 2, phone: '+91 98765 43211', status: 'Active' },
    { id: 'TCH-03', name: 'Sarah Jenkins', email: 'sarah.j@abacus.com', activeBatches: 1, phone: '+91 98765 43212', status: 'On Leave' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Faculty Management</h2>
          <p className="text-xs text-gray-400 mt-1">Monitor center teachers, assignment loads, and contact directories.</p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-all">
          + Add New Teacher
        </button>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">ID</th>
              <th className="py-4 px-6">Teacher Name</th>
              <th className="py-4 px-6">Email Address</th>
              <th className="py-4 px-6">Contact Number</th>
              <th className="py-4 px-6 text-center">Active Batches</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-[#10192e]/40 transition-colors">
                <td className="py-4 px-6 font-mono text-amber-400 font-semibold">{teacher.id}</td>
                <td className="py-4 px-6 font-semibold text-white">{teacher.name}</td>
                <td className="py-4 px-6 text-gray-400 font-mono">{teacher.email}</td>
                <td className="py-4 px-6 text-gray-400 font-mono">{teacher.phone}</td>
                <td className="py-4 px-6 text-center font-bold text-gray-200">{teacher.activeBatches}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    teacher.status === 'Active' ? 'text-emerald-400 bg-emerald-950/40' : 'text-amber-400 bg-amber-950/40'
                  }`}>
                    {teacher.status}
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