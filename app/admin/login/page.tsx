"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login gagal. Periksa username & password.');
      }

      router.push('/admin');
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-xl mx-auto mb-3 shadow-lg shadow-red-600/30">
            IW
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            CMS Portal Admin
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            LPK & Sending Organization Indra Wijaya (Indramayu)
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Username Admin
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard CMS'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>


        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website Publik</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
