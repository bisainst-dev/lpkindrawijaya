"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const trustBadges = [
  {
    icon: "👨‍🏫",
    label: "Mentor Berpengalaman",
    desc: "Trainer bersertifikat",
  },
  { icon: "🤖", label: "AI Tutor 24/7", desc: "Siap kapan saja" },
  { icon: "📝", label: "Simulasi JFT", desc: "500+ soal nyata" },
  { icon: "🖥️", label: "Online & Offline", desc: "Fleksibel belajar" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="beranda"
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "72px",
        background:
          "linear-gradient(150deg, #fff 0%, #fef2f2 40%, #fff7f7 70%, #fff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(183,28,28,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-100px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(239,83,80,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Floating Japanese characters */}
      {["日", "本", "語", "学"].map((char, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            fontSize: `${40 + i * 10}px`,
            fontWeight: "900",
            color: "rgba(183,28,28,0.04)",
            pointerEvents: "none",
            top: `${15 + i * 20}%`,
            left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
            right: i % 2 !== 0 ? `${5 + i * 2}%` : undefined,
            userSelect: "none",
          }}
        >
          {char}
        </div>
      ))}

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          width: "100%",
        }}
        className="hero-grid"
      >
        <style>{`
          @media (max-width: 900px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
              text-align: center;
            }
            .hero-badges {
              justify-content: center !important;
            }
            .hero-ctas {
              justify-content: center !important;
            }
            .hero-img-container {
              order: -1;
              max-width: 420px;
              margin: 0 auto;
            }
          }
        `}</style>

        {/* Left: Content */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(183,28,28,0.08)",
              border: "1px solid rgba(183,28,28,0.15)",
              borderRadius: "50px",
              padding: "6px 16px",
              marginBottom: "1.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <span style={{ fontSize: "16px" }}>🌸</span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#B71C1C",
                letterSpacing: "0.3px",
              }}
            >
              Platform Terpadu Bahasa & Karier Jepang
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "900",
              color: "#1a1a2e",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              marginBottom: "1.25rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.65s ease 0.1s",
            }}
          >
            Dari Nol Hingga{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B71C1C, #ef5350)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Kerja di Jepang
            </span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#4b5563",
              lineHeight: 1.7,
              marginBottom: "2rem",
              maxWidth: "520px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.65s ease 0.2s",
            }}
          >
            Belajar Bahasa Jepang, simulasi tes, dan persiapan karier dalam satu
            platform. Dari pemula hingga siap berangkat ke Jepang.
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-ctas"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.65s ease 0.3s",
            }}
          >
            <a
              href="#program"
              id="hero-cta-primary"
              className="btn-primary animate-pulse-ring"
              style={{ fontSize: "15px", padding: "0.9rem 2rem" }}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("program")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              🚀 Mulai Belajar Sekarang
            </a>
            <a
              href="#simulasi"
              id="hero-cta-secondary"
              className="btn-secondary"
              style={{ fontSize: "15px", padding: "0.9rem 2rem" }}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("simulasi")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              📋 Coba BISAJFT Gratis
            </a>
          </div>

          {/* Trust Badges */}
          <div
            className="hero-badges"
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.65s ease 0.4s",
            }}
          >
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "8px 14px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 6px 16px rgba(183,28,28,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.06)";
                }}
              >
                <span style={{ fontSize: "18px" }}>{badge.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#1a1a2e",
                      lineHeight: 1.2,
                    }}
                  >
                    {badge.label}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#9ca3af",
                      fontWeight: "500",
                    }}
                  >
                    {badge.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Illustration */}
        <div
          className="hero-img-container"
          style={{
            position: "relative",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(40px)",
            transition: "all 0.8s ease 0.3s",
          }}
        >
          {/* Decorative circle behind image */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-20px",
              background:
                "radial-gradient(circle, rgba(183,28,28,0.08) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          {/* Stats floating card */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "-5%",
              background: "white",
              borderRadius: "14px",
              padding: "12px 16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              zIndex: 2,
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: "900",
                color: "#B71C1C",
                lineHeight: 1,
              }}
            >
              500+
            </div>
            <div
              style={{ fontSize: "11px", color: "#6b7280", fontWeight: "500" }}
            >
              Soal JFT Latihan
            </div>
          </div>

          {/* Rating floating card */}
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              right: "-5%",
              background: "white",
              borderRadius: "14px",
              padding: "12px 16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              zIndex: 2,
              animation: "float 4s ease-in-out infinite 1s",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginBottom: "2px",
              }}
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} style={{ color: "#f59e0b", fontSize: "14px" }}>
                  ★
                </span>
              ))}
            </div>
            <div
              style={{ fontSize: "11px", color: "#6b7280", fontWeight: "500" }}
            >
              1000+ Siswa Puas
            </div>
          </div>

          <div
            style={{
              animation: "float 5s ease-in-out infinite 0.5s",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 30px 60px rgba(183,28,28,0.15)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Image
              src="/hero-illustration.png"
              alt="Siswa belajar bahasa Jepang bersama di LPK Bisa Mandiri dengan latar Mount Fuji dan sakura"
              width={600}
              height={500}
              priority
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: 0.5,
        }}
      >
        <div
          style={{
            fontSize: "11px",
            color: "#6b7280",
            fontWeight: "500",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </div>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, #B71C1C, transparent)",
          }}
        />
      </div>
    </section>
  );
}
