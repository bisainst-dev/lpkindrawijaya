"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: "📝",
    value: 500,
    suffix: "+",
    label: "Soal JFT",
    desc: "Bank soal lengkap",
    color: "#B71C1C",
    bg: "rgba(183,28,28,0.07)",
  },
  {
    icon: "🤖",
    value: 24,
    suffix: "/7",
    label: "AI Tutor",
    desc: "Belajar kapan saja",
    color: "#1e40af",
    bg: "rgba(30,64,175,0.07)",
  },
  {
    icon: "👨‍🏫",
    value: 20,
    suffix: "+",
    label: "Mentor Profesional",
    desc: "Bersertifikat resmi",
    color: "#065f46",
    bg: "rgba(6,95,70,0.07)",
  },
  {
    icon: "🖥️",
    value: 1000,
    suffix: "+",
    label: "Siswa Aktif",
    desc: "Online & Offline",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.07)",
  },
];

function useCountUp(target: number, duration: number = 1500, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);

  return count;
}

function StatCard({
  stat,
  index,
  active,
}: {
  stat: (typeof stats)[0];
  index: number;
  active: boolean;
}) {
  const count = useCountUp(stat.value, 1800, active);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "2rem 1.5rem",
        textAlign: "center",
        boxShadow: hovered
          ? `0 20px 40px ${stat.color}20`
          : "0 4px 20px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        cursor: "default",
        border: "1px solid #f3f4f6",
        opacity: active ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          background: stat.bg,
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1rem",
          fontSize: "28px",
          transition: "transform 0.3s ease",
          transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
        }}
      >
        {stat.icon}
      </div>
      <div
        style={{
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: "900",
          color: stat.color,
          lineHeight: 1,
          marginBottom: "0.25rem",
          letterSpacing: "-1px",
        }}
      >
        {count}
        {stat.suffix}
      </div>
      <div
        style={{
          fontSize: "1rem",
          fontWeight: "700",
          color: "#1a1a2e",
          marginBottom: "0.25rem",
        }}
      >
        {stat.label}
      </div>
      <div style={{ fontSize: "13px", color: "#9ca3af", fontWeight: "500" }}>
        {stat.desc}
      </div>
    </div>
  );
}

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "#f8f8f8",
        padding: "3rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
            <span style={{ fontSize: "14px" }}>✨</span>
            <span
              style={{ fontSize: "13px", fontWeight: "600", color: "#B71C1C" }}
            >
              Dipercaya Ribuan Siswa
            </span>
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>
            Platform Terlengkap untuk Perjalanan ke{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B71C1C, #ef5350)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Jepang
            </span>
          </h2>
          <p className="section-subtitle">
            Semua yang kamu butuhkan untuk belajar, berlatih, dan berangkat ke
            Jepang ada di sini.
          </p>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
          className="stats-grid"
        >
          <style>{`
            @media (max-width: 768px) {
              .stats-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 1rem !important;
              }
            }
            @media (max-width: 400px) {
              .stats-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
