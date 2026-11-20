import Link from "next/link";
import type { Drop } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { HeroClock } from "./HeroClock";
import s from "./Editorial.module.css";

/** 100svh. Almost no UI. The oversized wordmark hands off to the header as you scroll. */
export function HeroCampaign({ drop }: { drop: Drop }) {
  return (
    <section className={s.hero} data-surface="hero" aria-labelledby="hero-title">
      <Media asset={drop.hero} ratio="auto" priority sizes="100vw" className={s.heroMedia} showStamp={false} showDirection={false} showLabel={false} />
      <div className={s.heroShade} aria-hidden="true" />
      <div className={s.heroContent}>
        <p className={`display ${s.heroMark}`} aria-hidden="true">
          HAQ
        </p>
        {drop.timeline && <HeroClock timeline={drop.timeline} />}
        <h1 id="hero-title" className={`display ${s.heroTitle}`}>
          You don&apos;t need an occasion.
        </h1>
        <p className={s.heroSub}>It&apos;s Friday. What are we wearing?</p>
        <Link href={`/friday/${drop.slug}`} className="link">
          Shop the night →
        </Link>
      </div>
    </section>
  );
}
