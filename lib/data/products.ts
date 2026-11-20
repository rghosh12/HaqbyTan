import type { MediaAsset, Product, Size, Variant } from "../types";

const stock = (pairs: [Size, number][]): Variant[] => pairs.map(([size, s]) => ({ size, stock: s }));

const shots = (
  name: string,
  tone: MediaAsset["tone"],
  set: { full: string; flash: string; macro: string; back?: string; styled?: string }
): MediaAsset[] => [
  { kind: "product", tone: "paper", alt: `${name}, front`, direction: set.full },
  { kind: "flash", tone, alt: `${name} under direct flash`, direction: set.flash, stamp: "7:43 PM" },
  { kind: "product", tone: "paper", alt: `${name}, back`, direction: set.back ?? "Back view, same light, arms relaxed." },
  { kind: "macro", tone: "wine", alt: `${name}, embroidery detail`, direction: set.macro },
  {
    kind: "editorial",
    tone: "ink",
    alt: `${name} styled for a night out`,
    direction: set.styled ?? "Styled on a friend's bed, jewellery scattered, cab light through the window."
  }
];

export const products: Product[] = [
  {
    slug: "zardozi-after-dark-top",
    title: "Zardozi After Dark Top",
    price: 248,
    category: "tops",
    nights: ["drinks", "dinner", "after-midnight"],
    moods: ["after-dark", "overdressed", "main-character"],
    drop: "not-ready-yet",
    craft: "zardozi",
    materials: ["Silk", "Metal thread"],
    colors: [
      { name: "Ink", hex: "#0a0a0a" },
      { name: "Rani", hex: "#e80075" },
      { name: "Ivory", hex: "#f5f1e8" }
    ],
    variants: stock([["XS", 4], ["S", 2], ["M", 6], ["L", 3], ["XL", 0]]),
    labels: ["FRIDAY DROP", "HANDCRAFTED"],
    short: "Hand zardozi on silk. Cropped, boned, unbothered.",
    look: "A cropped evening top that sits somewhere between a corset and an embroidered blouse. Wear it with denim. Wear it with the silk mini. Wear it to the thing you said was casual.",
    craftNote: "Hand-applied zardozi: metal-thread embroidery, couched onto silk by hand.",
    details: ["Silk shell, cotton lining", "Light internal boning", "Concealed side zip", "Cropped to the natural waist"],
    care: ["Dry clean only", "Store flat, embroidery side up", "Do not iron directly on metal thread"],
    fit: { notes: "Designed close to the body. If between sizes, size up.", stretch: "none", model: "Model is 5'8\" and wears S." },
    measurements: [
      { size: "XS", bust: 80, waist: 64, length: 36 },
      { size: "S", bust: 85, waist: 69, length: 37 },
      { size: "M", bust: 90, waist: 74, length: 38 },
      { size: "L", bust: 96, waist: 80, length: 39 },
      { size: "XL", bust: 102, waist: 86, length: 40 }
    ],
    images: shots("Zardozi After Dark Top", "rani", {
      full: "Full look against ivory wall. Top with washed black denim, silver hoops.",
      flash: "Direct flash in a hotel corridor. Mid-laugh, one strap slipping.",
      macro: "Extreme macro: metal thread couched over silk, slight tarnish catching light."
    }),
    complements: ["silver-drop-jhumkas", "tiny-gota-potli", "silk-mini-skirt"],
    createdAt: "2026-11-13"
  },
  {
    slug: "silk-mini-skirt",
    title: "Silk Mini Skirt",
    price: 165,
    category: "skirts",
    nights: ["drinks", "birthday", "after-midnight"],
    moods: ["after-dark", "main-character"],
    drop: "not-ready-yet",
    materials: ["Silk"],
    colors: [
      { name: "Rani", hex: "#e80075" },
      { name: "Ink", hex: "#0a0a0a" }
    ],
    variants: stock([["XS", 5], ["S", 7], ["M", 5], ["L", 4], ["XL", 2]]),
    labels: ["NEW"],
    short: "Bias-cut silk. Short enough.",
    look: "A bias-cut mini in heavy silk. It moves like it heard the song before you did.",
    details: ["100% silk", "Bias cut", "Invisible back zip", "Lined"],
    care: ["Dry clean", "Cool iron on reverse"],
    fit: { notes: "True to size. Sits on the high hip.", stretch: "low", model: "Model is 5'9\" and wears S." },
    images: shots("Silk Mini Skirt", "rani", {
      full: "Full look, walking out of frame, skirt mid-swing.",
      flash: "Flash in a lift, mirror wall, friend's arm in frame.",
      macro: "Silk fold catching pink light, weave visible."
    }),
    complements: ["zardozi-after-dark-top", "mukaish-mesh-top"],
    createdAt: "2026-11-13"
  },
  {
    slug: "mukaish-mesh-top",
    title: "Mukaish Mesh Top",
    price: 210,
    category: "tops",
    nights: ["drinks", "after-midnight", "birthday"],
    moods: ["after-dark", "overdressed"],
    drop: "not-ready-yet",
    craft: "mukaish",
    materials: ["Silk tulle", "Flattened metal wire"],
    colors: [
      { name: "Ink", hex: "#0a0a0a" },
      { name: "Silver", hex: "#b7b7b7" }
    ],
    variants: stock([["XS", 3], ["S", 1], ["M", 2], ["L", 0]]),
    labels: ["HANDCRAFTED", "LIMITED"],
    short: "Sheer tulle, hand-twisted metal. Glints under flash.",
    look: "A sheer long-sleeve layer worked with tiny points of metal. Over a bralette, under a blazer, on its own at 1 AM.",
    craftNote: "Mukaish: thin metal wire twisted through fabric by hand to make small raised points of shine.",
    details: ["Silk tulle", "Hand-worked mukaish", "Slim long sleeve", "Wear with a slip or bralette"],
    care: ["Hand wash cold, inside out", "Dry flat", "Do not wring"],
    fit: { notes: "Slim through the arm. Sheer.", stretch: "medium", model: "Model is 5'7\" and wears XS." },
    images: shots("Mukaish Mesh Top", "silver", {
      full: "Full look, mesh over black bralette, low-rise trousers.",
      flash: "Flash in a bathroom mirror, phone covering half the face.",
      macro: "Macro of mukaish points on black tulle, like stars on a cheap night sky."
    }),
    complements: ["silver-drop-jhumkas", "ink-drape-trousers"],
    createdAt: "2026-11-13"
  },
  {
    slug: "zardozi-denim-jacket",
    title: "Zardozi Denim Jacket",
    price: 320,
    category: "jackets",
    nights: ["dinner", "drinks", "vacation"],
    moods: ["main-character", "last-minute"],
    drop: "not-ready-yet",
    craft: "zardozi",
    materials: ["Cotton denim", "Metal thread"],
    colors: [{ name: "Washed Indigo", hex: "#33415c" }],
    variants: stock([["XS", 2], ["S", 4], ["M", 4], ["L", 3], ["XL", 1]]),
    labels: ["HANDCRAFTED"],
    short: "Washed denim. Hand zardozi across the back yoke.",
    look: "Your jacket for the cab, the bar and the walk home. The back is where it happens.",
    craftNote: "Zardozi worked across the back yoke and cuffs onto washed denim.",
    details: ["12 oz cotton denim", "Hand zardozi yoke", "Silver-tone shank buttons", "Boxy, slightly cropped"],
    care: ["Dry clean", "Spot clean denim away from embroidery"],
    fit: { notes: "Relaxed. Take your usual size.", stretch: "none", model: "Model is 5'8\" and wears S." },
    images: shots("Zardozi Denim Jacket", "cobalt", {
      full: "Back view, jacket off one shoulder, city street at night.",
      flash: "Flash getting into a taxi, back yoke catching the light.",
      macro: "Metal thread over denim twill — the collision, in macro."
    }),
    complements: ["silk-mini-skirt", "tiny-gota-potli"],
    createdAt: "2026-11-06"
  },
  {
    slug: "gota-slip-dress",
    title: "Gota Slip Dress",
    price: 295,
    category: "dresses",
    nights: ["dinner", "birthday", "vacation"],
    moods: ["overdressed", "dinner", "vacation"],
    drop: "not-ready-yet",
    craft: "gota",
    materials: ["Silk satin", "Metallic ribbon"],
    colors: [
      { name: "Haldi", hex: "#e5a600" },
      { name: "Wine", hex: "#54151f" }
    ],
    variants: stock([["XS", 0], ["S", 0], ["M", 0], ["L", 0]]),
    labels: ["HANDCRAFTED"],
    short: "Satin slip. Gota at the hem, so it catches when you walk.",
    look: "A bias slip with a gota-worked hem. Dinner, then the place after dinner.",
    craftNote: "Gota: metallic ribbon appliquéd by hand along the hem.",
    details: ["Silk satin", "Adjustable straps", "Hand-applied gota hem", "Midi length"],
    care: ["Dry clean only"],
    fit: { notes: "Skims the body. Size down if between sizes.", stretch: "none", model: "Model is 5'9\" and wears S." },
    images: shots("Gota Slip Dress", "haldi", {
      full: "Full look on a rooftop, wind in the hem.",
      flash: "Flash at a restaurant table, half-eaten dessert.",
      macro: "Gota ribbon edge on satin, folded light."
    }),
    complements: ["silver-drop-jhumkas", "tiny-gota-potli"],
    createdAt: "2026-11-06"
  },
  {
    slug: "chikankari-shirt-dress",
    title: "Chikankari Shirt Dress",
    price: 230,
    category: "dresses",
    nights: ["dinner", "vacation"],
    moods: ["vacation", "dinner", "last-minute"],
    drop: "one-more-drink",
    craft: "chikankari",
    materials: ["Cotton voile"],
    colors: [
      { name: "Ivory", hex: "#f5f1e8" },
      { name: "Ink", hex: "#0a0a0a" }
    ],
    variants: stock([["XS", 4], ["S", 6], ["M", 6], ["L", 5], ["XL", 3]]),
    labels: ["NEW", "HANDCRAFTED"],
    short: "Hand chikankari on voile. Belt it, or don't.",
    look: "An oversized shirt-dress you can wear as a dress, a jacket, or a cover-up in a hotel lift.",
    craftNote: "Chikankari: white-on-white hand embroidery with fine shadow and knot stitches.",
    details: ["Cotton voile", "Hand chikankari", "Mother-of-pearl buttons", "Removable belt"],
    care: ["Hand wash cold", "Line dry in shade", "Warm iron on reverse"],
    fit: { notes: "Oversized. Size down for a closer fit.", stretch: "none", model: "Model is 5'7\" and wears S." },
    images: shots("Chikankari Shirt Dress", "paper", {
      full: "Full look, barefoot in an apartment kitchen after the party.",
      flash: "Flash on a balcony, shirt-dress open over swimwear.",
      macro: "Shadow-work stitches seen through voile against window light."
    }),
    complements: ["tiny-gota-potli"],
    createdAt: "2026-11-15"
  },
  {
    slug: "ink-drape-trousers",
    title: "Ink Drape Trousers",
    price: 185,
    category: "trousers",
    nights: ["dinner", "drinks"],
    moods: ["dinner", "last-minute"],
    drop: "not-ready-yet",
    materials: ["Viscose crepe"],
    colors: [{ name: "Ink", hex: "#0a0a0a" }],
    variants: stock([["XS", 5], ["S", 5], ["M", 6], ["L", 4], ["XL", 3]]),
    labels: [],
    short: "A dhoti-drape front on a straight trouser.",
    look: "Draped at the front like a dhoti, cut straight like a trouser. Works under anything embroidered.",
    details: ["Viscose crepe", "Wrapped drape front", "Side zip", "Full length"],
    care: ["Dry clean", "Steam to refresh"],
    fit: { notes: "High waist, relaxed leg.", stretch: "low", model: "Model is 5'8\" and wears S." },
    images: shots("Ink Drape Trousers", "ink", {
      full: "Full look mid-stride on a zebra crossing at night.",
      flash: "Flash at a bar counter, drape folding over a stool.",
      macro: "Crepe drape folds in raking light."
    }),
    complements: ["mukaish-mesh-top", "zardozi-after-dark-top"],
    createdAt: "2026-11-13"
  },
  {
    slug: "mirror-bandeau-set",
    title: "Mirror Bandeau Set",
    price: 275,
    category: "sets",
    nights: ["birthday", "vacation", "after-midnight"],
    moods: ["main-character", "vacation", "overdressed"],
    drop: "one-more-drink",
    craft: "mirror-work",
    materials: ["Cotton", "Glass mirrors"],
    colors: [
      { name: "Cobalt", hex: "#173ed1" },
      { name: "Ink", hex: "#0a0a0a" }
    ],
    variants: stock([["XS", 2], ["S", 3], ["M", 1], ["L", 2]]),
    labels: ["NEW", "HANDCRAFTED"],
    short: "Bandeau and low skirt, hand-set mirrors.",
    look: "A two-piece for the birthday you didn't plan. Every mirror is its own flash.",
    craftNote: "Mirror work: small glass mirrors held in place by hand with a surrounding stitch.",
    details: ["Cotton base", "Hand-set mirrors", "Bandeau with internal grip", "Low-rise midi skirt"],
    care: ["Dry clean only", "Store separately to protect mirrors"],
    fit: { notes: "Bandeau runs small. Size up if between sizes.", stretch: "low", model: "Model is 5'8\" and wears S." },
    images: shots("Mirror Bandeau Set", "cobalt", {
      full: "Full look by a hotel pool at night, blue light on skin.",
      flash: "Flash in a club bathroom, mirrors throwing back the flash.",
      macro: "A single mirror surrounded by stitch, reflecting a phone camera."
    }),
    complements: ["silver-drop-jhumkas", "tiny-gota-potli"],
    createdAt: "2026-11-15"
  },
  {
    slug: "beaded-corset",
    title: "Beaded Corset",
    price: 340,
    category: "tops",
    nights: ["birthday", "after-midnight", "drinks"],
    moods: ["overdressed", "main-character", "after-dark"],
    drop: "not-ready-yet",
    materials: ["Silk", "Glass beads"],
    colors: [
      { name: "Sindoor", hex: "#e43820" },
      { name: "Ink", hex: "#0a0a0a" }
    ],
    variants: stock([["XS", 1], ["S", 2], ["M", 2], ["L", 1]]),
    labels: ["LIMITED", "HANDCRAFTED"],
    short: "Hand-beaded silk corset. Heavy in the best way.",
    look: "A boned corset worked edge to edge in glass beads. Your friend said casual. Ignore her.",
    craftNote: "Hand beading on silk. Each panel is beaded before the corset is constructed.",
    details: ["Silk shell", "Glass bead embroidery", "Spiral steel boning", "Back lacing"],
    care: ["Specialist dry clean", "Store flat in the dust bag"],
    fit: { notes: "Structured. Adjust with back lacing.", stretch: "none", model: "Model is 5'8\" and wears S." },
    images: shots("Beaded Corset", "sindoor", {
      full: "Full look with low jeans, sitting on a bathroom counter.",
      flash: "Flash at a birthday table, candle smoke, beads mid-glint.",
      macro: "Beads in rows, thread visible between them."
    }),
    complements: ["silver-drop-jhumkas", "ink-drape-trousers"],
    createdAt: "2026-11-13"
  },
  {
    slug: "tiny-gota-potli",
    title: "Tiny Gota Potli",
    price: 95,
    category: "bags",
    nights: ["dinner", "drinks", "birthday", "vacation", "after-midnight"],
    moods: ["after-dark", "last-minute"],
    drop: "not-ready-yet",
    craft: "gota",
    materials: ["Silk", "Metallic ribbon", "Silver-tone chain"],
    colors: [
      { name: "Rani", hex: "#e80075" },
      { name: "Ink", hex: "#0a0a0a" },
      { name: "Haldi", hex: "#e5a600" }
    ],
    variants: stock([["OS", 12]]),
    labels: ["FRIDAY DROP"],
    short: "Fits a lipstick, a card and maybe your keys.",
    look: "A drawstring potli, shrunk to the size of a bad decision. Wrist strap or chain.",
    craftNote: "Gota ribbon work applied by hand around the base.",
    details: ["Silk body", "Gota-worked base", "Detachable chain", "16 × 12 cm"],
    care: ["Spot clean only"],
    fit: { notes: "One size.", stretch: "none", model: "Fits a phone if your phone is small." },
    images: shots("Tiny Gota Potli", "rani", {
      full: "Product on a marble basin beside a lipstick and a cab receipt.",
      flash: "Flash, potli swinging from a wrist on a dance floor.",
      macro: "Gota ribbon crimp in macro."
    }),
    complements: ["silver-drop-jhumkas"],
    createdAt: "2026-11-13"
  },
  {
    slug: "silver-drop-jhumkas",
    title: "Silver Drop Jhumkas",
    price: 120,
    category: "jewellery",
    nights: ["dinner", "drinks", "birthday", "vacation", "after-midnight"],
    moods: ["after-dark", "overdressed", "last-minute"],
    drop: "not-ready-yet",
    materials: ["Oxidised silver-plated brass"],
    colors: [{ name: "Oxidised Silver", hex: "#8c8c8c" }],
    variants: stock([["OS", 2]]),
    labels: ["NEW"],
    short: "Oxidised silver jhumkas, long enough to notice.",
    look: "Wear the earrings. That's the whole note.",
    details: ["Silver-plated brass", "Hook fastening", "Drop: 7 cm", "Weight: 9 g each"],
    care: ["Keep dry", "Store in the pouch to slow tarnish"],
    fit: { notes: "One size.", stretch: "none", model: "Shown with a slicked bun." },
    images: shots("Silver Drop Jhumkas", "silver", {
      full: "On a bathroom counter between perfume and a hair tie.",
      flash: "Flash, side profile, earring mid-swing.",
      macro: "Oxidised silver dome, granulation detail."
    }),
    complements: ["tiny-gota-potli"],
    createdAt: "2026-11-15"
  },
  {
    slug: "bandhani-silk-scarf",
    title: "Bandhani Silk Drape",
    price: 110,
    category: "drapes",
    nights: ["dinner", "vacation"],
    moods: ["vacation", "dinner"],
    drop: "one-more-drink",
    craft: "bandhani",
    materials: ["Silk georgette"],
    colors: [
      { name: "Sindoor", hex: "#e43820" },
      { name: "Plum", hex: "#40204f" }
    ],
    variants: stock([["OS", 9]]),
    labels: ["HANDCRAFTED"],
    short: "Hand-tied bandhani. Neck, waist, hair, taxi window.",
    look: "A long silk drape, tie-dyed by hand. Wear it any way that occurs to you at 7:43.",
    craftNote: "Bandhani: fabric pinched and bound by hand into tiny knots before dyeing.",
    details: ["Silk georgette", "Hand-tied bandhani", "180 × 70 cm", "Hand-rolled edges"],
    care: ["Dry clean", "Do not soak"],
    fit: { notes: "One size.", stretch: "none", model: "Worn as a halter." },
    images: shots("Bandhani Silk Drape", "sindoor", {
      full: "Tied as a halter over a white tank, Goa night market.",
      flash: "Flash, drape flying out of a taxi window.",
      macro: "Bandhani dots — the tiny undyed rings left by each knot."
    }),
    complements: ["chikankari-shirt-dress"],
    createdAt: "2026-11-15"
  }
];
