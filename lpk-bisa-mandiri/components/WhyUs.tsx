"use client";

import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    icon: "📚",
    title: "Kurikulum Fokus JFT & SSW",
    desc: "Materi dirancang khusus untuk lulus JFT-Basic dan persiapan Specified Skilled Worker.",
  },
  {
    icon: "🤖",
    title: "Simulasi Berbasis AI",
    desc: "Teknologi AI memberikan analisis mendalam dan rekomendasi belajar yang personal.",
  },
  {
    icon: "🖥️",
    title: "Kelas Online dan Offline",
    desc: "Fleksibel belajar dari mana saja. Tersedia kelas tatap muka di Banjarnegara.",
  },
  {
    icon: "👨‍🏫",
    title: "Mentor Berpengalaman",
    desc: "Dibimbing oleh mentor bersertifikat dengan pengalaman mengajar dan mengirim siswa ke Jepang.",
  },
  {
    icon: "✈️",
    title: "Pendampingan Hingga Berangkat",
    desc: "Kami tidak berhenti di ujian. Kami dampingi dari persiapan visa hingga tiba di Jepang.",
  },
  {
    icon: "👥",
    title: "Komunitas Belajar Aktif",
    desc: "Bergabung dengan ribuan siswa aktif. Belajar bersama, saling support, sukses bersama.",
  },
];

export default function WhyUs() {
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
      id="tentang"
      ref={ref}
      style={{
        background: "#f8f8f8",
        padding: "3rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "5rem",
          alignItems: "center",
        }}
        className="whyus-grid"
      >
        <style>{`
          @media (max-width: 900px) {
            .whyus-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>

        {/* Left: Text */}
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
            <span style={{ fontSize: "14px" }}>⭐</span>
            <span
              style={{ fontSize: "13px", fontWeight: "600", color: "#B71C1C" }}
            >
              Mengapa Kami Berbeda
            </span>
          </div>

          <h2
            className="section-title"
            style={{ marginBottom: "1.25rem" }}
            id="whyus-heading"
          >
            Mengapa Memilih{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B71C1C, #ef5350)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              BISA MANDIRI?
            </span>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#6b7280",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            Kami bukan sekadar kursus bahasa. Kami adalah mitra perjalanan
            kariermu ke Jepang — dari hari pertama belajar hingga hari
            keberangkatan.
          </p>

          {/* Big visual accent */}
          <div
            style={{
              background: "linear-gradient(135deg, #B71C1C, #dc2626)",
              borderRadius: "20px",
              padding: "2rem",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "-20px",
                bottom: "-20px",
                fontSize: "120px",
                opacity: 0.1,
                lineHeight: 1,
              }}
            >
              日
            </div>
            <div
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: "900",
                letterSpacing: "-2px",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              1000+
            </div>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                opacity: 0.9,
                marginBottom: "0.25rem",
              }}
            >
              Siswa Berhasil
            </div>
            <div style={{ fontSize: "14px", opacity: 0.7 }}>
              sudah belajar dan berangkat ke Jepang bersama kami
            </div>
          </div>
        </div>

        {/* Right: Checklist */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {reasons.map((reason, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                background: "white",
                borderRadius: "16px",
                padding: "1.25rem",
                border: "1px solid #f3f4f6",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(30px)",
                transition: `all 0.5s ease ${i * 0.07}s`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateX(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 24px rgba(183,28,28,0.1)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(183,28,28,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor = "#f3f4f6";
              }}
            >
              {/* Check icon */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "rgba(183,28,28,0.1)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "18px",
                }}
              >
                {reason.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      background: "#B71C1C",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "15px",
                      color: "#1a1a2e",
                    }}
                  >
                    {reason.title}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    lineHeight: 1.6,
                    paddingLeft: "26px",
                  }}
                >
                  {reason.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
