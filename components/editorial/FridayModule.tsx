import type { Drop } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { Newsletter } from "@/components/shell/Newsletter";
import { Countdown } from "./Countdown";
import s from "./Editorial.module.css";

/** FRIDAY 7:43 — the next drop, a real countdown, and a waitlist. Cobalt belongs to 002. */
export function FridayModule({ next }: { next: Drop }) {
  return (
    <section className={`surface-cobalt ${s.friday}`} data-surface="dark" aria-labelledby="friday-next">
      <div className={s.fridayText}>
        <p className="mono">Friday {next.number} · 7:43 PM</p>
        <h2 id="friday-next" className={`display ${s.hero2}`}>
          {next.title}.
        </h2>
        <Countdown to={next.date} />
        <p className="display-italic">Not ready yet.</p>
        <Newsletter heading="Get the message first." sub={next.lines.join(" ")} source="friday" cta="Notify me →" />
      </div>
      <Media asset={next.hero} ratio="4 / 5" sizes="(max-width: 860px) 100vw, 45vw" />
    </section>
  );
}
