"use client";

import { useEffect, useRef, useState } from "react";

const roadmapSteps = [
  {
    step: 1,
    title: "Belajar Dasar",
    desc: "Hiragana, Katakana & kosakata dasar",
    icon: "📖",
    duration: "1-2 bulan",
    color: "#B71C1C",
  },
  {
    step: 2,
    title: "Kuasai Bahasa Jepang",
    desc: "Grammar N5-N4, percakapan sehari-hari",
    icon: "🗣️",
    duration: "2-3 bulan",
    color: "#dc2626",
  },
  {
    step: 3,
    title: "Simulasi BISAJFT",
    desc: "Latihan soal intensif dengan analisis AI",
    icon: "🎯",
    duration: "1 bulan",
    color: "#ef4444",
  },
  {
    step: 4,
    title: "Lulus JFT-Basic",
    desc: "Ujian resmi Japan Foundation Test",
    icon: "🏆",
    duration: "Ujian resmi",
    color: "#f97316",
  },
  {
    step: 5,
    title: "Program SSW",
    desc: "Persiapan Specified Skilled Worker",
    icon: "📋",
    duration: "1-2 bulan",
    color: "#eab308",
  },
  {
    step: 6,
    title: "Berangkat ke Jepang",
    desc: "Wujudkan impianmu bekerja di Jepang!",
    icon: "✈️",
    duration: "Tujuan akhir",
    color: "#22c55e",
  },
];

export default function Roadmap() {
  const ref = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % roadmapSteps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section
      id="roadmap"
      ref={ref}
      style={{
        background: "#f8f8f8",
        padding: "3rem 1.5rem",
        overflow: "hidden",
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
            <span style={{ fontSize: "14px" }}>🗺️</span>
            <span
              style={{ fontSize: "13px", fontWeight: "600", color: "#B71C1C" }}
            >
              6 Langkah Sukses
            </span>
          </div>
          <h2
            className="section-title"
            style={{ marginBottom: "0.75rem" }}
            id="roadmap-heading"
          >
            Jalur Belajar Menuju{" "}
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
            Ikuti jalur belajar terstruktur kami. Dari nol hingga siap berangkat
            ke Jepang dalam waktu 6-12 bulan.
          </p>
        </div>

        {/* Timeline — horizontal scroll on mobile */}
        <div
          className="no-scrollbar"
          style={{
            overflowX: "auto",
            paddingBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0",
              minWidth: "900px",
              position: "relative",
              padding: "2rem 0 1rem",
            }}
          >
            {/* Connecting line */}
            <div
              style={{
                position: "absolute",
                top: "calc(2rem + 36px)",
                left: "calc(100% / 12)",
                right: "calc(100% / 12)",
                height: "3px",
                background: "#e5e7eb",
                zIndex: 0,
              }}
            />
            {/* Progress line */}
            <div
              style={{
                position: "absolute",
                top: "calc(2rem + 36px)",
                left: "calc(100% / 12)",
                height: "3px",
                background: "linear-gradient(to right, #B71C1C, #ef5350)",
                zIndex: 1,
                transition: "width 0.5s ease",
                width: visible
                  ? `${(activeStep / (roadmapSteps.length - 1)) * (100 - 100 / 6)}%`
                  : "0%",
              }}
            />

            {roadmapSteps.map((step, i) => {
              const isActive = i <= activeStep;
              const isCurrent = i === activeStep;

              return (
                <div
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 2,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${i * 0.08}s`,
                  }}
                >
                  {/* Step circle */}
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background: isActive
                        ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)`
                        : "white",
                      border: `3px solid ${isActive ? step.color : "#e5e7eb"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      transition: "all 0.4s ease",
                      boxShadow: isCurrent
                        ? `0 0 0 6px ${step.color}25, 0 8px 20px ${step.color}30`
                        : isActive
                        ? `0 4px 12px ${step.color}30`
                        : "0 2px 8px rgba(0,0,0,0.08)",
                      transform: isCurrent ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* Step info */}
                  <div style={{ textAlign: "center", padding: "0 4px" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: isActive ? step.color : "#9ca3af",
                        letterSpacing: "0.5px",
                        marginBottom: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      Langkah {step.step}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "800",
                        color: isActive ? "#1a1a2e" : "#6b7280",
                        marginBottom: "4px",
                        lineHeight: 1.3,
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.desc}
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        background: isActive
                          ? `${step.color}12`
                          : "rgba(0,0,0,0.04)",
                        borderRadius: "50px",
                        padding: "3px 10px",
                      }}
                    >
                      <span style={{ fontSize: "10px" }}>⏱️</span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: isActive ? step.color : "#9ca3af",
                        }}
                      >
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a
            href="#program"
            className="btn-primary"
            id="roadmap-cta"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("program")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            🚀 Mulai Perjalananmu Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
