"use client";

import React, { useState, useEffect } from 'react';
import { ApplicantItem } from '@/lib/types';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  MessageCircle, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  UserX,
  Phone,
  GraduationCap
} from 'lucide-react';

export default function PendaftarManagementPage() {
  const [applicants, setApplicants] = useState<ApplicantItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantItem | null>(null);

  const fetchApplicants = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/pendaftar');
      const data = await res.json();
      setApplicants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ApplicantItem['status']) => {
    try {
      const res = await fetch('/api/pendaftar', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (res.ok) {
        setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
        if (selectedApplicant?.id === id) {
          setSelectedApplicant(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      alert("Gagal memperbarui status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data pendaftar ini?")) return;

    try {
      const res = await fetch(`/api/pendaftar?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setApplicants(prev => prev.filter(a => a.id !== id));
        if (selectedApplicant?.id === id) setSelectedApplicant(null);
      }
    } catch (err) {
      alert("Gagal menghapus data.");
    }
  };

  const exportToCSV = () => {
    const headers = ["ID", "Nama Lengkap", "Jenis Kelamin", "Tanggal Lahir", "Usia", "No WhatsApp", "Email", "Kecamatan", "Pendidikan", "Tinggi (cm)", "Berat (kg)", "Pilihan Program", "Tingkat Bahasa", "Status", "Tanggal Daftar", "Catatan"];
    const rows = applicants.map(a => [
      a.id,
      `"${a.fullName}"`,
      a.gender,
      a.birthDate,
      a.age,
      `"${a.phoneWhatsapp}"`,
      `"${a.email || ''}"`,
      `"${a.originDistrict}, ${a.originRegency}"`,
      `"${a.lastEducation}"`,
      a.heightCm,
      a.weightKg,
      a.interestedProgram,
      `"${a.japaneseLevel}"`,
      a.status,
      a.createdAt,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pendaftar_lpk_indra_wijaya_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phoneWhatsapp.includes(searchTerm) ||
      app.originDistrict.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && app.status === statusFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Data Pendaftar Calon Siswa (Leads)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Kelola data pendaftaran online calon peserta magang dan Tokutei Ginou (SSW) ke Jepang
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Excel/CSV ({applicants.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari nama siswa, nomor HP, atau kecamatan di Indramayu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500 text-slate-700 font-medium"
          >
            <option value="all">Semua Status ({applicants.length})</option>
            <option value="baru">Baru ({applicants.filter(a => a.status === 'baru').length})</option>
            <option value="terjadwal_seleksi">Terjadwal Seleksi</option>
            <option value="sedang_pelatihan">Sedang Pelatihan</option>
            <option value="lolos_wawancara">Lolos Wawancara</option>
            <option value="selesai">Selesai / Terbang</option>
            <option value="ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-xs text-slate-500">
            Memuat data pendaftar...
          </div>
        ) : filteredApplicants.length === 0 ? (
          <div className="py-20 text-center text-xs text-slate-500 space-y-2">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <p>Tidak ada pendaftar yang cocok dengan pencarian.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 font-bold">Nama & Kontak</th>
                  <th className="py-3 px-4 font-bold">Asal & Usia</th>
                  <th className="py-3 px-4 font-bold">Pendidikan & Fisik</th>
                  <th className="py-3 px-4 font-bold">Program Minat</th>
                  <th className="py-3 px-4 font-bold">Tingkat Bahasa</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition">
                    
                    {/* Name & Phone */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900 text-sm">
                        {app.fullName}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>{app.phoneWhatsapp}</span>
                      </div>
                    </td>

                    {/* Origin & Age */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="font-semibold text-slate-800">
                        {app.originDistrict}, {app.originRegency}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {app.age} tahun ({app.gender})
                      </div>
                    </td>

                    {/* Education & Physical */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="font-medium text-slate-800">
                        {app.lastEducation}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {app.heightCm} cm / {app.weightKg} kg
                      </div>
                    </td>

                    {/* Program */}
                    <td className="py-3.5 px-4 text-slate-700 font-bold">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px]">
                        {app.interestedProgram.replace('prog-', '').toUpperCase()}
                      </span>
                    </td>

                    {/* Japanese */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="text-[11px] font-medium">
                        {app.japaneseLevel}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-hidden cursor-pointer ${
                          app.status === 'baru'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : app.status === 'terjadwal_seleksi'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : app.status === 'sedang_pelatihan'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : app.status === 'lolos_wawancara'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : app.status === 'selesai'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <option value="baru">Baru</option>
                        <option value="terjadwal_seleksi">Terjadwal Seleksi</option>
                        <option value="sedang_pelatihan">Sedang Pelatihan</option>
                        <option value="lolos_wawancara">Lolos Wawancara</option>
                        <option value="selesai">Selesai / Terbang</option>
                        <option value="ditolak">Ditolak</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${app.phoneWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo ${app.fullName}, kami dari LPK Indra Wijaya Lohbener Indramayu mengenai pendaftaran Anda ke Jepang...`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
                          title="Hubungi via WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => handleDelete(app.id)}
                          className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
