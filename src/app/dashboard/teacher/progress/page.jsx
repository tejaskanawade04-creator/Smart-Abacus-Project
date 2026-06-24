// src/app/dashboard/teacher/progress/page.jsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ProgressPage() {
  const [logs] = useState([
    { id: 1, name: 'Aman Sharma', accuracy: 94, velocity: 45, module: 'Addition Stack - B2' },
    { id: 2, name: 'Neha Patel', accuracy: 78, velocity: 30, module: 'Multiplication Root - A1' },
    { id: 3, name: 'Sarah Jenkins', accuracy: 98, velocity: 52, module: 'Visual Core - C3' },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/teacher" className="text-xs text-blue-400 font-medium hover:underline mb-1 inline-block">← BACK TO OVERVIEW</Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">Student Telemetry Analytics</h1>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
                <th className="py-4 px-6">Student Block</th>
                <th className="py-4 px-6">Current Module</th>
                <th className="py-4 px-6">Calculation Accuracy</th>
                <th className="py-4 px-6">Calculation Velocity</th>
                <th className="py-4 px-6">Recommendation Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-[#10192e]/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{l.name}</td>
                  <td className="py-4 px-6 font-mono text-gray-400">{l.module}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold font-mono w-8">{l.accuracy}%</span>
                      <div className="w-24 bg-[#070b19] h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${l.accuracy >= 85 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${l.accuracy}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-blue-400 font-mono font-bold">{l.velocity} strokes/min</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${l.accuracy >= 85 ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                      {l.accuracy >= 85 ? 'Eligible for Level Up' : 'Focus Accuracy Drills'}
                    </span>
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