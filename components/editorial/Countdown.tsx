"use client";

import { useEffect, useState } from "react";

/** Real countdown to a real drop date. Renders nothing once the drop is live — never fake scarcity. */
export function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) return <p className="mono" style={{ minHeight: "3.6em" }} aria-hidden="true" />;
  const ms = target - now;
  if (ms <= 0) return null;
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <p className="mono" style={{ display: "grid", gap: 2 }} aria-label={`${d} days, ${h} hours, ${m} minutes to go`}>
      <span>{pad(d)} days</span>
      <span>{pad(h)} hours</span>
      <span>{pad(m)} minutes</span>
    </p>
  );
}
