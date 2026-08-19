"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import {
  type BookBlock,
  type BookEntry,
  type CampaignImg,
  type CoverContent,
} from "@/lib/campaign";
import { EASE_OUT } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import { Reveal, Rich } from "@/lib/reveal";

export function Fig({
  m,
  alt,
  caption,
}: {
  m: CampaignImg;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="bk-fig">
      <div
        className="bk-fig__box"
        style={{ "--r": String(m.w / m.h) } as CSSProperties}
      >
        <span
          className="bk-fig__ph"
          style={{ backgroundImage: `url('${m.lqip}')` }}
        />
        <img
          src={m.src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={m.w}
          height={m.h}
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function Paras({ block }: { block: BookBlock }) {
  const split = block.split ?? block.paras.length;
  return (
    <>
      {block.paras.slice(0, split).map((p, i) => (
        <p key={`a-${i}`}>{p}</p>
      ))}
      {block.label2 ? <p className="bk-copy__label">{block.label2}</p> : null}
      {block.paras.slice(split).map((p, i) => (
        <p key={`b-${i}`}>{p}</p>
      ))}
    </>
  );
}

export function EntryShell({
  entry,
  alt,
  children,
}: {
  entry: Pick<BookEntry, "id" | "num" | "h2" | "meta">;
  alt?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`bk-entry section ${alt ? "bk-entry--alt" : ""}`}
      id={entry.id}
    >
      <div className="wrap">
        <header className="bk-entry__head">
          <Reveal>
            <p className="secnum">{entry.num}</p>
            <Rich as="h2" className="h2" html={entry.h2} />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="bk-entry__meta">{entry.meta}</p>
          </Reveal>
        </header>
        {children}
      </div>
    </section>
  );
}

export function LeadSpread({
  block,
  media,
  flip,
}: {
  block: BookBlock;
  media: ReactNode;
  flip?: boolean;
}) {
  return (
    <div className={`bk-spread ${flip ? "bk-spread--flip" : ""}`}>
      {flip ? (
        <Reveal className="bk-spread__media" delay={0.05}>
          {media}
        </Reveal>
      ) : null}
      <Reveal className="bk-spread__copy">
        <div className="bk-copy">
          {block.label ? <p className="bk-copy__label">{block.label}</p> : null}
          <Paras block={block} />
        </div>
      </Reveal>
      {!flip ? (
        <Reveal className="bk-spread__media" delay={0.08}>
          {media}
        </Reveal>
      ) : null}
    </div>
  );
}

export function Block({
  block,
  media,
  flip,
  textOnly,
}: {
  block: BookBlock;
  media?: ReactNode;
  flip?: boolean;
  textOnly?: boolean;
}) {
  const cls = [
    "bk-block",
    flip ? "bk-block--flip" : "",
    textOnly ? "bk-block--text" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      <Reveal className="bk-block__head">
        {block.label ? <p className="bk-copy__label">{block.label}</p> : null}
        {block.heading ? (
          <h3 className="bk-block__h3">{block.heading}</h3>
        ) : null}
        {block.tags ? (
          <ul className="bk-tags">
            {block.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </Reveal>
      {media ? (
        <Reveal className="bk-block__media" delay={0.08}>
          {media}
        </Reveal>
      ) : null}
      <Reveal className="bk-block__body" delay={0.05}>
        <div className="bk-copy">
          <Paras block={block} />
        </div>
      </Reveal>
    </div>
  );
}

export function Duo({
  a,
  b,
  altA,
  altB,
  capA,
  capB,
}: {
  a: CampaignImg;
  b: CampaignImg;
  altA: string;
  altB: string;
  capA?: string;
  capB?: string;
}) {
  return (
    <div className="bk-duo">
      <Fig m={a} alt={altA} caption={capA} />
      <Fig m={b} alt={altB} caption={capB} />
    </div>
  );
}

export function BookCover({
  content,
  coverImg,
}: {
  content: Record<"en" | "vi", CoverContent>;
  coverImg: CampaignImg;
}) {
  const { lang, t } = useI18n();
  const c = content[lang];

  return (
    <>
      <section className="bk-hero">
        <div className="bk-hero__bg">
          <span
            className="bk-hero__ph"
            style={{ backgroundImage: `url('${coverImg.lqip}')` }}
          />
          <img
            className="bk-hero__img"
            src={coverImg.src}
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
            {c.meta.map((m) => (
              <div className="hero__metacol" key={m.k}>
                <span className="k">{m.k}</span>
                <span className="v">{m.v}</span>
              </div>
            ))}
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

export function BookEnd({
  back,
  next,
  nextHref,
  nextName,
}: {
  back: string;
  next: string;
  nextHref?: string;
  nextName?: string;
}) {
  return (
    <section className="bk-end section">
      <div className="wrap pr-end__in">
        <Reveal>
          <Link className="bk-end__link" href="/">
            <span className="bk-end__arw">←</span>
            <span>{back}</span>
          </Link>
        </Reveal>
        {nextHref && nextName ? (
          <Reveal delay={0.08}>
            <Link className="pr-end__next" href={nextHref}>
              <span className="pr-end__nextk">{next}</span>
              <span className="pr-end__nextv">
                {nextName}
                <span className="pr-end__nexta">→</span>
              </span>
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
