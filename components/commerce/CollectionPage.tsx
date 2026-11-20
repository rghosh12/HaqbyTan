import type { ProductQuery } from "@/lib/commerce";
import type { MediaAsset } from "@/lib/types";
import { CollectionView } from "./CollectionView";
import { GridImage, GridStatement, PageIntro } from "@/components/editorial/Statements";

const BREAK_IMAGE: MediaAsset = {
  kind: "flash",
  tone: "rani",
  alt: "Two friends in a taxi back seat at night, one in a zardozi top",
  direction: "Taxi back seat, 7:58 PM. Flash. Chunni half out of the window, phone glow, zardozi top.",
  stamp: "7:58 PM — CAB DOWNSTAIRS"
};

/** Shared PLP shell: editorial intro, then the controlled grid with interruptions. */
export function CollectionPage({ kicker, title, intro, base, listName }: { kicker: string; title: string; intro?: string; base: ProductQuery; listName: string }) {
  return (
    <>
      <PageIntro kicker={kicker} title={title}>
        {intro && <p>{intro}</p>}
      </PageIntro>
      <div className="page-x" style={{ paddingBottom: "var(--section-editorial)" }}>
        <CollectionView
          base={base}
          listName={listName}
          interruptions={[
            <GridImage key="img" image={BREAK_IMAGE} caption="Friday 001 — Your cab is downstairs." />,
            <GridStatement key="q" big="Overdressed?" small="Correct." />
          ]}
        />
      </div>
    </>
  );
}
