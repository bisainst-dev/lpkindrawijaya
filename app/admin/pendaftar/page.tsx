"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ApplicantItem, EducationEntry, WorkEntry, LicenseEntry } from '@/lib/types';
import RirekishoCVModal from '@/components/RirekishoCVModal';
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
  GraduationCap,
  Plus,
  ArrowLeft,
  Save,
  Printer,
  FileText,
  Upload,
  Loader2,
  Calendar,
  Sparkles,
  MapPin,
  Mail,
  User,
  Heart,
  Briefcase,
  Award,
  Layers,
  Edit2
} from 'lucide-react';

export default function PendaftarManagementPage() {
  const [applicants, setApplicants] = useState<ApplicantItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation & Modal States
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [editingApplicant, setEditingApplicant] = useState<ApplicantItem | null>(null);
  const [cvModalApplicant, setCvModalApplicant] = useState<ApplicantItem | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  // Photo Upload States
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<ApplicantItem>>({
    id: '',
    fullName: '',
    katakanaName: '',
    gender: 'Laki-laki',
    birthDate: '2004-01-01',
    birthPlace: 'Indramayu',
    age: 22,
    phoneWhatsapp: '',
    email: '',
    originDistrict: 'Jatibarang',
    originRegency: 'Indramayu',
    fullAddress: '',
    addressFurigana: '',
    postalCode: '45214',
    emergencyContact: {
      name: '',
      relationship: 'Orang Tua',
      phone: '',
      address: '同上'
    },
    lastEducation: 'SMK Sederajat',
    heightCm: 168,
    weightKg: 60,
    bloodType: 'O',
    dominantHand: 'Kanan',
    vision: { left: '1.0', right: '1.0' },
    maritalStatus: 'Belum Menikah',
    religion: 'Islam',
    interestedProgram: 'prog-ssw-kaigo',
    interestedSector: '介護職（特定技能1号）',
    preferredPrefecture: '関東地方 (Tokyo, Chiba, Saitama)',
    japaneseLevel: 'Dasar / Hiragana Katakana',
    photoUrl: '',
    educationHistory: [],
    workHistory: [],
    certifications: [],
    personalPreferences: '',
    notes: '',
    status: 'baru'
  });

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

  const handleOpenForm = (applicant?: ApplicantItem) => {
    if (applicant) {
      setEditingApplicant(applicant);
      setFormData(JSON.parse(JSON.stringify(applicant)));
    } else {
      setEditingApplicant(null);
      const defaultBirth = '2004-05-15';
      setFormData({
        id: `app-${Date.now()}`,
        fullName: '',
        katakanaName: '',
        gender: 'Laki-laki',
        birthDate: defaultBirth,
        birthPlace: 'Indramayu',
        age: calculateAge(defaultBirth),
        phoneWhatsapp: '',
        email: '',
        originDistrict: 'Lohbener',
        originRegency: 'Indramayu',
        fullAddress: 'Ds. Lohbener, Kec. Lohbener, Kab. Indramayu, Jawa Barat',
        addressFurigana: 'インドネシア・西ジャワ州インドラマユ県',
        postalCode: '45252',
        emergencyContact: {
          name: '',
          relationship: 'Orang Tua',
          phone: '',
          address: '同上'
        },
        lastEducation: 'SMK Negeri 1 Indramayu',
        heightCm: 168,
        weightKg: 60,
        bloodType: 'O',
        dominantHand: 'Kanan',
        vision: { left: '1.0', right: '1.0' },
        maritalStatus: 'Belum Menikah',
        religion: 'Islam',
        interestedProgram: 'prog-ssw-kaigo',
        interestedSector: '介護職（特定技能1号）',
        preferredPrefecture: '関東地方 (Tokyo, Chiba, Kanagawa, Saitama)',
        japaneseLevel: 'Dasar / Hiragana Katakana',
        photoUrl: '',
        educationHistory: [
          { year: '2011', month: '7', name: 'インドネシア共和国 公立小学校', status: '入学' },
          { year: '2017', month: '6', name: 'インドネシア共和国 公立小学校', status: '卒業' },
          { year: '2017', month: '7', name: 'インドネシア共和国 公立中学校', status: '入学' },
          { year: '2020', month: '6', name: 'インドネシア共和国 公立中学校', status: '卒業' },
          { year: '2020', month: '7', name: 'インドネシア共和国 高等学校/職業高校', status: '入学' },
          { year: '2023', month: '6', name: 'インドネシア共和国 高等学校/職業高校', status: '卒業' },
          { year: '2026', month: '1', name: 'LPKインドラ・ウィジャヤ (日本語及び技能講習)', status: '在学中' }
        ],
        workHistory: [
          { year: '2023', month: '8', name: 'インドネシア国内企業・工場', status: '入社' },
          { year: '2025', month: '12', name: '技能向上及び訪日準備のため', status: '退社' }
        ],
        certifications: [
          { year: '2026', month: '4', name: '国際交流基金日本語基礎テスト (JFT-Basic A2) 合格' },
          { year: '2026', month: '6', name: '特定技能1号評価試験 (介護分野・介護日本語) 合格' }
        ],
        personalPreferences: `【希望職種】 介護職（特定技能1号）\n【希望勤務地】 関東、中部、関西地方（全国どこでも意欲的に勤務可能）\n【希望給与】 貴社の規定に従います。\n【その他】 日本のルール・規律を守り、明るく元気に誠心誠意貢献いたします。`,
        notes: '',
        status: 'baru'
      });
    }
    setViewMode('form');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setEditingApplicant(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Upload student photo
  const handlePhotoUpload = async (file: File) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran foto maksimal 10MB.");
      return;
    }

    try {
      setIsUploadingPhoto(true);
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/admin/upload-photo', {
        method: 'POST',
        body: data
      });

      const json = await res.json();
      if (json.success && json.url) {
        setFormData(prev => ({ ...prev, photoUrl: json.url }));
      } else {
        alert(json.error || "Gagal mengunggah pas foto.");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi saat mengunggah foto.");
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Helper auto-calculate age
  const handleBirthDateChange = (dateStr: string) => {
    const age = calculateAge(dateStr);
    setFormData(prev => ({ ...prev, birthDate: dateStr, age }));
  };

  // Helper auto-convert Katakana
  const handleAutoKatakana = () => {
    if (!formData.fullName?.trim()) {
      alert("Silakan ketik nama lengkap terlebih dahulu.");
      return;
    }
    const converted = convertIndonesianToKatakana(formData.fullName);
    setFormData(prev => ({ ...prev, katakanaName: converted }));
  };

  // Save student data
  const handleSaveStudent = async (e?: React.FormEvent, openCVAfterSave = false) => {
    if (e) e.preventDefault();
    if (!formData.fullName?.trim()) {
      alert("Nama lengkap calon siswa wajib diisi.");
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        ...formData,
        isFullRecord: true
      };

      const res = await fetch('/api/pendaftar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await res.json();
      if (res.ok && resData.applicant) {
        await fetchApplicants();
        if (openCVAfterSave) {
          setCvModalApplicant(resData.applicant);
          setIsCvModalOpen(true);
        } else {
          setViewMode('list');
        }
      } else {
        alert(resData.error || "Gagal menyimpan data siswa.");
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ApplicantItem['status']) => {
    try {
      const res = await fetch('/api/pendaftar', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (res.ok) {
        setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      }
    } catch (err) {
      alert("Gagal memperbarui status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data calon siswa ini?")) return;

    try {
      const res = await fetch(`/api/pendaftar?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setApplicants(prev => prev.filter(a => a.id !== id));
      }
    } catch (err) {
      alert("Gagal menghapus data.");
    }
  };

  // Open Rirekisho CV Modal
  const handleOpenCV = (applicant: ApplicantItem) => {
    setCvModalApplicant(applicant);
    setIsCvModalOpen(true);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Nama Lengkap", "Katakana", "Jenis Kelamin", "Tanggal Lahir", "Usia", "No WhatsApp", "Email", "Alamat", "Pendidikan", "Tinggi (cm)", "Berat (kg)", "Pilihan Program", "Tingkat Bahasa", "Status", "Tanggal Daftar", "Catatan"];
    const rows = applicants.map(a => [
      a.id,
      `"${a.fullName}"`,
      `"${a.katakanaName || ''}"`,
      a.gender,
      a.birthDate,
      a.age,
      `"${a.phoneWhatsapp}"`,
      `"${a.email || ''}"`,
      `"${a.fullAddress || a.originDistrict + ', ' + a.originRegency}"`,
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
    link.setAttribute("download", `data_siswa_lpk_indra_wijaya_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApplicants = applicants.filter(app => {
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch = 
      app.fullName.toLowerCase().includes(query) ||
      (app.katakanaName && app.katakanaName.toLowerCase().includes(query)) ||
      app.phoneWhatsapp.includes(query) ||
      app.originDistrict.toLowerCase().includes(query);
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && app.status === statusFilter;
  });

  // ==========================================
  // VIEW MODE: FORMULIR PENDAFTARAN SISWA (ADMIN)
  // ==========================================
  if (viewMode === 'form') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-16">
        
        {/* Form Topbar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Daftar Calon Siswa</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {editingApplicant ? `Edit Profil Siswa: ${formData.fullName}` : 'Pendaftaran Siswa Baru (Admin)'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Lengkapi data diri, riwayat pendidikan, dan keahlian siswa untuk langsung diekspor ke CV Standar Jepang (履歴書).
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0 flex-wrap">
            <button
              type="button"
              onClick={handleBackToList}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={() => handleSaveStudent(undefined, true)}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-orange-500/20 transition cursor-pointer disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              <span>Simpan & Buka CV 履歴書</span>
            </button>

            <button
              type="button"
              onClick={() => handleSaveStudent(undefined, false)}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Siswa'}</span>
            </button>
          </div>
        </div>

        {/* Main Form Form Body */}
        <form onSubmit={(e) => handleSaveStudent(e, false)} className="space-y-6 text-xs sm:text-sm">
          
          {/* Card 1: Pas Foto & Status Siswa */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base font-extrabold text-slate-900">
                Pas Foto Formal & Status Siswa
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Photo Box Preview */}
              <div className="w-36 h-48 rounded-2xl border-2 border-dashed border-slate-300 overflow-hidden bg-slate-50 flex flex-col items-center justify-center relative shrink-0 shadow-xs group">
                {formData.photoUrl ? (
                  <>
                    <img src={formData.photoUrl} alt="Pas Foto" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, photoUrl: '' }))}
                      className="absolute inset-0 bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-xs"
                    >
                      Ganti Foto
                    </button>
                  </>
                ) : (
                  <div className="p-3 text-center text-slate-400 space-y-1">
                    <User className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-[10px] font-bold text-slate-600">Pas Foto 3x4 / 4x6</p>
                    <p className="text-[9px] text-slate-400">Formal kemeja putih / jas</p>
                  </div>
                )}
                {isUploadingPhoto && (
                  <div className="absolute inset-0 bg-slate-900/70 text-white flex items-center justify-center gap-2 text-xs font-bold">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                )}
              </div>

              {/* Upload Controls & Status */}
              <div className="flex-1 space-y-4 w-full">
                <div>
                  <span className="font-bold text-slate-800 block mb-1">Unggah Pas Foto Siswa (Untuk CV 履歴書):</span>
                  <p className="text-xs text-slate-500 mb-3">
                    Pas foto ini akan otomatis tampil di kotak foto 履歴書 (36-40mm x 24-30mm) standar perusahaan Jepang.
                  </p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handlePhotoUpload(file);
                    }}
                    className="hidden"
                    id="student-photo-upload"
                  />

                  <div className="flex items-center gap-2.5 flex-wrap">
                    <label
                      htmlFor="student-photo-upload"
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer transition"
                    >
                      <Upload className="w-4 h-4 text-emerald-600" />
                      <span>{formData.photoUrl ? 'Ubah Pas Foto' : 'Pilih Foto dari Galeri / Kamera'}</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Atau tempel URL gambar online..."
                      value={formData.photoUrl || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, photoUrl: e.target.value }))}
                      className="flex-1 min-w-[200px] px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Status Progres di LPK</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                    >
                      <option value="baru">Baru Terdaftar (Leads)</option>
                      <option value="terjadwal_seleksi">Terjadwal Seleksi Fisik / Bahasa</option>
                      <option value="sedang_pelatihan">Sedang Pelatihan Asrama & Kelas</option>
                      <option value="lolos_wawancara">Lolos Wawancara Perusahaan Jepang (User)</option>
                      <option value="selesai">Selesai / Sudah Berangkat Terbang</option>
                      <option value="ditolak">Ditolak / Mundur</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pilihan Program Pelatihan</label>
                    <select
                      value={formData.interestedProgram}
                      onChange={(e) => setFormData(prev => ({ ...prev, interestedProgram: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                    >
                      <option value="prog-ssw-kaigo">Tokutei Ginou (SSW) - Caregiver / Kaigo Lansia</option>
                      <option value="prog-ssw-nogyo">Tokutei Ginou (SSW) - Pertanian (農業)</option>
                      <option value="prog-ssw-shokuhin">Tokutei Ginou (SSW) - Industri Pengolahan Makanan (外食)</option>
                      <option value="prog-magang-jisshuusei">Pemagangan Jepang (Ginou Jisshuusei)</option>
                      <option value="prog-bahasa-jepang">Kelas Persiapan Bahasa Jepang (JFT / JLPT N4)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Identitas Diri (基本情報) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                <h2 className="text-base font-extrabold text-slate-900">
                  Identitas Lengkap Siswa (基本情報)
                </h2>
              </div>
              <button
                type="button"
                onClick={handleAutoKatakana}
                className="px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto Katakana</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Lengkap (Romaji / Huruf Latin) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: DIMAS ADITYA PRATAMA"
                  value={formData.fullName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold uppercase"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Katakana (ふりがな) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="例: ディマス・アディティヤ・プラタマ"
                  value={formData.katakanaName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, katakanaName: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-1">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  required
                  value={formData.birthDate || '2004-01-01'}
                  onChange={(e) => handleBirthDateChange(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Usia Saat Ini</label>
                <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800">
                  {formData.age} Tahun
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                >
                  <option value="Laki-laki">Laki-laki (男)</option>
                  <option value="Perempuan">Perempuan (女)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp / HP Aktif</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="081234567890"
                    value={formData.phoneWhatsapp || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneWhatsapp: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Aktif</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="nama@gmail.com"
                    value={formData.email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Alamat Domisili Lengkap (現住所)</label>
                <input
                  type="text"
                  placeholder="Jalan, RT/RW, Desa, Kecamatan, Kab. Indramayu, Jawa Barat"
                  value={formData.fullAddress || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullAddress: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kode Pos (〒)</label>
                <input
                  type="text"
                  placeholder="45214"
                  value={formData.postalCode || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Data Fisik & Karakteristik */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Heart className="w-5 h-5 text-red-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Data Fisik, Medis, & Kemampuan Bahasa
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tinggi (cm)</label>
                <input
                  type="number"
                  value={formData.heightCm || 168}
                  onChange={(e) => setFormData(prev => ({ ...prev, heightCm: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Berat (kg)</label>
                <input
                  type="number"
                  value={formData.weightKg || 60}
                  onChange={(e) => setFormData(prev => ({ ...prev, weightKg: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Gol. Darah</label>
                <select
                  value={formData.bloodType || 'O'}
                  onChange={(e) => setFormData(prev => ({ ...prev, bloodType: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tangan Dominan</label>
                <select
                  value={formData.dominantHand || 'Kanan'}
                  onChange={(e) => setFormData(prev => ({ ...prev, dominantHand: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                >
                  <option value="Kanan">Kanan (右利き)</option>
                  <option value="Kiri">Kiri (左利き)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pernikahan</label>
                <select
                  value={formData.maritalStatus || 'Belum Menikah'}
                  onChange={(e) => setFormData(prev => ({ ...prev, maritalStatus: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                >
                  <option value="Belum Menikah">Belum Menikah (未婚)</option>
                  <option value="Menikah">Menikah (既婚)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bahasa Jepang</label>
                <select
                  value={formData.japaneseLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, japaneseLevel: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                >
                  <option value="Belum Pernah">Belum Pernah</option>
                  <option value="Dasar / Hiragana Katakana">Dasar Kana</option>
                  <option value="N5">JLPT N5</option>
                  <option value="N4">JFT-Basic / N4</option>
                  <option value="N3+">JLPT N3+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 4: Riwayat Pendidikan (学歴) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-700" />
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    Riwayat Pendidikan (学歴)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Akan otomatis disusun berurutan di tabel halaman 1 CV 履歴書
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    educationHistory: [
                      ...(prev.educationHistory || []),
                      { year: '2023', month: '7', name: 'インドネシア共和国 〇〇高等学校', status: '入学' }
                    ]
                  }));
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Baris Sekolah</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {(formData.educationHistory || []).map((edu, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Tahun"
                    value={edu.year}
                    onChange={(e) => {
                      const updated = [...(formData.educationHistory || [])];
                      updated[idx].year = e.target.value;
                      setFormData(prev => ({ ...prev, educationHistory: updated }));
                    }}
                    className="w-20 px-2.5 py-1.5 rounded-xl border border-slate-300 font-mono text-center text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Bln"
                    value={edu.month}
                    onChange={(e) => {
                      const updated = [...(formData.educationHistory || [])];
                      updated[idx].month = e.target.value;
                      setFormData(prev => ({ ...prev, educationHistory: updated }));
                    }}
                    className="w-16 px-2.5 py-1.5 rounded-xl border border-slate-300 font-mono text-center text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Nama Sekolah (e.g. インドネシア共和国 〇〇高等学校 卒業)"
                    value={edu.name}
                    onChange={(e) => {
                      const updated = [...(formData.educationHistory || [])];
                      updated[idx].name = e.target.value;
                      setFormData(prev => ({ ...prev, educationHistory: updated }));
                    }}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
                  />
                  <select
                    value={edu.status}
                    onChange={(e) => {
                      const updated = [...(formData.educationHistory || [])];
                      updated[idx].status = e.target.value as any;
                      setFormData(prev => ({ ...prev, educationHistory: updated }));
                    }}
                    className="w-24 px-2 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
                  >
                    <option value="入学">入学 (Masuk)</option>
                    <option value="卒業">卒業 (Lulus)</option>
                    <option value="在学中">在学中 (Aktif)</option>
                    <option value="中退">中退 (Putus)</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = (formData.educationHistory || []).filter((_, i) => i !== idx);
                      setFormData(prev => ({ ...prev, educationHistory: updated }));
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Pengalaman Kerja & Sertifikat (職歴・資格) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-extrabold text-slate-900">
                  Pengalaman Kerja & Lisensi Sertifikat (職歴・資格)
                </h2>
              </div>
            </div>

            {/* Work History */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-800 text-xs">Riwayat Pekerjaan (職歴):</span>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      workHistory: [
                        ...(prev.workHistory || []),
                        { year: '2024', month: '1', name: 'インドネシア国内企業', status: '入社' }
                      ]
                    }));
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Baris Pekerjaan</span>
                </button>
              </div>

              <div className="space-y-2">
                {(formData.workHistory || []).map((work, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Tahun"
                      value={work.year}
                      onChange={(e) => {
                        const updated = [...(formData.workHistory || [])];
                        updated[idx].year = e.target.value;
                        setFormData(prev => ({ ...prev, workHistory: updated }));
                      }}
                      className="w-20 px-2.5 py-1.5 rounded-xl border border-slate-300 font-mono text-center text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Bln"
                      value={work.month}
                      onChange={(e) => {
                        const updated = [...(formData.workHistory || [])];
                        updated[idx].month = e.target.value;
                        setFormData(prev => ({ ...prev, workHistory: updated }));
                      }}
                      className="w-16 px-2.5 py-1.5 rounded-xl border border-slate-300 font-mono text-center text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Nama Perusahaan / Tempat Kerja"
                      value={work.name}
                      onChange={(e) => {
                        const updated = [...(formData.workHistory || [])];
                        updated[idx].name = e.target.value;
                        setFormData(prev => ({ ...prev, workHistory: updated }));
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
                    />
                    <select
                      value={work.status}
                      onChange={(e) => {
                        const updated = [...(formData.workHistory || [])];
                        updated[idx].status = e.target.value as any;
                        setFormData(prev => ({ ...prev, workHistory: updated }));
                      }}
                      className="w-24 px-2 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
                    >
                      <option value="入社">入社 (Masuk)</option>
                      <option value="退社">退社 (Resign)</option>
                      <option value="現在に至る">現在に至る (Sekarang)</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (formData.workHistory || []).filter((_, i) => i !== idx);
                        setFormData(prev => ({ ...prev, workHistory: updated }));
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-800 text-xs">Lisensi & Sertifikat (免許・資格):</span>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      certifications: [
                        ...(prev.certifications || []),
                        { year: '2026', month: '4', name: '国際交流基金日本語基礎テスト (JFT-Basic A2) 合格' }
                      ]
                    }));
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Sertifikat</span>
                </button>
              </div>

              <div className="space-y-2">
                {(formData.certifications || []).map((lic, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Tahun"
                      value={lic.year}
                      onChange={(e) => {
                        const updated = [...(formData.certifications || [])];
                        updated[idx].year = e.target.value;
                        setFormData(prev => ({ ...prev, certifications: updated }));
                      }}
                      className="w-20 px-2.5 py-1.5 rounded-xl border border-slate-300 font-mono text-center text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Bln"
                      value={lic.month}
                      onChange={(e) => {
                        const updated = [...(formData.certifications || [])];
                        updated[idx].month = e.target.value;
                        setFormData(prev => ({ ...prev, certifications: updated }));
                      }}
                      className="w-16 px-2.5 py-1.5 rounded-xl border border-slate-300 font-mono text-center text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Nama Sertifikasi / Lisensi (e.g. JFT-Basic A2, JLPT, SIM)"
                      value={lic.name}
                      onChange={(e) => {
                        const updated = [...(formData.certifications || [])];
                        updated[idx].name = e.target.value;
                        setFormData(prev => ({ ...prev, certifications: updated }));
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (formData.certifications || []).filter((_, i) => i !== idx);
                        setFormData(prev => ({ ...prev, certifications: updated }));
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 6: Harapan Pelamar & Catatan LPK (本人希望記入欄) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Award className="w-5 h-5 text-purple-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Kolom Keinginan Pelamar di Jepang (本人希望記入欄)
              </h2>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Harapan Pekerjaan, Lokasi, dan Gaji di Jepang (Bahasa Jepang)
              </label>
              <textarea
                rows={4}
                value={formData.personalPreferences || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, personalPreferences: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-sans leading-relaxed"
                placeholder="【希望職種】 介護職（特定技能1号）&#10;【希望勤務地】 関東、中部、関西地方&#10;【希望給与】 貴社の規定に従います。"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Catatan Internal Admin / LPK</label>
              <textarea
                rows={2}
                value={formData.notes || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                placeholder="Catatan kemajuan siswa, rekomendasi pembina asrama, nomor paspor, dll."
              />
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleBackToList}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => handleSaveStudent(undefined, true)}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-orange-500/20 transition cursor-pointer disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              <span>Simpan & Buka CV 履歴書</span>
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Data Siswa'}</span>
            </button>
          </div>

        </form>

      </div>
    );
  }

  // ==========================================
  // VIEW MODE: DAFTAR CALON SISWA (LIST)
  // ==========================================
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Database Siswa & CV Standar Jepang</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Data Calon Siswa & Cetak CV 履歴書
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1 leading-relaxed">
            Daftarkan siswa baru dari panel admin, kelola profil peserta pelatihan ke Jepang, dan ekspor langsung menjadi <strong>CV Standar Jepang (履歴書 JIS A4 2-Halaman)</strong> siap cetak / PDF.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0 flex-wrap">
          <button
            onClick={exportToCSV}
            className="px-4 py-3 rounded-2xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV ({applicants.length})</span>
          </button>

          <button
            onClick={() => handleOpenForm()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/25 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Daftarkan Siswa Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari nama siswa, nomor WhatsApp, atau kecamatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-700 font-medium"
          >
            <option value="all">Semua Status ({applicants.length})</option>
            <option value="baru">Baru Terdaftar ({applicants.filter(a => a.status === 'baru').length})</option>
            <option value="terjadwal_seleksi">Terjadwal Seleksi</option>
            <option value="sedang_pelatihan">Sedang Pelatihan</option>
            <option value="lolos_wawancara">Lolos Wawancara (User)</option>
            <option value="selesai">Selesai / Siap Terbang</option>
            <option value="ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span>Memuat data pendaftar...</span>
          </div>
        ) : filteredApplicants.length === 0 ? (
          <div className="py-20 text-center text-xs text-slate-500 space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">Belum ada data pendaftar yang cocok.</p>
            <button
              onClick={() => handleOpenForm()}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Daftarkan Siswa Sekarang</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 font-bold">Foto & Siswa</th>
                  <th className="py-3 px-4 font-bold">Kontak & Domisili</th>
                  <th className="py-3 px-4 font-bold">Fisik & Pendidikan</th>
                  <th className="py-3 px-4 font-bold">Program Minat</th>
                  <th className="py-3 px-4 font-bold">Status LPK</th>
                  <th className="py-3 px-4 font-bold text-right">Aksi & Ekspor CV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition">
                    
                    {/* Photo & Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-13 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                          {app.photoUrl ? (
                            <img src={app.photoUrl} alt={app.fullName} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 text-sm">
                            {app.fullName}
                          </div>
                          {app.katakanaName && (
                            <p className="text-[11px] text-blue-700 font-sans">
                              {app.katakanaName}
                            </p>
                          )}
                          <p className="text-[11px] text-slate-400">
                            {app.age} th ({app.gender})
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact & Address */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1.5 text-slate-900 font-medium">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{app.phoneWhatsapp}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[180px]" title={app.fullAddress || app.originDistrict}>
                        {app.fullAddress || `${app.originDistrict}, ${app.originRegency}`}
                      </div>
                    </td>

                    {/* Physical & Education */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="font-semibold text-slate-800">
                        {app.lastEducation}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {app.heightCm} cm • {app.weightKg} kg • Gol. {app.bloodType || 'O'}
                      </div>
                    </td>

                    {/* Program */}
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px] block w-fit mb-1">
                        {app.interestedProgram.replace('prog-', '').toUpperCase()}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Level: {app.japaneseLevel}
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
                        <option value="baru">Baru Terdaftar</option>
                        <option value="terjadwal_seleksi">Terjadwal Seleksi</option>
                        <option value="sedang_pelatihan">Sedang Pelatihan</option>
                        <option value="lolos_wawancara">Lolos Wawancara (User)</option>
                        <option value="selesai">Selesai / Terbang</option>
                        <option value="ditolak">Ditolak</option>
                      </select>
                    </td>

                    {/* Actions: Export CV, Edit, WA, Delete */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* EXPORT CV (RIREKISHO) BUTTON */}
                        <button
                          onClick={() => handleOpenCV(app)}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                          title="Buka & Cetak CV Standar Jepang (履歴書)"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Cetak CV 履歴書</span>
                        </button>

                        <button
                          onClick={() => handleOpenForm(app)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                          title="Edit Data Lengkap"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={`https://wa.me/${app.phoneWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo ${app.fullName}, kami dari Tim LPK Indra Wijaya Indramayu terkait pendaftaran pelatihan ke Jepang Anda...`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
                          title="Hubungi via WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => handleDelete(app.id)}
                          className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* RIREKISHO CV MODAL / PRINT VIEW */}
      {cvModalApplicant && (
        <RirekishoCVModal
          applicant={cvModalApplicant}
          isOpen={isCvModalOpen}
          onClose={() => {
            setIsCvModalOpen(false);
            setCvModalApplicant(null);
          }}
        />
      )}

    </div>
  );
}

// ==========================================
// HELPER UTILITIES
// ==========================================

function calculateAge(birthDateStr: string): number {
  if (!birthDateStr) return 22;
  const birth = new Date(birthDateStr);
  const diff = Date.now() - birth.getTime();
  return Math.max(18, Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)));
}

function convertIndonesianToKatakana(name: string): string {
  if (!name) return '';
  const dict: Record<string, string> = {
    'a': 'ア', 'i': 'イ', 'u': 'ウ', 'e': 'エ', 'o': 'オ',
    'ka': 'カ', 'ki': 'キ', 'ku': 'ク', 'ke': 'ケ', 'ko': 'コ',
    'sa': 'サ', 'shi': 'シ', 'si': 'シ', 'su': 'ス', 'se': 'セ', 'so': 'ソ',
    'ta': 'タ', 'chi': 'チ', 'ti': 'チ', 'tsu': 'ツ', 'tu': 'ツ', 'te': 'テ', 'to': 'ト',
    'na': 'ナ', 'ni': 'ニ', 'nu': 'ヌ', 'ne': 'ネ', 'no': 'ノ',
    'ha': 'ハ', 'hi': 'ヒ', 'fu': 'フ', 'hu': 'フ', 'he': 'ヘ', 'ho': 'ホ',
    'ma': 'マ', 'mi': 'ミ', 'mu': 'ム', 'me': 'メ', 'mo': 'モ',
    'ya': 'ヤ', 'yu': 'ユ', 'yo': 'ヨ',
    'ra': 'ラ', 'ri': 'リ', 'ru': 'ル', 're': 'レ', 'ro': 'ロ',
    'wa': 'ワ', 'wo': 'ヲ', 'n': 'ン',
    'ga': 'ガ', 'gi': 'ギ', 'gu': 'グ', 'ge': 'ゲ', 'go': 'ゴ',
    'za': 'ザ', 'ji': 'ジ', 'zi': 'ジ', 'zu': 'ズ', 'ze': 'ゼ', 'zo': 'ゾ',
    'da': 'ダ', 'di': 'ディ', 'de': 'デ', 'do': 'ド',
    'ba': 'バ', 'bi': 'ビ', 'bu': 'ブ', 'be': 'ベ', 'bo': 'ボ',
    'pa': 'パ', 'pi': 'ピ', 'pu': 'プ', 'pe': 'ペ', 'po': 'ポ',
    'fa': 'ファ', 'fi': 'フィ', 'fe': 'フェ', 'fo': 'フォ',
    'dwi': 'ドウィ', 'tri': 'トリ', 'adi': 'アディ', 'putra': 'プトラ', 'putri': 'プトリ',
    'siti': 'シティ', 'agus': 'アグス', 'nurul': 'ヌルル', 'dimas': 'ディマス', 'rizky': 'リズキ'
  };

  const words = name.toLowerCase().split(/\s+/);
  const convertedWords = words.map(w => {
    let result = '';
    let i = 0;
    while (i < w.length) {
      if (i + 4 <= w.length && dict[w.substr(i, 4)]) {
        result += dict[w.substr(i, 4)];
        i += 4;
      } else if (i + 3 <= w.length && dict[w.substr(i, 3)]) {
        result += dict[w.substr(i, 3)];
        i += 3;
      } else if (i + 2 <= w.length && dict[w.substr(i, 2)]) {
        result += dict[w.substr(i, 2)];
        i += 2;
      } else if (dict[w[i]]) {
        result += dict[w[i]];
        i += 1;
      } else {
        result += w[i].toUpperCase();
        i += 1;
      }
    }
    return result;
  });

  return convertedWords.join('・');
}
