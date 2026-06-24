// src/app/dashboard/teacher/attendance/page.jsx
"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function AttendancePage() {
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');
  
  const [students, setStudents] = useState([
    { id: 1, name: 'Aman Sharma', rollNo: 'AB-101', level: 'Level 2', batch: 'New Delhi - Evening', status: 'Present', booksDone: 4 },
    { id: 2, name: 'Neha Patel', rollNo: 'AB-102', level: 'Level 1', batch: 'Mumbai West - Morning', status: 'Present', booksDone: 5 },
    { id: 3, name: 'Sarah Jenkins', rollNo: 'AB-103', level: 'Level 3', batch: 'Bangalore - Weekend', status: 'Absent', booksDone: 0 },
    { id: 4, name: 'Kunal Verma', rollNo: 'AB-104', level: 'Level 1', batch: 'New Delhi - Evening', status: 'Present', booksDone: 3 },
  ]);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchBatch = selectedBatch === 'All' || s.batch === selectedBatch;
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.includes(search);
      return matchBatch && matchSearch;
    });
  }, [students, selectedBatch, search]);

  const toggleStatus = (id, status) => {
    setStudents(students.map(s => s.id === id ? { ...s, status, booksDone: status === 'Absent' ? 0 : s.booksDone } : s));
  };

  const updatePages = (id, val) => {
    setStudents(students.map(s => s.id === id ? { ...s, booksDone: parseInt(val) || 0 } : s));
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Roll No,Student Name,Batch,Level,Date,Status,Pages Done"].join(",") + "\n"
      + students.map(s => `${s.rollNo},${s.name},${s.batch},${s.level},${attendanceDate},${s.status},${s.booksDone}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Attendance_Sheet_${attendanceDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <Link href="/dashboard/teacher" className="text-xs text-blue-400 font-medium hover:underline mb-1 inline-block">
            ← BACK TO OVERVIEW
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Attendance Ledger</h1>
        </div>
        <button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all">
          📥 Download Excel Sheet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0d1527] border border-gray-800 p-4 rounded-xl">
        <div>
          <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Filter Batch</label>
          <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)} className="w-full bg-[#070b19] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-blue-500">
            <option value="All">All Batches</option>
            <option value="New Delhi - Evening">New Delhi - Evening</option>
            <option value="Mumbai West - Morning">Mumbai West - Morning</option>
            <option value="Bangalore - Weekend">Bangalore - Weekend</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Target Date</label>
          <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} className="w-full bg-[#070b19] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-blue-500"/>
        </div>
        <div>
          <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Search Roster</label>
          <input type="text" placeholder="Search by name or code..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#070b19] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-blue-500"/>
        </div>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
                <th className="py-4 px-6">Roll No</th>
                <th className="py-4 px-6">Student details</th>
                <th className="py-4 px-6">Abacus Level</th>
                <th className="py-4 px-6">Class Workbook (Pages done)</th>
                <th className="py-4 px-6 text-center">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-[#10192e]/40 transition-colors">
                  <td className="py-4 px-6 font-mono text-gray-500">{s.rollNo}</td>
                  <td className="py-4 px-6 font-semibold text-white">{s.name}</td>
                  <td className="py-4 px-6"><span className="bg-purple-950/40 border border-purple-900 text-purple-400 px-2 py-0.5 rounded text-[10px] font-medium">{s.level}</span></td>
                  <td className="py-4 px-6">
                    <input type="number" disabled={s.status === 'Absent'} value={s.booksDone} onChange={(e) => updatePages(s.id, e.target.value)} className="w-20 bg-[#070b19] border border-gray-800 rounded-lg px-2 py-1 text-center text-xs disabled:opacity-30 focus:border-blue-500 focus:outline-none"/>
                  </td>
                  <td className="py-4 px-6 flex justify-center gap-2">
                    <button onClick={() => toggleStatus(s.id, 'Present')} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all ${s.status === 'Present' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-gray-900 text-gray-600'}`}>Present</button>
                    <button onClick={() => toggleStatus(s.id, 'Absent')} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all ${s.status === 'Absent' ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-gray-900 text-gray-600'}`}>Absent</button>
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