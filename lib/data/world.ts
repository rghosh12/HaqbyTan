import type { BathroomSelfie, Craft, Drop, HaqGirl, Playlist, Story } from "../types";

/* ---------------------------------------------------------------- DROPS */

export const drops: Drop[] = [
  {
    slug: "not-ready-yet",
    number: "001",
    title: "Not Ready Yet",
    accent: "rani",
    date: "2026-11-13T19:43:00+05:30",
    status: "live",
    lines: ["Six outfits on the floor.", "One cab downstairs.", "Three missed calls.", "Still choosing earrings."],
    timeline: [
      { time: "7:18 PM", line: "First outfit." },
      { time: "7:31 PM", line: "Second outfit." },
      { time: "7:43 PM", line: "Still not ready." },
      { time: "7:58 PM", line: "Cab downstairs." },
      { time: "8:02 PM", line: "Wrong earrings." },
      { time: "8:07 PM", line: "Leaving." }
    ],
    hero: {
      kind: "flash",
      tone: "rani",
      alt: "A woman in an embroidered black top laughs at a mirror while a friend fixes her earring",
      direction: "Bedroom, 7:43 PM. Direct flash. She's mid-laugh at the mirror, friend behind her fixing an earring. Rejected outfits on the bed. Zardozi top, washed denim.",
      stamp: "FRI 7:43 PM"
    },
    gallery: [
      {
        kind: "editorial",
        tone: "ink",
        alt: "Outfits piled on a bed beside an open jewellery box",
        direction: "Overhead: six outfits on the bed, open jewellery box, curling iron still plugged in.",
        stamp: "7:18 PM"
      },
      {
        kind: "candid",
        tone: "rani",
        alt: "Two friends sharing a mirror, one doing eyeliner",
        direction: "Two friends sharing one mirror. Eyeliner. Music too loud — you can tell.",
        stamp: "7:31 PM"
      },
      {
        kind: "flash",
        tone: "silver",
        alt: "Hand choosing between two pairs of silver earrings",
        direction: "Macro, flash: a hand hovering between two pairs of silver jhumkas.",
        stamp: "8:02 PM"
      }
    ],
    playlist: "getting-ready"
  },
  {
    slug: "one-more-drink",
    number: "002",
    title: "One More Drink",
    accent: "cobalt",
    date: "2026-11-20T19:43:00+05:30",
    status: "upcoming",
    lines: ["You said one.", "It's been three.", "The bar is still open.", "So is the rooftop."],
    hero: {
      kind: "editorial",
      tone: "cobalt",
      alt: "Two women on a rooftop bar at night, mirror-work set catching blue light",
      direction: "Rooftop bar, blue hour into night. Mirror-work set. Two friends, one turned away, city lights soft.",
      stamp: "FRI 11:12 PM"
    },
    gallery: [],
    playlist: "one-more-drink"
  }
];

/* ---------------------------------------------------------------- CRAFT INDEX
   Only techniques HAQ actually uses. Makers stay null until verified. */

