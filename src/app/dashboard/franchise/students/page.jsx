"use client";

import React, { useState, useMemo } from "react";
import { 
  UserPlus, GraduationCap, Users, ShieldAlert, CheckCircle2, 
  MessageSquare, Clock, Pencil, Trash, X, Save, ArrowLeft, 
  Search, Download, CheckSquare, Square, History, User
} from "lucide-react";

export default function FranchiseStudents() {
  const [students, setStudents] = useState([
    { id: "STU-99", name: "Rohan Deshmukh", level: "Level 1", teacher: "Aman Sharma", status: "Active", feeStatus: "Paid", batch: "Sat | 04:00 PM", phone: "9876543210", logs: ["Admission completed (2026-03-12)", "Fee status updated to Paid"] },
    { id: "STU-102", name: "Isha Sharma", level: "Level 2", teacher: "Neha Patel", status: "Active", feeStatus: "Pending", batch: "Sun | 10:30 AM", phone: "9545123456", logs: ["Admission completed (2026-01-15)"] },
    { id: "STU-88", name: "Aditya Patil", level: "Level 4", teacher: "Sarah Jenkins", status: "Suspended", feeStatus: "Overdue", batch: "Sat | 05:30 PM", phone: "8888777766", logs: ["Admission completed (2025-11-10)", "Account suspended due to non-payment"] },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [isViewOpen, setIsViewOpen] = useState(false); 
  const [selectedStudent, setSelectedStudent] = useState(null); 
  const [editingStudent, setEditingStudent] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");
  const [filterFee, setFilterFee] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  const [formData, setFormData] = useState({
    name: "", level: "Level 1", teacher: "Aman Sharma", status: "Active", feeStatus: "Paid", batch: "Sat | 04:00 PM", phone: ""
  });

  const metrics = useMemo(() => {
    return {
      total: students.length,
      active: students.filter(s => s.status === "Active").length,
      pendingFees: students.filter(s => s.feeStatus !== "Paid").length
    };
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = filterLevel === "All" || student.level === filterLevel;
      const matchesFee = filterFee === "All" || student.feeStatus === filterFee;
      const matchesStatus = filterStatus === "All" || student.status === filterStatus;
      return matchesSearch && matchesLevel && matchesFee && matchesStatus;
    });
  }, [students, searchQuery, filterLevel, filterFee, filterStatus]);

  // 📥 Improved Fail-safe CSV Mechanism
  const exportToCSV = () => {
    try {
      const headers = ["Student ID", "Name", "Abacus Level", "Batch Slot", "Assigned Teacher", "Parent Contact", "Fee Status", "Account Status"];
      const rows = filteredStudents.map(s => [
        s.id, s.name, s.level, s.batch, s.teacher, s.phone, s.feeStatus, s.status
      ].map(val => `"${String(val).replace(/"/g, '""')}"`).join(","));

      const csvContent = [headers.join(","), ...rows].join("\n");
      const encodedUri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvContent);
      
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Students_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("DOM download blocked, using secondary fallback...", error);
      const csvContentAlt = filteredStudents.map(s => [s.id, s.name, s.level, s.batch].join(",")).join("\n");
      window.open("data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvContentAlt));
    }
  };

  const handleSelectAll = () => {
    if (selectedStudentIds.length === filteredStudents.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(filteredStudents.map(s => s.id));
    }
  };

  const handleSelectStudent = (id, e) => {
    e.stopPropagation();
    if (selectedStudentIds.includes(id)) {
      setSelectedStudentIds(selectedStudentIds.filter(item => item !== id));
    } else {
      setSelectedStudentIds([...selectedStudentIds, id]);
    }
  };

  const handleBulkFeeMark = (status) => {
    setStudents(students.map(s => 
      selectedStudentIds.includes(s.id) ? { ...s, feeStatus: status, logs: [...s.logs, `Bulk status updated to ${status}`] } : s
    ));
    setSelectedStudentIds([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? { 
        ...s, ...formData, logs: [...s.logs, `Profile updated on ${new Date().toISOString().split('T')[0]}`] 
      } : s));
      setEditingStudent(null);
    } else {
      const newId = `STU-${Math.floor(100 + Math.random() * 900)}`;
      setStudents([...students, { id: newId, ...formData, logs: [`Admission registered (${new Date().toISOString().split('T')[0]})`] }]);
    }
    setIsFormOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(student => student.id !== id));
      setIsViewOpen(false);
    }
  };

  const handleEdit = (student) => {
    setIsViewOpen(false);
    setEditingStudent(student);
    setFormData(student);
    setIsFormOpen(true);
  };

  const handleRowClick = (student, e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;
    setSelectedStudent(student);
    setIsViewOpen(true);
  };

  const toggleFeeStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === "Paid" ? "Pending" : currentStatus === "Pending" ? "Overdue" : "Paid";
    setStudents(students.map(s => s.id === id ? { ...s, feeStatus: nextStatus, logs: [...s.logs, `Fee toggled to ${nextStatus}`] } : s));
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(prev => ({ ...prev, feeStatus: nextStatus }));
    }
  };

  const toggleAccountStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setStudents(students.map(s => s.id === id ? { ...s, status: nextStatus, logs: [...s.logs, `Status toggled to ${nextStatus}`] } : s));
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(prev => ({ ...prev, status: nextStatus }));
    }
  };

  const resetForm = () => {
    setFormData({ name: "", level: "Level 1", teacher: "Aman Sharma", status: "Active", feeStatus: "Paid", batch: "Sat | 04:00 PM", phone: "" });
  };

  return (
    <div className="space-y-6 p-4 md:p-6 text-slate-100 max-w-[1600px] mx-auto overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">Student <span className="text-orange-500">Roster Hub</span></h2>
          <p className="text-xs text-slate-400 mt-1">Enterprise-grade center analytics, automated triggers, and bulk control.</p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button onClick={exportToCSV} className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 border border-slate-800 text-xs font-bold rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer">
            <Download size={14} /><span>Export CSV</span>
          </button>
          <button onClick={() => { setEditingStudent(null); resetForm(); setIsFormOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-xs font-extrabold rounded-xl text-white hover:brightness-110 shadow-lg shadow-orange-600/10 transition-all cursor-pointer">
            <UserPlus size={14} /><span>New Admission</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Total Enrolled</div>
          <div className="text-2xl font-black text-white mt-1">{metrics.total}</div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-500">Active Students</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{metrics.active}</div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-amber-500">Dues Pending</div>
          <div className="text-2xl font-black text-amber-400 mt-1">{metrics.pendingFees}</div>
        </div>
      </div>

      <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl flex flex-col lg:flex-row gap-3 items-center">
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3 top-3 text-gray-500" size={14} />
          <input type="text" placeholder="Search by Name or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900 text-xs text-white rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-slate-700" />
        </div>
        <div className="grid grid-cols-3 gap-2 w-full lg:w-auto text-[11px]">
          <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 text-slate-300 focus:outline-none">
            <option value="All">All Levels</option><option value="Level 1">Level 1</option><option value="Level 2">Level 2</option><option value="Level 4">Level 4</option>
          </select>
          <select value={filterFee} onChange={(e) => setFilterFee(e.target.value)} className="bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 text-slate-300 focus:outline-none">
            <option value="All">All Fees</option><option value="Paid">Paid</option><option value="Pending">Pending</option><option value="Overdue">Overdue</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 text-slate-300 focus:outline-none">
            <option value="All">All Status</option><option value="Active">Active</option><option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {selectedStudentIds.length > 0 && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 flex flex-row items-center justify-between gap-3">
          <span className="text-xs text-orange-400 font-bold font-mono">Selected: {selectedStudentIds.length} Student(s)</span>
          <div className="flex items-center gap-2">
            <button onClick={() => handleBulkFeeMark("Paid")} className="px-3 py-1.5 bg-emerald-950 border border-emerald-900 text-emerald-400 font-bold text-[10px] rounded-lg cursor-pointer hover:bg-emerald-900 transition-colors">Mark Paid</button>
            <button onClick={() => handleBulkFeeMark("Overdue")} className="px-3 py-1.5 bg-rose-950 border border-rose-900 text-rose-400 font-bold text-[10px] rounded-lg cursor-pointer hover:bg-rose-900 transition-colors">Mark Overdue</button>
            <button onClick={() => setSelectedStudentIds([])} className="text-xs text-slate-400 hover:text-white px-2 cursor-pointer">Clear</button>
          </div>
        </div>
      )}

      <div className="bg-slate-950/40 border border-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">
                <th className="py-4 px-4 w-12 text-center">
                  <button onClick={handleSelectAll} className="text-slate-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center w-full">
                    {selectedStudentIds.length === filteredStudents.length ? <CheckSquare size={15} className="text-orange-500" /> : <Square size={15} />}
                  </button>
                </th>
                <th className="py-4 px-4">ID</th><th className="py-4 px-6">Student Name</th><th className="py-4 px-6">Abacus Level</th><th className="py-4 px-6">Assigned Batch</th><th className="py-4 px-6">Teacher</th><th className="py-4 px-6">Fee Status</th><th className="py-4 px-6">Account Status</th><th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50 text-slate-300 font-medium">
              {filteredStudents.map((student) => (
                <tr key={student.id} onClick={(e) => handleRowClick(student, e)} className={`hover:bg-white/5 cursor-pointer transition-colors group ${selectedStudentIds.includes(student.id) ? 'bg-orange-500/5' : ''}`}>
                  <td className="py-4 px-4 text-center">
                    <button onClick={(e) => handleSelectStudent(student.id, e)} className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer flex items-center justify-center w-full">
                      {selectedStudentIds.includes(student.id) ? <CheckSquare size={15} className="text-orange-500" /> : <Square size={15} />}
                    </button>
                  </td>
                  <td className="py-4 px-4 font-mono text-orange-400 font-bold">{student.id}</td>
                  <td className="py-4 px-6 font-bold text-white group-hover:text-orange-400 transition-colors">{student.name}</td>
                  <td className="py-4 px-6"><span className="flex items-center gap-1.5 text-blue-400 font-bold"><GraduationCap size={14} /> {student.level}</span></td>
                  <td className="py-4 px-6"><span className="flex items-center gap-1.5 text-slate-400 font-mono"><Clock size={13} className="text-amber-500/80" /> {student.batch}</span></td>
                  <td className="py-4 px-6 text-slate-400 font-semibold"><span className="flex items-center gap-1.5"><Users size={13} className="text-purple-400" /> {student.teacher}</span></td>
                  <td className="py-4 px-6">
                    <button onClick={() => toggleFeeStatus(student.id, student.feeStatus)} className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all active:scale-95 cursor-pointer ${student.feeStatus === "Paid" ? "text-emerald-400 bg-emerald-950/40 border-emerald-900/30" : student.feeStatus === "Pending" ? "text-amber-400 bg-amber-950/40 border-amber-900/30" : "text-rose-400 bg-rose-950/40 border-rose-900/30"}`}>{student.feeStatus}</button>
                  </td>
                  <td className="py-4 px-6">
                    <button onClick={() => toggleAccountStatus(student.id, student.status)} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold inline-flex items-center gap-1 border transition-all active:scale-95 cursor-pointer ${student.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"}`}>
                      {student.status === "Active" ? <CheckCircle2 size={10} /> : <ShieldAlert size={10} />}{student.status}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => window.open(`https://wa.me/91${student.phone}`, "_blank")} className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer"><MessageSquare size={14} /></button>
                      <button onClick={() => handleEdit(student)} className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(student.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"><Trash size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isViewOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1220] border border-slate-800/80 w-full max-w-md rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1.5 ${selectedStudent.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <button onClick={() => setIsViewOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"><X size={16} /></button>
            <div className="flex items-center gap-3.5 mb-5 mt-2">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-orange-500 shadow-inner"><User size={20} /></div>
              <div>
                <h3 className="text-base font-black text-white tracking-tight">{selectedStudent.name}</h3>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{selectedStudent.id} | {selectedStudent.level}</p>
              </div>
            </div>
            <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 space-y-3 font-mono text-xs text-slate-400 mb-4">
              <div className="flex justify-between items-center border-b border-slate-900/60 pb-2"><span>Batch Slot:</span><span className="text-white font-bold">{selectedStudent.batch}</span></div>
              <div className="flex justify-between items-center border-b border-slate-900/60 pb-2"><span>Assigned Teacher:</span><span className="text-slate-200">{selectedStudent.teacher}</span></div>
              <div className="flex justify-between items-center"><span>Parent Contact:</span><span className="text-slate-200">{selectedStudent.phone}</span></div>
            </div>
            <div className="mb-5">
              <div className="text-[10px] text-slate-500 uppercase font-mono font-black flex items-center gap-1 mb-2"><History size={12} /> Audit Logs:</div>
              <div className="bg-slate-950 border border-slate-900/60 rounded-xl p-3 max-h-24 overflow-y-auto space-y-1.5 text-[11px] font-mono text-slate-500">
                {selectedStudent.logs?.map((log, i) => <div key={i} className="leading-relaxed">• {log}</div>)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button onClick={() => window.open(`https://wa.me/91${selectedStudent.phone}`, "_blank")} className="px-3 py-2.5 bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 hover:bg-emerald-900/50 transition-all"><MessageSquare size={14} /> WhatsApp</button>
              <button onClick={() => handleEdit(selectedStudent)} className="px-3 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-all"><Pencil size={14} /> Edit Profile</button>
            </div>
            <button onClick={() => setIsViewOpen(false)} className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-900 text-slate-400 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"><ArrowLeft size={14} /> Close View</button>
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1220] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"><X size={16} /></button>
            <h3 className="text-xs font-black text-white mb-5 uppercase font-mono tracking-wider border-b border-slate-900 pb-2">{editingStudent ? `Modify Record: ${editingStudent.id}` : "Process New Admission"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1.5 font-bold">Student Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-slate-700" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Abacus Level</label>
                  <select value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none">
                    <option value="Level 1">Level 1</option><option value="Level 2">Level 2</option><option value="Level 4">Level 4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Batch Slot</label>
                  <select value={formData.batch} onChange={(e) => setFormData({...formData, batch: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none">
                    <option value="Sat | 04:00 PM">Sat | 04:00 PM</option><option value="Sat | 05:30 PM">Sat | 05:30 PM</option><option value="Sun | 10:30 AM">Sun | 10:30 AM</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Assigned Teacher</label>
                  <input type="text" value={formData.teacher} onChange={(e) => setFormData({...formData, teacher: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Parent Contact</label>
                  <input type="tel" required placeholder="10 digit cell" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-900/80 mt-2">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 cursor-pointer hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold cursor-pointer hover:brightness-110 transition-all"><Save size={14} /><span>Commit Sync</span></button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}