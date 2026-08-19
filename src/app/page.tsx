"use client";

import { MotionConfig } from "framer-motion";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Craft } from "@/components/Craft";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Grain, Scanline, ScrollProgress } from "@/components/Overlays";
import { Preloader } from "@/components/Preloader";
import { I18nProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <Grain />
        <Scanline />
        <ScrollProgress />
        <Preloader />
        <Header />
        <main id="top">
          <Hero />
          <Marquee />
          <About />
          <Craft />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </I18nProvider>
    </MotionConfig>
  );
}
