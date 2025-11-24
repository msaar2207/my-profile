import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aun Rizvi - Problem Solver",
  description:
    "Senior Full-Stack Engineer & AI Systems Architect focused on orchestration, RAG, and production-grade systems.",
  metadataBase: new URL("https://www.aunrizvi.me"),
  openGraph: {
    title: "Aun Rizvi — Senior Full-Stack Engineer & AI Systems Architect",
    description:
      "Engineering leader with 10+ years building AI orchestration, RAG, and cloud systems.",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Aun Rizvi - Senior Full-Stack Engineer & AI Systems Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aun Rizvi — Senior Full-Stack Engineer & AI Systems Architect",
    description:
      "Engineering leader with 10+ years building AI orchestration, RAG, and cloud systems.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
