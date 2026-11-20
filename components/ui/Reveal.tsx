"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/** Slow editorial reveal. One IntersectionObserver per element; no scroll listeners. */
export function Reveal({ as: Tag = "div", children, className, delay = 0 }: { as?: ElementType; children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.dataset.reveal = "in";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-reveal="" className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
