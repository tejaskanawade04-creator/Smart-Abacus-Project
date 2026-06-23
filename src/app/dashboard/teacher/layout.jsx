// src/app/dashboard/teacher/layout.jsx
import React from 'react';
import Link from 'next/link';

export default function TeacherLayout({ children }) {
  // Sidebar  items - Teacher 
  const sidebarItems = [
    { name: 'Overview', href: '/dashboard/teacher', icon: '📊' },
    { name: 'Attendance', href: '/dashboard/teacher/attendance', icon: '📝' },
    { name: 'Batches', href: '/dashboard/teacher/batches', icon: '👥' },
    { name: 'Exams', href: '/dashboard/teacher/exams', icon: '✍️' },
    { name: 'Progress', href: '/dashboard/teacher/progress', icon: '📈' },
    { name: 'Compensatory Classes', href: '/dashboard/teacher/compensatory-classes', icon: '🔄' },
    { name: 'Salary History', href: '/dashboard/teacher/salary-history', icon: '💰' },
  ];

  return (
    <div className="flex h-screen bg-[#070b19] text-gray-100 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0d1527] border-r border-gray-800 flex flex-col justify-between p-4">
        <div>
          {/* Logo Section */}
          <div className="mb-8 px-2">
            <h1 className="text-xl font-bold tracking-wider text-white">SMART ABACUS</h1>
            <p className="text-xs text-blue-400 font-semibold tracking-widest mt-1">TEACHER PORTAL</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-[#1a263e] hover:text-white transition-all duration-200"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* User Profile & Sign Out */}
        <div className="border-t border-gray-800 pt-4">
          <div className="flex items-center space-x-3 p-2 bg-[#141f35] rounded-xl mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
              TA
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Teacher Admin</p>
              <p className="text-[10px] text-gray-400">Faculty Member</p>
            </div>
          </div>
          <button className="w-full text-left text-sm text-red-400 hover:text-red-300 font-medium px-4 py-2 transition-colors">
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* NAVBAR */}
        <header className="h-16 border-b border-gray-800 bg-[#0d1527] px-8 flex items-center justify-between">
          <div className="text-xs text-gray-400 font-medium">
            DASHBOARD / TEACHER / <span className="text-blue-400 uppercase">Overview</span>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-gray-400">SYSTEM STATUS: <span className="text-green-400 font-bold">● ONLINE</span></span>
            <span className="text-gray-500">|</span>
            <span className="bg-blue-950 text-blue-400 px-3 py-1 rounded-full font-semibold border border-blue-800">
              Teacher Portal
            </span>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>

    </div>
  );
}