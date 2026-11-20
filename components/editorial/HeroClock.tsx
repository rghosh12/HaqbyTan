"use client";

import { useEffect, useState } from "react";

/**
 * FRIDAY 001 hero sequence: 7:18 first outfit → 8:07 leaving.
 * Starts on 7:43 (server render), advances slowly, holds on "Leaving." Static under reduced motion.
 */
export function HeroClock({ timeline }: { timeline: { time: string; line: string }[] }) {
  const start = Math.max(0, timeline.findIndex((t) => t.time === "7:43 PM"));
  const [i, setI] = useState(start);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let n = 0;
    setI(0);
    const id = window.setInterval(() => {
      n += 1;
      if (n >= timeline.length) return window.clearInterval(id);
      setI(n);
    }, 2200);
    return () => window.clearInterval(id);
  }, [timeline.length]);

  const t = timeline[i]!;
  return (
    <p className="mono" aria-live="off" style={{ display: "flex", gap: 14, minHeight: "1.4em" }}>
      <span>FRI {t.time}</span>
      <span key={t.time} style={{ opacity: 0.85, animation: "haq-fade 600ms var(--ease-out)" }}>
        {t.line}
      </span>
    </p>
  );
}
