"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { UserCheck, BookOpen, Handshake, FileText, Stamp, PlaneTakeoff } from 'lucide-react';

export default function ProcessTimeline() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: <UserCheck className="w-6 h-6 text-emerald-600" />,
      title: t("process.step1_title"),
      desc: t("process.step1_desc"),
      color: "border-emerald-500 bg-emerald-50"
    },
    {
      num: "02",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      title: t("process.step2_title"),
      desc: t("process.step2_desc"),
      color: "border-blue-500 bg-blue-50"
    },
    {
      num: "03",
      icon: <Handshake className="w-6 h-6 text-amber-600" />,
      title: t("process.step3_title"),
      desc: t("process.step3_desc"),
      color: "border-amber-500 bg-amber-50"
    },
    {
      num: "04",
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      title: t("process.step4_title"),
      desc: t("process.step4_desc"),
      color: "border-emerald-500 bg-emerald-50"
    },
    {
      num: "05",
      icon: <Stamp className="w-6 h-6 text-indigo-600" />,
      title: t("process.step5_title"),
      desc: t("process.step5_desc"),
      color: "border-indigo-500 bg-indigo-50"
    },
    {
      num: "06",
      icon: <PlaneTakeoff className="w-6 h-6 text-orange-600" />,
      title: t("process.step6_title"),
      desc: t("process.step6_desc"),
      color: "border-orange-500 bg-orange-50"
    }
  ];

  return (
    <section id="alur" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Alur Terstruktur & Transparan
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            {t("process.section_title")}
          </h2>
          <p className="mt-2 text-base text-slate-600">
            {t("process.section_subtitle")}
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden group hover:-translate-y-1"
            >
              {/* Number Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${step.color} group-hover:scale-105 transition`}>
                  {step.icon}
                </div>
                <span className="text-3xl font-black text-slate-200 font-mono group-hover:text-slate-300 transition">
                  {step.num}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
