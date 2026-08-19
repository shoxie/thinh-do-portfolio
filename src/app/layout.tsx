import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/config";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Thinh Do — Do Duy Thinh · Photographer",
    template: "%s — Thinh Do · Do Duy Thinh",
  },
  description:
    "Thinh Do (Do Duy Thinh) — photographer. Cinematic portrait photography from Vietnam.",
  authors: [{ name: "Thinh Do" }],
  openGraph: {
    type: "website",
    siteName: "Do Duy Thinh",
    url: "/",
    title: "Thinh Do — Do Duy Thinh",
    description:
      "Photographer. Cinematic portrait photography from Vietnam.",
    locale: "en_US",
    images: [
      {
        url: "/assets/hero/hero-bg.png",
        width: 1254,
        height: 1254,
        alt: "Thinh Do — portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thinh Do — Do Duy Thinh · Photographer",
    description:
      "Thinh Do (Do Duy Thinh) — photographer. Cinematic portrait photography from Vietnam.",
    images: ["/assets/hero/hero-bg.png"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%230a0a0b'/><text y='66' x='50' text-anchor='middle' font-size='40' font-family='monospace' fill='%23e0a244'>TD</text></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
