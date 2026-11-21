import type { Metadata } from "next";
import Link from "next/link";
import { getGirls } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { PageIntro } from "@/components/editorial/Statements";

export const metadata: Metadata = { title: "HAQ Girls", description: "Her city, her Friday, what she wore.", alternates: { canonical: "/world/haq-girls" } };

export default function GirlsPage() {
  return (
    <>
      <PageIntro kicker="HAQ Girls" title="She's a HAQ girl.">
        <p>Not influencers. Just people with somewhere to be on a Friday.</p>
      </PageIntro>
      <ul role="list" className="page-x" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "var(--s-7) var(--gutter)", paddingBottom: "var(--s-10)" }}>
        {getGirls().map((g) => (
          <li key={g.slug}>
            <Link href={`/world/haq-girls/${g.slug}`} style={{ display: "grid", gap: 8 }}>
              <Media asset={g.portrait} ratio="2 / 3" showDirection={false} sizes="(max-width: 860px) 50vw, 25vw" />
              <span className="mono">
                HAQ Girl {g.number} · {g.city} · {g.time}
              </span>
              <span className="display" style={{ fontSize: 36 }}>
                {g.name}
              </span>
              <span className="display-italic muted">&ldquo;{g.quote}&rdquo;</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
