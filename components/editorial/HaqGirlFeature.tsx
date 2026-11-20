import Link from "next/link";
import { getProductsBySlugs } from "@/lib/commerce";
import { price } from "@/lib/format";
import type { HaqGirl } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import s from "./Editorial.module.css";

/** 60 / 40 editorial split: portrait left, her Friday on the right. */
export function HaqGirlFeature({ girl }: { girl: HaqGirl }) {
  const look = getProductsBySlugs(girl.look);
  return (
    <section className={`surface-paper section-editorial ${s.girl}`} aria-labelledby={`girl-${girl.slug}`}>
      <Media asset={girl.portrait} ratio="4 / 5" sizes="(max-width: 860px) 100vw, 58vw" />
      <Reveal className={s.girlText}>
        <p className="mono">HAQ Girl {girl.number}</p>
        <h2 id={`girl-${girl.slug}`} className={`display ${s.hero2}`}>
          {girl.name}
        </h2>
        <p className="mono muted">
          {girl.city} · {girl.time}
        </p>
        <blockquote className={`display-italic ${s.girlQuote}`}>&ldquo;{girl.quote}&rdquo;</blockquote>
        <div>
          <p className="meta muted">Friday order</p>
          <p>{girl.order}</p>
        </div>
        <div>
          <p className="meta muted">Wearing</p>
          <ul role="list" className={s.girlLook}>
            {look.map((p) => (
              <li key={p.slug}>
                <Link href={`/product/${p.slug}`} className="link link-quiet">
                  {p.title}
                </Link>
                <span className="meta muted">{price(p.price)}</span>
              </li>
            ))}
          </ul>
        </div>
        <Link href={`/world/haq-girls/${girl.slug}`} className="link">
          Shop the look →
        </Link>
      </Reveal>
    </section>
  );
}
