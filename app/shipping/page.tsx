import type { Metadata } from "next";
import { InfoPage } from "@/components/editorial/InfoPage";

export const metadata: Metadata = { title: "Shipping & Size Guide", alternates: { canonical: "/shipping" } };

export default function ShippingPage() {
  return (
    <InfoPage
      kicker="Help"
      title="Shipping."
      sections={[
        { heading: "Where we ship", body: <p>India, the US, the UK and most of Europe. Duties and taxes are shown before you pay — no surprises at the door.</p> },
        { heading: "How long", body: <p>Most pieces ship in 1–2 business days. Express delivery takes 3–6 business days. Handcrafted made-to-order pieces show their own dispatch date on the product page.</p> },
        { heading: "Cost", body: <p>Free express shipping on orders over $250. Below that, the rate is calculated at checkout.</p> },
        {
          id: "size-guide",
          heading: "Size guide",
          body: (
            <>
              <p>Every product page lists garment measurements, fit notes, stretch, and the model&apos;s height and size.</p>
              <p>General rule: corsets and boned tops run close to the body — if you&apos;re between sizes, size up. Bias-cut silk runs true to size.</p>
              <p>Not sure? Write to us with your usual size and we&apos;ll measure the piece for you.</p>
            </>
          )
        }
      ]}
    />
  );
}
