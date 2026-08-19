"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  PROJECT_COPY,
  nextProjectSlug,
  PROJECTS,
  type Project,
  type ProjectPhoto,
} from "@/lib/projectPages";
import { Reveal } from "@/lib/reveal";

function Frame({
  photo,
  index,
  open,
}: {
  photo: ProjectPhoto;
  index: number;
  open: (i: number) => void;
}) {
  return (
    <button
      type="button"
      className="gframe"
      onClick={() => open(index)}
      aria-label={`${photo.title} — open full size`}
    >
      <span
        className="gframe__ph"
        style={{ backgroundImage: `url('${photo.lqip}')` }}
      />
      <img
        src={photo.grid}
        alt={`${photo.title}`}
        loading="lazy"
        decoding="async"
        width={photo.w}
        height={photo.h}
      />
      <span className="gframe__cap">{photo.title}</span>
    </button>
  );
}

export function PhotoEssay({ project }: { project: Project }) {
  const { lang, t } = useI18n();
  const copy = PROJECT_COPY[project.slug][lang];

  /* ── lightbox ── */
  const [open, setOpen] = useState<number | null>(null);
  const [src, setSrc] = useState("");
  const [ready, setReady] = useState(false);
  const posRef = useRef(0);
  const touch = useRef({ x: 0, active: false });
  const closeBtn = useRef<HTMLButtonElement>(null);

  const renderSlide = useCallback(
    (next: number) => {
      const list = project.photos;
      const i = ((next % list.length) + list.length) % list.length;
      posRef.current = i;
      setOpen(i);
      setReady(false);
      setSrc(list[i].grid);
      const full = new Image();
      full.decoding = "async";
      full.src = list[i].full;
      full.onload = () => {
        if (project.photos[posRef.current]?.slug === list[i].slug) {
          setSrc(full.src);
        }
      };
    },
    [project.photos],
  );

  const close = useCallback(() => {
    setOpen(null);
    setTimeout(() => setSrc(""), 400);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open !== null);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    requestAnimationFrame(() =>
      closeBtn.current?.focus({ preventScroll: true }),
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") renderSlide(posRef.current + 1);
      if (e.key === "ArrowLeft") renderSlide(posRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, renderSlide, close]);

  const photo = open !== null ? project.photos[open] : undefined;
  const nextSlug = nextProjectSlug(project.slug);

  return (
    <>
      <section className="pr-gallery section" id="gallery">
        <div className="wrap">
          <header className="pr-gallery__head">
            <Reveal>
              <p className="hero__eyebrow">
                <span className="tick" />
                <span>{copy.eyebrow}</span>
              </p>
              <h1 className="pr-gallery__title">
                <span className="pr-gallery__titleline">
                  <motion.span
                    initial={{ y: "106%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {project.name}
                  </motion.span>
                </span>
              </h1>
            </Reveal>
            <Reveal className="pr-gallery__aside" delay={0.1}>
              <div className="bk-copy">
                {copy.lede.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="pr-gallery__meta">
                <div className="hero__metacol">
                  <span className="k">{copy.metaFrames}</span>
                  <span className="v">{project.photos.length}</span>
                </div>
                <div className="hero__metacol">
                  <span className="k">{t("hero.shotOn")}</span>
                  <span className="v">{copy.shotOn ?? project.description}</span>
                </div>
              </div>
            </Reveal>
          </header>

          <div className="gallerygrid">
            {project.photos.map((p, i) => (
              <Reveal
                key={p.slug}
                className="gallerygrid__slot"
                delay={0.03 * (i % 3)}
              >
                <Frame photo={p} index={i} open={(idx) => renderSlide(idx)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pr-end section">
        <div className="wrap pr-end__in">
          <Reveal>
            <Link className="pr-end__link" href="/">
              <span className="pr-end__arw">←</span>
              <span>{copy.back}</span>
            </Link>
          </Reveal>
          {nextSlug ? (
            <Reveal delay={0.08}>
              <Link className="pr-end__next" href={`/projects/${nextSlug}`}>
                <span className="pr-end__nextk">{copy.next}</span>
                <span className="pr-end__nextv">
                  {PROJECTS.find((p) => p.slug === nextSlug)?.name}
                </span>
                <span className="pr-end__nexta">→</span>
              </Link>
            </Reveal>
          ) : null}
        </div>
      </section>

      <AnimatePresence>
        {open !== null && photo && (
          <motion.div
            className="lb"
            role="dialog"
            aria-modal="true"
            aria-label={photo.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            onTouchStart={(e) => {
              if (e.touches.length !== 1) return;
              touch.current = { x: e.touches[0].clientX, active: true };
            }}
            onTouchEnd={(e) => {
              if (!touch.current.active) return;
              touch.current.active = false;
              const dx = e.changedTouches[0].clientX - touch.current.x;
              if (Math.abs(dx) > 55) {
                renderSlide(posRef.current + (dx < 0 ? 1 : -1));
              }
            }}
          >
            <button
              ref={closeBtn}
              className="lb__close"
              aria-label="Close viewer"
              onClick={close}
            >
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button
              className="lb__nav lb__nav--prev"
              aria-label="Previous photo"
              onClick={() => renderSlide(posRef.current - 1)}
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M15 5l-7 7 7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="lb__nav lb__nav--next"
              aria-label="Next photo"
              onClick={() => renderSlide(posRef.current + 1)}
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M9 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <figure className="lb__stage">
              <div className={`lb__imgwrap ${ready ? "is-ready" : ""}`}>
                {src && (
                  <img
                    src={src}
                    alt={`${photo.title} — ${project.name}`}
                    onLoad={() => setReady(true)}
                  />
                )}
                <div className="lb__spin" />
              </div>
            </figure>

            <div className="lb__bar">
              <div className="lb__info">
                <span className="lb__series">{project.name}</span>
                <span className="lb__title">{photo.title}</span>
              </div>
              <div className="lb__count">
                <span>{open + 1}</span> <i>/</i>{" "}
                <span>{project.photos.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
