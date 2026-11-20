import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import s from "./Editorial.module.css";

const PLACES = ["Dinner.", "Drinks.", "Birthday.", "Her house.", "A cab.", "Bathroom mirror.", "Nowhere important."];

/** The signature moment. Black, ivory serif, one place at a time — then WHEREVER. No scroll-jacking. */
export function WhereWear() {
  return (
    <section className={`surface-ink ${s.where}`} data-surface="dark" aria-labelledby="where-title">
      <h2 id="where-title" className={`display ${s.whereQ}`}>
        Where are you even going to wear that?
      </h2>
      <ul role="list" className={s.wherePlaces}>
        {PLACES.map((p, i) => (
          <Reveal as="li" key={p} delay={(i % 2) * 80}>
            <span className={`display-italic ${s.wherePlace}`}>{p}</span>
          </Reveal>
        ))}
      </ul>
      <Reveal className={s.whereEnd}>
        <p className={`display ${s.wherever}`}>Wherever.</p>
        <Link href="/shop" className="link">
          Shop the night →
        </Link>
      </Reveal>
    </section>
  );
}
