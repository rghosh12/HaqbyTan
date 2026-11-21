import type { Metadata } from "next";
import { InfoPage } from "@/components/editorial/InfoPage";

export const metadata: Metadata = { title: "Returns", alternates: { canonical: "/returns" } };

export default function ReturnsPage() {
  return (
    <InfoPage
      kicker="Help"
      title="Returns."
      sections={[
        { heading: "The short version", body: <p>Unworn, with tags, within 14 days of delivery. Start it from your account.</p> },
        { heading: "Refunds", body: <p>Refunds go back to your original payment method within 5–10 business days of the return reaching us.</p> },
        { heading: "Exceptions", body: <p>Earrings can&apos;t be returned for hygiene reasons unless they arrive faulty. Made-to-order pieces are final sale and marked clearly before you buy.</p> }
      ]}
    />
  );
}
