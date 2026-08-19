"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n, type Lang } from "@/lib/i18n";

const NAV = [
  { href: "#about", key: "nav.about" },
  { href: "#craft", key: "nav.craft" },
  { href: "#gallery", key: "nav.gallery" },
  { href: "#contact", key: "nav.contact" },
] as const;

const SOCIALS = [
  { href: "https://www.facebook.com/duythinhdo3", label: "Facebook" },
];

function LangSwitch({ variant }: { variant?: "mob" }) {
  const { lang, setLang } = useI18n();
  const pick = (l: Lang) => (
    <button
      type="button"
      className={`langswitch__btn ${lang === l ? "is-active" : ""}`}
      aria-pressed={lang === l}
      onClick={() => setLang(l)}
    >
      {variant === "mob" ? (l === "en" ? "English" : "Tiếng Việt") : l.toUpperCase()}
    </button>
  );
  return (
    <div
      className={`langswitch ${variant === "mob" ? "langswitch--mob" : ""}`}
      role="group"
      aria-label="Language / Ngôn ngữ"
    >
      {pick("en")}
      {pick("vi")}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const lastY = useRef(0);
  const navOpenRef = useRef(false);

  useEffect(() => {
    navOpenRef.current = navOpen;
  }, [navOpen]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(navOpenRef.current ? false : y > lastY.current && y > 400);
      lastY.current = y;
      ticking = false;
    };
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeNav = useCallback(() => setNavOpen(false), []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", navOpen);
    return () => document.body.classList.remove("is-locked");
  }, [navOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navOpen) setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  return (
    <>
      <header
        className={`header ${solid ? "is-solid" : ""} ${hidden && !navOpen ? "is-hidden" : ""}`}
      >
        <a className="header__brand" href="#top">
          <span className="header__dot" />
          <span className="header__name">Thinh&nbsp;Do</span>
          <span className="header__alias">/ gayshit123</span>
        </a>
        <nav className="header__nav" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {t(n.key)}
            </a>
          ))}
        </nav>
        <LangSwitch />
        <button
          className="header__burger"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          aria-controls="mobileNav"
          onClick={() => setNavOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {navOpen && (
          <motion.div
            id="mobileNav"
            className="mobnav"
            aria-hidden={!navOpen}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <nav className="mobnav__list">
              {NAV.map((n, i) => (
                <a key={n.href} href={n.href} onClick={closeNav}>
                  <em>0{i + 1}</em> <span>{t(n.key)}</span>
                </a>
              ))}
            </nav>
            <LangSwitch variant="mob" />
            <div className="mobnav__social">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  onClick={closeNav}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
