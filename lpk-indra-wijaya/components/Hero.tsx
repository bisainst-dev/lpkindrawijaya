"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';
import { CompanyProfile, ArticleGalleryItem } from '@/lib/types';
import { 
  ShieldCheck, 
  ArrowRight, 
  MessageCircle, 
  Building2, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  Calendar, 
  Sparkles,
  X 
} from 'lucide-react';

interface HeroProps {
  company?: CompanyProfile;
  galleryItems?: ArticleGalleryItem[];
  onOpenRegisterModal: () => void;
  onOpenPartnerModal: () => void;
}

const defaultSlides: ArticleGalleryItem[] = [
  {
    id: "hero-slide-1",
    type: "gallery",
    title: {
      id: "Pelepasan 28 Siswa SSW & Magang di Bandara Soekarno-Hatta Menuju Tokyo & Nagoya",
      ja: "第14期生28名・成田および中部国際空港へ向けて堂々の出発セレモニー",
      en: "Official Airport Send-Off of 28 Trainees Departing to Tokyo and Nagoya"
    },
    summary: {
      id: "Momen haru dan bangga keluarga melepas keberangkatan 28 putra-putri berprestasi LPK Indra Wijaya siap berkarier di Jepang.",
      ja: "スカルノ・ハッタ国際空港にて、第14期生28名の日本出発セレモニーを実施。",
      en: "Emotional and proud send-off of 28 qualified trainees departing for their careers in Japan."
    },
    category: "Keberangkatan",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-25",
    published: true
  },
  {
    id: "hero-slide-2",
    type: "gallery",
    title: {
      id: "Pelatihan Fisik, Mental, dan Disiplin (FMD) Bersama Instruktur Bersertifikat di Indramayu",
      ja: "インドラマユ校舎でのFMD（心身規律・体力・礼儀作法）強化訓練風景",
      en: "Rigorous Physical, Mental, and Discipline (FMD) Training Session in Indramayu"
    },
    summary: {
      id: "Membangun ketangguhan fisik, ketepatan waktu, dan etika tata krama khas Jepang agar siswa siap kerja.",
      ja: "時間を厳守する習慣、挨拶、集団行動の調和を養うFMD訓練を実施。",
      en: "Instilling punctuality, team harmony, and physical endurance for Japan workplaces."
    },
    category: "Pelatihan FMD",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
    date: "2026-07-15",
    published: true
  },
  {
    id: "hero-slide-3",
    type: "gallery",
    title: {
      id: "Praktik Simulasi Laboratorium Kaigo (Perawatan Lansia) Standar Panti Jepang",
      ja: "最新の介護実習ベッドを用いた実践的シミュレーション講習風景",
      en: "Practical Eldercare (Kaigo) Simulation Lab Session Matching Japanese Standards"
    },
    summary: {
      id: "Siswa jurusan Kaigo mempraktikkan teknik transfer pasien, komunikasi ramah (Koe Kake), dan higienis.",
      ja: "移乗介助、車椅子操作、声かけコミュニケーション等の実践技術を習得。",
      en: "Trainees practicing patient transfer, empathetic communication (Koe Kake), and safety."
    },
    category: "Simulasi Kaigo",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-05",
    published: true
  },
  {
    id: "hero-slide-4",
    type: "gallery",
    title: {
      id: "Suasana Belajar Bahasa Jepang & Simulasi Wawancara Kerja (Menyetsu) di Kelas",
      ja: "冷房完備の教室で実施される実践的日本語会話および模擬面接授業",
      en: "Intensive Japanese Language & Interview (Menyetsu) Simulation Classes"
    },
    summary: {
      id: "Pembelajaran intensif tata bahasa, kosakata teknis kerja, dan latihan Kaiwa dipandu Sensei alumni Jepang.",
      ja: "文法、専門用語、日常会話の習得に加え模擬面接を熱心に指導。",
      en: "Rigorous Japanese grammar, technical terminology, and conversation drills."
    },
    category: "Kelas Bahasa",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-18",
    published: true
  },
  {
    id: "hero-slide-5",
    type: "gallery",
    title: {
      id: "Kunjungan & Wawancara Direksi Kumiai Jepang di Kampus LPK Lohbener Indramayu",
      ja: "大阪・愛知の受入れ監理団体役員様が来訪・直接面接会を開催",
      en: "Supervising Organization (Kumiai) Leadership Delegation On-Site Interviews in Indramayu"
    },
    summary: {
      id: "Delegasi mitra Jepang meninjau fasilitas kelas ber-AC, baris-berbaris, dan menguji kemampuan bahasa kandidat.",
      ja: "朝礼の規律指導、日本語模擬授業、介護実習室を詳細に視察いただき高く評価。",
      en: "Japanese partners observing daily morning assembly, speech fluency, and discipline."
    },
    category: "Kerjasama Jepang",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-10",
    published: true
  }
];

