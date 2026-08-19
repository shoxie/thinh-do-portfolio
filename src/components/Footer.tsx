"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const [year, setYear] = useState("");

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      setYear(String(new Date().getFullYear())),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <footer className="footer">
      <div className="wrap footer__in">
        <div className="footer__l">
          <span className="footer__brand">Thinh Do</span>
          <span className="footer__alias">gayshit123</span>
        </div>
        <p className="footer__c">
          © {year} — {t("footer.copy")}
        </p>
        <a className="footer__top" href="#top">
          <span>{t("footer.top")}</span>
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path
              d="M12 19V6M6 12l6-6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
}
