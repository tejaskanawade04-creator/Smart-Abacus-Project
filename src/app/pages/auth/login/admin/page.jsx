"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginAdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/admin");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="rounded-3xl bg-slate-900 p-10 shadow-2xl shadow-black/30">
        <h1 className="text-2xl font-semibold mb-2">Redirecting to Admin Dashboard...</h1>
        <p className="text-slate-400">If you are not redirected automatically, <a href="/dashboard/admin" className="text-blue-400 underline">click here</a>.</p>
      </div>
    </div>
  );
}
