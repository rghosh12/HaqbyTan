import type { Metadata } from "next";
import Link from "next/link";
import { getProductsBySlugs } from "@/lib/commerce";
import { getStories } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { PageIntro } from "@/components/editorial/Statements";

export const metadata: Metadata = { title: "Stories", description: "Notes, city nights and craft from HAQ.", alternates: { canonical: "/world/stories" } };

export default function StoriesPage() {
  return (
    <>
      <PageIntro kicker="Stories" title="Notes from Friday." />
      <ul role="list" className="page-x" style={{ display: "grid", gap: "var(--s-9)", paddingBottom: "var(--s-10)" }}>
        {getStories().map((s, i) => {
          const p = getProductsBySlugs(s.products)[0];
          return (
            <li key={s.slug} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--s-7)", alignItems: "center" }}>
              <div style={{ order: i % 2 }}>
                <Media asset={s.image} ratio="4 / 3" sizes="(max-width: 860px) 100vw, 50vw" />
              </div>
              <div style={{ display: "grid", gap: "var(--s-3)", justifyItems: "start" }}>
                <p className="mono">
                  {s.category.replace("-", " ")} · {s.date}
                </p>
                <h2 className="display" style={{ fontSize: "var(--t-h1)", lineHeight: 0.95 }}>
                  {s.title}
                </h2>
                <p className="display-italic" style={{ fontSize: 20 }}>
                  {s.dek}
                </p>
                {p && (
                  <Link href={`/product/${p.slug}`} className="link">
                    Shop {p.title} →
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
