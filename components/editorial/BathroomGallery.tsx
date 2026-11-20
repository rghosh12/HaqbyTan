import Link from "next/link";
import { getProductsBySlugs } from "@/lib/commerce";
import type { BathroomSelfie } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import s from "./Editorial.module.css";

/**
 * Irregular but gridded: one oversized frame, one narrow portrait,
 * one deliberate empty cell, overlapping crops. Each frame links to its look.
 */
export function BathroomGallery({ items, heading = true }: { items: BathroomSelfie[]; heading?: boolean }) {
  return (
    <section className={`section-editorial ${s.bath}`} aria-labelledby={heading ? "bath-title" : undefined} aria-label={heading ? undefined : "Bathroom selfies"}>
      {heading && (
        <div className={s.bathHead}>
          <h2 id="bath-title" className={`display ${s.h1}`}>
            Bathroom selfies.
          </h2>
          <p className="display-italic">The lighting was better in here.</p>
        </div>
      )}
      <ul role="list" className={s.bathGrid}>
        {items.map((b) => {
          const look = getProductsBySlugs(b.look);
          return (
            <li key={b.id} className={s[`bath_${b.span}`]}>
              <Link href={`/product/${look[0]?.slug ?? ""}`} className={s.bathItem}>
                <Media asset={b.image} ratio={b.span === "wide" ? "4 / 3" : b.span === "small" ? "1 / 1" : "3 / 4"} showDirection={b.span === "hero"} sizes="(max-width: 860px) 100vw, 40vw" />
                <span className={s.bathCap}>
                  <span className="mono">
                    {b.where} · {b.time}
                  </span>
                  <span className="display-italic">{b.caption}</span>
                  <span className="mono">Wearing {look.map((p) => p.title).join(" + ")} →</span>
                </span>
              </Link>
            </li>
          );
        })}
        <li className={s.bath_empty} aria-hidden="true">
          <span className="mono">Tag @haq — #haqbathroom</span>
        </li>
      </ul>
    </section>
  );
}
