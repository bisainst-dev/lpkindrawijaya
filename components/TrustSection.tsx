"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { CompanyProfile } from '@/lib/types';
import { ShieldCheck, FileCheck, CheckCircle2, Home, Award, Globe2, Building } from 'lucide-react';

interface TrustSectionProps {
  company: CompanyProfile;
}

export default function TrustSection({ company }: TrustSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="legalitas" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Kredibilitas & Legalitas Resmi Pemerintah</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("trust.title")}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t("trust.subtitle")}
          </p>
        </div>

        {/* License Credentials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* SO Kemenaker */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("trust.so_label")}
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1 font-mono tracking-tight">
              {company.soLicenseNumber}
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Surat Keputusan Resmi Ditjen Binapenta & PKK Kementerian Ketenagakerjaan Republik Indonesia sebagai Lembaga Pengirim (Sending Organization).
            </p>
          </div>

          {/* Disnaker Indramayu */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Building className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("trust.disnaker_label")}
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1 font-mono tracking-tight">
              {company.disnakerLicenseNumber}
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Izin Operasional Lembaga Pelatihan Kerja Resmi dari Dinas Tenaga Kerja Kabupaten Indramayu, Jawa Barat.
            </p>
          </div>

          {/* VIN Kemnaker */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("trust.vin_label")}
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1 font-mono tracking-tight">
              {company.vinNumber}
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Terverifikasi dalam Sistem Informasi Ketenagakerjaan Nasional Kemnaker RI dengan nomor verifikasi kelembagaan resmi.
            </p>
          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-md transition">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{t("trust.feature1_title")}</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t("trust.feature1_desc")}</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-md transition">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Home className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{t("trust.feature2_title")}</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t("trust.feature2_desc")}</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-md transition">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{t("trust.feature3_title")}</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t("trust.feature3_desc")}</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-md transition">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{t("trust.feature4_title")}</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t("trust.feature4_desc")}</p>
          </div>

        </div>

      </div>
    </section>
  );
}
