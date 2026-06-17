"use client";


import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Pre-defined initial users to populate the mock database
const INITIAL_USERS = [
  { id: 1, name: "Delhi Central Academy", email: "delhi@abacus.com", role: "Franchise", status: "Active", date: "2026-05-10", location: "New Delhi" },
  { id: 2, name: "Aman Sharma", email: "aman@abacus.com", role: "Teacher", status: "Active", date: "2026-06-02", location: "New Delhi" },
  { id: 3, name: "Neha Patel", email: "neha@abacus.com", role: "Student", status: "Active", date: "2026-06-12", location: "Mumbai West" },
  { id: 4, name: "Mumbai West Franchise", email: "mumbai@abacus.com", role: "Franchise", status: "Active", date: "2026-06-15", location: "Mumbai" },
  { id: 5, name: "Sarah Jenkins", email: "sarah.j@abacus.com", role: "Teacher", status: "Suspended", date: "2026-04-18", location: "Bangalore" },
  { id: 6, name: "Kunal Verma", email: "kunal@abacus.com", role: "Student", status: "Active", date: "2026-06-16", location: "Delhi Central" }
];

// Initial mock franchises
const INITIAL_FRANCHISES = [
  { id: 1, name: "Delhi Central Academy", owner: "Rajesh Kumar", location: "Connaught Place, Delhi", students: 180, status: "Active" },
  { id: 2, name: "Mumbai West Franchise", owner: "Priya Desai", location: "Andheri West, Mumbai", students: 125, status: "Active" },
  { id: 3, name: "Bangalore East Center", owner: "Srinivas Raju", location: "Indiranagar, Bangalore", students: 95, status: "Active" },
  { id: 4, name: "Chennai North Hub", owner: "Meenakshi Sundaram", location: "T-Nagar, Chennai", students: 60, status: "Pending Approval" }
];

// Initial mock inventory
const INITIAL_INVENTORY = [
  { id: 1, name: "Standard 17-Rod Student Abacus", sku: "AB-STUD-17", stock: 450, minThreshold: 100, cost: 5 },
  { id: 2, name: "Teacher Demonstration Abacus (Large)", sku: "AB-TCHR-DEMO", stock: 25, minThreshold: 10, cost: 25 },
  { id: 3, name: "Level 1 Workbooks (Set of A & B)", sku: "BK-LVL-1", stock: 85, minThreshold: 150, cost: 8 },
  { id: 4, name: "Level 2 Workbooks (Set of A & B)", sku: "BK-LVL-2", stock: 240, minThreshold: 100, cost: 8 },
  { id: 5, name: "Smart Abacus Academy Bags", sku: "BG-ACAD", stock: 12, minThreshold: 50, cost: 4 },
  { id: 6, name: "Student Graduation Certificates", sku: "CT-GRAD", stock: 600, minThreshold: 200, cost: 1 }
];

