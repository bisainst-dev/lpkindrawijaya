"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { ProgramItem } from '@/lib/types';
import { 
  HeartHandshake, 
  Sprout, 
  Utensils, 
  HardHat, 
  Languages, 
  Clock, 
  Target, 
  Check, 
  ArrowRight 
} from 'lucide-react';

interface ProgramsSectionProps {
  programs: ProgramItem[];
  onSelectProgramForApply: (programId: string) => void;
}

export default function ProgramsSection({ programs, onSelectProgramForApply }: ProgramsSectionProps) {
  const { t, tObj, tList } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'ssw' | 'intern' | 'language'>('all');

  const filteredPrograms = programs.filter(p => {
    if (!p.active) return false;
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
      case 'Sprout': return <Sprout className="w-6 h-6" />;
      case 'Utensils': return <Utensils className="w-6 h-6" />;
      case 'HardHat': return <HardHat className="w-6 h-6" />;
      case 'Languages': return <Languages className="w-6 h-6" />;
      default: return <Languages className="w-6 h-6" />;
    }
  };

  return (
    <section id="program" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Kurikulum & Jalur Resmi
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            {t("programs.section_title")}
          </h2>
          <p className="mt-2 text-base text-slate-600">
            {t("programs.section_subtitle")}
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl max-w-lg mx-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t("programs.tab_all")}
            </button>
            <button
              onClick={() => setActiveCategory('ssw')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeCategory === 'ssw'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t("programs.tab_ssw")}
            </button>
            <button
              onClick={() => setActiveCategory('intern')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeCategory === 'intern'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t("programs.tab_intern")}
            </button>
            <button
              onClick={() => setActiveCategory('language')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeCategory === 'language'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t("programs.tab_lang")}
            </button>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shadow-xs group-hover:scale-105 transition">
                    {getIcon(prog.icon)}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-slate-100 text-slate-700">
                    {prog.category === 'ssw' ? 'Tokutei Ginou' : prog.category === 'intern' ? 'Magang OTIT' : 'Kelas Intensif'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug group-hover:text-emerald-700 transition">
                  {tObj(prog.title)}
                </h3>

                {/* Duration & Target */}
                <div className="mt-3.5 space-y-1.5 text-xs text-slate-500 border-y border-slate-100 py-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span><strong className="text-slate-700">{t("programs.duration")}:</strong> {tObj(prog.duration)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-slate-400" />
                    <span><strong className="text-slate-700">{t("programs.target")}:</strong> {prog.targetLevel}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tObj(prog.description)}
                </p>

                {/* Key Highlights */}
                <div className="mt-4 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    {t("programs.benefits")}
                  </span>
                  <ul className="space-y-1.5">
                    {tList(prog.highlights).map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onSelectProgramForApply(prog.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{t("programs.apply_btn")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
