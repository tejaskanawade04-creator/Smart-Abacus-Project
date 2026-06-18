// src/app/dashboard/teacher/salary-history/page.jsx
import React from 'react';

export default function SalaryHistoryPage() {
  const payouts = [
    { month: 'May 2026', classesConducted: 24, basePay: '₹12,000', bonus: '₹1,500', totalPaid: '₹13,500', status: 'Released', date: '2026-06-02' },
    { month: 'April 2026', classesConducted: 26, basePay: '₹13,000', bonus: '₹1,000', totalPaid: '₹14,000', status: 'Released', date: '2026-05-02' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Salary & Payout History</h2>
        <p className="text-xs text-gray-400 mt-1">Track your attendance-aggregated monthly earnings and automatic salary slips.</p>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">Month</th>
              <th className="py-4 px-6">Classes Conducted</th>
              <th className="py-4 px-6">Base Payout</th>
              <th className="py-4 px-6">Incentives / Bonus</th>
              <th className="py-4 px-6">Total Net Salary</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Payment Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {payouts.map((payout, index) => (
              <tr key={index} className="hover:bg-[#10192e]/40 transition-colors">
                <td className="py-4 px-6 font-bold text-white">{payout.month}</td>
                <td className="py-4 px-6 font-mono text-gray-400">{payout.classesConducted} Sessions</td>
                <td className="py-4 px-6 text-gray-400">{payout.basePay}</td>
                <td className="py-4 px-6 text-emerald-400">{payout.bonus}</td>
                <td className="py-4 px-6 font-bold text-white text-sm">{payout.totalPaid}</td>
                <td className="py-4 px-6">
                  <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-900/50 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {payout.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-400 font-mono">{payout.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}