import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsBySlugs } from "@/lib/commerce";
import { getGirl, getGirls } from "@/lib/content";
import { HaqGirlFeature } from "@/components/editorial/HaqGirlFeature";
import { ProductGrid } from "@/components/commerce/ProductGrid";

export function generateStaticParams() {
  return getGirls().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGirl(slug);
  if (!g) return {};
  return { title: `${g.name}, ${g.city} — HAQ Girl ${g.number}`, description: g.order, alternates: { canonical: `/world/haq-girls/${g.slug}` } };
}

export default async function GirlPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const girl = getGirl(slug);
  if (!girl) notFound();
  return (
    <>
      <HaqGirlFeature girl={girl} />
      <section className="section-commerce page-x" aria-labelledby="her-look">
        <div className="section-head">
          <h2 id="her-look" className="meta">
            Shop her look
          </h2>
        </div>
        <ProductGrid products={getProductsBySlugs(girl.look)} columns={3} list={`girl-${girl.slug}`} />
      </section>
    </>
  );
}
