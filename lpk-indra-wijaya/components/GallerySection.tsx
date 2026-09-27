"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';
import { ArticleGalleryItem } from '@/lib/types';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  X, 
  LayoutGrid, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';

interface GallerySectionProps {
  items: ArticleGalleryItem[];
}

export default function GallerySection({ items }: GallerySectionProps) {
  const { t, tObj } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [lightboxItem, setLightboxItem] = useState<ArticleGalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'slideshow' | 'grid'>('slideshow');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter items based on published status and category
  const filteredItems = items.filter(item => {
    if (!item.published) return false;
    if (selectedCategory === 'all') return true;
    return item.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  // Reset index when category filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Slideshow auto-play effect
  useEffect(() => {
    if (!isPlaying || filteredItems.length <= 1 || viewMode !== 'slideshow') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, filteredItems.length, viewMode, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const currentSlide = filteredItems[currentIndex] || filteredItems[0];

  return (
    <section id="galeri" className="py-20 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      {/* Subtle Background Accent Blurs */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t("gallery.section_badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t("gallery.section_title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t("gallery.section_subtitle")}
          </p>

          {/* Controls Bar: Categories & View Mode */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t("gallery.filter_all")}
              </button>
              <button
                onClick={() => setSelectedCategory('keberangkatan')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === 'keberangkatan'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t("gallery.filter_departure")}
              </button>
              <button
                onClick={() => setSelectedCategory('pelatihan')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === 'pelatihan'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t("gallery.filter_training")}
              </button>
              <button
                onClick={() => setSelectedCategory('jepang')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === 'jepang'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t("gallery.filter_japan")}
              </button>
            </div>

            {/* View Mode Toggle: Slideshow vs Grid */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-center sm:self-auto">
              <button
                onClick={() => setViewMode('slideshow')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'slideshow'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Tampilan Slideshow"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Slideshow</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Tampilan Grid Semua Foto"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid Foto</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: INTERACTIVE SLIDESHOW (FEATURED PHOTO CAROUSEL) */}
        {/* ========================================================= */}
        {viewMode === 'slideshow' && filteredItems.length > 0 && currentSlide && (
          <div className="space-y-6">
            
            {/* Main Slide Card Container */}
            <div 
              className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950 group"
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              {/* Slide Background Image */}
              <img
                src={currentSlide.imageUrl}
                alt={tObj(currentSlide.title)}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Top Navigation & Status Bar inside the Slide */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-500 text-white shadow-md">
                    {currentSlide.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-slate-300 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-orange-400" />
                    <span>{currentSlide.date}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Play/Pause Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10 hover:bg-slate-900 transition cursor-pointer"
                    title={isPlaying ? t("gallery.slideshow_pause") : t("gallery.slideshow_autoplay")}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
                  </button>

                  {/* Zoom Fullscreen Button */}
                  <button
                    onClick={() => setLightboxItem(currentSlide)}
                    className="p-2 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10 hover:bg-slate-900 transition cursor-pointer"
                    title={t("gallery.view_full")}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Left & Right Slide Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer opacity-90 group-hover:opacity-100"
                aria-label={t("gallery.slideshow_prev")}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer opacity-90 group-hover:opacity-100"
                aria-label={t("gallery.slideshow_next")}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
              </button>

              {/* Bottom Caption & Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent text-white">
                <div className="max-w-3xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-orange-400">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-slate-400">• Dokumentasi Otentik LPK</span>
                  </div>

                  <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-snug drop-shadow-md">
                    {tObj(currentSlide.title)}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {tObj(currentSlide.summary)}
                  </p>
                </div>
              </div>

            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="text-xs font-bold text-slate-500">
                <span>Pilih Foto Dokumentasi ({filteredItems.length} Foto):</span>
              </div>

              {/* Slide Progress Dots */}
              <div className="flex items-center gap-1.5">
                {filteredItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'w-7 bg-orange-500'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Buka slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {filteredItems.map((item, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative rounded-2xl overflow-hidden border-2 text-left transition-all duration-200 cursor-pointer aspect-video group ${
                      isActive
                        ? 'border-emerald-600 ring-2 ring-emerald-500/40 scale-102 shadow-md'
                        : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={tObj(item.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] font-bold text-white truncate drop-shadow-xs">
                        {tObj(item.title)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: FULL GRID OF ALL PHOTOS */}
        {/* ========================================================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div 
                  className="relative aspect-video overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => setLightboxItem(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={tObj(item.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {item.category}
                  </div>
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition line-clamp-2">
                      {tObj(item.title)}
                    </h3>

                    <p className="mt-2 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {tObj(item.summary)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* LIGHTBOX MODAL: FULL RESOLUTION PHOTO PREVIEW */}
      {/* ========================================================= */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxItem(null)}
        >
          <div 
            className="bg-slate-900 rounded-3xl max-w-4xl w-full overflow-hidden border border-slate-800 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-950 transition cursor-pointer border border-white/10"
              aria-label={t("gallery.close_modal")}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Full Image */}
            <div className="relative aspect-video max-h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxItem.imageUrl}
                alt={tObj(lightboxItem.title)}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Lightbox Caption */}
            <div className="p-6 sm:p-8 space-y-2 text-white bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-500 text-white">
                  {lightboxItem.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lightboxItem.date}</span>
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white">
                {tObj(lightboxItem.title)}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {tObj(lightboxItem.summary)}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
