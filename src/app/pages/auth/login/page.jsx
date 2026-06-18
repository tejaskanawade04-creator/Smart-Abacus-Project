"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, AlertTriangle, KeyRound } from "lucide-react";

export default function LoginPage() {
  const { login, user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
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
      {/* Decorative Orbs */}
      <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]"></div>
      <div className="absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]"></div>

      {/* Main Glassmorphic Login Card */}
      <div className="w-full max-w-md rounded-2xl bg-slate-950/40 backdrop-blur-md p-8 shadow-2xl relative border border-slate-800 z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 font-bold text-2xl text-white shadow-lg mb-3">
            A
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Abacus Academy</h2>
          <p className="text-sm text-slate-400 mt-1">Class Management System Portal</p>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3.5 text-sm text-rose-400">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@abacus.com"
                className="w-full rounded-xl bg-slate-900/60 border border-slate-800 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <a href="#" className="text-xs font-medium text-blue-400 hover:text-blue-300">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-900/60 border border-slate-800 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || authLoading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Demo Fast Login Assistant */}
        <div className="mt-8 border-t border-slate-800 pt-6">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
            <KeyRound className="h-4 w-4 text-blue-400" />
            <span>Fast Login (Demo Credentials)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Admin", email: "admin@abacus.com" },
              { label: "Franchise", email: "franchise@abacus.com" },
              { label: "Teacher", email: "teacher@abacus.com" },
              { label: "Student", email: "student@abacus.com" }
            ].map((credential) => (
              <button
                key={credential.label}
                type="button"
                onClick={() => fillCredentials(credential.email)}
                className="rounded-lg bg-slate-900/40 border border-slate-800/80 px-2 py-2 text-left text-xs hover:bg-slate-800 hover:border-slate-700 transition-all text-slate-300"
              >
                <span className="font-semibold text-slate-200 block">{credential.label}</span>
                <span className="text-slate-500 text-[10px] truncate block">{credential.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}