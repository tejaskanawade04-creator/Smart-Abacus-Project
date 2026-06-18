"use client";

import React, { useState } from "react";
import { useStudentData } from "../StudentContext";

const ATTENDANCE_RECORDS = [
  { id: 1, classNum: 1, date: "2026-06-13", time: "10:00 AM", topic: "Abacus Basics: Introduction to 17-Rod Tool", status: "Present", checkIn: "09:55 AM", teacherNotes: "Excellent bead movement speed and high focus." },
  { id: 2, classNum: 2, date: "2026-06-14", time: "11:30 AM", topic: "Bead Values and Unit Dot Alignment", status: "Present", checkIn: "11:28 AM", teacherNotes: "Fast response in identification of numbers on the abacus." },
  { id: 3, classNum: 3, date: "2026-06-20", time: "10:00 AM", topic: "Direct Addition of Single Digits (+1 to +4)", status: "Present", checkIn: "09:58 AM", teacherNotes: "Completed assignments correctly, good understanding." },
  { id: 4, classNum: 4, date: "2026-06-21", time: "11:30 AM", topic: "Direct Subtraction of Single Digits (-1 to -4)", status: "Present", checkIn: "10:02 AM", teacherNotes: "Joined slightly late, but caught up quickly." },
  { id: 5, classNum: 5, date: "2026-06-27", time: "10:00 AM", topic: "Introduction to Small Friends Concept", status: "Absent", checkIn: "-", teacherNotes: "Absent. Parent requested leave (medical checkup)." },
  { id: 6, classNum: 6, date: "2026-06-28", time: "11:30 AM", topic: "Small Friend Formula: Add +4 (+5 -1)", status: "Present", checkIn: "11:25 AM", teacherNotes: "Quick to grasp the small friend concept. Good practice." },
  { id: 7, classNum: 7, date: "2026-07-04", time: "10:00 AM", topic: "Small Friend Formula: Add +3 and +2", status: "Present", checkIn: "09:54 AM", teacherNotes: "Excellent accuracy on speed calculations." },
  { id: 8, classNum: 8, date: "2026-07-05", time: "11:30 AM", topic: "Small Friend Formula: Add +1 (+5 -4)", status: "Present", checkIn: "11:29 AM", teacherNotes: "Maintained a high accuracy rate during test." },
  { id: 9, classNum: 9, date: "2026-07-11", time: "10:00 AM", topic: "Small Friends Subtraction Basics", status: "Present", checkIn: "09:57 AM", teacherNotes: "Performed well in mental abacus visual arithmetic." },
  { id: 10, classNum: 10, date: "2026-07-12", time: "11:30 AM", topic: "Small Friend Formula: Sub -4 and -3", status: "Present", checkIn: "11:30 AM", teacherNotes: "Accurate thumb and index finger coordination." },
  { id: 11, classNum: 11, date: "2026-07-18", time: "10:00 AM", topic: "Small Friend Formula: Sub -2 and -1", status: "Present", checkIn: "09:59 AM", teacherNotes: "Focused during oral arithmetic calculation rounds." },
  { id: 12, classNum: 12, date: "2026-07-19", time: "11:30 AM", topic: "Mixed Arithmetic Drill (Direct & Small Friends)", status: "Present", checkIn: "11:20 AM", teacherNotes: "Completed oral speeds assessment with 95% score." },
  { id: 13, classNum: 13, date: "2026-07-25", time: "10:00 AM", topic: "Introduction to Big Friends Concept", status: "Present", checkIn: "09:55 AM", teacherNotes: "Grasping Big Friend addition rules rapidly." },
  { id: 14, classNum: 14, date: "2026-07-26", time: "11:30 AM", topic: "Big Friends Formula: Add +9 (+10 -1)", status: "Scheduled", checkIn: "-", teacherNotes: "Upcoming session." },
  { id: 15, classNum: 15, date: "2026-08-01", time: "10:00 AM", topic: "Big Friends Formula: Add +8 and +7", status: "Scheduled", checkIn: "-", teacherNotes: "Upcoming session." },
  { id: 16, classNum: 16, date: "2026-08-02", time: "11:30 AM", topic: "Big Friends Formula: Add +6 and +5", status: "Scheduled", checkIn: "-", teacherNotes: "Upcoming session." },
  { id: 17, classNum: 17, date: "2026-08-08", time: "10:00 AM", topic: "Oral Speed Arithmetic Practice", status: "Scheduled", checkIn: "-", teacherNotes: "Upcoming session." },
  { id: 18, classNum: 18, date: "2026-08-09", time: "11:30 AM", topic: "Level 1 Final Assessment & Review", status: "Scheduled", checkIn: "-", teacherNotes: "Final assessment to clear Level 1." }
];

