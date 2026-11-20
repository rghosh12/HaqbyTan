import type { MetadataRoute } from "next";
import { CATEGORIES, getAllProducts } from "@/lib/commerce";
import { getCrafts, getDrops, getGirls } from "@/lib/content";
import { SITE_URL } from "@/lib/format";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/",
    "/new",
    "/shop",
    "/friday",
    "/craft",
    "/world",
    "/world/haq-girls",
    "/world/bathroom",
    "/world/radio",
    "/world/stories",
    "/about",
    "/shipping",
    "/returns",
    "/contact",
    ...CATEGORIES.map((c) => `/shop/${c.slug}`),
    ...getAllProducts().map((p) => `/product/${p.slug}`),
    ...getDrops().map((d) => `/friday/${d.slug}`),
    ...getCrafts().map((c) => `/craft/${c.slug}`),
    ...getGirls().map((g) => `/world/haq-girls/${g.slug}`)
  ];
  return paths.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now }));
}
