import Link from "next/link";
import type { MediaAsset } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import s from "./Editorial.module.css";

/** "CASUAL ONLY, OKAY?" — Sure. Humour as a cut, not a meme. */
export function EditorialQuote({ quote, answer, image, href }: { quote: string; answer: string; image: MediaAsset; href: string }) {
  return (
    <section className={`section-editorial ${s.quote}`}>
      <div>
        <p className="mono muted">Friend, 6:52 PM</p>
        <blockquote className={`display ${s.h1}`}>&ldquo;{quote}&rdquo;</blockquote>
        <p className={`display-italic ${s.quoteAnswer}`}>{answer}</p>
        <Link href={href} className="link">
          See what she wore →
        </Link>
      </div>
      <Media asset={image} ratio="4 / 5" sizes="(max-width: 860px) 100vw, 45vw" />
    </section>
  );
}

/** Full-row interruption for product grids. */
export function GridStatement({ big, small }: { big: string; small: string }) {
  return (
    <div className={s.gridStatement}>
      <p className={`display ${s.h1}`}>{big}</p>
      <p className="display-italic">{small}</p>
    </div>
  );
}

export function GridImage({ image, caption }: { image: MediaAsset; caption: string }) {
  return (
    <figure className={s.gridImage}>
      <Media asset={image} ratio="21 / 9" sizes="100vw" />
      <figcaption className="mono">{caption}</figcaption>
    </figure>
  );
}

/** Used once or twice, slow, serif. */
export function Marquee({ text }: { text: string }) {
  const run = Array.from({ length: 6 }, () => text).join(" · ");
  return (
    <div className={s.marquee} aria-hidden="true">
      <div className={`display-italic ${s.marqueeTrack}`}>
        <span>{run} · </span>
        <span>{run} · </span>
      </div>
    </div>
  );
}

export function PageIntro({ kicker, title, children, accent }: { kicker: string; title: string; children?: React.ReactNode; accent?: string }) {
  return (
    <header className={s.pageIntro} style={accent ? ({ "--accent": accent } as React.CSSProperties) : undefined}>
      <p className="mono">{kicker}</p>
      <h1 className={`display ${s.hero2}`}>{title}</h1>
      {children && <div className={s.pageIntroBody}>{children}</div>}
    </header>
  );
}
