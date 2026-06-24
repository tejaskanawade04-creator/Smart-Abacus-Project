// src/app/dashboard/teacher/exams/page.jsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ExamsPage() {
  const [exams, setExams] = useState([
    { id: 1, name: 'Aman Sharma', level: 'Level 2', oral: 45, written: 40 },
    { id: 2, name: 'Neha Patel', level: 'Level 1', oral: 35, written: 32 },
    { id: 3, name: 'Kunal Verma', level: 'Level 1', oral: 20, written: 25 },
  ]);

  const updateMarks = (id, field, val) => {
    setExams(exams.map(e => e.id === id ? { ...e, [field]: parseInt(val) || 0 } : e));
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/teacher" className="text-xs text-blue-400 font-medium hover:underline mb-1 inline-block">← BACK TO OVERVIEW</Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">Examination Sheet Input</h1>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
                <th className="py-4 px-6">Student Block</th>
                <th className="py-4 px-6">Current Level</th>
                <th className="py-4 px-6">Oral Score (Max 50)</th>
                <th className="py-4 px-6">Written Score (Max 50)</th>
                <th className="py-4 px-6 text-center">Aggregate Score</th>
                <th className="py-4 px-6 text-center">Audit Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
              {exams.map((e) => {
                const total = e.oral + e.written;
                const passed = total >= 70;
                return (
                  <tr key={e.id} className="hover:bg-[#10192e]/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">{e.name}</td>
                    <td className="py-4 px-6 text-gray-400 font-medium">{e.level}</td>
                    <td className="py-4 px-6">
                      <input type="number" max="50" value={e.oral} onChange={(ex) => updateMarks(e.id, 'oral', ex.target.value)} className="w-24 bg-[#070b19] border border-gray-800 rounded-lg px-2 py-1 text-center focus:border-blue-500 focus:outline-none font-mono"/>
                    </td>
                    <td className="py-4 px-6">
                      <input type="number" max="50" value={e.written} onChange={(ex) => updateMarks(e.id, 'written', ex.target.value)} className="w-24 bg-[#070b19] border border-gray-800 rounded-lg px-2 py-1 text-center focus:border-blue-500 focus:outline-none font-mono"/>
                    </td>
                    <td className="py-4 px-6 text-center font-mono font-bold text-blue-400">{total}%</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border ${passed ? 'bg-emerald-950/80 text-emerald-400 border-emerald-900/60' : 'bg-rose-950/80 text-rose-400 border-rose-900/60'}`}>{passed ? 'Verified Pass' : 'Fail / Retake'}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}