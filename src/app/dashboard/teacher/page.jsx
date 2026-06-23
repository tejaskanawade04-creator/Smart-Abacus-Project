// src/app/dashboard/teacher/page.jsx
import React from 'react';

export default function TeacherOverview() {
  // Mock Data: 
  const studentData = [
    { id: 1, name: 'Aman Sharma', email: 'aman@abacus.com', level: 'Level 2', batch: 'New Delhi - Evening', status: 'Active', joiningDate: '2025-05-02' },
    { id: 2, name: 'Neha Patel', email: 'neha@abacus.com', level: 'Level 1', batch: 'Mumbai West - Morning', status: 'Active', joiningDate: '2025-05-12' },
    { id: 3, name: 'Sarah Jenkins', email: 'sarah.j@abacus.com', level: 'Level 3', batch: 'Bangalore - Weekend', status: 'Suspended', joiningDate: '2025-04-18' },
    { id: 4, name: 'Kunal Verma', email: 'kunal@abacus.com', level: 'Level 1', batch: 'Delhi Central - Morning', status: 'Active', joiningDate: '2026-05-16' },
  ];

  return (
    <div>
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">My Students</h2>
          <p className="text-xs text-gray-400 mt-1">Manage your assigned students and track their progress.</p>
        </div>
        
        {/* Action Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-all">
          + Mark Attendance
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search students by name, level, batch..." 
          className="w-full md:w-1/3 bg-[#0d1527] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500"
        />
      </div>

      {/* DATA TABLE */}
      <div className="bg-[#0d1527]/60 border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">Student Details</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Abacus Level</th>
              <th className="py-4 px-6">Assigned Batch</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Joining Date</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {studentData.map((student) => (
              <tr key={student.id} className="hover:bg-[#10192e]/40 transition-colors">
                
                {/* Name & Avatar */}
                <td className="py-4 px-6 flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] text-gray-400 border border-gray-700">
                    {student.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-white">{student.name}</span>
                </td>
                
                {/* Email */}
                <td className="py-4 px-6 text-gray-400">{student.email}</td>
                
                {/* Level Tag */}
                <td className="py-4 px-6">
                  <span className="bg-purple-950/50 text-purple-400 border border-purple-900/50 px-2 py-0.5 rounded text-[10px] font-medium">
                    {student.level}
                  </span>
                </td>
                
                {/* Batch */}
                <td className="py-4 px-6 text-gray-400">{student.batch}</td>
                
                {/* Status Tag (Active/Suspended) */}
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${
                    student.status === 'Active' 
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/50' 
                      : 'bg-rose-950/60 text-rose-400 border border-rose-900/50'
                  }`}>
                    {student.status}
                  </span>
                </td>
                
                {/* Date */}
                <td className="py-4 px-6 text-gray-400 font-mono">{student.joiningDate}</td>
                
                {/* Action Icons */}
                <td className="py-4 px-6 text-center space-x-3">
                  <button className="text-gray-400 hover:text-blue-400 transition-colors">✏️</button>
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