import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/commerce";
import { CollectionPage } from "@/components/commerce/CollectionPage";

const INTROS: Partial<Record<string, string>> = {
  tops: "The easiest way into HAQ. Wear one with jeans and see what happens.",
  dresses: "Dinner, then the place after dinner.",
  skirts: "Short enough.",
  trousers: "Something calm under something embroidered.",
  sets: "One decision. You've made enough tonight.",
  jackets: "For the cab, the bar and the walk home.",
  bags: "Fits a lipstick, a card, and maybe your keys.",
  jewellery: "Wear the earrings.",
  drapes: "Neck, waist, hair, taxi window."
};

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = CATEGORIES.find((x) => x.slug === category);
  if (!c) return {};
  return { title: c.label, description: INTROS[c.slug], alternates: { canonical: `/shop/${c.slug}` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = CATEGORIES.find((x) => x.slug === category);
  if (!c) notFound();
  return <CollectionPage kicker="Shop" title={c.label} intro={INTROS[c.slug]} base={{ category: c.slug }} listName={`category-${c.slug}`} />;
}