export default function AdminDashboard() {
  const router = useRouter();
  
  // Dashboard navigation states
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Date/Time Clock state
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Main list states (mock DB)
  const [users, setUsers] = useState(INITIAL_USERS);
  const [franchises, setFranchises] = useState(INITIAL_FRANCHISES);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);

  // Search filter inside User Management
  const [userSearch, setUserSearch] = useState("");

  // New User Form States
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Teacher");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserLocation, setNewUserLocation] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [userError, setUserError] = useState("");
  const [userSuccess, setUserSuccess] = useState("");

  // New Franchise Form States
  const [franchiseName, setFranchiseName] = useState("");
  const [franchiseOwner, setFranchiseOwner] = useState("");
  const [franchiseLocation, setFranchiseLocation] = useState("");
  const [showAddFranchiseModal, setShowAddFranchiseModal] = useState(false);

  // Settings Configuration States
  const [settings, setSettings] = useState({
    allowPublicRegister: false, // matches the block recommendation
    maintenanceMode: false,
    emailAlerts: true,
    autoApproveFranchise: false
  });

  // Handle Log Out
  const handleLogout = () => {
    router.push("/pages/auth/login");
  };

  // Create User Handler
  const handleCreateUser = (e) => {
    e.preventDefault();
    setUserError("");
    setUserSuccess("");

    if (!newUserName || !newUserEmail || !newUserPassword) {
      setUserError("Please fill in all required fields.");
      return;
    }

    if (users.some(u => u.email.toLowerCase() === newUserEmail.toLowerCase())) {
      setUserError("A user with this email address already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "Active",
      date: new Date().toISOString().split("T")[0],
      location: newUserLocation || "Not Assigned"
    };

    setUsers([newUser, ...users]);
    
    // Clear Form & Close
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    setNewUserLocation("");
    setShowAddUserModal(false);
    
    // Flash Success Banner
    setUserSuccess(`Successfully created user "${newUserName}" as ${newUserRole}!`);
    setTimeout(() => setUserSuccess(""), 4000);
  };

  // Toggle user status between Active/Suspended
  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === "Active" ? "Suspended" : "Active"
        };
      }
      return user;
    }));
  };

  // Delete User Handler
  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const u = users.find(x => x.id === userId);
      setUsers(users.filter(user => user.id !== userId));
      if (u) {
        setUserSuccess(`Successfully deleted user "${u.name}".`);
        setTimeout(() => setUserSuccess(""), 4000);
      }
    }
  };

  // Add Franchise Handler
  const handleAddFranchise = (e) => {
    e.preventDefault();
    if (!franchiseName || !franchiseOwner) return;

    const newFranchise = {
      id: Date.now(),
      name: franchiseName,
      owner: franchiseOwner,
      location: franchiseLocation || "Unspecified",
      students: 0,
      status: "Active"
    };

    setFranchises([...franchises, newFranchise]);
    
    // Auto-create a corresponding Franchise Owner user in the users table!
    const newFranchiseUser = {
      id: Date.now() + 1,
      name: franchiseOwner,
      email: `${franchiseOwner.toLowerCase().replace(/\s+/g, "")}@abacus.com`,
      role: "Franchise",
      status: "Active",
      date: new Date().toISOString().split("T")[0],
      location: franchiseName
    };
    setUsers([newFranchiseUser, ...users]);

    setFranchiseName("");
    setFranchiseOwner("");
    setFranchiseLocation("");
    setShowAddFranchiseModal(false);
  };

  // Update Inventory Stock (replenish)
  const adjustStock = (itemId, amount) => {
    setInventory(inventory.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          stock: Math.max(0, item.stock + amount)
        };
      }
      return item;
    }));
  };

  // Filter users based on search
  const filteredUsers = users.filter(user => {
    const q = userSearch.toLowerCase();
    return user.name.toLowerCase().includes(q) || 
           user.email.toLowerCase().includes(q) || 
           user.role.toLowerCase().includes(q) ||
           user.location.toLowerCase().includes(q);
  });

  // Calculate quick metrics for Overview
  const totalStudents = users.filter(u => u.role === "Student" && u.status === "Active").length * 80 + 350; // Mock calculation tied to DB size
  const activeFranchisesCount = franchises.filter(f => f.status === "Active").length;
  const activeTeachersCount = users.filter(u => u.role === "Teacher" && u.status === "Active").length;
  const lowStockItemsCount = inventory.filter(item => item.stock <= item.minThreshold).length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans flex relative overflow-hidden">
      
      {/* Background Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />

      {/* MOBILE SIDEBAR DRAWEROVERLAY */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
        />
      )}

      {/* SIDEBAR PANEL */}
      <aside className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-slate-900/60 backdrop-blur-xl p-5 flex flex-col justify-between transition-transform duration-300 lg:transform-none ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        
        {/* Sidebar Header / Logo */}
        <div>
          <div className="flex items-center gap-3 border-b border-white/5 pb-5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
              </svg>
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-wider uppercase text-white">
                Smart Abacus
              </h1>
              <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-widest">
                ERP Admin
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: "overview", label: "Overview", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
              { id: "users", label: "User Management", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 20c-2.296 0-4.47-.679-6.305-1.848v-.005c0-2.243 4.072-4.022 9.08-4.022 1.247 0 2.447.11 3.565.32M13.81 12.036A4.47 4.47 0 0015 8.75c0-2.485-2.015-4.5-4.5-4.5S6 6.265 6 8.75c0 1.25.51 2.38 1.332 3.193m6.48 0a4.47 4.47 0 01-6.48 0m6.48 0a3.075 3.075 0 01-1.042.036m-4.396-.036a3.075 3.075 0 00-1.042-.036" },
              { id: "franchises", label: "Franchise List", icon: "M2.25 21h19.5m-18-10.5h16.5M2.25 9h19.5M2.25 15h19.5M2.25 18h19.5M3 3h18M3 6h18" },
              { id: "inventory", label: "Inventory", icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
              { id: "reports", label: "Reports", icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" },
              { id: "settings", label: "System Settings", icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.767a1.123 1.123 0 00-.417 1.03c.004.074.006.148.006.222 0 .074-.002.148-.006.222a1.123 1.123 0 00.417 1.03l1.003.767c.379.29.507.82.26 1.43l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.216-.456a1.125 1.125 0 00-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 00-.646-.87a6.57 6.57 0 01-.22-.127a1.126 1.126 0 00-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.43l1.003-.767a1.122 1.122 0 00.417-1.03a6.57 6.57 0 01-.006-.222c0-.074.002-.148.006-.222a1.122 1.122 0 00-.417-1.03l-1.003-.767a1.125 1.125 0 01-.26-1.43l1.296-2.247a1.125 1.125 0 011.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128c.332-.183.582-.495.645-.869l.214-1.28zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500/25 to-indigo-600/25 border border-blue-500/30 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer / Logout */}
        <div className="border-t border-white/5 pt-4">
          <div className="rounded-2xl bg-white/[0.03] p-3 border border-white/5 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-blue-500/30 flex items-center justify-center font-black text-xs text-blue-300">
                AD
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-200 truncate">Saideep Admin</p>
                <span className="text-[10px] text-slate-500">Super Administrator</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/25 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN WINDOW CONTAINER */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10 overflow-y-auto">
        
        {/* HEADER BAR */}
        <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Hamburger for mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb */}
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                <span>Dashboard</span>
                <span>/</span>
                <span>Admin</span>
                <span>/</span>
                <span className="text-blue-400">{activeTab}</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-wide capitalize mt-0.5">
                {activeTab === "overview" ? "Dashboard Summary" : activeTab.replace("-", " ")}
              </h2>
            </div>
          </div>

          {/* Live Date/Clock & Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                System Status: Online
              </span>
              <span className="text-xs text-slate-300 font-mono font-medium">
                {currentTime || "Loading Date & Time..."}
              </span>
            </div>
            
            <div className="w-px h-6 bg-white/10 hidden md:block" />

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">Admin Portal</span>
            </div>
          </div>
        </header>

        {/* VIEW SCENARIOS (CONTENT BODY) */}
        <div className="p-6 md:p-8 flex-1">
          
          {/* TAB 1: OVERVIEW SUMMARY */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* Info alert confirming best practices */}
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-4 flex items-start gap-3.5 shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)] animate-fade-in">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/20">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-blue-100">
                    Restricted Signup Security Policy Active
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Public registration has been successfully disabled. Accounts can only be created by system administrators through the <strong>User Management</strong> tab.
                  </p>
                </div>
              </div>

              {/* KPI Stat Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { title: "Total Students", value: totalStudents.toLocaleString(), subtitle: "+12% this month", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 017.382 5.84c-1.84.532-3.613 1.185-5.291 1.956m-8.351 0a54.12 54.12 0 018.35 0M12 10.147v-4.14", border: "border-blue-500/15" },
                  { title: "Active Franchises", value: activeFranchisesCount, subtitle: `${franchises.length} total branches`, icon: "M2.25 21h19.5m-18-10.5h16.5M2.25 9h19.5M2.25 15h19.5M2.25 18h19.5M3 3h18M3 6h18", border: "border-amber-500/15" },
                  { title: "Certified Instructors", value: activeTeachersCount, subtitle: `${users.filter(u => u.role === "Teacher").length} registered`, icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 20", border: "border-rose-500/15" },
                  { title: "Low Stock Items", value: lowStockItemsCount, subtitle: "Action required in inventory", icon: "M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z", border: lowStockItemsCount > 0 ? "border-rose-500/50 text-rose-300" : "border-slate-500/15" }
                ].map((stat, i) => (
                  <div key={i} className={`rounded-2xl border bg-white/[0.03] p-5 shadow-md backdrop-blur-md transition-all hover:bg-white/[0.05] hover:scale-[1.02] ${stat.border}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</span>
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                      </svg>
                    </div>
                    <div className="text-3xl font-extrabold text-white mt-3 font-mono">
                      {stat.value}
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold block mt-1">
                      {stat.subtitle}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Actions & Recent Logins */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Quick actions panel */}
                <div className="lg:col-span-5 rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md">
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase border-b border-white/5 pb-3 mb-4">
                    Quick Operations
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setActiveTab("users");
                        setShowAddUserModal(true);
                      }}
                      className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-left transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-9 1.5h.008v.008H7.5V12zm.008 3h.008v.008H7.5v-.008zm0 3h.008v.008H7.5v-.008zM12 7.5h.008v.008H12V7.5zm.008 3h.008v.008H12v-.008zm0 3h.008v.008H12v-.008zm0 3h.008v.008H12v-.008z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-slate-200 block">Create Account</span>
                      <span className="text-[9px] text-slate-500 block mt-0.5">Add teacher/student</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("franchises");
                        setShowAddFranchiseModal(true);
                      }}
                      className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-left transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-slate-200 block">Add Franchise</span>
                      <span className="text-[9px] text-slate-500 block mt-0.5">Approve new branch</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("inventory")}
                      className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-left transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-slate-200 block">Check Stock</span>
                      <span className="text-[9px] text-slate-500 block mt-0.5">{lowStockItemsCount} items at alert limit</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("settings")}
                      className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-left transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.68-.68-.86-1.72-.4-2.59M13.66 8.16c.68.68.86 1.72.4 2.59M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-slate-200 block">Access Settings</span>
                      <span className="text-[9px] text-slate-500 block mt-0.5">Toggle signups & alerts</span>
                    </button>
                  </div>
                </div>

                {/* Audit trail / Recent updates log */}
                <div className="lg:col-span-7 rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md">
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase border-b border-white/5 pb-3 mb-4 flex items-center justify-between">
                    <span>Administrative Logs</span>
                    <span className="text-[10px] text-slate-500 tracking-normal font-mono">Real-time Feed</span>
                  </h3>
                  <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                    {[
                      { action: "Registration Restricted", user: "Saideep (Admin)", details: "Public account creation disabled in configurations", time: "10 mins ago", badge: "bg-red-500/10 text-red-400 border-red-500/20" },
                      { action: "Stock Adjusted", user: "Delhi Central", details: "Standard Student Abacus increased by +100 units", time: "1 hour ago", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                      { action: "Account Registered", user: "Saideep (Admin)", details: "Created Franchise profile for Mumbai West Center", time: "2 hours ago", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                      { action: "Workbook Re-order Alert", user: "System", details: "Level 1 Workbooks stock fell below target limit (150)", time: "4 hours ago", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" }
                    ].map((log, idx) => (
                      <div key={idx} className="flex items-start justify-between text-xs py-2.5 border-b border-white/5 last:border-b-0">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-slate-200">{log.action}</span>
                          <span className="text-[10px] text-slate-400 font-light">
                            By {log.user} • {log.details}
                          </span>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1.5">
                          <span className="text-[10px] text-slate-500">{log.time}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${log.badge}`}>
                            Audit
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: USER MANAGEMENT (ADMIN-CONTROLLED ACCOUNT CREATION) */}
          {activeTab === "users" && (
            <div className="space-y-6">
              
              {/* Message Feed Alerts */}
              {userSuccess && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300 shadow-inner flex items-center gap-2">
                  <span className="text-lg">✔</span>
                  <span>{userSuccess}</span>
                </div>
              )}

              {/* Toolbar Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                
                {/* Search Inputs */}
                <div className="relative w-full sm:max-w-xs">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users by name, role, email..."
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>

                {/* Add User Action Trigger Button */}
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Create User Account
                </button>
              </div>

              {/* USERS LIST TABLE */}
              <div className="rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02] text-slate-400 uppercase tracking-wider text-[9px] font-bold">
                        <th className="px-6 py-4">User Details</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">System Role</th>
                        <th className="px-6 py-4">Linked Branch / Center</th>
                        <th className="px-6 py-4">Account Status</th>
                        <th className="px-6 py-4">Created Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => {
                          // Define colors matching the abacus bead theme
                          let roleBadgeColor = "bg-rose-500/10 text-rose-400 border-rose-500/20";
                          if (user.role === "Franchise") roleBadgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
                          else if (user.role === "Teacher") roleBadgeColor = "bg-orange-500/10 text-orange-400 border-orange-500/20";
                          else if (user.role === "Student") roleBadgeColor = "bg-purple-500/10 text-purple-400 border-purple-500/20";

                          return (
                            <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 border border-white/5 text-[10px]">
                                    {user.name.charAt(0)}
                                  </div>
                                  <span className="font-semibold text-slate-200 block text-xs">
                                    {user.name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-mono text-slate-400">{user.email}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${roleBadgeColor}`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-slate-400">{user.location}</td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => toggleUserStatus(user.id)}
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                                    user.status === "Active"
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                                      : "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20"
                                  }`}
                                  title="Click to toggle status"
                                >
                                  {user.status}
                                </button>
                              </td>
                              <td className="px-6 py-4 text-slate-500 font-mono">{user.date}</td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2.5">
                                  <button
                                    onClick={() => {
                                      const newName = prompt("Edit User Name:", user.name);
                                      if (newName) {
                                        setUsers(users.map(u => u.id === user.id ? { ...u, name: newName } : u));
                                      }
                                    }}
                                    className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
                                    title="Edit User"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
                                    title="Delete User"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0M10.5 13.5h3" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="7" className="px-6 py-10 text-center text-slate-500 font-light">
                            No users found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* USER CREATION POPUP MODAL */}
              {showAddUserModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md px-6">
                  <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative animate-scale-in">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                      <h3 className="text-base font-bold text-white">Create New User Account</h3>
                      <button
                        onClick={() => {
                          setShowAddUserModal(false);
                          setUserError("");
                        }}
                        className="text-slate-400 hover:text-white transition-all cursor-pointer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {userError && (
                      <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-[11px] text-red-300 shadow-inner mb-4">
                        {userError}
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleCreateUser} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          placeholder="e.g. John Doe / Delhi West Center"
                          className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                          placeholder="e.g. user@abacus.com"
                          className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            System Role
                          </label>
                          <select
                            value={newUserRole}
                            onChange={(e) => setNewUserRole(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-xs text-slate-300 outline-none focus:border-blue-500"
                          >
                            <option value="Teacher">Teacher</option>
                            <option value="Franchise">Franchise Owner</option>
                            <option value="Student">Student</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Location/Branch
                          </label>
                          <input
                            type="text"
                            value={newUserLocation}
                            onChange={(e) => setNewUserLocation(e.target.value)}
                            placeholder="e.g. Mumbai"
                            className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Account Password *
                        </label>
                        <input
                          type="password"
                          required
                          value={newUserPassword}
                          onChange={(e) => setNewUserPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                        />
                      </div>

                      <div className="pt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddUserModal(false);
                            setUserError("");
                          }}
                          className="flex-1 px-4 py-2.5 text-xs font-semibold rounded-xl border border-white/10 text-slate-400 hover:bg-white/5 active:scale-95 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/10 hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all cursor-pointer"
                        >
                          Add User
                        </button>
                      </div>
                    </form>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: FRANCHISE LIST */}
          {activeTab === "franchises" && (
            <div className="space-y-6">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                <div>
                  <h3 className="text-sm font-bold text-white">Registered Academy Franchises</h3>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5">Manage regional training branch details and approvals.</p>
                </div>
                <button
                  onClick={() => setShowAddFranchiseModal(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-xs font-bold text-white transition-all cursor-pointer"
                >
                  Register Franchise Center
                </button>
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {franchises.map((franchise) => (
                  <div key={franchise.id} className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 shadow-lg backdrop-blur-md hover:bg-white/[0.03] transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm">
                          F{franchise.id}
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                          franchise.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}>
                          {franchise.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white mt-4">{franchise.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 font-light flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {franchise.location}
                      </p>

                      <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">Owner</span>
                          <p className="text-slate-200 mt-0.5 font-bold truncate">{franchise.owner}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">Students</span>
                          <p className="text-slate-200 mt-0.5 font-bold font-mono">{franchise.students} active</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/5 flex gap-2">
                      <button
                        onClick={() => {
                          const amt = parseInt(prompt(`Add students to ${franchise.name}:`, "10"));
                          if (amt && !isNaN(amt)) {
                            setFranchises(franchises.map(f => f.id === franchise.id ? { ...f, students: f.students + amt } : f));
                          }
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-slate-300 font-semibold transition-all active:scale-95"
                      >
                        Add Students
                      </button>
                      <button
                        onClick={() => {
                          setFranchises(franchises.map(f => f.id === franchise.id ? {
                            ...f,
                            status: f.status === "Active" ? "Suspended" : "Active"
                          } : f));
                        }}
                        className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-slate-300 font-semibold transition-all active:scale-95"
                      >
                        Toggle Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* FRANCHISE CREATION MODAL */}
              {showAddFranchiseModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md px-6">
                  <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative animate-scale-in">
                    
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                      <h3 className="text-base font-bold text-white">Add New Academy Center</h3>
                      <button
                        onClick={() => setShowAddFranchiseModal(false)}
                        className="text-slate-400 hover:text-white transition-all cursor-pointer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <form onSubmit={handleAddFranchise} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Franchise/Center Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={franchiseName}
                          onChange={(e) => setFranchiseName(e.target.value)}
                          placeholder="e.g. Pune Central Training Center"
                          className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Owner / Representative Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={franchiseOwner}
                          onChange={(e) => setFranchiseOwner(e.target.value)}
                          placeholder="e.g. Suresh Deshmukh"
                          className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Full Physical Address
                        </label>
                        <input
                          type="text"
                          value={franchiseLocation}
                          onChange={(e) => setFranchiseLocation(e.target.value)}
                          placeholder="e.g. Deccan Gymkhana, Pune"
                          className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-all"
                        />
                      </div>

                      <div className="pt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddFranchiseModal(false)}
                          className="flex-1 px-4 py-2.5 text-xs font-semibold rounded-xl border border-white/10 text-slate-400 hover:bg-white/5 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/10 hover:from-blue-600 hover:to-indigo-700 transition-all cursor-pointer"
                        >
                          Add Franchise
                        </button>
                      </div>
                    </form>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: INVENTORY / MATERIAL MANAGEMENT */}
          {activeTab === "inventory" && (
            <div className="space-y-6">
              
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                <h3 className="text-sm font-bold text-white">Academy Materials Inventory</h3>
                <p className="text-[10px] text-slate-400 font-light mt-0.5">Track student kits, workbooks, bags, and adjust active inventory levels.</p>
              </div>

              {/* Inventory Table */}
              <div className="rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02] text-slate-400 uppercase tracking-wider text-[9px] font-bold">
                        <th className="px-6 py-4">Item Name</th>
                        <th className="px-6 py-4">SKU / Code</th>
                        <th className="px-6 py-4 font-mono text-center">Unit Cost ($)</th>
                        <th className="px-6 py-4 font-mono text-center">Stock Level</th>
                        <th className="px-6 py-4 text-center">Alert Limit</th>
                        <th className="px-6 py-4">Status Alert</th>
                        <th className="px-6 py-4 text-right">Replenish Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {inventory.map((item) => {
                        const isLow = item.stock <= item.minThreshold;
                        return (
                          <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-200">{item.name}</td>
                            <td className="px-6 py-4 font-mono text-slate-400">{item.sku}</td>
                            <td className="px-6 py-4 font-mono text-center text-slate-300">{item.cost}</td>
                            <td className="px-6 py-4 font-mono text-center font-extrabold text-white text-sm">{item.stock}</td>
                            <td className="px-6 py-4 font-mono text-center text-slate-500">{item.minThreshold}</td>
                            <td className="px-6 py-4">
                              {isLow ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-rose-500/25 bg-rose-500/10 text-rose-300 animate-pulse">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                  Critically Low
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-emerald-500/25 bg-emerald-500/10 text-emerald-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  Healthy
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => adjustStock(item.id, -10)}
                                  className="w-7 h-7 rounded bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-slate-300 font-bold active:scale-95 transition-all"
                                  title="Consume 10 units"
                                >
                                  -10
                                </button>
                                <button
                                  onClick={() => adjustStock(item.id, 10)}
                                  className="w-7 h-7 rounded bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-slate-300 font-bold active:scale-95 transition-all"
                                  title="Add 10 units"
                                >
                                  +10
                                </button>
                                <button
                                  onClick={() => adjustStock(item.id, 100)}
                                  className="px-2.5 h-7 rounded bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 flex items-center justify-center text-blue-400 font-extrabold active:scale-95 transition-all"
                                  title="Bulk load 100 units"
                                >
                                  +100 Bulk
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

            </div>
          )}

          {/* TAB 5: REPORTS & PERFORMANCE SUMMARY */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                <h3 className="text-sm font-bold text-white">Academy Activity & Financial Reports</h3>
                <p className="text-[10px] text-slate-400 font-light mt-0.5">Statistical metrics representing monthly center additions and workbook orders.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Registrations Chart */}
                <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                    New Student Registrations (Monthly)
                  </h4>
                  <div className="space-y-4">
                    {[
                      { month: "Jan", count: 120, pct: "40%" },
                      { month: "Feb", count: 155, pct: "51%" },
                      { month: "Mar", count: 210, pct: "70%" },
                      { month: "Apr", count: 280, pct: "93%" },
                      { month: "May", count: 300, pct: "100%" }
                    ].map((bar, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-10 text-xs font-mono font-medium text-slate-400">{bar.month}</span>
                        <div className="flex-1 h-3.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                          <div 
                            style={{ width: bar.pct }}
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                          />
                        </div>
                        <span className="w-12 text-right text-xs font-mono font-bold text-white">{bar.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial overview */}
                <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">
                      Fee Collection & Financial Health
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                        <span className="text-slate-400">Total Franchise Royalties (YTD)</span>
                        <span className="font-bold text-white font-mono">$18,450.00</span>
                      </div>
                      <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                        <span className="text-slate-400">Workbook Material Sales</span>
                        <span className="font-bold text-white font-mono">$12,890.00</span>
                      </div>
                      <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                        <span className="text-slate-400">Pending Center Invoice Dues</span>
                        <span className="font-bold text-amber-400 font-mono">$3,420.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Estimated Monthly Revenue</span>
                      <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-mono mt-0.5">$31,340.00</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                      Audit Approved
                    </span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 6: SYSTEM CONFIGURATION SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                <h3 className="text-sm font-bold text-white">Academy System Settings</h3>
                <p className="text-[10px] text-slate-400 font-light mt-0.5">Configure feature flags, user sign-up capabilities, and alert setups.</p>
              </div>

              {/* Toggles */}
              <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md max-w-xl space-y-6">
                
                {[
                  { key: "allowPublicRegister", title: "Allow Public Account Registration", description: "If enabled, anyone can load the sign-up page and register a profile. Kept turned off as recommended.", type: "danger" },
                  { key: "maintenanceMode", title: "System Maintenance Mode", description: "Blocks access to teachers and franchises, rendering a maintenance placeholder screen.", type: "danger" },
                  { key: "emailAlerts", title: "Email Logs and Alerts", description: "Dispatches logs automatically when inventory levels breach minimum limits.", type: "safe" },
                  { key: "autoApproveFranchise", title: "Auto-Approve Franchise Invoices", description: "Automatically completes registration steps when fee receipt validations pass.", type: "safe" }
                ].map((toggle) => (
                  <div key={toggle.key} className="flex items-start justify-between gap-6 pb-5 border-b border-white/5 last:border-b-0 last:pb-0">
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white">{toggle.title}</h4>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5 leading-relaxed">{toggle.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        // Alert user when trying to turn on public signup to preserve safety recommendations
                        if (toggle.key === "allowPublicRegister" && !settings.allowPublicRegister) {
                          const confirmTurnOn = confirm("WARNING: Re-enabling public registration bypasses the administrative check recommended in the early development phase. Do you want to continue?");
                          if (!confirmTurnOn) return;
                        }
                        
                        setSettings({
                          ...settings,
                          [toggle.key]: !settings[toggle.key]
                        });
                      }}
                      className={`w-11 h-6 rounded-full p-1 transition-colors relative flex-shrink-0 cursor-pointer ${
                        settings[toggle.key]
                          ? toggle.type === "danger" ? "bg-rose-500" : "bg-blue-500"
                          : "bg-slate-800 border border-white/5"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                        settings[toggle.key] ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                ))}

              </div>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}
