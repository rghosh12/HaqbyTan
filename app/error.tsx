"use client";

import { useEffect } from "react";
import { PageIntro } from "@/components/editorial/Statements";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div style={{ minHeight: "70vh", display: "grid", alignContent: "center" }}>
      <PageIntro kicker="Something broke" title="Not ready yet.">
        <p>That page didn&apos;t load. It&apos;s us, not you.</p>
        <button className="link" onClick={reset}>
          Try again →
        </button>
      </PageIntro>
    </div>
  );
}
