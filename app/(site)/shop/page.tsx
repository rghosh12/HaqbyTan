import type { Metadata } from "next";
import { NIGHTS } from "@/lib/commerce";
import { getCraft } from "@/lib/content";
import type { Night } from "@/lib/types";
import { CollectionPage } from "@/components/commerce/CollectionPage";

export const metadata: Metadata = {
  title: "Shop",
  description: "Embroidered tops, silk, drapes, tiny bags and silver. Indian craft for a Friday night.",
  alternates: { canonical: "/shop" }
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ night?: string; craft?: string }> }) {
  const sp = await searchParams;
  const night = NIGHTS.find((n) => n.slug === sp.night);
  const craft = sp.craft ? getCraft(sp.craft) : undefined;

  const title = night ? night.label : craft ? craft.name : "Shop";
  const kicker = night ? "Shop by night" : craft ? "Shop by craft" : "Fri 7:43 PM";
  const intro = night
    ? `What to wear to ${night.label.toLowerCase()}. Or anywhere, honestly.`
    : craft
      ? craft.oneLine
      : "Everything, for the night you haven't planned yet.";

  return (
    <CollectionPage
      key={`${sp.night ?? ""}-${sp.craft ?? ""}`}
      kicker={kicker}
      title={title}
      intro={intro}
      base={{ night: night?.slug as Night | undefined, craft: craft?.slug }}
      listName={night ? `night-${night.slug}` : craft ? `craft-${craft.slug}` : "shop-all"}
    />
  );
}
