"use client";

import { Reveal, Rich } from "@/lib/reveal";
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
          <Rich as="h2" className="h2 craft__h" html={t("craft.h2")} />
        </Reveal>

        <div className="craft__grid">
          <Reveal className="card" whileHover={{ y: -3 }}>
            <div className="card__head">
              <span className="card__tag">{t("craft.tag1")}</span>
              <h3>{t("craft.card1")}</h3>
            </div>
            <div className="cam">
              <div className="cam__bar">
                <span className="cam__rec" aria-hidden="true" />
                <span className="cam__model">FUJIFILM XT5</span>
                <span className="cam__mode">M · AD</span>
              </div>
              <div className="cam__readout" aria-hidden="true">
                <span>
                  <i>ISO</i> 100
                </span>
                <span>
                  <i>SS</i> 1/2000
                </span>
                <span>
                  <i>ƒ</i> 1.2
                </span>
                <span>
                  <i>WB</i> 5200K
                </span>
              </div>
              <div className="cam__body">
                <p className="cam__focus">{t("craft.focus")}</p>
                <ul className="cam__list">
                  <li>
                    <span>{t("craft.cap1.ev1")}</span>
                  </li>
                  <li>
                    <span>{t("craft.cap1.ev2")}</span>
                  </li>
                  <li>
                    <span>{t("craft.cap1.ev3")}</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="card__note">
              <span>{t("craft.note1")}</span>
            </p>
            <p className="craft__evidence">
              <span className="craft__evidencek">{t("craft.evidence")}</span>
              <span>{t("craft.cap1.ev1")} · {t("craft.cap1.ev2")}</span>
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
            <div className="craft__evlist">
              <span className="craft__evidencek">{t("craft.evidence")}</span>
              <ul>
                <li>{t("craft.cap2.ev1")}</li>
                <li>{t("craft.cap2.ev2")}</li>
                <li>{t("craft.cap2.ev3")}</li>
              </ul>
            </div>
            <p className="card__note">
              <span>{t("craft.note2")}</span>
            </p>
          </Reveal>

          <Reveal className="card card--wide" whileHover={{ y: -3 }}>
            <div className="card__head">
              <span className="card__tag">{t("craft.tag3")}</span>
              <h3>{t("craft.card3")}</h3>
            </div>
            <div className="craft__evidencegrid">
              <div>
                <span className="craft__evidencek">{t("craft.evidence")} — Business literacy</span>
                <p className="craft__evp">{t("craft.cap3.ev1")}</p>
              </div>
              <div>
                <span className="craft__evidencek">{t("craft.evidence")} — Team listening</span>
                <p className="craft__evp">{t("craft.cap3.ev2")}</p>
              </div>
              <div>
                <span className="craft__evidencek">{t("craft.evidence")} — Fair production</span>
                <p className="craft__evp">{t("craft.cap3.ev3")}</p>
              </div>
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

        <Reveal>
          <p className="craft__analytical">{t("craft.analytical")}</p>
        </Reveal>
      </div>
    </section>
  );
}
