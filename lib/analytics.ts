/**
 * Single analytics entry point. Pushes GA4-shaped events to window.dataLayer;
 * GTM fans them out to GA4 / Meta / TikTok. Server-side purchase events are
 * sent by the Shopify webhook, not from here.
 */
export type HaqEvent =
  | "view_item"
  | "select_item"
  | "view_item_list"
  | "add_to_cart"
  | "remove_from_cart"
  | "add_to_wishlist"
  | "begin_checkout"
  | "purchase"
  | "search"
  | "filter_used"
  | "size_guide_opened"
  | "craft_story_opened"
  | "shop_the_look_clicked"
  | "friday_signup"
  | "newsletter_signup";

type Params = Record<string, string | number | boolean | undefined | Record<string, unknown>[]>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: HaqEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
  if (process.env.NODE_ENV === "development") console.debug("[haq:analytics]", event, params);
}
