// src/app/dashboard/teacher/compensatory-classes/page.jsx
import React from 'react';

export default function CompensatoryClassesPage() {
  // Mock Data: 
  const compensatoryClasses = [
    {
      id: 'CC-101',
      originalBatch: 'Delhi Central - Morning',
      reason: 'Teacher on Medical Leave (2026-06-10)',
      scheduledDate: '2026-06-21',
      timing: '11:00 AM - 12:30 PM',
      status: 'Scheduled',
      room: 'Lab B'
    },
    {
      id: 'CC-098',
      originalBatch: 'Mumbai West - Evening',
      reason: 'Public Holiday (2026-05-01)',
      scheduledDate: '2026-05-04',
      timing: '02:00 PM - 03:30 PM',
      status: 'Completed',
      room: 'Class 2'
    }
  ];

  return (
    <div>
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Compensatory Classes</h2>
          <p className="text-xs text-gray-400 mt-1">
            Schedule and manage extra makeup sessions for missed or cancelled classes.
          </p>
        </div>
        
        {/* Action Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-all">
          + Request Compensatory Class
        </button>
      </div>

      {/* DATA TABLE */}
      <div className="bg-[#0d1527]/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0d1527] text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <th className="py-4 px-6">Class ID</th>
              <th className="py-4 px-6">Original Batch</th>
              <th className="py-4 px-6">Reason for Extra Class</th>
              <th className="py-4 px-6">New Date & Time</th>
              <th className="py-4 px-6">Room</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-xs text-gray-300">
            {compensatoryClasses.map((item) => (
              <tr key={item.id} className="hover:bg-[#10192e]/40 transition-colors">
                
                {/* ID */}
                <td className="py-4 px-6 font-mono text-blue-400 font-semibold">{item.id}</td>
                
                {/* Original Batch */}
                <td className="py-4 px-6 font-semibold text-white">{item.originalBatch}</td>
                
                {/* Reason */}
                <td className="py-4 px-6 text-gray-400 italic">{item.reason}</td>
                
                {/* Date & Time */}
                <td className="py-4 px-6">
                  <div className="text-gray-200 font-medium font-mono">{item.scheduledDate}</div>
                  <div className="text-[11px] text-gray-500 font-mono mt-0.5">🕒 {item.timing}</div>
                </td>
                
                {/* Room */}
                <td className="py-4 px-6 text-gray-400 font-medium">{item.room}</td>
                
                {/* Status Tag */}
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${
                    item.status === 'Scheduled' 
                      ? 'bg-blue-950/60 text-blue-400 border border-blue-900/50' 
                      : 'bg-gray-800/60 text-gray-400 border border-gray-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                
                {/* Action Controls */}
                <td className="py-4 px-6 text-center space-x-3">
                  {item.status === 'Scheduled' ? (
                    <>
                      <button className="text-gray-400 hover:text-blue-400 transition-colors" title="Edit Schedule">✏️</button>
                      <button className="text-gray-400 hover:text-rose-400 transition-colors" title="Cancel Class">❌</button>
                    </>
                  ) : (
                    <span className="text-[11px] text-gray-500 italic">No Actions</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}