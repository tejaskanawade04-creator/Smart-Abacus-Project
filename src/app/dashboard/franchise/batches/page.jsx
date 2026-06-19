"use client";

import React, { useState } from 'react';
// सर्व आयकॉन्स व्यवस्थित इंपोर्ट केले आहेत
import { Users, X, Plus, Save, Filter, Eye, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';

export default function FranchiseBatches() {
  // डेटा स्टेट
  const [centerBatches, setCenterBatches] = useState([
    { code: 'B-MUM-01', name: 'Morning Standard', level: 'Level 1', teacher: 'Aman Sharma', schedule: 'Mon, Wed, Fri', timing: '09:00 AM', enrolled: 12, maxSeats: 15, status: 'Active' },
    { code: 'B-MUM-02', name: 'Evening Advance', level: 'Level 2', teacher: 'Neha Patel', schedule: 'Tue, Thu', timing: '04:00 PM', enrolled: 10, maxSeats: 10, status: 'Full' },
    { code: 'B-MUM-03', name: 'Weekend Junior', level: 'Level 1', teacher: 'Rahul Mane', schedule: 'Sat, Sun', timing: '11:00 AM', enrolled: 4, maxSeats: 12, status: 'Active' },
  ]);

  // स्टेट्स
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [formData, setFormData] = useState({
    name: '', level: 'Level 1', teacher: '', schedule: 'Mon, Wed, Fri', timing: '', maxSeats: '15'
  });

  // नवीन बॅच तयार करण्याचे लॉजिक
  const handleCreateBatchSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.teacher || !formData.timing) {
      return alert("Please fill all required fields!");
    }

    const newBatch = {
      code: `B-MUM-0${centerBatches.length + 1}`,
      name: formData.name,
      level: formData.level,
      teacher: formData.teacher,
      schedule: formData.schedule,
      timing: formData.timing,
      enrolled: 0,
      maxSeats: parseInt(formData.maxSeats) || 15,
      status: 'Active'
    };

    setCenterBatches([...centerBatches, newBatch]);
    setIsModalOpen(false);
    setFormData({ name: '', level: 'Level 1', teacher: '', schedule: 'Mon, Wed, Fri', timing: '', maxSeats: '15' });
  };

  // 🔄 सुधारलेले डिलीट लॉजिक (मेसेज आता इंग्रजीमध्ये आहे)
  const handleDeleteBatch = (code) => {
    if (confirm(`Are you sure you want to delete batch ${code}?`)) {
      setCenterBatches(centerBatches.filter(b => b.code !== code));
    }
  };

  // काऊंटर्स कॅल्क्युलेशन
  const totalBatches = centerBatches.length;
  const totalStudentsEnrolled = centerBatches.reduce((sum, b) => sum + b.enrolled, 0);
  const totalCapacity = centerBatches.reduce((sum, b) => sum + b.maxSeats, 0);

  // फिल्टर लॉजिक
  const filteredBatches = statusFilter === 'All' 
    ? centerBatches 
    : centerBatches.filter(b => b.status === statusFilter);

  return (
    <div className="space-y-6 text-xs text-slate-300 relative">
      
      {/* हेडर सेक्शन */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Center Batches</h2>
          <p className="text-xs text-gray-400 mt-1">Create slots, allocate faculty, and check student occupancy ratios.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer w-fit"
        >
          <Plus size={14} />
          <span>Create New Batch</span>
        </button>
      </div>

      {/* समरी काऊंटर्स */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0d1527]/40 border border-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 font-medium">Total Batches</p>
          <p className="text-xl font-bold text-white font-mono mt-1">{totalBatches}</p>
        </div>
        <div className="bg-[#0d1527]/40 border border-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 font-medium">Total Active Students</p>
          <p className="text-xl font-bold text-amber-400 font-mono mt-1">{totalStudentsEnrolled}</p>
        </div>
        <div className="bg-[#0d1527]/40 border border-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 font-medium">Seat Occupancy Ratio</p>
          <p className="text-xl font-bold text-emerald-400 font-mono mt-1">
            {Math.round((totalStudentsEnrolled / totalCapacity) * 100) || 0}%
          </p>
        </div>
      </div>

      {/* फिल्टर बटन्स */}
      <div className="flex items-center gap-2 bg-[#0d1527]/40 border border-gray-800 p-2 rounded-xl w-fit">
        <span className="text-gray-400 px-2 flex items-center gap-1"><Filter size={12}/> Filter:</span>
        {['All', 'Active', 'Full'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              statusFilter === status 
                ? 'bg-amber-600 text-white font-bold' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* डेटा टेबल */}
      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
                <th className="py-4 px-6">Batch Code</th>
                <th className="py-4 px-6">Batch Name</th>
                <th className="py-4 px-6">Target Level</th>
                <th className="py-4 px-6">Assigned Faculty</th>
                <th className="py-4 px-6">Weekly Schedule</th>
                <th className="py-4 px-6">Slot Time</th>
                <th className="py-4 px-6 text-center">Occupancy / Capacity</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
              {filteredBatches.map((batch) => {
                const occupancyPercentage = (batch.enrolled / batch.maxSeats) * 100;
                const isFull = batch.enrolled === batch.maxSeats;

                return (
                  <tr key={batch.code} className="hover:bg-[#10192e]/40 transition-colors">
                    <td className="py-4 px-6 font-mono text-amber-400 font-semibold">{batch.code}</td>
                    <td className="py-4 px-6 font-semibold text-white">{batch.name}</td>
                    <td className="py-4 px-6 text-purple-400 font-medium">{batch.level}</td>
                    <td className="py-4 px-6 text-gray-300">{batch.teacher}</td>
                    <td className="py-4 px-6 text-gray-400">{batch.schedule}</td>
                    <td className="py-4 px-6 text-gray-400 font-mono">🕒 {batch.timing}</td>
                    
                    {/* Occupancy Progress */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col items-center gap-1 min-w-[100px]">
                        <span className={`font-bold font-mono text-[11px] ${isFull ? 'text-rose-400' : 'text-gray-200'}`}>
                          {batch.enrolled} / {batch.maxSeats} Students
                        </span>
                        <div className="w-24 bg-slate-900 border border-gray-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${isFull ? 'bg-rose-500' : 'bg-amber-500'}`}
                            style={{ width: `${occupancyPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status Tag */}
                    <td className="py-4 px-6 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1 ${
                        batch.status === 'Full' ? 'bg-rose-950 text-rose-400' : 'bg-emerald-950 text-emerald-400'
                      }`}>
                        {batch.status === 'Full' ? <AlertTriangle size={10}/> : <CheckCircle size={10}/>}
                        {batch.status}
                      </span>
                    </td>

                    {/* Actions Buttons */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          type="button"
                          onClick={() => alert(`Viewing students of ${batch.name}`)}
                          className="p-1 text-blue-400 hover:bg-blue-500/10 rounded border border-transparent hover:border-blue-500/20 cursor-pointer"
                          title="Students List"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDeleteBatch(batch.code)}
                          className="p-1 text-rose-400 hover:bg-rose-500/10 rounded border border-transparent hover:border-rose-500/20 cursor-pointer"
                          title="Delete Batch"
                        >
                          <Trash2 size={14} />
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

      {/* CREATE BATCH MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d1527] border border-gray-800 w-full max-w-sm rounded-2xl p-5 shadow-2xl relative">
            
            <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
              <X size={16} />
            </button>
            
            <h3 className="text-white font-bold mb-4 font-mono tracking-wide uppercase flex items-center gap-2">
              <Users size={16} className="text-amber-500" />
              <span>Launch Center Slot</span>
            </h3>

            <form onSubmit={handleCreateBatchSubmit} className="space-y-3">
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Batch Name</label>
                <input 
                  type="text" required placeholder="e.g. Fast Track Batch" value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-white focus:outline-none text-xs" 
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Target Level</label>
                  <select 
                    value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-slate-200 text-xs focus:outline-none"
                  >
                    <option value="Level 1">Level 1</option>
                    <option value="Level 2">Level 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Max Capacity</label>
                  <input 
                    type="number" min="1" value={formData.maxSeats}
                    onChange={(e) => setFormData({...formData, maxSeats: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-white font-mono focus:outline-none text-xs" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Weekly Schedule</label>
                <select 
                  value={formData.schedule} onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-slate-200 text-xs focus:outline-none"
                >
                  <option value="Mon, Wed, Fri">Mon, Wed, Fri</option>
                  <option value="Tue, Thu">Tue, Thu</option>
                  <option value="Sat, Sun">Sat, Sun</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Slot Timing</label>
                <input 
                  type="text" required placeholder="e.g. 09:00 AM" value={formData.timing}
                  onChange={(e) => setFormData({...formData, timing: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-white font-mono focus:outline-none text-xs" 
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Assigned Faculty</label>
                <input 
                  type="text" required placeholder="Enter teacher name" value={formData.teacher}
                  onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-gray-800 text-white focus:outline-none text-xs" 
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-900 text-gray-400 border border-gray-800 cursor-pointer">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white font-bold transition-all cursor-pointer"><Save size={14} /> <span>Launch Slot</span></button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}