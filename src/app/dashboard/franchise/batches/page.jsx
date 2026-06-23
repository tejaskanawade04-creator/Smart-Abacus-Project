"use client";

import React, { useState, useMemo } from "react";
import { 
  Plus, Calendar, Users, Clock, Pencil, Trash, X, Save, 
  ArrowLeft, Search, Download, BookOpen, Video, MapPin, CheckCircle
} from "lucide-react";

export default function FranchiseBatches() {
  const [batches, setBatches] = useState([
    { id: "BTC-101", slot: "Sat | 04:00 PM", teacher: "Aman Sharma", level: "Level 1", totalStudents: 12, maxCapacity: 15, mode: "Offline", room: "Lab A", status: "Active" },
    { id: "BTC-102", slot: "Sat | 05:30 PM", teacher: "Sarah Jenkins", level: "Level 4", totalStudents: 8, maxCapacity: 10, mode: "Online", room: "Zoom Room 1", status: "Active" },
    { id: "BTC-103", slot: "Sun | 10:30 AM", teacher: "Neha Patel", level: "Level 2", totalStudents: 15, maxCapacity: 15, mode: "Offline", room: "Lab B", status: "Full" },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [isViewOpen, setIsViewOpen] = useState(false); 
  const [selectedBatch, setSelectedBatch] = useState(null); 
  const [editingBatch, setEditingBatch] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [formData, setFormData] = useState({
    slot: "Sat | 04:00 PM", teacher: "Aman Sharma", level: "Level 1", maxCapacity: 15, mode: "Offline", room: "Lab A", status: "Active"
  });

  const metrics = useMemo(() => {
    return {
      total: batches.length,
      totalStudents: batches.reduce((acc, b) => acc + b.totalStudents, 0),
      fullBatches: batches.filter(b => b.status === "Full" || b.totalStudents >= b.maxCapacity).length
    };
  }, [batches]);

  const filteredBatches = useMemo(() => {
    return batches.filter(batch => {
      const matchesSearch = batch.teacher.toLowerCase().includes(searchQuery.toLowerCase()) || batch.id.toLowerCase().includes(searchQuery.toLowerCase()) || batch.level.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMode = filterMode === "All" || batch.mode === filterMode;
      const matchesStatus = filterStatus === "All" || batch.status === filterStatus;
      return matchesSearch && matchesMode && matchesStatus;
    });
  }, [batches, searchQuery, filterMode, filterStatus]);

  // 📥 Industry-Grade Bulletproof CSV Downloader
  const exportToCSV = () => {
    try {
      const headers = ["Batch ID", "Time Slot", "Assigned Teacher", "Abacus Level", "Enrolled Students", "Max Capacity", "Mode", "Room / Link", "Status"];
      const rows = filteredBatches.map(b => [
        b.id, b.slot, b.teacher, b.level, b.totalStudents, b.maxCapacity, b.mode, b.room, b.status
      ].map(val => `"${String(val).replace(/"/g, '""')}"`).join(","));

      const csvContent = [headers.join(","), ...rows].join("\n");
      const encodedUri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvContent);
      
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Batch_Schedule_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("DOM download blocked, using secondary fallback...", error);
      const csvContentAlt = filteredBatches.map(b => [b.id, b.slot, b.teacher, b.level].join(",")).join("\n");
      window.open("data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvContentAlt));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBatch) {
      setBatches(batches.map(b => b.id === editingBatch.id ? { ...b, ...formData } : b));
      setEditingBatch(null);
    } else {
      const newId = `BTC-${Math.floor(100 + Math.random() * 900)}`;
      setBatches([...batches, { id: newId, totalStudents: 0, ...formData }]);
    }
    setIsFormOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this batch slot?")) {
      setBatches(batches.filter(b => b.id !== id));
      setIsViewOpen(false);
    }
  };

  const handleEdit = (batch) => {
    setIsViewOpen(false);
    setEditingBatch(batch);
    setFormData(batch);
    setIsFormOpen(true);
  };

  const handleRowClick = (batch, e) => {
    if (e.target.closest('button')) return;
    setSelectedBatch(batch);
    setIsViewOpen(true);
  };

  const resetForm = () => {
    setFormData({ slot: "Sat | 04:00 PM", teacher: "Aman Sharma", level: "Level 1", maxCapacity: 15, mode: "Offline", room: "Lab A", status: "Active" });
  };

  return (
    <div className="space-y-6 p-4 md:p-6 text-slate-100 max-w-[1600px] mx-auto overflow-hidden">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">Batch & <span className="text-amber-500">Slots Panel</span></h2>
          <p className="text-xs text-slate-400 mt-1">Structure time slots, optimize teacher assignment, and control classroom saturation.</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button onClick={exportToCSV} className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 border border-slate-800 text-xs font-bold rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer">
            <Download size={14} /><span>Export CSV</span>
          </button>
          <button onClick={() => { setEditingBatch(null); resetForm(); setIsFormOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-xs font-extrabold rounded-xl text-white hover:brightness-110 shadow-lg shadow-amber-600/10 transition-all cursor-pointer">
            <Plus size={14} /><span>Create Slot</span>
          </button>
        </div>
      </div>

      {/* Grid Dashboard Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Total Active Batches</div>
          <div className="text-2xl font-black text-white mt-1">{metrics.total}</div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-amber-500">Total Seated Students</div>
          <div className="text-2xl font-black text-amber-400 mt-1">{metrics.totalStudents}</div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-rose-500">At Max Capacity</div>
          <div className="text-2xl font-black text-rose-400 mt-1">{metrics.fullBatches}</div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-3 text-gray-500" size={14} />
          <input type="text" placeholder="Search by Level, Teacher, ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900 text-xs text-white rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-slate-700" />
        </div>
        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto text-[11px]">
          <select value={filterMode} onChange={(e) => setFilterMode(e.target.value)} className="bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 text-slate-300 focus:outline-none sm:w-36">
            <option value="All">All Modes</option><option value="Offline">Offline</option><option value="Online">Online</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 text-slate-300 focus:outline-none sm:w-36">
            <option value="All">All Status</option><option value="Active">Active</option><option value="Full">Full</option>
          </select>
        </div>
      </div>

      {/* Responsive Custom Roster Grid Table */}
      <div className="bg-slate-950/40 border border-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">
                <th className="py-4 px-6">Slot ID</th><th className="py-4 px-6">Timing / Days</th><th className="py-4 px-6">Assigned Instructor</th><th className="py-4 px-6">Target Level</th><th className="py-4 px-6 text-center">Occupancy Rate</th><th className="py-4 px-6">Delivery Mode</th><th className="py-4 px-6">Location/Room</th><th className="py-4 px-6 text-center">Status</th><th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50 text-slate-300 font-medium">
              {filteredBatches.map((batch) => (
                <tr key={batch.id} onClick={(e) => handleRowClick(batch, e)} className="hover:bg-white/5 cursor-pointer transition-colors group">
                  <td className="py-4 px-6 font-mono text-amber-500 font-bold">{batch.id}</td>
                  <td className="py-4 px-6 font-bold text-white group-hover:text-amber-500 transition-colors">
                    <span className="flex items-center gap-1.5"><Calendar size={13} className="text-slate-500" /> {batch.slot}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-300 font-semibold">{batch.teacher}</td>
                  <td className="py-4 px-6"><span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded border border-blue-500/10 font-mono font-bold text-[10px]">{batch.level}</span></td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="font-mono font-bold text-slate-200">{batch.totalStudents} / {batch.maxCapacity}</span>
                      <div className="w-16 h-1 bg-slate-900 rounded-full overflow-hidden">
                        <div className={`h-full ${batch.totalStudents >= batch.maxCapacity ? 'bg-rose-500' : 'bg-amber-500'}`} style={{ width: `${(batch.totalStudents / batch.maxCapacity) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${batch.mode === "Online" ? "text-cyan-400" : "text-amber-400"}`}>
                      {batch.mode === "Online" ? <Video size={12} /> : <MapPin size={12} />}{batch.mode}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-mono">{batch.room}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${batch.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>{batch.status}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => handleEdit(batch)} className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(batch.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"><Trash size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Industry-Grade Pop-up (View Modal) */}
      {isViewOpen && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1220] border border-slate-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1.5 ${selectedBatch.status === 'Active' ? 'bg-amber-500' : 'bg-rose-500'}`} />
            <button onClick={() => setIsViewOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"><X size={16} /></button>
            
            <div className="flex items-center gap-3.5 mb-5 mt-2">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-amber-500 shadow-inner"><BookOpen size={20} /></div>
              <div>
                <h3 className="text-base font-black text-white tracking-tight">{selectedBatch.level} Batch</h3>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{selectedBatch.id} | {selectedBatch.mode}</p>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 space-y-3 font-mono text-xs text-slate-400 mb-5">
              <div className="flex justify-between items-center border-b border-slate-900/60 pb-2"><span>Time Schedule:</span><span className="text-white font-bold">{selectedBatch.slot}</span></div>
              <div className="flex justify-between items-center border-b border-slate-900/60 pb-2"><span>Instructor:</span><span className="text-slate-200">{selectedBatch.teacher}</span></div>
              <div className="flex justify-between items-center border-b border-slate-900/60 pb-2"><span>Enrolled Seating:</span><span className="text-amber-400 font-bold">{selectedBatch.totalStudents} / {selectedBatch.maxCapacity} Pupils</span></div>
              <div className="flex justify-between items-center"><span>Location Room:</span><span className="text-slate-200">{selectedBatch.room}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <button onClick={() => handleEdit(selectedBatch)} className="px-3 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-all"><Pencil size={14} /> Adjust Slot</button>
              <button onClick={() => setIsViewOpen(false)} className="px-3 py-2.5 bg-slate-950 border border-slate-900 text-slate-400 hover:text-white rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 transition-all"><CheckCircle size={14} /> Clear View</button>
            </div>
          </div>
        </div>
      )}

      {/* Creation & Update Interactive Pop-up Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1220] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"><X size={16} /></button>
            <h3 className="text-xs font-black text-white mb-5 uppercase font-mono tracking-wider border-b border-slate-900 pb-2">{editingBatch ? `Modify Batch: ${editingBatch.id}` : "Configure New Batch Slot"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Timing Slot</label>
                  <input type="text" required placeholder="e.g., Sat | 04:00 PM" value={formData.slot} onChange={(e) => setFormData({...formData, slot: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Abacus Level</label>
                  <select value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none">
                    <option value="Level 1">Level 1</option><option value="Level 2">Level 2</option><option value="Level 3">Level 3</option><option value="Level 4">Level 4</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Assigned Instructor</label>
                  <input type="text" required value={formData.teacher} onChange={(e) => setFormData({...formData, teacher: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Max Cap Limit</label>
                  <input type="number" required value={formData.maxCapacity} onChange={(e) => setFormData({...formData, maxCapacity: Number(e.target.value)})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Delivery Mode</label>
                  <select value={formData.mode} onChange={(e) => setFormData({...formData, mode: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none">
                    <option value="Offline">Offline</option><option value="Online">Online</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Room / Link Identity</label>
                  <input type="text" required placeholder="e.g., Lab A or Zoom ID" value={formData.room} onChange={(e) => setFormData({...formData, room: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1.5 font-bold">Current Allocation Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none">
                  <option value="Active">Active (Accepting Pupils)</option><option value="Full">Full (Locked)</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-900/80 mt-2">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 cursor-pointer hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold cursor-pointer hover:brightness-110 transition-all"><Save size={14} /><span>Save Slot</span></button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}