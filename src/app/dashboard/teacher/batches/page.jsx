// src/app/dashboard/teacher/batches/page.jsx
import React from 'react';

export default function BatchesPage() {
  const allocatedBatches = [
    { id: 'B1', name: 'Delhi Central - Morning', level: 'Level 1', days: 'Mon, Wed, Fri', strength: '12 Students', room: 'Lab A' },
    { id: 'B2', name: 'Mumbai West - Evening', level: 'Level 2', days: 'Tue, Thu', strength: '8 Students', room: 'Class 3' },
    { id: 'B3', name: 'Bangalore - Weekend', level: 'Level 3', days: 'Sat, Sun', strength: '15 Students', room: 'Main Hall' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">My Allocated Batches</h2>
        <p className="text-xs text-gray-400 mt-1">Overview of your teaching schedules and assigned student strength.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allocatedBatches.map((batch) => (
          <div key={batch.id} className="bg-[#0d1527]/80 border border-gray-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-purple-600/10 text-purple-400 border-b border-l border-gray-800 px-3 py-1 rounded-bl-xl text-[10px] font-bold">
              {batch.level}
            </div>
            
            <p className="text-[11px] font-bold text-blue-400 tracking-wider font-mono">{batch.id}</p>
            <h3 className="text-base font-bold text-white mt-1">{batch.name}</h3>
            
            <div className="mt-4 space-y-2 text-xs text-gray-400">
              <div className="flex justify-between"><span>📅 Days:</span><span className="text-gray-200 font-medium">{batch.days}</span></div>
              <div className="flex justify-between"><span>👥 Strength:</span><span className="text-gray-200 font-medium">{batch.strength}</span></div>
              <div className="flex justify-between"><span>🚪 Room / Location:</span><span className="text-gray-200 font-medium">{batch.room}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}