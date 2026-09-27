"use client";

import { useState } from "react";

/* ─────────────────────────────────────────
   SATU PAKET: PRO
   2 cara bayar: Lunas & Cicilan 2x
───────────────────────────────────────── */
const MONTHLY_PRICE = 499000;
const FULL_NORMAL = MONTHLY_PRICE * 8; // 3.992.000

const lunas = {
  id: "lunas",
  badge: "💰 Paling Hemat",
  badgeBg: "#065f46",
  name: "Bayar Lunas",
  tagline: "Bayar sekali, hemat maksimal",
  total: 2799000,
  perMonth: Math.round(2799000 / 8),
  saving: 3992000 - 2799000,
  savingPct: "30%",
  color: "#065f46",
  bg: "linear-gradient(135deg,#ecfdf5,#f0fdf4)",
  installments: [
    { label: "Bayar di Awal", amount: 2799000, when: "Dibayar sekali di hari pertama daftar", icon: "💳" },
  ],
  perks: [
    "Akses penuh 8 bulan langsung aktif",
    "Hemat Rp 1.193.000 (30%) dari harga normal",
    "Bonus 1× sesi konsultasi karier privat",
    "Refund 50% jika berhenti sebelum minggu ke-4",
  ],
  refund: "Refund 50% jika keluar sebelum minggu ke-4 · Tidak ada refund setelahnya",
  cta: "Pilih Bayar Lunas",
};

const cicilan2 = {
  id: "cicilan2",
  badge: "🔥 Paling Populer",
  badgeBg: "#B71C1C",
  name: "Cicilan 2×",
  tagline: "Ringan di awal, bayar lagi di bulan ke-4",
  total: 3200000,
  perMonth: Math.round(3200000 / 8),
  saving: 3992000 - 3200000,
  savingPct: "20%",
  color: "#B71C1C",
  bg: "linear-gradient(135deg,#fff5f5,#fff)",
  installments: [
    { label: "Cicilan Pertama", amount: 1600000, when: "Hari pertama daftar — Akses Bulan 1–4", icon: "1️⃣" },
    { label: "Cicilan Kedua", amount: 1600000, when: "Awal Bulan ke-4 — Akses Bulan 5–8", icon: "2️⃣" },
  ],
  perks: [
    "Bayar lebih ringan — hanya Rp 1.600.000 di awal",
    "Hemat Rp 792.000 (20%) dari harga normal",
    "Akses bulan 5–8 otomatis aktif setelah cicilan kedua",
    "Refund 25% cicilan pertama jika berhenti sebelum minggu ke-2",
  ],
  refund: "Refund 25% cicilan pertama jika keluar sebelum minggu ke-2 · Tidak ada refund cicilan kedua",
  cta: "Pilih Cicilan 2×",
};

const plans = [lunas, cicilan2];

const milestones = [
  { month: 1, title: "Hiragana & Katakana", reward: "Welcome Kit + Modul Drive", icon: "🎁", color: "#B71C1C" },
  { month: 2, title: "Kosakata Dasar", reward: "Badge Kana Master", icon: "🏅", color: "#dc2626" },
  { month: 3, title: "Pola Kalimat N5", reward: "Soal Latihan Ekstra", icon: "📊", color: "#2563eb" },
  { month: 4, title: "Evaluasi Tengah", reward: "1× Konsultasi Gratis", icon: "🎯", color: "#065f46" },
  { month: 5, title: "Percakapan SSW", reward: "Modul Kerja di Jepang", icon: "📋", color: "#7c3aed" },
  { month: 6, title: "Simulasi JFT", reward: "Try-out JFT Penuh", icon: "📝", color: "#c2410c" },
  { month: 7, title: "Intensif Grammar", reward: "Sesi Mentoring 1-on-1", icon: "💪", color: "#0891b2" },
  { month: 8, title: "Graduation!", reward: "Sertifikat Resmi 🎓", icon: "🎓", color: "#059669" },
];

const paymentFaqs = [
  { q: "Bagaimana cara pembayaran dilakukan?", a: "Transfer ke rekening BCA a/n LPK BISA MANDIRI, lalu kirim bukti transfer via WhatsApp ke admin. Akses kelas aktif dalam 2 jam setelah konfirmasi." },
  { q: "Apa yang terjadi jika cicilan kedua tidak dibayar tepat waktu?", a: "Ada grace period 7 hari. Akses bulan 5–8 akan dijeda sementara hingga cicilan dilunasi. Tidak ada denda keterlambatan." },
  { q: "Bisakah saya upgrade dari Cicilan 2× ke Lunas setelah daftar?", a: "Bisa! Hubungi admin via WhatsApp. Kamu cukup membayar selisihnya dan secara otomatis mendapatkan bonus konsultasi karier." },
  { q: "Bagaimana kebijakan jika saya harus berhenti di tengah jalan?", a: "Kami memahami kondisi tak terduga. Hubungi admin segera. Untuk kondisi darurat medis/keluarga, tim kami akan mengevaluasi secara kasus per kasus." },
];

