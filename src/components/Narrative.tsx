"use client";

import { Reveal, Rich } from "@/lib/reveal";
import { useI18n } from "@/lib/i18n";

export function Narrative() {
  const { t } = useI18n();
  return (
    <section className="narrative section" id="narrative">
      <div className="wrap">
        <Reveal>
          <p className="secnum">{t("narrative.num")}</p>
        </Reveal>
        <Reveal>
          <Rich as="h2" className="h2" html={t("narrative.h2")} />
        </Reveal>
        <Reveal>
          <Rich className="narrative__lede" html={t("narrative.lede")} />
        </Reveal>

        <div className="narrative__grid">
          <Reveal className="narrative__block">
            <span className="narrative__k">{t("narrative.mylife.k")}</span>
            <div className="narrative__body">
              <p>{t("narrative.mylife.p1")}</p>
              <p>{t("narrative.mylife.p2")}</p>
              <p>{t("narrative.mylife.p3")}</p>
            </div>
          </Reveal>

          <Reveal className="narrative__block">
            <span className="narrative__k">{t("narrative.story.k")}</span>
            <div className="narrative__body">
              <p>{t("narrative.story.p1")}</p>
              <p>{t("narrative.story.p2")}</p>
              <p>{t("narrative.story.p3")}</p>
            </div>
          </Reveal>

          <Reveal className="narrative__block narrative__block--accent">
            <span className="narrative__k">{t("narrative.future.k")}</span>
            <div className="narrative__body">
              <p>{t("narrative.future.p1")}</p>
              <p>{t("narrative.future.p2")}</p>
              <p>{t("narrative.future.p3")}</p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <Rich className="narrative__analytical" html={t("narrative.analytical")} />
        </Reveal>
      </div>
    </section>
  );
}
