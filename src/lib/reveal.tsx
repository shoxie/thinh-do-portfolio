"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { createElement, type ElementType, type ReactNode } from "react";
import { EASE_OUT } from "./config";

export function Reveal({
  children,
  className,
  delay = 0,
  whileHover,
  amount = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  whileHover?: TargetAndTransition;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="in"
      whileHover={whileHover}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        in: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: EASE_OUT, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Rich({
  html,
  className,
  as = "div",
}: {
  html: string;
  className?: string;
  as?: ElementType;
}) {
  return createElement(as, {
    className,
    dangerouslySetInnerHTML: { __html: html },
  });
}
