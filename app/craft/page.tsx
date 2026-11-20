import type { Metadata } from "next";
import { getCrafts } from "@/lib/content";
import { CraftIndexPreview } from "@/components/editorial/CraftIndexPreview";
import { PageIntro } from "@/components/editorial/Statements";

export const metadata: Metadata = {
  title: "Craft Index",
  description: "The techniques HAQ uses, where they come from, and how we use them. Credit the source.",
  alternates: { canonical: "/craft" }
};

export default function CraftPage() {
  return (
    <>
      <PageIntro kicker="HAQ Craft Index" title="Credit the source.">
        <p>Every technique we use, what it is, where it comes from and who practises it. Only the ones we actually use.</p>
        <p className="muted" id="makers">
          Maker and workshop credits appear on each piece once we&apos;ve verified them with the workshop. Until then, we leave the line blank rather than guess.
        </p>
      </PageIntro>
      <CraftIndexPreview crafts={getCrafts()} />
    </>
  );
}
