import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "антитруд.",
  description:
    "антитруд. переводы – библиотека книг и текстов об антитруде, посттрудовом обществе, критике работы, автоматизации, базовом доходе и социальной теории.",
  alternates: {
    canonical: "https://antiwork-ru.github.io/books/",
  },
  openGraph: {
    type: "website",
    title: "антитруд. переводы",
    description:
      "Библиотека переводов по антитруду, посттрудовой теории, критике труда, базовому доходу и социальной философии.",
    url: "https://antiwork-ru.github.io/books/",
    images: [
      {
        url: "https://antiwork-ru.github.io/books/icons/logo.jpg",
        width: 1200,
        height: 630,
        alt: "антитруд. переводы",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "антитруд. переводы",
    description: "Библиотека переводов об антитруде, посттруде и критике работы.",
    images: ["https://antiwork-ru.github.io/books/icons/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru" data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}
        <Analytics />
      </body>
    </html>
  );
}