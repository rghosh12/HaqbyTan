import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getAllProducts, getProduct, getProductsBySlugs, isSoldOut, totalStock } from "@/lib/commerce";
import { getCraft, getDrop, getGirls } from "@/lib/content";
import { SITE_URL } from "@/lib/format";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { ProductInfo } from "@/components/commerce/ProductInfo";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Media } from "@/components/ui/Media";
import c from "@/components/commerce/Commerce.module.css";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.short} ${p.look}`.slice(0, 155),
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title: `${p.title} — HAQ`, description: p.short, type: "website" }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const craft = product.craft ? getCraft(product.craft) : undefined;
  const drop = getDrop(product.drop);
  const category = CATEGORIES.find((x) => x.slug === product.category)!;
  const complements = getProductsBySlugs(product.complements);
  const girl = getGirls().find((g) => g.look.includes(product.slug));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.look,
      sku: product.slug,
      brand: { "@type": "Brand", name: "HAQ" },
      material: product.materials.join(", "),
      color: product.colors.map((x) => x.name).join(", "),
      offers: {
        "@type": "Offer",
        url: `${SITE_URL}/product/${product.slug}`,
        priceCurrency: "USD",
        price: product.price,
        availability: isSoldOut(product) ? "https://schema.org/OutOfStock" : totalStock(product) <= 3 ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Shop", item: `${SITE_URL}/shop` },
        { "@type": "ListItem", position: 2, name: category.label, item: `${SITE_URL}/shop/${category.slug}` },
        { "@type": "ListItem", position: 3, name: product.title }
      ]
    }
  ];

  return (
    <>
      <nav aria-label="Breadcrumb" className="page-x meta muted" style={{ padding: "16px var(--page-x)" }}>
        <Link href="/shop">Shop</Link> / <Link href={`/shop/${category.slug}`}>{category.label}</Link>
        {drop && (
          <>
            {" "}
            · <Link href={`/friday/${drop.slug}`}>Friday {drop.number}</Link>
          </>
        )}
      </nav>

      <div className={c.pdp}>
        <ProductGallery product={product} craft={craft} />
        <ProductInfo product={product} craft={craft} />
      </div>

      {craft && (
        <section className="surface-ivory section-editorial page-x" aria-labelledby="the-craft" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--s-8)", alignItems: "center" }}>
          <Media asset={craft.images[0]!} ratio="1 / 1" sizes="(max-width: 860px) 100vw, 50vw" />
          <div style={{ display: "grid", gap: "var(--s-4)", justifyItems: "start", maxWidth: 520 }}>
            <p className="mono">The craft</p>
            <h2 id="the-craft" className="display" style={{ fontSize: "var(--t-h1)" }}>
              {craft.name}
            </h2>
            <p className="mono muted">{craft.regions.join(" / ")} · India</p>
            <p>{product.craftNote}</p>
            <p className="muted">{craft.history[0]}</p>
            <Link href={`/craft/${craft.slug}`} className="link">
              View the story →
            </Link>
          </div>
        </section>
      )}

      {girl && (
        <section className="section-commerce page-x" style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", borderTop: "1px solid var(--rule)" }}>
          <p className="display-italic" style={{ fontSize: 28 }}>
            {girl.name} wore it in {girl.city}, {girl.time}.
          </p>
          <Link href={`/world/haq-girls/${girl.slug}`} className="link">
            Shop her look →
          </Link>
        </section>
      )}

      {complements.length > 0 && (
        <section className="section-commerce page-x" aria-labelledby="complete">
          <div className="section-head">
            <h2 id="complete" className="meta">
              Wear it with
            </h2>
          </div>
          <ProductGrid products={complements} columns={4} list={`pdp-${product.slug}`} />
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
