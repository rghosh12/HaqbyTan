import { NextResponse, type NextRequest } from "next/server";
import { LAUNCH_MODE, PREVIEW_COOKIE } from "@/lib/launch";

/**
 * Launch gate. While LAUNCH_MODE is "coming-soon":
 *   "/"            → serves the Coming Soon page (URL stays "/")
 *   anything else  → 307 to "/"
 * Team preview: /?preview=<HAQ_PREVIEW_TOKEN> sets a cookie that bypasses the gate.
 */
export function middleware(req: NextRequest) {
  if (LAUNCH_MODE === "live") {
    // Once live, the pre-launch page itself is retired.
    if (req.nextUrl.pathname === "/coming-soon") return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  const token = process.env.HAQ_PREVIEW_TOKEN;
  const { pathname, searchParams } = req.nextUrl;

  if (token) {
    if (searchParams.get("preview") === token) {
      const res = NextResponse.redirect(new URL(pathname, req.url));
      res.cookies.set(PREVIEW_COOKIE, token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 14 });
      return res;
    }
    if (req.cookies.get(PREVIEW_COOKIE)?.value === token) return NextResponse.next();
  }

  if (pathname === "/") return NextResponse.rewrite(new URL("/coming-soon", req.url));
  return NextResponse.redirect(new URL("/", req.url), 307);
}

export const config = {
  // Everything except framework assets, static files, the waitlist endpoint and crawler files.
  matcher: ["/((?!_next/|api/subscribe|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).*)"]
};
