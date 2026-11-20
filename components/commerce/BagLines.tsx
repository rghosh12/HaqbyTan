"use client";

import Link from "next/link";
import { useStore } from "@/components/store/StoreProvider";
import { getProduct } from "@/lib/commerce";
import { price } from "@/lib/format";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import s from "./Commerce.module.css";

/** Bag line items — shared by the drawer and the full /cart page. */
export function BagLines({ onNavigate }: { onNavigate?: () => void }) {
  const { lines, setQty, remove } = useStore();
  return (
    <ul role="list" className={s.lines}>
      {lines.map((l) => {
        const p = getProduct(l.slug);
        const key = { slug: l.slug, size: l.size, color: l.color };
        return (
          <li key={`${l.slug}-${l.size}-${l.color}`} className={s.line}>
            {p && <Media asset={p.images[0]!} showDirection={false} sizes="96px" />}
            <div className={s.lineInfo}>
              <Link href={`/product/${l.slug}`} onClick={onNavigate} className="meta">
                {l.title}
              </Link>
              <span className="meta muted">
                {l.color} / {l.size}
              </span>
              <div className={s.qty}>
                <button onClick={() => setQty(key, l.qty - 1)} aria-label={`Decrease quantity of ${l.title}`}>
                  <Icon name="minus" size={14} />
                </button>
                <span aria-live="polite">{l.qty}</span>
                <button onClick={() => setQty(key, l.qty + 1)} aria-label={`Increase quantity of ${l.title}`}>
                  <Icon name="plus" size={14} />
                </button>
              </div>
              <button className={`meta muted ${s.removeBtn}`} onClick={() => remove(key)}>
                Remove
              </button>
            </div>
            <span className="meta">{price(l.price * l.qty)}</span>
          </li>
        );
      })}
    </ul>
  );
}
