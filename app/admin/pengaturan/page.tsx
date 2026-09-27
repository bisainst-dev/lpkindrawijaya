"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CompanyProfile } from '@/lib/types';
import { 
  Settings, 
  Save, 
  ShieldCheck, 
  Lock, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Award, 
  Sparkles, 
  Loader2, 
  Globe,
  Upload,
  Image as ImageIcon,
  Trash2,
  Sun,
  Moon,
  Eye,
  RefreshCw,
  Sliders
} from 'lucide-react';

export default function PengaturanManagementPage() {
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [adminUsername, setAdminUsername] = useState('admin');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Logo upload state
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [previewBg, setPreviewBg] = useState<'light' | 'dark'>('light');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Translation states
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateSuccess, setTranslateSuccess] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/pengaturan');
      const data = await res.json();
      setCompany(data.company);
      setAdminUsername(data.adminUsername);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Handle Logo File Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file logo terlalu besar. Maksimal 5MB.");
      return;
    }

    try {
      setIsUploadingLogo(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload-logo', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success && data.logoUrl) {
        setCompany(prev => prev ? ({ ...prev, logoUrl: data.logoUrl }) : prev);
        setToastMessage("Logo baru berhasil diunggah dan diterapkan ke Website!");
        setTimeout(() => setToastMessage(''), 5000);
      } else {
        alert(data.error || "Gagal mengunggah logo.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengunggah logo.");
    } finally {
      setIsUploadingLogo(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Reset to default IW badge logo
  const handleResetLogo = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus logo kustom dan kembali ke logo standar (Badge IW)?")) return;

    try {
      setIsUploadingLogo(true);
      const res = await fetch('/api/admin/upload-logo', { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCompany(prev => prev ? ({ ...prev, logoUrl: '' }) : prev);
        setToastMessage("Logo telah direset ke icon standar (IW).");
        setTimeout(() => setToastMessage(''), 4000);
      } else {
        alert("Gagal mereset logo.");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleAutoTranslateProfile = async () => {
    if (!company?.tagline?.id && !company?.description?.id) {
      alert("Silakan isi Slogan Tagline atau Deskripsi Profil dalam Bahasa Indonesia terlebih dahulu.");
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
            tagline: company.tagline?.id || '',
            description: company.description?.id || ''
          }
        })
      });

      const data = await res.json();

      if (data.success && data.translations) {
        const { ja, en } = data.translations;

        setCompany(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            tagline: {
              id: prev.tagline?.id || '',
              ja: ja.tagline || prev.tagline?.ja || '',
              en: en.tagline || prev.tagline?.en || ''
            },
            description: {
              id: prev.description?.id || '',
              ja: ja.description || prev.description?.ja || '',
              en: en.description || prev.description?.en || ''
            }
          };
        });

        setTranslateSuccess("Berhasil menerjemahkan Slogan dan Deskripsi ke Bahasa Jepang & Inggris!");
        setTimeout(() => setTranslateSuccess(null), 6000);
      } else {
        alert("Gagal menerjemahkan teks.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    if (newPassword && newPassword !== confirmPassword) {
      alert("Konfirmasi password baru tidak cocok!");
      return;
    }

    setIsSaving(true);
    setToastMessage('');

    try {
      const res = await fetch('/api/admin/pengaturan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company,
          newPassword: newPassword || undefined
        })
      });

      const data = await res.json();
      if (res.ok) {
        setToastMessage('Pengaturan profil dan website berhasil disimpan!');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setToastMessage(''), 4000);
      } else {
        alert(data.error || 'Gagal menyimpan pengaturan.');
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !company) {
    return <div className="p-8 text-center text-xs text-slate-500">Memuat pengaturan...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Logo & Pengaturan Profil Website
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Kelola logo navbar, legalitas izin SO Kemenaker, profil 3 bahasa, dan kontak LPK Indra Wijaya
          </p>
        </div>

        {toastMessage && (
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8 text-xs sm:text-sm">
        
        {/* ======================================================== */}
        {/* SECTION 1: UPLOAD LOGO & IDENTITAS BRAND NAVBAR */}
        {/* ======================================================== */}
        <div id="logo" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Logo Lembaga & Brand Navbar
                </h2>
                <p className="text-[11px] text-slate-500">
                  Ganti logo dan sesuaikan tulisan identitas brand di bagian header atas website
                </p>
              </div>
            </div>

            {/* Toggle Preview Background */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setPreviewBg('light')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  previewBg === 'light' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Navbar Putih</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewBg('dark')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  previewBg === 'dark' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-blue-400" />
                <span>Background Gelap</span>
              </button>
            </div>
          </div>

          {/* LIVE PREVIEW BOX (Matches exact layout from user image) */}
          <div>
            <span className="font-bold text-slate-700 block text-xs mb-2 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>Pratinjau Langsung Tampilan Navbar:</span>
            </span>

            <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex items-center justify-between flex-wrap gap-4 ${
              previewBg === 'light' 
                ? 'bg-white border-slate-200 shadow-xs' 
                : 'bg-slate-950 border-slate-800 text-white shadow-inner'
            }`}>
              {/* Exact Brand Section from Navbar */}
              <div className="flex items-center gap-3.5">
                {company.logoUrl ? (
                  <img 
                    src={company.logoUrl} 
                    alt={company.name} 
                    className="h-12 w-auto max-w-[180px] object-contain rounded-xl p-0.5 bg-white/10"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-500/20 shrink-0">
                    IW
                  </div>
                )}

                {company.showBrandText !== false && (
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`font-extrabold text-lg sm:text-xl tracking-tight leading-tight ${
                        previewBg === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        {company.name || 'LPK INDRA WIJAYA'}
                      </span>
                      {company.brandTag && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          previewBg === 'light' 
                            ? 'bg-orange-50 text-orange-700 border-orange-200' 
                            : 'bg-orange-950/80 text-orange-400 border-orange-800'
                        }`}>
                          {company.brandTag}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs font-medium tracking-wide mt-0.5 ${
                      previewBg === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {company.brandSubtitle || 'Indramayu Sending Organization to Japan'}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-[11px] font-mono text-slate-400">
                {company.logoUrl ? '✓ Menggunakan Logo Kustom' : '• Menggunakan Icon Default IW'}
              </div>
            </div>
          </div>

          {/* Upload Controls & Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Upload Box */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-emerald-400 bg-slate-50/50 flex flex-col items-center justify-center text-center gap-3 transition">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
                onChange={handleFileChange}
                className="hidden"
                id="logo-upload-input"
              />

              <label
                htmlFor="logo-upload-input"
                className={`px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20 transition ${
                  isUploadingLogo ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                {isUploadingLogo ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengunggah Logo...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Pilih File Logo Baru</span>
                  </>
                )}
              </label>

              <p className="text-[11px] text-slate-500">
                Format: <strong>PNG (Transparan), JPG, SVG, WebP</strong>. Maks. 5MB.
              </p>
            </div>

            {/* Logo Settings & Reset */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-3">
              <div>
                <span className="font-bold text-slate-800 text-xs block mb-1">Status Logo Saat Ini:</span>
                <p className="text-xs text-slate-600">
                  {company.logoUrl ? (
                    <span className="text-emerald-700 font-semibold">
                      ✓ Logo kustom aktif: <code className="text-[11px] bg-emerald-100/70 px-1 py-0.5 rounded">{company.logoUrl}</code>
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      Belum ada logo yang diunggah. Menampilkan icon kotak merah bawaan bertuliskan <strong>"IW"</strong>.
                    </span>
                  )}
                </p>
              </div>

              {company.logoUrl && (
                <button
                  type="button"
                  onClick={handleResetLogo}
                  disabled={isUploadingLogo}
                  className="px-4 py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center gap-1.5 transition self-start cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Logo & Gunakan Icon Default (IW)</span>
                </button>
              )}
            </div>

          </div>

          {/* Additional Navbar Brand Text Settings */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 text-xs block">Opsi Teks di Samping Logo:</span>
                <p className="text-[11px] text-slate-500">
                  Anda bisa menonaktifkan teks ini jika logo gambar yang Anda unggah sudah memiliki tulisan nama sendiri.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={company.showBrandText !== false}
                  onChange={(e) => setCompany({ ...company, showBrandText: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {company.showBrandText !== false && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-xs">Nama Brand di Navbar</label>
                  <input
                    type="text"
                    required
                    value={company.name}
                    onChange={(e) => setCompany({ ...company, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    placeholder="LPK INDRA WIJAYA"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-xs">Badge Singkatan / Status</label>
                  <input
                    type="text"
                    value={company.brandTag || ''}
                    onChange={(e) => setCompany({ ...company, brandTag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-orange-600"
                    placeholder="Contoh: SO"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-xs">Subjudul Keterangan Brand</label>
                  <input
                    type="text"
                    value={company.brandSubtitle || ''}
                    onChange={(e) => setCompany({ ...company, brandSubtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    placeholder="Indramayu Sending Organization to Japan"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ======================================================== */}
        {/* SECTION 2: LEGALITAS & IDENTITAS BADAN HUKUM */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Legalitas Resmi & Izin Lembaga
              </h2>
              <p className="text-[11px] text-slate-500">
                Data nomor izin resmi Kementerian Ketenagakerjaan RI dan Disnaker Indramayu
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Badan Hukum Resmi</label>
              <input
                type="text"
                required
                value={company.legalName}
                onChange={(e) => setCompany({ ...company, legalName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nomor Izin Sending Organization (SO) Kemenaker RI</label>
              <input
                type="text"
                required
                value={company.soLicenseNumber}
                onChange={(e) => setCompany({ ...company, soLicenseNumber: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nomor Izin LPK Disnaker Indramayu</label>
              <input
                type="text"
                required
                value={company.disnakerLicenseNumber}
                onChange={(e) => setCompany({ ...company, disnakerLicenseNumber: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nomor Verifikasi Identifikasi Nasional (VIN)</label>
              <input
                type="text"
                required
                value={company.vinNumber}
                onChange={(e) => setCompany({ ...company, vinNumber: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 3: MULTILINGUAL TAGLINE & PROFIL DENGAN AUTO-TRANSLATE */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Slogan & Narasi Profil Lembaga (3 Bahasa)
                </h2>
                <p className="text-[11px] text-slate-400">
                  Teks ini tampil di bagian Hero dan Tentang LPK Indra Wijaya
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAutoTranslateProfile}
              disabled={isTranslating || !company.tagline?.id}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer self-start sm:self-auto disabled:opacity-50"
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

          {translateSuccess && (
            <div className="px-3 py-2 bg-emerald-50 text-emerald-700 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{translateSuccess}</span>
            </div>
          )}

          {/* Tagline */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block text-xs">Slogan / Tagline Website:</span>
            
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇮🇩 Indonesia (Utama):</label>
              <input
                type="text"
                value={company.tagline?.id || ''}
                onChange={(e) => setCompany({ ...company, tagline: { ...company.tagline, id: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇯🇵 日本語:</label>
                <input
                  type="text"
                  value={company.tagline?.ja || ''}
                  onChange={(e) => setCompany({ ...company, tagline: { ...company.tagline, ja: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇬🇧 English:</label>
                <input
                  type="text"
                  value={company.tagline?.en || ''}
                  onChange={(e) => setCompany({ ...company, tagline: { ...company.tagline, en: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block text-xs">Deskripsi Lengkap Tentang LPK:</span>
            
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇮🇩 Indonesia (Utama):</label>
              <textarea
                rows={3}
                value={company.description?.id || ''}
                onChange={(e) => setCompany({ ...company, description: { ...company.description, id: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇯🇵 日本語:</label>
                <textarea
                  rows={3}
                  value={company.description?.ja || ''}
                  onChange={(e) => setCompany({ ...company, description: { ...company.description, ja: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white leading-relaxed"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-0.5">🇬🇧 English:</label>
                <textarea
                  rows={3}
                  value={company.description?.en || ''}
                  onChange={(e) => setCompany({ ...company, description: { ...company.description, en: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white leading-relaxed"
                />
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* SECTION 4: ALAMAT & KONTAK INDRAMAYU */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Alamat Kampus, Asrama & Kontak Resmi di Indramayu
              </h2>
              <p className="text-[11px] text-slate-500">
                Kontak resmi untuk pendaftar siswa magang dan calon mitra perusahaan Jepang
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Alamat Lengkap Jalan</label>
              <input
                type="text"
                required
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kecamatan</label>
              <input
                type="text"
                required
                value={company.district}
                onChange={(e) => setCompany({ ...company, district: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kabupaten / Kota</label>
              <input
                type="text"
                required
                value={company.regency}
                onChange={(e) => setCompany({ ...company, regency: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp Resmi (Tombol Chat)</label>
              <input
                type="text"
                required
                value={company.whatsapp}
                onChange={(e) => setCompany({ ...company, whatsapp: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-emerald-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Resmi</label>
              <input
                type="email"
                required
                value={company.email}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono"
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 5: STATISTIK KEBERHASILAN */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Angka Statistik Keberhasilan (Tampil di Hero Website)
              </h2>
              <p className="text-[11px] text-slate-500">
                Data metrik pencapaian alumni yang tampil di halaman depan
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Alumni Berangkat</label>
              <input
                type="number"
                value={company.stats.traineesDeparted}
                onChange={(e) => setCompany({ 
                  ...company, 
                  stats: { ...company.stats, traineesDeparted: Number(e.target.value) } 
                })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mitra Perusahaan Jepang</label>
              <input
                type="number"
                value={company.stats.partnerCompanies}
                onChange={(e) => setCompany({ 
                  ...company, 
                  stats: { ...company.stats, partnerCompanies: Number(e.target.value) } 
                })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kelulusan Wawancara (%)</label>
              <input
                type="number"
                value={company.stats.interviewPassRate}
                onChange={(e) => setCompany({ 
                  ...company, 
                  stats: { ...company.stats, interviewPassRate: Number(e.target.value) } 
                })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tahun Pengalaman</label>
              <input
                type="number"
                value={company.stats.yearsExperience}
                onChange={(e) => setCompany({ 
                  ...company, 
                  stats: { ...company.stats, yearsExperience: Number(e.target.value) } 
                })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold"
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 6: KEAMANAN AKUN CMS ADMIN */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Keamanan Akun CMS Admin
              </h2>
              <p className="text-[11px] text-slate-500">
                Ubah kata sandi login admin untuk perlindungan portal
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Username Saat Ini</label>
              <input
                type="text"
                disabled
                value={adminUsername}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Ganti Password Baru (Opsional)</label>
              <input
                type="password"
                placeholder="Kosongkan jika tidak ingin ganti"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Ulangi Password Baru</label>
              <input
                type="password"
                placeholder="Konfirmasi password baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end sticky bottom-4 z-20">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/40 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Menyimpan Perubahan...' : 'Simpan Seluruh Pengaturan Profil'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
