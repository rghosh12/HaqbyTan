"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/components/store/StoreProvider";
import { SIZES } from "@/lib/commerce";
import { PageIntro } from "@/components/editorial/Statements";

/**
 * Account dashboard. Sign-in is delegated to Shopify Customer Account API
 * (passwordless email code), so this page never handles passwords itself.
 */
export default function AccountPage() {
  const { savedSize, saveSize, wishlist } = useStore();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const sections = [
    { title: "Orders", body: "Nothing ordered yet.", href: "/shop", cta: "Start with a top →" },
    { title: "Returns", body: "Start a return within 14 days of delivery.", href: "/returns", cta: "How returns work →" },
    { title: "Friday list", body: `${wishlist.length} saved`, href: "/wishlist", cta: "Open →" },
    { title: "Address book", body: "Saved at your first checkout.", href: "/checkout", cta: "Checkout →" }
  ];

  return (
    <>
      <PageIntro kicker="Account" title="Hi.">
        <p>Orders, returns, saved sizes and your Friday list.</p>
      </PageIntro>
      <div className="page-x" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--s-7)", paddingBottom: "var(--s-10)" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (/^\S+@\S+\.\S+$/.test(email)) setSent(true);
          }}
          style={{ display: "grid", gap: "var(--s-3)", alignContent: "start" }}
          aria-labelledby="signin"
        >
          <h2 id="signin" className="meta">
            Sign in
          </h2>
          {sent ? (
            <p role="status">If there&apos;s an account for {email}, a sign-in code is on its way.</p>
          ) : (
            <>
              <div className="field">
                <label htmlFor="acct-email">Email</label>
                <input id="acct-email" className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <button className="btn" type="submit">
                Send me a code
              </button>
              <p className="meta muted">No passwords. We email you a one-time code.</p>
            </>
          )}
        </form>

        <div style={{ display: "grid", gap: "var(--s-3)", alignContent: "start" }}>
          <h2 className="meta">Saved size</h2>
          <div role="radiogroup" aria-label="Saved size" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {SIZES.filter((s) => s !== "OS").map((s) => (
              <button key={s} role="radio" aria-checked={savedSize === s} className={savedSize === s ? "btn" : "btn btn-ghost"} style={{ minHeight: 44, padding: "0 16px" }} onClick={() => saveSize(s)}>
                {s}
              </button>
            ))}
          </div>
          <p className="meta muted">We&apos;ll pre-select it on every product page.</p>
        </div>

        {sections.map((s) => (
          <section key={s.title} style={{ display: "grid", gap: 8, alignContent: "start", borderTop: "1px solid var(--rule)", paddingTop: 16 }}>
            <h2 className="meta">{s.title}</h2>
            <p className="muted">{s.body}</p>
            <Link href={s.href} className="link">
              {s.cta}
            </Link>
          </section>
        ))}
      </div>
    </>
  );
}
