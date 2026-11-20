/**
 * Commerce adapter. Today it reads seed data; in production each function is
 * replaced by a Shopify Storefront API query (see docs/ARCHITECTURE.md §Backend).
 * Components only ever import from here — never from lib/data directly for products.
 */
import { products } from "./data/products";
import { crafts, drops } from "./data/world";
import type { Category, Mood, Night, Product, Size } from "./types";

export const CATEGORIES: { slug: Category; label: string }[] = [
  { slug: "tops", label: "Tops" },
  { slug: "dresses", label: "Dresses" },
  { slug: "skirts", label: "Skirts" },
  { slug: "trousers", label: "Trousers" },
  { slug: "sets", label: "Sets" },
  { slug: "denim", label: "Denim" },
  { slug: "jackets", label: "Jackets" },
  { slug: "bags", label: "Bags" },
  { slug: "jewellery", label: "Jewellery" },
  { slug: "drapes", label: "Drapes" }
];

export const NIGHTS: { slug: Night; label: string }[] = [
  { slug: "dinner", label: "Dinner" },
  { slug: "drinks", label: "Drinks" },
  { slug: "birthday", label: "Birthday" },
  { slug: "vacation", label: "Vacation" },
  { slug: "after-midnight", label: "After Midnight" }
];

export const MOODS: { slug: Mood; label: string }[] = [
  { slug: "overdressed", label: "Overdressed" },
  { slug: "dinner", label: "Dinner" },
  { slug: "after-dark", label: "After Dark" },
  { slug: "vacation", label: "Vacation" },
  { slug: "main-character", label: "Main Character" },
  { slug: "last-minute", label: "Last-Minute Plans" }
];

export const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "OS"];

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

export interface ProductQuery {
  category?: Category;
  night?: Night;
  craft?: string;
  drop?: string;
  moods?: Mood[];
  sizes?: Size[];
  colors?: string[];
  crafts?: string[];
  materials?: string[];
  maxPrice?: number;
  inStock?: boolean;
  sort?: SortKey;
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs.map(getProduct).filter((p): p is Product => Boolean(p));
}

export function isSoldOut(p: Product): boolean {
  return p.variants.every((v) => v.stock === 0);
}

export function totalStock(p: Product): number {
  return p.variants.reduce((n, v) => n + v.stock, 0);
}

export function queryProducts(q: ProductQuery = {}): Product[] {
  let list = products.filter((p) => {
    if (q.category && p.category !== q.category) return false;
    if (q.night && !p.nights.includes(q.night)) return false;
    if (q.craft && p.craft !== q.craft) return false;
    if (q.drop && p.drop !== q.drop) return false;
    if (q.moods?.length && !q.moods.some((m) => p.moods.includes(m))) return false;
    if (q.sizes?.length && !p.variants.some((v) => q.sizes!.includes(v.size) && v.stock > 0)) return false;
    if (q.colors?.length && !p.colors.some((c) => q.colors!.includes(c.name))) return false;
    if (q.crafts?.length && (!p.craft || !q.crafts.includes(p.craft))) return false;
    if (q.materials?.length && !p.materials.some((m) => q.materials!.includes(m))) return false;
    if (q.maxPrice && p.price > q.maxPrice) return false;
    if (q.inStock && isSoldOut(p)) return false;
    return true;
  });
  switch (q.sort) {
    case "newest":
      list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    case "price-asc":
      list = [...list].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list = [...list].sort((a, b) => b.price - a.price);
      break;
  }
  return list;
}

export function getNewArrivals(limit = 4): Product[] {
  return queryProducts({ sort: "newest", inStock: true }).slice(0, limit);
}

/** Facet values present in the catalogue — filters never offer empty options. */
export function getFacets(list: Product[] = products) {
  const uniq = <T,>(xs: T[]) => Array.from(new Set(xs));
  return {
    colors: uniq(list.flatMap((p) => p.colors.map((c) => c.name))),
    materials: uniq(list.flatMap((p) => p.materials)),
    crafts: uniq(list.map((p) => p.craft).filter((c): c is string => Boolean(c))),
    sizes: SIZES.filter((s) => list.some((p) => p.variants.some((v) => v.size === s)))
  };
}

export interface SearchResult {
  products: Product[];
  crafts: typeof crafts;
  drops: typeof drops;
  categories: typeof CATEGORIES;
}

export function search(term: string): SearchResult {
  const t = term.trim().toLowerCase();
  if (!t) return { products: [], crafts: [], drops: [], categories: [] };
  const has = (s: string) => s.toLowerCase().includes(t);
  return {
    products: products.filter(
      (p) => has(p.title) || has(p.category) || (p.craft && has(p.craft)) || p.materials.some(has) || p.colors.some((c) => has(c.name)) || has(p.short)
    ),
    crafts: crafts.filter((c) => has(c.name) || has(c.term) || c.regions.some(has)),
    drops: drops.filter((d) => has(d.title) || has(`friday ${d.number}`)),
    categories: CATEGORIES.filter((c) => has(c.label))
  };
}