export default function Hero({ company, galleryItems, onOpenRegisterModal, onOpenPartnerModal }: HeroProps) {
  const { t, tObj } = useLanguage();

  // Combine provided galleryItems with defaults if needed
  const validGallery = (galleryItems && galleryItems.length > 0)
    ? galleryItems.filter(item => item.published)
    : defaultSlides;

  const slides = validGallery.length > 0 ? validGallery : defaultSlides;

  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxItem, setLightboxItem] = useState<ArticleGalleryItem | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play timer for Hero Slideshow
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, slides.length, slideIndex]);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[slideIndex] || slides[0];

  return (
    <section id="beranda" className="relative hero-gradient pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80 overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-10 right-5 -z-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-5 -z-10 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Main Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t("hero.title_prefix")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 underline decoration-orange-400 decoration-wavy decoration-2">
                {t("hero.title_highlight")}
              </span>{" "}
              {t("hero.title_suffix")}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t("hero.subtitle")}
            </p>

            {/* Value Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Legalitas Resmi Kemenaker & Disnaker</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Asrama & Lab Kaigo di Lohbener Indramayu</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Gaji ¥190.000 - ¥250.000 (Rp 20 - 27 Juta)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Transparan, Amanah, Bebas Pungli/Calo</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenRegisterModal}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 transition flex items-center gap-2 cursor-pointer"
              >
                <span>{t("hero.cta_register")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/6281324689900?text=Halo%20Admin%20LPK%20Indra%20Wijaya,%20saya%20tertarik%20mendaftar%20pelatihan%20kerja%20ke%20Jepang.%20Mohon%20info%20syarat%20dan%20jadwal%20seleksi%20terbaru.%20Terima%20kasih!"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 font-bold text-sm sm:text-base transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{t("hero.cta_consult")}</span>
              </a>

              <button
                onClick={onOpenPartnerModal}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-300 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>🇯🇵 {t("hero.cta_partner")}</span>
              </button>
            </div>
          </div>

          {/* Right Column: DOKUMENTASI KEGIATAN SLIDESHOW (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Slideshow Showcase Card */}
              <div 
                className="relative h-[400px] sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 group transition-all duration-300"
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
              >
                {/* Background Image Slide */}
                <img
                  src={currentSlide.imageUrl}
                  alt={tObj(currentSlide.title)}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Gradient Overlay for Maximum Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-slate-950/40 pointer-events-none" />

                {/* Top Overlay Badge & Action Controls */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>{currentSlide.category}</span>
                    </span>
                    <span className="hidden sm:flex px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-emerald-400 backdrop-blur-md border border-white/10 items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Dokumentasi Kegiatan</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Play/Pause Button */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10 hover:bg-slate-900 transition cursor-pointer"
                      title={isPlaying ? "Jeda Slideshow" : "Putar Slideshow"}
                      aria-label="Toggle Play/Pause"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>

                    {/* Zoom / Fullscreen Button */}
                    <button
                      onClick={() => setLightboxItem(currentSlide)}
                      className="p-2 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10 hover:bg-slate-900 transition cursor-pointer"
                      title="Perbesar Foto"
                      aria-label="Perbesar Foto"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Left & Right Slide Navigation Arrows */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-white/85 hover:bg-white text-slate-900 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer z-10 opacity-90 group-hover:opacity-100"
                  aria-label="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-900" />
                </button>

                <button
                  onClick={handleNextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-white/85 hover:bg-white text-slate-900 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer z-10 opacity-90 group-hover:opacity-100"
                  aria-label="Foto Selanjutnya"
                >
                  <ChevronRight className="w-5 h-5 text-slate-900" />
                </button>

                {/* Bottom Caption Card */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent text-white z-10">
                  <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1.5 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-400" />
                      <span>{currentSlide.date}</span>
                    </span>
                    <span className="font-mono font-bold text-orange-400 text-xs">
                      {String(slideIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base lg:text-lg font-black text-white leading-snug drop-shadow-md line-clamp-2">
                    {tObj(currentSlide.title)}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {tObj(currentSlide.summary)}
                  </p>

                  {/* Progress Dots & Link */}
                  <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      {slides.slice(0, 6).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSlideIndex(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            slideIndex === idx
                              ? 'w-6 bg-orange-500'
                              : 'w-1.5 bg-white/40 hover:bg-white/70'
                          }`}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <a
                      href="#galeri"
                      className="text-[11px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition"
                    >
                      <span>Lihat Semua Foto</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Mini Thumbnail Previews Strip */}
              <div className="mt-3 grid grid-cols-4 gap-2">
                {slides.slice(0, 4).map((slide, idx) => {
                  const isActive = slideIndex === idx;
                  return (
                    <button
                      key={slide.id || idx}
                      onClick={() => setSlideIndex(idx)}
                      className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                        isActive
                          ? 'border-emerald-500 ring-2 ring-emerald-500/40 shadow-md scale-102'
                          : 'border-white/80 opacity-70 hover:opacity-100 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={slide.imageUrl}
                        alt={tObj(slide.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition" />
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Key Stats Counter Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                860<span className="text-orange-500">+</span>
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                {t("hero.stat_alumni")}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                58<span className="text-blue-600">+</span>
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                {t("hero.stat_partners")}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                98<span className="text-emerald-600">%</span>
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                {t("hero.stat_pass_rate")}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                8<span className="text-amber-600">+</span>
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                {t("hero.stat_experience")}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal for Fullscreen Photo View */}
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
              aria-label="Tutup"
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
