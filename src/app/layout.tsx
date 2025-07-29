import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/common/SmoothScrolling";
import ModernNavbar from "@/components/navigation/ModernNavbar";
import Footer from "@/components/navigation/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
  preload: false
});

export const metadata: Metadata = {
  title: "Alpha.AI - The Inevitable AI Orchestration Infrastructure",
  description: "Alpha.AI represents the inevitable evolution of AI infrastructure—a self-optimizing, multi-agent orchestration platform that solves the fundamental architectural problems plaguing enterprise AI adoption.",
  keywords: "AI orchestration, enterprise AI, multi-agent systems, AI infrastructure, cost optimization, security, compliance",
  authors: [{ name: "Alpha.AI Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Alpha.AI - The Inevitable AI Orchestration Infrastructure",
    description: "The world's first adaptive AI orchestration engine with 70-90% cost reduction through dynamic optimization.",
    type: "website",
    url: "https://alpha.ai",
    siteName: "Alpha.AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha.AI - AI Orchestration Platform",
    description: "Enterprise-grade AI orchestration with intelligent multi-model routing and zero-trust security.",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="icon" href="/alpha-ai-icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased min-h-screen bg-black font-sans overflow-x-hidden`}
        style={{ background: '#000000' }}
      >
        <SmoothScrolling />
        <ModernNavbar />
        <div className="relative min-h-screen">
          <div className="w-full px-[7%] box-border overflow-x-hidden">
            <div className="w-full max-w-none mx-auto">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
