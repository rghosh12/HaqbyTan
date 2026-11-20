"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { getFacets, MOODS, queryProducts, type ProductQuery, type SortKey } from "@/lib/commerce";
import { getCraft } from "@/lib/content";
import { track } from "@/lib/analytics";
import type { Mood, Product, Size } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { ProductGrid } from "./ProductGrid";
import s from "./Commerce.module.css";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price, low to high" },
  { key: "price-desc", label: "Price, high to low" }
];

interface Filters {
  sizes: Size[];
  colors: string[];
  crafts: string[];
  materials: string[];
  moods: Mood[];
  inStock: boolean;
  maxPrice?: number;
}

const EMPTY: Filters = { sizes: [], colors: [], crafts: [], materials: [], moods: [], inStock: false };

/** PLP: thin toolbar, filter drawer, view 2/3/4, editorial interruptions. */
export function CollectionView({ base, interruptions = [], listName }: { base: ProductQuery; interruptions?: ReactNode[]; listName: string }) {
  const [filters, setFilters] = useState<Filters>({ ...EMPTY, crafts: base.craft ? [base.craft] : [] });
  const [sort, setSort] = useState<SortKey>("featured");
  const [cols, setCols] = useState<2 | 3 | 4>(4);
  const [drawer, setDrawer] = useState(false);

  const scope = useMemo(() => queryProducts({ ...base, craft: undefined }), [base]);
  const facets = useMemo(() => getFacets(scope), [scope]);
  const products: Product[] = useMemo(() => queryProducts({ ...base, craft: undefined, ...filters, sort }), [base, filters, sort]);
  const activeCount = filters.sizes.length + filters.colors.length + filters.crafts.length + filters.materials.length + filters.moods.length + (filters.inStock ? 1 : 0) + (filters.maxPrice ? 1 : 0);

  useEffect(() => {
    track("view_item_list", { item_list_name: listName, items: products.slice(0, 12).map((p) => ({ item_id: p.slug })) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listName]);

  useEffect(() => {
    document.body.dataset.locked = drawer ? "true" : "false";
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer]);

  function toggle<K extends "sizes" | "colors" | "crafts" | "materials" | "moods">(key: K, value: Filters[K][number]) {
    setFilters((f) => {
      const arr = f[key] as string[];
      const next = arr.includes(value as string) ? arr.filter((v) => v !== value) : [...arr, value as string];
      track("filter_used", { filter: key, value: String(value) });
      return { ...f, [key]: next };
    });
  }

  return (
    <>
      <div className={s.toolbar}>
        <button className={s.toolBtn} onClick={() => setDrawer(true)} aria-expanded={drawer} aria-controls="filter-drawer">
          Filter{activeCount ? ` (${activeCount})` : ""}
        </button>
        <div className={s.moods} role="group" aria-label="Shop by mood">
          {MOODS.map((m) => (
            <button key={m.slug} className={s.moodBtn} aria-pressed={filters.moods.includes(m.slug)} onClick={() => toggle("moods", m.slug)}>
              {m.label}
            </button>
          ))}
        </div>
        <div className={s.toolRight}>
          <label className={s.toolBtn}>
            <span className="sr-only">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={s.sortSelect}>
              {SORTS.map((o) => (
                <option key={o.key} value={o.key}>
                  Sort: {o.label}
                </option>
              ))}
            </select>
          </label>
          <div className={s.view} role="group" aria-label="Grid view">
            <span className="meta muted">View</span>
            {([2, 3, 4] as const).map((n) => (
              <button key={n} className={s.toolBtn} aria-pressed={cols === n} onClick={() => setCols(n)} data-cols-btn={n}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className={`meta muted ${s.count}`} aria-live="polite">
        {products.length} {products.length === 1 ? "piece" : "pieces"}
      </p>

      {products.length === 0 ? (
        <div className={s.empty}>
          <p className="display" style={{ fontSize: "var(--t-h2)" }}>
            Nothing in that combination.
          </p>
          <p className="muted">Loosen a filter. Or two.</p>
          <button className="link" onClick={() => setFilters(EMPTY)}>
            Clear filters →
          </button>
        </div>
      ) : (
        <ProductGrid products={products} columns={cols} interruptions={activeCount ? [] : interruptions} list={listName} />
      )}

      <div className={s.scrim} data-open={drawer} onClick={() => setDrawer(false)} aria-hidden="true" />
      <aside id="filter-drawer" className={s.filterDrawer} data-open={drawer} role="dialog" aria-modal="true" aria-label="Filters" inert={!drawer}>
        <div className={s.filterHead}>
          <h2 className="meta">Filter</h2>
          <button onClick={() => setDrawer(false)} aria-label="Close filters">
            <Icon name="close" />
          </button>
        </div>
        <div className={s.filterBody}>
          <FilterGroup title="Size">
            {facets.sizes.map((v) => (
              <Check key={v} label={v} checked={filters.sizes.includes(v)} onChange={() => toggle("sizes", v)} />
            ))}
          </FilterGroup>
          <FilterGroup title="Colour">
            {facets.colors.map((v) => (
              <Check key={v} label={v} checked={filters.colors.includes(v)} onChange={() => toggle("colors", v)} />
            ))}
          </FilterGroup>
          {facets.crafts.length > 0 && (
            <FilterGroup title="Craft">
              {facets.crafts.map((v) => (
                <Check key={v} label={getCraft(v)?.name ?? v} checked={filters.crafts.includes(v)} onChange={() => toggle("crafts", v)} />
              ))}
            </FilterGroup>
          )}
          <FilterGroup title="Material">
            {facets.materials.map((v) => (
              <Check key={v} label={v} checked={filters.materials.includes(v)} onChange={() => toggle("materials", v)} />
            ))}
          </FilterGroup>
          <FilterGroup title="Price">
            {[150, 250, 350].map((v) => (
              <Check key={v} label={`Under $${v}`} checked={filters.maxPrice === v} onChange={() => setFilters((f) => ({ ...f, maxPrice: f.maxPrice === v ? undefined : v }))} />
            ))}
          </FilterGroup>
          <FilterGroup title="Availability">
            <Check label="In stock only" checked={filters.inStock} onChange={() => setFilters((f) => ({ ...f, inStock: !f.inStock }))} />
          </FilterGroup>
        </div>
        <div className={s.filterFoot}>
          <button className="btn btn-ghost" onClick={() => setFilters(EMPTY)}>
            Clear
          </button>
          <button className="btn" onClick={() => setDrawer(false)}>
            Show {products.length}
          </button>
        </div>
      </aside>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className={s.filterGroup}>
      <legend className="meta muted">{title}</legend>
      <div className={s.filterOptions}>{children}</div>
    </fieldset>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className={s.check}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}
