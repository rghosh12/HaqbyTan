import Link from "next/link";
import type { Craft } from "@/lib/types";
import s from "./Commerce.module.css";

/** Dotted-underline craft term with a small editorial popover (hover + keyboard focus). */
export function CraftTerm({ craft }: { craft: Craft }) {
  const id = `craft-tip-${craft.slug}`;
  return (
    <span className={s.term}>
      <Link href={`/craft/${craft.slug}`} className={s.termLink} aria-describedby={id}>
        {craft.name}
      </Link>
      <span role="tooltip" id={id} className={s.tip}>
        <span className="mono">{craft.name}</span>
        <span>{craft.oneLine}</span>
        <span className="mono muted">Explore →</span>
      </span>
    </span>
  );
}
