"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { X, MessageCircle, User, Phone, MapPin, GraduationCap, Copy, Check, Sparkles, Send } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProgram?: string;
  preselectedJob?: string;
}

export default function RegistrationModal({ 
  isOpen, 
  onClose, 
  preselectedProgram = "",
  preselectedJob = ""
}: RegistrationModalProps) {
  const { t } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [phoneWhatsapp, setPhoneWhatsapp] = useState("");
  const [originDistrict, setOriginDistrict] = useState("");
  const [interestedProgram, setInterestedProgram] = useState(
    preselectedProgram || "Tokutei Ginou (SSW) - Caregiver / Perawat Lansia"
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedProgram) {
      setInterestedProgram(preselectedProgram);
    }
    if (preselectedJob) {
      setInterestedProgram(`Lowongan: ${preselectedJob}`);
    }
  }, [preselectedProgram, preselectedJob]);

  if (!isOpen) return null;

  const generateTemplateMessage = () => {
    const nama = fullName.trim() || "[Nama Lengkap]";
    const wa = phoneWhatsapp.trim() || "[No. WhatsApp]";
    const asal = originDistrict.trim() || "[Kecamatan / Kab. Indramayu]";
    const program = interestedProgram || "[Pilihan Program]";

    return `*FORMULIR PENDAFTARAN PELATIHAN JEPANG*
*LPK INDRA WIJAYA INDRAMAYU*
━━━━━━━━━━━━━━━━━━━━
Halo Admin LPK Indra Wijaya, saya ingin mendaftar pelatihan kerja ke Jepang dengan data berikut:

📝 *Nama Lengkap:* ${nama}
📱 *No. WhatsApp:* ${wa}
📍 *Asal / Kecamatan:* ${asal}
🎯 *Pilihan Program:* ${program}

Mohon informasi mengenai:
1. Persyaratan berkas & fisik
2. Jadwal seleksi / kelas baru di Lohbener
3. Rincian skema pelatihan

Terima kasih!`;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = generateTemplateMessage();
    const waUrl = `https://wa.me/6281324689900?text=${encodeURIComponent(finalMsg)}`;
    window.open(waUrl, '_blank');
    onClose();
  };

  const handleCopy = () => {
    const finalMsg = generateTemplateMessage();
    navigator.clipboard.writeText(finalMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Header */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DAFTAR PELATIHAN ONLINE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Formulir Pendaftaran Pelatihan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Lengkapi 4 data singkat di bawah ini. Pesan akan otomatis diformat rapi dan langsung terhubung ke WhatsApp Admin LPK Indra Wijaya.
            </p>
          </div>

          <form onSubmit={handleSendWhatsApp} className="space-y-4 text-xs sm:text-sm">
            
            {/* Full Name */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                1. Nama Lengkap (Sesuai KTP) *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Ahmad Fauzi"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                2. Nomor WhatsApp Aktif *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={phoneWhatsapp}
                  onChange={(e) => setPhoneWhatsapp(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>
            </div>

            {/* District */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                3. Asal Daerah / Kecamatan *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: Lohbener / Jatibarang / Sindang / Indramayu"
                  value={originDistrict}
                  onChange={(e) => setOriginDistrict(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>
            </div>

            {/* Program Interest */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                4. Pilihan Program Pelatihan
              </label>
              <select
                value={interestedProgram}
                onChange={(e) => setInterestedProgram(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white font-medium"
              >
                <option value="Tokutei Ginou (SSW) - Caregiver / Perawat Lansia">
                  Tokutei Ginou (SSW) - Caregiver / Perawat Lansia (介護)
                </option>
                <option value="Tokutei Ginou (SSW) - Pertanian Modern (Nogyo)">
                  Tokutei Ginou (SSW) - Pertanian Modern & Tanaman (農業)
                </option>
                <option value="Tokutei Ginou (SSW) - Pengolahan Makanan (Shokuhin)">
                  Tokutei Ginou (SSW) - Industri Pengolahan Makanan (飲食料品製造)
                </option>
                <option value="Pemagangan Jepang (Ginou Jisshuusei)">
                  Program Pemagangan Jepang (Ginou Jisshuusei - 技能実習)
                </option>
                <option value="Kelas Intensif Bahasa Jepang (N5-N4) & FMD">
                  Kelas Intensif Bahasa Jepang (N5 - N4) & FMD
                </option>
                <option value="Konsultasi Pemilihan Program / Rekomendasi">
                  Belum Yakin (Konsultasi Pemilihan Program)
                </option>
              </select>
            </div>

            {/* Live Preview Box (Template No. 1) */}
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                  <span>📱 Preview Chat WhatsApp:</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Template'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-sans text-slate-700 whitespace-pre-wrap bg-white p-3 rounded-xl border border-slate-100 leading-relaxed shadow-2xs">
                {generateTemplateMessage()}
              </pre>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Formulir ke WhatsApp Admin</span>
              </button>
            </div>

            <div className="text-[11px] text-center text-slate-400 pt-1 space-y-0.5">
              <p>📍 Kampus LPK: Jl. Raya Pantura No. 128, Lohbener, Indramayu</p>
              <p>Hotline WhatsApp: 0813-2468-9900 (Admin Pendaftaran)</p>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