const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export default function SkemaPembayaran() {
  const [selected, setSelected] = useState("cicilan2");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plan = plans.find((p) => p.id === selected)!;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="skema-pembayaran" style={{ background: "#f8f8f8", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(183,28,28,0.08)", border: "1px solid rgba(183,28,28,0.18)",
            borderRadius: 50, padding: "6px 16px", marginBottom: "1rem",
          }}>
            <span>💳</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#B71C1C" }}>Skema Pembayaran 8 Bulan · Paket Pro</span>
          </div>
          <h2 style={{
            fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 900, color: "#1a1a2e",
            lineHeight: 1.2, marginBottom: "0.75rem",
          }}>
            Pilih Cara Bayar yang{" "}
            <span style={{
              background: "linear-gradient(135deg,#B71C1C,#ef5350)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Paling Nyaman
            </span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
            Harga normal 8 bulan:{" "}
            <span style={{ textDecoration: "line-through", color: "#9ca3af" }}>{fmt(FULL_NORMAL)}</span>
            {" "}— pilih salah satu skema di bawah untuk hemat lebih banyak.
          </p>
        </div>

        {/* Pilihan cara bayar */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem",
        }} className="plan-pick-grid">
          <style>{`@media(max-width:520px){ .plan-pick-grid{ grid-template-columns:1fr !important; } }`}</style>

          {plans.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              style={{
                border: `2px solid ${selected === p.id ? p.color : "#e5e7eb"}`,
                borderRadius: 16, padding: "1.25rem",
                background: selected === p.id ? p.bg : "white",
                cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                transition: "all 0.2s ease",
                boxShadow: selected === p.id ? `0 6px 20px ${p.color}18` : "none",
              }}
            >
              <div style={{
                display: "inline-block", background: p.badgeBg, color: "white",
                fontSize: 10, fontWeight: 700, borderRadius: 50, padding: "2px 10px", marginBottom: 8,
              }}>{p.badge}</div>
              <div style={{ fontWeight: 900, fontSize: "1.05rem", color: selected === p.id ? p.color : "#1a1a2e", marginBottom: 2 }}>
                {p.name}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 10 }}>{p.tagline}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 11, color: "#6b7280" }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: "1.4rem", color: selected === p.id ? p.color : "#1a1a2e", letterSpacing: "-0.5px" }}>
                  {fmt(p.total)}
                </span>
              </div>
              <div style={{ fontSize: 11, color: selected === p.id ? p.color : "#6b7280", fontWeight: 700, marginTop: 2 }}>
                Hemat {fmt(p.saving)} ({p.savingPct})
              </div>
            </button>
          ))}
        </div>

        {/* Detail plan terpilih */}
        <div style={{
          background: plan.bg,
          border: `2px solid ${plan.color}25`,
          borderRadius: 20, padding: "2rem",
          boxShadow: `0 8px 32px ${plan.color}10`,
          marginBottom: "1.5rem",
          transition: "all 0.3s ease",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
            className="plan-detail-inner">
            <style>{`@media(max-width:640px){ .plan-detail-inner{ grid-template-columns:1fr !important; } }`}</style>

            {/* Jadwal */}
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#1a1a2e", marginBottom: "1rem" }}>
                📅 Jadwal Pembayaran
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1rem" }}>
                {plan.installments.map((inst, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, alignItems: "center",
                    background: "white", borderRadius: 12, padding: "0.85rem 1rem",
                    border: `1px solid ${plan.color}15`,
                  }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{inst.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>{inst.label}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>{inst.when}</div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 14, color: plan.color, whiteSpace: "nowrap" }}>
                      {fmt(inst.amount)}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                background: "rgba(0,0,0,0.03)", borderRadius: 10,
                padding: "0.8rem 1rem", border: "1px solid rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 3 }}>🔒 Kebijakan Refund</div>
                <div style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.6 }}>{plan.refund}</div>
              </div>
            </div>

            {/* Keuntungan */}
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#1a1a2e", marginBottom: "1rem" }}>
                ✅ Yang Kamu Dapatkan
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.25rem" }}>
                {plan.perks.map((perk, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#374151" }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: "50%", background: plan.color,
                      flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo("daftar")}
                style={{
                  width: "100%", background: plan.color, color: "white",
                  border: "none", borderRadius: 12, padding: "0.9rem",
                  fontWeight: 800, fontSize: "0.95rem", cursor: "pointer",
                  fontFamily: "inherit", boxShadow: `0 6px 20px ${plan.color}30`,
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {plan.cta} →
              </button>
            </div>
          </div>
        </div>

        {/* Perbandingan ringkas */}
        <div style={{
          background: "white", borderRadius: 16, overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)", marginBottom: "1.5rem", overflowX: "auto",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 440 }}>
            <thead>
              <tr style={{ background: "#1a1a2e" }}>
                <th style={{ padding: "0.85rem 1.25rem", textAlign: "left", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>
                  Perbandingan
                </th>
                <th style={{ padding: "0.85rem 1.25rem", textAlign: "center", fontSize: 13, fontWeight: 800, color: "#6ee7b7" }}>
                  💰 Bayar Lunas
                </th>
                <th style={{ padding: "0.85rem 1.25rem", textAlign: "center", fontSize: 13, fontWeight: 800, color: "#fca5a5" }}>
                  🔥 Cicilan 2×
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Total Bayar", l: fmt(lunas.total), c: fmt(cicilan2.total) },
                { label: "Per Bulan Efektif", l: fmt(lunas.perMonth), c: fmt(cicilan2.perMonth) },
                { label: "Hemat vs Normal", l: `${fmt(lunas.saving)} (30%)`, c: `${fmt(cicilan2.saving)} (20%)` },
                { label: "Bayar Pertama", l: fmt(lunas.total), c: fmt(1600000) },
                { label: "Konsultasi Karier", l: "✅ 1× gratis", c: "❌" },
                { label: "Refund", l: "50% s/d minggu ke-4", c: "25% s/d minggu ke-2" },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "0.8rem 1.25rem", fontSize: 13, fontWeight: 600, color: "#374151" }}>{row.label}</td>
                  <td style={{ padding: "0.8rem 1.25rem", textAlign: "center", fontSize: 13, color: "#065f46", fontWeight: 600 }}>{row.l}</td>
                  <td style={{ padding: "0.8rem 1.25rem", textAlign: "center", fontSize: 13, color: "#B71C1C", fontWeight: 600 }}>{row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Milestone timeline */}
        <div style={{
          background: "white", borderRadius: 20, padding: "2rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)", marginBottom: "1.5rem",
        }}>
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <div style={{ fontWeight: 900, fontSize: "1.05rem", color: "#1a1a2e", marginBottom: 6 }}>
              🎁 Reward Tiap Bulan — Biar Kamu Tetap Semangat!
            </div>
            <p style={{ fontSize: 13, color: "#6b7280", maxWidth: 440, margin: "0 auto", lineHeight: 1.6 }}>
              Setiap bulan ada kejutan. Semakin lama bertahan, semakin besar hadiahnya.
            </p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <div style={{ display: "flex", minWidth: 720, position: "relative", paddingBottom: "1rem" }}>
              <div style={{
                position: "absolute", top: 28, left: "calc(100%/16)", right: "calc(100%/16)",
                height: 3, zIndex: 0,
                background: "linear-gradient(to right,#B71C1C,#ef5350,#f97316,#eab308,#22c55e)",
              }} />
              {milestones.map((m, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: `linear-gradient(135deg,${m.color},${m.color}cc)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, boxShadow: `0 4px 16px ${m.color}35`,
                    border: "3px solid white", cursor: "default", transition: "transform 0.2s",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.15)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  >{m.icon}</div>
                  <div style={{ textAlign: "center", padding: "0 2px" }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: m.color, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>
                      Bulan {m.month}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#1a1a2e", marginBottom: 4, lineHeight: 1.3 }}>{m.title}</div>
                    <div style={{ fontSize: 10, color: "white", background: m.color, borderRadius: 50, padding: "2px 8px", display: "inline-block", fontWeight: 600 }}>
                      {m.reward}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Pembayaran */}
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
          <div style={{ fontWeight: 900, fontSize: "1.05rem", color: "#1a1a2e", marginBottom: "1.25rem" }}>
            ❓ Pertanyaan Seputar Pembayaran
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {paymentFaqs.map((faq, i) => (
              <div key={i} style={{
                border: `1px solid ${openFaq === i ? "rgba(183,28,28,0.25)" : "#f3f4f6"}`,
                borderRadius: 12, overflow: "hidden",
                boxShadow: openFaq === i ? "0 4px 16px rgba(183,28,28,0.07)" : "none",
                transition: "all 0.25s ease",
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", textAlign: "left",
                    background: openFaq === i ? "#fff8f8" : "white",
                    border: "none", padding: "0.95rem 1.1rem", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    gap: 12, fontFamily: "inherit",
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1a1a2e", lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{
                    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                    background: openFaq === i ? "#B71C1C" : "#f3f4f6",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.25s ease",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>
                      <path d="M2 4l4 4 4-4" stroke={openFaq === i ? "white" : "#6b7280"}
                        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
                  <div style={{ padding: "0 1.1rem 1rem", fontSize: "0.87rem", color: "#4b5563", lineHeight: 1.7 }}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
