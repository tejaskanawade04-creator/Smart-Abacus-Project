// src/app/dashboard/teacher/progress/page.jsx
import React from 'react';

export default function ProgressPage() {
  const studentsProgress = [
    { id: 1, name: 'Aman Sharma', speed: 'Excellent', accuracy: '92%', lastAssessment: 'A+', feedback: 'Great improvements in mental math.' },
    { id: 2, name: 'Neha Patel', speed: 'Average', accuracy: '85%', lastAssessment: 'B', feedback: 'Needs practice with 3-digit addition.' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Student Progress Tracking</h2>
        <p className="text-xs text-gray-400 mt-1">Evaluate student performance metrics (Speed, Accuracy, and Marks) for parents visibility.</p>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">Student Name</th>
              <th className="py-4 px-6">Calculation Speed</th>
              <th className="py-4 px-6">Accuracy Rate</th>
              <th className="py-4 px-6">Latest Grade</th>
              <th className="py-4 px-6">Remarks / Feedback</th>
              <th className="py-4 px-6 text-center">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {studentsProgress.map((student) => (
              <tr key={student.id} className="hover:bg-[#10192e]/40 transition-colors">
                <td className="py-4 px-6 font-semibold text-white">{student.name}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${student.speed === 'Excellent' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                    {student.speed}
                  </span>
                </td>
                <td className="py-4 px-6 font-mono font-semibold text-gray-200">{student.accuracy}</td>
                <td className="py-4 px-6 font-bold text-purple-400">{student.lastAssessment}</td>
                <td className="py-4 px-6 text-gray-400 italic">"{student.feedback}"</td>
                <td className="py-4 px-6 text-center">
                  <button className="text-blue-400 hover:underline text-xs">Edit Report</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}