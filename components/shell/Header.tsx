"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/components/store/StoreProvider";
import { Icon } from "@/components/ui/Icon";
import { MegaMenu } from "./MegaMenu";
import s from "./Shell.module.css";

const NAV = [
  { href: "/new", label: "New" },
  { href: "/shop", label: "Shop", mega: true },
  { href: "/friday", label: "Friday" },
  { href: "/craft", label: "Craft" },
  { href: "/world/haq-girls", label: "HAQ Girls" },
  { href: "/world", label: "World of HAQ" }
] as const;

type Mode = "hero" | "dark" | "light";

/**
 * Transparent over hero photography, ivory once you scroll, ink over dark sections.
 * Sections opt in with data-surface="hero" | "dark". One rAF-throttled scroll read.
 */
export function Header() {
  const { count, open, overlay, hydrated } = useStore();
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>("light");
  const [mega, setMega] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const h = ref.current?.offsetHeight ?? 64;
      const under = document.elementsFromPoint(window.innerWidth / 2, h + 2).find((el) => !ref.current?.contains(el));
      const surface = under?.closest<HTMLElement>("[data-surface]")?.dataset.surface;
      setMode(surface === "hero" ? "hero" : surface === "dark" ? "dark" : "light");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => setMega(false), [pathname]);

  const showMega = () => {
    window.clearTimeout(closeTimer.current);
    setMega(true);
  };
  const hideMega = () => {
    closeTimer.current = window.setTimeout(() => setMega(false), 120);
  };

  const effective: Mode = mega ? "light" : mode;

  return (
    <header ref={ref} className={s.header} data-mode={effective} onMouseLeave={hideMega}>
      <div className={s.bar}>
        <button className={`${s.mobileOnly} ${s.textBtn}`} onClick={() => open("menu")} aria-expanded={overlay === "menu"} aria-controls="mobile-menu">
          Menu
        </button>

        <Link href="/" className={s.logo} aria-label="HAQ — home" data-hidden={effective === "hero" && pathname === "/"}>
          HAQ
        </Link>

        <nav aria-label="Primary" className={s.primary}>
          <ul role="list">
            {NAV.map((item) => (
              <li key={item.href} onMouseEnter={"mega" in item ? showMega : hideMega}>
                <Link
                  href={item.href}
                  className={s.navLink}
                  aria-current={pathname === item.href || pathname.startsWith(item.href + "/") ? "page" : undefined}
                  onFocus={"mega" in item ? showMega : undefined}
                  aria-haspopup={"mega" in item ? "true" : undefined}
                  aria-expanded={"mega" in item ? mega : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.utility}>
          <button className={s.textBtn} onClick={() => open("search")} aria-label="Search">
            <span className={s.desktopOnly}>Search</span>
            <Icon name="search" className={s.mobileOnly} />
          </button>
          <Link href="/account" className={`${s.textBtn} ${s.desktopOnly}`}>
            Account
          </Link>
          <button className={s.textBtn} onClick={() => open("bag")} aria-label={`Bag, ${count} item${count === 1 ? "" : "s"}`}>
            Bag <span aria-hidden="true">({hydrated ? count : 0})</span>
          </button>
        </div>
      </div>

      <MegaMenu open={mega} onEnter={showMega} onLeave={hideMega} onNavigate={() => setMega(false)} />
    </header>
  );
}
