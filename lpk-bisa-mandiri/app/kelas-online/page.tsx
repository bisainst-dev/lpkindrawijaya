"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SkemaPembayaran from "@/components/SkemaPembayaran";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const highlights = [
  { icon: "🎥", label: "Live Class via Zoom/GMeet", desc: "Belajar langsung bersama guru setiap minggu, interaktif dan real-time" },
  { icon: "🧪", label: "Simulasi JFT-Basic", desc: "Latihan soal JFT yang mirip ujian asli — langsung di platform kami" },
  { icon: "📱", label: "Rekaman Selamanya", desc: "Semua sesi direkam, tonton ulang kapan saja lewat Google Drive" },
  { icon: "📝", label: "Modul & Worksheet", desc: "Materi terstruktur dikirim setiap minggu via Google Drive" },
  { icon: "👥", label: "Grup Belajar WhatsApp", desc: "Komunitas eksklusif untuk tanya jawab dan berbagi pengalaman" },
  { icon: "🏆", label: "Sertifikat Resmi", desc: "Sertifikat kelulusan dari LPK BISA MANDIRI yang terdaftar resmi" },
];

const curriculum = [
  {
    week: "Minggu 1–2",
    title: "Fondasi Bahasa Jepang",
    topics: ["Hiragana & Katakana lengkap", "Cara membaca & menulis", "Kosakata dasar 100 kata"],
    color: "#B71C1C",
  },
  {
    week: "Minggu 3–4",
    title: "Percakapan Sehari-hari",
    topics: ["Salam & perkenalan", "Angka, waktu & tanggal", "Situasi di toko & transportasi"],
    color: "#2563eb",
  },
  {
    week: "Minggu 5–6",
    title: "Grammar Dasar (N5)",
    topics: ["Pola kalimat は・が・を・に", "Kata kerja bentuk て & ない", "Latihan soal JFT level dasar"],
    color: "#065f46",
  },
  {
    week: "Minggu 7–8",
    title: "Persiapan JFT-Basic",
    topics: ["Simulasi soal JFT-Basic", "Strategi menjawab cepat", "Try-out & pembahasan lengkap"],
    color: "#7c3aed",
  },
];

const pricing = [
  {
    id: "basic",
    name: "Basic",
    badge: null,
    price: "299.000",
    period: "/bulan",
    desc: "Cocok untuk pemula yang ingin mulai dari nol",
    color: "#374151",
    bg: "white",
    border: "#e5e7eb",
    features: [
      { text: "6x live class per bulan", included: true },
      { text: "Akses rekaman 30 hari", included: true },
      { text: "Modul PDF mingguan", included: true },
      { text: "Grup belajar WhatsApp", included: true },
      //{ text: "AI Tutor 24/7", included: false },
      { text: "Sertifikat resmi", included: false },
      { text: "Sesi konsultasi 1-on-1", included: false },
    ],
    cta: "Daftar Basic",
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Paling Populer",
    price: "499.000",
    period: "/bulan",
    desc: "Paket terlengkap untuk persiapan JFT-Basic",
    color: "#B71C1C",
    bg: "linear-gradient(135deg, #fff5f5, #fff)",
    border: "#B71C1C",
    features: [
      { text: "12x live class per bulan", included: true },
      { text: "Akses rekaman selamanya", included: true },
      { text: "Modul PDF + worksheet", included: true },
      { text: "Grup belajar WhatsApp", included: true },
      //{ text: "AI Tutor 24/7", included: true },
      { text: "Sertifikat resmi", included: true },
      { text: "Sesi konsultasi 1-on-1", included: false },
    ],
    cta: "Daftar Pro",
  },
  {
    id: "premium",
    name: "Premium",
    badge: null,
    price: "799.000",
    period: "/bulan",
    desc: "Untuk kamu yang serius ingin cepat ke Jepang",
    color: "#7c3aed",
    bg: "white",
    border: "#e5e7eb",
    features: [
      { text: "Live class tak terbatas", included: true },
      { text: "Akses rekaman selamanya", included: true },
      { text: "Modul PDF + worksheet", included: true },
      { text: "Grup belajar WhatsApp", included: true },
      // { text: "AI Tutor 24/7", included: true },
      { text: "Sertifikat resmi", included: true },
      { text: "2x sesi konsultasi 1-on-1", included: true },
    ],
    cta: "Daftar Premium",
  },
];

