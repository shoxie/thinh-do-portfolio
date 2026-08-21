"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useI18n } from "@/lib/i18n";
import { Reveal, Rich } from "@/lib/reveal";
import projectsRaw from "@/lib/projects.json";

type ProjectPhoto = {
  slug: string;
  title: string;
  w: number;
  h: number;
  ratio: number;
  lqip: string;
  grid: string;
  full: string;
};

type ProjectDoc = {
  name: string;
  file: string;
  ext: string;
  size: number;
};

type Project = {
  slug: string;
  name: string;
  type: "photography" | "research";
  description: string;
  cover: string;
  photos: ProjectPhoto[];
  documents: ProjectDoc[];
  page?: string;
};

const projects = projectsRaw as Project[];

const FILTERS = ["all", "photography", "research"] as const;
type Filter = (typeof FILTERS)[number];

const fmtSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

function ProjectCard({
  p,
  onOpen,
}: {
  p: Project;
  onOpen: (slug: string) => void;
}) {
  const { t } = useI18n();
  const [coverIdx, setCoverIdx] = useState(0);

  useEffect(() => {
    if (p.photos.length > 1) {
      const raf = requestAnimationFrame(() =>
        setCoverIdx(Math.floor(Math.random() * p.photos.length)),
      );
      return () => cancelAnimationFrame(raf);
    }
  }, [p.photos.length]);

  const cover = p.photos[coverIdx] ?? p.photos[0];
  const isPhoto = p.type === "photography";

  const body = (
    <>
      <span className="pcard__cover">
        {isPhoto && cover ? (
          <>
            {cover.lqip && (
              <span
                className="pcard__ph"
                style={{ backgroundImage: `url('${cover.lqip}')` }}
              />
            )}
            <img
              src={cover.grid}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </>
        ) : (
          <span className="pcard__doccover">
            <span className="pcard__docletter">
              {p.name.trim().charAt(0).toUpperCase()}
            </span>
            <span className="pcard__docrule" />
            <span className="pcard__doctype">
              {t("projects.type.research")} · {p.documents.length}{" "}
              {t("projects.papers")}
            </span>
          </span>
        )}
        <span className="pcard__veil" />
        <span className="pcard__badge">
          {isPhoto
            ? t("projects.type.photography")
            : t("projects.type.research")}
        </span>
      </span>
      <span className="pcard__body">
        <span className="pcard__name">{p.name}</span>
        <span className="pcard__desc">{p.description}</span>
        <span className="pcard__meta">
          {isPhoto
            ? `${p.photos.length} ${t("projects.frames")}`
            : `${p.documents.length} ${t("projects.papers")}`}
        </span>
      </span>
    </>
  );

  if (p.page) {
    return (
      <Link
        href={p.page}
        className={`pcard ${isPhoto ? "pcard--photo" : "pcard--doc"}`}
        aria-label={`${p.name} — ${t("projects.open")}`}
      >
        {body}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`pcard ${isPhoto ? "pcard--photo" : "pcard--doc"}`}
      onClick={() => onOpen(p.slug)}
      aria-label={`${p.name} — ${t("projects.open")}`}
    >
      {body}
    </button>
  );
}

