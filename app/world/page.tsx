import type { Metadata } from "next";
import Link from "next/link";
import { getBathroom, getCrafts, getGirls, getLiveDrop, getStories } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { PageIntro } from "@/components/editorial/Statements";
import e from "@/components/editorial/Editorial.module.css";

export const metadata: Metadata = { title: "World of HAQ", description: "Friday, craft, HAQ girls, bathrooms, radio and stories.", alternates: { canonical: "/world" } };

export default function WorldPage() {
  const tiles = [
    { href: "/friday", label: "Friday", note: "Every week, 7:43 PM.", image: getLiveDrop().hero },
    { href: "/craft", label: "Craft", note: "Credit the source.", image: getCrafts()[0]!.images[0]! },
    { href: "/world/haq-girls", label: "HAQ Girls", note: "She's a HAQ girl.", image: getGirls()[0]!.portrait },
    { href: "/world/bathroom", label: "Bathroom", note: "The lighting was better in here.", image: getBathroom()[0]!.image },
    { href: "/world/radio", label: "Radio", note: "Music slightly too loud.", image: getGirls()[3]!.portrait },
    { href: "/world/stories", label: "Stories", note: "Notes, cities, craft.", image: getStories()[0]!.image }
  ];
  return (
    <>
      <PageIntro kicker="World of HAQ" title="Indian after dark." />
      <ul role="list" className="page-x" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--s-7) var(--gutter)", paddingBottom: "var(--s-10)" }}>
        {tiles.map((t, i) => (
          <li key={t.href} style={{ marginTop: i % 3 === 1 ? "var(--s-9)" : 0 }}>
            <Link href={t.href} className={e.trioItem}>
              <Media asset={t.image} ratio="3 / 4" showDirection={false} sizes="(max-width: 860px) 100vw, 33vw" />
              <span className={`display ${e.trioLabel}`}>{t.label}</span>
              <span className="display-italic muted">{t.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
