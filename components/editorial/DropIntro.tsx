import Link from "next/link";
import type { Drop } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import s from "./Editorial.module.css";

/** Massive negative space, one drop, one sentence per line. */
export function DropIntro({ drop }: { drop: Drop }) {
  return (
    <section className={`section-editorial ${s.drop}`} aria-labelledby={`drop-${drop.slug}`}>
      <Reveal className={s.dropText}>
        <p className="mono">Friday {drop.number}</p>
        <h2 id={`drop-${drop.slug}`} className={`display ${s.h1}`}>
          {drop.title}.
        </h2>
        <div className={s.dropLines}>
          {drop.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <Link href={`/friday/${drop.slug}`} className="link">
          Shop Friday {drop.number} →
        </Link>
      </Reveal>
      <div className={s.dropImages}>
        {drop.gallery.slice(0, 2).map((g, i) => (
          <Reveal key={g.direction} delay={i * 120} className={i === 0 ? s.dropTall : s.dropSmall}>
            <Media asset={g} ratio={i === 0 ? "3 / 4" : "4 / 5"} sizes="(max-width: 860px) 100vw, 33vw" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
