"use client";

import React, { useState, useMemo } from "react";
import { 
  UserPlus, Users, CheckCircle2, MessageSquare, Pencil, 
  Trash, X, Save, ArrowLeft, Search, Download, ShieldCheck
} from "lucide-react";

export default function FranchiseTeachers() {
  const [teachers, setTeachers] = useState([
    { id: "TCH-01", name: "Aman Sharma", specialization: "Abacus Senior Trainer", activeBatches: 3, totalStudents: 24, status: "Active", salaryStatus: "Paid", phone: "9876543211", email: "aman.sharma@example.com" },
    { id: "TCH-02", name: "Neha Patel", specialization: "Junior Mental Math Coach", activeBatches: 2, totalStudents: 15, status: "Active", salaryStatus: "Pending", phone: "9545123457", email: "neha.patel@example.com" },
    { id: "TCH-03", name: "Sarah Jenkins", specialization: "Advanced Vedic Maths Expert", activeBatches: 1, totalStudents: 8, status: "On Leave", salaryStatus: "Pending", phone: "8888777761", email: "sarah.j@example.com" },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [isViewOpen, setIsViewOpen] = useState(false); 
  const [selectedTeacher, setSelectedTeacher] = useState(null); 
  const [editingTeacher, setEditingTeacher] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [formData, setFormData] = useState({
    name: "", specialization: "Abacus Trainer", activeBatches: 1, totalStudents: 0, status: "Active", salaryStatus: "Paid", phone: "", email: ""
  });

  const metrics = useMemo(() => {
    return {
      total: teachers.length,
      active: teachers.filter(t => t.status === "Active").length,
      pendingSalary: teachers.filter(t => t.salaryStatus === "Pending").length
    };
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || teacher.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "All" || teacher.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [teachers, searchQuery, filterStatus]);

  // 📥 Improved Fail-safe CSV Mechanism
  const exportToCSV = () => {
    try {
      const headers = ["Faculty ID", "Teacher Name", "Specialization", "Active Batches", "Total Students", "Phone Number", "Email", "Payout Status", "Status"];
      const rows = filteredTeachers.map(t => [
        t.id, t.name, t.specialization, t.activeBatches, t.totalStudents, t.phone, t.email, t.salaryStatus, t.status
      ].map(val => `"${String(val).replace(/"/g, '""')}"`).join(","));

      const csvContent = [headers.join(","), ...rows].join("\n");
      const encodedUri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvContent);
      
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Faculty_Roster_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("DOM download blocked, using secondary fallback...", error);
      const csvContentAlt = filteredTeachers.map(t => [t.id, t.name, t.specialization].join(",")).join("\n");
      window.open("data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvContentAlt));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTeacher) {
      setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...t, ...formData } : t));
      setEditingTeacher(null);
    } else {
      const newId = `TCH-${Math.floor(10 + Math.random() * 90)}`;
      setTeachers([...teachers, { id: newId, ...formData }]);
    }
    setIsFormOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to remove this teacher?")) {
      setTeachers(teachers.filter(t => t.id !== id));
      setIsViewOpen(false);
    }
  };

  const handleEdit = (teacher) => {
    setIsViewOpen(false);
    setEditingTeacher(teacher);
    setFormData(teacher);
    setIsFormOpen(true);
  };

  const handleRowClick = (teacher, e) => {
    if (e.target.closest('button')) return;
    setSelectedTeacher(teacher);
    setIsViewOpen(true);
  };

  const toggleSalaryStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === "Paid" ? "Pending" : "Paid";
    setTeachers(teachers.map(t => t.id === id ? { ...t, salaryStatus: nextStatus } : t));
    if (selectedTeacher && selectedTeacher.id === id) {
      setSelectedTeacher(prev => ({ ...prev, salaryStatus: nextStatus }));
    }
  };

  const resetForm = () => {
    setFormData({ name: "", specialization: "Abacus Trainer", activeBatches: 1, totalStudents: 0, status: "Active", salaryStatus: "Paid", phone: "", email: "" });
  };

  return (
    <div className="space-y-6 p-4 md:p-6 text-slate-100 max-w-[1600px] mx-auto overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">Teacher <span className="text-purple-500">Faculty Hub</span></h2>
          <p className="text-xs text-slate-400 mt-1">Manage your certified trainers, track active batch loads, and payout statuses.</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button onClick={exportToCSV} className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 border border-slate-800 text-xs font-bold rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer">
            <Download size={14} /><span>Export CSV</span>
          </button>
          <button onClick={() => { setEditingTeacher(null); resetForm(); setIsFormOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-xs font-extrabold rounded-xl text-white hover:brightness-110 shadow-lg shadow-purple-600/10 transition-all cursor-pointer">
            <UserPlus size={14} /><span>Add New Teacher</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Total Faculty</div>
          <div className="text-2xl font-black text-white mt-1">{metrics.total}</div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-purple-500">Active Rostered</div>
          <div className="text-2xl font-black text-purple-400 mt-1">{metrics.active}</div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-amber-500">Salary Pending</div>
          <div className="text-2xl font-black text-amber-400 mt-1">{metrics.pendingSalary}</div>
        </div>
      </div>

      <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-3 text-gray-500" size={14} />
          <input type="text" placeholder="Search Teacher by Name or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900 text-xs text-white rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-slate-700" />
        </div>
        <div className="w-full sm:w-auto text-[11px]">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 text-slate-300 focus:outline-none w-full sm:w-40">
            <option value="All">All Statuses</option><option value="Active">Active</option><option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-950/40 border border-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">
                <th className="py-4 px-6">Faculty ID</th><th className="py-4 px-6">Teacher Name</th><th className="py-4 px-6">Specialization</th><th className="py-4 px-6 text-center">Active Batches</th><th className="py-4 px-6 text-center">Total Students</th><th className="py-4 px-6">Payout Status</th><th className="py-4 px-6">Status</th><th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50 text-slate-300 font-medium">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} onClick={(e) => handleRowClick(teacher, e)} className="hover:bg-white/5 cursor-pointer transition-colors group">
                  <td className="py-4 px-6 font-mono text-purple-400 font-bold">{teacher.id}</td>
                  <td className="py-4 px-6 font-bold text-white group-hover:text-purple-400 transition-colors">{teacher.name}</td>
                  <td className="py-4 px-6 text-slate-400">{teacher.specialization}</td>
                  <td className="py-4 px-6 text-center font-mono text-blue-400 font-bold">{teacher.activeBatches}</td>
                  <td className="py-4 px-6 text-center font-mono text-amber-400 font-bold">{teacher.totalStudents}</td>
                  <td className="py-4 px-6">
                    <button onClick={() => toggleSalaryStatus(teacher.id, teacher.salaryStatus)} className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all active:scale-95 cursor-pointer ${teacher.salaryStatus === "Paid" ? "text-emerald-400 bg-emerald-950/40 border-emerald-900/30" : "text-amber-400 bg-amber-950/40 border-amber-900/30"}`}>{teacher.salaryStatus}</button>
                  </td>
                  <td className="py-4 px-6"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${teacher.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>{teacher.status}</span></td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => window.open(`https://wa.me/91${teacher.phone}`, "_blank")} className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer"><MessageSquare size={14} /></button>
                      <button onClick={() => handleEdit(teacher)} className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(teacher.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"><Trash size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isViewOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1220] border border-slate-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-500" />
            <button onClick={() => setIsViewOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"><X size={16} /></button>
            <div className="flex items-center gap-3.5 mb-5 mt-2">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-purple-400 shadow-inner"><ShieldCheck size={20} /></div>
              <div>
                <h3 className="text-base font-black text-white tracking-tight">{selectedTeacher.name}</h3>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{selectedTeacher.id} | {selectedTeacher.specialization}</p>
              </div>
            </div>
            <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 space-y-3 font-mono text-xs text-slate-400 mb-5">
              <div className="flex justify-between items-center border-b border-slate-900/60 pb-2"><span>Active Batches:</span><span className="text-white font-bold">{selectedTeacher.activeBatches}</span></div>
              <div className="flex justify-between items-center border-b border-slate-900/60 pb-2"><span>Total Students:</span><span className="text-white font-bold">{selectedTeacher.totalStudents}</span></div>
              <div className="flex justify-between items-center border-b border-slate-900/60 pb-2"><span>Contact No:</span><span className="text-slate-200">{selectedTeacher.phone}</span></div>
              <div className="flex justify-between items-center"><span>Email Addr:</span><span className="text-slate-200 text-[11px] truncate max-w-[160px]">{selectedTeacher.email}</span></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button onClick={() => window.open(`https://wa.me/91${selectedTeacher.phone}`, "_blank")} className="px-3 py-2.5 bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 hover:bg-emerald-900/50 transition-all"><MessageSquare size={14} /> WhatsApp</button>
              <button onClick={() => handleEdit(selectedTeacher)} className="px-3 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-all"><Pencil size={14} /> Edit Profile</button>
            </div>
            <button onClick={() => setIsViewOpen(false)} className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-900 text-slate-400 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"><ArrowLeft size={14} /> Close View</button>
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1220] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"><X size={16} /></button>
            <h3 className="text-xs font-black text-white mb-5 uppercase font-mono tracking-wider border-b border-slate-900 pb-2">{editingTeacher ? `Modify Record: ${editingTeacher.id}` : "Register New Faculty"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1.5 font-bold">Trainer Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-slate-700" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1.5 font-bold">Specialization / Role</label>
                <input type="text" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-slate-700" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Phone Number</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Email Address</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-slate-700" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-900/80 mt-2">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 cursor-pointer hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold cursor-pointer hover:brightness-110 transition-all"><Save size={14} /><span>Save Faculty</span></button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}