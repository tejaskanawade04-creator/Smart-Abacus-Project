"use client";

import React, { useState, useMemo } from "react";
import { 
  TrendingUp, Users, DollarSign, Award, Download, Calendar, 
  BarChart3, PieChart, ArrowUpRight, FileSpreadsheet, RefreshCw 
} from "lucide-react";

export default function ReportsAnalytics() {
  const [reportRange, setReportRange] = useState("2026");

  // Mock Financial & Enrollment Database Arrays
  const monthlyRevenue = [
    { month: "Jan", revenue: 45000, enrollments: 12 },
    { month: "Feb", revenue: 52000, enrollments: 15 },
    { month: "Mar", revenue: 61000, enrollments: 18 },
    { month: "Apr", revenue: 58000, enrollments: 10 },
    { month: "May", revenue: 72000, enrollments: 22 },
    { month: "Jun", revenue: 85000, enrollments: 25 }, // Current Month
  ];

  const levelDistribution = [
    { level: "Level 1", students: 35, percentage: 40, color: "bg-amber-500" },
    { level: "Level 2", students: 25, percentage: 28, color: "bg-blue-500" },
    { level: "Level 3", students: 18, percentage: 20, color: "bg-purple-500" },
    { level: "Level 4", students: 10, percentage: 12, color: "bg-cyan-500" },
  ];

  // Live Aggregate Computations
  const summaryMetrics = useMemo(() => {
    const totalRev = monthlyRevenue.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalNewStudents = monthlyRevenue.reduce((acc, curr) => acc + curr.enrollments, 0);
    return {
      totalRevenue: totalRev,
      averageMonthly: Math.round(totalRev / monthlyRevenue.length),
      totalEnrollments: totalNewStudents,
      retentionRate: "94.2%"
    };
  }, [monthlyRevenue]);

  // 📥 Advanced Financial Spreadsheet Downloader (CSV Engine)
  const downloadAuditReport = () => {
    try {
      const headers = ["Month", "Revenue Collected (₹)", "New Student Signups"];
      const rows = monthlyRevenue.map(item => [
        item.month, item.revenue, item.enrollments
      ].join(","));

      const csvContent = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Financial_Audit_Report_${reportRange}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Local data dumping pipeline interrupted", error);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 text-slate-100 max-w-[1600px] mx-auto">
      
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">Business <span className="text-purple-400">Intelligence Engine</span></h2>
          <p className="text-xs text-slate-400 mt-1">Audit gross node revenue channels, curriculum popularity, and batch scale vectors.</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center text-xs">
          <select value={reportRange} onChange={(e) => setReportRange(e.target.value)} className="bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 text-slate-300 focus:outline-none font-mono">
            <option value="2026">FY 2026</option>
            <option value="2025">FY 2025</option>
          </select>
          <button onClick={downloadAuditReport} className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-xs font-extrabold rounded-xl text-white hover:brightness-110 shadow-lg shadow-purple-600/10 transition-all cursor-pointer">
            <Download size={14} /> <span>Export Audit Sheet</span>
          </button>
        </div>
      </div>

      {/* Grid Summary Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500 flex items-center gap-1"><DollarSign size={12} /> Cumulative Revenue</div>
          <div className="text-xl font-black text-white mt-1">₹{summaryMetrics.totalRevenue.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-1 font-mono"><ArrowUpRight size={10} /> +12.4% vs last Qtr</div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-purple-400 flex items-center gap-1"><Users size={12} /> Gross Registrations</div>
          <div className="text-xl font-black text-purple-400 mt-1">{summaryMetrics.totalEnrollments} Pupils</div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">Across active sessions</div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500 flex items-center gap-1"><TrendingUp size={12} /> Monthly Average</div>
          <div className="text-xl font-black text-white mt-1">₹{summaryMetrics.averageMonthly.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">Calculated mean yield</div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 flex items-center gap-1"><Award size={12} /> Retention Index</div>
          <div className="text-xl font-black text-cyan-400 mt-1">{summaryMetrics.retentionRate}</div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">Low churn threshold</div>
        </div>
      </div>

      {/* Analytics Visualization Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Revenue Velocity Bars */}
        <div className="lg:col-span-2 bg-[#0b1220] border border-slate-900 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6 border-b border-slate-900/60 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-purple-400" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono">Revenue Scale Trajectory</h3>
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase">Amounts in INR (₹)</span>
          </div>

          {/* Real CSS Analytics Bars Container */}
          <div className="flex items-end justify-between h-48 pt-4 px-2 font-mono text-[10px] text-slate-400 border-b border-slate-900">
            {monthlyRevenue.map((item, idx) => {
              const maxAmt = 90000;
              const barHeight = `${(item.revenue / maxAmt) * 100}%`;
              return (
                <div key={idx} className="flex flex-col items-center gap-2 w-1/6 group h-full justify-end">
                  {/* Floating Indicator Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 bg-slate-950 border border-slate-800 text-white rounded px-1.5 py-0.5 text-[9px] mb-1 transition-opacity shadow-xl font-bold">
                    ₹{item.revenue / 1000}k
                  </div>
                  <div style={{ height: barHeight }} className="w-8 sm:w-10 bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300 shadow-md shadow-purple-900/20" />
                  <span className="mt-1 font-sans font-bold text-slate-500 group-hover:text-white transition-colors">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Curriculum Level Distribution Weight */}
        <div className="bg-[#0b1220] border border-slate-900 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-900/60 pb-3">
            <PieChart size={16} className="text-cyan-400" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono">Curriculum Scale Distribution</h3>
          </div>

          <div className="space-y-4 my-auto">
            {levelDistribution.map((dist, idx) => (
              <div key={idx} className="text-xs space-y-1">
                <div className="flex justify-between items-center font-mono">
                  <span className="font-bold text-slate-300">{dist.level}</span>
                  <span className="text-slate-500">{dist.students} Pupils <span className="text-white font-bold">({dist.percentage}%)</span></span>
                </div>
                {/* Horizontal Scale Tracker */}
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                  <div style={{ width: `${dist.percentage}%` }} className={`h-full ${dist.color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-900/60 mt-4 text-[10px] text-slate-500 font-mono leading-relaxed">
            Data parameters accurately indicate Level 1 as the highest primary registration driver.
          </div>
        </div>

      </div>
    </div>
  );
}