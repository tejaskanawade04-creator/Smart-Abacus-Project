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
    <div className="relative flex min-h-screen items-center justify-center bg-[#070b13] px-4 overflow-hidden">
   
      <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]"></div>
      <div className="absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]"></div>

    
      <div className="w-full max-w-md rounded-2xl bg-slate-950/40 backdrop-blur-md p-8 shadow-2xl relative border border-slate-800/60 z-10">
        
       
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 font-black text-xl text-white shadow-lg shadow-blue-500/20 mb-3">
            S
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white">
            SMART <span className="text-blue-500">ABACUS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Class Management System</p>
        </div>

      
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3.5 text-sm text-rose-400 animate-fadeIn">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="font-medium">{error}</p>
          </div>
        )}

       
        <form onSubmit={handleSubmit} className="space-y-5">
         
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2 pl-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@smartabacus.com"
                className="w-full rounded-xl bg-slate-900/60 border border-slate-800/80 py-3 pl-11 pr-4 text-xs text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all font-medium"
              />
            </div>
          </div>

         
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <label className="block text-[11px] font-mono uppercase tracking-widest text-slate-400">
                Password
              </label>
              <a href="#" className="text-[11px] font-medium text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-900/60 border border-slate-800/80 py-3 pl-11 pr-11 text-xs text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all font-mono"
              />
            
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          
          <button
            type="submit"
            disabled={loading || authLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 border border-blue-400/20"
          >
            <span>{loading ? "Signing in Security Portal..." : "Sign In to Dashboard"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Fast Demo Login Section */}
        <div className="mt-8 border-t border-slate-900 pt-6">
          <div className="flex items-center gap-2 mb-3 text-[11px] font-mono uppercase tracking-widest text-slate-400">
            <KeyRound className="h-4 w-4 text-blue-400" />
            <span>Quick Admin/Staff Credentials</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "System Admin", email: "admin@abacus.com" },
              { label: "Franchise Desk", email: "franchise@abacus.com" },
              { label: "Teacher Portal", email: "teacher@abacus.com" },
              { label: "Student / Parent", email: "student@abacus.com" }
            ].map((credential) => (
              <button
                key={credential.label}
                type="button"
                onClick={() => fillCredentials(credential.email)}
                className="rounded-xl bg-slate-900/40 border border-slate-800/60 px-3 py-2.5 text-left text-xs hover:bg-slate-900 hover:border-blue-500/30 transition-all text-slate-300 group"
              >
                <span className="font-bold text-slate-200 block group-hover:text-blue-400 transition-colors">{credential.label}</span>
                <span className="text-slate-500 text-[10px] truncate block mt-0.5">{credential.email}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}