"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apa saja syarat umum untuk mengikuti pelatihan dan program ke Jepang di LPK Indra Wijaya?",
      a: "Syarat umum meliputi: Pria/Wanita usia 18-30 tahun (untuk SSW) atau 19-26 tahun (untuk magang), minimal lulusan SMA/SMK sederajat, sehat jasmani dan rohani (tidak memiliki riwayat penyakit berat/menular), tidak bertato, tidak buta warna, dan memiliki komitmen tinggi untuk mematuhi aturan asrama serta etika kerja Jepang."
    },
    {
      q: "Apakah pemula yang belum pernah belajar bahasa Jepang sama sekali bisa mendaftar?",
      a: "Bisa sekali! Kurikulum di LPK Indra Wijaya dirancang mulai dari nol (Hiragana, Katakana, tata bahasa dasar) hingga tingkat JFT-Basic A2 dan JLPT N4/N3. Setiap siswa dibimbing secara bertahap oleh instruktur berpengalaman hingga siap mengikuti ujian dan wawancara dengan perusahaan Jepang."
    },
    {
      q: "Berapa lama waktu pelatihan sebelum diberangkatkan ke Jepang?",
      a: "Rata-rata masa pelatihan intensif di asrama Indramayu memakan waktu 3 sampai 6 bulan, tergantung kesiapan bahasa siswa dan jadwal wawancara (*Menyetsu*) dengan user Jepang. Setelah lolos wawancara, proses penerbitan CoE (Certificate of Eligibility) dari Imigrasi Jepang hingga Visa memerlukan waktu sekitar 2-4 bulan."
    },
    {
      q: "Bagaimana fasilitas asrama di LPK Indra Wijaya Lohbener Indramayu?",
      a: "Asrama kami memiliki gedung terpisah untuk putra dan putri, dilengkapi tempat tidur nyaman, ruang kelas belajar ber-AC, laboratorium simulasi perawat lansia (kaigo bed), sarana latihan fisik dan baris-berbaris (FMD), serta kantin dan akses internet untuk belajar digital."
    },
    {
      q: "Apakah ada skema pembiayaan / dana talangan bagi calon siswa?",
      a: "Ya, LPK Indra Wijaya bekerjasama dengan lembaga perbankan resmi mitra pemerintah (seperti KUR PMI) dan koperasi untuk memberikan kemudahan skema pembiayaan bagi calon siswa yang memenuhi syarat, sehingga kendala biaya awal tidak menghalangi niat tulus untuk berkarier di Jepang. Seluruh rincian biaya dijelaskan secara transparan tanpa biaya siluman."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Tanya Jawab
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            {t("faq.section_title")}
          </h2>
          <p className="mt-2 text-base text-slate-600">
            {t("faq.section_subtitle")}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-emerald-700 transition cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
