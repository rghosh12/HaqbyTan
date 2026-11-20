import Link from "next/link";
import { PageIntro } from "@/components/editorial/Statements";

export default function NotFound() {
  return (
    <div style={{ minHeight: "70vh", display: "grid", alignContent: "center" }}>
      <PageIntro kicker="404 · Fri 7:43 PM" title="Wrong turn.">
        <p>Your cab is probably downstairs anyway.</p>
        <Link href="/" className="link">
          Back to HAQ →
        </Link>
      </PageIntro>
    </div>
  );
}
