"use client";

import React from "react";
import { GraduationCap, Users, IndianRupee, Box, TrendingUp } from "lucide-react";

export default function FranchiseOverview() {
  
  const stats = [
    { title: "Total Students", count: "148", change: "+12 this month", icon: GraduationCap, color: "text-[#4a5d4e]", bg: "bg-[#4a5d4e]/10" },
    { title: "Active Teachers", count: "6", change: "All active", icon: Users, color: "text-[#4a5d4e]", bg: "bg-[#4a5d4e]/10" },
    { title: "Pending Fees", count: "₹24,500", change: "8 students pending", icon: IndianRupee, color: "text-amber-800", bg: "bg-amber-500/10" },
    { title: "Abacus Stock", count: "32 Kits", change: "Low stock warning", icon: Box, color: "text-amber-800", bg: "bg-amber-500/10" },
  ];

  const recentActivity = [
    { id: "REG-104", student: "Rohan Deshmukh", type: "New Admission", amount: "₹4,500", date: "2026-06-17", status: "Paid" },
    { id: "INV-402", student: "Abacus Kit - Level 1", type: "Inventory Sale", amount: "₹600", date: "2026-06-16", status: "Paid" },
    { id: "REG-103", student: "Isha Sharma", type: "Level 2 Renewal", amount: "₹3,500", date: "2026-06-15", status: "Pending" },
  ];

  return (
    <div className="space-y-6 w-full">

      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e2dcd0] pb-4">
        <div>
          <h2 className="text-base font-black text-[#1a202c] tracking-tight uppercase">
            Center Analytics
          </h2>
          <p className="text-[11px] text-[#8a9485] mt-0.5 font-medium">
            Real-time overview of your franchise branch operations and finances.
          </p>
        </div>
     
        <div className="flex items-center gap-2 bg-[#4a5d4e]/10 border border-[#4a5d4e]/20 px-3 py-1.5 rounded-xl self-start sm:self-center">
          <span className="h-2 w-2 rounded-full bg-[#4a5d4e] animate-pulse"></span>
          <span className="text-[10px] font-mono font-bold text-[#4a5d4e] uppercase tracking-wider">Live Branch Syncing</span>
        </div>
      </div>

      {/* STATS TILES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-[#fcfbfa] border border-[#e2dcd0] rounded-xl p-4 flex items-center justify-between shadow-sm group transition-all">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8a9485]">
                  {stat.title}
                </p>
                <h3 className="text-xl font-black text-[#1a202c] tracking-tight">
                  {stat.count}
                </h3>
                <p className="text-[10px] text-[#4a5d4e] font-medium flex items-center gap-1">
                  <TrendingUp size={10} className="text-[#4a5d4e]" />
                  <span>{stat.change}</span>
                </p>
              </div>
              <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color} border border-[#e2dcd0]/40 group-hover:scale-105 transition-transform duration-300`}>
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* TABLE DATA LISTING */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-xs font-black text-[#7a8475] uppercase tracking-widest">
            Recent Center Activities
          </h3>
          <span className="text-[10px] font-mono text-[#8a9485]">Showing last 3 logs</span>
        </div>

        <div className="bg-[#fcfbfa] border border-[#e2dcd0] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#e2dcd0] bg-[#f4f0e6] text-[10px] uppercase font-bold tracking-wider text-[#7a8475]">
                  <th className="py-3 px-4">Activity ID</th>
                  <th className="py-3 px-4">Description / Name</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2dcd0]/40 text-[#2c3539] font-medium">
                {recentActivity.map((activity) => (
                  <tr key={activity.id} className="hover:bg-[#f5f2eb]/30 transition-colors group">
                    <td className="py-3 px-4 font-mono text-[#4a5d4e] font-bold">
                      {activity.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#1a202c]">
                      {activity.student}
                    </td>
                    <td className="py-3 px-4 text-[#8a9485]">
                      {activity.type}
                    </td>
                    <td className="py-3 px-4 text-[#5a6455] font-mono">
                      {activity.date}
                    </td>
                    <td className="py-3 px-4 font-black text-[#1a202c] font-mono">
                      {activity.amount}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold inline-block border ${
                        activity.status === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
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
      </div>

    </div>
  );
}