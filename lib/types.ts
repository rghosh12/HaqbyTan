/**
 * HAQ content model. Mirrors the Sanity (editorial) + Shopify (commerce)
 * schemas described in docs/ARCHITECTURE.md so seed data can be swapped
 * for live adapters without touching components.
 */

export type Accent = "rani" | "sindoor" | "cobalt" | "mehendi" | "haldi" | "wine" | "plum" | "silver";

/** An image slot. `src` is optional: until photography lands, the Media
 *  component renders an art-directed placeholder from `tone` + `direction`. */
export interface MediaAsset {
  src?: string;
  alt: string;
  /** Art direction note — what the photograph should be. Shown when src is missing. */
  direction: string;
  tone: Accent | "ink" | "ivory" | "paper";
  kind: "editorial" | "flash" | "macro" | "candid" | "product";
  /** Optional timestamp burned into the frame, e.g. "7:43 PM". */
  stamp?: string;
}

export type Category =
  | "tops"
  | "dresses"
  | "skirts"
  | "trousers"
  | "sets"
  | "denim"
  | "jackets"
  | "bags"
  | "jewellery"
  | "drapes";

export type Night = "dinner" | "drinks" | "birthday" | "vacation" | "after-midnight";
export type Mood = "overdressed" | "dinner" | "after-dark" | "vacation" | "main-character" | "last-minute";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "OS";
export type Label = "NEW" | "FRIDAY DROP" | "HANDCRAFTED" | "LIMITED";

export interface Colorway {
  name: string;
  hex: string;
}

export interface Variant {
  size: Size;
  /** Units available. 0 = sold out for that size; 1–2 = low stock. Real values only. */
  stock: number;
}

export interface Product {
  slug: string;
  title: string;
  price: number; // USD, whole dollars
  category: Category;
  nights: Night[];
  moods: Mood[];
  drop: string; // drop slug
  craft?: string; // craft slug
  materials: string[];
  colors: Colorway[];
  variants: Variant[];
  labels: Label[];
  /** One line, under the price. */
  short: string;
  look: string;
  craftNote?: string;
  details: string[];
  care: string[];
  fit: {
    notes: string;
    stretch: "none" | "low" | "medium" | "high";
    model: string;
  };
  measurements?: { size: Size; bust?: number; waist?: number; hip?: number; length: number }[];
  images: MediaAsset[];
  complements: string[]; // product slugs for "you may also need"
  createdAt: string;
}

export interface Drop {
  slug: string;
  number: string; // "001"
  title: string;
  accent: Accent;
  date: string; // ISO; release time, 19:43 local
  status: "live" | "upcoming" | "archive";
  lines: string[];
  timeline?: { time: string; line: string }[];
  hero: MediaAsset;
  gallery: MediaAsset[];
  playlist?: string;
}

export interface Craft {
  slug: string;
  name: string;
  term: string; // original terminology
  regions: string[];
  oneLine: string;
  history: string[];
  materials: string[];
  process: string[];
  /** Null until a named workshop/cluster is verified. Never fabricate. */
  makers: string | null;
  nuance?: string;
  images: MediaAsset[];
}

export interface HaqGirl {
  slug: string;
  number: string;
  name: string;
  city: string;
  time: string;
  order: string; // "Martini → dinner → …"
  quote: string;
  portrait: MediaAsset;
  look: string[]; // product slugs
}

export interface BathroomSelfie {
  id: string;
  caption: string;
  where: string;
  time: string;
  image: MediaAsset;
  look: string[];
  span: "hero" | "tall" | "wide" | "small";
}

export interface Playlist {
  slug: string;
  title: string;
  mood: string;
  tracks: { title: string; artist: string }[];
  url?: string;
}

export interface Story {
  slug: string;
  title: string;
  category: "friday" | "craft" | "city-nights" | "notes";
  date: string;
  dek: string;
  image: MediaAsset;
  products: string[];
}
