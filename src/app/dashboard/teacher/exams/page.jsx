// src/app/dashboard/teacher/exams/page.jsx
import React from 'react';

export default function ExamsPage() {
  const exams = [
    { id: 'EX-902', name: 'Abacus Level 1 - Final Assessment', batch: 'Delhi Central', date: '2026-06-25', status: 'Upcoming' },
    { id: 'EX-881', name: 'Abacus Level 2 - Mid Term', batch: 'Mumbai West', date: '2026-06-12', status: 'Completed' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Exams & Assessments</h2>
          <p className="text-xs text-gray-400 mt-1">Schedule new exams and upload results for student progress evaluation.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md">
          + Schedule New Exam
        </button>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">Exam ID</th>
              <th className="py-4 px-6">Exam Name</th>
              <th className="py-4 px-6">Target Batch</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-[#10192e]/40 transition-colors">
                <td className="py-4 px-6 font-mono text-blue-400 font-semibold">{exam.id}</td>
                <td className="py-4 px-6 font-semibold text-white">{exam.name}</td>
                <td className="py-4 px-6 text-gray-400">{exam.batch}</td>
                <td className="py-4 px-6 text-gray-400 font-mono">{exam.date}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    exam.status === 'Upcoming' ? 'bg-blue-950 text-blue-400 border border-blue-900/50' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {exam.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] px-3 py-1 rounded-md transition-colors">
                    {exam.status === 'Upcoming' ? 'Manage' : 'View Marks'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}