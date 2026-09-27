"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Image as ImageIcon, 
  Camera,
  Quote, 
  Building2, 
  Settings, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  ShieldAlert
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, don't show admin chrome
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Ringkasan Konten', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Program Pelatihan', href: '/admin/programs', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Lowongan Kerja Jepang', href: '/admin/lowongan', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Galeri & Berita', href: '/admin/galeri', icon: <Camera className="w-4 h-4" /> },
    { label: 'Testimoni Alumni', href: '/admin/testimoni', icon: <Quote className="w-4 h-4" /> },
    { label: 'Pendaftar Online', href: '/admin/pendaftar', icon: <Users className="w-4 h-4" /> },
    { label: 'Inkuiri Mitra Jepang', href: '/admin/mitra', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Logo & Profil Website', href: '/admin/pengaturan', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 text-slate-300 border-r border-slate-800 p-5 justify-between">
        <div className="space-y-6">
          {/* Admin Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black flex items-center justify-center text-lg shadow-md shadow-emerald-600/30">
              IW
            </div>
            <div>
              <h2 className="font-bold text-sm text-white leading-tight">
                CMS LPK INDRA WIJAYA
              </h2>
              <p className="text-[11px] text-slate-500">Panel Kelola Indramayu</p>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1 text-xs font-semibold">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action */}
        <div className="pt-6 border-t border-slate-900 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition"
          >
            <span>Lihat Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Keluar</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden bg-slate-950 text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black flex items-center justify-center text-sm">
            IW
          </div>
          <span className="font-bold text-sm">CMS LPK Indra Wijaya</span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="md:hidden bg-slate-950 text-slate-300 p-4 border-b border-slate-800 space-y-3">
          <nav className="space-y-1 text-xs font-semibold">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${
                  pathname === item.href ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-900 flex justify-between items-center text-xs">
            <Link href="/" target="_blank" className="text-slate-400">
              Lihat Website ↗
            </Link>
            <button onClick={handleLogout} className="text-red-400 font-bold">
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="hidden md:flex bg-white border-b border-slate-200 px-8 py-4 items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Panel Administrasi</span>
            <span>/</span>
            <span className="text-slate-900 capitalize">
              {pathname.replace('/admin/', '').replace('/admin', 'Ringkasan')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition flex items-center gap-1.5"
            >
              <span>Lihat Website Utama</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Admin Indramayu (Aktif)</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 flex-1">
          {children}
        </main>
      </div>

    </div>
  );
}
