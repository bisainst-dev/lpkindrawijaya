"use client";

import React, { useState, useEffect } from 'react';
import { ProgramItem } from '@/lib/types';
import { 
  GraduationCap, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Target, 
  Sparkles, 
  Loader2, 
  Languages, 
  ArrowLeft,
  Save,
  ShieldCheck,
  Award,
  Layers
} from 'lucide-react';

export default function ProgramsManagementPage() {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Page view mode: 'list' (daftar program) or 'form' (halaman edit / tambah)
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [editingProgram, setEditingProgram] = useState<ProgramItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Translation state
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateSuccess, setTranslateSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<ProgramItem>>({
    id: '',
    slug: '',
    category: 'ssw',
    title: { id: '', ja: '', en: '' },
    duration: { id: '', ja: '', en: '' },
    targetLevel: '',
    description: { id: '', ja: '', en: '' },
    highlights: { id: [''], ja: [''], en: [''] },
    requirements: { id: [''], ja: [''], en: [''] },
    icon: 'GraduationCap',
    active: true,
    featured: true
  });

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/programs');
      const data = await res.json();
      setPrograms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleOpenForm = (program?: ProgramItem) => {
    setTranslateSuccess(null);
    if (program) {
      setEditingProgram(program);
      setFormData(JSON.parse(JSON.stringify(program)));
    } else {
      setEditingProgram(null);
      setFormData({
        id: `prog-${Date.now()}`,
        slug: '',
        category: 'ssw',
        title: { id: '', ja: '', en: '' },
        duration: { id: '3 - 5 Bulan di Asrama Indramayu', ja: 'インドラマユ寮で3〜5ヶ月', en: '3 - 5 Months at Indramayu Dormitory' },
        targetLevel: 'JFT-Basic A2 / JLPT N4',
        description: { id: '', ja: '', en: '' },
        highlights: { 
          id: ['Simulasi praktik kerja standar Jepang', 'Pembinaan fisik mental disiplin (FMD)', 'Gaji resmi standar UMR Jepang'], 
          ja: ['日本の労働基準シミュレーション', '心身規律訓練（FMD）', '日本の法定賃金基準'], 
          en: ['Japan standard practice simulation', 'Physical & mental discipline training', 'Standard Japanese statutory wage'] 
        },
        requirements: { 
          id: ['Usia 18 - 30 tahun', 'Lulusan SMA/SMK atau sederajat', 'Sehat jasmani dan tidak bertato'], 
          ja: ['18歳〜30歳', '高校・専門学校卒業以上', '健康状態良好・タトゥー不可'], 
          en: ['Age 18 - 30 years', 'High School graduate or equivalent', 'Physically fit and no tattoos'] 
        },
        icon: 'GraduationCap',
        active: true,
        featured: false
      });
    }
    setViewMode('form');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setEditingProgram(null);
    setTranslateSuccess(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Auto-Translate function: ID -> JA & EN
  const handleAutoTranslate = async () => {
    if (!formData.title?.id?.trim()) {
      alert("Silakan ketik minimal 'Nama Program (Bahasa Indonesia)' terlebih dahulu.");
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
            duration: formData.duration?.id || '',
            description: formData.description?.id || '',
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
          duration: {
            id: prev.duration?.id || '',
            ja: ja.duration || prev.duration?.ja || '',
            en: en.duration || prev.duration?.en || ''
          },
          description: {
            id: prev.description?.id || '',
            ja: ja.description || prev.description?.ja || '',
            en: en.description || prev.description?.en || ''
          },
          requirements: {
            id: prev.requirements?.id || [],
            ja: Array.isArray(ja.requirements) ? ja.requirements : (prev.requirements?.ja || []),
            en: Array.isArray(en.requirements) ? en.requirements : (prev.requirements?.en || [])
          }
        }));

        setTranslateSuccess("Berhasil! Teks Bahasa Jepang dan Inggris telah terisi otomatis.");
        setTimeout(() => setTranslateSuccess(null), 6000);
      } else {
        alert("Gagal menerjemahkan teks. Silakan coba kembali.");
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
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setViewMode('list');
        setEditingProgram(null);
        fetchPrograms();
      } else {
        alert("Gagal menyimpan program.");
      }
    } catch (err) {
      alert("Terjadi kesalahan.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus program ini?")) return;

    try {
      const res = await fetch(`/api/admin/programs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPrograms(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      alert("Gagal menghapus program.");
    }
  };

  // ==========================================
  // VIEW MODE: FORM (HALAMAN PENUH, BUKAN POPUP)
  // ==========================================
  if (viewMode === 'form') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-16">
        
        {/* Top Navigation & Action Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Daftar Program</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {editingProgram ? `Edit Program: ${formData.title?.id || 'Pelatihan'}` : 'Tambah Program Pelatihan Baru'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  {editingProgram 
                    ? 'Perbarui kurikulum, target kelulusan bahasa, durasi, dan persyaratan program' 
                    : 'Lengkapi formulir di bawah ini untuk mempublikasikan program pelatihan baru'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={handleBackToList}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              form="program-form"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Program'}</span>
            </button>
          </div>
        </div>

        {/* Auto-Translate Helper Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-orange-500/10 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm">Fitur Auto-Translate 3 Bahasa</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-mono">
                  ID ➔ JA & EN
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mt-1 max-w-2xl">
                Ketik nama, durasi, deskripsi, dan syarat dalam <strong>Bahasa Indonesia</strong>, lalu klik tombol ini. Sistem akan otomatis mengisi kolom terjemahan Bahasa Jepang & Inggris.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAutoTranslate}
            disabled={isTranslating || !formData.title?.id?.trim()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/25 transition shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed self-start sm:self-auto"
          >
            {isTranslating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menerjemahkan ke Jepang & Inggris...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>✨ Terjemahkan Otomatis</span>
              </>
            )}
          </button>
        </div>

        {/* Toast feedback */}
        {translateSuccess && (
          <div className="px-4 py-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-2xl border border-emerald-200 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{translateSuccess}</span>
          </div>
        )}

        {/* Form Body */}
        <form id="program-form" onSubmit={handleSave} className="space-y-6">
          
          {/* Card 1: Pengaturan Dasar & Status */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Layers className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base font-extrabold text-slate-900">
                Kategori Program & Target Kelulusan
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs sm:text-sm">Kategori Program</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold"
                >
                  <option value="ssw">Tokutei Ginou (SSW)</option>
                  <option value="intern">Pemagangan (Ginou Jisshuusei)</option>
                  <option value="language">Kelas Bahasa Jepang & FMD</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs sm:text-sm">Target Kelulusan Ujian</label>
                <input
                  type="text"
                  value={formData.targetLevel}
                  onChange={(e) => setFormData({ ...formData, targetLevel: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium"
                  placeholder="Contoh: JFT-Basic A2 / JLPT N4"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs sm:text-sm">Status Publikasi</label>
                <select
                  value={formData.active ? 'active' : 'inactive'}
                  onChange={(e) => setFormData({ ...formData, active: e.target.value === 'active' })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold"
                >
                  <option value="active">● Aktif (Tampil di Website)</option>
                  <option value="inactive">○ Non-Aktif (Disembunyikan)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: Nama Program (3 Bahasa) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-extrabold text-slate-900">
                  Nama Program Pelatihan
                </h2>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">3 Bahasa</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                🇮🇩 Bahasa Indonesia <span className="text-red-500">* (Wajib diisi sebagai sumber terjemahan)</span>:
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Tokutei Ginou (SSW) Caregiver / Perawat Lansia"
                value={formData.title?.id || ''}
                onChange={(e) => setFormData({ ...formData, title: { ...formData.title!, id: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  🇯🇵 日本語 (Bahasa Jepang):
                </label>
                <input
                  type="text"
                  placeholder="特定技能1号・介護職コース"
                  value={formData.title?.ja || ''}
                  onChange={(e) => setFormData({ ...formData, title: { ...formData.title!, ja: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  🇬🇧 English (Bahasa Inggris):
                </label>
                <input
                  type="text"
                  placeholder="Specified Skilled Worker Caregiver Program"
                  value={formData.title?.en || ''}
                  onChange={(e) => setFormData({ ...formData, title: { ...formData.title!, en: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Durasi & Lokasi Pelatihan (3 Bahasa) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-extrabold text-slate-900">
                  Durasi & Lokasi Pelatihan
                </h2>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">3 Bahasa</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">🇮🇩 Indonesia:</label>
                <input
                  type="text"
                  placeholder="Contoh: 4 - 6 Bulan di Asrama"
                  value={formData.duration?.id || ''}
                  onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration!, id: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">🇯🇵 日本語:</label>
                <input
                  type="text"
                  placeholder="寮で4〜6ヶ月"
                  value={formData.duration?.ja || ''}
                  onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration!, ja: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">🇬🇧 English:</label>
                <input
                  type="text"
                  placeholder="4 - 6 Months Dormitory"
                  value={formData.duration?.en || ''}
                  onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration!, en: e.target.value } })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Deskripsi Lengkap Program (3 Bahasa) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                <h2 className="text-base font-extrabold text-slate-900">
                  Deskripsi Lengkap Program
                </h2>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">3 Bahasa</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">🇮🇩 Indonesia (Utama):</label>
              <textarea
                rows={3}
                placeholder="Pelatihan intensif bahasa Jepang dan keterampilan teknis keperawatan lansia untuk penempatan kerja di Jepang..."
                value={formData.description?.id || ''}
                onChange={(e) => setFormData({ ...formData, description: { ...formData.description!, id: e.target.value } })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">🇯🇵 日本語:</label>
                <textarea
                  rows={3}
                  placeholder="日本語と介護技術の集中研修..."
                  value={formData.description?.ja || ''}
                  onChange={(e) => setFormData({ ...formData, description: { ...formData.description!, ja: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">🇬🇧 English:</label>
                <textarea
                  rows={3}
                  placeholder="Intensive Japanese language and caregiving technical skills training..."
                  value={formData.description?.en || ''}
                  onChange={(e) => setFormData({ ...formData, description: { ...formData.description!, en: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Card 5: Persyaratan Peserta Pelatihan (3 Bahasa) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h2 className="text-base font-extrabold text-slate-900">
                  Persyaratan Peserta Pelatihan
                </h2>
              </div>
              <span className="text-[11px] font-bold text-slate-400">1 baris per poin (Enter)</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">🇮🇩 Indonesia (Utama):</label>
              <textarea
                rows={3}
                placeholder="Usia 18 - 30 tahun&#10;Lulusan SMA/SMK atau sederajat&#10;Sehat jasmani dan tidak bertato"
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
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-mono text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">🇯🇵 日本語:</label>
                <textarea
                  rows={3}
                  placeholder="18歳〜30歳&#10;高校・専門学校卒以上&#10;健康状態良好"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-mono text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">🇬🇧 English:</label>
                <textarea
                  rows={3}
                  placeholder="Age 18 - 30 years&#10;High School graduate or equivalent&#10;Physically fit"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-mono text-xs leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Bottom Sticky Action Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md flex items-center justify-between">
            <button
              type="button"
              onClick={handleBackToList}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              ← Batal & Kembali
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan Program...' : 'Simpan Seluruh Perubahan'}</span>
            </button>
          </div>

        </form>

      </div>
    );
  }

  // ==========================================
  // VIEW MODE: LIST (DAFTAR PROGRAM PELATIHAN)
  // ==========================================
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Kelola Program Pelatihan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Daftar program Tokutei Ginou (SSW), Pemagangan (Ginou Jisshuusei), dan Kelas Bahasa Jepang
          </p>
        </div>

        <button
          onClick={() => handleOpenForm()}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs flex items-center gap-2 transition self-start sm:self-auto cursor-pointer shadow-lg shadow-orange-500/25 hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Program Baru</span>
        </button>
      </div>

      {/* Grid of Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-slate-100 text-slate-700">
                  {prog.category.toUpperCase()}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  prog.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}>
                  {prog.active ? '● Aktif' : '○ Non-Aktif'}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                {prog.title.id}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                🇯🇵 {prog.title.ja}
              </p>

              <div className="mt-3 space-y-1 text-xs text-slate-500 border-y border-slate-100 py-2.5">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{prog.duration.id}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-slate-400" />
                  <span>Target: {prog.targetLevel}</span>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {prog.description.id}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleOpenForm(prog)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Program</span>
              </button>

              <button
                onClick={() => handleDelete(prog.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                title="Hapus Program"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
