// src/app/dashboard/teacher/salary-history/page.jsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function SalaryHistoryPage() {
  const [payrolls] = useState([
    { id: 1, cycle: 'May 2026', base: 15000, studentsCount: 18, incentivePerHead: 200, status: 'Settled', reference: 'TXN-90812' },
    { id: 2, cycle: 'April 2026', base: 15000, studentsCount: 12, incentivePerHead: 200, status: 'Settled', reference: 'TXN-80714' },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/teacher" className="text-xs text-blue-400 font-medium hover:underline mb-1 inline-block">← BACK TO OVERVIEW</Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">Settlement Remuneration Ledger</h1>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
                <th className="py-4 px-6">Payment Billing Cycle</th>
                <th className="py-4 px-6">Base Allowance Metric</th>
                <th className="py-4 px-6">Student Headcount Addon</th>
                <th className="py-4 px-6 text-blue-400">Net Calculated Remuneration</th>
                <th className="py-4 px-6 font-mono">System Audit Token Reference</th>
                <th className="py-4 px-6 text-center">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
              {payrolls.map((p) => {
                const totalIncentive = p.studentsCount * p.incentivePerHead;
                const netGross = p.base + totalIncentive;
                return (
                  <tr key={p.id} className="hover:bg-[#10192e]/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">{p.cycle}</td>
                    <td className="py-4 px-6 font-mono text-gray-400">₹{p.base.toLocaleString()}</td>
                    <td className="py-4 px-6 font-mono text-emerald-400">+{p.studentsCount} Students (₹{totalIncentive})</td>
                    <td className="py-4 px-6 font-mono text-blue-400 font-black text-sm">₹{netGross.toLocaleString()}</td>
                    <td className="py-4 px-6 font-mono text-gray-500 text-[11px]">{p.reference}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-emerald-950 border border-emerald-900 text-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">{p.status}</span>
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