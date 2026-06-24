"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { StudentDataProvider, useStudentData } from "./StudentContext";


function StudentLayoutInner({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { profile } = useStudentData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    router.push("/login");
  };

  // Determine active route name and active tab id
  let activeTabName = "Student Dashboard";
  let activeTabId = "overview";

  if (pathname.endsWith("/exams")) {
    activeTabName = "Exams";
    activeTabId = "exams";
  } else if (pathname.endsWith("/fees")) {
    activeTabName = "Fees / Invoices";
    activeTabId = "fees";
  } else if (pathname.endsWith("/notifications")) {
    activeTabName = "Notifications";
    activeTabId = "notifications";
  } else if (pathname.endsWith("/profile")) {
    activeTabName = "My Profile";
    activeTabId = "profile";
  } else if (pathname.endsWith("/progress")) {
    activeTabName = "Learning Progress";
    activeTabId = "progress";
  } else if (pathname.endsWith("/attendance")) {
    activeTabName = "Class Attendance";
    activeTabId = "attendance";
  }

  const navLinks = [
    { id: "overview", label: "Overview", href: "/dashboard/student", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
    { id: "attendance", label: "Attendance", href: "/dashboard/student/attendance", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9 3.75l2.25 2.25L15 12" },
    { id: "progress", label: "Progress", href: "/dashboard/student/progress", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
    { id: "exams", label: "Exams", href: "/dashboard/student/exams", icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0112 3.75c.38.04.76.082 1.137.124M3.75 18v-7.5A2.25 2.25 0 016 8.25h2.25M3.75 18h4.5m-4.5 0a2.25 2.25 0 002.25 2.25h3.375c.621 0 1.125-.504 1.125-1.125V18M8.25 8.25V6a2.25 2.25 0 012.25-2.25h1.5M10.5 8.25H12M8.25 8.25v1.5a2.25 2.25 0 002.25 2.25H12" },
    { id: "fees", label: "Fees / Invoices", href: "/dashboard/student/fees", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5M4.5 19.25h15M18 19.25a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0018 4.5H6A2.25 2.25 0 003.75 6.75v10.25a2.25 2.25 0 002.25 2.25H18zM12 9.75v3.5m-1.75-1.75h3.5" },
    { id: "notifications", label: "Notifications", href: "/dashboard/student/notifications", icon: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" },
    { id: "profile", label: "My Profile", href: "/dashboard/student/profile", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans flex relative overflow-hidden">
      {/* Background Glowing Blobs matching admin design */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
        />
      )}

      {/* SIDEBAR PANEL */}
      <aside className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-slate-900/60 backdrop-blur-xl p-5 flex flex-col justify-between transition-transform duration-300 lg:transform-none ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        
        {/* Sidebar Header / Logo */}
        <div>
          <div className="flex items-center gap-3 border-b border-white/5 pb-5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
              </svg>
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-wider uppercase text-white">
                Smart Abacus
              </h1>
              <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-widest">
                Student Portal
              </span>
            </div>
          </div>

          {/* Navigation Links matching student folder structure */}
          <nav className="space-y-1.5">
            {navLinks.map((tab) => {
              const active = activeTabId === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-blue-500/25 to-indigo-600/25 border border-blue-500/30 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Profile Info */}
        <div className="border-t border-white/5 pt-4">
          <div className="rounded-2xl bg-white/[0.03] p-3 border border-white/5 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-blue-500/30 flex items-center justify-center font-black text-xs text-blue-300">
                NP
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-200 truncate">{profile.name}</p>
                <span className="text-[10px] text-slate-500">Level {profile.level} Student</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/25 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN WINDOW CONTAINER */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10 overflow-y-auto">
        
        {/* HEADER BAR */}
        <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Hamburger for mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb */}
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                <span>Dashboard</span>
                <span>/</span>
                <span>Student</span>
                <span>/</span>
                <span className="text-blue-400">{activeTabId}</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-wide capitalize mt-0.5">
                {activeTabName}
              </h2>
            </div>
          </div>

          {/* Live Date/Clock & Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                System Status: Online
              </span>
              
            </div>
            
            <div className="w-px h-6 bg-white/10 hidden md:block" />

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">Student Portal</span>
            </div>
          </div>
        </header>

        {/* VIEW SCENARIOS (CONTENT BODY) */}
        <div className="p-6 md:p-8 flex-1">
          {children}
        </div>
      </div>
    </main>
  );
}

export default function StudentLayout({ children }) {
  return (
    <StudentDataProvider>
      <StudentLayoutInner>{children}</StudentLayoutInner>
    </StudentDataProvider>
  );
}
