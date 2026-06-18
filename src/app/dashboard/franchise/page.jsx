// src/app/dashboard/franchise/page.jsx
import React from 'react';

export default function FranchiseOverview() {
  // Mock Data: Quick analytics numbers
  const stats = [
    { title: 'Total Students', count: '148', change: '+12 this month', icon: '🎓', color: 'text-blue-400' },
    { title: 'Active Teachers', count: '6', change: 'All active', icon: '👩‍🏫', color: 'text-purple-400' },
    { title: 'Pending Fees', count: '₹24,500', change: '8 students pending', icon: '💰', color: 'text-rose-400' },
    { title: 'Abacus Stock', count: '32 Kits', change: 'Low stock warning', icon: '📦', color: 'text-amber-400' },
  ];

  // Mock Data: Recent Revenue/Registrations
  const recentActivity = [
    { id: 'REG-104', student: 'Rohan Deshmukh', type: 'New Admission', amount: '₹4,500', date: '2026-06-17', status: 'Paid' },
    { id: 'INV-402', student: 'Abacus Kit - Level 1', type: 'Inventory Sale', amount: '₹600', date: '2026-06-16', status: 'Paid' },
    { id: 'REG-103', student: 'Isha Sharma', type: 'Level 2 Renewal', amount: '₹3,500', date: '2026-06-15', status: 'Pending' },
  ];

  return (
    <div>
      {/* Title section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Center Analytics</h2>
        <p className="text-xs text-gray-400 mt-1">Real-time overview of your franchise branch operations and finances.</p>
      </div>

      {/* STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#0d1527] border border-gray-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white mt-2 font-mono">{stat.count}</h3>
              <p className="text-[10px] text-gray-500 mt-1">{stat.change}</p>
            </div>
            <div className="text-2xl bg-[#141f35] p-3 rounded-xl border border-gray-800">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* RECENT TRANSACTIONS TABLE */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Recent Center Activities</h3>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">Activity ID</th>
              <th className="py-4 px-6">Description / Name</th>
              <th className="py-4 px-6">Type</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {recentActivity.map((activity) => (
              <tr key={activity.id} className="hover:bg-[#10192e]/40 transition-colors">
                <td className="py-4 px-6 font-mono text-amber-400 font-semibold">{activity.id}</td>
                <td className="py-4 px-6 font-semibold text-white">{activity.student}</td>
                <td className="py-4 px-6 text-gray-400">{activity.type}</td>
                <td className="py-4 px-6 text-gray-500 font-mono">{activity.date}</td>
                <td className="py-4 px-6 font-bold text-gray-200 font-mono">{activity.amount}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activity.status === 'Paid' 
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/50' 
                      : 'bg-amber-950/60 text-amber-400 border border-amber-900/50'
                  }`}>
                    {activity.status}
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