import { NextResponse } from "next/server";
import { getProduct } from "@/lib/commerce";

/**
 * Creates a Shopify cart and returns its checkoutUrl. Requires variant GIDs mapped
 * per product/size/colour (see docs/ARCHITECTURE.md §Backend). Until the store is
 * connected, it validates the bag and returns { url: null } — never a fake order.
 */
export async function POST(req: Request) {
  let body: { lines?: { slug: string; size: string; color: string; qty: number }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const lines = (body.lines ?? []).filter((l) => getProduct(l.slug) && Number.isInteger(l.qty) && l.qty > 0 && l.qty < 10);
  if (lines.length === 0) return NextResponse.json({ error: "empty" }, { status: 422 });

  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token) return NextResponse.json({ url: null, reason: "commerce_not_configured" });

  // Production: resolve each line to a ProductVariant GID, then cartCreate.
  return NextResponse.json({ url: null, reason: "variant_mapping_pending" });
}
