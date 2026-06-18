"use client";

import React from "react";
import Link from "next/link";
import { useStudentData } from "./StudentContext";

export default function StudentDashboardOverview() {
  const { profile, assignments, submitAssignment } = useStudentData();

  const pendingAssignments = assignments.filter(a => a.status === "Pending");

  return (
    <div className="space-y-6">
      {/* Welcome Banner Alert */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-4 flex items-start gap-3.5 shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)] animate-fade-in">
        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-extrabold text-blue-100">
            Welcome Back, {profile.name}!
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            You have successfully completed <strong>{profile.classesAttended} classes</strong> in your Level {profile.level} course. Keep up the great practice!
          </p>
        </div>
      </div>

      {/* KPI Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: "Current Level", value: `Level ${profile.level}`, subtitle: "Beginner Arithmetic", icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25", border: "border-blue-500/15" },
          { title: "Learning Progress", value: `${profile.progress}%`, subtitle: `${profile.classesAttended}/${profile.totalClasses} Classes Done`, icon: "M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z", border: "border-emerald-500/15" },
          { title: "Classes Attended", value: profile.classesAttended, subtitle: "Next session: Sat 10:00 AM", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5", border: "border-amber-500/15" },
          { title: "Assignments Due", value: pendingAssignments.length, subtitle: `${profile.assignmentsDone}/${profile.assignmentsTotal} Completed`, icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125", border: pendingAssignments.length > 0 ? "border-rose-500/30 text-rose-300" : "border-slate-500/15" }
        ].map((stat, i) => (
          <div key={i} className={`rounded-2xl border bg-white/[0.03] p-5 shadow-md backdrop-blur-md transition-all hover:bg-white/[0.05] hover:scale-[1.02] ${stat.border}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</span>
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
              </svg>
            </div>
            <div className="text-3xl font-extrabold text-white mt-3 font-mono">
              {stat.value}
            </div>
            <span className="text-[10px] text-slate-500 font-semibold block mt-1">
              {stat.subtitle}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Actions & Assignments Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Operations Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide uppercase border-b border-white/5 pb-3 mb-4">
              Quick Operations
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/dashboard/student/exams"
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-left transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-200 block">Exams & Tests</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Check dates & reports</span>
              </Link>

              <Link
                href="/dashboard/student/attendance"
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-left transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9 3.75l2.25 2.25L15 12" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-200 block">Class Attendance</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Logs & Leave requests</span>
              </Link>

              <Link
                href="/dashboard/student/fees"
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-left transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-200 block">Tuition Fees</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Pay due invoice fee</span>
              </Link>

              <Link
                href="/dashboard/student/notifications"
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-left transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-200 block">Announcements</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Check notifications</span>
              </Link>

              <Link
                href="/dashboard/student/profile"
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-left transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-200 block">Edit Profile</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Change phone or email</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Pending Assignments List Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase border-b border-white/5 pb-3 mb-4 flex items-center justify-between">
            <span>Assignments Tracker</span>
            <span className="text-[10px] text-slate-500 tracking-normal font-mono">Active Tasks</span>
          </h3>
          
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
            {assignments.map((assign) => (
              <div key={assign.id} className="flex items-center justify-between text-xs py-2.5 border-b border-white/5 last:border-b-0">
                <div className="flex flex-col gap-0.5">
                  <span className={`font-semibold ${assign.status === "Completed" ? "text-slate-500 line-through" : "text-slate-200"}`}>
                    {assign.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-light">
                    Due by {assign.dueDate} • Difficulty: <strong className="text-blue-400">{assign.difficulty}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{assign.points}</span>
                  {assign.status === "Pending" ? (
                    <button
                      onClick={() => submitAssignment(assign.id)}
                      className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/25 active:scale-95 transition-all text-[10px] font-bold"
                    >
                      Submit
                    </button>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded text-[9px] font-bold border border-emerald-500/25 bg-emerald-500/10 text-emerald-400">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
