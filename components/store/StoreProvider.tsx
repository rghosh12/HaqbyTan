"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import type { Size } from "@/lib/types";

/**
 * Client state: bag, wishlist, saved size, and which overlay is open.
 * In production the bag mirrors a Shopify Cart (cartCreate / cartLinesAdd);
 * localStorage is only a fast local cache so a refresh doesn't empty the bag.
 */

export interface BagLine {
  slug: string;
  title: string;
  price: number;
  color: string;
  size: Size;
  qty: number;
}

type Overlay = null | "bag" | "search" | "menu";

interface State {
  lines: BagLine[];
  wishlist: string[];
  savedSize: Size | null;
  overlay: Overlay;
  hydrated: boolean;
}

type Action =
  | { type: "hydrate"; state: Partial<State> }
  | { type: "add"; line: BagLine }
  | { type: "remove"; slug: string; size: Size; color: string }
  | { type: "qty"; slug: string; size: Size; color: string; qty: number }
  | { type: "toggleWish"; slug: string }
  | { type: "saveSize"; size: Size }
  | { type: "overlay"; overlay: Overlay };

const same = (a: BagLine, b: { slug: string; size: Size; color: string }) => a.slug === b.slug && a.size === b.size && a.color === b.color;

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "hydrate":
      return { ...state, ...a.state, hydrated: true };
    case "add": {
      const existing = state.lines.find((l) => same(l, a.line));
      const lines = existing
        ? state.lines.map((l) => (same(l, a.line) ? { ...l, qty: Math.min(l.qty + a.line.qty, 9) } : l))
        : [...state.lines, a.line];
      return { ...state, lines };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((l) => !same(l, a)) };
    case "qty":
      return {
        ...state,
        lines: a.qty <= 0 ? state.lines.filter((l) => !same(l, a)) : state.lines.map((l) => (same(l, a) ? { ...l, qty: Math.min(a.qty, 9) } : l))
      };
    case "toggleWish":
      return {
        ...state,
        wishlist: state.wishlist.includes(a.slug) ? state.wishlist.filter((s) => s !== a.slug) : [...state.wishlist, a.slug]
      };
    case "saveSize":
      return { ...state, savedSize: a.size };
    case "overlay":
      return { ...state, overlay: a.overlay };
  }
}

const KEY = "haq:v1";

interface Store extends State {
  count: number;
  subtotal: number;
  add: (line: BagLine) => void;
  remove: (line: Pick<BagLine, "slug" | "size" | "color">) => void;
  setQty: (line: Pick<BagLine, "slug" | "size" | "color">, qty: number) => void;
  toggleWish: (slug: string) => void;
  isWished: (slug: string) => boolean;
  saveSize: (size: Size) => void;
  open: (o: Exclude<Overlay, null>) => void;
  close: () => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    lines: [],
    wishlist: [],
    savedSize: null,
    overlay: null,
    hydrated: false
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      dispatch({ type: "hydrate", state: raw ? (JSON.parse(raw) as Partial<State>) : {} });
    } catch {
      dispatch({ type: "hydrate", state: {} });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ lines: state.lines, wishlist: state.wishlist, savedSize: state.savedSize }));
    } catch {
      /* storage unavailable — bag still works for this visit */
    }
  }, [state.lines, state.wishlist, state.savedSize, state.hydrated]);

  // Lock page scroll while any overlay is open; Escape closes it.
  useEffect(() => {
    document.body.dataset.locked = state.overlay ? "true" : "false";
    if (!state.overlay) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dispatch({ type: "overlay", overlay: null });
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.overlay]);

  const add = useCallback((line: BagLine) => {
    dispatch({ type: "add", line });
    track("add_to_cart", { currency: "USD", value: line.price * line.qty, items: [{ item_id: line.slug, item_name: line.title, item_variant: `${line.color} / ${line.size}`, price: line.price, quantity: line.qty }] });
  }, []);

  const remove = useCallback((line: Pick<BagLine, "slug" | "size" | "color">) => {
    dispatch({ type: "remove", ...line });
    track("remove_from_cart", { items: [{ item_id: line.slug }] });
  }, []);

  const store = useMemo<Store>(
    () => ({
      ...state,
      count: state.lines.reduce((n, l) => n + l.qty, 0),
      subtotal: state.lines.reduce((n, l) => n + l.qty * l.price, 0),
      add,
      remove,
      setQty: (line, qty) => dispatch({ type: "qty", ...line, qty }),
      toggleWish: (slug) => {
        if (!state.wishlist.includes(slug)) track("add_to_wishlist", { items: [{ item_id: slug }] });
        dispatch({ type: "toggleWish", slug });
      },
      isWished: (slug) => state.wishlist.includes(slug),
      saveSize: (size) => dispatch({ type: "saveSize", size }),
      open: (overlay) => dispatch({ type: "overlay", overlay }),
      close: () => dispatch({ type: "overlay", overlay: null })
    }),
    [state, add, remove]
  );

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside <StoreProvider>");
  return s;
}
