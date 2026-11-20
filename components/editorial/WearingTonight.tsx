import Link from "next/link";
import { getProductsBySlugs } from "@/lib/commerce";
import type { HaqGirl } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import s from "./Editorial.module.css";

/** Four girls, four nights. Hover/focus reveals the look; click opens her page. */
export function WearingTonight({ girls }: { girls: HaqGirl[] }) {
  return (
    <section className={`section-editorial ${s.wearing}`} aria-labelledby="wearing-title">
      <div className={s.wearingHead}>
        <h2 id="wearing-title" className={`display ${s.h1}`}>
          What are you wearing tonight?
        </h2>
        <Link href="/world/haq-girls" className="link">
          All HAQ girls →
        </Link>
      </div>
      <ul role="list" className={s.wearingRow}>
        {girls.map((g) => {
          const look = getProductsBySlugs(g.look);
          return (
            <li key={g.slug}>
              <Link href={`/world/haq-girls/${g.slug}`} className={s.wearingCard}>
                <Media asset={g.portrait} ratio="2 / 3" showDirection={false} showStamp={false} sizes="(max-width: 860px) 75vw, 25vw" />
                <div className={s.wearingMeta}>
                  <span className="mono">{g.name}</span>
                  <span className="mono">{g.city}</span>
                  <span className="mono">{g.time}</span>
                </div>
                <div className={s.wearingLook} aria-hidden="true">
                  {look.map((p) => (
                    <span key={p.slug}>{p.title}</span>
                  ))}
                  <span className="mono">Shop her look →</span>
                </div>
                <span className="sr-only">Wearing {look.map((p) => p.title).join(", ")}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
