"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import s from "./ComingSoon.module.css";

/** One field, one action. States: idle → sending → done | error. */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "waitlist" })
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      track("newsletter_signup", { source: "waitlist" });
    } catch {
      setState("idle");
      setError("Something went wrong. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <div className={s.done} role="status">
        <p className="meta">You&apos;re on the list.</p>
        <p className="display-italic">We&apos;ll message you before Friday 001 drops.</p>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <label htmlFor="cs-email" className="meta">
        Be first to the drop
      </label>
      <div className={s.field}>
        <input
          id="cs-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "cs-email-err cs-consent" : "cs-consent"}
          className={s.input}
        />
        <button type="submit" className={s.submit} disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Notify me"}
        </button>
      </div>
      {error && (
        <p id="cs-email-err" className="field-error" role="alert">
          {error}
        </p>
      )}
      <p id="cs-consent" className={`meta muted ${s.consent}`}>
        Drop news only. Unsubscribe any time.
      </p>
    </form>
  );
}
