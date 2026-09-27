"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { Building2, ShieldCheck, HeartPulse, UserCheck, ArrowRight, FileCheck, Award } from 'lucide-react';

interface JapanPartnerSectionProps {
  onOpenPartnerModal: () => void;
}

export default function JapanPartnerSection({ onOpenPartnerModal }: JapanPartnerSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="mitra-jepang" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Japanese Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t("partner.section_badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
            {t("partner.section_title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {t("partner.intro")}
          </p>
        </div>

        {/* 3 Strong Japanese Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-xs">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-5">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {t("partner.point1_title")}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t("partner.point1_desc")}
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-5">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {t("partner.point2_title")}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t("partner.point2_desc")}
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {t("partner.point3_title")}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t("partner.point3_desc")}
            </p>
          </div>

        </div>

        {/* Action Banner for Kumiai & Companies */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-800/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>インドネシア労働省公認 送出し機関（SO）</span>
            </div>
            <h4 className="text-lg sm:text-xl font-extrabold text-white">
              オンライン面接・現地視察・求人オーダーを随時受付中
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              特定技能（介護・農業・外食・飲食料品製造・建設）及び技能実習生の推薦はお任せください。
            </p>
          </div>

          <button
            onClick={onOpenPartnerModal}
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-500/30 transition flex items-center gap-2 cursor-pointer"
          >
            <span>{t("partner.cta_inquiry")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
