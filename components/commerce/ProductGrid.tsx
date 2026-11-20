import { Fragment, type ReactNode } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import s from "./Commerce.module.css";

/**
 * Commerce grid with editorial interruptions: after every `every` products,
 * the next interruption spans the full row. Breaks the rhythm without breaking the grid.
 */
export function ProductGrid({
  products,
  columns = 4,
  interruptions = [],
  every = 6,
  list = "grid"
}: {
  products: Product[];
  columns?: 2 | 3 | 4;
  interruptions?: ReactNode[];
  every?: number;
  list?: string;
}) {
  let used = 0;
  return (
    <ul role="list" className={s.grid} data-cols={columns}>
      {products.map((p, i) => {
        const breakHere = (i + 1) % every === 0 && used < interruptions.length && i < products.length - 1;
        const node = breakHere ? interruptions[used++] : null;
        return (
          <Fragment key={p.slug}>
            <li>
              <ProductCard product={p} list={list} priority={i < 4} />
            </li>
            {node && <li className={s.gridBreak}>{node}</li>}
          </Fragment>
        );
      })}
    </ul>
  );
}
