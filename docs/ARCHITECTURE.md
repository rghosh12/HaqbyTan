# HAQ — Architecture & Design System

> Indian after dark. Friday, 7:43 PM. You don't need an occasion.

This document covers phases 1–2 of the brief (information architecture, design system) and records how the build maps to the production stack in phases 7–8.

---

## 1. Information architecture

### Site map

```
/                         Homepage (editorial sequence, see §3)
/new                      New arrivals (PLP)
/shop                     All products (PLP) — ?night= and ?craft= for HAQ taxonomy
/shop/[category]          tops · dresses · skirts · trousers · sets · denim · jackets · bags · jewellery · drapes
/product/[slug]           PDP
/friday                   The weekly ritual (live drop, radio, girl, note, next drop, archive)
/friday/[drop]            Drop chapter (hero, night timeline, lookbook, products / countdown + waitlist)
/craft                    HAQ Craft Index
/craft/[slug]             Technique page (terminology, regions, history, process, makers, pieces)
/world                    World of HAQ hub
/world/haq-girls(/[slug]) HAQ Girl profiles → shop her look
/world/bathroom           Bathroom selfies
/world/radio              HAQ Radio
/world/stories            Notes, city nights, craft
/search                   Shareable results (overlay is the primary search surface)
/cart  /wishlist  /account  /checkout (handoff)
/about /shipping /returns /contact
```

### Navigation

Desktop header: `HAQ · NEW · SHOP · FRIDAY · CRAFT · HAQ GIRLS · WORLD OF HAQ · SEARCH · ACCOUNT · BAG (n)`.
SHOP opens an editorial mega menu: **Shop** (category taxonomy) · **By Night** + **By Craft** (HAQ taxonomy) · the live drop.
Mobile: `MENU · HAQ · search · BAG`; full-screen menu with large serif links.

### Funnel

`Campaign (hero / drop / film)` → `Look (shop-the-look, HAQ girl, bathroom)` → `PDP` → `Bag drawer` → `Shopify checkout`.
Every editorial module ends in a product, a drop, a waitlist or a relationship (newsletter) — no aesthetic dead ends.

---

## 2. Design system

All tokens live in [`app/globals.css`](../app/globals.css) `:root`.

| Group | Tokens |
|---|---|
| Foundation | `--haq-ink #0A0A0A` · `--haq-ivory #F5F1E8` · `--haq-paper #ECE6D9` · `--haq-silver #B7B7B7` |
| Accents (one per drop/section) | `--haq-rani` · `--haq-sindoor` · `--haq-cobalt` · `--haq-mehendi` · `--haq-haldi` · `--haq-wine` · `--haq-plum` |
| Surfaces | `.surface-ink` · `.surface-paper` · `.surface-wine` · `.surface-cobalt` · `.surface-rani` — each redefines `--bg/--fg/--muted/--rule` |
| Type | Display: Bodoni Moda (high-contrast serif). UI: Inter Tight (grotesk). Timestamp: JetBrains Mono. Fluid scale via `clamp()`: `--t-hero` 48→160, `--t-h1` 38→88, body 15→17, meta 11 |
| Spacing | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160; editorial sections 96–160, commerce 48–80 |
| Grid | max 1560px, gutters 16→40px, 12-col editorial grids; editorial images may go full-bleed |
| Ratios | portrait 3/4 · tall 2/3 · landscape 3/2 · wide 16/9 · square 1/1 |
| Motion | `--d-ui 150ms` · `--d-nav 300ms` · `--d-reveal 700ms`; reduced-motion disables all |
| Layers | sticky 20 · header 40 · menu 50 · drawer 60 · overlay 70 · toast 80 |
| Shape | radius 2px; hairlines `1px rgba(0,0,0,.15)`; shadow only on overlays |

**Rule:** the interface whispers, the clothes shout. Accents arrive with campaigns; ecommerce chrome stays ivory/ink. Checkout removes maximalism entirely.

**Header behaviour:** sections declare `data-surface="hero" | "dark"`; the header reads the surface under it (one rAF-throttled read) and goes transparent → ivory → ink.

**Imagery:** every image slot is a `MediaAsset` with an art-direction note. Until photography exists, `<Media>` renders a toned, grained, flash-lit placeholder showing the shot direction and timestamp — never a broken image. Add `src` and it becomes an optimised `next/image` (AVIF/WebP).

### Component inventory

