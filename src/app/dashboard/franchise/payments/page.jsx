// src/app/dashboard/franchise/payments/page.jsx
import React from 'react';

export default function FranchisePayments() {
  const paymentsList = [
    { id: 'PAY-0091', type: 'Royalty to Admin (15%)', month: 'May 2026', amount: '₹8,400', method: 'Bank Transfer', status: 'Settled' },
    { id: 'PAY-0084', type: 'Teacher Salary - Aman S.', month: 'May 2026', amount: '₹13,500', method: 'UPI', status: 'Settled' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Expenses & Royalty Payments</h2>
        <p className="text-xs text-gray-400 mt-1">Track monthly royalty payouts due to main administration and outgoing salaries.</p>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">Payment Reference</th>
              <th className="py-4 px-6">Expense Type / Description</th>
              <th className="py-4 px-6">Billing Month</th>
              <th className="py-4 px-6">Amount Disbursed</th>
              <th className="py-4 px-6">Payment Method</th>
              <th className="py-4 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {paymentsList.map((p) => (
              <tr key={p.id} className="hover:bg-[#10192e]/40 transition-colors">
                <td className="py-4 px-6 font-mono text-amber-400 font-semibold">{p.id}</td>
                <td className="py-4 px-6 font-semibold text-white">{p.type}</td>
                <td className="py-4 px-6 text-gray-400">{p.month}</td>
                <td className="py-4 px-6 font-bold font-mono text-gray-100">{p.amount}</td>
                <td className="py-4 px-6 text-gray-500">{p.method}</td>
                <td className="py-4 px-6">
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-900/40 px-2 py-0.5 rounded text-[10px] font-bold">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}