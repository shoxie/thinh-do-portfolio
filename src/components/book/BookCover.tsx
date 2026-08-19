"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BOOK, CAMPAIGN } from "@/lib/campaign";
import { EASE_OUT } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import { Reveal, Rich } from "@/lib/reveal";

export function BookCover() {
  const { lang, t } = useI18n();
  const c = CAMPAIGN[lang];

  return (
    <>
      <section className="bk-hero">
        <div className="bk-hero__bg">
          <span
            className="bk-hero__ph"
            style={{ backgroundImage: `url('${BOOK.cover.lqip}')` }}
          />
          <img
            className="bk-hero__img"
            src={BOOK.cover.src}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
          <div className="bk-hero__scrim" />
        </div>

        <div className="bk-hero__in wrap">
          <div className="bk-hero__content">
            <p className="hero__eyebrow">
              <span className="tick" />
              <span>{c.eyebrow}</span>
            </p>
            <h1 className="bk-title">
              <span className="bk-title__line">
                <motion.span
                  initial={{ y: "106%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE_OUT }}
                >
                  {c.title1}
                </motion.span>
              </span>
              <span className="bk-title__line bk-title__line--em">
                <motion.span
                  initial={{ y: "106%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.12 }}
                >
                  <em>{c.title2}</em>
                </motion.span>
              </span>
            </h1>
            <p className="bk-hero__lede">{c.lede}</p>
          </div>

          <div className="bk-hero__meta">
            <div className="hero__metacol">
              <span className="k">{c.byK}</span>
              <span className="v">{c.byV}</span>
            </div>
            <div className="hero__metacol">
              <span className="k">{c.dateK}</span>
              <span className="v">{c.dateV}</span>
            </div>
            <div className="hero__metacol">
              <span className="k">{c.specK}</span>
              <span className="v">{c.specV}</span>
            </div>
            <div className="bk-hero__cta">
              <a className="btn btn--primary" href="#contents">
                <span>{c.cta}</span>
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path
                    d="M12 4v16m0 0l6-6m-6 6l-6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <a
          className="hero__scroll"
          href="#contents"
          aria-label={t("hero.scroll")}
        >
          <span className="hero__scrolltxt">{t("hero.scroll")}</span>
          <span className="hero__scrollline">
            <i />
          </span>
        </a>
      </section>

      <section className="bk-toc section" id="contents">
        <div className="wrap">
          <Reveal>
            <p className="secnum">{c.tocNum}</p>
            <Rich as="h2" className="h2" html={c.tocH2} />
          </Reveal>
          <nav className="bk-toc__list" aria-label={c.tocNum}>
            {c.tocRows.map((row, i) => (
              <Reveal key={row.id} delay={0.05 * i}>
                <Link className="bk-toc__row" href={`#${row.id}`}>
                  <span className="bk-toc__n">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="bk-toc__name">{row.name}</span>
                  <span className="bk-toc__en">{row.en}</span>
                  <svg
                    className="bk-toc__arw"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    aria-hidden="true"
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
                </Link>
              </Reveal>
            ))}
          </nav>
          <Reveal>
            <p className="bk-toc__note">{c.tocNote}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