export function Gallery() {
  const { t } = useI18n();
  const [active, setActive] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.type === active),
    [active],
  );

  const counts = useMemo(() => {
    return {
      all: projects.length,
      photography: projects.filter((p) => p.type === "photography").length,
      research: projects.filter((p) => p.type === "research").length,
    } as Record<Filter, number>;
  }, []);

  /* ── project viewer (lightbox for photos, docs panel for research) ── */
  const [open, setOpen] = useState<Project | null>(null);
  const [pos, setPos] = useState(0);
  const [src, setSrc] = useState("");
  const [ready, setReady] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touch = useRef({ x: 0, y: 0, active: false });
  const posRef = useRef(pos);
  const openRef = useRef(open);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const renderSlide = useCallback((next: number) => {
    const project = openRef.current;
    if (!project || !project.photos.length) return;
    const list = project.photos;
    const i = ((next % list.length) + list.length) % list.length;
    setPos(i);
    setReady(false);
    setSrc(list[i].grid);

    const full = new Image();
    full.decoding = "async";
    full.src = list[i].full;
    full.onload = () => {
      if (openRef.current?.photos[posRef.current]?.slug === list[i].slug) {
        setSrc(full.src);
      }
    };
    [1, -1].forEach((d) => {
      const n = list[(i + d + list.length) % list.length];
      if (n) new Image().src = n.full;
    });
  }, []);

  const openProject = useCallback(
    (slug: string) => {
      const p = projects.find((x) => x.slug === slug);
      if (!p) return;
      lastFocus.current = document.activeElement as HTMLElement;
      setOpen(p);
      setPos(0);
      setSrc("");
      if (p.photos.length) renderSlide(0);
      requestAnimationFrame(() =>
        closeBtn.current?.focus({ preventScroll: true }),
      );
    },
    [renderSlide],
  );

  const closeProject = useCallback(() => {
    setOpen(null);
    setTimeout(() => setSrc(""), 400);
    if (lastFocus.current) lastFocus.current.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open !== null);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
      if (open.photos.length) {
        if (e.key === "ArrowRight") renderSlide(posRef.current + 1);
        if (e.key === "ArrowLeft") renderSlide(posRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, renderSlide, closeProject]);

  const photo = open?.photos[pos] as ProjectPhoto | undefined;

  return (
    <section className="gallery section" id="projects">
      <div className="wrap">
        <div className="gallery__head">
          <Reveal>
            <p className="secnum">{t("gal.num")}</p>
            <Rich as="h2" className="h2" html={t("gal.h2")} />
          </Reveal>
          <Reveal>
            <div className="gallery__introbox">
              <p className="gallery__intro">{t("gal.intro")}</p>
              <p className="gallery__hint">{t("projects.hint")}</p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="filters" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`chip ${active === f ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
              >
                <span>{t(`chip.${f}`)}</span> <i>{counts[f]}</i>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="pgrid" aria-live="polite">
          {visible.map((p) => (
            <ProjectCard key={p.slug} p={p} onOpen={openProject} />
          ))}
        </div>
        <p className="grid__empty" hidden={visible.length > 0}>
          {t("gal.empty")}
        </p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lb"
            role="dialog"
            aria-modal="true"
            aria-label={open.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeProject();
            }}
            onTouchStart={(e) => {
              if (e.touches.length !== 1 || !open.photos.length) return;
              touch.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                active: true,
              };
            }}
            onTouchEnd={(e) => {
              if (!touch.current.active) return;
              touch.current.active = false;
              const dx = e.changedTouches[0].clientX - touch.current.x;
              const dy = e.changedTouches[0].clientY - touch.current.y;
              if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
                renderSlide(posRef.current + (dx < 0 ? 1 : -1));
              } else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) {
                closeProject();
              }
            }}
          >
            <button
              ref={closeBtn}
              className="lb__close"
              aria-label="Close viewer"
              onClick={closeProject}
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

            {open.photos.length > 0 && (
              <>
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

                <figure
                  className="lb__stage"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) closeProject();
                  }}
                >
                  <div
                    className={`lb__imgwrap ${ready ? "is-ready" : ""}`}
                  >
                    {src && (
                      <img
                        src={src}
                        alt={`${photo?.title ?? ""} — ${open.name}`}
                        onLoad={() => setReady(true)}
                      />
                    )}
                    <div className="lb__spin" />
                  </div>
                </figure>

                <div className="lb__bar">
                  <div className="lb__info">
                    <span className="lb__series">{open.name}</span>
                    <span className="lb__title">{photo?.title}</span>
                  </div>
                  <div className="lb__count">
                    <span>{pos + 1}</span> <i>/</i>{" "}
                    <span>{open.photos.length}</span>
                  </div>
                </div>
              </>
            )}

            {open.documents.length > 0 && (
              <div className="docs">
                <div className="docs__head">
                  <span className="lb__series">{t("projects.documents")}</span>
                  <span className="lb__title">{open.name}</span>
                </div>
                <div className="docs__list">
                  {open.documents.map((d) => (
                    <a
                      key={d.file}
                      className="docs__item"
                      href={`/assets/projects/${open.slug}/${d.file}`}
                      download={d.name}
                      target="_blank"
                      rel="noopener"
                    >
                      <span className="docs__ext">{d.ext}</span>
                      <span className="docs__name">{d.name}</span>
                      <span className="docs__size">{fmtSize(d.size)}</span>
                      <svg
                        className="docs__arw"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                      >
                        <path
                          d="M7 17L17 7M9 7h8v8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
