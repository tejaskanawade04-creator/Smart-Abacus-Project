import React from 'react';

export default function FranchiseReports() {
  const operationalReports = [
    { title: 'Monthly Revenue Summary', duration: 'May 1 - May 31, 2026', fileType: 'PDF Report', size: '2.4 MB' },
    { title: 'Student Dropout & Transition Log', duration: 'Q1 - 2026', fileType: 'CSV Spreadsheet', size: '1.1 MB' },
    { title: 'Inventory Utilization Audit', duration: 'Yearly Stock Log', fileType: 'PDF Report', size: '4.8 MB' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Center Analytical Reports</h2>
        <p className="text-xs text-gray-400 mt-1">Download official audits, attendance registries, and localized income parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {operationalReports.map((report, idx) => (
          <div key={idx} className="bg-[#0d1527] border border-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex justify-between text-[10px] font-bold font-mono tracking-wide text-amber-400 uppercase">
                <span>{report.fileType}</span>
                <span className="text-gray-500">{report.size}</span>
              </div>
              <h3 className="text-base font-bold text-white mt-2 leading-snug">{report.title}</h3>
              <p className="text-xs text-gray-400 mt-1">Timeline: {report.duration}</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800/60">
              <button className="w-full bg-[#141f35] border border-gray-800 hover:bg-[#1c2a47] text-white text-xs font-semibold py-2 rounded-xl transition-all">
                📥 Export & Download Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}