"use client";

import React, { useState, useMemo } from "react";
import { 
  DollarSign, Search, CreditCard, ArrowDownLeft, CheckCircle, 
  Clock, AlertCircle, Filter, Download, Plus, X, Calendar, User
} from "lucide-react";

export default function PaymentsManagement() {
  const [payments, setPayments] = useState([
    { id: "TXN-99201", studentName: "Rohan Joshi", invoiceId: "INV-2026-001", amount: 5310, mode: "UPI (GPay)", status: "Success", date: "2026-06-10" },
    { id: "TXN-99202", studentName: "Ananya Nair", invoiceId: "INV-2026-002", amount: 5310, mode: "Cash", status: "Success", date: "2026-06-18" },
    { id: "TXN-99203", studentName: "Aditya Patil", invoiceId: "INV-2026-003", amount: 5310, mode: "Cheque", status: "Pending", date: "2026-06-22" },
  ]);

  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("All");

  // Form State for Recording New Payment Manual Entry
  const [formData, setFormData] = useState({
    studentName: "", invoiceId: "", amount: "", mode: "UPI (GPay)", status: "Success"
  });

  // Live Metrics Calculation
  const metrics = useMemo(() => {
    return {
      successTotal: payments.filter(p => p.status === "Success").reduce((acc, p) => acc + p.amount, 0),
      pendingTotal: payments.filter(p => p.status === "Pending").reduce((acc, p) => acc + p.amount, 0),
      count: payments.length
    };
  }, [payments]);

  // Filter Pipeline
  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const matchesSearch = p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.invoiceId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMode = filterMode === "All" || p.mode.includes(filterMode);
      return matchesSearch && matchesMode;
    });
  }, [payments, searchQuery, filterMode]);

  const handleRecordPayment = (e) => {
    e.preventDefault();
    const newTxn = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      studentName: formData.studentName,
      invoiceId: formData.invoiceId || "DIRECT-DEPOSIT",
      amount: Number(formData.amount),
      mode: formData.mode,
      status: formData.status,
      date: new Date().toISOString().split('T')[0]
    };

    setPayments([newTxn, ...payments]);
    setIsRecordOpen(false);
    setFormData({ studentName: "", invoiceId: "", amount: "", mode: "UPI (GPay)", status: "Success" });
  };

  return (
    <div className="space-y-6 p-4 md:p-6 text-slate-100 max-w-[1600px] mx-auto">
      
      {/* Top Banner Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">Payment <span className="text-emerald-500">Gateway Ledger</span></h2>
          <p className="text-xs text-slate-400 mt-1">Audit inbound cashflows, track direct UPI transfers, and manage manual cheque clears.</p>
        </div>
        <button onClick={() => setIsRecordOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-xs font-extrabold rounded-xl text-white hover:brightness-110 shadow-lg shadow-emerald-600/10 transition-all cursor-pointer self-end sm:self-center">
          <Plus size={14} /><span>Record Payment</span>
        </button>
      </div>

      {/* Roster Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Settled Net Inflow</div>
            <div className="text-xl font-black text-emerald-400 mt-1">₹{metrics.successTotal.toLocaleString()}</div>
          </div>
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl"><CheckCircle size={18} /></div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-amber-500">Cheque Inbound Clearances</div>
            <div className="text-xl font-black text-amber-400 mt-1">₹{metrics.pendingTotal.toLocaleString()}</div>
          </div>
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl"><Clock size={18} /></div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-400">Total Cleared Logs</div>
            <div className="text-xl font-black text-cyan-400 mt-1">{metrics.count} Transactions</div>
          </div>
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl"><ArrowDownLeft size={18} /></div>
        </div>
      </div>

      {/* Filters Search Matrix */}
      <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-3 text-gray-500" size={14} />
          <input type="text" placeholder="Search Txn ID, Student, Invoice..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900 text-xs text-white rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-slate-700" />
        </div>
        <select value={filterMode} onChange={(e) => setFilterMode(e.target.value)} className="bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 focus:outline-none w-full sm:w-40 sm:ml-auto">
          <option value="All">All Payment Modes</option>
          <option value="UPI">UPI (GPay/PhonePe)</option>
          <option value="Cash">Cash Deposits</option>
          <option value="Cheque">Cheque</option>
        </select>
      </div>

      {/* Main Core Roster Data Grid Table */}
      <div className="bg-slate-950/40 border border-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">Invoice Mapping</th>
                <th className="py-4 px-6">Payer Name</th>
                <th className="py-4 px-6">Instrument / Mode</th>
                <th className="py-4 px-6 font-mono text-right">Settled Amount</th>
                <th className="py-4 px-6 text-center">Settlement Date</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50 text-slate-300 font-medium">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6 font-mono text-emerald-500 font-bold">{p.id}</td>
                  <td className="py-4 px-6 font-mono text-slate-500">{p.invoiceId}</td>
                  <td className="py-4 px-6 font-bold text-white">{p.studentName}</td>
                  <td className="py-4 px-6">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <CreditCard size={13} className="text-slate-500" /> {p.mode}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono text-right text-white font-black">₹{p.amount}</td>
                  <td className="py-4 px-6 font-mono text-center text-slate-400">{p.date}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.status === "Success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Payment Entry Record Popup Form */}
      {isRecordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1220] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <button onClick={() => setIsRecordOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"><X size={16} /></button>
            <h3 className="text-xs font-black text-white mb-5 uppercase font-mono tracking-wider border-b border-slate-900 pb-2">Log Manual Payment Entry</h3>
            
            <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1.5 font-bold">Payer Student Name</label>
                <input type="text" required placeholder="e.g. Rahul Patil" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Linked Invoice ID</label>
                  <input type="text" placeholder="e.g. INV-2026-001" value={formData.invoiceId} onChange={(e) => setFormData({...formData, invoiceId: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Collected Gross (₹)</label>
                  <input type="number" required placeholder="5310" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Payment Instrument</label>
                  <select value={formData.mode} onChange={(e) => setFormData({...formData, mode: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none">
                    <option value="UPI (GPay)">UPI (GPay/PhonePe)</option>
                    <option value="Cash">Cash Deposit</option>
                    <option value="Cheque">Cheque Instrument</option>
                    <option value="Card Swipe">POS Card Swipe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Clearance Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none">
                    <option value="Success">Success (Settled)</option>
                    <option value="Pending">Pending (In-clearance)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-900 mt-2">
                <button type="button" onClick={() => setIsRecordOpen(false)} className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 cursor-pointer hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold cursor-pointer hover:brightness-110 transition-all"><DollarSign size={14} /><span>Commit Transaction</span></button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}