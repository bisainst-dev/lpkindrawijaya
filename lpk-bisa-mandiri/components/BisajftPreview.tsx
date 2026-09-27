"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: "⏱️",
    title: "Timer Real Test",
    desc: "Simulasi waktu persis seperti ujian asli",
    color: "#B71C1C",
  },
  {
    icon: "📊",
    title: "Analisis Skor",
    desc: "Laporan detail per kategori soal",
    color: "#2563eb",
  },
  {
    icon: "🤖",
    title: "AI Recommendation",
    desc: "Saran belajar personal dari AI",
    color: "#7c3aed",
  },
  {
    icon: "📈",
    title: "Riwayat Progress",
    desc: "Pantau perkembangan dari waktu ke waktu",
    color: "#065f46",
  },
];

function MockupScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Soal", "Analisis", "Progress"];

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "#f3f4f6",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {["#ef4444", "#eab308", "#22c55e"].map((c, i) => (
          <div
            key={i}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: c,
            }}
          />
        ))}
        <div
          style={{
            flex: 1,
            background: "white",
            borderRadius: "6px",
            padding: "4px 10px",
            fontSize: "11px",
            color: "#9ca3af",
            marginLeft: "8px",
          }}
        >
          bisajft.lpk.binabangsa.com/simulasi
        </div>
      </div>

      {/* App header */}
      <div
        style={{
          background: "#B71C1C",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ color: "white", fontWeight: "800", fontSize: "14px" }}
        >
          BISAJFT Simulasi
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: "8px",
            padding: "4px 10px",
            color: "white",
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          ⏱️ 28:45
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #f3f4f6",
          padding: "0 16px",
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "10px 16px",
              fontSize: "12px",
              fontWeight: activeTab === i ? "700" : "500",
              color: activeTab === i ? "#B71C1C" : "#9ca3af",
              background: "none",
              border: "none",
              borderBottom: activeTab === i ? "2px solid #B71C1C" : "2px solid transparent",
              cursor: "pointer",
              marginBottom: "-2px",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "16px" }}>
        {activeTab === 0 && (
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              Soal 12 dari 45 — Bagian: Kotoba
            </div>
            <div
              style={{
                background: "#fef2f2",
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "10px",
                fontSize: "13px",
                color: "#1a1a2e",
                fontWeight: "600",
                border: "1px solid #fecaca",
              }}
            >
              「きのう」の読み方はどれですか？
            </div>
            {["きのう → きのう", "きのう → こんにち", "きのう → あした", "きのう → おととい"].map(
              (opt, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    marginBottom: "6px",
                    fontSize: "12px",
                    border: "1px solid",
                    borderColor: i === 0 ? "#B71C1C" : "#e5e7eb",
                    background: i === 0 ? "#fef2f2" : "#f9fafb",
                    color: i === 0 ? "#B71C1C" : "#374151",
                    fontWeight: i === 0 ? "600" : "400",
                    cursor: "pointer",
                  }}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </div>
              )
            )}
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <div
              style={{
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "900",
                  color: "#B71C1C",
                }}
              >
                78<span style={{ fontSize: "16px" }}>/100</span>
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                Skor Simulasi Terakhir
              </div>
            </div>
            {[
              { label: "Kotoba", pct: 85, color: "#B71C1C" },
              { label: "Bunpou", pct: 70, color: "#2563eb" },
              { label: "Dokkai", pct: 75, color: "#065f46" },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    marginBottom: "4px",
                    fontWeight: "600",
                  }}
                >
                  <span style={{ color: "#374151" }}>{item.label}</span>
                  <span style={{ color: item.color }}>{item.pct}%</span>
                </div>
                <div
                  style={{
                    height: "6px",
                    background: "#f3f4f6",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${item.pct}%`,
                      background: item.color,
                      borderRadius: "3px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "8px" }}>
              7 hari terakhir
            </div>
            <div style={{ display: "flex", gap: "6px", alignItems: "flex-end", height: "60px" }}>
              {[40, 55, 70, 60, 80, 75, 90].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    background:
                      i === 6
                        ? "linear-gradient(to top, #B71C1C, #ef5350)"
                        : "#fee2e2",
                    borderRadius: "4px 4px 0 0",
                    transition: "height 0.3s ease",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(
                (d, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontSize: "9px",
                      color: "#9ca3af",
                    }}
                  >
                    {d}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BisajftPreview() {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="simulasi"
      ref={ref}
      style={{
        background: "white",
        padding: "3rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
        className="bisajft-grid"
      >
        <style>{`
          @media (max-width: 900px) {
            .bisajft-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>

        {/* Left: Info */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-30px)",
            transition: "all 0.7s ease",
          }}
        >
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
            <span style={{ fontSize: "14px" }}>🎯</span>
            <span
              style={{ fontSize: "13px", fontWeight: "600", color: "#B71C1C" }}
            >
              Simulasi Terbaik untuk JFT-Basic
            </span>
          </div>

          <h2
            className="section-title"
            style={{ marginBottom: "1rem" }}
            id="bisajft-heading"
          >
            Platform{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B71C1C, #ef5350)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              BISAJFT
            </span>{" "}
            Preview
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#6b7280",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            Rasakan pengalaman ujian JFT-Basic yang sesungguhnya. Analisis
            mendalam, rekomendasi AI, dan pantau progress belajarmu setiap hari.
          </p>

          {/* Features */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1rem",
                  background: "#f8f8f8",
                  borderRadius: "12px",
                  border: "1px solid #f3f4f6",
                  transition: "all 0.2s ease",
                  cursor: "default",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: `${i * 0.08 + 0.2}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${f.color}08`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${f.color}20`;
                  (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#f8f8f8";
                  (e.currentTarget as HTMLElement).style.borderColor = "#f3f4f6";
                  (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: `${f.color}15`,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "700",
                      color: "#1a1a2e",
                      marginBottom: "2px",
                      fontSize: "15px",
                    }}
                  >
                    {f.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://lpk.binabangsa.com"
            id="bisajft-cta"
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            🎯 Coba Simulasi Gratis
          </a>
        </div>

        {/* Right: Mockup */}
        <div
          style={{
            position: "relative",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(30px)",
            transition: "all 0.7s ease 0.2s",
          }}
        >
          {/* Background decoration */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-30px",
              background:
                "radial-gradient(circle, rgba(183,28,28,0.06) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          {/* Desktop mockup */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <MockupScreen />
          </div>

          {/* Mobile mockup overlay */}
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              right: "-20px",
              width: "140px",
              background: "white",
              borderRadius: "20px",
              border: "6px solid #1a1a2e",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              overflow: "hidden",
              zIndex: 2,
            }}
          >
            {/* Phone notch */}
            <div
              style={{
                height: "16px",
                background: "#1a1a2e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "4px",
                  background: "#374151",
                  borderRadius: "2px",
                }}
              />
            </div>
            <div style={{ padding: "8px" }}>
              <div
                style={{
                  background: "#B71C1C",
                  borderRadius: "6px",
                  padding: "6px 8px",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  BISAJFT Mobile
                </div>
                <div
                  style={{ fontSize: "7px", color: "rgba(255,255,255,0.7)" }}
                >
                  ⏱️ 28:45
                </div>
              </div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    height: "6px",
                    background: i === 1 ? "#fef2f2" : "#f3f4f6",
                    borderRadius: "3px",
                    marginBottom: "4px",
                    width: i === 3 ? "60%" : "100%",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
