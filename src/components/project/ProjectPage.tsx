"use client";

import { MotionConfig } from "framer-motion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BookCover } from "@/components/book/BookCover";
import { BookEntries } from "@/components/book/BookEntries";
import { Grain, Scanline, ScrollProgress } from "@/components/Overlays";
import { PhotoEssay } from "@/components/project/PhotoEssay";
import { ResearchProject } from "@/components/project/ResearchProject";
import { I18nProvider } from "@/lib/i18n";
import { SUB_NAV, type Project } from "@/lib/projectPages";

export function ProjectPage({ project }: { project: Project }) {
  const isBook = project.slug === "commercial-campaign";

  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider
        title={{
          en: `${project.name} — Thinh Do · Do Duy Thinh`,
          vi: `${project.name} — Thinh Do · Do Duy Thinh`,
        }}
      >
        <Grain />
        <Scanline />
        <ScrollProgress />
        <Header nav={[...SUB_NAV]} homeHref="/" />
        <main id="top">
          {isBook ? (
            <>
              <BookCover />
              <BookEntries />
            </>
          ) : project.type === "photography" ? (
            <PhotoEssay project={project} />
          ) : (
            <ResearchProject project={project} />
          )}
        </main>
        <Footer />
      </I18nProvider>
    </MotionConfig>
  );
}
