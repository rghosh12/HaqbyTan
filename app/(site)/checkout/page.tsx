"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/components/store/StoreProvider";
import { price } from "@/lib/format";

/**
 * Checkout handoff. Calm: cream, black, clear. In production this page is not
 * needed — the bag's Checkout button redirects to the Shopify cart.checkoutUrl
 * (Shop Pay / Apple Pay / Google Pay, guest checkout, saved addresses, tax, duties).
 * Without a store connected, we say so plainly instead of faking a payment form.
 */
export default function CheckoutPage() {
  const { lines, subtotal, hydrated } = useStore();
  const [state, setState] = useState<"idle" | "redirecting" | "unconfigured">("idle");

  async function handoff() {
    setState("redirecting");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: lines.map((l) => ({ slug: l.slug, size: l.size, color: l.color, qty: l.qty })) })
      });
      const data = (await res.json()) as { url?: string };
      if (data.url) window.location.href = data.url;
      else setState("unconfigured");
    } catch {
      setState("unconfigured");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 720, paddingBlock: "var(--s-9) var(--s-10)", display: "grid", gap: "var(--s-6)" }}>
      <h1 className="display" style={{ fontSize: "var(--t-h1)" }}>
        Checkout
      </h1>
      {hydrated && lines.length === 0 ? (
        <>
          <p>Your bag is empty.</p>
          <Link href="/shop" className="link">
            Back to the shop →
          </Link>
        </>
      ) : (
        <>
          <ul role="list" style={{ display: "grid", gap: 12, borderBlock: "1px solid var(--rule)", padding: "16px 0" }}>
            {lines.map((l) => (
              <li key={`${l.slug}-${l.size}-${l.color}`} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                <span>
                  {l.title} <span className="muted">— {l.color} / {l.size} × {l.qty}</span>
                </span>
                <span>{price(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="meta">Subtotal</span>
            <span>{price(subtotal)}</span>
          </div>
          <p className="muted">Shipping, duties and taxes are confirmed on the next step. Guest checkout is always available.</p>
          <button className="btn btn-block" onClick={handoff} disabled={state === "redirecting"}>
            {state === "redirecting" ? "One second…" : "Continue to secure checkout"}
          </button>
          {state === "unconfigured" && (
            <p role="alert" className="field-error">
              Checkout isn&apos;t connected in this environment. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN to hand off to Shopify.
            </p>
          )}
        </>
      )}
    </div>
  );
}
