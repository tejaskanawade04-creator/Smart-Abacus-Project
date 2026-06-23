"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function FranchiseLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter(); // Router हुक
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarItems = [
    { name: 'Overview', href: '/dashboard/franchise', icon: '📊' },
    { name: 'Students', href: '/dashboard/franchise/students', icon: '🎓' },
    { name: 'Teachers', href: '/dashboard/franchise/teachers', icon: '👩‍🏫' },
    { name: 'Batches', href: '/dashboard/franchise/batches', icon: '👥' },
    { name: 'Attendance', href: '/dashboard/franchise/attendance', icon: '📝' },
    { name: 'Fees', href: '/dashboard/franchise/fees', icon: '💰' },
    { name: 'Inventory', href: '/dashboard/franchise/inventory', icon: '📦' },
    { name: 'Payments', href: '/dashboard/franchise/payments', icon: '💳' },
    { name: 'Reports', href: '/dashboard/franchise/reports', icon: '📈' },
  ];

  // Sign Out लॉजिक
  const handleSignOut = () => {
    router.push('/login'); 
  };

  const currentActiveItem = sidebarItems.find(item => item.href === pathname);
  const pageTitle = currentActiveItem ? currentActiveItem.name : "Center Metrics";

  return (
    <div className="flex h-screen bg-[#070b19] text-gray-100 font-sans overflow-hidden">
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)} 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0d1527] border-r border-gray-800 flex flex-col justify-between p-4 overflow-y-auto transition-transform duration-300 md:translate-x-0 md:static md:block shrink-0 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div>
          <div className="mb-6 px-2 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-wider text-white">SMART ABACUS</h1>
              <p className="text-xs text-amber-400 font-semibold tracking-widest mt-1">FRANCHISE PORTAL</p>
            </div>
            <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-gray-400 hover:text-white text-xl">✕</button>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)} 
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-md shadow-blue-950/20"
                      : "text-gray-400 hover:bg-[#1a263e] hover:text-white border border-transparent"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-gray-800 pt-4 mt-4">
          <div className="flex items-center space-x-3 p-2 bg-[#141f35] rounded-xl mb-3">
            <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center text-sm font-bold text-white shrink-0">FO</div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">Mumbai West Center</p>
              <p className="text-[10px] text-gray-400">Franchise Owner</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut} 
            className="w-full text-left text-sm text-red-400 hover:text-red-300 font-medium px-4 py-2 transition-colors flex items-center gap-2"
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b border-gray-800 bg-[#0d1527] px-4 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-2 -ml-2 rounded-lg bg-[#141f35] border border-gray-800 md:hidden text-white"
            >☰</button>
            <div className="text-[11px] md:text-xs text-gray-400 font-medium tracking-wide">
              DASHBOARD / FRANCHISE / <span className="text-amber-400 uppercase">{pageTitle}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[11px] md:text-xs">
            <span className="text-gray-400 hidden sm:inline">CENTER STATUS: <span className="text-emerald-400 font-bold">● ACTIVE</span></span>
            <span className="bg-amber-950/40 text-amber-400 px-3 py-1 rounded-full font-semibold border border-amber-900/50">
              Franchise Mode
            </span>
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1 overflow-y-auto bg-[#070b19]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}