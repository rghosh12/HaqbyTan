/**
 * Launch gate.
 *
 *   "coming-soon" → every page redirects to the Coming Soon page at "/".
 *   "live"        → the full site is public.
 *
 * To unblock: change LAUNCH_MODE to "live" (or set HAQ_LAUNCH_MODE=live in Vercel) and redeploy.
 * Team preview while gated: set HAQ_PREVIEW_TOKEN in Vercel, then visit /?preview=<token> once.
 */
export const LAUNCH_MODE: "coming-soon" | "live" = process.env.HAQ_LAUNCH_MODE === "live" ? "live" : "coming-soon";

export const PREVIEW_COOKIE = "haq_preview";
