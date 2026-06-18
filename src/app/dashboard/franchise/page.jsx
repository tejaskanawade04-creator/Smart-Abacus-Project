"use client";

import React, { useState } from "react";

import Link from "next/link";
import { TrendingUp, Award, Users, BookOpen, Calculator, Landmark } from "lucide-react";

export default function FranchiseOpportunityPage() {
  const [studentCount, setStudentCount] = useState(60);

  // Income Calculator Formula
  const tuitionFeePerStudent = 1500; // Monthly fee in Rupees
  const monthlyRevenue = studentCount * tuitionFeePerStudent;
  
  // Expenses estimate (Rent, teacher payout, material kits, royalty)
  const baseRentExpense = 12000;
  const teacherClassPay = Math.ceil(studentCount / 15) * 8000; // 1 teacher per 15 students
  const studentKitExpense = studentCount * 150;
  const standardExpenses = baseRentExpense + teacherClassPay + studentKitExpense;
  
  const estimatedProfit = monthlyRevenue - standardExpenses;

  const supports = [
    {
      title: "Instructor Training & Certification",
      desc: "Comprehensive 8-level curriculum training for your teachers, ensuring standard pedagogy across all locations.",
      icon: Award
    },
    {
      title: "Marketing & Lead Gen Collateral",
      desc: "Brand banners, social media templates, local SEO, and national advertising campaigns to populate your classrooms.",
      icon: TrendingUp
    },
    {
      title: "Proprietary Software Systems",
      desc: "Full center database dashboards to manage student marks, class schedules, fees, inventory requests, and teacher rates.",
      icon: LaptopIcon
    },
    {
      title: "Curriculum Material Kit Supply",
      desc: "Access to authentic abacus tools, student levels textbooks, performance tracking worksheets, and graduation certificates.",
      icon: Landmark
    }
  ];

  return (
    <PublicPageWrapper>
      <div className="relative pt-10 pb-20 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-[10%] left-[-15%] w-[45vw] h-[45vw] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
              Franchise Opportunity
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Start Your Own Abacus{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Academy
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Join India's most trusted mental math program. Benefit from a low investment business structure with robust central operations support, software management tools, and high ROI potential.
            </p>
          </div>

          {/* Core financial metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { label: "Tuition Revenue", val: "₹50k - ₹60k", sub: "Potential monthly income", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
              { label: "Initial Setup Cost", val: "₹1.5 - 2 Lakh", sub: "Low capital investment", color: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
              { label: "ROI Potential", val: "300%+", sub: "Annualized percentage rate", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
              { label: "Payback Period", val: "3 - 4 Months", sub: "Speedy break-even target", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" }
            ].map((metric, idx) => (
              <div key={idx} className={`rounded-2xl border p-6 text-center ${metric.color}`}>
                <span className="text-[10px] font-bold uppercase tracking-wider block mb-2 opacity-80">{metric.label}</span>
                <h3 className="text-2xl md:text-3xl font-black mb-1">{metric.val}</h3>
                <p className="text-[10px] font-semibold opacity-70">{metric.sub}</p>
              </div>
            ))}
          </div>

          {/* ROI Calculator Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            
            {/* Calculator Control */}
            <div className="rounded-3xl bg-slate-900/40 border border-white/5 p-8 md:p-10 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Interactive Profitability Calculator</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-8">
                Adjust the slider below to simulate student enrollments at your local center and view your estimated monthly net profit calculations.
              </p>
              
              {/* Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3 text-sm font-bold text-slate-350">
                  <span>Enrolled Students</span>
                  <span className="text-indigo-400 text-base">{studentCount} Students</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={studentCount}
                  onChange={(e) => setStudentCount(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-800 accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-bold uppercase">
                  <span>10 Students</span>
                  <span>100 Students</span>
                  <span>200 Students</span>
                </div>
              </div>

              {/* Formula details */}
              <div className="space-y-3.5 border-t border-white/5 pt-6 text-xs font-semibold text-slate-400">
                <div className="flex justify-between">
                  <span>Gross Tuition Revenue (₹1500/mo)</span>
                  <span className="text-white">₹{monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Rent/Site Costs</span>
                  <span className="text-white">₹{baseRentExpense.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Teacher Payrolls</span>
                  <span className="text-white">₹{teacherClassPay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Student kits & Material costs</span>
                  <span className="text-white">₹{studentKitExpense.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Calculations Result */}
            <div className="rounded-3xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 p-8 md:p-10 text-center flex flex-col justify-between h-full min-h-[350px]">
              <div>
                <span className="inline-block px-3 py-1 rounded bg-slate-950/40 text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-6">
                  Projected Statement
                </span>
                <h4 className="text-slate-450 text-sm font-semibold mb-2">Estimated Monthly Net Profit</h4>
                <h3 className={`text-4xl md:text-5xl font-black tracking-tight ${estimatedProfit >= 0 ? "text-emerald-400" : "text-rose-500"}`}>
                  ₹{estimatedProfit.toLocaleString()}
                </h3>
                <p className="text-[10px] text-slate-500 mt-3 font-semibold uppercase">
                  Calculated after basic operating expenditures
                </p>
              </div>

              <div className="mt-8 border-t border-white/5 pt-6">
                <Link
                  href="/enquiry?type=franchise"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm tracking-wide transition-all hover:scale-105 shadow-xl shadow-indigo-500/25"
                >
                  <TrendingUp className="w-4 h-4" />
                  Apply for Franchise Opportunity
                </Link>
              </div>
            </div>

          </div>

          {/* Support Program List */}
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-14 text-center">
              Our 360° Support <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Model</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {supports.map((sup, idx) => {
                const Icon = sup.icon;
                return (
                  <div key={idx} className="rounded-2xl bg-slate-900/30 border border-white/5 p-6 md:p-8 flex gap-5 items-start">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{sup.title}</h4>
                      <p className="text-xs text-slate-450 leading-relaxed">{sup.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </PublicPageWrapper>
  );
}

// Quick component-level lucide wrapper support
function LaptopIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M12 17h.01" />
      <path d="M17 21H7" />
    </svg>
  );
}
