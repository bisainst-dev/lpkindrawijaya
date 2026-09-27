"use client";

import React, { useState, useEffect } from 'react';
import { JobOrderItem } from '@/lib/types';
import { 
  Briefcase, 
  Plus, 
  Edit2, 
  Trash2, 
  MapPin, 
  Banknote, 
  Calendar, 
  Users, 
  X, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  Languages 
} from 'lucide-react';

export default function LowonganManagementPage() {
  const [jobs, setJobs] = useState<JobOrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOrderItem | null>(null);

  // Translation states
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateSuccess, setTranslateSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<JobOrderItem>>({
    id: '',
    sector: 'Kaigo (Perawat Lansia)',
    category: 'ssw',
    title: { id: '', ja: '', en: '' },
    prefecture: { id: 'Tokyo', ja: '東京都', en: 'Tokyo' },
    salaryRangeJpy: '¥215.000 - ¥240.000',
    salaryEstimatedIdr: 'Rp 23.000.000 - Rp 26.000.000',
    quota: 15,
    remainingQuota: 5,
    deadline: '2026-11-30',
    housingProvided: true,
    insuranceProvided: true,
    overtimeAvailable: true,
    requirements: { id: ['Lulus JFT A2', 'Usia 19-30 tahun'], ja: ['JFT-Basic A2合格', '19〜30歳'], en: ['Passed JFT A2', 'Age 19-30'] },
    status: 'open',
    featured: true
  });

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/lowongan');
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenModal = (job?: JobOrderItem) => {
    setTranslateSuccess(null);
    if (job) {
      setEditingJob(job);
      setFormData(JSON.parse(JSON.stringify(job)));
    } else {
      setEditingJob(null);
      setFormData({
        id: `job-${Date.now()}`,
        sector: 'Pertanian (Nogyo)',
        category: 'ssw',
        title: { id: '', ja: '', en: '' },
        prefecture: { id: 'Ibaraki', ja: '茨城県', en: 'Ibaraki' },
        salaryRangeJpy: '¥200.000 - ¥225.000',
        salaryEstimatedIdr: 'Rp 22.000.000 - Rp 25.000.000',
        quota: 10,
        remainingQuota: 10,
        deadline: '2026-12-15',
        housingProvided: true,
        insuranceProvided: true,
        overtimeAvailable: true,
        requirements: { 
          id: ['Sehat jasmani dan tidak buta warna', 'Lulus JFT-Basic A2 / JLPT N4', 'Memiliki motivasi kerja tinggi'], 
          ja: ['身体健全・色盲不可', 'JFT-Basic A2またはJLPT N4合格', '高い就労意欲をお持ちの方'], 
          en: ['Physically fit and not color blind', 'Passed JFT-Basic A2 / JLPT N4', 'High working motivation'] 
        },
        status: 'open',
        featured: false
      });
    }
    setIsModalOpen(true);
  };

  // Auto-Translate function: ID -> JA & EN
  const handleAutoTranslate = async () => {
    if (!formData.title?.id?.trim()) {
      alert("Silakan isi minimal 'Judul Lowongan (Bahasa Indonesia)' terlebih dahulu.");
      return;
    }

    try {
      setIsTranslating(true);
      setTranslateSuccess(null);

      const res = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            title: formData.title?.id || '',
            prefecture: formData.prefecture?.id || '',
            requirements: formData.requirements?.id || []
          }
        })
      });

      const data = await res.json();

      if (data.success && data.translations) {
        const { ja, en } = data.translations;

        setFormData(prev => ({
          ...prev,
          title: {
            id: prev.title?.id || '',
            ja: ja.title || prev.title?.ja || '',
            en: en.title || prev.title?.en || ''
          },
          prefecture: {
            id: prev.prefecture?.id || '',
            ja: ja.prefecture || prev.prefecture?.ja || '',
            en: en.prefecture || prev.prefecture?.en || ''
          },
          requirements: {
            id: prev.requirements?.id || [],
            ja: Array.isArray(ja.requirements) ? ja.requirements : (prev.requirements?.ja || []),
            en: Array.isArray(en.requirements) ? en.requirements : (prev.requirements?.en || [])
          }
        }));

        setTranslateSuccess("Berhasil! Judul, prefektur, dan syarat telah diterjemahkan ke Jepang dan Inggris.");
        setTimeout(() => setTranslateSuccess(null), 6000);
      } else {
        alert("Gagal menerjemahkan teks lowongan.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan saat menerjemahkan.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/lowongan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchJobs();
      } else {
        alert("Gagal menyimpan data lowongan.");
      }
    } catch (err) {
      alert("Terjadi kesalahan.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus lowongan kerja ini?")) return;

    try {
      const res = await fetch(`/api/admin/lowongan?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setJobs(prev => prev.filter(j => j.id !== id));
      }
    } catch (err) {
      alert("Gagal menghapus lowongan.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Kelola Lowongan Kerja Jepang (Job Orders)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Daftar job order resmi yang aktif untuk penempatan kerja di berbagai prefektur Jepang
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs flex items-center gap-2 transition self-start sm:self-auto cursor-pointer shadow-md shadow-orange-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Lowongan Baru</span>
        </button>
      </div>

      {/* Grid of Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800">
                  {job.sector}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  job.status === 'open' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : job.status === 'interviewing'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {job.status === 'open' ? 'Buka' : job.status === 'interviewing' ? 'Tahap Interview' : 'Tutup'}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                {job.title.id}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                🇯🇵 {job.title.ja}
              </p>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-slate-700">{job.prefecture.id}</span>
                <span className="text-slate-400 font-mono text-[11px]">({job.prefecture.ja})</span>
              </div>

              {/* Salary */}
              <div className="mt-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="text-sm font-black text-emerald-800 font-mono">
                  {job.salaryRangeJpy} / bln
                </div>
                <div className="text-[11px] font-semibold text-slate-500">
                  ≈ {job.salaryEstimatedIdr}
                </div>
              </div>

              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Sisa Kuota:</span>
                  <span className="font-bold text-slate-900">{job.remainingQuota} dari {job.quota} orang</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Batas Daftar:</span>
                  <span className="font-semibold text-slate-700">{job.deadline}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleOpenModal(job)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(job.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Modal Add/Edit Job */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                    {editingJob ? 'Edit Lowongan Kerja Jepang' : 'Tambah Lowongan Baru'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Informasi kontrak, penempatan prefektur Jepang, dan gaji peserta
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Auto-Translate Helper Banner */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-50/70 to-orange-50 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-xs">Fitur Auto-Translate 3 Bahasa</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200/80 text-amber-900 font-mono">ID ➔ JA & EN</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                    Ketik judul lowongan dan persyaratan dalam Bahasa Indonesia, lalu klik tombol ini untuk mengisi terjemahan Jepang & Inggris otomatis.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAutoTranslate}
                disabled={isTranslating || !formData.title?.id?.trim()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Menerjemahkan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>✨ Terjemahkan Otomatis</span>
                  </>
                )}
              </button>
            </div>

            {/* Toast feedback */}
            {translateSuccess && (
              <div className="mb-4 px-3.5 py-2.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-2xl border border-emerald-200 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{translateSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5 text-xs sm:text-sm">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sektor / Bidang Kerja</label>
                  <input
                    type="text"
                    required
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    placeholder="Contoh: Kaigo / Pertanian / Pengolahan Makanan"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Lowongan</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="open">Buka (Menerima Pendaftar)</option>
                    <option value="interviewing">Tahap Seleksi Wawancara</option>
                    <option value="closed">Tutup (Kuota Penuh)</option>
                  </select>
                </div>
              </div>

              {/* Multilingual Title */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800">Judul Lowongan Kerja</span>
                  <span className="text-[11px] text-slate-400">3 Bahasa</span>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇮🇩 Indonesia (Utama):</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Perawat Lansia Kaigo di Panti Jompo Tokyo"
                    value={formData.title?.id || ''}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title!, id: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇯🇵 日本語 (Bahasa Jepang):</label>
                  <input
                    type="text"
                    placeholder="東京都・介護施設職員（特定技能）"
                    value={formData.title?.ja || ''}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title!, ja: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇬🇧 English (Bahasa Inggris):</label>
                  <input
                    type="text"
                    placeholder="Elderly Caregiver Staff at Nursing Home in Tokyo"
                    value={formData.title?.en || ''}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title!, en: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium"
                  />
                </div>
              </div>

              {/* Multilingual Prefecture */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800">Prefektur / Wilayah Penempatan di Jepang</span>
                  <span className="text-[11px] text-slate-400">3 Bahasa</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇮🇩 Indonesia:</label>
                    <input
                      type="text"
                      required
                      placeholder="Tokyo & Kanagawa"
                      value={formData.prefecture?.id || ''}
                      onChange={(e) => setFormData({ ...formData, prefecture: { ...formData.prefecture!, id: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇯🇵 日本語:</label>
                    <input
                      type="text"
                      placeholder="東京都・神奈川県"
                      value={formData.prefecture?.ja || ''}
                      onChange={(e) => setFormData({ ...formData, prefecture: { ...formData.prefecture!, ja: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇬🇧 English:</label>
                    <input
                      type="text"
                      placeholder="Tokyo & Kanagawa Prefecture"
                      value={formData.prefecture?.en || ''}
                      onChange={(e) => setFormData({ ...formData, prefecture: { ...formData.prefecture!, en: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rentang Gaji (Yen ¥)</label>
                  <input
                    type="text"
                    required
                    value={formData.salaryRangeJpy}
                    onChange={(e) => setFormData({ ...formData, salaryRangeJpy: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold"
                    placeholder="¥215.000 - ¥245.000"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimasi Rupiah</label>
                  <input
                    type="text"
                    value={formData.salaryEstimatedIdr}
                    onChange={(e) => setFormData({ ...formData, salaryEstimatedIdr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    placeholder="Rp 23.000.000 - Rp 26.000.000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Kuota (Orang)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quota}
                    onChange={(e) => setFormData({ ...formData, quota: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sisa Kuota Belum Terisi</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.remainingQuota}
                    onChange={(e) => setFormData({ ...formData, remainingQuota: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batas Pendaftaran</label>
                  <input
                    type="date"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              {/* Requirements in 3 languages */}
              <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Kualifikasi / Persyaratan Kerja (1 baris per poin)</span>
                  <span className="text-[11px] text-slate-400">Pisahkan dengan Enter</span>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇮🇩 Indonesia (Utama):</label>
                  <textarea
                    rows={2}
                    placeholder="Sehat jasmani dan tidak buta warna&#10;Lulus JFT-Basic A2 atau JLPT N4&#10;Usia 18 - 30 tahun"
                    value={(formData.requirements?.id || []).join('\n')}
                    onChange={(e) => {
                      const lines = e.target.value.split('\n');
                      setFormData({ 
                        ...formData, 
                        requirements: { 
                          id: lines, 
                          ja: formData.requirements?.ja || [], 
                          en: formData.requirements?.en || [] 
                        } 
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇯🇵 日本語:</label>
                    <textarea
                      rows={2}
                      placeholder="身体健全・色盲不可&#10;JFT-Basic A2合格"
                      value={(formData.requirements?.ja || []).join('\n')}
                      onChange={(e) => {
                        const lines = e.target.value.split('\n');
                        setFormData({ 
                          ...formData, 
                          requirements: { 
                            id: formData.requirements?.id || [], 
                            ja: lines, 
                            en: formData.requirements?.en || [] 
                          } 
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇬🇧 English:</label>
                    <textarea
                      rows={2}
                      placeholder="Physically fit and not color blind&#10;Passed JFT-Basic A2"
                      value={(formData.requirements?.en || []).join('\n')}
                      onChange={(e) => {
                        const lines = e.target.value.split('\n');
                        setFormData({ 
                          ...formData, 
                          requirements: { 
                            id: formData.requirements?.id || [], 
                            ja: formData.requirements?.ja || [], 
                            en: lines 
                          } 
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold hover:from-emerald-700 hover:to-teal-800 transition shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  Simpan Lowongan
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
