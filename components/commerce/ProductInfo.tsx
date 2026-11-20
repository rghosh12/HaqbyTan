"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/components/store/StoreProvider";
import { isSoldOut } from "@/lib/commerce";
import { track } from "@/lib/analytics";
import { price } from "@/lib/format";
import type { Craft, Product, Size } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { CraftTerm } from "./CraftTerm";
import s from "./Commerce.module.css";

type Sheet = null | "size" | "guide";

/** Sticky purchase column. On mobile it collapses into a sticky bar + bottom sheets. */
export function ProductInfo({ product, craft }: { product: Product; craft?: Craft }) {
  const { add, open, toggleWish, isWished, savedSize, saveSize } = useStore();
  const [color, setColor] = useState(product.colors[0]!.name);
  const [size, setSize] = useState<Size | null>(product.variants.length === 1 ? product.variants[0]!.size : null);
  const [added, setAdded] = useState(false);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [notify, setNotify] = useState(false);
  const soldOut = isSoldOut(product);
  const variant = product.variants.find((v) => v.size === size);
  const wished = isWished(product.slug);

  useEffect(() => {
    track("view_item", { currency: "USD", value: product.price, items: [{ item_id: product.slug, item_name: product.title, item_category: product.category, price: product.price }] });
  }, [product]);

  // Pre-select a saved size if it's available for this piece.
  useEffect(() => {
    if (!size && savedSize && product.variants.some((v) => v.size === savedSize && v.stock > 0)) setSize(savedSize);
  }, [savedSize, product.variants, size]);

  const addToBag = () => {
    if (!size) {
      setSheet("size");
      return;
    }
    add({ slug: product.slug, title: product.title, price: product.price, color, size, qty: 1 });
    if (size !== "OS") saveSize(size);
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
      open("bag");
    }, 900);
  };

  const sizes = (
    <div className={s.sizes} role="radiogroup" aria-label="Size">
      {product.variants.map((v) => (
        <button
          key={v.size}
          role="radio"
          aria-checked={size === v.size}
          className={s.size}
          disabled={v.stock === 0}
          onClick={() => {
            setSize(v.size);
            if (sheet === "size") setSheet(null);
          }}
        >
          {v.size}
          {v.stock === 0 && <span className="sr-only"> — unavailable</span>}
        </button>
      ))}
    </div>
  );

  const stockNote =
    variant && variant.stock > 0 && variant.stock <= 2 ? <p className={`meta ${s.low}`}>Only {variant.stock} left in {variant.size}</p> : variant?.stock === 0 ? <p className="meta muted">{variant.size} is sold out</p> : null;

  const cta = soldOut ? (
    <button className="btn btn-block" onClick={() => setNotify(true)} disabled={notify}>
      {notify ? "We'll tell you ✓" : "Tell me if she comes back →"}
    </button>
  ) : (
    <button className="btn btn-block" onClick={addToBag} aria-live="polite">
      {added ? "In your bag ✓" : size ? "Add to bag →" : "Select size"}
    </button>
  );

  return (
    <div className={s.info}>
      <div className={s.infoInner}>
        {product.labels[0] && <p className="mono muted">{soldOut ? "Sold out" : product.labels[0]}</p>}
        <h1 className={`display ${s.pdpTitle}`}>{product.title}</h1>
        <p className={s.pdpPrice}>{price(product.price)}</p>
        <p className={s.pdpShort}>
          {product.short}
          {craft && (
            <>
              {" "}
              Craft: <CraftTerm craft={craft} />.
            </>
          )}
        </p>

        <div className={s.block}>
          <p className="meta">
            Colour — <span className="muted">{color}</span>
          </p>
          <div className={s.swatches} role="radiogroup" aria-label="Colour">
            {product.colors.map((c) => (
              <button key={c.name} role="radio" aria-checked={color === c.name} aria-label={c.name} className={s.swatch} style={{ background: c.hex }} onClick={() => setColor(c.name)} />
            ))}
          </div>
        </div>

        <div className={s.block}>
          <div className={s.sizeHead}>
            <p className="meta">Size{size ? ` — ${size}` : ""}</p>
            <button
              className="link link-quiet"
              onClick={() => {
                setSheet("guide");
                track("size_guide_opened", { item_id: product.slug });
              }}
            >
              Size guide
            </button>
          </div>
          {sizes}
          {stockNote}
          <p className="meta muted">{product.fit.notes} {product.fit.model}</p>
        </div>

        <div className={s.ctaRow}>
          {cta}
          <button className={s.wishBig} onClick={() => toggleWish(product.slug)} aria-pressed={wished} aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}>
            <Icon name="heart" fill={wished ? "currentColor" : "none"} />
          </button>
        </div>

        <ul role="list" className={`meta muted ${s.assurances}`}>
          <li>Free express shipping over $250 · 3–6 days</li>
          <li>Free returns within 14 days</li>
        </ul>

        <Accordion title="The look" defaultOpen>
          <p>{product.look}</p>
        </Accordion>
        {craft && (
          <Accordion title="The craft" onOpen={() => track("craft_story_opened", { craft: craft.slug, item_id: product.slug, surface: "pdp" })}>
            <p>{product.craftNote}</p>
            <p className="meta muted" style={{ marginTop: 8 }}>
              {craft.name} · {craft.regions.join(" / ")}
            </p>
            <p className="meta muted">Maker: {craft.makers ?? "Workshop credit published once verified."}</p>
          </Accordion>
        )}
        <Accordion title="Details">
          <ul className={s.bullets}>{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
          <p className="meta muted">Materials: {product.materials.join(", ")}</p>
        </Accordion>
        <Accordion title="Fit">
          <p>{product.fit.notes}</p>
          <p className="meta muted">Stretch: {product.fit.stretch}. {product.fit.model}</p>
        </Accordion>
        <Accordion title="Care">
          <ul className={s.bullets}>{product.care.map((d) => <li key={d}>{d}</li>)}</ul>
        </Accordion>
        <Accordion title="Shipping & returns">
          <p>Ships from Delhi in 1–2 days. Express worldwide, duties shown at checkout. Unworn pieces with tags can be returned within 14 days.</p>
        </Accordion>
      </div>

      {/* Mobile sticky bar */}
      <div className={s.sticky}>
        <span className="meta">{price(product.price)}</span>
        {soldOut ? (
          cta
        ) : (
          <button className="btn" onClick={size ? addToBag : () => setSheet("size")}>
            {added ? "In your bag ✓" : size ? `Add to bag — ${size}` : "Select size"}
          </button>
        )}
      </div>

      {sheet && (
        <>
          <div className={s.scrim} data-open="true" onClick={() => setSheet(null)} aria-hidden="true" />
          <div className={s.sheet} role="dialog" aria-modal="true" aria-label={sheet === "size" ? "Select size" : "Size guide"}>
            <div className={s.filterHead}>
              <h2 className="meta">{sheet === "size" ? "Select size" : "Size guide"}</h2>
              <button onClick={() => setSheet(null)} aria-label="Close" autoFocus>
                <Icon name="close" />
              </button>
            </div>
            {sheet === "size" ? (
              <div className={s.sheetBody}>
                {sizes}
                <p className="meta muted">{product.fit.notes}</p>
              </div>
            ) : (
              <div className={s.sheetBody}>
                <p>{product.fit.notes}</p>
                <p className="meta muted">{product.fit.model}</p>
                {product.measurements ? (
                  <table className={s.table}>
                    <caption className="meta muted">Garment measurements, cm</caption>
                    <thead>
                      <tr>
                        <th scope="col">Size</th>
                        <th scope="col">Bust</th>
                        <th scope="col">Waist</th>
                        <th scope="col">Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.measurements.map((m) => (
                        <tr key={m.size}>
                          <th scope="row">{m.size}</th>
                          <td>{m.bust ?? "—"}</td>
                          <td>{m.waist ?? "—"}</td>
                          <td>{m.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="meta muted">Garment measurements for this piece are being finalised. Ask us and we&apos;ll measure it for you.</p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false, onOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean; onOpen?: () => void }) {
  return (
    <details className={s.acc} open={defaultOpen} onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && onOpen?.()}>
      <summary className="meta">
        {title}
        <Icon name="plus" size={14} />
      </summary>
      <div className={s.accBody}>{children}</div>
    </details>
  );
}
