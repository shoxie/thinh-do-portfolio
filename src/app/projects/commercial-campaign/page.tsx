"use client";

import { MotionConfig } from "framer-motion";
import { BookCover } from "@/components/book/BookCover";
import { BookEntries } from "@/components/book/BookEntries";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Grain, Scanline, ScrollProgress } from "@/components/Overlays";
import { I18nProvider } from "@/lib/i18n";
import { SUB_NAV } from "@/lib/projectPages";

export default function CommercialCampaignPage() {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider
        title={{
          en: "Commercial Campaign — Thinh Do · Do Duy Thinh",
          vi: "Commercial Campaign — Thinh Do · Do Duy Thinh",
        }}
      >
        <Grain />
        <Scanline />
        <ScrollProgress />
        <Header nav={[...SUB_NAV]} homeHref="/" />
        <main id="top">
          <BookCover />
          <BookEntries />
        </main>
        <Footer />
      </I18nProvider>
    </MotionConfig>
  );
}
