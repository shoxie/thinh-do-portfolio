"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { PAPER_LABELS, PAPER_NOTES } from "@/lib/paperNotes";
import {
  fmtSize,
  nextProjectSlug,
  PROJECT_COPY,
  PROJECTS,
  type Project,
  type ProjectDoc,
} from "@/lib/projectPages";
import { Reveal, Rich } from "@/lib/reveal";

function DocRow({
  doc,
  index,
  slug,
}: {
  doc: ProjectDoc;
  index: number;
  slug: string;
}) {
  const { lang } = useI18n();
  const note = PAPER_NOTES[doc.file];
  const [open, setOpen] = useState(false);
  const panelId = `panel-${doc.file.replace(/[^a-z0-9]+/gi, "-")}`;
  const download = `${doc.name}.${doc.ext}`;

  return (
    <div className={`pr-docs__entry ${open ? "is-open" : ""}`}>
      <div className="pr-docs__row">
        {note ? (
          <button
            type="button"
            className="pr-docs__toggle"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="pr-docs__n">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="pr-docs__ext">{doc.ext}</span>
            <span className="pr-docs__name">{doc.name}</span>
            <svg
              className="pr-docs__chev"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <div className="pr-docs__toggle pr-docs__toggle--static">
            <span className="pr-docs__n">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="pr-docs__ext">{doc.ext}</span>
            <span className="pr-docs__name">{doc.name}</span>
          </div>
        )}
        <span className="pr-docs__size">{fmtSize(doc.size)}</span>
        <a
          className="pr-docs__dl"
          href={`/assets/projects/${slug}/${doc.file}`}
          download={download}
          target="_blank"
          rel="noopener"
          aria-label={`${lang === "vi" ? "Tải xuống" : "Download"} — ${doc.name}`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M12 5v11m0 0l-4-4m4 4l4-4M5 19h14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {note && open ? (
        <div className="pr-docs__panel" id={panelId}>
          <p className="pr-docs__desc">{note.desc}</p>
          <ul className="pr-docs__notes">
            <li>
              <span className="pr-docs__notek">{PAPER_LABELS.learned}</span>
              <span className="pr-docs__notev">{note.learned}</span>
            </li>
            <li>
              <span className="pr-docs__notek">{PAPER_LABELS.applied}</span>
              <span className="pr-docs__notev">{note.applied}</span>
            </li>
            <li>
              <span className="pr-docs__notek">{PAPER_LABELS.future}</span>
              <span className="pr-docs__notev">{note.future}</span>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function ResearchProject({ project }: { project: Project }) {
  const { lang } = useI18n();
  const copy = PROJECT_COPY[project.slug][lang];
  const totalSize = project.documents.reduce((s, d) => s + d.size, 0);
  const formats = [...new Set(project.documents.map((d) => d.ext.toUpperCase()))];
  const letter = project.name.trim().charAt(0).toUpperCase();
  const nextSlug = nextProjectSlug(project.slug);

  return (
    <>
      <section className="pr-doc-hero">
        <div className="pr-doc-hero__glow" />
        <div className="pr-doc-hero__in wrap">
          <div className="pr-doc-hero__content">
            <p className="hero__eyebrow">
              <span className="tick" />
              <span>{copy.eyebrow}</span>
            </p>
            <h1 className="pr-doc-title">
              <span className="pr-doc-title__line">
                <motion.span
                  initial={{ y: "106%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {project.name}
                </motion.span>
              </span>
            </h1>
          </div>

          <div className="pr-doc-hero__letter" aria-hidden="true">
            {letter}
          </div>

          <div className="bk-hero__meta">
            <div className="hero__metacol">
              <span className="k">{copy.metaPapers}</span>
              <span className="v">{project.documents.length}</span>
            </div>
            <div className="hero__metacol">
              <span className="k">{copy.metaSize}</span>
              <span className="v">{fmtSize(totalSize)}</span>
            </div>
            <div className="hero__metacol">
              <span className="k">{copy.metaFormats}</span>
              <span className="v">{formats.join(" · ")}</span>
            </div>
            <div className="bk-hero__cta">
              <a className="btn btn--primary" href="#documents">
                <span>{copy.cta}</span>
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
      </section>

      <section className="pr-overview section" id="overview">
        <div className="wrap">
          <Reveal>
            <p className="secnum">00 — Overview</p>
            <Rich as="h2" className="h2" html={copy.h2} />
          </Reveal>
          <Reveal className="pr-overview__body">
            <div className="bk-copy">
              {copy.lede.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pr-docs section" id="documents">
        <div className="wrap">
          <header className="pr-head">
            <Reveal>
              <p className="secnum">01 — Documents</p>
              <Rich as="h2" className="h2" html={copy.docsH2} />
            </Reveal>
            <Reveal delay={0.12}>
              <p className="pr-head__meta">
                {project.documents.length} · {formats.join(" · ")}
              </p>
            </Reveal>
          </header>
          <div className="pr-docs__list">
            {project.documents.map((d, i) => (
              <Reveal key={d.file} delay={0.05 * i}>
                <DocRow doc={d} index={i} slug={project.slug} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="pr-docs__note">{project.description}</p>
          </Reveal>
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
    </>
  );
}
