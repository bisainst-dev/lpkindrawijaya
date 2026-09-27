import { NextRequest, NextResponse } from "next/server";
import { ADMIN_WA_NUMBER, GOOGLE_SHEET_WEBHOOK_URL, BUSINESS_NAME } from "@/lib/config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, paket, timestamp } = body;

    const paketLabel: Record<string, string> = {
      basic: "Basic — Rp 299.000/bln",
      pro: "Pro — Rp 499.000/bln (Paling Populer)",
      premium: "Premium — Rp 799.000/bln",
    };

    // ── 1. Simpan ke Google Sheet (jika URL sudah diisi) ──────────────
    if (GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: timestamp || new Date().toISOString(),
            name,
            phone,
            email: email || "-",
            paket: paketLabel[paket] || paket,
            status: "Baru",
          }),
        });
      } catch (sheetErr) {
        // Tidak gagalkan seluruh request jika sheet error
        console.error("Google Sheet error:", sheetErr);
      }
    }

    // ── 2. Buat link WhatsApp untuk admin ────────────────────────────
    //    Admin tinggal klik link ini untuk langsung membalas pendaftar
    const waMessage = encodeURIComponent(
      `Halo Kak *${name}*! 👋\n\n` +
      `Saya dari *${BUSINESS_NAME}*.\n` +
      `Terima kasih sudah mendaftar Kelas Bahasa Jepang Online! 🎌\n\n` +
      `📦 Paket yang dipilih: *${paketLabel[paket] || paket}*\n\n` +
      `Untuk melanjutkan pendaftaran, berikut info pembayarannya:\n` +
      `💳 *Rekening BCA:* 1234567890\n` +
      `👤 *a/n:* LPK BISA MANDIRI\n\n` +
      `Setelah transfer, mohon kirimkan bukti pembayaran ke sini ya Kak 🙏\n\n` +
      `Ada pertanyaan? Silakan tanya di sini! 😊`
    );

    const adminNotifMessage = encodeURIComponent(
      `🔔 *PENDAFTAR BARU — ${BUSINESS_NAME}*\n\n` +
      `👤 Nama: ${name}\n` +
      `📱 WA: ${phone}\n` +
      `📧 Email: ${email || "-"}\n` +
      `📦 Paket: ${paketLabel[paket] || paket}\n` +
      `🕐 Waktu: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}\n\n` +
      `Klik untuk balas ke pendaftar:\n` +
      `https://wa.me/${phone.replace(/^0/, "62").replace(/\D/g, "")}?text=${waMessage}`
    );

    // Link untuk admin: buka WA admin dengan notif pendaftar baru
    const adminWaLink = `https://wa.me/${ADMIN_WA_NUMBER}?text=${adminNotifMessage}`;

    // Link untuk siswa: buka WA admin dengan pesan sambutan
    const studentWaLink = `https://wa.me/${ADMIN_WA_NUMBER}?text=${waMessage}`;

    return NextResponse.json({
      success: true,
      adminWaLink,
      studentWaLink,
    });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
