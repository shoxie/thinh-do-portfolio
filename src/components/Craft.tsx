"use client";

import { Reveal } from "@/lib/reveal";
import { useI18n } from "@/lib/i18n";

export function Craft() {
  const { t } = useI18n();

  return (
    <section className="craft section" id="craft">
      <div className="wrap">
        <Reveal>
          <p className="secnum">{t("craft.num")}</p>
        </Reveal>
        <Reveal>
          <h2 className="h2 craft__h">{t("craft.h2")}</h2>
        </Reveal>

        <div className="craft__grid">
          <Reveal className="card card--term" whileHover={{ y: -3 }}>
            <div className="card__head">
              <span className="card__tag">{t("craft.tag1")}</span>
              <h3>{t("craft.card1")}</h3>
            </div>
            <div className="term">
              <div className="term__bar">
                <i />
                <i />
                <i />
                <span>Do Duy Thinh — zsh</span>
              </div>
              <pre className="term__body">
                <code>
                  <span className="c">$</span> whoami{"\n"}
                  Do Duy Thinh{"\n\n"}
                  <span className="c">$</span> cat ~/.focus{"\n"}
                  <span className="g">▸</span> portrait &amp; editorial work{"\n"}
                  <span className="g">▸</span> fashion &amp; studio shoots{"\n"}
                  <span className="g">▸</span> food &amp; product photography{"\n"}
                  <span className="g">▸</span> cinematic framing{"\n\n"}
                  <span className="c">$</span> <span className="dim">_</span>
                </code>
              </pre>
            </div>
            <p className="card__note">
              <span>{t("craft.note1")}</span>
            </p>
          </Reveal>

          <Reveal className="card" whileHover={{ y: -3 }}>
            <div className="card__head">
              <span className="card__tag">{t("craft.tag2")}</span>
              <h3>{t("craft.card2")}</h3>
            </div>
            <ul className="lines">
              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n}>
                  <span>{t(`craft.l${n}`)}</span>
                </li>
              ))}
            </ul>
            <p className="card__note">
              <span>{t("craft.note2")}</span>
            </p>
          </Reveal>

          <Reveal className="card card--wide" whileHover={{ y: -3 }}>
            <div className="card__head">
              <span className="card__tag">{t("craft.tag3")}</span>
              <h3>{t("craft.card3")}</h3>
            </div>
            <div className="bts">
              <img
                src="/assets/photos/bts/bts-03.jpg"
                alt="Behind the scenes on location"
                loading="lazy"
                decoding="async"
                width="1400"
                height="587"
              />
              <img
                src="/assets/photos/bts/bts-02.jpg"
                alt="On set with the subject"
                loading="lazy"
                decoding="async"
                width="1400"
                height="586"
              />
            </div>
            <p className="card__note">
              <span>{t("craft.note3")}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