const faqs = [
  {
    q: "Apakah saya bisa belajar meski belum tahu bahasa Jepang sama sekali?",
    a: "Tentu! Kelas ini dirancang mulai dari nol. Tidak ada persyaratan pengetahuan sebelumnya. Kamu akan belajar dari Hiragana, Katakana, lalu berkembang ke level JFT-Basic.",
  },
  {
    q: "Bagaimana jadwal live class-nya?",
    a: "Live class diadakan 3x seminggu pada malam hari (19.00–21.00 WIB) agar cocok untuk pelajar maupun pekerja. Jadwal lengkap dikirim setelah pendaftaran.",
  },
  {
    q: "Apa yang terjadi jika saya melewatkan live class?",
    a: "Tidak perlu khawatir! Semua sesi live class direkam dan bisa diakses melalui platform kami. Paket Pro & Premium mendapat akses rekaman selamanya.",
  },
  {
    q: "Apakah ada garansi uang kembali?",
    a: "Ya! Kami memberikan garansi uang kembali 7 hari jika kamu merasa kelas ini tidak sesuai ekspektasi. Tidak ada pertanyaan yang perlu dijawab.",
  },
  {
    q: "Bagaimana cara mendaftar dan melakukan pembayaran?",
    a: "Klik tombol Daftar Sekarang, isi formulir, lalu lakukan pembayaran via transfer bank / e-wallet. Akses kelas akan dikirim dalam 1x24 jam setelah pembayaran dikonfirmasi.",
  },
  {
    q: "Apakah sertifikat yang diberikan diakui secara resmi?",
    a: "Sertifikat dikeluarkan oleh LPK BISA MANDIRI yang terdaftar resmi. Sertifikat ini dapat dilampirkan dalam portfolio dan lamaran kerja ke Jepang.",
  },
];

const testimonials = [
  {
    name: "Aulia Rahma",
    role: "Mahasiswi, Purwokerto",
    avatar: "AR",
    color: "#B71C1C",
    text: "Dalam 2 bulan saya sudah bisa baca Hiragana & Katakana dan lulus simulasi JFT. Guru-gurunya sabar banget dan materi sangat mudah dipahami!",
    rating: 5,
  },
  {
    name: "Dimas Prakoso",
    role: "Fresh Graduate, Banjarnegara",
    avatar: "DP",
    color: "#2563eb",
    text: "Kelas online-nya fleksibel banget. Sambil kerja part-time masih bisa ikut. Sekarang sedang proses daftar SSW berkat materi JFT di sini.",
    rating: 5,
  },
  {
    name: "Novia Sari",
    role: "Ibu Rumah Tangga, Kebumen",
    avatar: "NS",
    color: "#065f46",
    text: "Tidak menyangka bisa belajar bahasa Jepang dari rumah seefektif ini. Rekaman kelas sangat membantu karena saya bisa belajar ulang sesuai waktu luang.",
    rating: 5,
  },
];

/* ─────────────────────────────────────────
   HOOKS & SMALL COMPONENTS
───────────────────────────────────────── */
function useVisible(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "rgba(183,28,28,0.08)", border: "1px solid rgba(183,28,28,0.18)",
      borderRadius: 50, padding: "6px 16px", marginBottom: "1rem",
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 900, color: "#1a1a2e",
      lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: "0.75rem",
    }}>
      {children}
    </h2>
  );
}

function Red({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      background: "linear-gradient(135deg,#B71C1C,#ef5350)",
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    }}>
      {children}
    </span>
  );
}

