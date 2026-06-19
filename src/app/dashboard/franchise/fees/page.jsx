"use client";

import React, { useState } from "react";
// सर्व प्रीमियम आयकॉन्स इम्पोर्ट केले आहेत
import { IndianRupee, GraduationCap, Calendar, CheckCircle2, AlertCircle, ShieldAlert, Search, Download, Bell, X, FileText, Save, Send } from "lucide-react";

export default function FranchiseFees() {
  // १. तुमचा मूळ डेटा - आपण स्टेटमध्ये घेतला आहे जेणेकरून तो लाईव्ह अपडेट होईल
  const [feeRecords, setFeeRecords] = useState([
    { id: "TXN-701", student: "Isha Sharma", level: "Level 2", amount: "₹3,500", dueDate: "2026-06-15", status: "Pending", phone: "9545123456" },
    { id: "TXN-699", student: "Rohan Deshmukh", level: "Level 1", amount: "₹4,500", dueDate: "2026-06-02", status: "Paid", phone: "9876543210" },
    { id: "TXN-654", student: "Aditya Patil", level: "Level 4", amount: "₹3,500", dueDate: "2026-05-20", status: "Overdue", phone: "8888777766" },
  ]);

  // पॉप-अप्स मॅनेज करण्यासाठी स्टेट्स
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // नवीन पेमेंट रेकॉर्ड करण्यासाठी फॉर्म स्टेट
  const [newPayment, setNewPayment] = useState({
    student: "", level: "Level 1", amount: "", dueDate: new Date().toISOString().split('T')[0], status: "Paid", phone: ""
  });

  // २. नवीन फी पेमेंट रेकॉर्ड करण्याचे फंक्शन
  const handleRecordPayment = (e) => {
    e.preventDefault();
    const txnId = `TXN-${Math.floor(600 + Math.random() * 200)}`;
    const formattedAmount = newPayment.amount.startsWith("₹") ? newPayment.amount : `₹${newPayment.amount}`;
    
    setFeeRecords([{ id: txnId, ...newPayment, amount: formattedAmount }, ...feeRecords]);
    setIsRecordModalOpen(false);
    setNewPayment({ student: "", level: "Level 1", amount: "", dueDate: new Date().toISOString().split('T')[0], status: "Paid", phone: "" });
  };

  // ३. फी स्टेटसवर थेट क्लिक करून ते बदलण्याचे फंक्शन (Paid 🔁 Pending 🔁 Overdue)
  const toggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === "Paid" ? "Pending" : currentStatus === "Pending" ? "Overdue" : "Paid";
    setFeeRecords(feeRecords.map(rec => rec.id === id ? { ...rec, status: nextStatus } : rec));
  };

  // ४. BRD वाईज व्हॉट्सॲप रिमाइंडर फंक्शन
  const sendWhatsAppReminder = (record) => {
    const message = `Dear Parent, this is a reminder from Smart Abacus Academy regarding the fee collection of ₹${record.amount.replace('₹', '')} for student ${record.student} (${record.level}). Currently, it is ${record.status}. Please settle it soon. Thank you!`;
    window.open(`https://wa.me/91${record.phone || '9876543210'}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // सर्च फिल्टर
  const filteredRecords = feeRecords.filter(rec => 
    rec.student.toLowerCase().includes(searchTerm.toLowerCase()) || rec.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn text-xs">
      
      {/* हेडर विभाग */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Fee & <span className="text-orange-500">Collection</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Track student monthly tuitions, pending collections, and generate digital receipts.
          </p>
        </div>

        <button 
          onClick={() => setIsRecordModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/10 transition-all self-start sm:self-center"
        >
          <IndianRupee size={14} />
          <span>Record Fee Payment</span>
        </button>
      </div>

      {/* क्विक सर्च बार */}
      <div className="relative max-w-sm">
        <input 
          type="text"
          placeholder="Search by ID or Student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-950/40 border border-slate-800 text-white focus:outline-none focus:border-orange-500/40 font-medium placeholder-slate-600"
        />
        <Search size={14} className="absolute right-3.5 top-3.5 text-slate-600" />
      </div>

      {/* डेटा टेबल */}
      <div className="bg-slate-950/40 border border-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                <th className="py-4 px-6">Invoice / TXN ID</th>
                <th className="py-4 px-6">Student</th>
                <th className="py-4 px-6">Abacus Level</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Due Date</th>
                <th className="py-4 px-6">Status (Click to change)</th>
                <th className="py-4 px-6 text-center">Receipt Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50 text-slate-300 font-medium">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-white/5 transition-colors group">
                  
                  {/* TXN ID */}
                  <td className="py-4 px-6 font-mono text-orange-400 font-bold">{record.id}</td>
                  
                  {/* Student Name */}
                  <td className="py-4 px-6 font-bold text-white">{record.student}</td>
                  
                  {/* Level */}
                  <td className="py-4 px-6">
                    <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                      <GraduationCap size={14} /> {record.level}
                    </span>
                  </td>
                  
                  {/* Amount */}
                  <td className="py-4 px-6 font-bold font-mono text-slate-100">{record.amount}</td>
                  
                  {/* Due Date */}
                  <td className="py-4 px-6 text-slate-500 font-mono flex items-center gap-1.5 mt-1">
                    <Calendar size={13} /> {record.dueDate}
                  </td>
                  
                  {/* Status Toggle Button */}
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleStatus(record.id, record.status)}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition-all active:scale-95 ${
                        record.status === 'Paid' ? 'text-emerald-400 bg-emerald-950/40 border-emerald-900/30 hover:bg-emerald-900/40' :
                        record.status === 'Pending' ? 'text-amber-400 bg-amber-950/40 border-amber-900/30 hover:bg-amber-900/40' :
                        'text-rose-400 bg-rose-950/40 border-rose-900/30 hover:bg-rose-900/40'
                      }`}
                    >
                      {record.status}
                    </button>
                  </td>
                  
                  {/* Receipt / Remind Column */}
                  <td className="py-4 px-6 text-center">
                    {record.status === 'Paid' ? (
                      <button 
                        onClick={() => setSelectedReceipt(record)}
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold hover:underline"
                      >
                        <Download size={12} /> <span>Download Slip</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => sendWhatsAppReminder(record)}
                        className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20 hover:bg-amber-500/20 transition-all"
                      >
                        <Bell size={11} /> <span>Remind Parent</span>
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ५. 💵 RECORD PAYMENT FORM POP-UP (Modal) */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d1527] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-fadeIn">
            <button onClick={() => setIsRecordModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={16} /></button>
            
            <h3 className="text-sm font-black text-white mb-4 uppercase font-mono tracking-wider flex items-center gap-2">
              <FileText size={16} className="text-emerald-500" />
              <span>Record Fee Offline Receipt</span>
            </h3>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Student Name</label>
                <input type="text" required value={newPayment.student} onChange={(e) => setNewPayment({...newPayment, student: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500/50" placeholder="Enter full name" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Abacus Level</label>
                  <select value={newPayment.level} onChange={(e) => setNewPayment({...newPayment, level: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 cursor-pointer">
                    <option value="Level 1">Level 1</option> <option value="Level 2">Level 2</option> <option value="Level 3">Level 3</option> <option value="Level 4">Level 4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Amount Paid (₹)</label>
                  <input type="number" required value={newPayment.amount} onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500/50" placeholder="e.g. 3500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Due / Record Date</label>
                  <input type="date" required value={newPayment.dueDate} onChange={(e) => setNewPayment({...newPayment, dueDate: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Initial Status</label>
                  <select value={newPayment.status} onChange={(e) => setNewPayment({...newPayment, status: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 cursor-pointer">
                    <option value="Paid">Paid (Cash/UPI)</option> <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Parent WhatsApp Contact (Optional)</label>
                <input type="tel" placeholder="10 digit number for notifications" value={newPayment.phone} onChange={(e) => setNewPayment({...newPayment, phone: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono" />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-900">
                <button type="button" onClick={() => setIsRecordModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all"><Save size={14} /><span>Save Transaction</span></button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ६. 📥 VIEW & DOWNLOAD DIGITAL SLIP POP-UP (Modal) */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b111e] border border-slate-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative text-slate-300">
            <button onClick={() => setSelectedReceipt(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={16} /></button>
            
            <div className="text-center border-b border-slate-900 pb-4 mb-4">
              <FileText className="mx-auto text-orange-500 mb-2" size={28} />
              <h3 className="text-base font-black text-white uppercase tracking-wider font-mono">SMART ABACUS ACADEMY</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Franchise Student E-Receipt</p>
            </div>

            <div className="space-y-2.5 font-medium border-b border-slate-900 pb-4 mb-4">
              <div className="flex justify-between"><span className="text-slate-500">Transaction ID:</span><span className="font-mono text-white font-bold">{selectedReceipt.id}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Student Name:</span><span className="text-white font-bold">{selectedReceipt.student}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Course Level:</span><span className="text-blue-400 font-bold">{selectedReceipt.level}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Settled Date:</span><span className="font-mono text-slate-400">{selectedReceipt.dueDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Status:</span><span className="text-emerald-400 font-bold font-mono">SUCCESS // PAID</span></div>
            </div>

            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-900 mb-5">
              <span className="font-bold text-slate-400">Net Fees Deposited:</span>
              <span className="text-xl font-black text-orange-400 font-mono">{selectedReceipt.amount}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => { alert("PDF Generated Successfully!"); setSelectedReceipt(null); }} className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold hover:bg-slate-800 transition-all">
                <Download size={13} /> Print/PDF
              </button>
              <button onClick={() => { alert("Receipt sent via SMS/WhatsApp gateway!"); setSelectedReceipt(null); }} className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all">
                <Send size={13} /> WhatsApp Slip
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}