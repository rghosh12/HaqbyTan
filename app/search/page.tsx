import type { Metadata } from "next";
import Link from "next/link";
import { search } from "@/lib/commerce";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { PageIntro } from "@/components/editorial/Statements";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

/** Shareable, no-JS search results (the overlay is the primary surface). */
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const r = search(q);
  return (
    <>
      <PageIntro kicker="Search" title={q ? `“${q}”` : "What are you looking for?"}>
        <form role="search" action="/search" style={{ display: "flex", gap: 12, borderBottom: "1px solid var(--fg)" }}>
          <label htmlFor="q" className="sr-only">
            Search
          </label>
          <input id="q" name="q" defaultValue={q} placeholder="Zardozi, tops, Friday 001" style={{ flex: 1, border: 0, background: "transparent", minHeight: 48 }} />
          <button className="link" type="submit">
            Search →
          </button>
        </form>
      </PageIntro>
      <div className="page-x" style={{ paddingBottom: "var(--s-10)", display: "grid", gap: "var(--s-6)" }}>
        {q && r.products.length === 0 && r.crafts.length === 0 && <p className="display" style={{ fontSize: "var(--t-h2)" }}>Nothing yet. Try a craft or &ldquo;tops&rdquo;.</p>}
        {(r.crafts.length > 0 || r.drops.length > 0) && (
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {r.drops.map((d) => (
              <Link key={d.slug} href={`/friday/${d.slug}`} className="link">
                Friday {d.number} — {d.title}
              </Link>
            ))}
            {r.crafts.map((c) => (
              <Link key={c.slug} href={`/craft/${c.slug}`} className="link">
                Craft: {c.name}
              </Link>
            ))}
          </div>
        )}
        {r.products.length > 0 && <ProductGrid products={r.products} columns={4} list="search" />}
      </div>
    </>
  );
}
