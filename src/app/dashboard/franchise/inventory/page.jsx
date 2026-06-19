"use client";

import React, { useState } from "react";
import { Package, X, CheckCircle2, AlertCircle } from "lucide-react";

export default function FranchiseInventory() {
  // १. तुमचा मूळ डेटा स्टेट (सर्व कॉलम्ससह)
  const [stockItems, setStockItems] = useState([
    { code: 'KIT-L1', itemName: 'Abacus Tool & Level 1 Book Kit', category: 'Student Material', availableStock: 24, minRequired: 10, status: 'In Stock' },
    { code: 'KIT-L2', itemName: 'Abacus Level 2 Worksheet Set', category: 'Student Material', availableStock: 4, minRequired: 10, status: 'Low Stock' },
    { code: 'CERT-ALL', itemName: 'Official Completion Certificates', category: 'Admin', availableStock: 50, minRequired: 15, status: 'In Stock' },
  ]);

  // मॉडेल आणि फिल्टर स्टेट्स
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // स्टॉक रिक्वेस्ट फॉर्म स्टेट
  const [requestForm, setRequestForm] = useState({ itemCode: "KIT-L1", quantity: "" });

  // २. Issue Kit चं अचूक लॉजिक (स्टॉक वजा करणे + ऑटो स्टेटस अपडेट)
  const handleIssueKit = (code) => {
    setStockItems(stockItems.map(item => {
      if (item.code === code && item.availableStock > 0) {
        const newStock = item.availableStock - 1;
        const newStatus = newStock === 0 ? 'Out of Stock' : newStock <= item.minRequired ? 'Low Stock' : 'In Stock';
        return { ...item, availableStock: newStock, status: newStatus };
      }
      return item;
    }));
  };

  // ३. कॅटेगरी फिल्टर
  const filteredItems = selectedCategory === "All" 
    ? stockItems 
    : stockItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-4 text-xs text-slate-300">
      
      {/* हेडर विभाग */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Material & Kit Inventory</h2>
          <p className="text-gray-400 text-[11px] mt-0.5">Monitor abacus kits, study materials, and submit restock orders to Admin.</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* कॅटेगरी फिल्टर ऑप्शन */}
          <select 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#0d1527] border border-gray-800 p-2 rounded-lg text-white cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Student Material">Student Material</option>
            <option value="Admin">Admin</option>
          </select>

          <button 
            onClick={() => setIsRequestModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md"
          >
            📦 Request Stock from Admin
          </button>
        </div>
      </div>

      {/* डेटा टेबल (तुमचे मूळचे सर्व कॉलम्स परत आणले आहेत) */}
      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">
                <th className="py-4 px-6">Item Code</th>
                <th className="py-4 px-6">Item Name</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Current Stock</th>
                <th className="py-4 px-6">Min Threshold</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-gray-300 font-medium">
              {filteredItems.map((item) => (
                <tr key={item.code} className="hover:bg-[#10192e]/40 transition-colors">
                  <td className="py-4 px-6 font-mono text-amber-400 font-semibold">{item.code}</td>
                  <td className="py-4 px-6 font-semibold text-white text-[13px]">{item.itemName}</td>
                  <td className="py-4 px-6 text-gray-400">{item.category}</td>
                  <td className="py-4 px-6 font-bold font-mono text-gray-100">{item.availableStock} Units</td>
                  <td className="py-4 px-6 text-gray-500 font-mono">{item.minRequired}</td>
                  
                  {/* मूळचे सुंदर स्टेटस बॅजेस */}
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                      item.status === 'In Stock' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400 animate-pulse'
                    }`}>
                      {item.status === 'In Stock' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                      {item.status}
                    </span>
                  </td>

                  {/* ⚡ Quick Issue Action */}
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleIssueKit(item.code)}
                      disabled={item.availableStock === 0}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-all active:scale-95 ${
                        item.availableStock === 0
                          ? 'text-gray-600 bg-gray-900 border-gray-800 cursor-not-allowed'
                          : 'text-blue-400 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 cursor-pointer'
                      }`}
                    >
                      {item.availableStock === 0 ? "Out of Stock" : "⚡ Issue Kit"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📦 सर्व ऑप्शन्ससह सुटसुटीत पॉप-अप (Modal) */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d1527] border border-gray-800 w-full max-w-sm rounded-2xl p-5 shadow-2xl relative">
            <button onClick={() => setIsRequestModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={15} /></button>
            
            <h3 className="text-white font-bold mb-4 font-mono tracking-wide flex items-center gap-1.5 uppercase">
              <Package size={15} className="text-blue-500" />
              <span>Raise Restock Order</span>
            </h3>
            
            <div className="space-y-3">
              {/* १. आयटम सिलेक्ट करण्याचा ड्रॉपडाउन ऑप्शन */}
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Select Material Item</label>
                <select 
                  value={requestForm.itemCode} 
                  onChange={(e) => setRequestForm({...requestForm, itemCode: e.target.value})}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-gray-800 text-white cursor-pointer"
                >
                  {stockItems.map(item => (
                    <option key={item.code} value={item.code}>{item.itemName}</option>
                  ))}
                </select>
              </div>

              {/* २. क्वांटिटी इनपुट */}
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Quantity Needed</label>
                <input 
                  type="number" 
                  placeholder="Enter units (e.g. 20)" 
                  value={requestForm.quantity} 
                  onChange={(e) => setRequestForm({...requestForm, quantity: e.target.value})} 
                  className="w-full p-2 rounded-xl bg-slate-900 border border-gray-800 text-white focus:outline-none" 
                />
              </div>

              {/* सेंड बटन */}
              <button 
                onClick={() => { 
                  const selected = stockItems.find(i => i.code === requestForm.itemCode);
                  alert(`Success: Requested ${requestForm.quantity} Units for ${selected.itemName}!`); 
                  setIsRequestModalOpen(false); 
                  setRequestForm({ itemCode: "KIT-L1", quantity: "" });
                }} 
                className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl font-bold text-white transition-all mt-2 shadow-lg"
              >
                Send Request to Admin
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}