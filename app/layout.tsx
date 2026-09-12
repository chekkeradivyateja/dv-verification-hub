import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Free, in-depth UVM, SystemVerilog, and SVA reference articles plus interactive testbench/assertion generators, written by a working design verification engineer.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og/home.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/og/home.png`],
  },
  verification: {
    google: "zJMpsLKLXAJ39o1_pKxRbIXwJDjSy51EBb36NfYsc7U",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