export default function StudentAttendancePage() {
  const { profile } = useStudentData();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Leave form states
  const [leaveClassId, setLeaveClassId] = useState("");
  const [leaveReason, setLeaveReason] = useState("Medical");
  const [leaveDetail, setLeaveDetail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Calculate statistics from the records
  const totalRecords = ATTENDANCE_RECORDS.length;
  const presentCount = ATTENDANCE_RECORDS.filter(r => r.status === "Present").length;
  const absentCount = ATTENDANCE_RECORDS.filter(r => r.status === "Absent").length;
  const scheduledCount = ATTENDANCE_RECORDS.filter(r => r.status === "Scheduled").length;
  const attendanceRate = totalRecords - scheduledCount > 0 
    ? Math.round((presentCount / (totalRecords - scheduledCount)) * 100) 
    : 100;

  // Filter records
  const filteredRecords = ATTENDANCE_RECORDS.filter(record => {
    const matchesStatus = filter === "All" || record.status === filter;
    const matchesSearch = record.topic.toLowerCase().includes(search.toLowerCase()) || 
                          record.classNum.toString().includes(search);
    return matchesStatus && matchesSearch;
  });

  // Handle Leave Submission
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveClassId) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setLeaveDetail("");
      setLeaveClassId("");
      
      // Auto-clear success message after 4 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }, 1200);
  };

  // Get upcoming class list for leave dropdown
  const upcomingClasses = ATTENDANCE_RECORDS.filter(r => r.status === "Scheduled");

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner Overview */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
        <div>
          <h3 className="text-sm font-bold text-white">Student Attendance Dashboard</h3>
          <p className="text-[10px] text-slate-400 font-light mt-0.5">
            Track your class attendance rate, upcoming schedules, and manage leave requests.
          </p>
        </div>
        <div className="px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-300">
          Academic Term: June - August 2026
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Circular Gauge Card */}
        <div className="md:col-span-4 rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md shadow-lg flex flex-col items-center justify-center text-center">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">
            Attendance Rate
          </h4>
          
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG Ring Gauge */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="62"
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="62"
                className="stroke-gradient stroke-blue-500"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 62}
                strokeDashoffset={2 * Math.PI * 62 * (1 - attendanceRate / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-white font-mono">{attendanceRate}%</span>
              <span className="text-[9px] text-slate-500 font-semibold uppercase mt-0.5">Present</span>
            </div>
          </div>
          
          <p className="text-[10px] text-slate-400 font-light mt-5 leading-relaxed max-w-[200px]">
            You attended <strong>{presentCount}</strong> out of <strong>{presentCount + absentCount}</strong> past sessions.
          </p>
        </div>

        {/* Numeric Stats Cards and Details */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { title: "Total Program Classes", value: totalRecords, subtitle: "Full Level 1 Course", border: "border-white/5", color: "text-slate-100" },
            { title: "Sessions Present", value: presentCount, subtitle: "Bead Practice Cleared", border: "border-emerald-500/10 bg-emerald-500/[0.01]", color: "text-emerald-400" },
            { title: "Sessions Excused", value: absentCount, subtitle: "Medical/Prior Permission", border: "border-rose-500/10 bg-rose-500/[0.01]", color: "text-rose-400" }
          ].map((stat, i) => (
            <div key={i} className={`rounded-2xl border bg-white/[0.02] p-5 shadow-md flex flex-col justify-between ${stat.border}`}>
              <div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">{stat.title}</span>
                <span className="text-[10px] text-slate-400 font-light block">{stat.subtitle}</span>
              </div>
              <div className={`text-3xl font-black mt-6 font-mono ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          ))}

          {/* Quick info alert on attendance rule */}
          <div className="col-span-1 sm:col-span-3 rounded-xl border border-blue-500/15 bg-blue-500/5 p-4 flex gap-3 text-xs leading-relaxed text-blue-300">
            <span className="text-sm">ℹ</span>
            <div>
              <strong className="text-white block font-bold text-[11px] mb-0.5">Note on Scheduled Classes</strong>
              Class schedules are set for weekend batches (Saturday & Sunday). In case of an emergency, please use the Leave Request form below to inform your instructor at least 24 hours prior.
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Grid: Attendance log list & Request Leave Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Attendance Log Table Panel */}
        <div className="lg:col-span-8 rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 mb-5 gap-3">
              <div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Class Session Logs
                </h3>
                <p className="text-[10px] text-slate-500 font-light mt-0.5">
                  Detailed timeline of syllabus topics, dates, and check-in times.
                </p>
              </div>
              
              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search topic or class..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-slate-950 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/40 w-44"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-4 border-b border-white/[0.03] pb-3">
              {["All", "Present", "Absent", "Scheduled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide transition-all ${
                    filter === tab 
                      ? "bg-blue-500/10 border border-blue-500/30 text-blue-400 shadow-inner" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {tab === "All" ? "All Sessions" : tab} 
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-md bg-white/5 text-[9px] font-mono">
                    {tab === "All" ? totalRecords : tab === "Present" ? presentCount : tab === "Absent" ? absentCount : scheduledCount}
                  </span>
                </button>
              ))}
            </div>

            {/* Scrollable table container */}
            <div className="overflow-x-auto max-h-[480px] overflow-y-auto pr-1">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                    <th className="py-2.5">Class</th>
                    <th className="py-2.5">Topic Details</th>
                    <th className="py-2.5">Date & Time</th>
                    <th className="py-2.5 text-center">Status</th>
                    <th className="py-2.5 text-right">Check-in</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                      <tr 
                        key={record.id} 
                        className="group hover:bg-white/[0.01] transition-all"
                      >
                        <td className="py-3.5 font-bold font-mono text-slate-400 text-center w-10">
                          #{record.classNum}
                        </td>
                        <td className="py-3.5 max-w-[220px] pr-3">
                          <span className="font-semibold text-slate-200 block truncate group-hover:text-white transition-colors">
                            {record.topic}
                          </span>
                          <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                            {record.teacherNotes}
                          </span>
                        </td>
                        <td className="py-3.5 text-slate-300 font-mono">
                          <span className="block font-bold">{record.date}</span>
                          <span className="text-[9px] text-slate-500">{record.time}</span>
                        </td>
                        <td className="py-3.5 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                            record.status === "Present" 
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : record.status === "Absent"
                                ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                                : "bg-slate-800/40 border-white/5 text-slate-400"
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right font-mono font-bold text-slate-400">
                          {record.checkIn}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-500 font-light italic">
                        No sessions match the current search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Leave Request Sidebar Form */}
        <div className="lg:col-span-4 rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-white/5 pb-3 mb-4">
              Submit Leave Request
            </h3>
            
            {submitSuccess ? (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center animate-fade-in flex flex-col items-center justify-center my-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 text-lg font-bold">
                  ✓
                </div>
                <h4 className="text-xs font-bold text-emerald-300">Request Sent Successfully</h4>
                <p className="text-[9px] text-slate-400 font-light mt-1.5 max-w-[200px] leading-relaxed">
                  Your leave notice has been forwarded to teacher <strong>Aman Sharma</strong>. Check notifications later for approval.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeaveSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                    Select Upcoming Session
                  </label>
                  <select
                    required
                    value={leaveClassId}
                    onChange={(e) => setLeaveClassId(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-xs text-white outline-none focus:border-blue-500/50 transition-all cursor-pointer"
                  >
                    <option value="" disabled className="bg-slate-900 text-slate-400">-- Choose Upcoming Class --</option>
                    {upcomingClasses.map((item) => (
                      <option key={item.id} value={item.id} className="bg-slate-900 text-white">
                        Class #{item.classNum} ({item.date}) - {item.topic.split(":")[0]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                    Reason for Leave
                  </label>
                  <select
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-xs text-white outline-none focus:border-blue-500/50 transition-all cursor-pointer"
                  >
                    <option value="Medical" className="bg-slate-900">Medical / Health Issue</option>
                    <option value="Family" className="bg-slate-900">Family Event / Out of Station</option>
                    <option value="School" className="bg-slate-900">School Examinations</option>
                    <option value="Other" className="bg-slate-900">Other Personal Reason</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                    Additional Details
                  </label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Brief details about your leave request..."
                    value={leaveDetail}
                    onChange={(e) => setLeaveDetail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500/50 transition-all resize-none placeholder-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || upcomingClasses.length === 0}
                  className={`w-full py-2.5 text-xs font-bold rounded-xl text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    upcomingClasses.length === 0 
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5" 
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-95 shadow-blue-500/10"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting Notice...
                    </>
                  ) : upcomingClasses.length === 0 ? (
                    "No Upcoming Classes to Skip"
                  ) : (
                    "Submit Leave Request"
                  )}
                </button>
              </form>
            )}
          </div>
          
          <div className="border-t border-white/5 pt-4 mt-6">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Leave Policy Guidelines</span>
            <p className="text-[9.5px] text-slate-500 leading-normal font-light">
              Leaves submitted within 24 hours of scheduled class are marked as Excused Absent only upon approval. Maximum 3 leaves permitted per course Level.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
