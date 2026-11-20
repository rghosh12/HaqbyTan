# HAQ

**Indian after dark. Friday, 7:43 PM. You don't need an occasion.**

The digital flagship for HAQ: contemporary Indian fashion for going out. Next.js 15 (App Router) · React 19 · TypeScript (strict) · CSS Modules + design tokens.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerender)
npm run typecheck
```

## What's here

- **Homepage**: the full 15-section editorial sequence (hero → Friday 001 → new tonight → shoppable film → what are you wearing → categories → *Where are you even going to wear that?* → zardozi after dark → bathroom selfies → HAQ girl → radio → Friday countdown → craft index).
- **Commerce**: PLP with filter drawer, sort, 2/3/4 view, shop-by-mood, editorial interruptions; PDP with gallery, View-the-Craft lens, size guide, low-stock / sold-out states, sticky mobile bar; bag drawer + `/cart`; wishlist; account (saved size); checkout handoff; search overlay.
- **Brand world**: Friday, drop pages, Craft Index + technique pages, HAQ Girls, Bathroom, Radio, Stories.
- **Platform**: product / breadcrumb / organisation JSON-LD, per-page metadata and canonicals, sitemap, robots, analytics event layer, Klaviyo-ready subscribe endpoint, 404 / error / loading states, reduced-motion, keyboard and screen-reader support.

Imagery is art-directed placeholder frames until photography lands. Each slot carries its shot direction (see `lib/data/*`).

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for IA, design tokens, content model and the Shopify / Sanity / Klaviyo integration plan.
