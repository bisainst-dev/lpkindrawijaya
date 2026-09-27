"use client";

import Link from "next/link";

const footerLinks = {
  program: {
    title: "Program",
    links: [
      { label: "Belajar Bahasa Jepang", href: "#program" },
      { label: "BISAJFT", href: "#simulasi" },
      { label: "BISANAT", href: "#simulasi" },
      { label: "AI Tutor", href: "#program" },
      { label: "Program SSW", href: "#karier" },
    ],
  },
  informasi: {
    title: "Informasi",
    links: [
      { label: "Tentang Kami", href: "#tentang" },
      { label: "Blog", href: "#blog" },
      { label: "FAQ", href: "#faq" },
      { label: "Kontak", href: "#kontak" },
    ],
  },
};

const socialLinks = [
  {
    label: "WhatsApp",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.122 1.527 5.855L0 24l6.335-1.527A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.803c-1.846 0-3.565-.5-5.05-1.372l-.361-.215-3.763.907.924-3.678-.235-.374A9.785 9.785 0 012.197 12C2.197 6.576 6.576 2.197 12 2.197S21.803 6.576 21.803 12 17.424 21.803 12 21.803z" />
      </svg>
    ),
    href: "https://wa.me/6285157937184",
    color: "#25d366",
  },
  {
    label: "Instagram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    href: "https://instagram.com/lpk_bisamandiri",
    color: "#e1306c",
  },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document
      .getElementById(id.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="kontak"
      style={{
        background: "#0f0f1a",
        color: "white",
        padding: "2.5rem 1.5rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: "3rem",
            marginBottom: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
          className="footer-grid"
        >
          <style>{`
            @media (max-width: 900px) {
              .footer-grid {
                grid-template-columns: 1fr 1fr !important;
                gap: 2rem !important;
              }
            }
            @media (max-width: 560px) {
              .footer-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>

          {/* Column 1: Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #B71C1C, #ef5350)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "900",
                  fontSize: "18px",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                日
              </div>
              <div>
                <div
                  style={{
                    fontWeight: "800",
                    fontSize: "15px",
                    color: "white",
                  }}
                >
                  LPK{" "}
                  <span style={{ color: "#ef5350" }}>BISA</span>{" "}
                  MANDIRI
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: "500",
                  }}
                >
                  Menuju Jepang Bersama Kami
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              Platform persiapan bahasa dan karier Jepang terpadu. Dari belajar
              bahasa, simulasi JFT & NAT, hingga keberangkatan ke Jepang.
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    transition: "all 0.2s ease",
                    border: "1px solid rgba(255,255,255,0.08)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = s.color;
                    (e.currentTarget as HTMLElement).style.color = "white";
                    (e.currentTarget as HTMLElement).style.borderColor = s.color;
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.6)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Program */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "white",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {footerLinks.program.title}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {footerLinks.program.links.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.55)",
                      padding: 0,
                      textAlign: "left",
                      fontFamily: "inherit",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "#ef5350";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color =
                        "rgba(255,255,255,0.55)";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Info */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "white",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {footerLinks.informasi.title}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {footerLinks.informasi.links.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.55)",
                      padding: 0,
                      textAlign: "left",
                      fontFamily: "inherit",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "#ef5350";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color =
                        "rgba(255,255,255,0.55)";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "white",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Kontak
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                {
                  icon: "📱",
                  label: "WhatsApp",
                  value: "0851-5793-7184",
                  href: "https://wa.me/6285157937184",
                },
                {
                  icon: "🌐",
                  label: "Website",
                  value: "lpk.binabangsa.com",
                  href: "https://lpk.binabangsa.com",
                },
                {
                  icon: "📸",
                  label: "Instagram",
                  value: "@lpk_bisamandiri",
                  href: "https://instagram.com/lpk_bisamandiri",
                },
                {
                  icon: "📍",
                  label: "Lokasi",
                  value: "Banjarnegara, Jawa Tengah",
                  href: null,
                },
              ].map((contact, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.4,
                      flexShrink: 0,
                    }}
                  >
                    {contact.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.35)",
                        fontWeight: "500",
                        marginBottom: "1px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {contact.label}
                    </div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.7)",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.color = "#ef5350";
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.color =
                            "rgba(255,255,255,0.7)";
                        }}
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {contact.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            © {new Date().getFullYear()} LPK BISA MANDIRI. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service"].map((item, i) => (
              <a
                key={i}
                href="#"
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#ef5350";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.35)";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
