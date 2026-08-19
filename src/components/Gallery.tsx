"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GRID_PHOTO_BASE } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/lib/reveal";
import photosRaw from "@/lib/photos.json";

type Photo = {
  slug: string;
  title: string;
  series: string;
  tags: string[];
  w: number;
  h: number;
  ratio: number;
  lqip: string;
  full: string;
  credit?: string;
};

const photos = photosRaw as Photo[];

const FILTERS = [
  "all",
  "portrait",
  "fashion",
  "food",
  "product",
  "editorial",
] as const;
type Filter = (typeof FILTERS)[number];

const GAP = 14;
const ROW = 6;

const colCount = () => {
  const w = window.innerWidth;
  if (w < 380) return 1;
  if (w < 900) return 2;
  if (w < 1300) return 3;
  return 4;
};

type TileLayout = {
  height: number;
  colSpan: number;
  rowEnd: number;
  cropped: boolean;
  croptall: boolean;
};

function Tile({
  p,
  layout,
  hidden,
  onOpen,
}: {
  p: Photo;
  layout: TileLayout | null;
  hidden: boolean;
  onOpen: (slug: string) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const { t } = useI18n();

  return (
    <motion.button
      type="button"
      className={`tile ${loaded ? "is-loaded" : ""} ${
        layout?.cropped ? "is-cropped" : ""
      } ${layout?.croptall ? "is-croptall" : ""} ${
        hidden ? "is-hidden" : ""
      }`}
      style={
        layout
          ? {
              height: layout.height,
              gridColumn: `span ${layout.colSpan}`,
              gridRowEnd: `span ${layout.rowEnd}`,
              marginBottom: GAP,
            }
          : undefined
      }
      initial={{ opacity: 0, y: 26, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.02, margin: "0px 0px -4% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`${p.title} — ${t("lb.open")}`}
      onClick={() => onOpen(p.slug)}
    >
      {p.lqip && (
        <span
          className="tile__ph"
          style={{ backgroundImage: `url('${p.lqip}')` }}
        />
      )}      <img
        alt={`${p.title} — ${p.series}`}
        loading="lazy"
        decoding="async"
        src={`${GRID_PHOTO_BASE}/${p.slug}.jpg`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      <span className="tile__veil" />
      <span className="tile__cap">
        <span className="tile__txt">
          <span className="tile__s">{p.series}</span>
          <span className="tile__t">{p.title}</span>
        </span>
        <span className="tile__zoom">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path
              d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </motion.button>
  );
}

export function Gallery() {
  const { t } = useI18n();
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Filter>("all");
  const [cols, setCols] = useState(4);
  const [layouts, setLayouts] = useState<Record<string, TileLayout>>({});

  const visible = useMemo(
    () =>
      active === "all"
        ? photos
        : photos.filter((p) => p.tags.includes(active)),
    [active],
  );

  const layout = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const c = colCount();
    const total = grid.clientWidth;
    if (total <= 0) return;
    setCols(c);
    const colW = (total - GAP * (c - 1)) / c;
    const clampRatio = c <= 2;
    const MIN_R = 0.5;
    const MAX_R = 2.0;

    const next: Record<string, TileLayout> = {};
    visible.forEach((p) => {
      const shown = clampRatio
        ? Math.min(Math.max(p.ratio, MIN_R), MAX_R)
        : p.ratio;
      const span = p.ratio > 1.5 && c > 1 ? 2 : 1;
      const w = colW * span + GAP * (span - 1);
      const h = w / shown;
      const cropped = Math.abs(shown - p.ratio) > 0.001;
      next[p.slug] = {
        height: h,
        colSpan: span,
        rowEnd: Math.max(1, Math.round((h + GAP) / ROW)),
        cropped,
        croptall: cropped && p.ratio < 1,
      };
    });
    setLayouts(next);
  }, [visible]);

  useLayoutEffect(() => {
    layout();
    const raf = requestAnimationFrame(layout);
    const t1 = setTimeout(layout, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
    };
  }, [layout]);

  useEffect(() => {
    let rTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rTimer);
      rTimer = setTimeout(layout, 120);
    };
    const onOrient = () => setTimeout(layout, 250);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrient);
    return () => {
      clearTimeout(rTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrient);
    };
  }, [layout]);

  /* ── lightbox ── */
  const [lbOpen, setLbOpen] = useState(false);
  const [lbPos, setLbPos] = useState(0);
  const [lbSrc, setLbSrc] = useState("");
  const [lbReady, setLbReady] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const lbCloseBtn = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const lbPosRef = useRef(lbPos);
  const visibleRef = useRef(visible);

  useEffect(() => {
    lbPosRef.current = lbPos;
  }, [lbPos]);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  const renderSlide = useCallback(
    (pos: number) => {
      const list = visibleRef.current;
      const next = ((pos % list.length) + list.length) % list.length;
      setLbPos(next);
      const p = list[next];
      if (!p) return;
      setLbReady(false);
      setLbSrc(`${GRID_PHOTO_BASE}/${p.slug}.jpg`);

      const full = new Image();
      full.decoding = "async";
      full.src = p.full;
      full.onload = () => {
        if (visibleRef.current[lbPosRef.current]?.slug === p.slug) {
          setLbSrc(full.src);
        }
      };

      [1, -1].forEach((d) => {
        const n = list[(next + d + list.length) % list.length];
        if (n) new Image().src = n.full;
      });
    },
    [],
  );

  const openLightbox = useCallback(
    (slug: string) => {
      const i = visibleRef.current.findIndex((p) => p.slug === slug);
      if (i < 0) return;
      lastFocus.current = document.activeElement as HTMLElement;
      setLbOpen(true);
      renderSlide(i);
      requestAnimationFrame(() =>
        lbCloseBtn.current?.focus({ preventScroll: true }),
      );
    },
    [renderSlide],
  );

  const closeLightbox = useCallback(() => {
    setLbOpen(false);
    setTimeout(() => setLbSrc(""), 400);
    if (lastFocus.current) lastFocus.current.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", lbOpen);
    return () => document.body.classList.remove("is-locked");
  }, [lbOpen]);

  useEffect(() => {
    if (!lbOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") renderSlide(lbPosRef.current + 1);
      if (e.key === "ArrowLeft") renderSlide(lbPosRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbOpen, renderSlide, closeLightbox]);

  const lbPhoto = visible[lbPos] as Photo | undefined;
  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: photos.length,
      portrait: 0,
      fashion: 0,
      food: 0,
      product: 0,
      editorial: 0,
    };
    photos.forEach((p) => p.tags.forEach((tag) => c[tag as Filter]++));
    return c;
  }, []);

  return (
    <section className="gallery section" id="gallery">
      <div className="wrap">
        <div className="gallery__head">
          <Reveal>
            <p className="secnum">{t("gal.num")}</p>
            <h2 className="h2">{t("gal.h2")}</h2>
          </Reveal>
          <Reveal>
            <p className="gallery__intro">{t("gal.intro")}</p>
          </Reveal>
        </div>

        <Reveal>
          <div
            className="filters"
            role="tablist"
            aria-label="Filter photographs"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`chip ${active === f ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
              >
                <span>{f === "all" ? t("chip.all") : t(`chip.${f}`)}</span>{" "}
                <i>{counts[f]}</i>
              </button>
            ))}
          </div>
        </Reveal>

        <div
          ref={gridRef}
          className="grid"
          aria-live="polite"
          style={
            {
              "--cols": cols,
              "--gap": `${GAP}px`,
            } as React.CSSProperties
          }
        >
          {photos.map((p) => (
            <Tile
              key={p.slug}
              p={p}
              layout={layouts[p.slug] ?? null}
              hidden={!layouts[p.slug]}
              onOpen={openLightbox}
            />
          ))}
        </div>
        <p className="grid__empty" hidden={visible.length > 0}>
          {t("gal.empty")}
        </p>
      </div>

      <AnimatePresence>
        {lbOpen && (
          <motion.div
            className="lb"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
            onTouchStart={(e) => {
              if (e.touches.length !== 1) return;
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
                renderSlide(lbPosRef.current + (dx < 0 ? 1 : -1));
              } else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) {
                closeLightbox();
              }
            }}
          >
            <button
              ref={lbCloseBtn}
              className="lb__close"
              aria-label="Close viewer"
              onClick={closeLightbox}
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
              onClick={() => renderSlide(lbPosRef.current - 1)}
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
              onClick={() => renderSlide(lbPosRef.current + 1)}
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
                if (e.target === e.currentTarget) closeLightbox();
              }}
            >
              <div
                className={`lb__imgwrap ${lbReady ? "is-ready" : ""}`}
              >
                {lbSrc && (
                  <img
                    src={lbSrc}
                    alt={lbPhoto ? `${lbPhoto.title} — ${lbPhoto.series}` : ""}
                    onLoad={() => setLbReady(true)}
                  />
                )}
                <div className="lb__spin" />
              </div>
            </figure>

            <div className="lb__bar">
              <div className="lb__info">
                <span className="lb__series">{lbPhoto?.series}</span>
                <span className="lb__title">{lbPhoto?.title}</span>
                {lbPhoto?.credit && (
                  <span className="lb__credit">{lbPhoto.credit}</span>
                )}
              </div>
              <div className="lb__count">
                <span>{lbPos + 1}</span> <i>/</i>{" "}
                <span>{visible.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
