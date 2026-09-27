"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Masukkan alamat email yang valid.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section
      id="newsletter"
      style={{
        background: "#f8f8f8",
        padding: "2.5rem 1.5rem",
        borderTop: "1px solid #f3f4f6",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, #B71C1C, #ef5350)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            margin: "0 auto 1.5rem",
            boxShadow: "0 8px 24px rgba(183,28,28,0.25)",
          }}
        >
          📧
        </div>

        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: "800",
            color: "#1a1a2e",
            marginBottom: "0.75rem",
          }}
          id="newsletter-heading"
        >
          Dapatkan Info dan Tips Terbaru
          <span
            style={{
              display: "block",
              background: "linear-gradient(135deg, #B71C1C, #ef5350)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Seputar Jepang
          </span>
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#6b7280",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          Tips belajar bahasa Jepang, info JFT & NAT terbaru, peluang kerja SSW,
          dan update langsung dari tim LPK BISA MANDIRI.
        </p>

        {submitted ? (
          <div
            style={{
              background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
              border: "1px solid #6ee7b7",
              borderRadius: "16px",
              padding: "2rem",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "0.75rem" }}>🎉</div>
            <div
              style={{
                fontWeight: "700",
                fontSize: "1.1rem",
                color: "#065f46",
                marginBottom: "0.25rem",
              }}
            >
              Berhasil Berlangganan!
            </div>
            <div style={{ fontSize: "14px", color: "#047857" }}>
              Terima kasih! Kamu akan mendapatkan info terbaru dari kami.
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0",
                background: "white",
                border: `2px solid ${error ? "#ef4444" : "#e5e7eb"}`,
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              className="newsletter-input-wrapper"
            >
              <style>{`
                .newsletter-input-wrapper:focus-within {
                  border-color: #B71C1C !important;
                  box-shadow: 0 4px 20px rgba(183,28,28,0.12) !important;
                }
              `}</style>
              <div
                style={{
                  padding: "0 1rem",
                  display: "flex",
                  alignItems: "center",
                  color: "#9ca3af",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M3 4h12a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2 5l7 5 7-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Masukkan email kamu..."
                aria-label="Alamat email"
                style={{
                  flex: 1,
                  padding: "1rem 0.5rem",
                  border: "none",
                  outline: "none",
                  fontSize: "15px",
                  color: "#1a1a2e",
                  background: "transparent",
                  fontFamily: "inherit",
                }}
              />
              <button
                type="submit"
                id="newsletter-submit"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, #B71C1C, #dc2626)",
                  color: "white",
                  border: "none",
                  padding: "0 1.5rem",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                  fontFamily: "inherit",
                  opacity: loading ? 0.8 : 1,
                }}
              >
                {loading ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ animation: "spin 1s linear infinite" }}
                    >
                      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="20"
                        strokeDashoffset="5"
                      />
                    </svg>
                    Mendaftar...
                  </>
                ) : (
                  <>
                    Langganan
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7h10M7 2l5 5-5 5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
            {error && (
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "13px",
                  color: "#ef4444",
                  textAlign: "left",
                  paddingLeft: "0.5rem",
                }}
              >
                {error}
              </p>
            )}
          </form>
        )}

        <p
          style={{
            marginTop: "1rem",
            fontSize: "12px",
            color: "#9ca3af",
          }}
        >
          🔒 Kami tidak akan pernah mengirim spam. Berhenti langganan kapan saja.
        </p>
      </div>
    </section>
  );
}
