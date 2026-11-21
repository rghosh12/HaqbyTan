import { StoreProvider } from "@/components/store/StoreProvider";
import { Header } from "@/components/shell/Header";
import { MobileMenu } from "@/components/shell/MobileMenu";
import { SearchOverlay } from "@/components/shell/SearchOverlay";
import { CartDrawer } from "@/components/shell/CartDrawer";
import { Footer } from "@/components/shell/Footer";

/** Full store chrome. Every route in this group is gated by middleware.ts while LAUNCH_MODE is "coming-soon". */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <main id="main" style={{ paddingTop: "var(--header-h)" }}>
        {children}
      </main>
      <Footer />
    </StoreProvider>
  );
}
