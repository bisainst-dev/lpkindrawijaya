"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { JobOrderItem } from '@/lib/types';
import { MapPin, Banknote, Calendar, Users, Home, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

interface JobOrdersSectionProps {
  jobOrders: JobOrderItem[];
  onSelectJobForApply: (jobTitle: string) => void;
}

export default function JobOrdersSection({ jobOrders, onSelectJobForApply }: JobOrdersSectionProps) {
  const { t, tObj, tList } = useLanguage();

  return (
    <section id="lowongan" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Job Orders Resmi Jepang
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              {t("jobs.section_title")}
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              {t("jobs.section_subtitle")}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              ● {jobOrders.filter(j => j.status === 'open').length} Lowongan Terbuka Bulan Ini
            </span>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobOrders.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-slate-300"
            >
              <div>
                {/* Top Sector & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800">
                    {job.sector}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    job.status === 'open'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : job.status === 'interviewing'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {job.status === 'open' 
                      ? t("jobs.status_open") 
                      : job.status === 'interviewing' 
                      ? t("jobs.status_interviewing") 
                      : t("jobs.status_closed")}
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug group-hover:text-emerald-700 transition">
                  {tObj(job.title)}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold text-slate-700">{tObj(job.prefecture)}</span>
                </div>

                {/* Salary Box */}
                <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border border-emerald-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    {t("jobs.salary_label")}
                  </span>
                  <div className="text-lg font-black text-emerald-800 tracking-tight">
                    {job.salaryRangeJpy} <span className="text-xs font-normal text-slate-600">/ bulan</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-0.5">
                    ≈ {job.salaryEstimatedIdr}
                  </div>
                </div>

                {/* Meta details */}
                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Users className="w-3.5 h-3.5" />
                      {t("jobs.quota_label")}:
                    </span>
                    <span className="font-bold text-slate-900">{job.remainingQuota} dari {job.quota} orang</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {t("jobs.deadline_label")}:
                    </span>
                    <span className="font-semibold text-slate-700">{job.deadline}</span>
                  </div>
                </div>

                {/* Facility Badges */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-600">
                  {job.housingProvided && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200">
                      <Home className="w-3 h-3 text-blue-600" />
                      {t("jobs.benefit_housing")}
                    </span>
                  )}
                  {job.insuranceProvided && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {t("jobs.benefit_insurance")}
                    </span>
                  )}
                  {job.overtimeAvailable && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200">
                      <Zap className="w-3 h-3 text-amber-600" />
                      {t("jobs.benefit_ot")}
                    </span>
                  )}
                </div>

                {/* Requirements snippet */}
                <div className="mt-3 text-xs text-slate-500">
                  <ul className="list-disc list-inside space-y-1">
                    {tList(job.requirements).slice(0, 2).map((req, i) => (
                      <li key={i} className="truncate">{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3">
                <button
                  disabled={job.status === 'closed'}
                  onClick={() => onSelectJobForApply(tObj(job.title))}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    job.status === 'closed'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md shadow-orange-500/20'
                  }`}
                >
                  <span>{t("jobs.apply_btn")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
