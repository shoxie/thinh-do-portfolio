"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  BOOK,
  CAMPAIGN,
  type BookBlock,
  type BookEntry,
  type CampaignImg,
} from "@/lib/campaign";
import { useI18n } from "@/lib/i18n";
import { nextProjectSlug, PROJECTS } from "@/lib/projectPages";
import { Reveal, Rich } from "@/lib/reveal";

function Fig({
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

function Paras({ block }: { block: BookBlock }) {
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

function EntryShell({
  entry,
  alt,
  children,
}: {
  entry: BookEntry;
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

function LeadSpread({
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

function Block({
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

function Duo({
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

function PortraitEntry({ entry }: { entry: BookEntry }) {
  const [light, narrative, challenges] = entry.blocks;
  return (
    <EntryShell entry={entry}>
      <LeadSpread
        block={entry.lead}
        media={
          <Fig
            m={BOOK.portrait01}
            alt="Portrait study — editorial frame"
            caption="01 / Portrait Study"
          />
        }
      />
      <Block
        block={light}
        flip
        media={
          <Fig
            m={BOOK.portrait02}
            alt="Portrait study — light and form"
            caption="02 / Light & Form"
          />
        }
      />
      <Block block={narrative} textOnly />
      <Reveal className="bk-duo--wide">
        <Duo
          a={BOOK.portrait03}
          b={BOOK.portrait04}
          altA="Portrait study — the narrative"
          altB="Portrait study — the narrative"
          capA="03 / The Narrative"
          capB="04 / The Narrative"
        />
      </Reveal>
      <Block block={challenges} textOnly />
    </EntryShell>
  );
}

function FashionEntry({ entry }: { entry: BookEntry }) {
  const [craft, framed] = entry.blocks;
  return (
    <EntryShell entry={entry} alt>
      <LeadSpread
        block={entry.lead}
        media={
          <Fig
            m={BOOK.fashion01}
            alt="Fashion study — atelier"
            caption="01 / Atelier"
          />
        }
      />
      <Block block={craft} textOnly />
      <Reveal className="bk-mosaic">
        <div className="bk-mosaic__left">
          <Fig m={BOOK.craft03} alt="Fashion study — styling" />
          <Fig m={BOOK.craft04} alt="Fashion study — styling" />
          <Fig m={BOOK.craft06} alt="Fashion study — styling" />
          <Fig m={BOOK.craft07} alt="Fashion study — styling" />
        </div>
        <div className="bk-mosaic__right">
          <div className="m-wide">
            <Fig m={BOOK.craft01} alt="Fashion study — posing" />
          </div>
          <div className="m-tall">
            <Fig m={BOOK.craft02} alt="Fashion study — posing" />
          </div>
          <div className="m-sm">
            <Fig m={BOOK.craft05} alt="Fashion study — posing" />
          </div>
          <div className="m-sq1">
            <Fig m={BOOK.craft08} alt="Fashion study — posing" />
          </div>
          <div className="m-sq2">
            <Fig m={BOOK.craft09} alt="Fashion study — posing" />
          </div>
        </div>
      </Reveal>
      <Block block={framed} textOnly />
      <Reveal className="bk-trio">
        <Fig
          m={BOOK.fashion02}
          alt="Fashion series — final frame"
          caption="02 / Framed Form"
        />
        <Fig
          m={BOOK.fashion03}
          alt="Fashion series — final frame"
          caption="03 / Framed Form"
        />
        <Fig
          m={BOOK.fashion04}
          alt="Fashion series — final frame"
          caption="04 / Framed Form"
        />
      </Reveal>
    </EntryShell>
  );
}

function ProductEntry({ entry }: { entry: BookEntry }) {
  const [composition] = entry.blocks;
  return (
    <EntryShell entry={entry}>
      <LeadSpread
        block={entry.lead}
        media={
          <Duo
            a={BOOK.product01}
            b={BOOK.product02}
            altA="Product study — perfume still life"
            altB="Product study — perfume still life"
            capA="01 / Scene"
            capB="02 / Scene"
          />
        }
      />
      <Block
        block={composition}
        flip
        media={
          <Duo
            a={BOOK.product03}
            b={BOOK.product04}
            altA="Product study — perfume still life"
            altB="Product study — perfume still life"
            capA="03 / Scene"
            capB="04 / Scene"
          />
        }
      />
    </EntryShell>
  );
}

function FoodEntry({ entry }: { entry: BookEntry }) {
  const [heritage, craftsmanship] = entry.blocks;
  return (
    <EntryShell entry={entry} alt>
      <LeadSpread
        block={entry.lead}
        media={
          <Fig
            m={BOOK.food01}
            alt="Food study — Mid-Autumn mooncake"
            caption="01 / Mooncake"
          />
        }
      />
      <Block
        block={heritage}
        media={
          <Fig
            m={BOOK.food02}
            alt="Food study — heritage still life"
            caption="02 / Heritage"
          />
        }
      />
      <Block
        block={craftsmanship}
        flip
        media={
          <Duo
            a={BOOK.food03}
            b={BOOK.food04}
            altA="Food study — craftsmanship detail"
            altB="Food study — craftsmanship detail"
            capA="03 / Craftsmanship"
            capB="04 / Craftsmanship"
          />
        }
      />
    </EntryShell>
  );
}

function BtsSection() {
  const { lang } = useI18n();
  const c = CAMPAIGN[lang];
  return (
    <section className="bk-entry bk-entry--bts section" id="bts">
      <div className="wrap">
        <header className="bk-entry__head">
          <Reveal>
            <p className="secnum">{c.btsNum}</p>
            <Rich as="h2" className="h2" html={c.btsH2} />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="bk-entry__meta">{c.btsMeta}</p>
          </Reveal>
        </header>
        <Reveal className="bk-grid2">
          <Fig
            m={BOOK.bts01}
            alt="Behind the scenes"
            caption="01 — Behind the scenes"
          />
          <Fig
            m={BOOK.bts02}
            alt="Behind the scenes"
            caption="02 — Behind the scenes"
          />
          <Fig
            m={BOOK.bts03}
            alt="Behind the scenes"
            caption="03 — Behind the scenes"
          />
          <Fig
            m={BOOK.bts04}
            alt="Behind the scenes"
            caption="04 — Behind the scenes"
          />
        </Reveal>
      </div>
    </section>
  );
}

function BookEnd() {
  const { lang } = useI18n();
  const c = CAMPAIGN[lang];
  const nextSlug = nextProjectSlug("commercial-campaign");
  return (
    <section className="bk-end section">
      <div className="wrap pr-end__in">
        <Reveal>
          <Link className="bk-end__link" href="/">
            <span className="bk-end__arw">←</span>
            <span>{c.back}</span>
          </Link>
        </Reveal>
        {nextSlug ? (
          <Reveal delay={0.08}>
            <Link className="pr-end__next" href={`/projects/${nextSlug}`}>
              <span className="pr-end__nextk">{c.next}</span>
              <span className="pr-end__nextv">
                {PROJECTS.find((p) => p.slug === nextSlug)?.name}
                <span className="pr-end__nexta">→</span>
              </span>
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export function BookEntries() {
  const { lang } = useI18n();
  const entries = CAMPAIGN[lang].entries;
  return (
    <>
      <PortraitEntry entry={entries[0]} />
      <FashionEntry entry={entries[1]} />
      <ProductEntry entry={entries[2]} />
      <FoodEntry entry={entries[3]} />
      <BtsSection />
      <BookEnd />
    </>
  );
}
