"use client";

import { useEffect, useRef, useState } from "react";

const ecosystemCards = [
  {
    id: "bisajft",
    emoji: "📋",
    title: "BISAJFT",
    badge: "Populer",
    badgeColor: "#B71C1C",
    description:
      "Simulasi JFT-Basic dengan analisis kemampuan mendalam. Latihan soal nyata dengan timer dan pembahasan lengkap.",
    features: ["500+ soal bank", "Analisis per topik", "Timer real test"],
    btnLabel: "Coba Sekarang",
    btnHref: "#simulasi",
    color: "#B71C1C",
    bg: "linear-gradient(135deg, #fff5f5, #fff)",
    border: "rgba(183,28,28,0.15)",
    iconBg: "rgba(183,28,28,0.1)",
  },
  {
    id: "jlpt",
    emoji: "📝",
    title: "Simulasi JLPT",
    badge: "Baru",
    badgeColor: "#0891b2",
    description:
      "Latihan soal JLPT N5 hingga N2 dengan pembahasan lengkap. Uji kemampuan sebelum ujian resmi JLPT.",
    features: ["N5 hingga N2", "Soal per seksi", "Pembahasan detail"],
    btnLabel: "Coming Soon",
    btnHref: "#simulasi",
    color: "#0891b2",
    bg: "linear-gradient(135deg, #ecfeff, #fff)",
    border: "rgba(8,145,178,0.15)",
    iconBg: "rgba(8,145,178,0.1)",
  },
  {
    id: "belajar",
    emoji: "🈳",
    title: "Belajar Bahasa Jepang",
    badge: null,
    badgeColor: "",
    description:
      "Materi lengkap dari dasar hingga mahir. Hiragana, Katakana, Kanji, Grammar, hingga percakapan sehari-hari.",
    features: ["Dari dasar N5", "Audio native", "Kuis interaktif"],
    btnLabel: "Mulai Belajar",
    btnHref: "#program",
    color: "#065f46",
    bg: "linear-gradient(135deg, #ecfdf5, #fff)",
    border: "rgba(6,95,70,0.15)",
    iconBg: "rgba(6,95,70,0.1)",
  },
  {
    id: "ai-tutor",
    emoji: "🤖",
    title: "AI Tutor Jepang",
    badge: "AI",
    badgeColor: "#7c3aed",
    description:
      "Tanya jawab dan latihan bersama AI Tutor cerdas. Tersedia 24/7 untuk membantu perjalanan belajarmu.",
    features: ["Jawab instan", "Latihan adaptif", "Progress tracking"],
    btnLabel: "Coming Soon",
    btnHref: "#program",
    color: "#7c3aed",
    bg: "linear-gradient(135deg, #f5f3ff, #fff)",
    border: "rgba(124,58,237,0.15)",
    iconBg: "rgba(124,58,237,0.1)",
  },
  {
    id: "karier",
    emoji: "✈️",
    title: "Karier Jepang",
    badge: null,
    badgeColor: "",
    description:
      "Informasi kerja, visa, interview dan keberangkatan. Panduan lengkap dari pendaftaran hingga tiba di Jepang.",
    features: ["Info SSW terbaru", "Panduan visa", "Tips interview"],
    btnLabel: "Jelajahi",
    btnHref: "#karier",
    color: "#c2410c",
    bg: "linear-gradient(135deg, #fff7ed, #fff)",
    border: "rgba(194,65,12,0.15)",
    iconBg: "rgba(194,65,12,0.1)",
  },
];

export default function Ecosystem() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="program"
      ref={ref}
      style={{
        background: "white",
        padding: "3rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(183,28,28,0.08)",
              border: "1px solid rgba(183,28,28,0.15)",
              borderRadius: "50px",
              padding: "6px 16px",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: "14px" }}>🏆</span>
            <span
              style={{ fontSize: "13px", fontWeight: "600", color: "#B71C1C" }}
            >
              5 Platform Unggulan
            </span>
          </div>
          <h2
            className="section-title"
            style={{ marginBottom: "0.75rem" }}
            id="ekosistem-heading"
          >
            Ekosistem{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B71C1C, #ef5350)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              LPK BISA MANDIRI
            </span>
          </h2>
          <p className="section-subtitle">
            Satu platform, banyak solusi. Semua yang kamu butuhkan untuk
            persiapan bahasa dan karier Jepang.
          </p>
        </div>

        {/* Cards Grid — 5 kartu, center */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 210px))",
            gap: "1rem",
            justifyContent: "center",
          }}
          className="ecosystem-grid"
        >
          <style>{`
            @media (max-width: 1200px) {
              .ecosystem-grid { grid-template-columns: repeat(3, minmax(0, 220px)) !important; }
            }
            @media (max-width: 720px) {
              .ecosystem-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            }
            @media (max-width: 420px) {
              .ecosystem-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {ecosystemCards.map((card, i) => (
            <EcosystemCard
              key={card.id}
              card={card}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemCard({
  card,
  index,
  visible,
}: {
  card: (typeof ecosystemCards)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={`ecosystem-card-${card.id}`}
      style={{
        background: card.bg,
        border: `1px solid ${hovered ? card.color + "40" : card.border}`,
        borderRadius: "16px",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        cursor: "default",
        transition: "all 0.3s ease",
        transform: hovered
          ? "translateY(-6px)"
          : visible
            ? "translateY(0)"
            : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
        boxShadow: hovered
          ? `0 16px 32px ${card.color}18`
          : "0 2px 12px rgba(0,0,0,0.04)",
        height: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon + Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            background: card.iconBg,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            transition: "transform 0.3s ease",
            transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
            flexShrink: 0,
          }}
        >
          {card.emoji}
        </div>
        {card.badge && (
          <span
            style={{
              background: card.badgeColor,
              color: "white",
              fontSize: "10px",
              fontWeight: "700",
              padding: "2px 8px",
              borderRadius: "50px",
              letterSpacing: "0.5px",
              flexShrink: 0,
            }}
          >
            {card.badge}
          </span>
        )}
      </div>

      {/* Title & Desc */}
      <div>
        <h3
          style={{
            fontSize: "0.95rem",
            fontWeight: "800",
            color: "#1a1a2e",
            marginBottom: "0.35rem",
            lineHeight: 1.3,
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            lineHeight: 1.6,
          }}
        >
          {card.description}
        </p>
      </div>

      {/* Features */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
        {card.features.map((f, fi) => (
          <li
            key={fi}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "#374151",
              fontWeight: "500",
            }}
          >
            <span
              style={{
                width: "15px",
                height: "15px",
                background: card.color,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5l2 2 4-4"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={card.btnHref}
        id={`ecosystem-btn-${card.id}`}
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          background: hovered ? card.color : "white",
          color: hovered ? "white" : card.color,
          border: `2px solid ${card.color}`,
          borderRadius: "8px",
          padding: "0.55rem 0.75rem",
          fontSize: "12px",
          fontWeight: "700",
          textDecoration: "none",
          transition: "all 0.25s ease",
        }}
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById(card.btnHref.replace("#", ""))
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {card.btnLabel}
        <svg
          width="12"
          height="12"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            transition: "transform 0.2s ease",
            transform: hovered ? "translateX(3px)" : "translateX(0)",
          }}
        >
          <path
            d="M2 7h10M7 2l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
