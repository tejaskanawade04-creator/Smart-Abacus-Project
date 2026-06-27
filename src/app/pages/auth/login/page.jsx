"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, AlertTriangle, KeyRound, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const { login, user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      redirectByRole(user.role);
    }
  }, [user]);

  const redirectByRole = (role) => {
    if (!role) return;
    switch (role.toUpperCase()) {
      case "ADMIN":
        router.push("/dashboard/admin");
        break;
      case "FRANCHISE":
        router.push("/dashboard/franchise");
        break;
      case "TEACHER":
        router.push("/dashboard/teacher");
        break;
      case "STUDENT":
        router.push("/dashboard/student");
        break;
      default:
        setError("Unauthorized role type dynamic mapping failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const profile = await login(email, password);
      redirectByRole(profile.role);
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (roleEmail) => {
    setEmail(roleEmail);
    setPassword("password");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#eceffd] px-4 overflow-hidden font-sans antialiased">
   
      {/* Background Radial Ambient Gradients like Teacher Console */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] rounded-full bg-blue-200/60 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-200/50 blur-[130px] pointer-events-none z-0"></div>

      {/* Main Glassmorphism Container Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl p-8 shadow-xl shadow-indigo-100/40 relative z-10">
        
        {/* Header Logo & Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <h2 className="text-xl font-black tracking-wider text-slate-900 uppercase">
              SMART <span className="text-indigo-600">ABACUS</span>
            </h2>
          </div>
          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Class Management System</p>
        </div>

        {/* Error Alert Display */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3.5 text-xs text-rose-600 animate-fadeIn font-medium">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Login Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
         
          {/* Email Field */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@smartabacus.com"
                className="w-full bg-white/80 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-[10px] font-bold text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/80 border border-slate-200 rounded-xl py-2.5 pl-11 pr-11 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
            
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading || authLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3.5 text-xs font-bold text-white shadow-md shadow-indigo-200 active:scale-[0.99] transition-all disabled:opacity-50 mt-6 cursor-pointer"
          >
            <span>{loading ? "Authenticating Session..." : "Sign In to Dashboard"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Quick Credentials Matrix */}
        <div className="mt-8 border-t border-slate-200/60 pt-5">
          <div className="flex items-center gap-2 mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <KeyRound className="h-3.5 w-3.5 text-indigo-500" />
            <span>Quick Console Hub Matrix</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "System Admin", email: "admin@abacus.com" },
              { label: "Franchise Desk", email: "franchise@abacus.com" },
              { label: "Teacher Portal", email: "teacher@abacus.com" },
              { label: "Student Module", email: "student@abacus.com" }
            ].map((credential) => (
              <button
                key={credential.label}
                type="button"
                onClick={() => fillCredentials(credential.email)}
                className="rounded-xl bg-white/60 border border-slate-200/80 px-3 py-2.5 text-left text-xs hover:bg-white hover:border-indigo-400/50 transition-all text-slate-600 group cursor-pointer"
              >
                <span className="font-bold text-slate-800 block group-hover:text-indigo-600 transition-colors">{credential.label}</span>
                <span className="text-slate-400 text-[9px] font-medium truncate block mt-0.5">{credential.email}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}