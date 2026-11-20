import type { Metadata } from "next";
import Link from "next/link";
import { queryProducts } from "@/lib/commerce";
import { getDrops, getGirls, getLiveDrop, getPlaylists, getStories, getUpcomingDrop } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { FridayModule } from "@/components/editorial/FridayModule";
import { Radio } from "@/components/editorial/Radio";
import { HaqGirlFeature } from "@/components/editorial/HaqGirlFeature";
import e from "@/components/editorial/Editorial.module.css";

export const metadata: Metadata = {
  title: "Friday",
  description: "Every Friday at 7:43 PM: a drop, a playlist, a girl, a reason. What are you wearing?",
  alternates: { canonical: "/friday" }
};

/** HAQ's weekly ritual. Every module here is CMS-driven and changes on Fridays. */
export default function FridayPage() {
  const live = getLiveDrop();
  const next = getUpcomingDrop();
  const story = getStories()[0];
  const girl = getGirls()[2];

  return (
    <>
      <section className={`surface-ink ${e.pageIntro}`} data-surface="dark" style={{ paddingBlock: "var(--s-10)" }}>
        <p className="mono">Friday · 7:43 PM</p>
        <h1 className={`display ${e.hero2}`}>What are you wearing?</h1>
        <p className="display-italic" style={{ fontSize: 24 }}>
          Tonight at HAQ.
        </p>
      </section>

      <section className="section-editorial page-x" aria-labelledby="tonight" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--s-8)", alignItems: "end" }}>
        <Link href={`/friday/${live.slug}`} aria-label={`Friday ${live.number}, ${live.title}`}>
          <Media asset={live.hero} ratio="4 / 5" sizes="(max-width: 860px) 100vw, 50vw" priority />
        </Link>
        <div style={{ display: "grid", gap: "var(--s-4)", justifyItems: "start" }}>
          <p className="mono">Live now · Friday {live.number}</p>
          <h2 id="tonight" className={`display ${e.h1}`}>
            {live.title}.
          </h2>
          {live.lines.map((l) => (
            <p key={l} className="display-italic" style={{ fontSize: 22 }}>
              {l}
            </p>
          ))}
          <Link href={`/friday/${live.slug}`} className="link">
            Shop Friday {live.number} →
          </Link>
        </div>
      </section>

      <section className="section-commerce page-x">
        <ProductGrid products={queryProducts({ drop: live.slug, inStock: true }).slice(0, 4)} columns={4} list="friday-live" />
      </section>

      <Radio playlists={getPlaylists()} />

      {girl && <HaqGirlFeature girl={girl} />}

      {story && (
        <section className="section-editorial container" style={{ display: "grid", gap: "var(--s-4)", justifyItems: "start" }}>
          <p className="mono">Note · {story.date}</p>
          <h2 className={`display ${e.h1}`}>{story.title}</h2>
          <p className="display-italic" style={{ fontSize: 22 }}>
            {story.dek}
          </p>
          <Link href="/world/stories" className="link">
            Read →
          </Link>
        </section>
      )}

      {next && <FridayModule next={next} />}

      <section className="section-commerce container" aria-labelledby="archive">
        <h2 id="archive" className="meta" style={{ marginBottom: "var(--s-4)" }}>
          Every Friday
        </h2>
        <ol style={{ listStyle: "none", padding: 0, borderTop: "1px solid var(--rule)" }}>
          {getDrops().map((d) => (
            <li key={d.slug} style={{ borderBottom: "1px solid var(--rule)" }}>
              <Link href={`/friday/${d.slug}`} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "16px 0", alignItems: "baseline" }}>
                <span className="mono">{d.number}</span>
                <span className="display" style={{ fontSize: "var(--t-h2)", flex: 1 }}>
                  {d.title}
                </span>
                <span className="mono muted">{d.status === "live" ? "Live" : d.status === "upcoming" ? "Coming" : "Archive"}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
