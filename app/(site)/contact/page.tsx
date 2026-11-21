import type { Metadata } from "next";
import { InfoPage } from "@/components/editorial/InfoPage";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <InfoPage
      kicker="Customer care"
      title="Talk to us."
      sections={[
        { heading: "Orders, sizing, styling", body: <p>Write to care@haq.example. A real person answers within one business day — faster on Fridays.</p> },
        { heading: "Press & collaborations", body: <p>press@haq.example</p> },
        { heading: "Makers & workshops", body: <p>If you practise a craft and want to work with us, write to makers@haq.example. We credit every workshop we work with.</p> }
      ]}
    />
  );
}
