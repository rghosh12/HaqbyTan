import type { Metadata } from "next";
import { CollectionPage } from "@/components/commerce/CollectionPage";

export const metadata: Metadata = { title: "New", description: "New at HAQ this Friday.", alternates: { canonical: "/new" } };

export default function NewPage() {
  return <CollectionPage kicker="New tonight" title="New" intro="Landed this week. Wear it this Friday." base={{ sort: "newest" }} listName="new" />;
}
