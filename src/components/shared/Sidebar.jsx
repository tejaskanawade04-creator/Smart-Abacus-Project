"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, BookOpen, UserCheck, 
  CreditCard, Award, Box, LogOut 
} from "lucide-react";

export const Sidebar = ({ role }) => {
  const pathname = usePathname();

  // Ultra Smart Abacus BRD रोल-बेस्ड मॅपिंग
  const menuConfig = {
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { name: "Franchises", href: "/modules/franchises", icon: Users },
      { name: "Global Inventory", href: "/modules/inventory", icon: Box },
    ],
    franchise: [
      { name: "Dashboard", href: "/dashboard/franchise", icon: LayoutDashboard },
      { name: "Teachers", href: "/modules/teachers", icon: UserCheck },
      { name: "Students", href: "/modules/students", icon: Users },
      { name: "Batches", href: "/modules/batches", icon: BookOpen },
      { name: "Local Stock", href: "/modules/inventory", icon: Box },
      { name: "Financials", href: "/modules/payments", icon: CreditCard },
    ],
    teacher: [
      { name: "My Dashboard", href: "/dashboard/teacher", icon: LayoutDashboard },
      { name: "Attendance", href: "/modules/attendance", icon: UserCheck },
      { name: "Exams", href: "/modules/exams", icon: Award },
      { name: "Progress Board", href: "/modules/progress", icon: Box },
    ],
    student: [
      { name: "My Progress", href: "/dashboard/student", icon: LayoutDashboard },
      { name: "Attendance View", href: "/modules/attendance", icon: UserCheck },
      { name: "Exam Section", href: "/modules/exams", icon: Award },
      { name: "Fee Status", href: "/modules/fees", icon: CreditCard },
    ],
  };

  const activeMenus = menuConfig[role] || [];

  return (
    <aside className="w-64 min-h-[90vh] bg-[#070b13]/40 border-r border-slate-800/50 backdrop-blur-md p-4 flex flex-col justify-between">
      <div className="space-y-1.5">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-3 mb-4">
          Portal Control ({role})
        </p>
        
        {activeMenus.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={idx} href={item.href}>
              <div className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive 
                  ? "bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}>
                <Icon size={16} />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <button className="flex items-center space-x-3 px-3 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all text-left w-full mt-auto">
        <LogOut size={16} />
        <span>Logout Session</span>
      </button>
    </aside>
  );
};