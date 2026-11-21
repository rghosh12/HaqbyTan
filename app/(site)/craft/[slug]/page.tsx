import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { queryProducts } from "@/lib/commerce";
import { getCraft, getCrafts } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import e from "@/components/editorial/Editorial.module.css";

export function generateStaticParams() {
  return getCrafts().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCraft(slug);
  if (!c) return {};
  return { title: `${c.name} — Craft Index`, description: c.oneLine, alternates: { canonical: `/craft/${c.slug}` } };
}

export default async function CraftStory({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const craft = getCraft(slug);
  if (!craft) notFound();
  const products = queryProducts({ craft: craft.slug });

  const facts: [string, string][] = [
    ["Also called", craft.term],
    ["Region", craft.regions.join(" / ")],
    ["Materials", craft.materials.join(", ")],
    ["Makers", craft.makers ?? "Credited per piece once verified with the workshop."]
  ];

  return (
    <article>
      <header className={`surface-wine ${e.pageIntro}`} data-surface="dark" style={{ paddingBlock: "var(--s-10) var(--s-8)" }}>
        <p className="mono">HAQ Craft Index</p>
        <h1 className={`display ${e.hero2}`}>{craft.name}</h1>
        <p className="display-italic" style={{ fontSize: 26 }}>
          {craft.oneLine}
        </p>
      </header>

      <Media asset={craft.images[0]!} ratio="21 / 9" sizes="100vw" priority />

      <div className="container section-editorial" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--s-8)" }}>
        <dl style={{ display: "grid", gap: "var(--s-4)", alignContent: "start" }}>
          {facts.map(([k, v]) => (
            <div key={k} style={{ borderTop: "1px solid var(--rule)", paddingTop: 12 }}>
              <dt className="meta muted">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div style={{ display: "grid", gap: "var(--s-6)", gridColumn: "span 2", maxWidth: 680 }}>
          <section style={{ display: "grid", gap: "var(--s-3)" }}>
            <h2 className="meta">History</h2>
            {craft.history.map((p) => (
              <p key={p} className="display" style={{ fontSize: 22, lineHeight: 1.35, letterSpacing: 0 }}>
                {p}
              </p>
            ))}
            {craft.nuance && <p className="display-italic muted">{craft.nuance}</p>}
          </section>
          <section style={{ display: "grid", gap: "var(--s-3)" }}>
            <h2 className="meta">Process</h2>
            <ol style={{ paddingLeft: "1.2em", display: "grid", gap: 8 }}>
              {craft.process.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </section>
          {craft.images[1] && <Media asset={craft.images[1]} ratio="3 / 2" sizes="(max-width: 860px) 100vw, 680px" />}
        </div>
      </div>

      {products.length > 0 && (
        <section className="section-commerce page-x" aria-labelledby="pieces">
          <div className="section-head">
            <h2 id="pieces" className="meta">
              HAQ pieces in {craft.name}
            </h2>
          </div>
          <ProductGrid products={products} columns={4} list={`craft-story-${craft.slug}`} />
        </section>
      )}
    </article>
  );
}
