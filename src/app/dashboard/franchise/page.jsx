"use client";

import React from "react";
import { GraduationCap, Users, IndianRupee, Box, ArrowUpRight, TrendingUp } from "lucide-react";

export default function FranchiseOverview() {
  // तुमचा मूळ डेटा - जसाच्या तसा सुरक्षित
  const stats = [
    { title: "Total Students", count: "148", change: "+12 this month", icon: GraduationCap, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Active Teachers", count: "6", change: "All active", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
    { title: "Pending Fees", count: "₹24,500", change: "8 students pending", icon: IndianRupee, color: "text-rose-400", bg: "bg-rose-500/10" },
    { title: "Abacus Stock", count: "32 Kits", change: "Low stock warning", icon: Box, color: "text-amber-400", bg: "bg-amber-500/10" },
  ];

  // तुमचा मूळ ॲक्टिव्हिटी डेटा
  const recentActivity = [
    { id: "REG-104", student: "Rohan Deshmukh", type: "New Admission", amount: "₹4,500", date: "2026-06-17", status: "Paid" },
    { id: "INV-402", student: "Abacus Kit - Level 1", type: "Inventory Sale", amount: "₹600", date: "2026-06-16", status: "Paid" },
    { id: "REG-103", student: "Isha Sharma", type: "Level 2 Renewal", amount: "₹3,500", date: "2026-06-15", status: "Pending" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* १. हेडर विभाग (Title Section) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Center <span className="text-orange-500">Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Real-time overview of your franchise branch operations and finances.
          </p>
        </div>
        
        {/* छोटा लाईव्ह इंडिकेटर */}
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl self-start sm:self-center">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Live Branch Syncing</span>
        </div>
      </div>

      {/* २. स्टॅट्स कार्ड्स ग्रिड (STATS CARDS GRID) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-slate-950/40 border border-slate-800/60 backdrop-blur-md rounded-2xl p-5 flex items-center justify-between shadow-xl group hover:border-slate-700 transition-all">
              <div className="space-y-2">
                <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-black text-white tracking-tight font-mono">
                  {stat.count}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <TrendingUp size={10} className="text-orange-400" />
                  <span>{stat.change}</span>
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} border border-slate-800/40 group-hover:scale-105 transition-transform duration-300`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ३. रिसेन्ट ट्रान्झॅक्शन्स टेबल विभाग */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
            Recent Center Activities
          </h3>
          <span className="text-[11px] font-mono text-slate-500">Showing last 3 logs</span>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-900 bg-slate-950/60 text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                  <th className="py-4 px-6">Activity ID</th>
                  <th className="py-4 px-6">Description / Name</th>
                  <th className="py-4 px-6">Type</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/50 text-slate-300 font-medium">
                {recentActivity.map((activity) => (
                  <tr key={activity.id} className="hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-6 font-mono text-orange-400 font-bold group-hover:text-orange-300 transition-colors">
                      {activity.id}
                    </td>
                    <td className="py-4 px-6 font-bold text-white">
                      {activity.student}
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {activity.type}
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-mono">
                      {activity.date}
                    </td>
                    <td className="py-4 px-6 font-black text-slate-200 font-mono">
                      {activity.amount}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold inline-block border ${
                        activity.status === "Paid"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
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