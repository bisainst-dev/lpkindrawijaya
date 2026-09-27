"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Rizky Pratama",
    location: "Banjarnegara, Jawa Tengah",
    role: "Alumni Program SSW",
    avatar: "RP",
    color: "#B71C1C",
    rating: 5,
    text: "Simulasi BISAJFT benar-benar membantu saya memahami kelemahan grammar saya. Dalam 2 bulan intensif, skor saya naik drastis dan akhirnya lulus JFT-Basic dengan nilai memuaskan!",
    tags: ["JFT-Basic Lulus", "SSW Jepang"],
  },
  {
    name: "Siti Rahma",
    location: "Purbalingga, Jawa Tengah",
    role: "Siswa Aktif",
    avatar: "SR",
    color: "#2563eb",
    rating: 5,
    text: "Materinya mudah dipahami dan terstruktur banget. AI Tutor-nya keren, bisa tanya kapan saja dan langsung dapat penjelasan yang jelas. Mentor-nya juga sabar dan profesional.",
    tags: ["AI Tutor", "Belajar Mandiri"],
  },
  {
    name: "Andi Firmansyah",
    location: "Purwokerto, Jawa Tengah",
    role: "Bekerja di Osaka",
    avatar: "AF",
    color: "#065f46",
    rating: 5,
    text: "Alhamdulillah sekarang sudah di Osaka! LPK Bisa Mandiri benar-benar mendampingi dari awal belajar sampai visa turun. Tidak ada yang saya ragukan dari kualitas pengajaran mereka.",
    tags: ["Sudah di Jepang", "Osaka"],
  },
  {
    name: "Dewi Lestari",
    location: "Kebumen, Jawa Tengah",
    role: "Lulus NAT N5",
    avatar: "DL",
    color: "#7c3aed",
    rating: 5,
    text: "BISANAT sangat membantu persiapan NAT-Test saya. Soalnya sesuai dengan ujian asli. Dalam 3 bulan saya sudah lulus N5 dan sekarang lanjut ke N4. Highly recommended!",
    tags: ["NAT N5 Lulus", "N4 Target"],
  },
  {
    name: "Bagas Nugroho",
    location: "Wonosobo, Jawa Tengah",
    role: "Calon SSW 2024",
    avatar: "BN",
    color: "#c2410c",
    rating: 5,
    text: "Bergabung dengan komunitas di sini membuat belajar jadi lebih semangat. Ada teman-teman yang satu visi, ada mentor yang selalu siap bantu. Ini bukan sekadar kursus, tapi keluarga besar!",
    tags: ["Komunitas", "SSW 2024"],
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            color: s <= count ? "#f59e0b" : "#e5e7eb",
            fontSize: "14px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [visible]);

  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[activeIndex] as HTMLElement;
    if (!card) return;
    const scrollLeft =
      card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [activeIndex]);

  return (
    <section
      id="testimoni"
      ref={ref}
      style={{
        background: "white",
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
            <span style={{ fontSize: "14px" }}>💬</span>
            <span
              style={{ fontSize: "13px", fontWeight: "600", color: "#B71C1C" }}
            >
              Dari Siswa Kami
            </span>
          </div>
          <h2
            className="section-title"
            style={{ marginBottom: "0.75rem" }}
            id="testimoni-heading"
          >
            Cerita{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #B71C1C, #ef5350)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Siswa Kami
            </span>
          </h2>
          <p className="section-subtitle">
            Ribuan siswa sudah membuktikan. Sekarang giliran kamu.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={scrollRef}
          className="no-scrollbar"
          style={{
            display: "flex",
            gap: "1.5rem",
            overflowX: "auto",
            paddingBottom: "1rem",
            scrollSnapType: "x mandatory",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                minWidth: "340px",
                maxWidth: "380px",
                background: "white",
                borderRadius: "20px",
                padding: "1.75rem",
                border: `2px solid ${i === activeIndex ? t.color + "40" : "#f3f4f6"}`,
                boxShadow:
                  i === activeIndex
                    ? `0 16px 40px ${t.color}18`
                    : "0 4px 16px rgba(0,0,0,0.06)",
                transition: "all 0.35s ease",
                cursor: "pointer",
                scrollSnapAlign: "center",
                transform: i === activeIndex ? "scale(1.02)" : "scale(0.98)",
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 0.06}s`,
                flexShrink: 0,
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontSize: "48px",
                  color: t.color,
                  opacity: 0.15,
                  lineHeight: 1,
                  marginBottom: "-0.5rem",
                  fontFamily: "Georgia, serif",
                }}
              >
                "
              </div>

              {/* Text */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#374151",
                  lineHeight: 1.75,
                  marginBottom: "1.25rem",
                  fontStyle: "italic",
                }}
              >
                {t.text}
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  flexWrap: "wrap",
                  marginBottom: "1.25rem",
                }}
              >
                {t.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    style={{
                      background: `${t.color}12`,
                      color: t.color,
                      fontSize: "11px",
                      fontWeight: "600",
                      padding: "3px 10px",
                      borderRadius: "50px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingTop: "1rem",
                  borderTop: "1px solid #f3f4f6",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "800",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "14px",
                      color: "#1a1a2e",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#9ca3af",
                      marginBottom: "2px",
                    }}
                  >
                    {t.location}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: t.color,
                      fontWeight: "600",
                    }}
                  >
                    {t.role}
                  </div>
                </div>
                <StarRating count={t.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "2rem",
          }}
        >
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              style={{
                width: i === activeIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "50px",
                background: i === activeIndex ? "#B71C1C" : "#e5e7eb",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
