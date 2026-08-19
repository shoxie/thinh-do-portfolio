"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const hide = () => setDone(true);

    const onLoad = () => setTimeout(hide, 350);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    const safety = setTimeout(hide, 3500);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          aria-hidden="true"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } }}
        >
          <div className="preloader__inner">
            <div className="preloader__mark">gayshit123</div>
            <div className="preloader__bar">
              <i />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
