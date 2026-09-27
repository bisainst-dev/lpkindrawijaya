"use client";

import { useEffect, useRef, useState } from "react";

export default function FinalCTA() {
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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={ref}
      style={{
        background: "linear-gradient(135deg, #7f1212 0%, #B71C1C 40%, #dc2626 70%, #c2410c 100%)",
        padding: "3rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "400px",
          height: "400px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-60px",
          width: "350px",
          height: "350px",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "50%",
        }}
      />

      {/* Floating Japanese chars */}
      {["日", "本"].map((char, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            fontSize: "160px",
            fontWeight: "900",
            color: "rgba(255,255,255,0.04)",
            pointerEvents: "none",
            top: i === 0 ? "-20px" : undefined,
            bottom: i === 1 ? "-30px" : undefined,
            left: i === 0 ? "5%" : undefined,
            right: i === 1 ? "5%" : undefined,
            userSelect: "none",
          }}
        >
          {char}
        </div>
      ))}

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            margin: "0 auto 2rem",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          ✈️
        </div>

        {/* Headline */}
        <h2
          style={{
            fontSize: "clamp(1.75rem, 5vw, 3rem)",
            fontWeight: "900",
            color: "white",
            lineHeight: 1.2,
            marginBottom: "1rem",
            letterSpacing: "-0.5px",
          }}
          id="final-cta-heading"
        >
          Siap Memulai Perjalanan ke Jepang?
        </h2>

        {/* Subheadline */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "560px",
            margin: "0 auto 2.5rem",
          }}
        >
          Belajar bahasa Jepang dari dasar hingga siap kerja. Bergabunglah
          dengan 1000+ siswa yang sudah membuktikan.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#program"
            id="final-cta-primary"
            className="btn-white"
            style={{ fontSize: "15px", padding: "0.9rem 2.25rem" }}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("program")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            🚀 Daftar Sekarang
          </a>
          <a
            href="#simulasi"
            id="final-cta-secondary"
            className="btn-outline-white"
            style={{ fontSize: "15px", padding: "0.9rem 2.25rem" }}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("simulasi")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            📋 Coba Simulasi Gratis
          </a>
        </div>

        {/* Trust line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            "✅ Gratis Daftar",
            "✅ Tanpa Kartu Kredit",
            "✅ Mulai Belajar Hari Ini",
          ].map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.8)",
                fontWeight: "500",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
