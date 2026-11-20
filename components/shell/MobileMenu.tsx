"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "@/components/store/StoreProvider";
import { Timestamp } from "@/components/ui/Timestamp";
import s from "./Shell.module.css";

const BIG = [
  { href: "/new", label: "New" },
  { href: "/shop", label: "Shop" },
  { href: "/friday", label: "Friday" },
  { href: "/craft", label: "Craft" },
  { href: "/world", label: "World" }
];

export function MobileMenu() {
  const { overlay, close, open } = useStore();
  const pathname = usePathname();
  const isOpen = overlay === "menu";

  // Any route change closes whatever overlay is open.
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div id="mobile-menu" className={s.mobileMenu} data-open={isOpen} role="dialog" aria-modal="true" aria-label="Menu" inert={!isOpen}>
      <div className={s.mobileMenuTop}>
        <button className={s.textBtn} onClick={close}>
          Close
        </button>
        <span className={s.logoStatic}>HAQ</span>
        <span style={{ width: 44 }} />
      </div>
      <nav aria-label="Mobile">
        <ul role="list" className={s.mobileBig}>
          {BIG.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="display">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul role="list" className={s.mobileSmall}>
          <li>
            <Link href="/account" className="meta">
              Account
            </Link>
          </li>
          <li>
            <button className="meta" onClick={() => open("search")}>
              Search
            </button>
          </li>
          <li>
            <Link href="/world/haq-girls" className="meta">
              HAQ Girls
            </Link>
          </li>
          <li>
            <Link href="/contact" className="meta">
              Customer Care
            </Link>
          </li>
        </ul>
      </nav>
      <Timestamp className={s.mobileStamp} place="Delhi / London / New York" />
    </div>
  );
}
