import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { queryProducts } from "@/lib/commerce";
import { getDrop, getDrops } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Countdown } from "@/components/editorial/Countdown";
import { Newsletter } from "@/components/shell/Newsletter";
import { GridStatement } from "@/components/editorial/Statements";
import e from "@/components/editorial/Editorial.module.css";

export function generateStaticParams() {
  return getDrops().map((d) => ({ drop: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ drop: string }> }): Promise<Metadata> {
  const { drop } = await params;
  const d = getDrop(drop);
  if (!d) return {};
  return { title: `Friday ${d.number} — ${d.title}`, description: d.lines.join(" "), alternates: { canonical: `/friday/${d.slug}` } };
}

/** A drop is a chapter: hero, the night's timeline, the gallery, then the pieces. */
export default async function DropPage({ params }: { params: Promise<{ drop: string }> }) {
  const { drop: slug } = await params;
  const drop = getDrop(slug);
  if (!drop) notFound();
  const products = queryProducts({ drop: drop.slug });
  const surface = drop.accent === "cobalt" ? "surface-cobalt" : "surface-rani";

  return (
    <>
      <section className={`${surface} ${e.pageIntro}`} data-surface={drop.accent === "cobalt" ? "dark" : undefined} style={{ paddingBlock: "var(--s-9)" }}>
        <p className="mono">Friday {drop.number}</p>
        <h1 className={`display ${e.hero2}`}>{drop.title}.</h1>
        <div className={e.pageIntroBody}>
          {drop.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </section>

      <Media asset={drop.hero} ratio="16 / 9" sizes="100vw" priority />

      {drop.status === "upcoming" ? (
        <section className="section-editorial container" style={{ display: "grid", gap: "var(--s-6)" }}>
          <p className="mono">Drops Friday · 7:43 PM</p>
          <Countdown to={drop.date} />
          <Newsletter heading="Not ready yet." sub="Get the message the minute it drops." source="friday" cta="Notify me →" />
        </section>
      ) : (
        <>
          {drop.timeline && (
            <section className="section-editorial container" aria-label="The night">
              <ol style={{ listStyle: "none", padding: 0, display: "grid", gap: "var(--s-5)" }}>
                {drop.timeline.map((t, i) => (
                  <Reveal as="li" key={t.time} delay={i * 60}>
                    <span style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 24, alignItems: "baseline" }}>
                      <span className="mono">{t.time}</span>
                      <span className={`display ${e.h1}`}>{t.line}</span>
                    </span>
                  </Reveal>
                ))}
              </ol>
            </section>
          )}
          {drop.gallery.length > 0 && (
            <section className="page-x" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--gutter)", alignItems: "start" }} aria-label="Lookbook">
              <Media asset={drop.gallery[0]!} ratio="3 / 4" sizes="60vw" />
              <div style={{ display: "grid", gap: "var(--gutter)" }}>
                {drop.gallery.slice(1).map((g) => (
                  <Media key={g.direction} asset={g} ratio="4 / 3" sizes="40vw" />
                ))}
              </div>
            </section>
          )}
          <section className="section-editorial page-x" aria-label={`Shop Friday ${drop.number}`}>
            <ProductGrid
              products={products}
              columns={3}
              every={3}
              interruptions={[<GridStatement key="s" big="Your friend said casual." small="Ignore her." />]}
              list={`drop-${drop.slug}`}
            />
          </section>
        </>
      )}
    </>
  );
}
