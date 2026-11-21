import Link from "next/link";
import { getNewArrivals, getProductsBySlugs, queryProducts } from "@/lib/commerce";
import { getBathroom, getCraft, getCrafts, getGirls, getLiveDrop, getPlaylists, getUpcomingDrop } from "@/lib/content";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Media } from "@/components/ui/Media";
import { HeroCampaign } from "@/components/editorial/HeroCampaign";
import { DropIntro } from "@/components/editorial/DropIntro";
import { ShopTheLook } from "@/components/editorial/ShopTheLook";
import { WearingTonight } from "@/components/editorial/WearingTonight";
import { WhereWear } from "@/components/editorial/WhereWear";
import { CraftFeature } from "@/components/editorial/CraftFeature";
import { EditorialQuote, Marquee } from "@/components/editorial/Statements";
import { BathroomGallery } from "@/components/editorial/BathroomGallery";
import { HaqGirlFeature } from "@/components/editorial/HaqGirlFeature";
import { Radio } from "@/components/editorial/Radio";
import { FridayModule } from "@/components/editorial/FridayModule";
import { CraftIndexPreview } from "@/components/editorial/CraftIndexPreview";
import e from "@/components/editorial/Editorial.module.css";

/**
 * Rhythm: immersion → commerce → story → commerce → culture → commerce.
 * Never two product grids back to back.
 */
export default function Home() {
  const drop = getLiveDrop();
  const next = getUpcomingDrop();
  const girls = getGirls();
  const zardozi = getCraft("zardozi")!;
  const trio = [
    { href: "/shop/tops", label: "Tops", note: "Start here.", p: getProductsBySlugs(["beaded-corset"])[0]! },
    { href: "/shop/dresses", label: "Dresses", note: "Dinner, then wherever.", p: getProductsBySlugs(["chikankari-shirt-dress"])[0]! },
    { href: "/shop/sets", label: "Sets", note: "One decision, done.", p: getProductsBySlugs(["mirror-bandeau-set"])[0]! }
  ];

  return (
    <>
      {/* 01 */}
      <HeroCampaign drop={drop} />

      {/* 02 */}
      <DropIntro drop={drop} />

      {/* 03 — commerce */}
      <section className="section-commerce page-x" aria-labelledby="new-tonight">
        <div className="section-head">
          <h2 id="new-tonight" className="meta">
            New tonight
          </h2>
          <Link href="/new" className="link">
            All new →
          </Link>
        </div>
        <ProductGrid products={getNewArrivals(4)} columns={4} list="home-new" />
      </section>

      {/* 04 — campaign break, shoppable */}
      <ShopTheLook
        image={{
          kind: "editorial",
          tone: "ink",
          alt: "Three friends leaving an apartment building at night, one in a zardozi denim jacket",
          direction: "Fashion film still: three friends spilling out of a building lobby at 8:07 PM. Chrome lift doors, cab headlights. Zardozi denim jacket, silk mini, potli.",
          stamp: "FRI 8:07 PM — LEAVING"
        }}
        products={getProductsBySlugs(["zardozi-denim-jacket", "silk-mini-skirt", "tiny-gota-potli"])}
        markers={[
          { x: 22, y: 38 },
          { x: 46, y: 62 },
          { x: 70, y: 54 }
        ]}
        caption="Friday 001 — 8:07 PM. Leaving."
      />

      {/* 05 — identity */}
      <WearingTonight girls={girls} />

      {/* 06 — commerce */}
      <section className={e.trio} aria-label="Shop by category">
        {trio.map((t) => (
          <Link key={t.href} href={t.href} className={e.trioItem}>
            <Media asset={t.p.images[4] ?? t.p.images[0]!} ratio="3 / 4" showDirection={false} sizes="(max-width: 860px) 50vw, 33vw" />
            <span className={`display ${e.trioLabel}`}>{t.label}</span>
            <span className="display-italic muted">{t.note}</span>
          </Link>
        ))}
      </section>

      {/* 07 — signature moment */}
      <WhereWear />

      {/* 08–10 — craft into commerce */}
      <CraftFeature
        craft={zardozi}
        title="Zardozi after dark."
        lines={["Centuries-old embroidery.", "Zero weddings required."]}
        products={queryProducts({ craft: "zardozi" }).concat(getProductsBySlugs(["mukaish-mesh-top"])).slice(0, 3)}
      />

      <EditorialQuote
        quote="Casual only, okay?"
        answer="Sure."
        href="/product/beaded-corset"
        image={{
          kind: "flash",
          tone: "sindoor",
          alt: "A hand-beaded sindoor corset at a casual pizza dinner",
          direction: "Pizza place, fluorescent light, direct flash. Everyone else in hoodies. Her: the beaded corset.",
          stamp: "7:59 PM"
        }}
      />

      {/* 11 */}
      <BathroomGallery items={getBathroom()} />

      {/* 12 */}
      <HaqGirlFeature girl={girls[0]!} />

      {/* 13 */}
      <Radio playlists={getPlaylists()} />

      {/* 14 */}
      {next && <FridayModule next={next} />}

      {/* Craft index preview */}
      <CraftIndexPreview crafts={getCrafts()} />

      <Marquee text="It's Friday · What are you wearing?" />
    </>
  );
}
