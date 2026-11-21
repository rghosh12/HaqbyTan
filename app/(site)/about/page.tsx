import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/editorial/InfoPage";

export const metadata: Metadata = { title: "About", description: "HAQ means right. Your right to dress up.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <InfoPage
      kicker="About HAQ"
      title="You don't need an occasion."
      sections={[
        {
          heading: "HAQ means right",
          body: (
            <>
              <p>Your right to dress up. Not because it&apos;s Diwali. Not because somebody is getting married. Just because it&apos;s Friday.</p>
              <p>Indian clothes got stuck at weddings. We&apos;re taking them out for drinks.</p>
            </>
          )
        },
        {
          heading: "Credit the source",
          body: (
            <>
              <p>Every technique we use has a home and a history. We say what it is, where it comes from, who practises it, and who made your piece — once we&apos;ve verified it.</p>
              <Link href="/craft" className="link">
                The Craft Index →
              </Link>
            </>
          )
        },
        { heading: "Careers", body: <p>We&apos;ll post roles here when we&apos;re hiring.</p> }
      ]}
    />
  );
}
