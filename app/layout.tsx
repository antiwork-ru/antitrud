import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "антитруд.",
  description:
    "антитруд. – книги и тексты об антитруде, посттрудовом обществе, критике работы, автоматизации, базовом доходе и социальной теории.",
  alternates: {
    canonical: "https://antitrud.vercel.app/",
  },
  openGraph: {
    type: "website",
    title: "антитруд.",
    description:
      "антитруд. – книги и тексты об антитруде, посттрудовом обществе, критике работы, автоматизации, базовом доходе и социальной теории.",
    url: "https://antitrud.vercel.app/",
    images: [
      {
        url: "https://antitrud.vercel.app/public/logo.jpg",
        width: 1200,
        height: 630,
        alt: "антитруд. переводы",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "антитруд.",
    description: "антитруд. – книги и тексты об антитруде, посттрудовом обществе, критике работы, автоматизации, базовом доходе и социальной теории.",
    images: ["https://antitrud.vercel.app/public/logo.jpg"],
  },

  verification: {
    google: 'CG3LESexrs1uoxk3EjGlzMi21gdTE4zcSWfaWmWO5EY',
    yandex: '41fc81547f0a3835',
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
        <SpeedInsights />
      </body>
    </html>
  );
}