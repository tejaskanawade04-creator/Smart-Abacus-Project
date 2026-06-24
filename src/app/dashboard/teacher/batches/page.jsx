// src/app/dashboard/teacher/batches/page.jsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function BatchesPage() {
  const [batches] = useState([
    { id: 1, name: 'New Delhi - Evening', level: 'Level 2', count: 18, limit: 20, time: '04:00 PM - 06:00 PM', days: 'Mon, Wed, Fri' },
    { id: 2, name: 'Mumbai West - Morning', level: 'Level 1', count: 8, limit: 15, time: '09:00 AM - 11:00 AM', days: 'Tue, Thu' },
    { id: 3, name: 'Bangalore - Weekend', level: 'Level 3', count: 25, limit: 25, time: '10:00 AM - 01:00 PM', days: 'Sat, Sun' },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/teacher" className="text-xs text-blue-400 font-medium hover:underline mb-1 inline-block">← BACK TO OVERVIEW</Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">Active Batches Engine</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((b) => {
          const usagePercent = (b.count / b.limit) * 100;
          return (
            <div key={b.id} className="bg-[#0d1527] border border-gray-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-gray-700 transition-all">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-purple-950 border border-purple-900 text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded">{b.level}</span>
                  <span className="text-[11px] text-gray-400 font-mono">{b.count}/{b.limit} Seats Occupied</span>
                </div>
                <h3 className="text-base font-bold text-white mb-3">{b.name}</h3>
                
                <div className="space-y-2 text-xs border-t border-b border-gray-800/60 py-3 my-3 text-gray-400 font-medium">
                  <div className="flex justify-between"><span>Timings:</span><span className="text-gray-200">{b.time}</span></div>
                  <div className="flex justify-between"><span>Weekly Schedule:</span><span className="text-gray-200">{b.days}</span></div>
                </div>
              </div>

              <div className="mt-2">
                <div className="w-full bg-[#070b19] h-2 rounded-full overflow-hidden mb-3">
                  <div className={`h-full rounded-full transition-all ${usagePercent >= 100 ? 'bg-rose-500' : usagePercent >= 85 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${usagePercent}%` }}></div>
                </div>
                <button className="w-full bg-[#141f35] hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold py-2 rounded-xl transition-all">Manage Student Roster</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}