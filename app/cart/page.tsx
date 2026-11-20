"use client";

import Link from "next/link";
import { useStore } from "@/components/store/StoreProvider";
import { BagLines } from "@/components/commerce/BagLines";
import { PageIntro } from "@/components/editorial/Statements";
import { price } from "@/lib/format";

/** Full-page bag (mobile default, desktop fallback for the drawer). */
export default function CartPage() {
  const { lines, subtotal, count, hydrated } = useStore();

  if (hydrated && lines.length === 0) {
    return (
      <PageIntro kicker="Your bag" title="Nothing yet.">
        <p>It&apos;s still early.</p>
        <Link href="/friday" className="link">
          Shop Friday →
        </Link>
      </PageIntro>
    );
  }

  return (
    <>
      <PageIntro kicker={`Your bag (${count})`} title="Your Bag" />
      <div className="page-x" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--s-8)", paddingBottom: "var(--s-10)", alignItems: "start" }}>
        <div style={{ marginInline: "calc(-1 * var(--s-5))" }}>
          <BagLines />
        </div>
        <aside style={{ display: "grid", gap: "var(--s-4)", position: "sticky", top: "calc(var(--header-h) + 24px)" }} aria-label="Order summary">
          <div style={{ display: "flex", justifyContent: "space-between" }} className="meta">
            <span>Subtotal</span>
            <span>{price(subtotal)}</span>
          </div>
          <p className="meta muted">Shipping, duties and taxes calculated at checkout. Free express shipping over $250.</p>
          <Link href="/checkout" className="btn btn-block">
            Checkout
          </Link>
          <p className="meta muted">Shop Pay · Apple Pay · Google Pay · Cards</p>
        </aside>
      </div>
    </>
  );
}
