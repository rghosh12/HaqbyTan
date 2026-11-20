"use client";

import Link from "next/link";
import { useStore } from "@/components/store/StoreProvider";
import { getProductsBySlugs } from "@/lib/commerce";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { PageIntro } from "@/components/editorial/Statements";

export default function WishlistPage() {
  const { wishlist, hydrated } = useStore();
  const products = getProductsBySlugs(wishlist);
  return (
    <>
      <PageIntro kicker="Saved" title="Friday list">
        {hydrated && products.length === 0 && (
          <>
            <p>Nothing saved yet. Tap the heart on anything you&apos;d wear this Friday.</p>
            <Link href="/new" className="link">
              See what&apos;s new →
            </Link>
          </>
        )}
      </PageIntro>
      {products.length > 0 && (
        <div className="page-x" style={{ paddingBottom: "var(--s-10)" }}>
          <ProductGrid products={products} columns={4} list="wishlist" />
        </div>
      )}
    </>
  );
}
