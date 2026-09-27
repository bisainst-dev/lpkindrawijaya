"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { TestimonialItem } from '@/lib/types';
import { Quote, MapPin, Building2, Calendar, Star } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { t, tObj } = useLanguage();

  return (
    <section id="testimoni" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Bukti Nyata Keberhasilan
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            {t("testi.section_title")}
          </h2>
          <p className="mt-2 text-base text-slate-600">
            {t("testi.section_subtitle")}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Quote className="w-4 h-4" />
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic line-clamp-6">
                  &ldquo;{tObj(testi.quote)}&rdquo;
                </p>
              </div>

              {/* Alumni Profile Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <img
                  src={testi.photoUrl}
                  alt={testi.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/30 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                    {testi.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
                    <MapPin className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                    <span>{tObj(testi.prefecture)}</span>
                  </div>
                  <div className="text-[10px] font-bold text-orange-600 truncate mt-0.5">
                    {testi.origin} • {testi.visaType}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