/* Batch Info Banner — mengganti countdown */
function BatchInfo() {
  return (
    <div style={{
      display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap",
    }}>
      {[
        { icon: "📅", label: "Mulai Agustus 2026" },
        { icon: "👥", label: "Maks. 10 Siswa/Batch" },
        { icon: "🎓", label: "Via Zoom & GMeet" },
      ].map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 50, padding: "6px 12px",
        }}>
          <span style={{ fontSize: 13 }}>{item.icon}</span>
          <span style={{ fontSize: 12, color: "white", fontWeight: 600 }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/* FAQ accordion */
function FaqItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid ${open ? "rgba(183,28,28,0.3)" : "#e5e7eb"}`,
      borderRadius: 14, overflow: "hidden",
      boxShadow: open ? "0 4px 20px rgba(183,28,28,0.08)" : "none",
      transition: "all 0.25s ease",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", textAlign: "left", background: open ? "#fff8f8" : "white",
          border: "none", padding: "1.1rem 1.25rem", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 12, fontFamily: "inherit",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a1a2e", lineHeight: 1.4 }}>
          {item.q}
        </span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
          background: open ? "#B71C1C" : "#f3f4f6",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.25s ease",
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
            <path d="M2 4l4 4 4-4" stroke={open ? "white" : "#6b7280"} strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div style={{
        maxHeight: open ? 300 : 0, overflow: "hidden",
        transition: "max-height 0.35s ease",
      }}>
        <div style={{ padding: "0 1.25rem 1.1rem", fontSize: "0.9rem", color: "#4b5563", lineHeight: 1.7 }}>
          {item.a}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function KelasOnlinePage() {
  const [formData, setFormData] = useState({ name: "", phone: "", paket: "pro", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [waLink, setWaLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWaLink(data.studentWaLink || "");
      }
    } catch (err) {
      // Tetap tampilkan sukses meski API error, WA link manual
      console.error(err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  /* section refs */
  const s1 = useVisible();
  const s2 = useVisible();
  const s3 = useVisible();
  const s4 = useVisible();
  const s5 = useVisible();
  const s6 = useVisible();

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", overflowX: "hidden" }}>

      {/* ── STICKY HEADER ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #f3f4f6",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem",
          height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg,#B71C1C,#ef5350)",
              borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 16, color: "white",
            }}>日</div>
            <span style={{ fontWeight: 800, fontSize: 14, color: "#1a1a2e" }}>
              LPK <span style={{ color: "#B71C1C" }}>BISA</span> MANDIRI
            </span>
          </a>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => scrollTo("kurikulum")}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#6b7280", fontFamily: "inherit" }}>
              Kurikulum
            </button>
            <button onClick={() => scrollTo("skema-pembayaran")}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#6b7280", fontFamily: "inherit" }}>
              Skema Bayar
            </button>
            <button onClick={() => scrollTo("harga")}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#6b7280", fontFamily: "inherit" }}>
              Harga
            </button>
            <button onClick={() => scrollTo("daftar")}
              style={{
                background: "#B71C1C", color: "white", border: "none", borderRadius: 8,
                padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>
              Daftar Sekarang
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg,#7f1212 0%,#B71C1C 50%,#c62828 100%)",
        padding: "4rem 1.5rem 3rem", position: "relative", overflow: "hidden",
      }}>
        {/* BG decorations */}
        {["日", "本", "語"].map((c, i) => (
          <div key={i} aria-hidden style={{
            position: "absolute", fontSize: 180, fontWeight: 900,
            color: "rgba(255,255,255,0.04)", userSelect: "none", pointerEvents: "none",
            top: i === 0 ? -40 : i === 1 ? "30%" : undefined,
            bottom: i === 2 ? -20 : undefined,
            left: i === 0 ? "5%" : undefined,
            right: i !== 0 ? `${i * 8}%` : undefined,
          }}>{c}</div>
        ))}

        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3rem", alignItems: "center",
        }} className="kelas-hero-grid">
          <style>{`
            @media(max-width:768px){
              .kelas-hero-grid{ grid-template-columns:1fr !important; gap:2rem !important; }
              .kelas-hero-img{ display:none !important; }
            }
          `}</style>

          {/* Left */}
          <div>
            {/* Urgency banner */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.15)", borderRadius: 50,
              padding: "6px 14px", marginBottom: "1.25rem",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              <span style={{ fontSize: 14 }}>🎌</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>
                Pendaftaran Batch Agustus 2026 · Kelas via Zoom & GMeet · Maks. 10 Siswa
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(1.9rem,5vw,3.2rem)", fontWeight: 900, color: "white",
              lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "1rem",
            }}>
              Kuasai Bahasa Jepang<br />
              <span style={{ color: "#fca5a5" }}>Dari Rumah</span> dalam<br />
              8 Minggu
            </h1>

            <p style={{
              fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.7,
              marginBottom: "1.5rem", maxWidth: 460,
            }}>
              Kelas online interaktif bersama mentor bersertifikat. Belajar dari nol
              hingga siap ujian JFT-Basic — fleksibel, terstruktur, dan terbukti efektif.
            </p>

            {/* Social proof */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex" }}>
                {["AR", "DP", "NS", "BN"].map((a, i) => (
                  <div key={i} style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: `hsl(${i * 60},60%,45%)`,
                    border: "2px solid white", marginLeft: i ? -8 : 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 800, color: "white",
                  }}>{a}</div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", gap: 2 }}>
                  {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: "#fbbf24", fontSize: 13 }}>★</span>)}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
                  Batch perdana — segera buka!
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "1.75rem" }}>
              <button onClick={() => scrollTo("daftar")} style={{
                background: "white", color: "#B71C1C", border: "none",
                borderRadius: 10, padding: "0.9rem 2rem",
                fontWeight: 800, fontSize: "0.95rem", cursor: "pointer",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)", fontFamily: "inherit",
                transition: "transform 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                🚀 Daftar Sekarang — Gratis Konsultasi
              </button>
              <button onClick={() => scrollTo("kurikulum")} style={{
                background: "transparent", color: "white",
                border: "2px solid rgba(255,255,255,0.6)", borderRadius: 10,
                padding: "0.9rem 1.5rem", fontWeight: 700, fontSize: "0.95rem",
                cursor: "pointer", fontFamily: "inherit",
              }}>
                Lihat Kurikulum
              </button>
            </div>

            {/* Batch Info */}
            <BatchInfo />
          </div>

          {/* Right: illustration */}
          <div className="kelas-hero-img" style={{ position: "relative" }}>
            <div style={{
              position: "absolute", inset: -20,
              background: "radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 70%)",
              borderRadius: "50%",
            }} />
            <div style={{
              borderRadius: 24, overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
              position: "relative", zIndex: 1,
              animation: "float 5s ease-in-out infinite",
            }}>
              <Image
                src="/sensei-illustration.png"
                alt="Guru bahasa Jepang mengajar online"
                width={520} height={440}
                priority
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

            {/* Floating cards */}
            <div style={{
              position: "absolute", top: "8%", left: "-10%",
              background: "white", borderRadius: 12, padding: "10px 14px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 2,
              animation: "float 3.5s ease-in-out infinite",
            }}>
              <div style={{ fontWeight: 900, fontSize: 20, color: "#B71C1C" }}>8</div>
              <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>Minggu Program</div>
            </div>
            <div style={{
              position: "absolute", bottom: "12%", right: "-8%",
              background: "white", borderRadius: 12, padding: "10px 14px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 2,
              animation: "float 4.5s ease-in-out infinite 1s",
            }}>
              <div style={{ fontSize: 20, marginBottom: 2 }}>🧪</div>
              <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>Simulasi JFT</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section ref={s1.ref as React.Ref<HTMLElement>} style={{ background: "#f8f8f8", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Chip><span style={{ fontSize: 14 }}>✨</span><span style={{ fontSize: 13, fontWeight: 600, color: "#B71C1C" }}>Yang Kamu Dapatkan</span></Chip>
            <SectionTitle>Semua yang Kamu Butuhkan untuk <Red>Sukses Belajar</Red></SectionTitle>
            <p style={{ fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
              Kami rancang kelas ini agar seefektif mungkin — cocok untuk pelajar, mahasiswa, maupun pekerja.
            </p>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem",
          }} className="highlights-grid">
            <style>{`
              @media(max-width:768px){ .highlights-grid{ grid-template-columns:1fr !important; } }
              @media(min-width:481px) and (max-width:768px){ .highlights-grid{ grid-template-columns:repeat(2,1fr) !important; } }
            `}</style>
            {highlights.map((h, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 16, padding: "1.5rem",
                border: "1px solid #f3f4f6", boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                opacity: s1.visible ? 1 : 0, transform: s1.visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${i * 0.07}s`,
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 28px rgba(183,28,28,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(183,28,28,0.2)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#f3f4f6";
                }}
              >
                <div style={{
                  width: 48, height: 48, background: "rgba(183,28,28,0.08)",
                  borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, marginBottom: "0.85rem",
                }}>{h.icon}</div>
                <div style={{ fontWeight: 800, color: "#1a1a2e", marginBottom: 4, fontSize: "0.95rem" }}>{h.label}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KURIKULUM ── */}
      <section id="kurikulum" ref={s2.ref as React.Ref<HTMLElement>} style={{ background: "white", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Chip><span style={{ fontSize: 14 }}>📚</span><span style={{ fontSize: 13, fontWeight: 600, color: "#B71C1C" }}>Program 8 Minggu</span></Chip>
            <SectionTitle>Kurikulum <Red>Terstruktur & Terbukti</Red></SectionTitle>
            <p style={{ fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
              Dari nol hingga siap ujian JFT-Basic dalam 8 minggu dengan jadwal yang fleksibel.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.25rem" }}
            className="curriculum-grid">
            <style>{`@media(max-width:640px){ .curriculum-grid{ grid-template-columns:1fr !important; } }`}</style>
            {curriculum.map((c, i) => (
              <div key={i} style={{
                borderRadius: 18, padding: "1.5rem",
                background: `${c.color}08`, border: `1px solid ${c.color}22`,
                opacity: s2.visible ? 1 : 0, transform: s2.visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}>
                <div style={{
                  display: "inline-block", background: c.color, color: "white",
                  fontSize: 11, fontWeight: 700, borderRadius: 50, padding: "3px 12px",
                  marginBottom: "0.75rem", letterSpacing: "0.3px",
                }}>{c.week}</div>
                <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#1a1a2e", marginBottom: "0.85rem" }}>
                  {c.title}
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {c.topics.map((t, ti) => (
                    <li key={ti} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#374151" }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: "50%", background: c.color,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
                      }}>
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="harga" ref={s3.ref as React.Ref<HTMLElement>} style={{ background: "#f8f8f8", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Chip><span style={{ fontSize: 14 }}>💰</span><span style={{ fontSize: 13, fontWeight: 600, color: "#B71C1C" }}>Pilih Paketmu</span></Chip>
            <SectionTitle>Harga <Red>Transparan, Nilai Maksimal</Red></SectionTitle>
            <p style={{ fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
              Pilih paket yang sesuai kebutuhan. Semua paket sudah termasuk materi & dukungan mentor.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}
            className="pricing-grid">
            <style>{`@media(max-width:768px){ .pricing-grid{ grid-template-columns:1fr !important; } }`}</style>
            {pricing.map((p, i) => (
              <div key={p.id} style={{
                background: p.bg, border: `2px solid ${p.border}`,
                borderRadius: 20, padding: "2rem 1.5rem",
                boxShadow: p.badge ? "0 12px 36px rgba(183,28,28,0.14)" : "0 4px 16px rgba(0,0,0,0.06)",
                position: "relative", display: "flex", flexDirection: "column", gap: "1.25rem",
                transform: p.badge ? "scale(1.03)" : "scale(1)",
                opacity: s3.visible ? 1 : 0,
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}>
                {p.badge && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: "#B71C1C", color: "white", fontSize: 11, fontWeight: 800,
                    padding: "4px 16px", borderRadius: 50, whiteSpace: "nowrap",
                    boxShadow: "0 4px 12px rgba(183,28,28,0.3)",
                  }}>{p.badge}</div>
                )}

                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem", color: p.color, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{p.desc}</div>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>Rp</span>
                    <span style={{ fontWeight: 900, fontSize: "2rem", color: "#1a1a2e", letterSpacing: "-1px" }}>
                      {p.price}
                    </span>
                    <span style={{ fontSize: 13, color: "#9ca3af" }}>{p.period}</span>
                  </div>
                  {p.badge && (
                    <div style={{ fontSize: 11, color: "#B71C1C", fontWeight: 600, marginTop: 2 }}>
                      🎉 Hemat 30% — Early Bird!
                    </div>
                  )}
                </div>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {p.features.map((f, fi) => (
                    <li key={fi} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                        background: f.included ? p.color : "#e5e7eb",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {f.included
                          ? <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          : <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M3 3l4 4M7 3l-4 4" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" /></svg>
                        }
                      </span>
                      <span style={{ color: f.included ? "#1a1a2e" : "#9ca3af", textDecoration: f.included ? "none" : "line-through" }}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button onClick={() => scrollTo("daftar")} style={{
                  background: p.badge ? "#B71C1C" : "white",
                  color: p.badge ? "white" : p.color,
                  border: `2px solid ${p.color === "#374151" ? "#e5e7eb" : p.color}`,
                  borderRadius: 10, padding: "0.8rem",
                  fontWeight: 800, fontSize: "0.9rem", cursor: "pointer",
                  fontFamily: "inherit", transition: "all 0.2s ease",
                  width: "100%",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = p.color === "#374151" ? "#f9fafb" : p.color;
                    (e.currentTarget as HTMLElement).style.color = p.color === "#374151" ? "#374151" : "white";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = p.badge ? "#B71C1C" : "white";
                    (e.currentTarget as HTMLElement).style.color = p.badge ? "white" : p.color;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {p.cta} →
                </button>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: "1.5rem" }}>
            🔒 Garansi uang kembali 7 hari · Tidak perlu kartu kredit · Batalkan kapan saja
          </p>
        </div>
      </section>

      {/* ── SKEMA PEMBAYARAN ── */}
      <SkemaPembayaran />

      {/* ── TESTIMONIALS ── */}
      <section ref={s4.ref as React.Ref<HTMLElement>} style={{ background: "white", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Chip><span style={{ fontSize: 14 }}>💬</span><span style={{ fontSize: 13, fontWeight: 600, color: "#B71C1C" }}>Cerita Sukses</span></Chip>
            <SectionTitle>Apa Kata <Red>Siswa Kami</Red></SectionTitle>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}
            className="testi-grid">
            <style>{`@media(max-width:768px){ .testi-grid{ grid-template-columns:1fr !important; } }`}</style>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 18, padding: "1.5rem",
                border: "1px solid #f3f4f6", boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                opacity: s4.visible ? 1 : 0, transform: s4.visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}>
                <div style={{ fontSize: 36, color: t.color, opacity: 0.15, lineHeight: 1, marginBottom: -6, fontFamily: "Georgia,serif" }}>"</div>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.75, marginBottom: "1rem", fontStyle: "italic" }}>{t.text}</p>
                <div style={{ display: "flex", gap: 2, marginBottom: "0.85rem" }}>
                  {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: "#f59e0b", fontSize: 13 }}>★</span>)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: "0.85rem", borderTop: "1px solid #f3f4f6" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: `linear-gradient(135deg,${t.color},${t.color}cc)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 800, color: "white", flexShrink: 0,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={s5.ref as React.Ref<HTMLElement>} style={{ background: "#f8f8f8", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Chip><span style={{ fontSize: 14 }}>❓</span><span style={{ fontSize: 13, fontWeight: 600, color: "#B71C1C" }}>Pertanyaan Umum</span></Chip>
            <SectionTitle>Ada yang Ingin <Red>Kamu Tanyakan?</Red></SectionTitle>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((f, i) => (
              <div key={i} style={{
                opacity: s5.visible ? 1 : 0, transform: s5.visible ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.45s ease ${i * 0.06}s`,
              }}>
                <FaqItem item={f} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENROLLMENT FORM ── */}
      <section id="daftar" ref={s6.ref as React.Ref<HTMLElement>} style={{
        background: "linear-gradient(135deg,#7f1212 0%,#B71C1C 60%,#c62828 100%)",
        padding: "3.5rem 1.5rem", position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", right: -60, top: -60, width: 320, height: 320,
          background: "rgba(255,255,255,0.05)", borderRadius: "50%",
        }} />

        <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ fontSize: 44, marginBottom: "0.75rem" }}>🎌</div>
            <h2 style={{
              fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 900, color: "white",
              lineHeight: 1.2, marginBottom: "0.75rem",
            }}>
              Daftar Sekarang &amp;<br />Mulai Perjalananmu!
            </h2>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
              Isi formulir di bawah. Tim kami akan menghubungi kamu dalam 1×24 jam untuk konfirmasi dan panduan selanjutnya.
            </p>
          </div>

          {submitted ? (
            <div style={{
              background: "white", borderRadius: 20, padding: "2rem",
              textAlign: "center", boxShadow: "0 20px 48px rgba(0,0,0,0.2)",
            }}>
              <div style={{ fontSize: 52, marginBottom: "0.75rem" }}>🎉</div>
              <div style={{ fontWeight: 900, fontSize: "1.2rem", color: "#1a1a2e", marginBottom: "0.4rem" }}>
                Pendaftaran Berhasil!
              </div>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                Terima kasih <strong>{formData.name}</strong>!<br />
                Hubungi admin kami sekarang untuk lanjut bayar:
              </p>

              <a
                href={waLink || `https://wa.me/6285157937184?text=${encodeURIComponent(`Halo, saya ${formData.name} baru mendaftar kelas Bahasa Jepang Online paket ${formData.paket}. No WA: ${formData.phone}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "#25d366", color: "white", borderRadius: 12,
                  padding: "0.9rem 1.75rem", textDecoration: "none",
                  fontWeight: 800, fontSize: "0.9rem", marginBottom: "1.25rem",
                  boxShadow: "0 6px 20px rgba(37,211,102,0.35)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat Admin WhatsApp Sekarang
              </a>

              <div style={{ background: "#f8f8f8", borderRadius: 12, padding: "1rem", textAlign: "left" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: "0.6rem" }}>📋 Langkah Selanjutnya:</div>
                {[
                  "Klik tombol hijau di atas untuk chat langsung dengan admin",
                  "Admin kirim nomor rekening & nominal sesuai paket",
                  "Transfer, lalu kirim bukti ke admin",
                  "Akses kelas & grup WhatsApp aktif dalam 2 jam",
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: i < 3 ? "0.4rem" : 0, fontSize: 12, color: "#6b7280" }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#B71C1C", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: "white", borderRadius: 20, padding: "2rem",
              boxShadow: "0 20px 48px rgba(0,0,0,0.2)",
              display: "flex", flexDirection: "column", gap: "1rem",
            }}>
              {[
                { id: "reg-name", key: "name", label: "Nama Lengkap", placeholder: "Masukkan nama lengkap kamu", type: "text", icon: "👤" },
                { id: "reg-phone", key: "phone", label: "Nomor WhatsApp", placeholder: "Contoh: 08123456789", type: "tel", icon: "📱" },
                { id: "reg-email", key: "email", label: "Email (opsional)", placeholder: "email@kamu.com", type: "email", icon: "📧" },
              ].map(field => (
                <div key={field.key}>
                  <label htmlFor={field.id} style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>
                    {field.label}
                  </label>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    border: "2px solid #e5e7eb", borderRadius: 10, overflow: "hidden",
                    transition: "border-color 0.2s",
                  }} className={`input-wrap-${field.key}`}>
                    <style>{`.input-wrap-${field.key}:focus-within{ border-color:#B71C1C !important; }`}</style>
                    <span style={{ paddingLeft: 12, fontSize: 16 }}>{field.icon}</span>
                    <input
                      id={field.id}
                      type={field.type}
                      required={field.key !== "email"}
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                      style={{
                        flex: 1, border: "none", outline: "none", padding: "0.8rem 0.75rem",
                        fontSize: 14, color: "#1a1a2e", background: "transparent", fontFamily: "inherit",
                      }}
                    />
                  </div>
                </div>
              ))}

              <div>
                <label htmlFor="reg-paket" style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>
                  Pilih Paket
                </label>
                <select
                  id="reg-paket"
                  value={formData.paket}
                  onChange={e => setFormData(p => ({ ...p, paket: e.target.value }))}
                  style={{
                    width: "100%", border: "2px solid #e5e7eb", borderRadius: 10,
                    padding: "0.8rem 0.75rem", fontSize: 14, color: "#1a1a2e",
                    background: "white", fontFamily: "inherit", outline: "none", cursor: "pointer",
                  }}
                >
                  <option value="basic">Basic — Rp 299.000/bulan</option>
                  <option value="pro">Pro (Paling Populer) — Rp 499.000/bulan</option>
                  <option value="premium">Premium — Rp 799.000/bulan</option>
                </select>
              </div>

              <button type="submit" disabled={submitting} style={{
                background: "linear-gradient(135deg,#B71C1C,#dc2626)",
                color: "white", border: "none", borderRadius: 10,
                padding: "1rem", fontWeight: 800, fontSize: "1rem",
                cursor: submitting ? "not-allowed" : "pointer",
                fontFamily: "inherit", transition: "all 0.2s ease",
                boxShadow: "0 8px 20px rgba(183,28,28,0.3)",
                opacity: submitting ? 0.8 : 1,
                marginTop: 4,
              }}>
                {submitting ? "⏳ Mendaftarkan..." : "🚀 Daftar Sekarang — Gratis Konsultasi"}
              </button>

              <p style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", margin: 0 }}>
                🔒 Data kamu aman. Tidak ada spam. Tim kami menghubungi via WhatsApp.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "#0f0f1a", color: "rgba(255,255,255,0.5)",
        padding: "1.5rem", textAlign: "center", fontSize: 13,
      }}>
        <span>© {new Date().getFullYear()} LPK BISA MANDIRI · </span>
        <a href="/" style={{ color: "#ef5350", textDecoration: "none", fontWeight: 600 }}>← Kembali ke Beranda</a>
        <span> · </span>
        <a href="https://wa.me/6285157937184" target="_blank" rel="noopener noreferrer"
          style={{ color: "#ef5350", textDecoration: "none", fontWeight: 600 }}>
          WhatsApp Kami
        </a>
      </footer>
    </div>
  );
}