export const crafts: Craft[] = [
  {
    slug: "zardozi",
    name: "Zardozi",
    term: "zardozi / zar-dozi",
    regions: ["Lucknow", "Agra", "Bareilly", "Delhi"],
    oneLine: "Metal-thread embroidery. Centuries old. Zero weddings required.",
    history: [
      "The name is usually traced to Persian: zar (gold) and dozi (sewing). The technique flourished in Mughal court dress and furnishings.",
      "Today it is practised across several North Indian centres, with Lucknow, Bareilly and Agra among the best known. It is still most often seen on bridal and ceremonial clothing — which is exactly why we like it on a cropped top."
    ],
    materials: ["Metallic thread (zari)", "Coiled wire (dabka, nakshi)", "Sequins (sitara)", "Silk or velvet base"],
    process: [
      "The design is traced and transferred onto fabric stretched on a wooden frame (adda).",
      "Metal threads and coils are laid on the surface and couched down by hand with a needle or hook.",
      "Dense motifs can take several days per panel."
    ],
    makers: null,
    images: [
      { kind: "macro", tone: "wine", alt: "Zardozi metal thread on silk", direction: "Extreme macro: dabka coils couched onto black silk. Slight tarnish." },
      { kind: "editorial", tone: "ink", alt: "Hands working on an embroidery frame", direction: "Hands at an adda frame. Natural window light. No posed smiles." }
    ]
  },
  {
    slug: "mukaish",
    name: "Mukaish",
    term: "mukaish / mukesh / badla",
    regions: ["Lucknow"],
    oneLine: "Flattened metal wire, twisted by hand into tiny points of light.",
    history: [
      "Mukaish (also mukesh or badla) uses thin flattened metal wire worked through fabric and twisted to lock it in place.",
      "It is closely associated with Lucknow, where it often appears alongside chikankari."
    ],
    materials: ["Flattened metal wire (badla)", "Fine fabric — tulle, georgette, voile"],
    process: [
      "A strip of wire is threaded through the fabric with a needle eye cut into the wire itself or a fine needle.",
      "It is twisted by hand on the surface, forming a small raised dot or line that won't slip."
    ],
    makers: null,
    images: [
      { kind: "macro", tone: "ink", alt: "Mukaish dots on black tulle", direction: "Macro: mukaish points on black tulle under single flash." }
    ]
  },
  {
    slug: "gota",
    name: "Gota",
    term: "gota patti",
    regions: ["Rajasthan"],
    oneLine: "Metallic ribbon, cut and appliquéd by hand.",
    history: [
      "Gota is a woven metallic ribbon; gota patti is the technique of cutting it into shapes and appliquéing it.",
      "It is most strongly associated with Rajasthan, especially Jaipur and the surrounding region."
    ],
    materials: ["Woven metallic ribbon", "Silk, georgette or satin base"],
    process: ["Ribbon is folded, cut or crimped into motifs.", "Pieces are hemmed onto the base fabric by hand."],
    makers: null,
    images: [{ kind: "macro", tone: "haldi", alt: "Gota ribbon edge", direction: "Macro: crimped gota ribbon on haldi satin." }]
  },
  {
    slug: "chikankari",
    name: "Chikankari",
    term: "chikan / chikankari",
    regions: ["Lucknow"],
    oneLine: "White-on-white hand embroidery, mostly shadow and knot.",
    history: [
      "Chikankari is a hand-embroidery tradition centred on Lucknow, traditionally white thread on fine white cotton.",
      "Its origins are often linked to the Mughal period, though accounts vary — the clearer record is its long, continuous practice in and around Lucknow."
    ],
    nuance: "Origin stories for chikankari differ. We'd rather say that than pick the most romantic one.",
    materials: ["Cotton voile or mulmul", "Cotton or silk thread"],
    process: [
      "Designs are block-printed onto cloth in a washable ink.",
      "Embroiderers work stitches such as bakhiya (shadow work) and phanda (knots) by hand.",
      "The piece is washed to remove the print, leaving only the stitch."
    ],
    makers: null,
    images: [{ kind: "macro", tone: "paper", alt: "Chikankari shadow work on voile", direction: "Macro: shadow stitch seen through voile against window light." }]
  },
  {
    slug: "mirror-work",
    name: "Mirror Work",
    term: "shisha / abhla bharat",
    regions: ["Gujarat (Kutch)", "Rajasthan", "Sindh"],
    oneLine: "Small mirrors, held in by thread. Built-in flash.",
    history: [
      "Mirror work sets small pieces of mirror or glass into embroidery using a surrounding stitch.",
      "It belongs to many communities across Kutch, Rajasthan and Sindh, each with distinct stitches and motifs — there isn't one single origin."
    ],
    nuance: "Many communities practise mirror work with distinct styles. We name the specific tradition on each piece once confirmed with the workshop.",
    materials: ["Small glass mirrors", "Cotton or silk thread", "Cotton base"],
    process: ["A framework of stitches is built across the mirror.", "A decorative buttonhole-type stitch locks it in place around the edge."],
    makers: null,
    images: [{ kind: "macro", tone: "cobalt", alt: "Mirror held by stitch", direction: "Macro: one mirror reflecting a phone camera flash." }]
  },
  {
    slug: "bandhani",
    name: "Bandhani",
    term: "bandhani / bandhej",
    regions: ["Gujarat", "Rajasthan"],
    oneLine: "Thousands of tiny knots, tied by hand before dyeing.",
    history: [
      "Bandhani is a resist-dye technique: cloth is pinched and tightly bound in tiny points, then dyed. The bound points stay undyed.",
      "It is practised widely across Gujarat and Rajasthan."
    ],
    materials: ["Silk or cotton", "Thread for binding", "Dye"],
    process: ["Points are pinched and bound by hand.", "The cloth is dyed, sometimes in several stages.", "Knots are opened to reveal the pattern."],
    makers: null,
    images: [{ kind: "macro", tone: "sindoor", alt: "Bandhani dots on red silk", direction: "Macro: bandhani dots on sindoor silk, crinkled texture still visible." }]
  }
];

