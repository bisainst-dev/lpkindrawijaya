import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ScrollReset from "@/components/ScrollReset";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LPK BISA MANDIRI | Belajar Bahasa Jepang & Persiapan Kerja Jepang",
  description:
    "Belajar bahasa Jepang dari dasar, simulasi JFT dan NAT-Test, AI Tutor, serta persiapan karier ke Jepang dalam satu platform.",
  keywords: [
    "belajar bahasa jepang",
    "kursus bahasa jepang",
    "simulasi jft",
    "jft basic",
    "nat test",
    "kerja ke jepang",
    "ssw jepang",
    "lpk jepang",
    "lpk bisa mandiri",
    "bisajft",
    "banjarnegara",
  ],
  authors: [{ name: "LPK BISA MANDIRI" }],
  openGraph: {
    title: "LPK BISA MANDIRI | Belajar Bahasa Jepang & Persiapan Kerja Jepang",
    description:
      "Belajar bahasa Jepang dari dasar, simulasi JFT dan NAT-Test, AI Tutor, serta persiapan karier ke Jepang.",
    type: "website",
    locale: "id_ID",
    url: "https://lpk.binabangsa.com",
    siteName: "LPK BISA MANDIRI",
  },
  twitter: {
    card: "summary_large_image",
    title: "LPK BISA MANDIRI | Belajar Bahasa Jepang",
    description:
      "Belajar bahasa Jepang dari dasar, simulasi JFT dan NAT-Test, AI Tutor, serta persiapan karier ke Jepang.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
