"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Craft, Product } from "@/lib/types";
import { track } from "@/lib/analytics";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import s from "./Commerce.module.css";

/**
 * Desktop: vertical photography feed. Mobile: horizontal swipe with a 01 / 05 counter.
 * "View the craft" opens a macro lens without leaving the page.
 */
export function ProductGallery({ product, craft }: { product: Product; craft?: Craft }) {
  const [index, setIndex] = useState(0);
  const [lens, setLens] = useState(false);
  const track_ = useRef<HTMLDivElement>(null);
  const total = product.images.length;
  const macro = product.images.find((i) => i.kind === "macro") ?? craft?.images[0];

  const onScroll = () => {
    const el = track_.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className={s.gallery}>
      <div className={s.galleryTrack} ref={track_} onScroll={onScroll} tabIndex={0} aria-label={`${product.title} images`} role="region">
        {product.images.map((img, i) => (
          <figure key={i} className={s.galleryItem}>
            <Media asset={img} ratio="4 / 5" sizes="(max-width: 860px) 100vw, 62vw" priority={i === 0} />
          </figure>
        ))}
      </div>
      <p className={`mono ${s.galleryCount}`} aria-hidden="true">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      {craft && macro && (
        <>
          <button
            className={`meta ${s.lensBtn}`}
            onClick={() => {
              setLens(true);
              track("craft_story_opened", { craft: craft.slug, item_id: product.slug, surface: "lens" });
            }}
          >
            View the craft
          </button>
          {lens && (
            <div className={`surface-wine ${s.lens}`} role="dialog" aria-modal="true" aria-label={`${craft.name} detail`} data-surface="dark">
              <button className={s.lensClose} onClick={() => setLens(false)} aria-label="Close craft view" autoFocus>
                <Icon name="close" />
              </button>
              <Media asset={macro} ratio="1 / 1" sizes="(max-width: 860px) 100vw, 50vw" />
              <div className={s.lensText}>
                <p className="mono">{craft.name}</p>
                <p className="mono muted">{craft.regions[0]} / India</p>
                <p className="display" style={{ fontSize: "var(--t-h2)" }}>
                  {craft.oneLine}
                </p>
                {product.craftNote && <p>{product.craftNote}</p>}
                <Link href={`/craft/${craft.slug}`} className="link">
                  Read the story →
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
