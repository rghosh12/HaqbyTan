"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { price } from "@/lib/format";
import type { MediaAsset, Product } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import s from "./Editorial.module.css";

/**
 * Oversized campaign image with typographic markers (01, 02, 03) — no hotspot circles.
 * Markers are real buttons; selecting one opens a quiet product strip.
 */
export function ShopTheLook({
  image,
  products,
  markers,
  caption
}: {
  image: MediaAsset;
  products: Product[];
  markers: { x: number; y: number }[];
  caption: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const p = active !== null ? products[active] : undefined;

  return (
    <section className={s.stl} aria-label="Shop the look">
      <div className={s.stlFrame}>
        <Media asset={image} ratio="16 / 9" sizes="100vw" className={s.stlMedia} />
        {products.map((prod, i) => {
          const m = markers[i];
          if (!m) return null;
          return (
            <button
              key={prod.slug}
              className={`mono ${s.marker}`}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              aria-pressed={active === i}
              aria-label={`${String(i + 1).padStart(2, "0")} — ${prod.title}, ${price(prod.price)}`}
              onClick={() => {
                setActive(active === i ? null : i);
                track("shop_the_look_clicked", { item_id: prod.slug });
              }}
            >
              {String(i + 1).padStart(2, "0")}
              <span className={s.markerTip} aria-hidden="true">
                — {prod.title} — {price(prod.price)}
              </span>
            </button>
          );
        })}
      </div>
      <div className={s.stlBar}>
        <p className="mono">{caption}</p>
        {p ? (
          <Link href={`/product/${p.slug}`} className="link">
            {p.title} — {price(p.price)} →
          </Link>
        ) : (
          <ol className={s.stlList}>
            {products.map((prod, i) => (
              <li key={prod.slug}>
                <Link href={`/product/${prod.slug}`} className="link link-quiet">
                  {String(i + 1).padStart(2, "0")} {prod.title}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
