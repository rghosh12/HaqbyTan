import Link from "next/link";
import type { Craft, Product } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Reveal } from "@/components/ui/Reveal";
import s from "./Editorial.module.css";

/** Deep wine. Full-width macro, then the craft in two lines, then the pieces that use it. */
export function CraftFeature({ craft, title, lines, products }: { craft: Craft; title: string; lines: string[]; products: Product[] }) {
  return (
    <section className={`surface-wine ${s.craft}`} data-surface="dark" aria-labelledby={`craft-${craft.slug}`}>
      <Media asset={craft.images[0]!} ratio="21 / 9" sizes="100vw" className={s.craftMacro} />
      <div className={`container ${s.craftBody}`}>
        <Reveal className={s.craftText}>
          <p className="mono">
            {craft.name} · {craft.regions.slice(0, 2).join(" / ")} · India
          </p>
          <h2 id={`craft-${craft.slug}`} className={`display ${s.h1}`}>
            {title}
          </h2>
          {lines.map((l) => (
            <p key={l} className={s.craftLine}>
              {l}
            </p>
          ))}
          <Link href={`/craft/${craft.slug}`} className="link">
            Explore the craft →
          </Link>
        </Reveal>
        <ProductGrid products={products} columns={3} list={`craft-${craft.slug}`} />
      </div>
    </section>
  );
}
