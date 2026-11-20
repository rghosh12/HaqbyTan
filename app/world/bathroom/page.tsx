import type { Metadata } from "next";
import { getBathroom } from "@/lib/content";
import { BathroomGallery } from "@/components/editorial/BathroomGallery";
import { PageIntro } from "@/components/editorial/Statements";

export const metadata: Metadata = { title: "The Bathroom", description: "HAQ bathroom selfies. The lighting was better in here.", alternates: { canonical: "/world/bathroom" } };

export default function BathroomPage() {
  return (
    <>
      <PageIntro kicker="The Bathroom" title="The lighting was better in here.">
        <p>Hotel tiles, restaurant mirrors, chrome taps, someone else&apos;s lipstick. Tap a frame to shop the look.</p>
      </PageIntro>
      <BathroomGallery items={getBathroom()} heading={false} />
    </>
  );
}
