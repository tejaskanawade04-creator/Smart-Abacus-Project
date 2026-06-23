"use client";

import React, { useState, useMemo } from "react";
import { 
  Check, X, Calendar, Search, Users, UserCheck, UserX, 
  Star, Save, BookOpen, ChevronRight, Award 
} from "lucide-react";

export default function AttendanceProgress() {
  const [selectedBatch, setSelectedBatch] = useState("BTC-101");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock Students Data with Attendance and Progress State
  const [students, setStudents] = useState([
    { id: "STU-881", name: "Amit Kulkarni", batchId: "BTC-101", status: "Present", speed: 4, accuracy: 5, homework: true },
    { id: "STU-882", name: "Sneha Patil", batchId: "BTC-101", status: "Present", speed: 5, accuracy: 4, homework: true },
    { id: "STU-883", name: "Vedant Joshi", batchId: "BTC-101", status: "Absent", speed: 3, accuracy: 3, homework: false },
    { id: "STU-884", name: "Anjali Nair", batchId: "BTC-102", status: "Present", speed: 5, accuracy: 5, homework: true },
    { id: "STU-885", name: "Parth Deshmukh", batchId: "BTC-102", status: "Pending", speed: 4, accuracy: 4, homework: false },
  ]);

  const batches = [
    { id: "BTC-101", name: "Sat | 04:00 PM (Level 1)" },
    { id: "BTC-102", name: "Sat | 05:30 PM (Level 4)" },
  ];

  // Toggle Attendance Status
  const toggleAttendance = (id, newStatus) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  // Handle Progress Rating Change
  const handleRatingChange = (id, field, value) => {
    setStudents(students.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Handle Homework Toggle
  const toggleHomework = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, homework: !s.homework } : s));
  };

  // Filtered Roster Based on Batch and Search
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesBatch = s.batchId === selectedBatch;
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBatch && matchesSearch;
    });
  }, [students, selectedBatch, searchQuery]);

  // Analytics Metrics
  const metrics = useMemo(() => {
    const batchStudents = students.filter(s => s.batchId === selectedBatch);
    return {
      total: batchStudents.length,
      present: batchStudents.filter(s => s.status === "Present").length,
      absent: batchStudents.filter(s => s.status === "Absent").length,
    };
  }, [students, selectedBatch]);

  const handleSaveLogs = () => {
    alert(`Attendance & Progress logs for date ${selectedDate} synced successfully!`);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 text-slate-100 max-w-[1600px] mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">Attendance & <span className="text-indigo-400">Progress Tracker</span></h2>
          <p className="text-xs text-slate-400 mt-1">Mark daily rosters, evaluate calculation velocity, and audit curriculum performance.</p>
        </div>
        <button onClick={handleSaveLogs} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-extrabold rounded-xl text-white hover:brightness-110 shadow-lg shadow-indigo-600/10 transition-all cursor-pointer self-end sm:self-center">
          <Save size={14} /><span>Save Session Logs</span>
        </button>
      </div>

      {/* Control Filters Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 border border-slate-900 p-4 rounded-xl">
        <div>
          <label className="block text-[10px] uppercase font-mono font-bold text-gray-500 mb-1.5">Select Class Batch</label>
          <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)} className="w-full bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-200 focus:outline-none">
            {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] uppercase font-mono font-bold text-gray-500 mb-1.5">Session Log Date</label>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 text-xs text-white font-mono focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-mono font-bold text-gray-500 mb-1.5">Search Student</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={14} />
            <input type="text" placeholder="Search by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900 text-xs text-white rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-slate-700" />
          </div>
        </div>
      </div>

      {/* Live Roster Micro Metrics */}
      <div className="grid grid-cols-3 gap-4 max-w-md">
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3 text-center">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Enrolled</div>
          <div className="text-lg font-black text-white mt-0.5">{metrics.total}</div>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 text-center">
          <div className="text-[10px] font-mono text-emerald-500 uppercase">Present</div>
          <div className="text-lg font-black text-emerald-400 mt-0.5">{metrics.present}</div>
        </div>
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-3 text-center">
          <div className="text-[10px] font-mono text-rose-500 uppercase">Absent</div>
          <div className="text-lg font-black text-rose-400 mt-0.5">{metrics.absent}</div>
        </div>
      </div>

      {/* Main Interactive Grid / Table */}
      <div className="bg-slate-950/40 border border-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">
                <th className="py-4 px-6">UID</th>
                <th className="py-4 px-6">Student Name</th>
                <th className="py-4 px-6 text-center">Attendance Action</th>
                <th className="py-4 px-6 text-center">Abacus Speed (1-5)</th>
                <th className="py-4 px-6 text-center">Formula Accuracy (1-5)</th>
                <th className="py-4 px-6 text-center">Homework Checked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50 text-slate-300 font-medium">
              {filteredStudents.map((stu) => (
                <tr key={stu.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6 font-mono text-indigo-400 font-bold">{stu.id}</td>
                  <td className="py-4 px-6 font-bold text-white">{stu.name}</td>
                  
                  {/* Attendance Selector Buttons */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-1.5">
                      <button type="button" onClick={() => toggleAttendance(stu.id, "Present")} className={`px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                        stu.status === "Present" ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "bg-slate-900 text-slate-400 hover:text-slate-200"
                      }`}><Check size={12} /> Present</button>
                      <button type="button" onClick={() => toggleAttendance(stu.id, "Absent")} className={`px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                        stu.status === "Absent" ? "bg-rose-500 text-white shadow-md shadow-rose-500/20" : "bg-slate-900 text-slate-400 hover:text-slate-200"
                      }`}><X size={12} /> Absent</button>
                    </div>
                  </td>

                  {/* Speed Star Matrix */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button key={val} type="button" onClick={() => handleRatingChange(stu.id, "speed", val)} className="cursor-pointer transition-transform hover:scale-110">
                          <Star size={14} className={val <= stu.speed ? "fill-amber-400 text-amber-400" : "text-slate-700"} />
                        </button>
                      ))}
                    </div>
                  </td>

                  {/* Accuracy Star Matrix */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button key={val} type="button" onClick={() => handleRatingChange(stu.id, "accuracy", val)} className="cursor-pointer transition-transform hover:scale-110">
                          <Star size={14} className={val <= stu.accuracy ? "fill-cyan-400 text-cyan-400" : "text-slate-700"} />
                        </button>
                      ))}
                    </div>
                  </td>

                  {/* Homework Toggle Checkbox */}
                  <td className="py-4 px-6 text-center">
                    <button type="button" onClick={() => toggleHomework(stu.id)} className={`px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider font-mono transition-all cursor-pointer ${
                      stu.homework ? "bg-purple-500/10 border border-purple-500/30 text-purple-400" : "bg-slate-900 border border-slate-800 text-slate-500"
                    }`}>
                      {stu.homework ? "Completed" : "Incomplete"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}