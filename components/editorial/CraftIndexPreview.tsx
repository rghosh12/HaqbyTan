import Link from "next/link";
import type { Craft } from "@/lib/types";
import s from "./Editorial.module.css";

/** Credit the source: a typographic index, one line per technique. */
export function CraftIndexPreview({ crafts }: { crafts: Craft[] }) {
  return (
    <section className={`section-editorial container ${s.index}`} aria-labelledby="index-title">
      <div className={s.indexHead}>
        <h2 id="index-title" className="mono">
          HAQ Craft Index
        </h2>
        <p className="muted">What the technique is, where it comes from, how we use it. Credit the source.</p>
      </div>
      <ol className={s.indexList}>
        {crafts.map((c, i) => (
          <li key={c.slug}>
            <Link href={`/craft/${c.slug}`} className={s.indexRow}>
              <span className="mono muted">{String(i + 1).padStart(2, "0")}</span>
              <span className={`display ${s.indexName}`}>{c.name}</span>
              <span className={`muted ${s.indexLine}`}>{c.oneLine}</span>
              <span className="mono">{c.regions[0]}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
