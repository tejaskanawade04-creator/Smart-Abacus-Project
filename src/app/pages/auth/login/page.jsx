"use client";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 p-10 shadow-2xl shadow-black/30">
        <h1 className="text-3xl font-bold text-white mb-3">Smart Abacus Login</h1>
        <p className="text-slate-400 mb-6">Enter your Academy credentials to continue.</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2">Email</label>
            <input type="email" placeholder="name@abacus.com" className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-2">Password</label>
            <input type="password" placeholder="••••••••" className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-500 transition">Sign In</button>
        </form>
      </div>
    </div>
  );
}
