import type { Metadata } from "next";
import { getPlaylists } from "@/lib/content";
import { Radio } from "@/components/editorial/Radio";
import { PageIntro } from "@/components/editorial/Statements";

export const metadata: Metadata = { title: "HAQ Radio", description: "Getting ready, cab ride, one more drink, 2000s Bollywood.", alternates: { canonical: "/world/radio" } };

export default function RadioPage() {
  const lists = getPlaylists();
  return (
    <>
      <PageIntro kicker="HAQ Radio 07:43" title="Music slightly too loud." />
      <Radio playlists={lists} />
      <ul role="list" className="container section-editorial" style={{ display: "grid", gap: "var(--s-6)" }}>
        {lists.map((p) => (
          <li key={p.slug} id={p.slug} style={{ borderTop: "1px solid var(--rule)", paddingTop: 16, display: "grid", gap: 6 }}>
            <h2 className="display" style={{ fontSize: "var(--t-h2)" }}>
              {p.title}
            </h2>
            <p className="display-italic muted">{p.mood}</p>
            <p className="meta muted">{p.url ? "Open on Spotify / Apple Music →" : "Track list goes live Friday, 7:43 PM."}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
