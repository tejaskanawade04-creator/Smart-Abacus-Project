"use client";

import React, { useState } from "react";
import { UserPlus, GraduationCap, Users, ShieldAlert, CheckCircle2, MessageSquare, Clock, Pencil, Trash, X, Save } from "lucide-react";

export default function FranchiseStudents() {
  // १. स्टेट मॅनेजमेंट (विद्यार्थ्यांची यादी)
  const [students, setStudents] = useState([
    { id: "STU-99", name: "Rohan Deshmukh", level: "Level 1", teacher: "Aman Sharma", status: "Active", feeStatus: "Paid", batch: "Sat | 04:00 PM", phone: "9876543210" },
    { id: "STU-102", name: "Isha Sharma", level: "Level 2", teacher: "Neha Patel", status: "Active", feeStatus: "Pending", batch: "Sun | 10:30 AM", phone: "9545123456" },
    { id: "STU-88", name: "Aditya Patil", level: "Level 4", teacher: "Sarah Jenkins", status: "Suspended", feeStatus: "Overdue", batch: "Sat | 05:30 PM", phone: "8888777766" },
  ]);

  // मॉडल्स आणि एडिट करण्यासाठी लागणाऱ्या स्टेट्स
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState({
    name: "", level: "Level 1", teacher: "Aman Sharma", status: "Active", feeStatus: "Paid", batch: "Sat | 04:00 PM", phone: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
    
      setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...formData } : s));
      setEditingStudent(null);
    } else {
      
      const newId = `STU-${Math.floor(100 + Math.random() * 900)}`;
      setStudents([...students, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setIsModalOpen(true);
  };

  const toggleFeeStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === "Paid" ? "Pending" : currentStatus === "Pending" ? "Overdue" : "Paid";
    setStudents(students.map(s => s.id === id ? { ...s, feeStatus: nextStatus } : s));
  };

  const toggleAccountStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setStudents(students.map(s => s.id === id ? { ...s, status: nextStatus } : s));
  };

  const resetForm = () => {
    setFormData({ name: "", level: "Level 1", teacher: "Aman Sharma", status: "Active", feeStatus: "Paid", batch: "Sat | 04:00 PM", phone: "" });
  };

  const sendWhatsAppReminder = (phone, name, feeStatus) => {
    let message = `Hello Parent, this is an update from Smart Abacus regarding your child ${name}.`;
    if (feeStatus !== "Paid") message += ` Please note that the term fee is currently ${feeStatus}.`;
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
  
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Student <span className="text-orange-500">Roster Center</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Interactive Management • Click statuses directly to change them.
          </p>
        </div>

        <button 
          onClick={() => { setEditingStudent(null); resetForm(); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-xs font-extrabold rounded-xl text-white hover:brightness-110 shadow-lg shadow-orange-600/10 transition-all self-start sm:self-center"
        >
          <UserPlus size={14} />
          <span>New Admission</span>
        </button>
      </div>

      <div className="bg-slate-950/40 border border-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Student Name</th>
                <th className="py-4 px-6">Abacus Level</th>
                <th className="py-4 px-6">Assigned Batch</th> 
                <th className="py-4 px-6">Teacher</th>
                <th className="py-4 px-6">Fee Status (Click to Toggle)</th>
                <th className="py-4 px-6">Account Status (Click to Toggle)</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50 text-slate-300 font-medium">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                  
                  <td className="py-4 px-6 font-mono text-orange-400 font-bold">{student.id}</td>
                  <td className="py-4 px-6 font-bold text-white">{student.name}</td>
                  
                  <td className="py-4 px-6">
                    <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                      <GraduationCap size={14} /> {student.level}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <span className="flex items-center gap-1.5 text-slate-400 font-mono">
                      <Clock size={13} className="text-amber-500/80" /> {student.batch}
                    </span>
                  </td>
                  
                  <td className="py-4 px-6 text-slate-400 font-semibold flex items-center gap-1.5 mt-1.5">
                    <Users size={13} className="text-purple-400" /> {student.teacher}
                  </td>

                  <td className="py-4 px-6">
                    <button 
                      onClick={() => toggleFeeStatus(student.id, student.feeStatus)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all active:scale-95 ${
                        student.feeStatus === "Paid" ? "text-emerald-400 bg-emerald-950/40 border-emerald-900/30 hover:bg-emerald-900/40" :
                        student.feeStatus === "Pending" ? "text-amber-400 bg-amber-950/40 border-amber-900/30 hover:bg-amber-900/40" :
                        "text-rose-400 bg-rose-950/40 border-rose-900/30 hover:bg-rose-900/40"
                      }`}
                    >
                      {student.feeStatus}
                    </button>
                  </td>

                  <td className="py-4 px-6">
                    <button 
                      onClick={() => toggleAccountStatus(student.id, student.status)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold inline-flex items-center gap-1 border transition-all active:scale-95 ${
                        student.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20" : 
                        "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20"
                      }`}
                    >
                      {student.status === "Active" ? <CheckCircle2 size={10} /> : <ShieldAlert size={10} />}
                      {student.status}
                    </button>
                  </td>

                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => sendWhatsAppReminder(student.phone, student.name, student.feeStatus)} className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"><MessageSquare size={14} /></button>
                      <button onClick={() => handleEdit(student)} className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(student.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"><Trash size={14} /></button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d1527] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-fadeIn">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={16} /></button>
            
            <h3 className="text-sm font-black text-white mb-4 uppercase font-mono tracking-wider">
              {editingStudent ? `Edit Student: ${editingStudent.id}` : "New Admission Registration"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Student Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-orange-500/50" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Abacus Level</label>
                  <select value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                    <option value="Level 1">Level 1</option> <option value="Level 2">Level 2</option> <option value="Level 3">Level 3</option> <option value="Level 4">Level 4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Batch Slot</label>
                  <select value={formData.batch} onChange={(e) => setFormData({...formData, batch: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                    <option value="Sat | 04:00 PM">Sat | 04:00 PM</option> <option value="Sat | 05:30 PM">Sat | 05:30 PM</option> <option value="Sun | 10:30 AM">Sun | 10:30 AM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Assigned Teacher</label>
                  <input type="text" value={formData.teacher} onChange={(e) => setFormData({...formData, teacher: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Parent Contact</label>
                  <input type="tel" required placeholder="10 digit number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-900">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold"><Save size={14} /><span>Save Changes</span></button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}