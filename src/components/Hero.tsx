"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT } from "@/lib/config";
import { useI18n } from "@/lib/i18n";

const BGM_TRACKS = [
  { src: "/assets/audio/tim-em.m4a", label: "Tìm em — Hngle" },
  {
    src: "/assets/audio/we-dont-talk-anymore.m4a",
    label: "We Don't Talk Anymore — Instrumental",
  },
];

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

export function Hero() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  /* ── hero video ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      v.muted = true;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    v.addEventListener("loadeddata", tryPlay, { once: true });
    tryPlay();
    const nudge = () => {
      if (v.paused) tryPlay();
    };
    window.addEventListener("touchstart", nudge, { once: true, passive: true });
    window.addEventListener("click", nudge, { once: true, passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? tryPlay() : v.pause()));
      },
      { threshold: 0.05 },
    );
    if (heroRef.current) io.observe(heroRef.current);

    return () => {
      window.removeEventListener("touchstart", nudge);
      window.removeEventListener("click", nudge);
      io.disconnect();
    };
  }, []);

  /* ── background music ── */
  const bgmRef = useRef<HTMLAudioElement>(null);
  const fadeTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [tracks, setTracks] = useState<typeof BGM_TRACKS>([]);
  const [soundOn, setSoundOn] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const soundOnRef = useRef(false);

  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const found = [];
      for (const tr of BGM_TRACKS) {
        try {
          const r = await fetch(tr.src, { method: "HEAD", cache: "no-store" });
          if (r.ok) found.push(tr);
        } catch {
          /* offline — treat as missing */
        }
      }
      if (!cancelled) setTracks(found);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const canFade = () => {
    const bgm = bgmRef.current;
    if (!bgm) return false;
    const prev = bgm.volume;
    try {
      bgm.volume = 0.42;
      const settable = Math.abs(bgm.volume - 0.42) < 0.02;
      bgm.volume = prev;
      return settable;
    } catch {
      return false;
    }
  };

  const fadeTo = (target: number, done?: () => void) => {
    const bgm = bgmRef.current;
    if (!bgm) return;
    if (fadeTimer.current) clearInterval(fadeTimer.current);
    if (!canFade()) {
      if (done) done();
      return;
    }
    let ticks = 0;
    const step = (target - bgm.volume) / 18;
    fadeTimer.current = setInterval(() => {
      const v = bgm.volume + step;
      if (
        ++ticks > 40 ||
        (step > 0 && v >= target) ||
        (step < 0 && v <= target) ||
        !isFinite(v)
      ) {
        if (fadeTimer.current) clearInterval(fadeTimer.current);
        bgm.volume = clamp01(target);
        if (done) done();
      } else {
        bgm.volume = clamp01(v);
      }
    }, 28);
  };

  const startPlayback = () => {
    const bgm = bgmRef.current;
    if (!bgm) return;
    bgm.volume = canFade() ? 0 : 1;
    const started = bgm.play();
    const ok = () => {
      fadeTo(0.45);
      setSoundOn(true);
    };
    const fail = () => {
      setSoundOn(false);
    };
    if (started && started.then) started.then(ok, fail);
    else ok();
  };

  const loadTrack = (i: number) => {
    const bgm = bgmRef.current;
    if (!bgm || !tracks.length) return;
    const idx = (i + tracks.length) % tracks.length;
    setTrackIdx(idx);
    bgm.src = tracks[idx].src;
  };

  const onSoundClick = () => {
    const bgm = bgmRef.current;
    if (!tracks.length || !bgm) return;
    if (soundOnRef.current) {
      setSoundOn(false);
      fadeTo(0, () => bgm.pause());
      return;
    }
    if (!bgm.src) loadTrack(Math.floor(Math.random() * tracks.length));
    startPlayback();
  };

  const onSoundNext = () => {
    if (tracks.length < 2) return;
    loadTrack(trackIdx + 1);
    setSoundOn(true);
    startPlayback();
  };

  const soundLabel = !tracks.length
    ? t("sound.none")
    : soundOn
      ? t("sound.playing")
      : t("sound.play");

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__media">
        <video
          ref={videoRef}
          className="hero__video"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          src="/assets/video/hero.mp4"
          poster="/assets/video/poster.jpg"
          aria-hidden="true"
        />
        <div className="hero__scrim" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">
          <span className="tick" />
          <span>{t("hero.role1")}</span> <span className="x">×</span>{" "}
          <span>{t("hero.role2")}</span>
        </p>
        <h1 className="hero__title">
          <span className="line">
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: EASE_OUT }}
            >
              Thinh
            </motion.span>
          </span>
          <span className="line">
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.1 }}
            >
              Do
            </motion.span>
          </span>
        </h1>
        <p className="hero__alias">
          <span className="br">[</span>&nbsp;Do Duy Thinh&nbsp;
          <span className="br">]</span>
        </p>
        <p className="hero__lede">{t("hero.lede")}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#projects">
            <span>{t("hero.cta1")}</span>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path
                d="M5 12h13M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a className="btn btn--ghost" href="#about">
            {t("hero.cta2")}
          </a>
        </div>
      </div>

      <div className="hero__meta">
        <div className="hero__metacol">
          <span className="k">{t("hero.basedIn")}</span>
          <span className="v">{t("hero.basedInVal")}</span>
        </div>
        <div className="hero__metacol">
          <span className="k">{t("hero.shotOn")}</span>
          <span className="v">Fujifilm XT5 · Cinematic</span>
        </div>
        <div className="hero__metacol hero__metacol--sound">
          <button
            className={`soundbtn ${soundOn ? "is-on" : ""}`}
            onClick={onSoundClick}
            disabled={!tracks.length}
            aria-label={
              soundOn ? "Stop background music" : "Play background music"
            }
          >
            <span className="soundbtn__bars">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="soundbtn__label">{soundLabel}</span>
          </button>
          <button
            className="soundnext"
            onClick={onSoundNext}
            aria-label="Switch track"
            title="Switch track"
            hidden={tracks.length < 2}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <path
                d="M4 7h11m0 0l-3-3m3 3l-3 3M20 17H9m0 0l3-3m-3 3l3 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span
            className="soundbtn__track"
            hidden={!(soundOn && tracks.length)}
          >
            {tracks[trackIdx]?.label}
          </span>
        </div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Scroll down">
        <span className="hero__scrolltxt">{t("hero.scroll")}</span>
        <span className="hero__scrollline">
          <i />
        </span>
      </a>

      <audio ref={bgmRef} loop preload="none" />
    </section>
  );
}