/* ---------------------------------------------------------------- HAQ GIRLS */

export const girls: HaqGirl[] = [
  {
    slug: "nina",
    number: "014",
    name: "Nina",
    city: "London",
    time: "8:06 PM",
    order: "Martini → dinner → somewhere she wasn't originally invited.",
    quote: "I wasn't invited. I was dressed for it though.",
    portrait: {
      kind: "flash",
      tone: "rani",
      alt: "Nina in a zardozi top on a Soho street at night",
      direction: "Soho street, flash, mid-turn. Zardozi top, silk mini, silver drops.",
      stamp: "8:06 PM"
    },
    look: ["zardozi-after-dark-top", "silk-mini-skirt", "silver-drop-jhumkas"]
  },
  {
    slug: "anika",
    number: "015",
    name: "Anika",
    city: "New York",
    time: "8:14 PM",
    order: "Friend's birthday → karaoke → diner.",
    quote: "It's not overdressed if you dance in it.",
    portrait: {
      kind: "editorial",
      tone: "sindoor",
      alt: "Anika in a beaded corset in a diner booth",
      direction: "Diner booth, fluorescent light, beaded corset, low jeans, fries.",
      stamp: "8:14 PM"
    },
    look: ["beaded-corset", "ink-drape-trousers", "tiny-gota-potli"]
  },
  {
    slug: "meher",
    number: "016",
    name: "Meher",
    city: "Delhi",
    time: "9:02 PM",
    order: "House party → rooftop → wherever the car goes.",
    quote: "Casual only? Sure.",
    portrait: {
      kind: "candid",
      tone: "silver",
      alt: "Meher in a mukaish mesh top on a rooftop in Delhi",
      direction: "Delhi rooftop, string lights, mukaish mesh catching flash, friend's hand in frame.",
      stamp: "9:02 PM"
    },
    look: ["mukaish-mesh-top", "ink-drape-trousers", "silver-drop-jhumkas"]
  },
  {
    slug: "zoya",
    number: "017",
    name: "Zoya",
    city: "Mumbai",
    time: "10:37 PM",
    order: "Sea face → one more drink → one more drink.",
    quote: "I packed the potli. It fits nothing. Perfect.",
    portrait: {
      kind: "editorial",
      tone: "cobalt",
      alt: "Zoya in a mirror-work set on Marine Drive",
      direction: "Marine Drive at night, wind, mirror-work set, cobalt light.",
      stamp: "10:37 PM"
    },
    look: ["mirror-bandeau-set", "tiny-gota-potli", "silver-drop-jhumkas"]
  }
];

/* ---------------------------------------------------------------- BATHROOM */

