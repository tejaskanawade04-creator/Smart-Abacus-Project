"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, DollarSign, AlertCircle, CheckCircle, Bell, Download, GraduationCap, Calendar, Plus, Edit2, Trash2, X, User, Eye } from 'lucide-react';

export default function FranchiseFees() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({ id: "", student: "", level: "Level 1", amount: "", dueDate: "", status: "Overdue" });

  const [feeData, setFeeData] = useState([
    { id: "TXN-701", student: "Isha Sharma", level: "Level 2", amount: 3500, dueDate: "2026-06-15", status: "Overdue" },
    { id: "TXN-699", student: "Rohan Deshmukh", level: "Level 1", amount: 4500, dueDate: "2026-06-02", status: "Overdue" },
    { id: "TXN-654", student: "Aditya Patil", level: "Level 4", amount: 3500, dueDate: "2026-05-20", status: "Paid" },
    { id: "TXN-642", student: "Ananya Joshi", level: "Level 3", amount: 4000, dueDate: "2026-06-18", status: "Paid" },
  ]);

  const totalCollected = feeData.filter(f => f.status === "Paid").reduce((sum, f) => sum + Number(f.amount), 0);
  const totalPending = feeData.filter(f => f.status === "Overdue").reduce((sum, f) => sum + Number(f.amount), 0);
  const totalTarget = totalCollected + totalPending || 1;

  
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsActionModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.student || !formData.amount) return;

    const newTxn = {
      id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
      student: formData.student,
      level: formData.level,
      amount: parseInt(formData.amount) || 0,
      dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
      status: formData.status
    };
    setFeeData([newTxn, ...feeData]);
    setIsAddModalOpen(false);
    setFormData({ id: "", student: "", level: "Level 1", amount: "", dueDate: "", status: "Overdue" });
  };

  const handleEditTrigger = () => {
    if (!selectedRow) return;
    setFormData(selectedRow);
    setIsActionModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedData = feeData.map(item => item.id === selectedRow.id ? { ...formData, amount: parseInt(formData.amount) } : item);
    setFeeData(updatedData);
    setIsEditModalOpen(false);
    setSelectedRow(null);
  };

  
  const handleDeleteTrigger = () => {
    if (!selectedRow) return;
    if (window.confirm(`Are you sure you want to delete transaction ${selectedRow.id}?`)) {
      setFeeData(feeData.filter(item => item.id !== selectedRow.id));
      setIsActionModalOpen(false);
      setSelectedRow(null);
    }
  };

  const toggleStatus = () => {
    if (!selectedRow) return;
    const nextStatus = selectedRow.status === "Paid" ? "Overdue" : "Paid";
    setFeeData(feeData.map(item => item.id === selectedRow.id ? { ...item, status: nextStatus } : item));
    setSelectedRow({ ...selectedRow, status: nextStatus });
  };

  
  const filteredData = feeData.filter(item => {
    const matchesSearch = item.student.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 text-xs text-slate-300 relative">
      
     
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Fee & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Collection Ledger</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">Click on any student row to manage status, receipts, edits, or deeper view options.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-emerald-500/20"
        >
          <Plus size={16} /> Record Fee Payment
        </button>
      </div>

  
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#0e172c] to-[#0a1021] border border-gray-800/80 p-4 rounded-2xl">
          <p className="text-gray-400 font-medium">Total Collected</p>
          <p className="text-2xl font-bold text-white font-mono mt-1">₹{totalCollected.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-gradient-to-br from-[#0e172c] to-[#0a1021] border border-gray-800/80 p-4 rounded-2xl">
          <p className="text-gray-400 font-medium">Outstanding Dues</p>
          <p className="text-2xl font-bold text-rose-400 font-mono mt-1">₹{totalPending.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-gradient-to-br from-[#0e172c] to-[#0a1021] border border-gray-800/80 p-4 rounded-2xl">
          <p className="text-gray-400 font-medium">Collection Efficiency</p>
          <p className="text-2xl font-bold text-amber-400 font-mono mt-1">{Math.round((totalCollected / totalTarget) * 100)}%</p>
        </div>
      </div>

   
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d1527]/40 border border-gray-800 p-3 rounded-2xl">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search student or transaction ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-white focus:outline-none focus:border-amber-500/50 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {['All', 'Paid', 'Overdue'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer text-[11px] ${
                statusFilter === status ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-950 text-gray-400 border border-gray-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

 
      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
                <th className="py-4 px-6">Invoice ID</th>
                <th className="py-4 px-6">Student</th>
                <th className="py-4 px-6">Abacus Level</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Due Date</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40 text-gray-300">
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => handleRowClick(row)}
                    className="hover:bg-[#111c34]/60 transition-all cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-mono text-amber-400 font-semibold">{row.id}</td>
                    <td className="py-4 px-6 font-bold text-white text-sm">{row.student}</td>
                    <td className="py-4 px-6">
                      <span className="text-blue-400 font-medium inline-flex items-center gap-1 bg-blue-950/30 border border-blue-900/40 px-2 py-0.5 rounded-lg">
                        <GraduationCap size={12} /> {row.level}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-white font-mono">₹{row.amount.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-6 text-gray-400 font-mono inline-flex items-center gap-1.5">
                      <Calendar size={12} className="text-gray-500" /> {row.dueDate}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black tracking-wide inline-block min-w-[75px] ${
                        row.status === 'Paid' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                      }`}>
                        ● {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="py-10 text-center text-gray-500">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isActionModalOpen && selectedRow && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d1527] border border-gray-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1.5 ${selectedRow.status === 'Paid' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            
            <button onClick={() => setIsActionModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"><X size={16} /></button>
            
            <div className="flex items-center gap-3 border-b border-gray-800 pb-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-gray-800 flex items-center justify-center text-amber-500 font-bold"><User size={18} /></div>
              <div>
                <h4 className="text-sm font-black text-white">{selectedRow.student}</h4>
                <p className="text-[10px] text-gray-500 font-mono font-bold">{selectedRow.id} | {selectedRow.level}</p>
              </div>
            </div>

            <div className="bg-slate-950/50 border border-gray-800/60 rounded-xl p-3 space-y-2.5 font-mono mb-4 text-gray-400">
              <div className="flex justify-between"><span>Amount:</span><span className="text-white font-bold">₹{selectedRow.amount.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span>Date:</span><span className="text-slate-200">{selectedRow.dueDate}</span></div>
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <button type="button" onClick={toggleStatus} className={`px-2 py-0.5 rounded text-[10px] font-black cursor-pointer transition-all active:scale-95 ${selectedRow.status === 'Paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                  {selectedRow.status} (Toggle)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {selectedRow.status === 'Paid' ? (
                  <button type="button" className="w-full bg-blue-950/60 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-900/60 rounded-xl py-2 font-bold flex items-center justify-center gap-1.5 cursor-pointer"><Download size={13} /> Slip</button>
                ) : (
                  <button type="button" className="w-full bg-amber-950/60 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-900/60 rounded-xl py-2 font-bold flex items-center justify-center gap-1.5 cursor-pointer"><Bell size={13} /> Remind</button>
                )}
              
                <button type="button" onClick={() => router.push(`/dashboard/franchise/fees/${selectedRow.id}`)} className="w-full bg-slate-900 hover:bg-slate-800 border border-gray-800 text-slate-300 rounded-xl py-2 font-bold flex items-center justify-center gap-1.5 cursor-pointer"><Eye size={13} /> Profile</button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-800/60">
                <button type="button" onClick={handleEditTrigger} className="w-full bg-slate-900 hover:bg-amber-600/10 text-amber-500 rounded-xl py-2 border border-transparent font-semibold flex items-center justify-center gap-1.5 cursor-pointer"><Edit2 size={12} /> Edit</button>
                <button type="button" onClick={handleDeleteTrigger} className="w-full bg-slate-900 hover:bg-rose-600/10 text-rose-500 rounded-xl py-2 border border-transparent font-semibold flex items-center justify-center gap-1.5 cursor-pointer"><Trash2 size={12} /> Delete</button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* २. RECORD NEW FEE PAYMENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d1527] border border-gray-800 w-full max-w-sm rounded-2xl p-5 shadow-2xl relative">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-gray-400 cursor-pointer"><X size={16} /></button>
            <h3 className="text-white font-bold mb-4 font-mono uppercase text-xs tracking-wide">Record Fee Payment</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Student Name</label>
                <input type="text" required value={formData.student} onChange={(e) => setFormData({...formData, student: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-white text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Amount (₹)</label>
                  <input type="number" required value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-white text-xs" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Due/Paid Date</label>
                  <input type="date" required value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-white text-xs" />
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold cursor-pointer">Add Transaction</button>
            </form>
          </div>
        </div>
      )}

      {/* ३. MODIFY LEDGER MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d1527] border border-gray-800 w-full max-w-sm rounded-2xl p-5 shadow-2xl relative">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="absolute top-4 right-4 text-gray-400 cursor-pointer"><X size={16} /></button>
            <h3 className="text-white font-bold mb-4 font-mono uppercase text-xs text-amber-500">Modify Ledger ({selectedRow?.id})</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Student Name</label>
                <input type="text" required value={formData.student} onChange={(e) => setFormData({...formData, student: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-white text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Amount (₹)</label>
                  <input type="number" required value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-white text-xs" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-white text-xs">
                    <option value="Overdue">Overdue</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-amber-600 text-white font-bold cursor-pointer">Save Modifications</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}