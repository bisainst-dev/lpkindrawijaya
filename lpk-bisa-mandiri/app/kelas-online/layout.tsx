import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelas Bahasa Jepang Online | LPK BISA MANDIRI",
  description:
    "Belajar bahasa Jepang online bersama mentor bersertifikat. Program 8 minggu dari dasar hingga siap ujian JFT-Basic. Live class interaktif, AI Tutor 24/7, garansi 7 hari.",
  keywords: [
    "kelas bahasa jepang online",
    "belajar jepang online",
    "kursus jepang online",
    "jft basic persiapan",
    "belajar hiragana katakana",
    "kelas jepang murah",
    "lpk bisa mandiri kelas online",
  ],
  openGraph: {
    title: "Kelas Bahasa Jepang Online — 8 Minggu Dari Nol ke JFT-Basic",
    description:
      "Live class interaktif, rekaman selamanya, AI Tutor 24/7. Mulai dari Rp 299.000/bulan dengan garansi uang kembali 7 hari.",
    type: "website",
    locale: "id_ID",
  },
};

export default function KelasOnlineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
