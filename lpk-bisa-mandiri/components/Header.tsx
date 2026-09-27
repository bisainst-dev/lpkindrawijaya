"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Program", href: "#program" },
  { label: "Simulasi", href: "#simulasi" },
  //{ label: "Karier Jepang", href: "#karier" },
  { label: "Tentang Kami", href: "#tentang" },
  //{ label: "Blog", href: "#blog" },
  { label: "Kontak", href: "#kontak" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        id="site-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "white",
          borderBottom: "1px solid #f3f4f6",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.3s ease",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* Logo */}
          <Link
            href="#beranda"
            onClick={() => handleNavClick("#beranda")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
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
                letterSpacing: "-1px",
                boxShadow: "0 4px 12px rgba(183,28,28,0.3)",
              }}
            >
              日
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div
                style={{
                  fontWeight: "800",
                  fontSize: "15px",
                  color: "#1a1a2e",
                  letterSpacing: "-0.3px",
                }}
              >
                LPK <span style={{ color: "#B71C1C" }}>BISA</span> MANDIRI
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#6b7280",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                Menuju Jepang Bersama Kami
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
            className="hidden-mobile"
          >
            <style>{`
              @media (max-width: 1024px) {
                .hidden-mobile { display: none !important; }
              }
            `}</style>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.5rem 0.85rem",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color:
                    activeSection === link.href.replace("#", "")
                      ? "#B71C1C"
                      : "#374151",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  backgroundColor:
                    activeSection === link.href.replace("#", "")
                      ? "rgba(183,28,28,0.08)"
                      : "transparent",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== link.href.replace("#", "")) {
                    (e.target as HTMLElement).style.color = "#B71C1C";
                    (e.target as HTMLElement).style.backgroundColor =
                      "rgba(183,28,28,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.href.replace("#", "")) {
                    (e.target as HTMLElement).style.color = "#374151";
                    (e.target as HTMLElement).style.backgroundColor =
                      "transparent";
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="#program"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#program");
              }}
              className="btn-primary hidden-mobile"
              style={{
                padding: "0.625rem 1.5rem",
                fontSize: "14px",
                fontWeight: "700",
                borderRadius: "10px",
              }}
            >
              Daftar Sekarang
            </a>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle mobile menu"
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                color: "#1a1a2e",
                transition: "background 0.2s",
              }}
              className="show-mobile"
            >
              <style>{`
                @media (max-width: 1024px) {
                  .show-mobile { display: flex !important; align-items: center; justify-content: center; }
                }
              `}</style>
              {menuOpen ? (
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 49,
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        style={{
          position: "fixed",
          top: "2px",
          left: 0,
          right: 0,
          background: "white",
          zIndex: 50,
          padding: "1rem 1.5rem 1.5rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderTop: "1px solid #f3f4f6",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.875rem 1rem",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "500",
                color: "#1a1a2e",
                textAlign: "left",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
                backgroundColor:
                  activeSection === link.href.replace("#", "")
                    ? "rgba(183,28,28,0.08)"
                    : "transparent",
              }}
            >
              {link.label}
            </button>
          ))}
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f3f4f6" }}>
            <a
              href="#program"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => handleNavClick("#program")}
            >
              Daftar Sekarang
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
