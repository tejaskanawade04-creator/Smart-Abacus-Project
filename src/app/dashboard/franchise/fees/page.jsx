// src/app/dashboard/franchise/fees/page.jsx
import React from 'react';

export default function FranchiseFees() {
  const feeRecords = [
    { id: 'TXN-701', student: 'Isha Sharma', level: 'Level 2', amount: '₹3,500', dueDate: '2026-06-15', status: 'Pending' },
    { id: 'TXN-699', student: 'Rohan Deshmukh', level: 'Level 1', amount: '₹4,500', dueDate: '2026-06-02', status: 'Paid' },
    { id: 'TXN-654', student: 'Aditya Patil', level: 'Level 4', amount: '₹3,500', dueDate: '2026-05-20', status: 'Overdue' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Fee & Collection Management</h2>
          <p className="text-xs text-gray-400 mt-1">Track student monthly tuitions, pending collections, and generate digital receipts.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-all">
          💵 Record Fee Payment
        </button>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">Invoice / TXN ID</th>
              <th className="py-4 px-6">Student</th>
              <th className="py-4 px-6">Abacus Level</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6">Due Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {feeRecords.map((record) => (
              <tr key={record.id} className="hover:bg-[#10192e]/40 transition-colors">
                <td className="py-4 px-6 font-mono text-amber-400 font-semibold">{record.id}</td>
                <td className="py-4 px-6 font-semibold text-white">{record.student}</td>
                <td className="py-4 px-6 text-gray-400">{record.level}</td>
                <td className="py-4 px-6 font-bold font-mono text-gray-100">{record.amount}</td>
                <td className="py-4 px-6 text-gray-400 font-mono">{record.dueDate}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    record.status === 'Paid' ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/30' :
                    record.status === 'Pending' ? 'text-amber-400 bg-amber-950/40 border border-amber-900/30' :
                    'text-rose-400 bg-rose-950/40 border border-rose-900/30'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button className="text-blue-400 hover:underline text-[11px]">
                    {record.status === 'Paid' ? '📥 Download' : '🔔 Remind'}
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