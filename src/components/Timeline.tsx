"use client";

import { Reveal, Rich } from "@/lib/reveal";
import { useI18n } from "@/lib/i18n";

function TimelineItem({
  k,
  title,
  meta,
  body,
  bullets,
}: {
  k: string;
  title: string;
  meta?: string;
  body?: string;
  bullets?: string[];
}) {
  const isHtmlBody = body?.includes("<");
  return (
    <div className="tl__item">
      <div className="tl__head">
        <span className="tl__k">{k}</span>
        <h3 className="tl__title">{title}</h3>
        {meta && <span className="tl__meta">{meta}</span>}
      </div>
      {body && (
        <div className="tl__body">
          {isHtmlBody ? <Rich html={body} /> : <p>{body}</p>}
        </div>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="tl__bullets">
          {bullets.map((b, i) => (
            <li key={i}>
              <Rich html={b} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Timeline() {
  const { t } = useI18n();
  return (
    <section className="timeline section" id="timeline">
      <div className="wrap">
        <Reveal>
          <p className="secnum">{t("timeline.num")}</p>
        </Reveal>
        <Reveal>
          <Rich as="h2" className="h2" html={t("timeline.h2")} />
        </Reveal>
        <Reveal>
          <p className="timeline__intro">{t("timeline.intro")}</p>
        </Reveal>

        <div className="tl">
          <Reveal>
            <TimelineItem
              k={t("timeline.edu.k")}
              title={t("timeline.edu.title")}
              meta={t("timeline.edu.meta")}
              body={t("timeline.edu.body")}
              bullets={[t("timeline.edu.b1"), t("timeline.edu.b2"), t("timeline.edu.b3")]}
            />
          </Reveal>

          <Reveal>
            <TimelineItem
              k={t("timeline.work.k")}
              title={t("timeline.work.title")}
              meta={t("timeline.work.meta")}
              body={t("timeline.work.body")}
              bullets={[t("timeline.work.b1"), t("timeline.work.b2"), t("timeline.work.b3")]}
            />
          </Reveal>

          <Reveal>
            <div className="tl__item tl__item--accent">
              <div className="tl__head">
                <span className="tl__k">{t("timeline.reflect.k")}</span>
                <h3 className="tl__title">{t("timeline.reflect.title")}</h3>
              </div>
              <div className="tl__body">
                <Rich html={t("timeline.reflect.body")} />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="tl__skills">
            <div className="tl__skillshead">
              <span className="tl__k">{t("timeline.skills.k")}</span>
              <h3 className="tl__skillstitle">{t("timeline.skills.title")}</h3>
              <p className="tl__skillsintro">{t("timeline.skills.intro")}</p>
            </div>
            <div className="tl__skillgrid">
              <div className="tl__skill">
                <span className="tl__skillk">{t("timeline.skills.s1k")}</span>
                <p className="tl__skillv">{t("timeline.skills.s1v")}</p>
              </div>
              <div className="tl__skill">
                <span className="tl__skillk">{t("timeline.skills.s2k")}</span>
                <p className="tl__skillv">{t("timeline.skills.s2v")}</p>
              </div>
              <div className="tl__skill">
                <span className="tl__skillk">{t("timeline.skills.s3k")}</span>
                <p className="tl__skillv">{t("timeline.skills.s3v")}</p>
              </div>
              <div className="tl__skill">
                <span className="tl__skillk">{t("timeline.skills.s4k")}</span>
                <p className="tl__skillv">{t("timeline.skills.s4v")}</p>
              </div>
              <div className="tl__skill tl__skill--wide">
                <span className="tl__skillk">{t("timeline.skills.s5k")}</span>
                <p className="tl__skillv">{t("timeline.skills.s5v")}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="tl__future">
            <div className="tl__futurehead">
              <span className="tl__k">{t("timeline.future.k")}</span>
              <h3 className="tl__futuretitle">{t("timeline.future.title")}</h3>
            </div>
            <ul className="tl__futurelist">
              <li>{t("timeline.future.b1")}</li>
              <li>{t("timeline.future.b2")}</li>
              <li>{t("timeline.future.b3")}</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
