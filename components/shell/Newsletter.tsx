"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import s from "./Shell.module.css";

/** No "10% off". Ever. Posts to /api/subscribe, which hands off to Klaviyo. */
export function Newsletter({
  heading = "It's almost Friday.",
  sub = "We'll text you. Drops, nights, new arrivals.",
  source = "newsletter",
  cta = "Join HAQ →"
}: {
  heading?: string;
  sub?: string;
  source?: "newsletter" | "friday";
  cta?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const id = `nl-${source}`;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("That email doesn't look right.");
      return;
    }
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source })
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      track(source === "friday" ? "friday_signup" : "newsletter_signup", { source });
    } catch {
      setState("error");
      setError("Couldn't reach us. Try again in a second.");
    }
  }

  if (state === "done") {
    return (
      <div className={s.newsletter} role="status">
        <p className={`display ${s.nlHeading}`}>You&apos;re on the list.</p>
        <p className="muted">See you Friday.</p>
      </div>
    );
  }

  return (
    <form className={s.newsletter} onSubmit={submit} noValidate>
      <p className={`display ${s.nlHeading}`}>{heading}</p>
      <p className="muted">{sub}</p>
      <div className={s.nlRow}>
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : undefined}
          className={s.nlInput}
        />
        <button type="submit" className="link" disabled={state === "sending"}>
          {state === "sending" ? "Joining…" : cta}
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
