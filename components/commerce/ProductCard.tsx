"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/components/store/StoreProvider";
import { isSoldOut } from "@/lib/commerce";
import { getCraft } from "@/lib/content";
import { track } from "@/lib/analytics";
import { price } from "@/lib/format";
import type { Product } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import s from "./Commerce.module.css";

/**
 * Image, name, price, colours. Hover swaps to the flash shot and reveals quick sizes.
 * No borders, no shadows, no badge soup — at most one meaningful label.
 */
export function ProductCard({ product, list = "grid", priority = false }: { product: Product; list?: string; priority?: boolean }) {
  const { add, toggleWish, isWished, savedSize } = useStore();
  const [added, setAdded] = useState<string | null>(null);
  const soldOut = isSoldOut(product);
  const craft = product.craft ? getCraft(product.craft) : undefined;
  const label = soldOut ? "Sold out" : product.labels[0];
  const wished = isWished(product.slug);
  const href = `/product/${product.slug}`;

  const quickAdd = (size: string) => {
    add({ slug: product.slug, title: product.title, price: product.price, color: product.colors[0]!.name, size: size as Product["variants"][number]["size"], qty: 1 });
    setAdded(size);
    window.setTimeout(() => setAdded(null), 1600);
  };

  return (
    <article className={s.card}>
      <div className={s.cardMedia}>
        <Link href={href} onClick={() => track("select_item", { item_list_name: list, items: [{ item_id: product.slug }] })} aria-label={product.title}>
          <Media asset={product.images[0]!} showDirection={false} sizes="(max-width: 860px) 50vw, 25vw" priority={priority} className={s.imgA} />
          <Media asset={product.images[1] ?? product.images[0]!} showDirection={false} sizes="(max-width: 860px) 50vw, 25vw" className={s.imgB} />
        </Link>
        {label && <span className={`mono ${s.cardLabel}`}>{label}</span>}
        <button className={s.wish} onClick={() => toggleWish(product.slug)} aria-pressed={wished} aria-label={wished ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}>
          <Icon name="heart" size={18} fill={wished ? "currentColor" : "none"} />
        </button>
        {!soldOut && (
          <div className={s.quick} role="group" aria-label={`Quick add ${product.title}`}>
            {added ? (
              <span className="meta">In your bag ✓</span>
            ) : (
              product.variants.map((v) => (
                <button
                  key={v.size}
                  className={s.quickSize}
                  disabled={v.stock === 0}
                  data-saved={savedSize === v.size}
                  onClick={() => quickAdd(v.size)}
                  aria-label={`Add size ${v.size} to bag${v.stock === 0 ? " — unavailable" : ""}`}
                >
                  {v.size}
                </button>
              ))
            )}
          </div>
        )}
      </div>
      <Link href={href} className={s.cardInfo} tabIndex={-1}>
        <h3 className="meta">{product.title}</h3>
        <p className="meta">{price(product.price)}</p>
        <p className="meta muted">
          {craft ? `Hand ${craft.name} · ` : ""}
          {product.colors.length > 1 ? `${product.colors.length} colours` : product.colors[0]!.name}
        </p>
      </Link>
    </article>
  );
}
