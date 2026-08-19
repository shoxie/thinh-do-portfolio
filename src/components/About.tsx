"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal, Rich } from "@/lib/reveal";
import { useI18n } from "@/lib/i18n";
import photos from "@/lib/photos.json";

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1300;
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  return value;
}

function Stat({
  value,
  label,
  start,
}: {
  value: number;
  label: string;
  start: boolean;
}) {
  const n = useCountUp(value, start);
  return (
    <li>
      <span className="stats__n">{n}</span>
      <span className="stats__l">{label}</span>
    </li>
  );
}

export function About() {
  const { t } = useI18n();
  const statsRef = useRef<HTMLUListElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.6 });

  const frames = photos.length;
  const series = new Set(photos.map((p) => p.series)).size;

  return (
    <section className="about section" id="about">
      <div className="wrap">
        <div className="about__grid">
          <Reveal className="about__left">
            <p className="secnum">{t("about.num")}</p>
            <figure className="about__figure">
              <img
                src="/assets/photos/bts/about.jpg"
                alt="A panoramic frame shot on location"
                loading="lazy"
                decoding="async"
                width="1800"
                height="875"
              />
              <figcaption>{t("about.caption")}</figcaption>
            </figure>
          </Reveal>

          <div className="about__right">
            <Reveal>
              <Rich as="h2" className="h2" html={t("about.h2")} />
            </Reveal>

            <Reveal>
              <Rich className="about__body" html={t("about.body")} />
            </Reveal>

            <Reveal>
              <ul className="stats" ref={statsRef}>
                <Stat
                  value={frames}
                  label={t("stats.frames")}
                  start={statsInView}
                />
                <Stat
                  value={series}
                  label={t("stats.series")}
                  start={statsInView}
                />
                <li>
                  <span className="stats__n">3:2</span>
                  <span className="stats__l">{t("stats.ratio")}</span>
                </li>
                <li>
                  <span className="stats__n">∞</span>
                  <span className="stats__l">{t("stats.golden")}</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
