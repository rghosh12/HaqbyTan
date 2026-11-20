import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { StoreProvider } from "@/components/store/StoreProvider";
import { Header } from "@/components/shell/Header";
import { MobileMenu } from "@/components/shell/MobileMenu";
import { SearchOverlay } from "@/components/shell/SearchOverlay";
import { CartDrawer } from "@/components/shell/CartDrawer";
import { Footer } from "@/components/shell/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/format";
import "./globals.css";

const display = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], variable: "--ff-display", display: "swap" });
const ui = Inter_Tight({ subsets: ["latin"], variable: "--ff-ui", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--ff-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "HAQ — Indian After Dark", template: "%s — HAQ" },
  description: "You don't need an occasion to wear Indian. It's Friday. What are we wearing?",
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" }
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  slogan: "You don't need an occasion.",
  sameAs: ["https://instagram.com", "https://tiktok.com"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${ui.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <StoreProvider>
          <Header />
          <MobileMenu />
          <SearchOverlay />
          <CartDrawer />
          <main id="main" style={{ paddingTop: "var(--header-h)" }}>
            {children}
          </main>
          <Footer />
        </StoreProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </body>
    </html>
  );
}
