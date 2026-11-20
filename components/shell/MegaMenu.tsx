import Link from "next/link";
import { CATEGORIES, NIGHTS } from "@/lib/commerce";
import { getCrafts, getLiveDrop } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import s from "./Shell.module.css";

/** Editorial columns: utility on the left, HAQ taxonomy in the middle, the drop on the right. */
export function MegaMenu({ open, onEnter, onLeave, onNavigate }: { open: boolean; onEnter: () => void; onLeave: () => void; onNavigate: () => void }) {
  const drop = getLiveDrop();
  const crafts = getCrafts().slice(0, 5);
  return (
    <div className={s.mega} data-open={open} onMouseEnter={onEnter} onMouseLeave={onLeave} aria-hidden={!open} inert={!open}>
      <div className={s.megaInner} onClick={(e) => (e.target as HTMLElement).closest("a") && onNavigate()}>
        <div>
          <p className={`meta muted ${s.megaHead}`}>Shop</p>
          <ul role="list" className={s.megaList}>
            <li>
              <Link href="/new">New Arrivals</Link>
            </li>
            {CATEGORIES.filter((c) => c.slug !== "denim").map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}`}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={`meta muted ${s.megaHead}`}>By Night</p>
          <ul role="list" className={s.megaList}>
            {NIGHTS.map((n) => (
              <li key={n.slug}>
                <Link href={`/shop?night=${n.slug}`}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <p className={`meta muted ${s.megaHead}`} style={{ marginTop: 28 }}>
            By Craft
          </p>
          <ul role="list" className={s.megaList}>
            {crafts.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?craft=${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href={`/friday/${drop.slug}`} className={s.megaFeature}>
          <Media asset={drop.hero} ratio="4 / 3" showDirection={false} sizes="420px" />
          <span className="mono">Friday {drop.number}</span>
          <span className={`display ${s.megaTitle}`}>{drop.title}</span>
          <span className="link">Explore →</span>
        </Link>
      </div>
    </div>
  );
}
