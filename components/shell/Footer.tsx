import Link from "next/link";
import { Newsletter } from "./Newsletter";
import s from "./Shell.module.css";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Shop",
    links: [["New", "/new"], ["Clothing", "/shop"], ["Bags", "/shop/bags"], ["Jewellery", "/shop/jewellery"], ["Friday", "/friday"]]
  },
  {
    title: "World of HAQ",
    links: [["Craft", "/craft"], ["HAQ Girls", "/world/haq-girls"], ["Bathroom", "/world/bathroom"], ["Radio", "/world/radio"], ["Stories", "/world/stories"]]
  },
  {
    title: "Help",
    links: [["Shipping", "/shipping"], ["Returns", "/returns"], ["Size Guide", "/shipping#size-guide"], ["Contact", "/contact"], ["Account", "/account"]]
  },
  {
    title: "HAQ",
    links: [["About", "/about"], ["Craftsmanship", "/craft"], ["Makers", "/craft#makers"], ["Instagram", "https://instagram.com"], ["TikTok", "https://tiktok.com"]]
  }
];

export function Footer() {
  return (
    <footer className={`surface-ink ${s.footer}`} data-surface="dark">
      <div className={s.footerTop}>
        <Newsletter />
        <nav aria-label="Footer" className={s.footerCols}>
          {COLS.map((c) => (
            <div key={c.title}>
              <p className="meta muted">{c.title}</p>
              <ul role="list">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    {href.startsWith("http") ? (
                      <a href={href} className="link link-quiet" rel="noopener noreferrer" target="_blank">
                        {label}
                      </a>
                    ) : (
                      <Link href={href} className="link link-quiet">
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <p className={`display ${s.footerMark}`} aria-hidden="true">
        HAQ
      </p>
      <div className={s.footerBottom}>
        <label className="meta">
          <span className="sr-only">Country and currency</span>
          <select className={s.region} defaultValue="US">
            <option value="US">United States / USD</option>
            <option value="IN">India / INR</option>
            <option value="GB">United Kingdom / GBP</option>
          </select>
        </label>
        <span className="mono muted">Fri 7:43 PM</span>
        <span className="meta muted">© 2026 HAQ</span>
      </div>
    </footer>
  );
}