| Area | Components |
|---|---|
| Shell | `Header`, `MegaMenu`, `MobileMenu`, `SearchOverlay`, `CartDrawer`, `Newsletter`, `Footer` |
| UI | `Media`, `Timestamp`, `Reveal`, `Icon` |
| Commerce | `ProductCard` (hover flash swap, quick size add, wishlist), `ProductGrid` (editorial interruptions), `CollectionView` (filter drawer, sort, view 2/3/4, shop-by-mood), `CollectionPage`, `ProductGallery` (vertical feed / mobile swipe, View-the-Craft lens), `ProductInfo` (colour, size, low-stock, sold-out return list, size guide, sticky mobile bar, accordions), `CraftTerm` tooltip, `BagLines` |
| Editorial | `HeroCampaign` + `HeroClock` (7:18 → 8:07 sequence), `DropIntro`, `ShopTheLook` (typographic markers), `WearingTonight`, `WhereWear`, `CraftFeature`, `EditorialQuote`, `GridStatement`, `GridImage`, `BathroomGallery`, `HaqGirlFeature`, `Radio`, `FridayModule` + `Countdown`, `CraftIndexPreview`, `Marquee`, `PageIntro`, `InfoPage` |

---

## 3. Homepage sequence

1. Immersive Friday hero (100svh, giant wordmark, clock sequence, *Shop the night →*)
2. Friday 001 — Not Ready Yet
3. New tonight (4-up grid)
4. Campaign break — shoppable film still (01 / 02 / 03 markers)
5. What are you wearing tonight? (four HAQ girls)
6. Tops / Dresses / Sets
7. Where are you even going to wear that? → **Wherever.**
8. Zardozi after dark (wine surface, macro, three pieces)
9. "Casual only, okay?" — Sure.
10. Bathroom selfies
11. HAQ Girl feature
12. HAQ Radio
13. Friday 002 countdown + waitlist (real date only)
14. Craft Index preview
15. Marquee → footer (newsletter, columns, giant HAQ, region/currency)

Rhythm: immersion → commerce → story → commerce → culture → commerce. Never two grids back to back.

---

## 4. Content model

TypeScript types in [`lib/types.ts`](../lib/types.ts) mirror the CMS/commerce schemas.

- **Product** (Shopify product + metafields): title, slug, price, category, nights, moods, drop, craft, materials, colours, variants (size × stock), labels, short, look, craftNote, details, care, fit (notes, stretch, model), measurements, images, complements.
- **Drop** (Sanity): number, title, accent, date (19:43 local), status, lines, timeline, hero, gallery, playlist.
- **Craft** (Sanity): name, term, regions, oneLine, history, nuance, materials, process, **makers (null until verified)**, images.
- **HaqGirl**: number, name, city, time, order, quote, portrait, look.
- **BathroomSelfie**: caption, where, time, image, look, span (hero/tall/wide/small).
- **Playlist**, **Story**.

Provenance rule: `makers` stays `null` until a workshop is verified; the UI then says so instead of inventing a name. Craft pages describe contested origins with nuance (see chikankari, mirror work).

---

## 5. Backend (phase 7)

| Concern | Today | Production |
|---|---|---|
| Catalogue, variants, stock | `lib/data/products.ts` via `lib/commerce.ts` | Shopify Storefront API — replace functions in `lib/commerce.ts` only |
| Editorial | `lib/data/world.ts` via `lib/content.ts` | Sanity (GROQ) — replace functions in `lib/content.ts` only |
| Bag | `StoreProvider` + localStorage cache | Shopify Cart API (`cartCreate`, `cartLinesAdd`), cart id in cookie |
| Checkout | `/api/checkout` validates, returns `url: null` | Return `cart.checkoutUrl` (Shop Pay / Apple Pay / Google Pay, guest checkout) |
| Accounts | UI only, passwordless | Shopify Customer Account API |
| Email/SMS | `/api/subscribe` → Klaviyo when `KLAVIYO_PRIVATE_KEY` + `KLAVIYO_LIST_ID` set | same |
| Analytics | `lib/analytics.ts` pushes GA4-shaped events to `dataLayer` | GTM → GA4 / Meta / TikTok; server-side `purchase` from Shopify webhook |
| Search | In-memory | Algolia once the catalogue warrants it |
| Media | Placeholder frames | Shopify CDN / Cloudinary via `next/image` `remotePatterns` |

Tracked events: `view_item`, `select_item`, `view_item_list`, `add_to_cart`, `remove_from_cart`, `add_to_wishlist`, `begin_checkout`, `search`, `filter_used`, `size_guide_opened`, `craft_story_opened`, `shop_the_look_clicked`, `friday_signup`, `newsletter_signup` (`purchase` is server-side).

### Environment variables

```
NEXT_PUBLIC_SITE_URL=
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_TOKEN=
KLAVIYO_PRIVATE_KEY=
KLAVIYO_LIST_ID=
```

---

## 6. Open items

- Photography: every `MediaAsset.direction` is the shot list. Drop `src` in to replace placeholders.
- Business copy to confirm: shipping thresholds, return window, dispatch times, contact addresses (currently placeholders on `/shipping`, `/returns`, `/contact`, PDP).
- Craft maker credits: verify per workshop before filling `makers`.
- Playlists: add real track lists and `url`; the play button stays disabled until then.
- Shopify variant mapping for `/api/checkout`.
