"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "@/components/store/StoreProvider";
import { search } from "@/lib/commerce";
import { track } from "@/lib/analytics";
import { price } from "@/lib/format";
import { Media } from "@/components/ui/Media";
import s from "./Shell.module.css";

const SUGGESTED = ["Zardozi", "Tops", "Friday 001", "Silk", "Bags"];

export function SearchOverlay() {
  const { overlay, close } = useStore();
  const isOpen = overlay === "search";
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => search(q), [q]);
  const total = results.products.length + results.crafts.length + results.drops.length + results.categories.length;

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => input.current?.focus());
  }, [isOpen]);

  useEffect(() => {
    if (q.trim().length < 2) return;
    const t = window.setTimeout(() => track("search", { search_term: q.trim() }), 600);
    return () => window.clearTimeout(t);
  }, [q]);

  return (
    <div className={s.search} data-open={isOpen} role="dialog" aria-modal="true" aria-label="Search" inert={!isOpen}>
      <div className={s.searchTop}>
        <span className={s.logoStatic}>HAQ</span>
        <button className={s.textBtn} onClick={close}>
          Close
        </button>
      </div>
      <form className={s.searchForm} role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="haq-search" className="meta muted">
          What are you looking for?
        </label>
        <input
          id="haq-search"
          ref={input}
          className={`display ${s.searchInput}`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Zardozi, tops, a tiny bag…"
          autoComplete="off"
        />
      </form>

      <div className={s.searchBody} aria-live="polite">
        {!q.trim() && (
          <div>
            <p className="meta muted">Suggested</p>
            <ul role="list" className={s.chips}>
              {SUGGESTED.map((t) => (
                <li key={t}>
                  <button className="link" onClick={() => setQ(t)}>
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {q.trim() && total === 0 && (
          <div className={s.zero}>
            <p className="display" style={{ fontSize: "var(--t-h2)" }}>
              Nothing called &ldquo;{q}&rdquo;. Yet.
            </p>
            <p className="muted">Try a craft, a colour, or just &ldquo;tops&rdquo;.</p>
          </div>
        )}

        {total > 0 && (
          <div className={s.searchResults}>
            <div className={s.searchSide}>
              {results.drops.map((d) => (
                <Link key={d.slug} href={`/friday/${d.slug}`} onClick={close} className="link">
                  Friday {d.number} — {d.title}
                </Link>
              ))}
              {results.crafts.map((c) => (
                <Link key={c.slug} href={`/craft/${c.slug}`} onClick={close} className="link">
                  Craft: {c.name}
                </Link>
              ))}
              {results.categories.map((c) => (
                <Link key={c.slug} href={`/shop/${c.slug}`} onClick={close} className="link">
                  {c.label}
                </Link>
              ))}
            </div>
            <ul role="list" className={s.searchGrid}>
              {results.products.slice(0, 8).map((p) => (
                <li key={p.slug}>
                  <Link href={`/product/${p.slug}`} onClick={close}>
                    <Media asset={p.images[0]!} showDirection={false} sizes="200px" />
                    <span className="meta" style={{ display: "block", marginTop: 8 }}>
                      {p.title}
                    </span>
                    <span className="meta muted">{price(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
