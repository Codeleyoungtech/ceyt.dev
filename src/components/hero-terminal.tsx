"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/site-data";

const fullLines = [
  "$ whoami",
  "eleazar — full stack dev, 18",
  "$ cat focus.md",
  "building flustro, zeyt, and whatever ships next",
];

function lineLengthUntil(lines: string[], lineIndex: number) {
  return lines.slice(0, lineIndex + 1).reduce((sum, line) => sum + line.length, 0);
}

export function HeroTerminal() {
  const reduceMotion = useReducedMotion();
  const [typedCount, setTypedCount] = useState(reduceMotion ? 10_000 : 0);

  const fullText = useMemo(() => fullLines.join(""), []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setTypedCount((value) => {
        if (value >= fullText.length) {
          clearInterval(timer);
          return value;
        }
        return value + 1;
      });
    }, 22);
    return () => clearInterval(timer);
  }, [fullText.length, reduceMotion]);

  const cutText = (lineIndex: number) => {
    const end = lineLengthUntil(fullLines, lineIndex);
    const start = end - fullLines[lineIndex].length;
    const current = fullText.slice(0, typedCount);
    return current.length <= start ? "" : current.slice(start, end);
  };

  return (
    <section className="grid-bg relative overflow-hidden rounded-2xl editor-panel p-6 sm:p-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">CEYT / {profile.name}</p>
        <div className="space-y-3 font-mono text-base sm:text-xl">
          <p className="text-[var(--accent-indigo)]">{cutText(0)}</p>
          <p className="text-[var(--text-primary)]">{cutText(1)}</p>
          <p className="text-[var(--accent-indigo)]">{cutText(2)}</p>
          <p className="text-[var(--text-primary)]">{cutText(3)}</p>
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-indigo)]">$</span>
            <span
              aria-hidden
              className="inline-block h-5 w-2 animate-pulse bg-[var(--accent-indigo)] align-middle"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
