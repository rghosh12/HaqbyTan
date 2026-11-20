"use client";

import Link from "next/link";
import { useStore } from "@/components/store/StoreProvider";
import { getProduct, getProductsBySlugs, isSoldOut } from "@/lib/commerce";
import { track } from "@/lib/analytics";
import { price } from "@/lib/format";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { BagLines } from "@/components/commerce/BagLines";
import s from "./Shell.module.css";

export function CartDrawer() {
  const { overlay, close, lines, subtotal, count, add } = useStore();
  const isOpen = overlay === "bag";

  // "You may also need": complements of what's in the bag, minus what's already there. Two, max.
  const inBag = new Set(lines.map((l) => l.slug));
  const recs = getProductsBySlugs(Array.from(new Set(lines.flatMap((l) => getProduct(l.slug)?.complements ?? []))))
    .filter((p) => !inBag.has(p.slug) && !isSoldOut(p))
    .slice(0, 2);

  return (
    <>
      <div className={s.scrim} data-open={isOpen} onClick={close} aria-hidden="true" />
      <aside className={s.drawer} data-open={isOpen} role="dialog" aria-modal="true" aria-labelledby="bag-title" inert={!isOpen}>
        <div className={s.drawerHead}>
          <h2 id="bag-title" className="display">
            Your Bag
          </h2>
          <button onClick={close} aria-label="Close bag">
            <Icon name="close" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className={s.drawerEmpty}>
            <p className="display" style={{ fontSize: "var(--t-h2)" }}>
              Nothing yet.
            </p>
            <p className="muted">It&apos;s still early.</p>
            <Link href="/friday" className="link" onClick={close}>
              Shop Friday →
            </Link>
          </div>
        ) : (
          <>
            <BagLines onNavigate={close} />

            {recs.length > 0 && (
              <div className={s.recs}>
                <p className="meta muted">You may also need</p>
                <ul role="list">
                  {recs.map((p) => (
                    <li key={p.slug} className={s.rec}>
                      <Media asset={p.images[0]!} showDirection={false} sizes="64px" />
                      <span className="meta">
                        {p.title}
                        <br />
                        <span className="muted">{price(p.price)}</span>
                      </span>
                      <button
                        className="link"
                        onClick={() => {
                          const v = p.variants.find((x) => x.stock > 0)!;
                          add({ slug: p.slug, title: p.title, price: p.price, color: p.colors[0]!.name, size: v.size, qty: 1 });
                        }}
                        aria-label={`Add ${p.title} to bag`}
                      >
                        Add
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={s.drawerFoot}>
              <div className={s.subtotal}>
                <span className="meta">Subtotal ({count})</span>
                <span className="meta">{price(subtotal)}</span>
              </div>
              <p className="meta muted">Shipping and taxes calculated at checkout.</p>
              <Link
                href="/checkout"
                className="btn btn-block"
                onClick={() => {
                  track("begin_checkout", { currency: "USD", value: subtotal });
                  close();
                }}
              >
                Checkout
              </Link>
              <Link href="/cart" className="link" onClick={close} style={{ justifySelf: "center" }}>
                View bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
