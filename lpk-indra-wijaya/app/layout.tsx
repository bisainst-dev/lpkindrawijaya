import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "LPK Indra Wijaya | Sending Organization Resmi ke Jepang - Indramayu Jawa Barat",
  description: "Lembaga Pelatihan Kerja & Sending Organization (SO) resmi berizin Kemenaker RI di Indramayu. Pelatihan intensif bahasa Jepang, fisik & mental (FMD), serta penyaluran kerja resmi Tokutei Ginou (SSW) dan Pemagangan ke Jepang.",
  keywords: [
    "LPK Indra Wijaya",
    "Sending Organization Indramayu",
    "Kerja ke Jepang Indramayu",
    "Tokutei Ginou SSW Kaigo",
    "Magang Jepang Indramayu",
    "LPK Bahasa Jepang Jawa Barat",
    "SO Resmi Kemenaker",
    "インドネシア送出し機関",
    "インドラウィジャヤ"
  ],
  authors: [{ name: "LPK Indra Wijaya" }],
  openGraph: {
    title: "LPK Indra Wijaya | Pelatihan & Penyaluran Kerja ke Jepang",
    description: "Pusat Pelatihan & Pemberangkatan Resmi Tokutei Ginou (SSW) & Pemagangan ke Jepang di Indramayu, Jawa Barat.",
    type: "website",
    locale: "id_ID"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
