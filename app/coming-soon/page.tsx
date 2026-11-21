import type { Metadata } from "next";
import { WaitlistForm } from "@/components/launch/WaitlistForm";
import s from "@/components/launch/ComingSoon.module.css";

export const metadata: Metadata = {
  title: { absolute: "HAQ — Coming Soon" },
  description: "HAQ: contemporary Indian fashion for going out. Coming soon. Join the list for the first drop.",
  alternates: { canonical: "/" },
  openGraph: { title: "HAQ — Coming Soon", description: "Indian after dark. You don't need an occasion." }
};

const SHEET: [string, string][] = [
  ["First drop", "Friday 001 — Not Ready Yet"],
  ["Pieces", "Tops · Dresses · Skirts · Sets · Jewellery · Bags"],
  ["Craft", "Zardozi · Mukaish · Gota · Chikankari · Mirror work · Bandhani"],
  ["Release", "Fridays, 7:43 PM"]
];

/**
 * Pre-launch page. Served at "/" by middleware.ts while LAUNCH_MODE is "coming-soon".
 * Typographic, two panels, one action. The waitlist only renders when it can actually store emails.
 */
export default function ComingSoon() {
  const waitlistOpen = process.env.NODE_ENV !== "production" || Boolean(process.env.KLAVIYO_PRIVATE_KEY && process.env.KLAVIYO_LIST_ID);

  return (
    <div className={s.page}>
      <header className={s.top}>
        <span className={s.logo} aria-label="HAQ">
          HAQ
        </span>
        <p className="mono">Fri 7:43 PM</p>
      </header>

      <main className={s.main}>
        <section className={s.lead} aria-labelledby="cs-title">
          <p className={`mono ${s.kicker}`}>Delhi / London / New York</p>
          <p className={`display ${s.mark}`} aria-hidden="true">
            HAQ
          </p>
          <h1 id="cs-title" className={s.title}>
            Coming soon
          </h1>
          <p className={s.line}>
            Contemporary Indian fashion for going out.
            <br />
            You don&apos;t need an occasion.
          </p>

          <div className={s.action}>
            {waitlistOpen ? (
              <WaitlistForm />
            ) : (
              <p className={`meta ${s.soon}`}>The list opens shortly. Check back on Friday.</p>
            )}
          </div>
        </section>

        <aside className={`surface-ink ${s.sheet}`} aria-label="What's coming">
          <dl className={s.rows}>
            {SHEET.map(([k, v]) => (
              <div key={k} className={s.row}>
                <dt className="meta muted">{k}</dt>
                <dd className="meta">{v}</dd>
              </div>
            ))}
          </dl>
          <p className={`display-italic ${s.sign}`}>It&apos;s Friday. What are we wearing?</p>
          <p className={`display ${s.ghost}`} aria-hidden="true">
            001
          </p>
        </aside>
      </main>

      <footer className={s.foot}>
        <span className="meta">© 2026 HAQ</span>
        <span className="meta muted">Indian after dark</span>
      </footer>
    </div>
  );
}
