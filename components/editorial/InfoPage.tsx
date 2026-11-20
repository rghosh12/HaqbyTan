import type { ReactNode } from "react";
import { PageIntro } from "./Statements";

/** Calm service pages: shipping, returns, contact, about. Trust over theatre. */
export function InfoPage({ kicker, title, sections }: { kicker: string; title: string; sections: { id?: string; heading: string; body: ReactNode }[] }) {
  return (
    <>
      <PageIntro kicker={kicker} title={title} />
      <div className="container" style={{ maxWidth: 860, paddingBottom: "var(--s-10)", display: "grid", gap: "var(--s-6)" }}>
        {sections.map((s) => (
          <section key={s.heading} id={s.id} style={{ borderTop: "1px solid var(--rule)", paddingTop: "var(--s-4)", display: "grid", gap: "var(--s-3)" }}>
            <h2 className="meta">{s.heading}</h2>
            <div style={{ display: "grid", gap: "var(--s-3)", maxWidth: "62ch" }}>{s.body}</div>
          </section>
        ))}
      </div>
    </>
  );
}
