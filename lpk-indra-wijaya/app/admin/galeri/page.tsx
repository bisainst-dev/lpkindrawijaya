"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArticleGalleryItem } from '@/lib/types';
import { 
  Camera, 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  Tag, 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Languages, 
  CheckCircle2, 
  Loader2, 
  Layers, 
  Eye, 
  FileText, 
  Search,
  ExternalLink,
  ImageIcon,
  Upload,
  ImagePlus,
  FolderUp,
  Link as LinkIcon
} from 'lucide-react';

export default function GaleriManagementPage() {
  const [items, setItems] = useState<ArticleGalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [editingItem, setEditingItem] = useState<ArticleGalleryItem | null>(null);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 3-Language active tab in form
  const [activeLangTab, setActiveLangTab] = useState<'id' | 'ja' | 'en'>('id');

  // Photo Input Mode: 'upload' (Unggah File) or 'url' (Tautkan URL)
  const [photoInputMode, setPhotoInputMode] = useState<'upload' | 'url'>('upload');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-translate states
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateSuccess, setTranslateSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State with 3-language fields
  const [formData, setFormData] = useState<ArticleGalleryItem>({
    id: '',
    type: 'gallery',
    title: { id: '', ja: '', en: '' },
    summary: { id: '', ja: '', en: '' },
    content: { id: '', ja: '', en: '' },
    category: 'Keberangkatan',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    date: new Date().toISOString().slice(0, 10),
    published: true
  });

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/berita-galeri');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenForm = (item?: ArticleGalleryItem) => {
    setTranslateSuccess(null);
    setUploadSuccessMessage(null);
    setActiveLangTab('id');

    if (item) {
      setEditingItem(item);
      setFormData({
        id: item.id,
        type: item.type || 'gallery',
        title: {
          id: item.title?.id || '',
          ja: item.title?.ja || '',
          en: item.title?.en || ''
        },
        summary: {
          id: item.summary?.id || '',
          ja: item.summary?.ja || '',
          en: item.summary?.en || ''
        },
        content: {
          id: item.content?.id || '',
          ja: item.content?.ja || '',
          en: item.content?.en || ''
        },
        category: item.category || 'Keberangkatan',
        imageUrl: item.imageUrl || '',
        date: item.date || new Date().toISOString().slice(0, 10),
        published: item.published !== undefined ? item.published : true
      });
      // If image is locally uploaded, default to 'upload' mode, otherwise 'url'
      if (item.imageUrl?.startsWith('/uploads/')) {
        setPhotoInputMode('upload');
      }
    } else {
      setEditingItem(null);
      setFormData({
        id: `art-${Date.now()}`,
        type: 'gallery',
        title: { id: '', ja: '', en: '' },
        summary: { id: '', ja: '', en: '' },
        content: { id: '', ja: '', en: '' },
        category: 'Keberangkatan',
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
        date: new Date().toISOString().slice(0, 10),
        published: true
      });
      setPhotoInputMode('upload');
    }

    setViewMode('form');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setEditingItem(null);
    setTranslateSuccess(null);
    setUploadSuccessMessage(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Upload file to server
  const processUploadFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("File yang diunggah harus berupa gambar (JPG, PNG, WebP, GIF).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file foto terlalu besar. Maksimal 10MB.");
      return;
    }

    try {
      setIsUploadingPhoto(true);
      setUploadSuccessMessage(null);

      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/admin/upload-photo', {
        method: 'POST',
        body: uploadData
      });

      const data = await res.json();
      if (data.success && data.url) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        setUploadSuccessMessage("✓ Foto berhasil diunggah ke server dan diterapkan!");
        setTimeout(() => setUploadSuccessMessage(null), 6000);
      } else {
        alert(data.error || "Gagal mengunggah foto.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan saat mengunggah foto.");
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadFile(file);
    }
  };

  // Auto-Translate function: Translate ID inputs to Japanese (JA) & English (EN)
  const handleAutoTranslate = async () => {
    if (!formData.title?.id?.trim()) {
      alert("Silakan ketik minimal 'Judul Kegiatan (Bahasa Indonesia)' terlebih dahulu.");
      return;
    }

    try {
      setIsTranslating(true);
      setTranslateSuccess(null);

      const fieldsToTranslate: Record<string, string> = {
        title: formData.title?.id || ''
      };

      if (formData.summary?.id?.trim()) {
        fieldsToTranslate.summary = formData.summary.id;
      }

      if (formData.content?.id?.trim()) {
        fieldsToTranslate.content = formData.content.id;
      }

      const res = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: fieldsToTranslate })
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
          summary: {
            id: prev.summary?.id || '',
            ja: ja.summary || prev.summary?.ja || '',
            en: en.summary || prev.summary?.en || ''
          },
          content: {
            id: prev.content?.id || '',
            ja: ja.content || prev.content?.ja || '',
            en: en.content || prev.content?.en || ''
          }
        }));

        setTranslateSuccess("Berhasil! Teks Bahasa Jepang & Inggris telah terisi otomatis.");
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
    if (!formData.imageUrl?.trim()) {
      alert("Silakan unggah foto atau masukkan URL foto terlebih dahulu.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/berita-galeri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setViewMode('list');
        setEditingItem(null);
        fetchItems();
      } else {
        alert("Gagal menyimpan dokumentasi kegiatan.");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus dokumentasi kegiatan ini?")) return;

    try {
      const res = await fetch(`/api/admin/berita-galeri?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(prev => prev.filter(i => i.id !== id));
      }
    } catch (err) {
      alert("Gagal menghapus item.");
    }
  };

  // Filter items
  const filteredItems = items.filter(item => {
    const matchCategory = selectedFilterCategory === 'all' || 
      item.category.toLowerCase().includes(selectedFilterCategory.toLowerCase());
    
    const query = searchQuery.toLowerCase().trim();
    const matchSearch = !query || 
      (item.title?.id?.toLowerCase().includes(query)) ||
      (item.title?.ja?.toLowerCase().includes(query)) ||
      (item.title?.en?.toLowerCase().includes(query)) ||
      (item.summary?.id?.toLowerCase().includes(query));

    return matchCategory && matchSearch;
  });

  // ==========================================
  // VIEW MODE: FORM (HALAMAN PENUH / NON-POPUP)
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
              <span>Kembali ke Daftar Galeri & Berita</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {editingItem ? `Edit Dokumentasi: ${formData.title?.id || 'Kegiatan'}` : 'Tambah Foto / Dokumentasi Baru'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  {editingItem 
                    ? 'Perbarui foto, kategori, tanggal, serta teks dalam 3 bahasa (ID, JA, EN)' 
                    : 'Unggah foto dari perangkat Anda dan lengkapi teks 3 bahasa untuk dokumentasi kegiatan LPK'}
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
              form="galeri-form"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Dokumentasi'}</span>
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
                Cukup ketik judul dan ringkasan kegiatan dalam <strong>Bahasa Indonesia</strong>, lalu klik tombol ini. Sistem akan otomatis mengisi kolom terjemahan Bahasa Jepang (日本語) dan Inggris (English).
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
        <form id="galeri-form" onSubmit={handleSave} className="space-y-6">
          
          {/* Card 1: Informasi Dasar, Upload Foto, & Kategori */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Layers className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base font-extrabold text-slate-900">
                Pengaturan Kategori, Media Foto, & Tanggal
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs sm:text-sm">Tipe Konten</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold"
                >
                  <option value="gallery">📷 Foto Dokumentasi Galeri</option>
                  <option value="article">📰 Artikel Berita / Rilis Kegiatan</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs sm:text-sm">Kategori Kegiatan</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold"
                >
                  <option value="Keberangkatan">Keberangkatan Bandara</option>
                  <option value="Pelatihan">Pelatihan Kelas & Asrama</option>
                  <option value="FMD">Latihan Fisik & Mental (FMD)</option>
                  <option value="Kerjasama Jepang">Kunjungan Mitra Jepang / Kumiai</option>
                  <option value="Info Edukasi">Info Edukasi & Karir</option>
                  <option value="Kegiatan Alumni">Kegiatan Alumni di Jepang</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs sm:text-sm">Tanggal Kegiatan</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium"
                />
              </div>
            </div>

            {/* ======================================================== */}
            {/* SECTION UPLOAD FOTO & MEDIA */}
            {/* ======================================================== */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="block font-bold text-slate-800 text-xs sm:text-sm">
                  Foto Dokumentasi Kegiatan <span className="text-red-500">*</span>
                </label>

                {/* Mode Selector: Upload File vs Tautkan URL */}
                <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setPhotoInputMode('upload')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      photoInputMode === 'upload'
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload dari Komputer / HP</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoInputMode('url')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      photoInputMode === 'url'
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Tautkan URL Gambar</span>
                  </button>
                </div>
              </div>

              {/* MODE 1: UPLOAD DARI KOMPUTER / HP */}
              {photoInputMode === 'upload' && (
                <div className="space-y-3">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`p-6 sm:p-8 rounded-3xl border-2 border-dashed text-center flex flex-col items-center justify-center gap-3 transition-all ${
                      isDragging
                        ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01]'
                        : 'border-slate-300 hover:border-emerald-400 bg-slate-50/60'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                      onChange={handleFileChange}
                      className="hidden"
                      id="galeri-file-upload-input"
                    />

                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                      {isUploadingPhoto ? (
                        <Loader2 className="w-7 h-7 animate-spin" />
                      ) : (
                        <ImagePlus className="w-7 h-7" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="font-extrabold text-slate-800 text-sm">
                        {isUploadingPhoto 
                          ? 'Sedang mengunggah foto ke server...' 
                          : 'Tarik & Jatuhkan Foto di Sini, atau Klik Tombol di Bawah'}
                      </p>
                      <p className="text-xs text-slate-500">
                        Format: <strong>JPG, PNG, WebP</strong> • Maksimal <strong>10MB</strong> (Resolusi tinggi langsung tersimpan di server lokal).
                      </p>
                    </div>

                    <label
                      htmlFor="galeri-file-upload-input"
                      className={`px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20 transition ${
                        isUploadingPhoto ? 'opacity-50 pointer-events-none' : ''
                      }`}
                    >
                      {isUploadingPhoto ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Mengunggah Foto...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Pilih Foto dari Galeri / Kamera</span>
                        </>
                      )}
                    </label>
                  </div>

                  {uploadSuccessMessage && (
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{uploadSuccessMessage}</span>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: TAUTKAN URL GAMBAR */}
              {photoInputMode === 'url' && (
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="url"
                      required
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/... atau URL file foto online"
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium font-mono"
                    />
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setFormData({ ...formData, imageUrl: e.target.value });
                        }
                      }}
                      defaultValue=""
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-700"
                    >
                      <option value="" disabled>Pilih Contoh Foto Unsplash...</option>
                      <option value="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80">Keberangkatan Bandara Pesawat</option>
                      <option value="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80">Kelas Bahasa Jepang Sensei</option>
                      <option value="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80">Simulasi Lab Kaigo Lansia</option>
                      <option value="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80">Latihan Fisik & Mental FMD</option>
                      <option value="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80">Kunjungan Direktur Mitra Jepang</option>
                    </select>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Anda juga dapat menempelkan link foto online dari Google Drive (direct link), Unsplash, atau hosting gambar lainnya.
                  </p>
                </div>
              )}

              {/* Preview Container */}
              {formData.imageUrl && (
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-full sm:w-48 aspect-video rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300 shadow-2xs">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </div>
                  <div className="space-y-1.5 text-xs flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-800">Pratinjau Foto Aktif:</span>
                      {formData.imageUrl.startsWith('/uploads/') ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          ✓ File Server Lokal
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                          Web URL
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 line-clamp-2">
                      Foto ini akan otomatis tayang di galeri slideshow beranda dan halaman berita kegiatan LPK Indra Wijaya.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-800 font-bold text-[10px]">
                        Kategori: {formData.category}
                      </span>
                      <code className="text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-mono truncate max-w-xs">
                        {formData.imageUrl}
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Publication toggle */}
            <div className="pt-2 flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Publikasikan sekarang (Tampil aktif di website utama)</span>
              </label>
            </div>
          </div>

          {/* Card 2: Konten Teks dalam 3 Bahasa */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            
            {/* Header with Language Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-orange-600" />
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    Konten Informasi dalam 3 Bahasa
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pilih tab bahasa di bawah untuk memeriksa atau mengubah teks masing-masing bahasa
                  </p>
                </div>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveLangTab('id')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeLangTab === 'id'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🇮🇩</span>
                  <span>Indonesia</span>
                  {formData.title?.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveLangTab('ja')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeLangTab === 'ja'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🇯🇵</span>
                  <span>日本語</span>
                  {formData.title?.ja && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveLangTab('en')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeLangTab === 'en'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                  {formData.title?.en && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </button>
              </div>
            </div>

            {/* TAB: BAHASA INDONESIA 🇮🇩 */}
            {activeLangTab === 'id' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-3 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 text-xs font-semibold flex items-center gap-2">
                  <span className="text-base">🇮🇩</span>
                  <span><strong>Bahasa Indonesia:</strong> Bahasa sumber utama. Teks di tab ini akan digunakan sebagai rujukan fitur Auto-Translate.</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Judul Kegiatan (Bahasa Indonesia) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pelepasan 28 Siswa Tokutei Ginou Kaigo di Bandara Soekarno-Hatta"
                    value={formData.title?.id || ''}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, id: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Ringkasan Singkat / Caption Slide (Bahasa Indonesia) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Tuliskan keterangan singkat foto yang akan tampil pada slide galeri beranda..."
                    value={formData.summary?.id || ''}
                    onChange={(e) => setFormData({ ...formData, summary: { ...formData.summary, id: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Isi Artikel / Ulasan Lengkap Kegiatan (Opsional):
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ulasan detail narasi berita kegiatan (jika tipe artikel)..."
                    value={formData.content?.id || ''}
                    onChange={(e) => setFormData({ ...formData, content: { ...(formData.content || { id: '', ja: '', en: '' }), id: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>
            )}

            {/* TAB: NIHONGO 🇯🇵 */}
            {activeLangTab === 'ja' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl border border-blue-200 text-xs font-semibold flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇯🇵</span>
                    <span><strong>日本語 (Bahasa Jepang):</strong> Teks ini akan tampil saat pengunjung memilih bahasa Jepang di website.</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoTranslate}
                    disabled={isTranslating || !formData.title?.id?.trim()}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Auto-Translate</span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Judul Kegiatan (日本語 - Bahasa Jepang):
                  </label>
                  <input
                    type="text"
                    placeholder="例: スカルノ・ハッタ国際空港にて特定技能介護職第14期生28名の歓送式"
                    value={formData.title?.ja || ''}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, ja: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Ringkasan Singkat / Caption Slide (日本語):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="日本の受け入れ施設様へ向けて笑顔で旅立つ候補生たちのスライド説明文..."
                    value={formData.summary?.ja || ''}
                    onChange={(e) => setFormData({ ...formData, summary: { ...formData.summary, ja: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Isi Artikel / Ulasan Lengkap Kegiatan (日本語 - Opsional):
                  </label>
                  <textarea
                    rows={4}
                    placeholder="活動の詳細な報告記事（日本語版）..."
                    value={formData.content?.ja || ''}
                    onChange={(e) => setFormData({ ...formData, content: { ...(formData.content || { id: '', ja: '', en: '' }), ja: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium font-sans"
                  />
                </div>
              </div>
            )}

            {/* TAB: ENGLISH 🇬🇧 */}
            {activeLangTab === 'en' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-3 bg-slate-100 text-slate-900 rounded-2xl border border-slate-200 text-xs font-semibold flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇬🇧</span>
                    <span><strong>English:</strong> Text displayed when international visitors browse in English.</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoTranslate}
                    disabled={isTranslating || !formData.title?.id?.trim()}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Auto-Translate</span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Activity Title (English):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Official Airport Departure of 28 Caregiver Trainees to Tokyo"
                    value={formData.title?.en || ''}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Summary / Slide Caption (English):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of the activity documentation..."
                    value={formData.summary?.en || ''}
                    onChange={(e) => setFormData({ ...formData, summary: { ...formData.summary, en: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Full Article Content (English - Optional):
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Detailed report of the event or article narrative..."
                    value={formData.content?.en || ''}
                    onChange={(e) => setFormData({ ...formData, content: { ...(formData.content || { id: '', ja: '', en: '' }), en: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleBackToList}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Dokumentasi Kegiatan'}</span>
            </button>
          </div>

        </form>

      </div>
    );
  }

  // ==========================================
  // VIEW MODE: LIST (DAFTAR DOKUMENTASI)
  // ==========================================
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
            <Camera className="w-4 h-4" />
            <span>Dokumentasi Otentik & Rilis Berita</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Kelola Galeri & Berita Kegiatan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1 leading-relaxed">
            Upload foto dokumentasi langsung dari komputer atau HP. Foto ini tayang di <strong>Slideshow Beranda</strong> dan <strong>Galeri Dokumentasi</strong> dengan dukungan <strong>3 Bahasa</strong>.
          </p>
        </div>

        <button
          onClick={() => handleOpenForm()}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition self-start sm:self-auto cursor-pointer shadow-md shadow-orange-500/25 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Dokumentasi Baru</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'keberangkatan', label: 'Keberangkatan' },
            { id: 'pelatihan', label: 'Pelatihan & Lab' },
            { id: 'fmd', label: 'FMD' },
            { id: 'kerjasama', label: 'Mitra Jepang' },
            { id: 'edukasi', label: 'Info Edukasi' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilterCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedFilterCategory === cat.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul kegiatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
          />
        </div>
      </div>

      {/* Grid of Items */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-xs font-medium">Memuat dokumentasi galeri...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
          <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-base">Tidak ada dokumentasi ditemukan</h3>
          <p className="text-xs text-slate-400 mt-1">Coba ganti kata kunci pencarian atau tambah dokumentasi baru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-200 transition group flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title?.id || 'Dokumentasi'}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {item.category}
                    </span>
                    {item.type === 'article' && (
                      <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Artikel
                      </span>
                    )}
                  </div>

                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.published !== false
                      ? 'bg-emerald-500/90 text-white'
                      : 'bg-slate-800/90 text-slate-300'
                  }`}>
                    {item.published !== false ? '● Tayang' : '○ Draf'}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <span>{item.date}</span>
                  </div>

                  {/* 3-Language Titles */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                      🇮🇩 {item.title?.id || '-'}
                    </h3>
                    {item.title?.ja && (
                      <p className="text-[11px] text-blue-800 font-sans line-clamp-1">
                        🇯🇵 {item.title.ja}
                      </p>
                    )}
                    {item.title?.en && (
                      <p className="text-[11px] text-slate-500 italic line-clamp-1">
                        🇬🇧 {item.title.en}
                      </p>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1 border-t border-slate-100">
                    {item.summary?.id || item.summary?.ja || item.summary?.en || '-'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                <button
                  onClick={() => handleOpenForm(item)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit (Foto & 3 Bahasa)</span>
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                  title="Hapus foto ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
