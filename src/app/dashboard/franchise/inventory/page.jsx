"use client";

import React, { useState, useMemo } from "react";
import { 
  Package, Search, Plus, Minus, AlertTriangle, CheckCircle, 
  Layers, ShoppingBag, ArrowDownUp, RefreshCw, X, Save 
} from "lucide-react";

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([
    { id: "INV-KIT-01", name: "Abacus Starter Kit (Level 1)", category: "Kits", stock: 45, minRequired: 15, unitPrice: 350 },
    { id: "INV-BKP-02", name: "Level 2 Advanced Practice Book", category: "Books", stock: 8, minRequired: 20, unitPrice: 120 }, // Low Stock
    { id: "INV-CRT-03", name: "Official Graduation Certificates", category: "Stationery", stock: 120, minRequired: 30, unitPrice: 40 },
    { id: "INV-KIT-04", name: "Master Metal Abacus Tool", category: "Kits", stock: 3, minRequired: 5, unitPrice: 650 }, // Low Stock
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isAdjustmentOpen, setIsAdjustmentOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [adjustmentQty, setAdjustmentQty] = useState("");
  const [adjustmentType, setAdjustmentType] = useState("Restock"); // Restock (+) or Distribute (-)

  // Filter Pipeline
  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "All" || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [inventory, searchQuery, filterCategory]);

  // Live Metrics (Low Stock Alert Engines)
  const metrics = useMemo(() => {
    return {
      totalItems: inventory.reduce((acc, item) => acc + item.stock, 0),
      lowStockCount: inventory.filter(item => item.stock < item.minRequired).length,
      categoriesCount: new Set(inventory.map(item => item.category)).size
    };
  }, [inventory]);

  const openAdjustmentModal = (item, type) => {
    setSelectedItem(item);
    setAdjustmentType(type);
    setAdjustmentQty("");
    setIsAdjustmentOpen(true);
  };

  const handleStockUpdate = (e) => {
    e.preventDefault();
    if (!selectedItem || !adjustmentQty) return;

    const qty = Number(adjustmentQty);
    setInventory(inventory.map(item => {
      if (item.id === selectedItem.id) {
        const finalStock = adjustmentType === "Restock" ? item.stock + qty : item.stock - qty;
        return { ...item, stock: Math.max(0, finalStock) };
      }
      return item;
    }));

    setIsAdjustmentOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 text-slate-100 max-w-[1600px] mx-auto">
      
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">Inventory & <span className="text-amber-500">Material Ledger</span></h2>
          <p className="text-xs text-slate-400 mt-1">Track abacus learning tools, textbook dispatches, and certificate allocations.</p>
        </div>
      </div>

      {/* Stock Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Total Units Logged</div>
            <div className="text-xl font-black text-white mt-1">{metrics.totalItems} Units</div>
          </div>
          <div className="p-2.5 bg-slate-900 text-slate-400 rounded-xl"><Package size={18} /></div>
        </div>
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-rose-500">Low Stock Triggers</div>
            <div className="text-xl font-black text-rose-400 mt-1">{metrics.lowStockCount} Items Critical</div>
          </div>
          <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl"><AlertTriangle size={18} /></div>
        </div>
        <div className="bg-[#0b1220] border border-slate-900 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-400">Unique Profiles</div>
            <div className="text-xl font-black text-cyan-400 mt-1">{metrics.categoriesCount} Material Classes</div>
          </div>
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl"><Layers size={18} /></div>
        </div>
      </div>

      {/* Roster Search Filters */}
      <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-3 text-gray-500" size={14} />
          <input type="text" placeholder="Search Material Name, SKU..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900 text-xs text-white rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-slate-700" />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 focus:outline-none w-full sm:w-40 sm:ml-auto">
          <option value="All">All Categories</option>
          <option value="Kits">Abacus Tool Kits</option>
          <option value="Books">Textbooks & Workbooks</option>
          <option value="Stationery">Stationery & Certificates</option>
        </select>
      </div>

      {/* Main Core Ledger Table */}
      <div className="bg-slate-950/40 border border-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/60 text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">
                <th className="py-4 px-6">SKU Code</th>
                <th className="py-4 px-6">Material Description</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6 font-mono text-center">Current Stock</th>
                <th className="py-4 px-6 font-mono text-center">Safety Buffer</th>
                <th className="py-4 px-6 text-center">Status Index</th>
                <th className="py-4 px-6 text-center">Stock Adjustment Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50 text-slate-300 font-medium">
              {filteredInventory.map((item) => {
                const isLow = item.stock < item.minRequired;
                return (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-6 font-mono text-amber-500 font-bold">{item.id}</td>
                    <td className="py-4 px-6 font-bold text-white">{item.name}</td>
                    <td className="py-4 px-6"><span className="px-2 py-0.5 bg-slate-900 text-slate-400 rounded font-mono text-[10px]">{item.category}</span></td>
                    <td className={`py-4 px-6 font-mono text-center font-black text-sm ${isLow ? "text-rose-400" : "text-slate-100"}`}>{item.stock}</td>
                    <td className="py-4 px-6 font-mono text-center text-slate-500">{item.minRequired}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isLow ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}>{isLow ? "Low Stock Alert" : "In Stock Stable"}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => openAdjustmentModal(item, "Restock")} className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg font-bold text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1">
                          <Plus size={11} /> Restock
                        </button>
                        <button onClick={() => openAdjustmentModal(item, "Distribute")} className="px-2 py-1 bg-slate-900 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg font-bold text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1">
                          <Minus size={11} /> Issue/Use
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Popup Modal */}
      {isAdjustmentOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b1220] border border-slate-800 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative">
            <button onClick={() => { setIsAdjustmentOpen(false); setSelectedItem(null); }} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"><X size={16} /></button>
            <h3 className="text-xs font-black text-white mb-4 uppercase font-mono tracking-wider border-b border-slate-900 pb-2">
              {adjustmentType === "Restock" ? "Stock Replenishment Pipeline" : "Material Disbursement Entry"}
            </h3>
            
            <form onSubmit={handleStockUpdate} className="space-y-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-900">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Item Selected</div>
                <div className="font-bold text-white mt-0.5">{selectedItem.name}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">Current Balance: <span className="text-amber-500 font-bold">{selectedItem.stock} units</span></div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 font-bold">
                  {adjustmentType === "Restock" ? "Quantity to Add (+)" : "Quantity Distributed (-)"}
                </label>
                <input type="number" required min="1" placeholder="e.g. 10" value={adjustmentQty} onChange={(e) => setAdjustmentQty(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none" />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setIsAdjustmentOpen(false); setSelectedItem(null); }} className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 cursor-pointer hover:text-white transition-colors">Cancel</button>
                <button type="submit" className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white font-bold cursor-pointer transition-all ${adjustmentType === 'Restock' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-amber-500 to-orange-600'}`}>
                  <Save size={14} /><span>Commit Stock Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}