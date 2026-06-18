// src/app/dashboard/franchise/inventory/page.jsx
import React from 'react';

export default function FranchiseInventory() {
  const stockItems = [
    { code: 'KIT-L1', itemName: 'Abacus Tool & Level 1 Book Kit', category: 'Student Material', availableStock: 24, minRequired: 10, status: 'In Stock' },
    { code: 'KIT-L2', itemName: 'Abacus Level 2 Worksheet Set', category: 'Student Material', availableStock: 4, minRequired: 10, status: 'Low Stock' },
    { code: 'CERT-ALL', itemName: 'Official Completion Certificates', category: 'Admin', availableStock: 50, minRequired: 15, status: 'In Stock' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Material & Kit Inventory</h2>
          <p className="text-xs text-gray-400 mt-1">Monitor abacus kits, study materials, and submit restock orders to Admin.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-all">
          📦 Request Stock from Admin
        </button>
      </div>

      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">Item Code</th>
              <th className="py-4 px-6">Item Name</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Current Stock</th>
              <th className="py-4 px-6">Min Threshold</th>
              <th className="py-4 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {stockItems.map((item) => (
              <tr key={item.code} className="hover:bg-[#10192e]/40 transition-colors">
                <td className="py-4 px-6 font-mono text-amber-400 font-semibold">{item.code}</td>
                <td className="py-4 px-6 font-semibold text-white">{item.itemName}</td>
                <td className="py-4 px-6 text-gray-400">{item.category}</td>
                <td className="py-4 px-6 font-bold font-mono text-gray-200">{item.availableStock} Units</td>
                <td className="py-4 px-6 text-gray-500 font-mono">{item.minRequired}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'In Stock' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400 animate-pulse'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}