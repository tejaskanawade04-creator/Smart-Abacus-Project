// src/app/dashboard/teacher/compensatory-classes/page.jsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function CompensatoryClassesPage() {
  const [sessions] = useState([
    { id: 1, name: 'Sarah Jenkins', missed: '2026-06-12', booked: '2026-06-26', timing: '05:00 PM', status: 'Approved' },
    { id: 2, name: 'Neha Patel', missed: '2026-06-20', booked: '2026-06-28', timing: '11:00 AM', status: 'Pending Review' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <Link href="/dashboard/teacher" className="text-xs text-blue-400 font-medium hover:underline mb-1 inline-block">← BACK TO OVERVIEW</Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Compensatory Sessions Grid</h1>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md">
          + Book Backup Slot
        </button>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
                <th className="py-4 px-6">Student Block</th>
                <th className="py-4 px-6">Missed Slot Timestamp</th>
                <th className="py-4 px-6">Reallocated Date Target</th>
                <th className="py-4 px-6">Allotted Target Shift</th>
                <th className="py-4 px-6 text-center">System Ledger State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
              {sessions.map((s) => (
                <tr key={s.id} className="hover:bg-[#10192e]/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{s.name}</td>
                  <td className="py-4 px-6 font-mono text-gray-500">{s.missed}</td>
                  <td className="py-4 px-6 font-mono text-blue-400 font-bold">{s.booked}</td>
                  <td className="py-4 px-6 text-gray-400">{s.timing}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${s.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/50' : 'bg-amber-950 text-amber-400 border border-amber-900/50'}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}