export const bathroom: BathroomSelfie[] = [
  {
    id: "b1",
    caption: "The lighting was better in here.",
    where: "Hotel bathroom, Bandra",
    time: "11:48 PM",
    span: "hero",
    image: {
      kind: "flash",
      tone: "rani",
      alt: "Mirror selfie in a green-tiled hotel bathroom, zardozi top",
      direction: "Green-tiled hotel bathroom, mirror selfie with flash, zardozi top, potli on basin.",
      stamp: "11:48 PM"
    },
    look: ["zardozi-after-dark-top", "tiny-gota-potli"]
  },
  {
    id: "b2",
    caption: "Lipstick check.",
    where: "Restaurant, Lodhi Colony",
    time: "9:21 PM",
    span: "tall",
    image: {
      kind: "flash",
      tone: "sindoor",
      alt: "Close mirror shot reapplying red lipstick, beaded corset",
      direction: "Old restaurant bathroom, brass taps, red lipstick, beaded corset strap.",
      stamp: "9:21 PM"
    },
    look: ["beaded-corset"]
  },
  {
    id: "b3",
    caption: "Two girls, one mirror.",
    where: "Club, Shoreditch",
    time: "1:04 AM",
    span: "wide",
    image: {
      kind: "flash",
      tone: "cobalt",
      alt: "Two friends sharing a club bathroom mirror, mirror-work set",
      direction: "Chrome and black tile, two friends in one mirror, mirror-work set doubling the flash.",
      stamp: "1:04 AM"
    },
    look: ["mirror-bandeau-set", "silver-drop-jhumkas"]
  },
  {
    id: "b4",
    caption: "Earrings: correct.",
    where: "Apartment, Brooklyn",
    time: "7:43 PM",
    span: "small",
    image: {
      kind: "macro",
      tone: "silver",
      alt: "Silver jhumka on a marble counter beside perfume",
      direction: "Marble counter: jhumka, perfume, a hairpin, a cab receipt.",
      stamp: "7:43 PM"
    },
    look: ["silver-drop-jhumkas"]
  }
];

/* ---------------------------------------------------------------- RADIO
   Track lists are editorial placeholders until playlists are published. */

export const playlists: Playlist[] = [
  {
    slug: "getting-ready",
    title: "Getting Ready",
    mood: "Friday, 7:43 PM. Music slightly too loud.",
    tracks: [
      { title: "Track list coming Friday", artist: "HAQ Radio" }
    ]
  },
  { slug: "cab-ride", title: "Cab Ride", mood: "Window down. Driver's choice, then yours.", tracks: [{ title: "Track list coming Friday", artist: "HAQ Radio" }] },
  { slug: "one-more-drink", title: "One More Drink", mood: "You said one.", tracks: [{ title: "Track list coming Friday", artist: "HAQ Radio" }] },
  { slug: "2000s-bollywood", title: "2000s Bollywood", mood: "Everyone somehow knows every word.", tracks: [{ title: "Track list coming Friday", artist: "HAQ Radio" }] },
  { slug: "after-midnight", title: "After Midnight", mood: "Shoes in hand.", tracks: [{ title: "Track list coming Friday", artist: "HAQ Radio" }] }
];

/* ---------------------------------------------------------------- STORIES */

export const stories: Story[] = [
  {
    slug: "casual-only-okay",
    title: "“Casual only, okay?”",
    category: "notes",
    date: "2026-11-14",
    dek: "A short field guide to ignoring your friend's dress code.",
    image: { kind: "flash", tone: "sindoor", alt: "Beaded corset at a casual dinner", direction: "Pizza place, flash, beaded corset. Everyone else in hoodies." },
    products: ["beaded-corset"]
  },
  {
    slug: "zardozi-after-dark",
    title: "Zardozi After Dark",
    category: "craft",
    date: "2026-11-12",
    dek: "Metal thread was made for candlelight. It turns out it also loves a phone flash.",
    image: { kind: "macro", tone: "wine", alt: "Zardozi under flash", direction: "Zardozi macro under hard flash, black background." },
    products: ["zardozi-after-dark-top", "zardozi-denim-jacket"]
  },
  {
    slug: "city-nights-mumbai",
    title: "City Nights: Mumbai",
    category: "city-nights",
    date: "2026-11-07",
    dek: "Where to go when the plan was 'one drink'.",
    image: { kind: "editorial", tone: "cobalt", alt: "Mumbai sea face at night", direction: "Sea face at night, cab tail-lights, wind." },
    products: ["mirror-bandeau-set"]
  }
];
