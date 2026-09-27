import React from 'react';
import Link from 'next/link';
import { getDatabase } from '@/lib/store';
import { 
  GraduationCap, 
  Briefcase, 
  Settings, 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  ArrowRight, 
  ExternalLink,
  Plus,
  Eye
} from 'lucide-react';

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const db = getDatabase();

  const totalPrograms = db.programs.length;
  const activePrograms = db.programs.filter(p => p.active).length;
  const totalJobs = db.jobOrders.length;
  const openJobs = db.jobOrders.filter(j => j.status === 'open').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Content Management System (CMS)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Pusat Pengelolaan Konten Website LPK Indra Wijaya
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Kelola seluruh konten profil perusahaan, katalog program pelatihan kerja ke Jepang, informasi lowongan kerja (*Job Orders*), legalitas izin Kemenaker, serta kontak resmi di Indramayu.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-2"
          >
            <Eye className="w-4 h-4 text-slate-400" />
            <span>Lihat Website Publik</span>
          </Link>
          <Link
            href="/admin/pengaturan"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-md shadow-emerald-600/20"
          >
            <Settings className="w-4 h-4" />
            <span>Edit Profil & Legalitas</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Programs */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Program Pelatihan
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {activePrograms}
            </div>
            <span className="text-[11px] font-bold text-emerald-600 mt-1 block">
              ● {totalPrograms} total terdaftar
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Lowongan */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Lowongan Aktif Jepang
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {openJobs}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Dari {totalJobs} job order di web
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Legalitas SO */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Izin SO Kemenaker RI
            </span>
            <div className="text-sm font-black text-slate-900 font-mono mt-2 truncate max-w-[150px]">
              {db.company.soLicenseNumber}
            </div>
            <span className="text-[11px] font-bold text-emerald-600 mt-1 block">
              ✓ Terverifikasi Resmi
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Hotline WA */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              WhatsApp Resmi LPK
            </span>
            <div className="text-sm font-black text-slate-900 font-mono mt-2">
              {db.company.whatsapp}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Lohbener, Indramayu
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <PhoneCall className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link
          href="/admin/programs"
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-200 transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition">
              Kelola Program Pelatihan
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Tambah, edit kurikulum, ubah teks multi-bahasa (ID, JA, EN) untuk program SSW Kaigo, Pertanian, Makanan, Magang, dan Kelas Bahasa.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>Buka Pengaturan Program</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>

        <Link
          href="/admin/lowongan"
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-blue-200 transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition">
              Kelola Lowongan Kerja Jepang
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Update daftar job orders Jepang, rentang gaji Yen (¥), lokasi prefektur, kuota pendaftar, dan status Buka/Tutup lowongan.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
            <span>Buka Pengaturan Lowongan</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>

        <Link
          href="/admin/pengaturan"
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-200 transition group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-600 transition">
              Profil, Legalitas & Kontak LPK
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Edit nomor izin Kemenaker/Disnaker, alamat Lohbener Indramayu, nomor WhatsApp admin, email resmi, dan ganti password akun CMS.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span>Buka Pengaturan Profil</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>

      </div>

      {/* Content Preview Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Active Programs Preview */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Program Pelatihan di Website
              </h3>
              <p className="text-xs text-slate-500">Tampil di halaman beranda</p>
            </div>
            <Link
              href="/admin/programs"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Kelola</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {db.programs.map((prog) => (
              <div
                key={prog.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    {prog.title.id}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Target: {prog.targetLevel} • {prog.category.toUpperCase()}
                  </p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  prog.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {prog.active ? 'Tampil' : 'Sembunyi'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Jobs Preview */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Lowongan Kerja Jepang Terbuka
              </h3>
              <p className="text-xs text-slate-500">Job order resmi di website</p>
            </div>
            <Link
              href="/admin/lowongan"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Kelola</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {db.jobOrders.map((job) => (
              <div
                key={job.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    {job.title.id}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {job.prefecture.id} • {job.salaryRangeJpy}/bln
                  </p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  job.status === 'open' 
                    ? 'bg-emerald-100 text-emerald-800'
                    : job.status === 'interviewing'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {job.status === 'open' ? 'Buka' : job.status === 'interviewing' ? 'Interview' : 'Tutup'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
