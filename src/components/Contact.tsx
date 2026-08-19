"use client";

import { useI18n } from "@/lib/i18n";
import { Reveal, Rich } from "@/lib/reveal";

const SOCIALS = [
  {
    n: "01",
    name: "Facebook",
    handle: "/duythinhdo3",
    href: "https://www.facebook.com/duythinhdo3",
  },
];

export function Contact() {
  const { t } = useI18n();

  return (
    <section className="contact section" id="contact">
      <div className="wrap">
        <Reveal>
          <p className="secnum">{t("contact.num")}</p>
        </Reveal>
        <Reveal>
          <Rich as="h2" className="contact__h" html={t("contact.h2")} />
        </Reveal>

        <Reveal>
          <div className="social">
            {SOCIALS.map((s) => (
              <a
                key={s.n}
                className="social__item"
                href={s.href}
                target="_blank"
                rel="noopener"
              >
                <span className="social__n">{s.n}</span>
                <span className="social__name">{s.name}</span>
                <span className="social__handle">{s.handle}</span>
                <svg
                  className="social__arw"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
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
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
